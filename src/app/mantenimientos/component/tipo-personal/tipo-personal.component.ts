import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { TipoPersonal } from "../../../core/models/mantenimiento.models";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
import { TipoPersonalModalComponent } from "../tipo-personal-modal/tipo-personal-modal.component";

@Component({
  selector: "app-tipo-personal",
  templateUrl: "./tipo-personal.component.html",
  styleUrls: ["./tipo-personal.component.css"],
  providers: [DialogService],
})
export class TipoPersonalComponent implements OnInit {
  data: TipoPersonal[] = [];
  isUpdate: boolean = false;
  dataEntrada: any[] = [
    {
      nombre: "nombre1",
      esProfesional: true,
      abreviatura: "nm1",
      especialidad: "sin especialidad",
      estado: false,
    },
    {
      nombre: "nombre2",
      esProfesional: false,
      abreviatura: "nm1",
      especialidad: "sin especialidad",
      estado: true,
    },
    {
      nombre: "nombre3",
      esProfesional: true,
      abreviatura: "nm1",
      especialidad: "sin especialidad",
      estado: false,
    },
  ];
  constructor(
    private tipoPersonalService: TipoPersonalService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getTipoPersonal();
  }
  ngOnInit(): void {}
  getTipoPersonal() {
    // this.tipoPersonalService.getTipoPersonales().subscribe((resp: any) => {
    //   this.data = resp["object"];
    // });
    this.data = this.dataEntrada;
  }
  deleteTP(rowIndex: number) {
    const Id = this.data[rowIndex].id;
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "Esta seguro que quiere eliminar dicho registro",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.tipoPersonalService.deleteTipoPersonal(Id).subscribe(
          (resp: any) => {
            console.log(resp);
            this.data.splice(rowIndex, 1);
            this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: "Se ha eliminado el tipo de usurio",
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      reject: () => {
        console.log("cancelar eliminacion");
      },
    });
  }
  agregarActualizar(rowIndex?: any) {
    let id: string = "";
    let title: string = "Agregar tipo de personal";
    if (this.isUpdate) {
      id = this.data[rowIndex].id;
      title = "Actualizar tipo de personal";
    }
    const ref = this.dialogService.open(TipoPersonalModalComponent, {
      data: {
        id: id,
      },
      header: title,
      width: "70%",
    });
    ref.onClose.subscribe((mensaje: string) => {
      let detail: string = "Elemento agregado satisfactoriomente";
      let summary: string = "Agregado";
      if (mensaje === "actualizado") {
        detail = "Elemento Actulizado satisfactoriamente";
        summary = "Actualizado";
      }
      this.messageService.add({
        severity: "success",
        summary: summary,
        detail: detail,
      });
    });
  }
}
