import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {ConsultasService} from "../../services/consultas.service";
import Swal from "sweetalert2";
import {FiliancionService} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;
    opciones: any;
    data: any;
    dataPacientes: any;
    gradInstruccion: any;
    fechanacimiento: any;
    datafecha: Date = new Date();
    datePipe = new DatePipe('en-US');
    horaActualString: string;
    fecha: Date;//fecha Actual
    fechaConvertido: string;//fecha convertido
    edad: any;
    dataConsultas: any; //consultas en general

    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;

    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private consultasService: ConsultasService,
                private filiancionService: FiliancionService,) {

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;

        this.opciones = [
            {name: 'SI'},
            {name: 'NO'},
        ];
    }

    ngOnInit(): void {
        this.horaActualString = this.datafecha.getHours() + ':' + (this.datafecha.getMinutes() + 1) + ':' + this.datafecha.getSeconds();

        this.buildForm();
        this.obternerFechaActual();

        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        this.getpacienteByNroDoc();//recupera los pacientes por numero de documento
    }


    //Recupera la cunsulta por HCL y Numero de embarazo
    getConsultas() {
        let data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1
        }
        console.log("data", data);

        this.consultasService.getConsultas(data).subscribe((res: any) => {
            this.dataConsultas = res.object
            console.log('DATA CONSULTAS ', this.dataConsultas)
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataConsultas.datosPersonales.telefono);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataConsultas.datosPersonales.gradoInstitucional);
            this.formDatos_Generales.get('ocupacion').setValue(this.dataConsultas.datosPersonales.ocupacion);
            this.formDatos_Generales.get('edad').setValue(this.dataConsultas.datosPerHist.edad);
            this.formDatos_Generales.get('direccion').setValue(this.dataConsultas.datosPerHist.direccion);
        });
    }

    //recupera la el dia, el mes y el año de la fecha actual
    obternerFechaActual() {
        this.fecha = new Date();
        let dd = this.fecha.getDate();
        let mm = this.fecha.getMonth() + 1;
        let yy = this.fecha.getFullYear();
        this.fechaConvertido = dd + '-' + mm + '-' + yy;
        console.log("FECHAS ACTUAL", this.fechaConvertido);
    }


    //Calcular el año desde la fecha de nacimiento
    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            console.log("edad", this.edad);
        }
    }

    //Recuperar datos de un paciendo por su documento de identidad
    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('paciente por doc ', this.dataPacientes)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataPacientes.celular);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);
            this.fechaConvertido = this.dataPacientes.nacimiento.fechaNacimiento;
            console.log("nacimiento", this.fechaConvertido)
            this.ageCalculator();//calcula la edad desde la fecha de nacimiento
            this.formDatos_Generales.get('edad').setValue(this.edad);
            this.formDatos_Generales.get('hora').setValue(this.horaActualString);
            this.getConsultas();//Recupera la cunsulta por HCL y Numero de embarazo
        });
    }


    buildForm() {
        this.formDatos_Generales = this.form.group({
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            nombres: new FormControl(''),
            edad: new FormControl(''),
            telefono: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            direccion: new FormControl(''),
            ocupacion: new FormControl(''),
            hora: new FormControl(''),

            vAntitetánica1Dosis: new FormControl(''),
            fecha1: new FormControl(''),
            vAntitetánica2Dosis: new FormControl(''),
            fecha2: new FormControl(''),
            rubeola: new FormControl(''),
            fecha3: new FormControl(''),
            HepatitesB: new FormControl(''),
            fecha4: new FormControl(''),
            PapilomaV: new FormControl(''),
            fecha5: new FormControl(''),
            Covid19: new FormControl(''),
            fecha6: new FormControl(''),


            aplica: new FormControl(''),
            gesAnterior: new FormControl(''),
            // referencia: new FormControl(''),
            // partoVaginal: new FormControl(''),
        })
    }

    //Agregar la consulta
    addConsultas() {
        const req = {
            nroHcl: this.dataPacientes.nroHcl,
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: this.nroEmbarazo,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.formDatos_Generales.value.nroDoc,

            datosPerHist: {
                edad: this.formDatos_Generales.value.edad,
                direccion: this.formDatos_Generales.value.direccion,
            },

            datosPersonales: {
                telefono: this.formDatos_Generales.value.telefono,
                ocupacion: this.formDatos_Generales.value.ocupacion,
                gradoInstitucional: this.formDatos_Generales.value.gradoInstruccion,
            },
            // vacunasPrevias: [{
            //     descripcion: this.formDatos_Generales.value.vAntitetánica1Dosis,
            //     fecha: this.formDatos_Generales.value.fecha
            //         .getFullYear() + '-' + this.formDatos_Generales.value.fecha
            //         .getMonth() + '-' + this.formDatos_Generales.value.fecha
            //         .getDate(),
            // }]

        }
        console.log("data", req);
        this.consultasService.addConsultas(req).subscribe(
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
    }

    //actualizar datos de consultorio obstetrico
    updateConsultas() {
        this.data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: this.dataConsultas.nroEmbarazo,
            tipoDoc: this.dataConsultas.tipoDoc,
            nroDoc: this.dataConsultas.nroDoc,

            datosPerHist: {
                edad: this.formDatos_Generales.value.edad,
                direccion: this.formDatos_Generales.value.direccion,
            },
            datosPersonales: {
                telefono: this.formDatos_Generales.value.telefono,
                ocupacion: this.formDatos_Generales.value.ocupacion,
                gradoInstitucional: this.formDatos_Generales.value.gradoInstruccion,
            },
            vacunasPrevias: [
                {
                    descripcion: this.formDatos_Generales.value.vAntitetánica1Dosis,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha1, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.vAntitetánica2Dosis,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha2, 'yyyy-MM-dd HH:mm:ss'),
                }
            ],
            descarteSignosAlarmas: [],
            atencionesIntegrales: []


            // vAntitetánica1Dosis: new FormControl(''),
            // fecha1: new FormControl(''),
            // vAntitetánica2Dosis: new FormControl(''),
            // fecha2: new FormControl(''),
            // rubeola: new FormControl(''),
            // fecha3: new FormControl(''),
            // HepatitesB: new FormControl(''),
            // fecha4: new FormControl(''),
            // PapilomaV: new FormControl(''),
            // fecha5: new FormControl(''),
            // Covid19: new FormControl(''),
            // fecha6: new FormControl(''),
        }

        console.log("DATA UPDATE CONSULTAS", this.data);
        this.consultasService.updateConsultas(this.data).subscribe((result: any) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizo con exito',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log('rpta', result);
            }
        );
    }
}
