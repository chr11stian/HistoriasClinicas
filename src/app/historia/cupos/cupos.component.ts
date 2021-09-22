import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cupos',
    providers:[DynamicDialogConfig],
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css']
})
export class CuposComponent implements OnInit {

    selectedCupo: any;
    cupos: any;
    cuposDialog:boolean;
    usuarioDialog: boolean;
    subscription: Subscription;


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
        // this.cupos =
        console.log('lista de cupos', this.listaCupos);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();

    }

    openModal() {
        this.cuposDialog = true;
    }
    
    aceptarDialogCupos(){
        console.log('aceptar Dialog 1')
    }

    closeDialogCupos(){
        console.log('se cerro el dialog')
    }

    openDialog2(){

    }
}

