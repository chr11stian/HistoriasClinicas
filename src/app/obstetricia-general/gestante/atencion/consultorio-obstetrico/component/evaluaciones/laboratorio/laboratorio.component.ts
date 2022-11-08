import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { LabSolicitudComponent } from "./lab-solicitud/lab-solicitud.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
    LabHematologiaComponent
} from "../../../../../../../Laboratorio/component/lab-hematologia/lab-hematologia.component";
import {
    LabInmunologiaComponent
} from "../../../../../../../Laboratorio/component/lab-inmunologia/lab-inmunologia.component";
import {
    LabMicrobiologicoComponent
} from "../../../../../../../Laboratorio/component/lab-microbiologico/lab-microbiologico.component";
import {
    LabBioquimicaComponent
} from "../../../../../../../Laboratorio/component/lab-bioquimica/lab-bioquimica.component";
import {
    LabParasitologiaComponent
} from "../../../../../../../Laboratorio/component/lab-parasitologia/lab-parasitologia.component";
import { LabOrinaComponent } from "../../../../../../../Laboratorio/component/lab-orina/lab-orina.component";
import { LaboratoriosService } from "../../../../../../../Laboratorio/services/laboratorios.service";
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { ExamsInOfficeDialogComponent } from './exams-in-office-dialog/exams-in-office-dialog.component';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';

@Component({
    selector: 'app-laboratorio',
    templateUrl: './laboratorio.component.html',
    styleUrls: ['./laboratorio.component.css'],
    providers: [DialogService]
})
export class LaboratorioComponent implements OnInit {
    ref: DynamicDialogRef;
    dataConsulta: any;
    usuario: any
    dataExamenesRealizados: any;
    loading: boolean = true;
    idConsulta: string
    listaExamen: any[] = [];
    consultationStatus$ = this.obstetriciaGeneralService.consultationStatus$;
    consultationFinished: boolean = false;
    actualConsultation: any;

    constructor(public dialog: DialogService,
        private laboratoriosService: LaboratoriosService,
        private examenAuxiliarService: ExamenesAuxiliaresService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
    ) {
        this.dataConsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.idConsulta = JSON.parse(localStorage.getItem('IDConsulta'));
        this.actualConsultation = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.actualConsultation ? this.actualConsultation.estadoAtencion == 2 ? this.consultationFinished = true : this.consultationFinished = false : this.consultationFinished = false;

        this.listarPeticiones();
    }


    ngOnInit(): void {
        this.usuario = JSON.parse(localStorage.getItem('gestacion'));
        this.cargarExamenesRealizados();
    }

    openDialogSolicitud() {
        this.ref = this.dialog.open(LabSolicitudComponent, {
            header: "SOLICITUD DE EXAMENES DE LABORATORIO",
            width: "70%",
            // height: "90%",
            contentStyle: {
                "max-height": "92%",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            this.listarPeticiones();
        })
    }

    /* cargar datos de examenes realizados al paciente */
    cargarExamenesRealizados() {
        this.laboratoriosService.getExamenesRealizados(this.usuario.nroDoc).subscribe((r: any) => {
            this.dataExamenesRealizados = r.object
            // console.log('object', r.object)
        })
    }

    /* dialog de los diferentes laboratorios según el tipo */
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
                console.log("DATAS", data);
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
                console.log("DATA", data);
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
                console.log("DATA", data);
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
                console.log("DATA", data);
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
                console.log("DATA", data);
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
                console.log("DATA", data);
                this.ref.onClose.subscribe((data: any) => {
                });
            }
                break;
        }
    }

    listarPeticiones() {
        this.examenAuxiliarService.getListarPeticiones(this.idConsulta).then(res => {
            if (res.object != null) {
                this.listaExamen = res.object.examenesAuxiliares
                this.listaExamen = this.listaExamen.filter(item => item.lugarExamen == "LABORATORIO");
            }
        })
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
