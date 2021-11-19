import {Component, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
    selector: 'app-repro-citas',
    templateUrl: './repro-citas.component.html',
    styleUrls: ['./repro-citas.component.css']
})
export class ReproCitasComponent implements OnInit {
    datos: any[] = []

    desabilitar1: boolean= false;
    desabilitar2: boolean = false;
    reproFG: FormGroup

    // rojo  /* true  este ya esta cogido */
    // / blanco * null  este esta por coger */
    /*  amarillo  false  este esta por coger */
    days = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

    constructor() {
        this.datos = [
            ['07:00 am - 08:30 am',1,null,1,null,null,1,null],
            ['08:30 am - 10:00 am',1,null,1,1,null,1,null],
            ['10:00 am - 11:30 am',1,null,null,1,null,1,null],
            ['11:30 am - 01:00 pm',null,null,1,null,null,1,null],
            ['01:00 pm - 02:30 pm',null,1,2,1,1,null,1],
        ]
        
    }

    ngOnInit(): void {
    }

    send(rowIndex, indexCol): void {
        alert('Usted selecciona el dia : ' + this.days[indexCol] + ' a las ' + this.datos[rowIndex][0])
        this.desabilitar2 = true;
        console.log(rowIndex,indexCol);
        
    }

    send1(rowIndex, indexCol): void {
        alert('Anular seleccion dia : ' + this.days[indexCol] + ' a las ' + this.datos[rowIndex][0])
        this.desabilitar2 = false;
        console.log(rowIndex,indexCol);
        
    }
}

// (onChange)="cambio($event)"
// (onChange)="cambio($event)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
