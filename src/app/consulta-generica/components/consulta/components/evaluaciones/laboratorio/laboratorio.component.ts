import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { LabBioquimicaComponent } from 'src/app/Laboratorio/component/lab-bioquimica/lab-bioquimica.component';
import { LabHematologiaComponent } from 'src/app/Laboratorio/component/lab-hematologia/lab-hematologia.component';
import { LabInmunologiaComponent } from 'src/app/Laboratorio/component/lab-inmunologia/lab-inmunologia.component';
import { LabMicrobiologicoComponent } from 'src/app/Laboratorio/component/lab-microbiologico/lab-microbiologico.component';
import { LabOrinaComponent } from 'src/app/Laboratorio/component/lab-orina/lab-orina.component';
import { LabParasitologiaComponent } from 'src/app/Laboratorio/component/lab-parasitologia/lab-parasitologia.component';
import { LaboratoriosService } from 'src/app/Laboratorio/services/laboratorios.service';
import { ExamsInOfficeDialogComponent } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/component/evaluaciones/laboratorio/exams-in-office-dialog/exams-in-office-dialog.component';
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
  dataExamenesRealizados: any;
  usuario: any;

  constructor(
    public dialog: DialogService,
    private examenesAuxiliaresService: ExamenesAuxiliaresService,
    private laboratoriosService: LaboratoriosService,
  ) {
    this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
    this.listarSolicitudes();
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('documento'));
    this.cargarExamenesRealizados();
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
      data: dataDialog,
    });
    this.ref.onClose.subscribe((data: any) => {
      this.listarSolicitudes();
    })
  }

  /* cargar datos de examenes realizados al paciente */
  cargarExamenesRealizados() {
    this.laboratoriosService.getExamenesRealizados(this.usuario.nroDocumento).subscribe((r: any) => {
      this.dataExamenesRealizados = r.object
      // console.log('object', r.object)
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

  /* dialog de los diferentes laboratorios según el tipo */
  openDialogLab(data) {
    // let dataAux = {
    //     data: data,
    //     ispruebaTomada:true
    //     };
    // console.log('data de lab ', data);
    switch (data.datosLaboratorio.subTipo) {
      case "HEMATOLOGIA": {
        this.ref = this.dialog.open(LabHematologiaComponent, {
          header: "RESULTADO DEL LABORATORIO CLINICO - HEMATOLOGIA",
          width: "90%",
          data: {
            data: data,
            edit: true
          },
        });
        // console.log("DATAS", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;

      case "INMUNOLOGIA": {
        this.ref = this.dialog.open(LabInmunologiaComponent, {
          header: "RESULTADO DEL LABORATORIO CLINICO - INMUNOLOGIA",
          width: "90%",
          data: {
            data: data,
            edit: true
          },
        });
        // console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;

      case "MICROBIOLOGIA": {
        this.ref = this.dialog.open(LabMicrobiologicoComponent, {
          header: "RESULTADO DEL LABORATORIO CLINICO - MICROBIOLOGICO",
          width: "60%",
          data: {
            data: data,
            edit: true
          },
        });
        // console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;

      case "BIOQUIMICA": {
        this.ref = this.dialog.open(LabBioquimicaComponent, {
          header: "RESULTADO DEL LABORATORIO CLINICO - BIOQUIMICA",
          width: "90%",
          data: {
            data: data,
            edit: true
          },
        });
        // console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;
      case "PARASITOLOGIA": {
        this.ref = this.dialog.open(LabParasitologiaComponent, {
          header: "LABORATORIO CLINICO - Parasitologia",
          width: "70%",
          data: {
            dataEnviada: data,
            isPruebaTomada: true
          }
        });
        // console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;
      case "URUANALISIS": {
        this.ref = this.dialog.open(LabOrinaComponent, {
          header: "LABORATORIO CLINICO - URUANALISIS",
          width: "70%",
          data: {
            dataEnviada: data,
            isPruebaTomada: true
          }
        });
        // console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
        });
      }
        break;
    }
  }

  openExamsInOfficeDialog() {
    this.ref = this.dialog.open(ExamsInOfficeDialogComponent, {
      header: "EXÁMENES EN CONSULTORIO",
      width: "70%",
      // height: "90%",
      contentStyle: {
        "max-height": "92%",
        overflow: "auto",
      },
    })
  }
}
