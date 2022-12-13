import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import {
    DialogConsultaUniversalComponent
} from "../../historia-consultas/dialog-consulta-universal/dialog-consulta-universal.component";
import { DialogConsultaComponent } from "./dialog-consulta/dialog-consulta.component";
import { ConsultaObstetriciaService } from "./services/consulta-obstetricia/consulta-obstetricia.service";
import { ObstetriciaGeneralService } from "../../services/obstetricia-general.service";
import { Router } from "@angular/router";
import { ConsultasService } from "../atencion/consultorio-obstetrico/services/consultas.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-consulta",
    templateUrl: "./consulta.component.html",
    styleUrls: ["./consulta.component.css"],
    providers: [DialogService],
})
export class ConsultaComponent implements OnInit {
    listaDocumentos: any;
    formConsulta: FormGroup;
    consultas = [];
    ref: DynamicDialogRef;

    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    idRecuperado: string;
    nroEmbarazo: string;
    nroHcl: string;

    Gestacion: any;
    DataFiliacionPaciente: any;

    loading: boolean = true;
    token: any = JSON.parse(localStorage.getItem('token'));
    consultationId: string;
    downloadLink: string;
    consultationStatus: number;
    filiationId: string;


    constructor(
        private fb: FormBuilder,
        private location: Location,
        private dialog: DialogService,
        private consultaObstetriciaService: ConsultaObstetriciaService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private consultasService: ConsultasService,
        private router: Router,
    ) {
        this.inicializarForm();
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.DataFiliacionPaciente = JSON.parse(localStorage.getItem('dataPaciente'));
        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.DataFiliacionPaciente.tipoDoc;
            this.nroDocRecuperado = this.DataFiliacionPaciente.nroDoc;
            this.nroEmbarazo = this.DataFiliacionPaciente.nroEmbarazo;
            this.nroHcl = this.DataFiliacionPaciente.nroHcl;
            this.idRecuperado = JSON.parse(localStorage.getItem('idGestacionRegistro'));
        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idRecuperado = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }
        // this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        // this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        // this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        // this.nroHcl = this.obstetriciaGeneralService.nroHcl;
        this.recuperarConsultas();
        this.downloadLink = environment.base_urlTx + '/jasperserver/rest_v2/reports/Reports/v1/consultaid/consultabase.pdf?authorization=' + this.token.token + '&idConsulta=';
    }

    ngOnInit(): void {
        this.obstetriciaGeneralService.actualConsultationStatus$.subscribe((res: number) => this.consultationStatus = res)
        //console.log('link to downnnnnnnnnnnnnnnnnnnn  ', this.downloadLink);
    }

    inicializarForm() {
        this.formConsulta = this.fb.group({
            tipoDoc: new FormControl(""),
            nroDoc: new FormControl(""),
        });
    }

    regresar() {
        this.location.back();
    }

    // openDialogConsultaNuevo() {
    //     this.ref = this.dialog.open(DialogConsultaComponent, {
    //         header: "CONSULTA",
    //         width: "95%",
    //         contentStyle: {
    //             "max-height": "700px",
    //         },
    //         autoZIndex: false,
    //     })
    //     this.ref.onClose.subscribe((data: any) => {
    //         //console.log('data de otro dialog ', data)
    //         if (data !== undefined) this.recuperarConsultas();
    //     })
    // }

    // openDialogConsultaEditar(row, index) {
    //     let aux = {
    //         index: index,
    //         row: row
    //     }
    //     this.ref = this.dialog.open(DialogConsultaComponent, {
    //         header: "CONSULTA",
    //         width: "95%",
    //         autoZIndex: false,
    //         contentStyle: {
    //             "max-height": "800px",
    //             overflow: "auto",
    //         },
    //         data: aux
    //     })
    //     this.ref.onClose.subscribe((data: any) => {
    //         //console.log('data de otro dialog ', data)
    //         if (data !== undefined) {
    //             this.recuperarConsultas();
    //         }
    //         ;
    //     })
    // }

    //recupera la lista de todas las atenciones prenatales
    recuperarConsultas() {
        // let data = {
        //     "nroHcl": this.nroHcl,
        //     "nroEmbarazo": this.nroEmbarazo
        // }
        // this.consultaObstetriciaService.getDatosConsultasObstetricasListar(data).subscribe((res: any) => {
        //     //console.log('trajo datos exito ', res)
        //     this.consultas = res.object ? res.object : [];
        //     this.loading = false;
        // })
        this.consultaObstetriciaService.getDatosConsultasObstetricasListarPorFiliacion(this.idRecuperado).subscribe((res: any) => {
            this.consultas = res.object ? res.object : [];
            if (this.consultas.length > 0) {
                this.consultas.sort((a, b) => a.fecha > b.fecha ? -1 : 1);
            }
            this.loading = false;
        })
    }

    //crear una nueva consulta, no mandamos ningun dato
    irConsultaNew(edicion) {
        // localStorage.removeItem('IDConsulta');
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia/consultorio-obstetrico']);
        localStorage.setItem("consultaEditarEstado", edicion);
        let data = {
            nroHcl: this.nroHcl
        }
        this.consultasService.getUltimaConsultaControl(this.idRecuperado, this.nroHcl).then((res: any) => {
            let informacion = res.object;
            //guardar en el ls el nroAtencion
            localStorage.setItem("nroConsultaNueva", informacion.nroUltimaAtencion + 1);
            this.DataFiliacionPaciente.nroEmbarazo ? this.DataFiliacionPaciente.nroEmbarazo = this.DataFiliacionPaciente.nroEmbarazo : this.DataFiliacionPaciente.nroEmbarazo = informacion.nroEmbarazo;
            localStorage.setItem('dataPaciente', JSON.stringify(this.DataFiliacionPaciente));
        })
    }

    //editar consulta o visualizar na ma, mandamos la data de la fila
    irConsultaVisualizar(event, edicion) {
        this.obstetriciaGeneralService.setActualConsultationStatus$(event.estadoAtencion);
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia/consultorio-obstetrico'])
        localStorage.setItem("nroConsultaEditar", event.nroAtencion);
        localStorage.setItem("consultaEditarEstado", edicion);
        // localStorage.removeItem('IDConsulta');
        localStorage.setItem('IDConsulta', JSON.stringify(event.id));
        localStorage.setItem('datosConsultaActual', JSON.stringify(event));
    }

    irFUA(rowData) {
        let message1 = "Esta Seguro de Generar FUA?, se dara como finalizado la consulta"
        let message2 = "Esta Seguro de Generar FUA?, Debe revisar el tipo de Seguro"
        // this.router.navigate(['dashboard/fua/listar-fua'], rowData)
        if (rowData.estadoAtencion == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Consulta en Interconsulta, no es posible hacer FUA',
                showConfirmButton: false,
                timer: 2000
            });
        }
        if (rowData.estadoAtencion == 2) {
            this.router.navigate(['dashboard/fua/listar-fua'], rowData)
        }
        if (rowData.estadoAtencion == 1) {
            Swal.fire({
                title: rowData.tipoConsulta != 'CRED' ? message1 : message2,
                showDenyButton: true,
                confirmButtonText: 'Crear FUA',
                denyButtonText: `Cancelar`,
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['dashboard/fua/listar-fua'], rowData)
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'No se creo FUA',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
        }
    }

    irHIS(rowData) {
        let message1 = "Esta Seguro de Generar HIS?, se dara como finalizado la consulta"
        if (rowData.estadoAtencion == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Consulta en Interconsulta, no es posible hacer HIS',
                showConfirmButton: false,
                timer: 2000
            });
        }
        if (rowData.estadoAtencion == 2) {
            this.router.navigate(['dashboard/his/listar-his'], {
                queryParams: {
                    'idConsulta': rowData.id,
                    'tipoConsulta': rowData.tipoConsulta
                }
            })
        }
        if (rowData.estadoAtencion == 1) {
            Swal.fire({
                title: message1,
                showDenyButton: true,
                confirmButtonText: 'Crear HIS',
                denyButtonText: `Cancelar`,
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['dashboard/his/listar-his'], {
                        queryParams: {
                            'idConsulta': rowData.id,
                            'tipoConsulta': rowData.tipoConsulta
                        }
                    })
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'No se creo HIS',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
        }
    }
}
