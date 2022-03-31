import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ResultadosService } from "../../services/resultados/resultados.service";
import { MessageService } from "primeng/api";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from '../../services/consultas.service';
import { ModalInterconsultaComponent } from "./modal-interconsulta/modal-interconsulta.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from "sweetalert2";
import { DatePipe } from '@angular/common';
import { CronogramaComponent } from './cronograma/cronograma.component';


@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css'],
    providers: [DialogService]
})
export class ResultadosComponent implements OnInit {
    ref: DynamicDialogRef;

    /*CAMPOS PARA RECUPERAR LA DATA PRINCIPAL*/
    dataConsulta: any;
    idConsultoriObstetrico: string;

    form: FormGroup;
    isUpdate: boolean = false;
    index = 0;

    datePipe = new DatePipe('en-US');
    /*INTERCONSULTAS*/
    interconsultas: any[] = [];

    cronogramaDialog: any;
    cronograma: any;

    private nroFetos: number = 0;
    idConsulta: string;
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;
    nroHcl: string;

    Gestacion: any;
    dataPaciente2: any;
    estadoEdicion: Boolean;

    nroAtencion: any;

    nombreResponsable: any;
    nroDocResponsable: any;

    fecha: Date
    constructor(
        private consultaService: ConsultasService,
        private messageService: MessageService,
        private dialog: DialogService) {
        this.buildForm();

        this.nombreResponsable= JSON.parse(localStorage.getItem('usuario')).nombres.split("-")[0]+"-"+JSON.parse(localStorage.getItem('usuario')).apellidos;
        this.nroDocResponsable= JSON.parse(localStorage.getItem('usuario')).nroDocumento;

        /*********RECUPERAR DATOS*********/
        /*usando local storage*/
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));

        //estado para saber que estado usar en consultas
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

        console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
        console.log("gestacion desde datos generales", this.Gestacion);

        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
            this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
            this.nroHcl = this.dataPaciente2.nroHcl;

        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idConsulta = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }
        if (!this.estadoEdicion) {
            //guardar en el ls el nroAtencion
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
            this.nroAtencion = nroAtencion;
            console.log("entre a nueva consulta", this.nroAtencion)
        }
        else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            console.log("entre a edicion consulta", this.nroAtencion)
        }
        this.agenda();
    }

    buildForm() {
        this.form = new FormGroup({
            proxCita: new FormControl('', [Validators.required]),
            nombreResponsable: new FormControl('', [Validators.required]),
            docResponsable: new FormControl('', [Validators.required])
        })
    }
    ngOnInit(): void {
        this.recuperarDatos();
        this.form.get("nombreResponsable").setValue(this.nombreResponsable);
        this.form.get("docResponsable").setValue(this.nroDocResponsable);
    }

    openDialogInterconsultas() {
        this.ref = this.dialog.open(ModalInterconsultaComponent, {
            header: "INTERCONSULTA",
            contentStyle: {
                heigth: "400px",
                width: "680px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log("data de modal interconsultas", data)
            if (data !== undefined)
                this.interconsultas.push(data);
        })
    }
    openDialogEditarinterconsultas(row, index) {
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalInterconsultaComponent, {
            header: "INTERCONSULTA",
            contentStyle: {
                heigth: "400px",
                width: "680px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal interconsulta ', data)
            if (data !== undefined) {
                this.interconsultas.splice(data.index, 1, data.row);
            };
        })
    }
    
    guardarTodosDatos() {
        const req = {
            id: this.idConsulta,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            interconsultas: this.interconsultas,
            proxCita:
            {
            fecha: this.datePipe.transform(this.form.value.proxCita, 'yyyy-MM-dd'),
            motivo: "PRÓXIMA CITA",
            servicio: "OBSTETRICIA",
            estado: "TENTATIVO",
            nivelUrgencia: "NORMAL"
            },
            
        }
        this.consultaService.updateConsultas(this.nroFetos, req).subscribe(
            (resp) => {
                console.log(resp);
                console.log(req);
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        )
    }
    recuperarNroFetos() {
        let idData = {
            id: this.idConsulta
        }
        this.consultaService.getUltimaConsultaById(idData).subscribe((res: any) => {
            this.nroFetos = res.object.nroFetos;
        })
    }
    recuperarDatos() {
        this.recuperarNroFetos();
        let aux = {
            id: this.idConsulta,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion
        }
        this.consultaService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
            this.dataConsulta = res.object;
            console.log("data consulta:" + this.dataConsulta);

            if (res['cod'] = '2401') {
                if (this.dataConsulta != null) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Recuperado',
                        detail: 'Registro recuperado satisfactoriamente'
                    });
                    if (this.dataConsulta.proxCita != null) {
                        this.form.patchValue({ 'proxCita': this.dataConsulta.proxCita.fecha });
                    }
                    /* recuperar interconsultas*/

                    if (this.dataConsulta.interconsultas != null) {
                        let y: number = 0;
                        while (y < this.dataConsulta.interconsultas.length) {
                            this.interconsultas.push(this.dataConsulta.interconsultas[y]);
                            y++;
                        }
                    }
                } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
            }
        });
    }
    eliminarInterconsulta(index) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.interconsultas.splice(index, 1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    mostrarCronograma() {
        this.cronogramaDialog = true;
    }
    salirCronograma() {
        this.cronogramaDialog = false;
    }
    recuperarCronograma() {
        this.consultaService.getCronogramaGestante(this.nroHcl).subscribe((res: any) => {
            this.cronograma = res.object;
            console.log("cronograma:", this.cronograma)
        })
    }
    funcionAuxiliar(fecha) {
        return new Date(fecha).getTime();
    }

    agenda() {
        this.consultaService.getCronogramaGestante(this.nroHcl).subscribe((r: any) => {
            let aux = r.object
            console.log(aux)
            this.consultaService.list=[];
            aux.map((r_: any) => {
                this.consultaService.list.push({
                    title: r_.descripcion+" - "+r_.tipo,
                    start: r_.fecha+ " "+this.datePipe.transform(0, 'HH:mm:ss')
                })
            })
        })
    }

    openCalendar() {
        this.ref = this.dialog.open(CronogramaComponent, {
            header: "CALENDARIO DE ACTIVIDADES",
            height: '100%',
            width: '90%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }
    ngDoCheck() {
        if (this.consultaService.proxCita !== '') {
            this.fecha = new Date(this.consultaService.proxCita)
        }
    }
}
