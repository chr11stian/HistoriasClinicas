import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../services/obstetricia-general.service";
import {Route, Router, RouterLink} from "@angular/router";
import {FiliancionService} from "./atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import {image} from "../../../assets/images/image.const";

@Component({
    selector: 'app-gestante',
    templateUrl: './gestante.component.html',
    styleUrls: ['./gestante.component.css']
})
export class GestanteComponent implements OnInit {

    pacientesFiliacion: any[];
    dataPaciente: any;
    dataLifiado2: any;
    FormPaciente: FormGroup;
    tipoDoc: any;
    nroDoc: any;
    nroHcl: any;
    apellidosNombres: any;

    tipoDocRecuperado: string;
    nroDocRecuperado: string;

    filiacionUltimaPosicion = '';
    DataCupos: any;
    DataCupos2: any;
    dataPacientesReniec: any;
    imagePath: string = image;


    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private filiancionService: FiliancionService) {
    }

    ngOnInit(): void {
        this.DataCupos = JSON.parse(localStorage.getItem('datacupos'));
        this.DataCupos2 = JSON.parse(localStorage.getItem('PacienteSinCupo'));

        if (this.DataCupos2 == null) {
            this.tipoDocRecuperado = this.DataCupos.paciente.tipoDoc
            this.nroDocRecuperado = this.DataCupos.paciente.nroDoc
        } else {
            this.tipoDocRecuperado = this.DataCupos2.tipoDoc
            this.nroDocRecuperado = this.DataCupos2.nroDoc
        }


        console.log("NRO DOC RECUPERADO", this.DataCupos)
        // this.buildForm();
        this.pacienteByNroDoc();
        this.traerDataReniec();
    }

    getpacientesFiliados(tipoDoc, nroDoc) {
        this.obstetriciaGeneralService.getPacienteFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.pacientesFiliacion = res.object
            console.log('paciente con nro de gestacion ', this.pacientesFiliacion)
            if (this.pacientesFiliacion == null) {
                this.filiacionUltimaPosicion = 'FINALIZADO';
            } else {
                let index = this.pacientesFiliacion.length - 1;
                this.filiacionUltimaPosicion = this.pacientesFiliacion[index].estado;
                console.log('ARREGLO ULTIMA POSICION', this.filiacionUltimaPosicion);
            }
        });
    }


    gestacion(event) {
        localStorage.setItem('gestacion', JSON.stringify(event));
        localStorage.removeItem('dataPaciente');
        if (this.pacientesFiliacion.length == 0) {
            console.log("Vacio",)
        } else {
            console.log("Lleno",)
        }
    }

    consultas(event) {
        this.obstetriciaGeneralService.idGestacion = event.id;
        this.obstetriciaGeneralService.tipoDoc = event.tipoDoc;
        this.obstetriciaGeneralService.nroDoc = event.nroDoc;
        this.obstetriciaGeneralService.nroEmbarazo = event.nroEmbarazo;
        this.obstetriciaGeneralService.nroHcl = event.nroHcl;
    }

    pacienteByNroDoc() {
        let tipoDoc = this.tipoDocRecuperado;
        let nroDoc = this.nroDocRecuperado;
        this.filiancionService.getPacienteNroDocFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.dataPaciente = res.object
            console.log('paciente por doc ', this.dataPaciente)
            this.tipoDoc = this.dataPaciente.tipoDoc
            this.nroDoc = this.dataPaciente.nroDoc;
            this.nroHcl = this.dataPaciente.nroHcl;
            this.apellidosNombres = this.dataPaciente.apePaterno + ', ' + this.dataPaciente.apeMaterno + ', ' + this.dataPaciente.primerNombre + ' ' + this.dataPaciente.otrosNombres;

        });
        this.getpacientesFiliados(tipoDoc, nroDoc);
    }

    newEmbarazo() {
        localStorage.removeItem('gestacion');
        localStorage.setItem('dataPaciente', JSON.stringify(this.dataPaciente));
    }

    traerDataReniec() {
        this.filiancionService.getDatosReniec(this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientesReniec = res;
            console.log(res);
            this.imagePath = res.foto;
        });
    }

}
