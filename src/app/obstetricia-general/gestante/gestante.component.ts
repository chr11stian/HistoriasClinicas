import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../services/obstetricia-general.service";
import {Route, Router, RouterLink} from "@angular/router";
import {FiliancionService} from "./atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";

@Component({
    selector: 'app-gestante',
    templateUrl: './gestante.component.html',
    styleUrls: ['./gestante.component.css']
})
export class GestanteComponent implements OnInit {

    pacientesFiliacion: any;
    dataLifiado: any;
    FormPaciente: FormGroup;
    tipoDoc: any;
    nroDoc: any;
    apellidosNombres: any;

    tipoDocRecuperado: string;
    nroDocRecuperado: string;

    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private filiancionService: FiliancionService) {
    }

    ngOnInit(): void {
        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc
        console.log("NRO DOC RECUPERADO", this.nroDocRecuperado)
        // this.buildForm();
        this.pacienteByNroDoc();

    }

    getpacientesFiliados(tipoDoc, nroDoc) {
        this.obstetriciaGeneralService.getPacienteFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.pacientesFiliacion = res.object
            console.log('paciente filiados ', this.pacientesFiliacion)
        });
    }


    atencion(event) {
        // console.log("id documento", this.idDocumento);
        // this.obstetriciaGeneralService.observable$.emit(event.id);
        this.obstetriciaGeneralService.idGestacion = event.id;
        this.obstetriciaGeneralService.tipoDoc = event.tipoDoc;
        this.obstetriciaGeneralService.nroDoc = event.nroDoc;
        this.obstetriciaGeneralService.nroEmbarazo = event.nroEmbarazo;
        this.obstetriciaGeneralService.nroHcl = event.nroHcl;
        this.obstetriciaGeneralService.estadoEmbarazo = event.estado;

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
            this.dataLifiado = res.object
            console.log('paciente por doc ', this.dataLifiado)
            this.tipoDoc = this.dataLifiado.tipoDoc
            this.nroDoc = this.dataLifiado.nroDoc;
            this.apellidosNombres = this.dataLifiado.apePaterno + ', ' + this.dataLifiado.apeMaterno + ', ' + this.dataLifiado.primerNombre + ' ' + this.dataLifiado.otrosNombres;

        });
        this.getpacientesFiliados(tipoDoc, nroDoc);
    }

    newEmbarazo() {
        this.obstetriciaGeneralService.idGestacion = null;
        this.obstetriciaGeneralService.tipoDoc = this.tipoDoc;
        this.obstetriciaGeneralService.nroDoc = this.nroDoc;
    }



}
