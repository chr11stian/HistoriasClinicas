import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../services/obstetricia-general.service";
import {FiliancionService} from "./atencion/plan-atencion-integral/services/filiancion-atenciones/filiancion.service";
import {Route, Router, RouterLink} from "@angular/router";


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

    id:string;

    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private filiancionService: FiliancionService) {

    }

    ngOnInit(): void {
        // this.buildForm();
        this.pacienteByNroDoc();
    }

    getpacientesFiliados(tipoDoc, nroDoc) {
        // let tipoDoc = "DNI";
        // let nroDoc = "24015415";
        this.obstetriciaGeneralService.getPacienteFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.pacientesFiliacion = res.object
            console.log('paciente filiados ', this.pacientesFiliacion)
        });
        this.obstetriciaGeneralService.idGestacion = this.id;

    }

    ver(event) {
        // console.log("id documento", this.idDocumento);
        // this.obstetriciaGeneralService.observable$.emit(event.id);
        this.obstetriciaGeneralService.idGestacion = event.id;


    }

    // buildForm() {
    //     // this.FormPaciente = this.form.group({
    //     //     tipoDocumento: new FormControl(),
    //     //     nroDocumento: new FormControl(),
    //     //     apellidosNombres: new FormControl(),
    //     // })
    // }

    pacienteByNroDoc() {
        let tipoDoc = "DNI";
        let nroDoc = "24015415"
        // nroDoc: "24015415"

        this.filiancionService.getPacienteNroDocFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.dataLifiado = res.object
            console.log('paciente por doc ', this.dataLifiado)
            this.tipoDoc = this.dataLifiado.tipoDoc
            this.nroDoc = this.dataLifiado.nroDoc;
            this.apellidosNombres = this.dataLifiado.apePaterno + ', ' + this.dataLifiado.apeMaterno + ', ' + this.dataLifiado.primerNombre + ' ' + this.dataLifiado.otrosNombres;

        });
        this.getpacientesFiliados(tipoDoc, nroDoc);
    }

}

