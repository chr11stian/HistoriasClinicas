import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from '@angular/common';
import {MessageService, PrimeNGConfig} from 'primeng/api';

import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {Cupo} from '../../core/models/cupo.models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CuposService} from "../../core/services/cupos.service";
import {DocumentoIdentidadService} from "../../mantenimientos/services/documento-identidad/documento-identidad.service";
import {UpsService} from "../../mantenimientos/services/ups/ups.service";
import {PacienteService} from "../../core/services/paciente/paciente.service";
import {RolGuardiaService} from "../../core/services/rol-guardia/rol-guardia.service";


@Component({
    selector: 'app-h   ',
    providers: [DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {
    idIpressLapostaMedica = "616de45e0273042236434b51";
    listaUps: any;
    dataCupos_por_fechas_servicio: any;
    personalSelected2: any;
    isUpdate: boolean = false;

    dataSelectAmbiente: any;
    dataSelectHoras: any;
    dataSelectServicio: any;
    selectedHorario: any;
    dataPacientes: any;

    estadoHoras: string = "LIBRE";
    estadoCupo: string = "active";
    totalHoras: any;
    hora: any;
    personals: any;
    datafecha: Date = new Date();
    fechaParaReservaCupos: string;
    listaDocumentosIdentidad: any

    dataOfertasCupos: any;
    ups: [] = [];
    datePipe = new DatePipe('en-US');
    cuposDialog: boolean;
    usuarioDialog: boolean;
    selectedServicio: any;

    personalSelected: string = '';
    justifyOptions: any[];
    stateOptions: any[];
    formCuposOferta: FormGroup;


    iprees: string = "la posta medica";

    constructor(
        private config: DynamicDialogConfig,
        private router: Router,
        private primeNGConfig: PrimeNGConfig,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cuposService: CuposService,
        private upsService: UpsService,
        private documentoIdentidadService: DocumentoIdentidadService,
        private pacienteService: PacienteService,
        private rolGuardiaService: RolGuardiaService
    ) {
        this.justifyOptions = [
            {icon: "pi pi-align-left", justify: "Left"},
            {icon: "pi pi-align-right", justify: "Right"},
            {icon: "pi pi-align-center", justify: "Center"},
            {icon: "pi pi-align-justify", justify: "Justify"}
        ];

    }
    ngOnInit(): void {
        this.buildForm();
        this.formCuposOferta.get('fechaBusqueda').setValue(this.datafecha);
        // this.getDataUPS();
        this.getListaUps();
        this.getDocumentosIdentidad();
        // this.fechaParaReservaCupos = this.datafecha.getFullYear() + '-' + (this.datafecha.getMonth() + 1) + '-' + this.datafecha.getDate();
        // console.log("FECHAS", this.fechaParaReservaCupos);
        console.log("HORARIO", this.selectedHorario);
        this.selectCupos();
    }


    /**Busca los pacientes por su Numero de Documento**/
    pacienteByNroDoc() {
        let auxNroDoc = {
            tipoDoc: this.formCuposOferta.value.tipoDoc.abreviatura,
            nroDoc: this.formCuposOferta.value.nroDoc,
        }
        this.pacienteService.getPacienteByNroDoc(auxNroDoc).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('paciente por doc ', this.dataPacientes)
            this.formCuposOferta.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formCuposOferta.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formCuposOferta.get('primerNombre').setValue(this.dataPacientes.primerNombre);
            this.formCuposOferta.get('otrosNombres').setValue(this.dataPacientes.otrosNombres);
            this.formCuposOferta.get('sexo').setValue(this.dataPacientes.sexo);
            this.formCuposOferta.get('fechaNacimiento').setValue(this.dataPacientes.nacimiento.fechaNacimiento);
            this.formCuposOferta.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);
            this.formCuposOferta.get('celular').setValue(this.dataPacientes.celular);
            this.formCuposOferta.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
        });
    }


    /**lista los Servicios por IPRESS**/
    getListaUps() {
        this.rolGuardiaService
            .getServiciosPorIpress(this.idIpressLapostaMedica)
            .subscribe((resp) => {
                this.ups = resp["object"];
                // this.loading = false;
            });
    }


    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    /**Lista las ofertas **/
    getOfertascuposListar(data) {
        this.cuposService.getOfertasListar(data).subscribe((resp: any) => {
            this.dataOfertasCupos = resp.object;
            console.log("OFERTAS HORARIOS", this.dataOfertasCupos);
        });
    }


    buildForm() {
        this.formCuposOferta = this.fb.group({
            fechaBusqueda: new FormControl(''),
            fechaAtencion: new FormControl(''),
            oferta_id: new FormControl(''),
            descripcion: new FormControl(''),
            horaAtencion: new FormControl(''),
            horaAtencionFin: new FormControl(''),
            ambiente: new FormControl(''),

            primerNombre: new FormControl(''),
            otrosNombres: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            sexo: new FormControl(''),
            fechaNacimiento: new FormControl(''),
            estadoCivil: new FormControl(''),
            celular: new FormControl(''),

            nacionalidad: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            centroPoblado: new FormControl(''),
            direccion: new FormControl(''),

            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),

            tipoSeguro: new FormControl(''),
            transeunte: new FormControl(''),
            edad: new FormControl(''),
            dias: new FormControl(''),
            etapadeVida: new FormControl(''),
            estado: new FormControl(''),
        })
    }


    separar_Fechas() {
        let fecha = this.personalSelected2.fechaOferta;
        let elem = fecha.split(' ',);
        let fecha1 = elem[0];
        let hora = elem[1];
        this.fechaParaReservaCupos = fecha1;
    }

    saveForm() {
        this.separar_Fechas();
        this.isUpdate = false;
        const req = {
            fechaAtencion: this.fechaParaReservaCupos,
            nroCupo: this.personalSelected2.totalOfertas,
            oferta_id: this.personalSelected2.id,
            // descripcion: this.formCuposOferta.value.descripcion,
            descripcion: "asdfgh",
            horaAtencion: this.selectedHorario[0].horaInicio + ":00",
            horaAtencionFin: this.selectedHorario[0].horaFin + ":00",
            ambiente: this.personalSelected2.ambiente,

            paciente: {
                nombre: this.formCuposOferta.value.primerNombre + ", " + this.formCuposOferta.value.otrosNombres,
                apellidos: this.formCuposOferta.value.apePaterno + ", " + this.formCuposOferta.value.apeMaterno,
                tipoDoc: this.formCuposOferta.value.tipoDoc.abreviatura,
                nroDoc: this.formCuposOferta.value.nroDoc,
            },

            // transeunte: this.formCuposOferta.value.transeunte,
            transeunte: false,
            estado: this.estadoCupo,

            personal: {
                nombre: this.personalSelected2.personal.nombre,
                turno: this.personalSelected2.nombreTurno,
                nroDoc: this.personalSelected2.personal.nroDoc,
            },
            ipress: {
                ipress_id: this.personalSelected2.ipress.idIpress,
                nombre: this.personalSelected2.ipress.nombre,
                servicio: this.personalSelected2.ipress.servicio
            },
        };

        console.log("guardar", req);

        this.cuposService.saveCupos(req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        )

        // this.actualizarOfertaEstado();

    }

    /****Actualiza el estado de las ofertas despues de guardar un cupo LIBRE / OCUPADO**/
    actualizarOfertaEstado() {
        let data = {
            idOferta: this.personalSelected2.id,
            horaInicio: this.selectedHorario[0].horaInicio,
            horaFin: this.selectedHorario[0].horaFin,
            estado: "OCUPADO"
        }

        console.log("DATA ACTUALIZAR OFERTA", data);
        this.cuposService.updateEstadoOferta(data).subscribe(resp => {
            Swal.fire({
                icon: 'success',
                title: 'Estado Actualizado',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    openModal() {
        this.selectedHorario = null;
        this.cuposDialog = true;
    }

    aceptarDialogCupos() {
        let auxCupo: any = this.selectedHorario;
        if (auxCupo.length != 1) {
            this.messageService.add({severity: 'warn', summary: 'Alerta', detail: 'Solo debe seleccionar un horario'});
            return;
        }
        console.log('HORARIO SELECCIONADO', this.selectedHorario)
        console.log('selected servicio ', this.selectedServicio)
        this.cuposDialog = false;
        this.openDialog2();
        console.log("JPC", this.selectedHorario);
    }

    closeDialogCupos() {
        this.dataSelectHoras = null;
        this.dataOfertasCupos = null;
        this.cuposDialog = false;
        this.selectedHorario = {};
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Se cancelo la reserva de cupo',
            showConfirmButton: false,
            timer: 1500
        })
    }


    openDialog2() {
        this.usuarioDialog = true;
    }


    /** Selecciona el personal de salud para recuperar datos de un event **/
    onRowSelect(event) {
        console.log('event',);
        this.dataSelectAmbiente = event.data.ambiente;
        this.dataSelectServicio = event.data.ipress.servicio;
        this.personalSelected = event.data.personal.nombre;
        this.dataSelectHoras = event.data.horaLaboral;
        console.log('HORAS....', this.dataSelectHoras);
        /** personalSelected2 almacena todo los datos del event al seleccionar un personal**/
        this.personalSelected2 = event.data;
        console.log('select personal....', this.personalSelected2);
    }


    /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
    changeServicioSelected(event) {
        this.personalSelected = '';
        console.log(event)
        let data = {
            servicio: this.selectedServicio.nombreUPS,
            nombreIpress: this.iprees,
            fechaOferta: this.datafecha,
        }
        this.getOfertascuposListar(data);
        console.log("FECHA OFERTA", data)
    }


    selectCupos() {
        console.log("servicio", event);
        let data = {
            servicio: "ACUPUNTURA Y AFINES",
            fecha: this.datePipe.transform(this.formCuposOferta.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        this.cuposService.listaCuposConfirmados(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.dataCupos_por_fechas_servicio = res.object;
            console.log('LISTA DE CUPOS POR SERVICIO ', this.dataCupos_por_fechas_servicio);
        })

        if (this.dataCupos_por_fechas_servicio != null) {
            this.dataCupos_por_fechas_servicio = null;
        }
    }

    onRowUnselect(event) {
        console.log('no seleccionar');
    }


    cancelarPersona() {
        console.log('cancelar')
        this.selectedHorario = {};
        this.usuarioDialog = false;

    }

    recuperarDatos() {
        let data = {
            aux: this.formCuposOferta.value.nroDocumento
        }
    }
}
