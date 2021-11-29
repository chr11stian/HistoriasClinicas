import {Component, OnInit} from '@angular/core'
import { ReproCitasService } from '../../services/repro-citas.service';

@Component({
    selector: 'app-repro-citas',
    templateUrl: './repro-citas.component.html',
    styleUrls: ['./repro-citas.component.css']
})
export class ReproCitasComponent implements OnInit {
    datos: any[] = []
    dni:string = '619e90f0314f7469f8544cc1';
    desabilitar1: boolean= false;
    desabilitar2: boolean = false;
    tablaBD = [];
    


    days = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

    constructor(private reproService: ReproCitasService) {
        this.datos = [
            ['07:00 am - 08:30 am',1,null,1,null,null,1,null],
            ['08:30 am - 10:00 am',1,null,1,1,null,1,null],
            ['10:00 am - 11:30 am',1,null,null,1,null,1,null],
            ['11:30 am - 01:00 pm',null,null,1,null,null,1,null],
            ['01:00 pm - 02:30 pm',null,1,2,1,1,null,1],
        ]
        
    }

    ngOnInit(): void {
        this.getTablaDatos();
    }

    async getTablaDatos() {
        await this.reproService.getDatosGenerales(this.dni)
        .toPromise().then(res => res['object'])
        .then(data => {
            this.tablaBD = data['datosGeneralesConsulta'];
        })
        .catch(error => { return error;});
        console.log("joder",this.tablaBD);
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
