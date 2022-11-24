import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { DialogReqLaboratorioComponent } from './dialog-req-laboratorio/dialog-req-laboratorio.component';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css'],
  providers: [DialogService]
})
export class LaboratorioComponent implements OnInit {
  ref: DynamicDialogRef
  dataPaciente: any;
  listaSolicitudes: any;

  constructor(
    public dialog: DialogService,
    private examenesAuxiliaresService: ExamenesAuxiliaresService,
  ) {
    this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
    this.listarSolicitudes();
  }

  ngOnInit(): void {
  }
  openDialogSolicitud() {
    let dataDialog = {
      auxExams: this.listaSolicitudes
    }
    this.ref = this.dialog.open(DialogReqLaboratorioComponent, {
      header: "SOLICITUD DE EXÁMENES DE LABORATORIO",
      width: "70%",
      // height: "800px",
      contentStyle: {
        "max-height": "92%",
        overflow: "auto",
      },
      data:dataDialog,
    });
    this.ref.onClose.subscribe((data: any) => {
      this.listarSolicitudes();
    })
  }
  listarSolicitudes() {
    this.examenesAuxiliaresService.getListarPeticiones(this.dataPaciente.idConsulta).then(res => {
      if (res.object) {
        this.listaSolicitudes = res.object.examenesAuxiliares;
        // console.log('lista de solicitudes ', this.listaSolicitudes);
      }
    })
  }
}
