import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {ConsultasService} from "../../services/consultas.service";
import Swal from "sweetalert2";
import {FiliancionService} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;
    opciones: any;
    dataPacientes: any;
    gradInstruccion: any;
    fechanacimiento: any;
    fecha: any;
    edad;

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
            {name: 'SI', code: 'S'},
            {name: 'NO', code: 'N'},
        ];

        this.gradInstruccion = [
            {gradoInstruccion: 'Analfabeta', code: 'Analfabeta'},
            {gradoInstruccion: 'Primaria', code: 'Primaria'},
            {gradoInstruccion: 'Secundaria', code: 'Secundaria'},
            {gradoInstruccion: 'Superior', code: 'Superior'},
            {gradoInstruccion: 'Superior No Univ.', code: 'SuperiorNo'},
        ];
    }


    ngOnInit(): void {
        this.buildForm();
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        this.getpacienteByNroDoc()
        // this.ageCalculator();
        this.fecha = this.dataPacientes.nacimiento
        console.log("naciento", this.fecha)
    }


    ageCalculator() {
        if (this.fecha) {
            const convertAge = new Date(this.fecha);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
        console.log("edad", this.edad);
    }

    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('paciente por doc ', this.dataPacientes)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataPacientes.celular);
            this.formDatos_Generales.get('gradoInstruccion1').setValue(this.dataPacientes.gradoInstruccion);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);

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
            gradoInstruccion1: new FormControl(''),
            direccion: new FormControl(''),
            ocupacion: new FormControl(''),
            fecha: new FormControl(''),
            hora: new FormControl(''),


            aplica: new FormControl(''),
            gesAnterior: new FormControl(''),
            // referencia: new FormControl(''),
            // partoVaginal: new FormControl(''),
        })
    }

    addConsultas() {
        const req = {
            nroHcl: this.dataPacientes.nroHcl,
            nroAtencion: 1,
            nroControlSis: "",
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
            }
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
}
