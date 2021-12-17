import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";

import { TipoUpsService } from "../../services/tipo-ups.service";
import { TipoUpsModalComponent } from "../tipo-ups-modal/tipo-ups-modal.component";

@Component({
  selector: "app-tipo-ups",
  templateUrl: "./tipo-ups.component.html",
  styleUrls: ["./tipo-ups.component.css"],
  providers: [DialogService],
})
export class TipoUpsComponent implements OnInit {
  data: any[] = [];
  isUpdate: boolean = false;

  constructor(
    private dialogService: DialogService,
    private tipoUpsService: TipoUpsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  getData() {
    this.tipoUpsService.getTipoUPSs().subscribe((resp: any) => {
      this.data = resp.object;
    });
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.data);
  }
  agregarActualizar(index?: any) {
    let id: string = "";
    let header: string = "Agregar tipo UPS";
    if (this.isUpdate) {
      id = this.data[index].id;
      console.log(id);
      header = "Actualizar tipo UPS";
    }
    const ref = this.dialogService.open(TipoUpsModalComponent, {
      data: { id: id },
      header: header,
      width: "50%",
    });
    ref.onClose.subscribe((mensaje?: string) => {
      let detail: string = "Elemento agregado satisfactoriomente";
      let summary: string = "Agregado";
      if (mensaje === "actualizado") {
        detail = "Elemento Actualizado satisfactoriamente";
        summary = "Actualizado";
      }
      if (mensaje === "actualizado" || mensaje === "agregado") {
        this.getData();
        this.messageService.add({
          severity: "success",
          summary: summary,
          detail: detail,
        });
        this.getData();
      }
      if (mensaje === "duplicado") {
        this.messageService.add({
          severity: "success",
          summary: "Informacion",
          detail: "Ya existe un registro con el mismo Nombre",
        });
      }
    });
  }
  deleteTUPS(index) {
    const id = this.data[index].id;
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "estas seguro que desear eliminar este registro",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.tipoUpsService.deleteTipoUPS(id).subscribe(
          (resp) => {
            this.data.splice(index, 1);
            this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: "se ha eliminado la ups",
            });
          },
          () => {
            // console.log("Error");
          }
        );
      },
      reject: () => {
        // this.messageService.add({
        //   severity: "info",
        //   summary: "fatal error",
        //   detail: "no se ha eliminado el registro",
        // });
      },
    });
  }
}
