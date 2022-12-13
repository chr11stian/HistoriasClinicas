import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LabBioquimicaComponent } from 'src/app/Laboratorio/component/lab-bioquimica/lab-bioquimica.component';
import { LabHematologiaComponent } from 'src/app/Laboratorio/component/lab-hematologia/lab-hematologia.component';
import { LabInmunologiaComponent } from 'src/app/Laboratorio/component/lab-inmunologia/lab-inmunologia.component';
import { LabMicrobiologicoComponent } from 'src/app/Laboratorio/component/lab-microbiologico/lab-microbiologico.component';
import { LabOrinaComponent } from 'src/app/Laboratorio/component/lab-orina/lab-orina.component';
import { LabParasitologiaComponent } from 'src/app/Laboratorio/component/lab-parasitologia/lab-parasitologia.component';
import { LaboratoriosService } from 'src/app/Laboratorio/services/laboratorios.service';

@Component({
  selector: 'app-laboratory-result-dialog',
  templateUrl: './laboratory-result-dialog.component.html',
  styleUrls: ['./laboratory-result-dialog.component.css']
})
export class LaboratoryResultDialogComponent implements OnInit {

  patientData: Pregmant;
  arrayResults: any[] = [];
  ref: DynamicDialogRef;

  constructor(
    private laboratoryService: LaboratoriosService,
    public dialog: DialogService,
  ) {
    this.patientData = JSON.parse(localStorage.getItem('gestacion'));

    this.laboratoryService.getFinishedLaboExamsByNroDoc(this.patientData.nroDoc).then((res: any) => {
      this.arrayResults = res.object;
    })
  }

  ngOnInit(): void {
  }

  openDialogLab(data) {
    // let dataAux = {
    //     data: data,
    //     ispruebaTomada:true
    //     };
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
            //console.log("DATAS", data);
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
            //console.log("DATA", data);
            this.ref.onClose.subscribe((data: any) => {
                // this.buscarCuposPorPersonal();
            });
        }
            break;

        case "MICROBIOLOGICO": {
            this.ref = this.dialog.open(LabMicrobiologicoComponent, {
                header: "RESULTADO DEL LABORATORIO CLINICO - MICROBIOLOGICO",
                width: "60%",
                data: {
                    data: data,
                    edit: true
                },
            });
            // //console.log("DATA", data);
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
            // //console.log("DATA", data);
            this.ref.onClose.subscribe((data: any) => {
                // this.buscarCuposPorPersonal();
            });
        }
            break;
        case "PARASITOLOGIA": {
            this.ref = this.dialog.open(LabParasitologiaComponent, {
                header: "LABORATORIO CLINICO - Parasitologia",
                width: "70%",
                data: {dataEnviada:data,
                    isPruebaTomada:true}
            });
            // //console.log("DATA", data);
            this.ref.onClose.subscribe((data: any) => {
                // this.buscarCuposPorPersonal();
            });
        }
            break;
        case "URUANALISIS": {
            this.ref = this.dialog.open(LabOrinaComponent, {
                header: "LABORATORIO CLINICO - URUANALISIS",
                width: "70%",
                data: {dataEnviada:data,
                    isPruebaTomada:true}
            });
            // //console.log("DATA", data);
            this.ref.onClose.subscribe((data: any) => {
            });
        }
            break;
    }
}
}
interface Pregmant {
  estado: string,
  id: string,
  nroConsultas: number,
  nroDoc: string,
  nroEmbarazo: number,
  nroHcl: string,
  tipoDoc: string
}

interface LaboResult {

}


