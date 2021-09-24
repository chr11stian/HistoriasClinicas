import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
    estadoCivil:string;
    fecha: Date;

    listaHorarios: any = [{
        hour: '08:00',
        today: true,
        tomorrow: false
    }, {
        hour: '08:30',
        today: true,
        tomorrow: false
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
        apellidos: 'LAYME LAYME',
        nombres: 'JAVIER',
        servicio: 'MEDICINA GENERAL',
        horarioAtencion: '09:00 am',
        fechaAtencion: '20/08/2021'
    }]

    constructor(
        private config: DynamicDialogConfig,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('lista de cupos', this.listaCupos);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();

    }

    openModal() {
        this.cuposDialog = true;
    }

    aceptarDialogCupos() {
        console.log('selected servicio ', this.selectedServicio)
        this.cuposDialog = false;
        this.openDialog2();
    }

    closeDialogCupos() {
        this.cuposDialog = false;
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

    selectRowHorario(event) {
        console.log(event)
    }

    unselectHorario(event) {
        console.log(event)
    }

    changeServicioSelected(event) {
        this.personalSelected = '';
        console.log(event)
        this.listaPersonal = this.listaPersonalAux.filter(item => item.codServicio == event.codServicio)
    }

    clickDiv(event) {
        console.log('click desde un div', event);
    }
}