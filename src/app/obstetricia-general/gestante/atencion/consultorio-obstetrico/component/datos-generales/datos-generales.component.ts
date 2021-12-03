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
    opciones1: any;
    opciones2: any;
    opciones3: any;
    opciones4: any;
    opciones5: any;
    opciones6: any;

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
            {name: 'SI', boleano: true},
            {name: 'NO', boleano: false}
        ];

        //opciones de vacunas previas///
        this.opciones1 = [
            {name: 'SI', decripcion: 'SI, V. Antitetánica 1° Dosis'},
            {name: 'NO', decripcion: 'No, V. Antitetánica 1° Dosis'}
        ];
        this.opciones2 = [
            {name: 'SI', decripcion: 'SI, V. Antitetánica 2° Dosis'},
            {name: 'NO', decripcion: 'No, V. Antitetánica 2° Dosis'}
        ];
        this.opciones3 = [
            {name: 'SI', decripcion: 'SI, Rubeola'},
            {name: 'NO', decripcion: 'No, Rubeola'}
        ];
        this.opciones4 = [
            {name: 'SI', decripcion: 'SI, Hepatites B'},
            {name: 'NO', decripcion: 'No, Hepatites B'}
        ];
        this.opciones5 = [
            {name: 'SI', decripcion: 'SI, Papiloma V'},
            {name: 'NO', decripcion: 'No, Papiloma V'}
        ];
        this.opciones6 = [
            {name: 'SI', decripcion: 'SI, Covid-19'},
            {name: 'NO', decripcion: 'No, Covid-19'}
        ];
        //opciones de vacunas previas///
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

            //Recuperar Vacunas previas
            this.formDatos_Generales.get('vAntitetánica1Dosis').setValue(this.dataConsultas.vacunasPrevias[0].descripcion);
            this.formDatos_Generales.get('fecha1').setValue(this.dataConsultas.vacunasPrevias[0].fecha);
            this.formDatos_Generales.get('vAntitetánica2Dosis').setValue(this.dataConsultas.vacunasPrevias[1].descripcion);
            this.formDatos_Generales.get('fecha2').setValue(this.dataConsultas.vacunasPrevias[1].fecha);
            this.formDatos_Generales.get('rubeola').setValue(this.dataConsultas.vacunasPrevias[2].descripcion);
            this.formDatos_Generales.get('fecha3').setValue(this.dataConsultas.vacunasPrevias[2].fecha);
            this.formDatos_Generales.get('HepatitesB').setValue(this.dataConsultas.vacunasPrevias[3].descripcion);
            this.formDatos_Generales.get('fecha4').setValue(this.dataConsultas.vacunasPrevias[3].fecha);
            this.formDatos_Generales.get('PapilomaV').setValue(this.dataConsultas.vacunasPrevias[4].descripcion);
            this.formDatos_Generales.get('fecha5').setValue(this.dataConsultas.vacunasPrevias[4].fecha);
            this.formDatos_Generales.get('Covid19').setValue(this.dataConsultas.vacunasPrevias[5].descripcion);
            this.formDatos_Generales.get('fecha6').setValue(this.dataConsultas.vacunasPrevias[5].fecha);

            //recuperar Antecedentes Gineco Obstetrico
            this.formDatos_Generales.get('FUR').setValue(this.dataConsultas.antecedentesGinObs[0].fechaUltRegla);
            this.formDatos_Generales.get('FPP').setValue(this.dataConsultas.antecedentesGinObs[0].fechaPosiParto);
            this.formDatos_Generales.get('RCAT').setValue(this.dataConsultas.antecedentesGinObs[0].rcat);
            this.formDatos_Generales.get('gesAnterior').setValue(this.dataConsultas.antecedentesGinObs[0].gestAnterior);
            this.formDatos_Generales.get('RNpesoMayor').setValue(this.dataConsultas.antecedentesGinObs[0].rnMayorPeso);

            //RECUPERA LOS ANTECEDENTES
            this.formDatos_Generales.get('AntecedentesFamiliares').setValue(this.dataConsultas.antecedentesFamiliares[0]);
            this.formDatos_Generales.get('AntecedentesPersonales').setValue(this.dataConsultas.antecedentesPersonales[0]);
            this.formDatos_Generales.get('FumaCigarros').setValue(this.dataConsultas.fumaCigarros);
            this.formDatos_Generales.get('Drogas').setValue(this.dataConsultas.drogas);
            this.formDatos_Generales.get('Psicoprofilaxis').setValue(this.dataConsultas.psicoprofilaxis.estado);


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
            //Datos generales del paciente
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

            //Vacunas previas del paciente
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

            //Antecedentes Gineco Obstetrico
            FUR: new FormControl(''),
            FPP: new FormControl(''),
            RCAT: new FormControl(''),
            gesAnterior: new FormControl(''),
            RNpesoMayor: new FormControl(''),

            //ANTECEDENTES
            AntecedentesFamiliares: new FormControl(''),
            AntecedentesPersonales: new FormControl(''),
            FumaCigarros: new FormControl(''),
            Drogas: new FormControl(''),
            Psicoprofilaxis: new FormControl(''),


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
                },
                {
                    descripcion: this.formDatos_Generales.value.rubeola,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha3, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.HepatitesB,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha4, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.PapilomaV,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha5, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.Covid19,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha6, 'yyyy-MM-dd HH:mm:ss'),
                },
            ],

            antecedentesGinObs: [{
                fechaUltRegla: this.formDatos_Generales.value.FUR,
                fechaPosiParto: this.formDatos_Generales.value.FPP,
                rcat: this.formDatos_Generales.value.RCAT,
                gestAnterior: this.formDatos_Generales.value.gesAnterior,
                rnMayorPeso: this.formDatos_Generales.value.RNpesoMayor + '' + 'GR',

            }],
            antecedentesFamiliares: [
                this.formDatos_Generales.value.AntecedentesFamiliares,
            ],
            antecedentesPersonales: [
                this.formDatos_Generales.value.AntecedentesPersonales,
            ],
            fumaCigarros: this.formDatos_Generales.value.FumaCigarros,
            drogas: this.formDatos_Generales.value.Drogas,

            psicoprofilaxis: {
                estado: this.formDatos_Generales.value.Psicoprofilaxis,
                fecha: "",
            },

            descarteSignosAlarmas: [],
            atencionesIntegrales: []

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
