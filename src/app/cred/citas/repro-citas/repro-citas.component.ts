import {Component, OnInit} from '@angular/core'
import { ReproCitasService } from '../../services/repro-citas.service';

export interface DatosGenerales {
    id:               string;
    nroHcl:           string;
    tipoDoc:          string;
    nroDoc:           string;
    primerNombre:     string;
    otrosNombres:     string;
    apePaterno:       string;
    apeMaterno:       string;
    sexo:             string;
    nacimiento:       Nacimiento;
    celular:          string;
    tipoSeguro:       string;
    discapacidad:     string[];
    nacionalidad:     string;
    estadoCivil:      string;
    procedencia:      string;
    etnia:            Etnia;
    gradoInstruccion: string;
    fechaInscripcion: string;
    fechaEmision:     string;
    nombrePadre:      string;
    nombreMadre:      string;
    restriccion:      string;
    domicilio:        Domicilio;
    idIpress:         string;
    nombreEESS:       null;
}

export interface Domicilio {
    departamento: string;
    provincia:    string;
    distrito:     string;
    direccion:    string;
    idccpp:       null;
    ccpp:         string;
    ubigeo:       string;
}

export interface Etnia {
    tipoEtnia: string;
    etnia:     string;
}

export interface Nacimiento {
    fechaNacimiento: Date;
    departamento:    string;
    provincia:       string;
    distrito:        string;
}

@Component({
    selector: 'app-repro-citas',
    templateUrl: './repro-citas.component.html',
    styleUrls: ['./repro-citas.component.css']
})

export class ReproCitasComponent implements OnInit {
    datos: any[] = []
    dni:string = '614cac4e5cf06e5a31bfd079';
    desabilitar1: boolean= false;
    desabilitar2: boolean = false;
    tablaBD: DatosGenerales = null;
    days2 =[];
    loadisg:boolean = true;
    age:number;


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
        let today = new Date().getDay();
        console.log("que dia es hoy?",this.days[today]);
        this.days2 = this.days.splice(1,today-1)
        this.days= this.days.concat(this.days2)
        console.log(this.days2, this.days);
        console.log('aaaaa',this.tablaBD);
        
    }

    async getTablaDatos() {
        await this.reproService.getDatosGenerales(this.dni)
        .toPromise().then(res => <DatosGenerales> res['object'])
        .then(data => {
            this.tablaBD = data;
            this.loadisg=false;
        })
        .catch(error => { return error;});
        
        this.calcularEdad(this.tablaBD.nacimiento.fechaNacimiento);
        
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
    calcularEdad(dateString){
        let hoy = new Date()
        let fechaNacimiento = new Date(dateString)
        this.age = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
            diferenciaMeses < 0 ||
            (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            this.age--
        }
        console.log(this.age);
        
        
        

    }
}

// (onChange)="cambio($event)"
// (onChange)="cambio($event)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
// (onChange)="changeValue($event,rowIndex,indexCol)"
