import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { CondicionPacienteDiscapacidadService } from "../../services/condicion-paciente-discapacidad/condicion-paciente-discapacidad.service";
import { CondicionPacienteDiscapacidadModalComponent } from "../condicion-paciente-discapacidad-modal/condicion-paciente-discapacidad-modal.component";

@Component({
  selector: "app-condicion-paciente-discapacidad",
  templateUrl: "./condicion-paciente-discapacidad.component.html",
  styleUrls: ["./condicion-paciente-discapacidad.component.css"],
  providers: [DialogService],
})
export class CondicionPacienteDiscapacidadComponent implements OnInit {
  data: any[] = [];
  isUpdate: boolean = false;
  ref: DynamicDialogRef;
  constructor(
    private condicionPacienteDiscapacidadService: CondicionPacienteDiscapacidadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.getData();
  }
  getData() {
    this.condicionPacienteDiscapacidadService.getCPDs().subscribe(
      (resp: any) => {
        this.data = resp.object;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  deleteCPD(rowIndex) {
    const Id = this.data[rowIndex].id;
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "estas seguro que desear eliminar este registro",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",

      accept: () => {
        this.condicionPacienteDiscapacidadService.deleteCPD(Id).subscribe(
          (resp) => {
            this.data.splice(rowIndex, 1);
            this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: "Se ha eliminado condicion pasiente discapacidad",
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
  agregarActualizar(rowIndex: string) {
    let id: string = "";
    let header: string = "Agregar CPD";
    if (this.isUpdate) {
      id = this.data[rowIndex].id;
      header = "Actualizar CPD";
    }
    this.ref = this.dialogService.open(
      CondicionPacienteDiscapacidadModalComponent,
      {
        data: { id: id },
        header: header,
        width: "70%",
      }
    );
    this.ref.onClose.subscribe((mensaje?: string) => {
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
      }
    });
  }
  ngOnInit(): void {}
}
