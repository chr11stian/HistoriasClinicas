import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {MessageService, PrimeNGConfig} from 'primeng/api';

import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {Cupo} from '../../core/models/cupo.models';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CuposService} from "../../core/services/cupos.service";


@Component({
    selector: 'app-cupos',
    providers: [DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {


    datafecha: Date;
    dataOfertasCupos: any;
    ups: any;
    upsnombre: any;


    dataOfertas: any;
    dataServicios: any;
    dataPersonals: any;
    dataHoraAtencions: any;
    dataHoraAtencion: any;
    horas: any;

    personalHoras: any;

    selectedCupo: any;
    cupos: any;
    cuposDialog: boolean;
    usuarioDialog: boolean;
    subscription: Subscription;
    selectedServicio: any;

    listaPersonal: any;

    personalSelected: string = '';
    nombre: string;
    estadoCivil: string;
    fecha: Date;
    selectedTipoDocumento: string;
    justifyOptions: any[];
    value1: any;
    value3: any;
    stateOptions: any[];
    cellHour: any;
    cellHoy: any;
    cellTomorrow: any;
    selectedHorario: any;
    selectedPersonal: any;
    formUsuarios: FormGroup;
    formCupos: FormGroup;

    today: Date = new Date();
    jsToday: string = ''
    selected: any;
    docIdentidad: any = [{
        id: '001',
        nombre: 'Documento Nacional de Identidad',
        longitud: '8',
        estado: '1',
        abreviatura: 'DNI'
    }, {
        id: '002',
        nombre: 'Pasaporte',
        longitud: '12',
        estado: '1',
        abreviatura: 'PASAPORTE'
    }, {
        id: '003',
        nombre: 'CARNET DE EXTRANJERIA',
        longitud: '12',
        estado: '1',
        abreviatura: '	CARNET EXT'
    }]


    iprees: string = "ACUPUNTURA Y AFINES";

    constructor(
        private config: DynamicDialogConfig,
        private router: Router,
        private primeNGConfig: PrimeNGConfig,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cuposService: CuposService
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

        this.today.getHours();
        let listHorarios: any = [];
        let minutes;
        // console.log('lista de cupos', this.listaCupos);
        this.primeNGConfig.ripple = true;
        console.log('hoy', this.today);
        this.today.setMinutes(this.today.getMinutes() + 30);
        this.jsToday = formatDate(this.today, 'HH:mm:ss a', 'en-ES', '-0500');
        console.log('tiempo suma ', this.today);
        console.log('hora nueva ', this.jsToday);
        this.inicializarForm();

        this.getOfertas(1);
        this.getServicios();
        this.getPersonal();
        this.getHora_Atencion();

        this.getDataUPS();

    }

    getDataUPS() {
        this.cuposService.getTipoUPSs().subscribe((resp: any) => {
            this.ups = resp.object;
            console.log("UPS", this.ups);
        });
    }


    getOfertascupos(data) {
        this.cuposService.getOfertas(data).subscribe((resp: any) => {
            this.dataOfertasCupos = resp;
            console.log("OFERTAS CUPOS", resp);
        });
    }


    getOfertas(id) {
        this.cuposService.getOferta(id).subscribe((resp: any) => {
            this.dataOfertas = resp;
            console.log("OFERTA", resp);
        });
    }

    getServicios() {
        this.cuposService.getServicios().subscribe((resp: any) => {
            this.dataServicios = resp;
            console.log("SERVICIOS", resp);
        });
    }

    getPersonal() {
        this.cuposService.getPersonal().subscribe((resp: any) => {
            this.dataPersonals = resp;
            console.log("Personal", resp);
        });
    }

    getHora_Atencion() {
        this.cuposService.getHoraAtencion().subscribe((resp: any) => {
            this.dataHoraAtencions = resp;
            console.log("HORA ATENCION", resp);
        });
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    inicializarForm() {

        this.formUsuarios = this.fb.group({
            tipoDocumento: new FormControl(''),
            nroDocumento: new FormControl(''),
            nombre: new FormControl(''),
            apellidoPaterno: new FormControl(''),
            apellidoMaterno: new FormControl(''),
            sexo: new FormControl(''),
            fecha: new FormControl(''),
            estadoCivil: new FormControl(''),
            telefono: new FormControl(''),
            nacionalidad: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            centroPblado: new FormControl(''),
            domicilioActual: new FormControl(''),
            tipoSeguro: new FormControl(''),
            transeuntes: new FormControl(''),
            estapaVida: new FormControl(''),
            edad: new FormControl(''),
            dias: new FormControl(''),
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
        console.log('horario ', this.selectedHorario)
        console.log('selected servicio ', this.selectedServicio)
        this.cuposDialog = false;
        this.openDialog2();
    }

    closeDialogCupos() {
        this.horas = null;
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
        console.log('event', event.data);
        this.personalSelected = event.data.apellidos + ' ' + event.data.nombres;

        this.personalHoras = event.data.codServicio;

        this.horas = this.dataHoraAtencions.filter(item => item.codServicio == this.personalHoras)
        console.log("aaa", this.horas);
    }

    onRowUnselect(event) {
        console.log('no seleccionar');
    }

    changeServicioSelected(event) {
        this.personalSelected = '';
        console.log(event)
        this.listaPersonal = this.dataPersonals.filter(item => item.codServicio == event.codServicio);
        this.horas = null;
        let data = {
            servicio: this.selectedServicio,
            nombreIpress: this.iprees,
            fechaOferta: this.datafecha
        }
        this.getOfertascupos(data);
    }

    GuardarPersona() {
        this.selectedHorario = {};
        this.recuperarDatos()
        this.usuarioDialog = false;
    }

    cancelarPersona() {
        console.log('cancelar')
        this.selectedHorario = {};
        this.usuarioDialog = false;

    }

    recuperarDatos() {
        let data = {
            aux: this.formUsuarios.value.nroDocumento
        }
    }
}
