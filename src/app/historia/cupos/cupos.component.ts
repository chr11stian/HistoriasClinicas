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


@Component({
    selector: 'app-cupos',
    providers: [DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {
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
    datafechaActual: string;
    listaDocumentosIdentidad: any

    dataOfertasCupos: any;
    ups: any;
    datePipe = new DatePipe('en-US');
    selectedCupo: any;
    cuposDialog: boolean;
    usuarioDialog: boolean;
    subscription: Subscription;
    selectedServicio: any;
    selectedServicio2: any;
    listaPersonal: any;
    personalSelected: string = '';
    justifyOptions: any[];
    stateOptions: any[];
    formCuposOferta: FormGroup;


    iprees: string = "Zarzuela Baja";

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
    ) {
        this.justifyOptions = [
            {icon: "pi pi-align-left", justify: "Left"},
            {icon: "pi pi-align-right", justify: "Right"},
            {icon: "pi pi-align-center", justify: "Center"},
            {icon: "pi pi-align-justify", justify: "Justify"}
        ];

        this.stateOptions = [
            {label: "Off", value: "off"},
            {label: "On", value: "on"}
        ];
    }

    ngOnInit(): void {
        this.buildForm();
        this.getDataUPS();
        this.getDocumentosIdentidad();
        this.datafechaActual = this.datafecha.getDate() + '-' + (this.datafecha.getMonth() + 1) + '-' + this.datafecha.getFullYear();
        console.log("FECHAS", this.datafechaActual);
        console.log("HORARIO", this.selectedHorario);

    }

    recuperar(rowData) {
        this.isUpdate = true;
        this.formCuposOferta.reset();
        this.formCuposOferta.get('nroDoc').setValue(rowData.nroDoc);
        this.formCuposOferta.get('tipoDoc').setValue(rowData.tipoDoc);
        this.formCuposOferta.get('apePaterno').setValue(rowData.apePaterno);
        this.formCuposOferta.get('apeMaterno').setValue(rowData.apeMaterno);
        this.formCuposOferta.get('primerNombre').setValue(rowData.primerNombre);
        // console.log(rowData.detalleIpress[0].fechaInicio);
        // this.idUpdate = rowData.id;
        // this.personalDialog = true;
    }


    pacienteByNroDoc() {
        let auxNroDoc = {
            tipoDoc: this.formCuposOferta.value.tipoDoc.abreviatura,
            nroDoc: this.formCuposOferta.value.nroDoc,
            // nroDoc: "24015415"
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

    getCupos_Fecha_Servicio(data) {
        this.cuposService.getCuposServicioFecha(data).subscribe((res: any) => {
            this.dataCupos_por_fechas_servicio = res.object;
            console.log('Listasssss ', this.dataCupos_por_fechas_servicio);
        })
    }

    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    getDataUPS() {
        this.upsService.getUPS().subscribe((resp: any) => {
            this.ups = resp.object;
            console.log("ups", this.ups);
        });
    }


    getOfertascuposListar(data) {
        this.cuposService.getOfertasListar(data).subscribe((resp: any) => {
            this.dataOfertasCupos = resp.object;
            console.log("OFERTAS HORARIOS", this.dataOfertasCupos);
        });
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


    buildForm() {
        this.formCuposOferta = this.fb.group({
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

    // openNew() {
    //     this.isUpdate = false;
    //     this.formCuposOferta.reset();
    //     this.formCuposOferta.get('tipoDoc').setValue("");
    //     this.formCuposOferta.get('nroDoc').setValue("");
    //     this.formCuposOferta.get('nombre').setValue("");
    //     this.formCuposOferta.get('apellidos').setValue("");
    //     this.usuarioDialog = true;
    // }

    saveForm() {
        this.isUpdate = false;
        const req = {
            fechaAtencion: this.personalSelected2.fechaOferta,
            nroCupo: this.personalSelected2.totalOfertas,
            oferta_id: this.personalSelected2.id,
            // descripcion: this.formCuposOferta.value.descripcion,
            descripcion: "asdfgh",
            horaAtencion: this.selectedHorario[0].horaInicio + ":00",
            horaAtencionFin: this.selectedHorario[0].horaFin + ":00",
            ambiente: this.personalSelected2.ambiente,

            paciente: {
                nombre: this.formCuposOferta.value.primerNombre + ", " + this.formCuposOferta.value.otrosNombres,
                apellidos: this.formCuposOferta.value.apePaterno + ", "+ this.formCuposOferta.value.apeMaterno,
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
        console.log('horario ', this.selectedHorario)
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

    onRowSelect(event) {
        console.log('event',);

        this.dataSelectAmbiente = event.data.ambiente;
        this.dataSelectServicio = event.data.ipress.servicio;
        this.personalSelected = event.data.personal.nombre;
        this.dataSelectHoras = event.data.horaLaboral;
        console.log('HORAS....', this.dataSelectHoras);
        this.personalSelected2 = event.data;
        console.log('select personal....', this.personalSelected2);
    }

    selectCupos() {

        let data = {
            servicio: this.selectedServicio.nombreUPS,
            fecha: "2021-10-3",
        }

        this.getCupos_Fecha_Servicio(data);


        if (this.dataCupos_por_fechas_servicio != null) {
            this.dataCupos_por_fechas_servicio = null;
        }

    }

    onRowUnselect(event) {
        console.log('no seleccionar');
    }

    changeServicioSelected(event) {
        this.personalSelected = '';
        console.log(event)
        let data = {
            servicio: this.selectedServicio.nombreUPS,
            nombreIpress: this.iprees,
            fechaOferta: this.datafecha,
        }
        this.getOfertascuposListar(data);
        // this.listaPersonal = this.dataOfertasCupos.filter(item => item.horaLaboral == event.horaLaboral);
    }

    GuardarPersona() {


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
