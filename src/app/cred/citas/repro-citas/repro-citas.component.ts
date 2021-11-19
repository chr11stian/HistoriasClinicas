import {Component, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
    selector: 'app-repro-citas',
    templateUrl: './repro-citas.component.html',
    styleUrls: ['./repro-citas.component.css']
})
export class ReproCitasComponent implements OnInit {
    datos: any[] = []

    checkedon: boolean = true
    checkedoff: boolean = false
    desabilitar: boolean
    reproFG: FormGroup

    // rojo  /* true  este ya esta cogido */
    // / blanco * null  este esta por coger */
    /*  amarillo  false  este esta por coger */
    days = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

    constructor() {
        this.datos = [
            ['07:00 am - 08:30 am', true, false, false, true, false, false, false],
            ['08:30 am - 10:00 am', false, true, false, false, true, false, false],
            ['10:00 am - 11:30 am', true, false, false, false, true, false, false],
            ['11:30 am - 01:00pm', false, false, true, false, false, false, true],
            ['01:00 pm - 02:30pm', true, false, false, false, true, false, false],
        ]
        this.desabilitar = false
    }

    ngOnInit(): void {
    }

    send(rowIndex, indexCol): void {
        alert('usted selecciona el dia : ' + this.days[indexCol] + ' a las ' + this.datos[rowIndex][0])
    }
}

// (onChange)="cambio($event)"
// (onChange)="cambio($event)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
