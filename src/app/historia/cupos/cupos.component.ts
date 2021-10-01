import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Cupo } from '../../core/models/cupo.models';

@Component({
    selector: 'app-cupos',
    providers: [DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {

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
    selectedHorario: Cupo;
    selectedPersonal: any;

    today: Date = new Date();
    jsToday: string = ''

    citas: Cupo[] = [{
        fecharegistro: '28/09/2021',
        nroCupo: '01',
        descripcion: 'CITA DEL ESTOMAGO',
        horaAtencion: '08:00',
        horaAtencionFin: '08:30',
        ambiente: 'CONSULTORIO 2',
        paciente: {
            nombre: 'JONATHAN',
            apellidos: 'MOROCCO LAYME',
            tipoDoc: '1',
            nroDoc: '72745818',
        },
        rol: {
            personal: 'PERSONAL 1',
            turno: 'MAÑANA',
            docPersonal: '70707070',
            idRol: '01'
        },
        ipress: {
            idIpress: '001',
            nombre: 'IPRESS 01',
            servicio: 'servicio 1'
        },
        estado: '1'
    }, {
        fecharegistro: '28/09/2021',
        nroCupo: '02',
        descripcion: 'CITA DEL ESTOMAGO',
        horaAtencion: '08:30',
        horaAtencionFin: '09:00',
        ambiente: 'CONSULTORIO 2',
        paciente: {
            nombre: 'JONATHAN',
            apellidos: 'MOROCCO LAYME',
            tipoDoc: '1',
            nroDoc: '72745818',
        },
        rol: {
            personal: 'PERSONAL 1',
            turno: 'MAÑANA',
            docPersonal: '70707070',
            idRol: '01'
        },
        ipress: {
            idIpress: '001',
            nombre: 'IPRESS 01',
            servicio: 'servicio 1'
        },
        estado: '1'
    }, {
        fecharegistro: '28/09/2021',
        nroCupo: '03',
        descripcion: 'CITA DEL ESTOMAGO',
        horaAtencion: '09:00',
        horaAtencionFin: '09:30',
        ambiente: 'CONSULTORIO 2',
        paciente: {
            nombre: 'JONATHAN',
            apellidos: 'MOROCCO LAYME',
            tipoDoc: '1',
            nroDoc: '72745818',
        },
        rol: {
            personal: 'PERSONAL 1',
            turno: 'MAÑANA',
            docPersonal: '70707070',
            idRol: '01'
        },
        ipress: {
            idIpress: '001',
            nombre: 'IPRESS 02',
            servicio: 'servicio 1'
        },
        estado: '1'
    }, {
        fecharegistro: '28/09/2021',
        nroCupo: '04',
        descripcion: 'CITA DEL ESTOMAGO',
        horaAtencion: '12:00',
        horaAtencionFin: '12:30',
        ambiente: 'CONSULTORIO 2',
        paciente: {
            nombre: 'JONATHAN',
            apellidos: 'MOROCCO LAYME',
            tipoDoc: '1',
            nroDoc: '72745818',
        },
        rol: {
            personal: 'PERSONAL 1',
            turno: 'MAÑANA',
            docPersonal: '70707070',
            idRol: '01'
        },
        ipress: {
            idIpress: '001',
            nombre: 'IPRESS 03',
            servicio: 'servicio 1'
        },
        estado: '1'
    }]


    servicios: any = [{
        codServicio: '1',
        nombreServicio: 'MEDICINA GENERAL'
    }, {
        codServicio: '2',
        nombreServicio: 'OBSTETRICIA'
    }, {
        codServicio: '3',
        nombreServicio: 'PEDIATRIA'
    }, {
        codServicio: '4',
        nombreServicio: 'ENFERMERIA'
    }, {
        codServicio: '5',
        nombreServicio: 'ODONTOLOGIA'
    }, {
        codServicio: '6',
        nombreServicio: 'ADMINISTRACION'
    }]

    listaPersonalAux: any = [{
        nro: 1,
        apellidos: 'Morocco layme',
        nombres: 'jonathan',
        codServicio: '1'
    }, {
        nro: 2,
        apellidos: 'pimentel cruz',
        nombres: 'jimmy',
        codServicio: '1'
    }, {
        nro: 1,
        apellidos: 'farfan saravia',
        nombres: 'banesa',
        codServicio: '2'
    }, {
        nro: 2,
        apellidos: 'mejia pinto',
        nombres: 'abel',
        codServicio: '3'
    }];

    listaCupos: any = [{
        dni: '72745818',
        apellidos: 'MOROCCO LAYME',
        nombres: 'JONATHAN',
        servicio: 'ODONTOLOGIA',
        horarioAtencion: '08:00',
        fechaAtencion: '20/08/2021'
    }, {
        dni: '72745817',
        apellidos: 'MOROCCO OTRO',
        nombres: 'JONA',
        servicio: 'ENFERMERIA',
        horarioAtencion: '08:30',
        fechaAtencion: '20/08/2021'
    }, {
        dni: '72745810',
        apellidos: 'OTRO EJEMPLO',
        nombres: 'NO KIEB',
        servicio: 'MEDICINA GENERAL',
        horarioAtencion: '09:00 am',
        fechaAtencion: '20/08/2021'
    }]

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

    constructor(
        private config: DynamicDialogConfig,
        private router: Router,
        private primeNGConfig: PrimeNGConfig,
        private messageService: MessageService,
    ) {
        this.justifyOptions = [
            { icon: "pi pi-align-left", justify: "Left" },
            { icon: "pi pi-align-right", justify: "Right" },
            { icon: "pi pi-align-center", justify: "Center" },
            { icon: "pi pi-align-justify", justify: "Justify" }
        ];

        this.stateOptions = [
            { label: "Off", value: "off" },
            { label: "On", value: "on" }
        ];
    }

    ngOnInit(): void {
        this.today.getHours();
        let listHorarios: any = [];
        let minutes;
        console.log('lista de cupos', this.listaCupos);
        this.primeNGConfig.ripple = true;
        console.log('hoy', this.today);
        this.today.setMinutes(this.today.getMinutes() + 30);
        this.jsToday = formatDate(this.today, 'HH:mm:ss a', 'en-ES', '-0500');
        console.log('tiempo suma ', this.today);
        console.log('hora nueva ', this.jsToday);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    openModal() {
        this.selectedHorario = null;
        this.cuposDialog = true;
    }

    aceptarDialogCupos() {
        let auxCupo: any = this.selectedHorario;
        if (auxCupo.length != 1) {
            this.messageService.add({severity: 'warn', summary: 'Alerta', detail: 'Solo debe seleccionar un horario' });
            return;
        }
        console.log('horario ', this.selectedHorario)
        console.log('selected servicio ', this.selectedServicio)
        this.cuposDialog = false;
        this.openDialog2();
    }

    closeDialogCupos() {
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
        this.personalSelected = event.data.apellidos + ' ' + event.data.nombres
    }

    onRowUnselect(event) {
        console.log('no seleccionar');
    }

    changeServicioSelected(event) {
        this.personalSelected = '';
        console.log(event)
        this.listaPersonal = this.listaPersonalAux.filter(item => item.codServicio == event.codServicio)
    }

    GuardarPersona() {
        this.selectedHorario = {};
        this.usuarioDialog = false;
    }
    cancelarPersona() {
        console.log('cancelar')
        this.selectedHorario = {};
        this.usuarioDialog = false;

    }
}