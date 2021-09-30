import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { TipoTurnoService } from "../../services/tipo-turno.service";
import { TipoTurnoModalComponent } from "../tipo-turno-modal/tipo-turno-modal.component";

@Component({
  selector: "app-tipo-turno",
  templateUrl: "./tipo-turno.component.html",
  styleUrls: ["./tipo-turno.component.css"],
  providers: [DialogService],
})
export class TipoTurnoComponent implements OnInit {
  data: any[] = [];
  isUpdate: boolean = false;
  ref: DynamicDialogRef;

  constructor(
    private tipoTurnoService: TipoTurnoService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.getTipoTurno();
  }

  ngOnInit(): void {}
  getTipoTurno() {
    this.tipoTurnoService.getTipoTurnos().subscribe((resp: any) => {
      this.data = resp.object;
      // console.log(this.data);
    });
  }
  agregarActualizar(rowIndex: any) {
    //defecto agregamos
    let id: string = "";
    let header: string = "Agregar tipo turno";
    if (this.isUpdate) {
      id = this.data[rowIndex].id;
      header = "Actualizar tipo turno";
    }
    this.ref = this.dialogService.open(TipoTurnoModalComponent, {
      data: { id: id },
      header: header,
      width: "70%",
    });
    this.ref.onClose.subscribe((mensaje?: string) => {
      let detail: string = "Elemento agregado satisfactoriomente";
      let summary: string = "Agregado";
      if (mensaje === "actualizado") {
        detail = "Elemento Actualizado satisfactoriamente";
        summary = "Actualizado";
      }
      if (mensaje === "actualizado" || mensaje === "agregado") {
        this.getTipoTurno();
        this.messageService.add({
          severity: "success",
          summary: summary,
          detail: detail,
        });
      }
    });
  }
  deleteTP(rowIndex: any) {
    const Id = this.data[rowIndex].id;
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "estas seguro que desear eliminar este registro",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",

      accept: () => {
        this.tipoTurnoService.deleteTipoTurno(Id).subscribe(
          (resp) => {
            this.data.splice(rowIndex, 1);
            this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: "Se ha eliminado tipo turno",
            });
          },
          (error) => {
            //console.log("no se elimino registro");
          }
        );
      },
      reject: () => {
        // console.log("no se borro");
      },
    });
  }
}
