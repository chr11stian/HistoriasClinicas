import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-datos-generales-filiacion',
    templateUrl: './datos-generales-filiacion.component.html',
    styleUrls: ['./datos-generales-filiacion.component.css']
})
export class DatosGeneralesFiliacionComponent implements OnInit {
    departamentos: any;
    provincias: any;
    distritos: any
    options: any;
    stadoCivil: any;
    familiares: any
    studies: any;
    dataPacientes: any;

    fechanacimiento: string;
    edad: any;

    formDatos_Generales: FormGroup;

    constructor(private formDatosGenerales: FormBuilder,
                private filiancionService: FiliancionService) {
        this.options = [
            {name: 'SI', code: 'S'},
            {name: 'NO', code: 'N'},
        ];

        this.studies = [
            {gradoInstruccion: 'Analfabeta', code: 'Analfabeta'},
            {gradoInstruccion: 'Primaria', code: 'Primaria'},
            {gradoInstruccion: 'Secundaria', code: 'Secundaria'},
            {gradoInstruccion: 'Superior', code: 'Superior'},
            {gradoInstruccion: 'Superior No Univ.', code: 'SuperiorNo'},
        ];

        this.stadoCivil = [
            {estadocivil: 'Casado', code: 'Casado'},
            {estadocivil: 'Combiviente', code: 'Combiviente'},
            {estadocivil: 'Soltero', code: 'Soltero'},
        ];

        this.departamentos = [
            {departamento: 'Lima'},
            {departamento: 'Arequipa'},
            {departamento: 'Puno'},
            {departamento: 'Madre de Dios'},
            {departamento: 'Cusco'},
            {departamento: 'Loreto'},
            {departamento: 'Cajamarca'},
            {departamento: 'Ayacucho'},
        ];
        this.provincias = [
            {provincia: 'Cusco'},
            {provincia: 'Lima'},
            {provincia: 'Arequipa'},
            {provincia: 'Puno'},
            {provincia: 'Madre de Dios'},
            {provincia: 'Loreto'},
            {provincia: 'Cajamarca'},
            {provincia: 'Ayacucho'},
        ];
        this.distritos = [
            {distrito: 'Cusco'},
            {distrito: 'Santiago'},
            {distrito: 'San sebastian'},
        ];

    }


    ngOnInit(): void {
        this.buildForm();
        this.pacienteByNroDoc();
    }


    calEdad() {
        let edad;
        // let fechaActual = this.añoActual;
        // let anioNacimiento = fechanacimiento.split(3)
        // console.log("edad", fechaActual);
    }

    calcularEdad(fecha) {
        let hoy = new Date();
        let cumpleanos = new Date(fecha);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();

        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }


        console.log(edad)
        return edad;

    }

    esNumero(strNumber) {
        if (strNumber == null) return false;
        if (strNumber == undefined) return false;
        if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
        if (strNumber == "") return false;
        if (strNumber === "") return false;
        let psInt, psFloat;
        psInt = parseInt(strNumber);
        psFloat = parseFloat(strNumber);
        return !isNaN(strNumber) && !isNaN(psFloat);
    }


    calcularEdad2(fecha) {
        // Si la fecha es correcta, calculamos la edad
        if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
            // fecha = fecha.formatDate(fecha, "dd-MM-yyyy");
            fecha = fecha.formatDate(fecha, "yyyy-MM-dd");
        }

        //separamos lod dias meses y año
        let values = fecha.split("-");
        let dia = values[2];
        let mes = values[1];
        let anio = values[0];

        // cogemos los valores actuales
        let fechaActual = new Date();
        let anioActual = fechaActual.getFullYear();
        let mesActual = fechaActual.getMonth() + 1;
        let diaActual = fechaActual.getDate();


        // realizamos el calculo de la edad en años
        var edad = (anioActual) - anio;
        if (mesActual < mes) {
            edad--;
        }
        if ((mes == mesActual) && (diaActual < dia)) {
            edad--;
        }
        if (edad > anioActual) {
            edad -= anioActual;
        }

        // calculamos los meses
        let meses = 0;

        if (mesActual > mes && dia > diaActual)
            meses = mesActual - mes - 1;
        else if (mesActual > mes)
            meses = mesActual - mes
        if (mesActual < mes && dia < diaActual)
            meses = 12 - (mes - mesActual);
        else if (mesActual < mes)
            meses = 12 - (mes - mesActual + 1);
        if (mesActual == mes && dia > diaActual)
            meses = 11;

        // calculamos los dias
        let dias = 0;
        if (diaActual > dia)
            dias = diaActual - dia;
        if (diaActual < dia) {
            let ultimoDiaMes = new Date(anioActual, mesActual - 1, 0);
            dias = ultimoDiaMes.getDate() - (dia - diaActual);
        }
        console.log("edad", edad + " años, " + meses + " meses y " + dias + " días");

        this.edad = edad;
        return edad + " años, " + meses + " meses y " + dias + " días";
    }

    pacienteByNroDoc() {

        let tipoDoc = "DNI";
        let nroDoc = "10101011"
        // nroDoc: "24015415"
        this.filiancionService.getPacienteNroDocFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('paciente por doc ', this.dataPacientes)


            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('nombres').setValue(this.dataPacientes.primerNombre + ' ' + this.dataPacientes.otrosNombres);
            this.formDatos_Generales.get('establecimiento').setValue(this.dataPacientes.nombreEESS);
            this.formDatos_Generales.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);

            // this.formDatos_Generales.get('aplica').setValue(this.dataPacientes.aplica);
            // this.formDatos_Generales.get('referencia').setValue(this.dataPacientes.nacimiento.fechaNacimiento);
            this.formDatos_Generales.get('codAficiaconSIS').setValue(this.dataPacientes.codAficiaconSIS);
            this.formDatos_Generales.get('docIndentidad').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('fechaNacimiento').setValue(this.dataPacientes.nacimiento.fechaNacimiento);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
            this.formDatos_Generales.get('departamento').setValue(this.dataPacientes.domicilio.departamento);
            // this.formDatos_Generales.get('provincia').setValue(this.dataPacientes.domicilio.provincia);
            // this.formDatos_Generales.get('distrito').setValue(this.dataPacientes.domicilio.distrito);

            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);

            this.fechanacimiento = this.dataPacientes.nacimiento.fechaNacimiento;
            this.calcularEdad2(this.fechanacimiento);
            // this.calcularEdad2("1990-09-21");
            this.formDatos_Generales.get('edad').setValue(this.edad);
        });
    }

    buildForm() {
        this.formDatos_Generales = this.formDatosGenerales.group({
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            nombres: new FormControl(''),
            establecimiento: new FormControl(''),
            estabOrigen: new FormControl(''),
            aplica: new FormControl(''),
            referencia: new FormControl(''),
            codAficiaconSIS: new FormControl(''),
            docIndentidad: new FormControl(''),
            fechaNacimiento: new FormControl(''),
            ocupacion: new FormControl(''),
            edad: new FormControl(''),
            direccion: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            amiosAprobados: new FormControl(''),
            nombreNroSector: new FormControl(''),
            estadoCivil: new FormControl(''),
            departamento: new FormControl(''),
            nombreRN: new FormControl(''),
            pabreRN: new FormControl(''),
            religion: new FormControl(''),
            cel1: new FormControl(''),
            cel2: new FormControl(''),
            idioma: new FormControl(''),
        })
    }

}
