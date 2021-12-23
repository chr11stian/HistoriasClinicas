import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Component({
    selector: 'app-datos-generales-filiacion',
    templateUrl: './datos-generales-filiacion.component.html',
    styleUrls: ['./datos-generales-filiacion.component.css']
})
export class DatosGeneralesFiliacionComponent implements OnInit {

    fecha: Date;//fecha Actual
    departamentos: any;
    provincias: any;
    distritos: any
    options: any;
    stadoCivil: any;
    familiares: any
    studies: any;
    dataPacientes: any;
    id: any;
    fechanacimiento: string;
    edad: any;
    // idDocumento: string;
    dataIDfiliacion: any;
    formDatos_Generales: FormGroup;


    idRecuperado: string = "";
    tipoDocRecuperado: string;
    nroDocRecuperado: string;

    fechaConvertido: string;

    constructor(private formDatosGenerales: FormBuilder,
                private filiancionService: FiliancionService,
                private obstetriciaGeneralService: ObstetriciaGeneralService) {

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.idRecuperado = this.obstetriciaGeneralService.idGestacion;


        this.options = [
            {booleano: true, name: "SI"},
            {booleano: false, name: "NO"}
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
        console.log("IdRecuperado", this.idRecuperado);
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        this.obternerFechaActual();
        this.buildForm();

        if (this.idRecuperado == null) {
            this.getpacienteByNroDoc();
        } else this.getpacienteFiiacionByID();

    }


    obternerFechaActual() {
        this.fecha = new Date();
        let dd = this.fecha.getDate();
        let mm = this.fecha.getMonth() + 1;
        let yy = this.fecha.getFullYear();
        this.fechaConvertido = dd + '-' + mm + '-' + yy;
        console.log("FECHAS ACTUAL", this.fechaConvertido);
    }

    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            console.log("edad", this.edad);
        }
    }


    agrgarFiliacionDatoPersonales() {
        // if (this.dataIDfiliacion.nroHcl == "" || this.dataPacientes.nroHcl == "") {
        //     this.dataIDfiliacion;
        //     this.dataPacientes;
        // }
        const req = {
            nroHcl: this.formDatos_Generales.value.HCL,
            nroGestante: 0,
            nombreApellidos: "",
            ipressNombre: this.formDatos_Generales.value.establecimiento,
            ipressOrigen: this.formDatos_Generales.value.estabOrigen,
            noAplica: this.formDatos_Generales.value.aplica,
            referencia: this.formDatos_Generales.value.referencia,
            codigoAfiliacionSis: this.formDatos_Generales.value.codAficiaconSIS,
            nroDoc: this.formDatos_Generales.value.docIndentidad,
            fechaNacimiento: this.formDatos_Generales.value.fechaNacimiento,
            ocupacion: this.formDatos_Generales.value.ocupacion,
            edad: this.formDatos_Generales.value.edad,
            direccion: this.formDatos_Generales.value.direccion,
            estudios: this.formDatos_Generales.value.gradoInstruccion,
            aniosAprobados: this.formDatos_Generales.value.amiosAprobados,
            nombreNroSector: this.formDatos_Generales.value.nombreNroSector,
            departamento: this.formDatos_Generales.value.departamento,
            provincia: this.formDatos_Generales.value.provincia,
            distrito: this.formDatos_Generales.value.distrito,
            religion: this.formDatos_Generales.value.religion,
            nroCelular: [
                this.formDatos_Generales.value.cel1, this.formDatos_Generales.value.cel2,
            ]
            ,
            idioma: this.formDatos_Generales.value.idioma,
            nombreRecienNacido: this.formDatos_Generales.value.nombreRN,
            padreRecienNacido: this.formDatos_Generales.value.pabreRN,
            estadoCivil: this.formDatos_Generales.value.estadoCivil,
            proceso: "proseso de gestacion",


            apePaterno: this.formDatos_Generales.value.apePaterno,
            apeMaterno: this.formDatos_Generales.value.apeMaterno,
            primerNombre: this.formDatos_Generales.value.primerNombre,
            otrosNombres: "",


        };
        console.log("data", req);

        if (this.idRecuperado == null) {
            this.filiancionService.addPacienteFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardo con exito',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        } else
            this.filiancionService.UpdatePacienteFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizo con exito',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
    }

    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('paciente por doc ', this.dataPacientes)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('primerNombre').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('HCL').setValue(this.dataPacientes.nroHcl);
            this.formDatos_Generales.get('docIndentidad').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('establecimiento').setValue(this.dataPacientes.nombreEESS);
            this.formDatos_Generales.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);

            this.formDatos_Generales.get('codAficiaconSIS').setValue(this.dataPacientes.codAficiaconSIS);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
            this.formDatos_Generales.get('departamento').setValue(this.dataPacientes.domicilio.departamento);
            this.formDatos_Generales.get('provincia').setValue(this.dataPacientes.domicilio.provincia);
            this.formDatos_Generales.get('distrito').setValue(this.dataPacientes.domicilio.distrito);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);

            this.fechanacimiento = this.dataPacientes.nacimiento.fechaNacimiento;
            this.convertiFecha();
            this.formDatos_Generales.get('fechaNacimiento').setValue(this.fechaConvertido);
            this.ageCalculator();

            // this.calcularEdad2("1990-09-21");
            this.formDatos_Generales.get('edad').setValue(this.edad);

        });
    }

    convertiFecha() {
        let values = this.fechanacimiento.split(' ');
        let fecha = values[0];

        this.fechaConvertido = fecha;
        console.log("fecha Convertido", this.fechaConvertido);
    }


    getpacienteFiiacionByID() {
        this.filiancionService.getPacienteFiliacionId(this.idRecuperado).subscribe((res: any) => {
            this.dataIDfiliacion = res.object;
            console.log('fiilacion por ID ', this.dataIDfiliacion)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataIDfiliacion.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataIDfiliacion.apeMaterno);
            this.formDatos_Generales.get('primerNombre').setValue(this.dataIDfiliacion.primerNombre + ' ' + this.dataIDfiliacion.otrosNombres);
            this.formDatos_Generales.get('HCL').setValue(this.dataIDfiliacion.nroHcl);
            this.formDatos_Generales.get('establecimiento').setValue(this.dataIDfiliacion.ipressNombre);
            this.formDatos_Generales.get('estadoCivil').setValue(this.dataIDfiliacion.estadoCivil);

            this.formDatos_Generales.get('aplica').setValue(this.dataIDfiliacion.noAplica);
            this.formDatos_Generales.get('referencia').setValue(this.dataIDfiliacion.referencia);

            this.formDatos_Generales.get('codAficiaconSIS').setValue(this.dataIDfiliacion.codigoAfiliacionSis);
            this.formDatos_Generales.get('docIndentidad').setValue(this.dataIDfiliacion.nroDoc);
            this.formDatos_Generales.get('fechaNacimiento').setValue(this.dataIDfiliacion.fechaNacimiento);
            this.formDatos_Generales.get('direccion').setValue(this.dataIDfiliacion.direccion);
            this.formDatos_Generales.get('departamento').setValue(this.dataIDfiliacion.departamento);
            this.formDatos_Generales.get('provincia').setValue(this.dataIDfiliacion.provincia);
            this.formDatos_Generales.get('distrito').setValue(this.dataIDfiliacion.distrito);
            this.formDatos_Generales.get('ocupacion').setValue(this.dataIDfiliacion.ocupacion);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataIDfiliacion.estudios);
            this.formDatos_Generales.get('estabOrigen').setValue(this.dataIDfiliacion.ipressOrigen);
            this.formDatos_Generales.get('religion').setValue(this.dataIDfiliacion.religion);
            this.formDatos_Generales.get('nombreRN').setValue(this.dataIDfiliacion.nombreRecienNacido);
            this.formDatos_Generales.get('pabreRN').setValue(this.dataIDfiliacion.padreRecienNacido);
            this.formDatos_Generales.get('idioma').setValue(this.dataIDfiliacion.idioma);
            this.formDatos_Generales.get('amiosAprobados').setValue(this.dataIDfiliacion.aniosAprobados);
            this.formDatos_Generales.get('nombreNroSector').setValue(this.dataIDfiliacion.nombreNroSector);
            this.formDatos_Generales.get('cel1').setValue(this.dataIDfiliacion.nroCelular[0]);
            this.formDatos_Generales.get('cel2').setValue(this.dataIDfiliacion.nroCelular[1]);
            this.formDatos_Generales.get('edad').setValue(this.dataIDfiliacion.edad);
        });
    }


    buildForm() {
        this.formDatos_Generales = this.formDatosGenerales.group({
            HCL: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            primerNombre: new FormControl(''),
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
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            nombreRN: new FormControl(''),
            pabreRN: new FormControl(''),
            religion: new FormControl(''),
            cel1: new FormControl(''),
            cel2: new FormControl(''),
            idioma: new FormControl(''),
        })
    }

}
