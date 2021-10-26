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
import {UpsService} from "../../mantenimientos/services/ups/ups.service";


@Component({
    selector: 'app-cupos',
    providers: [DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {

    dataSelectAmbiente: any;
    estadoHoras: string = "LIBRE";
    dataSelectOferta: any;
    totalHoras: any;
    hora: any;
    personals: any;
    datafecha: Date = new Date();
    datafechaActual: string;

    dataOfertasCupos: any;
    ups: any;
    datePipe = new DatePipe('en-US');
    selectedCupo: any;
    cuposDialog: boolean;
    usuarioDialog: boolean;
    subscription: Subscription;
    selectedServicio: any;
    listaPersonal: any;
    personalSelected: string = '';
    justifyOptions: any[];
    stateOptions: any[];
    selectedHorario: any;
    formUsuarios: FormGroup;

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


    iprees: string = "Zarzuela Baja";

    constructor(
        private config: DynamicDialogConfig,
        private router: Router,
        private primeNGConfig: PrimeNGConfig,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cuposService: CuposService,
        private upsService: UpsService
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
        this.inicializarForm();
        this.getDataUPS();
        this.datafechaActual = this.datafecha.getDate() + '-' + (this.datafecha.getMonth() + 1) + '-' + this.datafecha.getFullYear();
        console.log("FECHAS", this.datafechaActual);
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

        console.log("JPC", this.selectedHorario);
    }

    closeDialogCupos() {
        this.dataSelectOferta = null;
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
        this.dataSelectAmbiente = event.data.ambiente;
        this.dataSelectOferta = event.data.horaLaboral;
        console.log('event', this.dataSelectOferta);
        this.personalSelected = event.data.personal.nombre;
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
