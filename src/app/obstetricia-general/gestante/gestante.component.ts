import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ObstetriciaGeneralService } from "../services/obstetricia-general.service";
import { Route, Router, RouterLink } from "@angular/router";
import {
    FiliancionService
} from "./atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import { image } from "../../../assets/images/image.const";
import { PersonalService } from "src/app/core/services/personal-services/personal.service";

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
    spacio: ":";
    nroHcl: any;
    apellidosNombres: any;

    tipoDocRecuperado: string;
    nroDocRecuperado: string;

    filiacionUltimaPosicion = '';
    DataCupos: any;
    DataCupos2: any;
    dataPacientesReniec: any;
    imagePath: string = image;
    dataGestante: any;
    downloadLink: string = 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/cartillacontrol/carnet_control.pdf?authorization=' + JSON.parse(localStorage.getItem('token')).token;
    // token:string = JSON.parse(localStorage.getItem('token')).token;


    constructor(private form: FormBuilder,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private filiancionService: FiliancionService,
        private personalService: PersonalService) {
    }

    ngOnInit(): void {
        this.DataCupos = JSON.parse(localStorage.getItem('datacupos'));
        this.DataCupos2 = JSON.parse(localStorage.getItem('PacienteSinCupo'));
        this.dataGestante = '&idObstretaDatos='+JSON.parse(localStorage.getItem('gestacion')).id;

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
        // this.recuperarFiliacion();
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
    imprimir() {
        console.log('link para imprimir ', this.downloadLink + this.dataGestante);
        // let data = {
        //     tipoDoc: 'DNI',
        //     nroDoc: '73145986'
        // }
        // this.personalService.getPersonalTipoDocumento(data.tipoDoc, data.nroDoc).subscribe((res: any) => {
        //     console.log('data personal ', res);
        // })
        // this.filiancionService.getAntecedentesFiliacion(this.dataGestante.id).subscribe((res: any) =>{
        //     console.log('imprimir res ', res);

        // })
    }
}
