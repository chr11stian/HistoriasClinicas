import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GestanteComponent } from "../gestante.component";
import { ObstetriciaGeneralService } from "../../services/obstetricia-general.service";
import { Subscription } from "rxjs";
import { FiliancionService } from "./h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";


@Component({
    selector: 'app-atencion',
    templateUrl: './atencion.component.html',
    styleUrls: ['./atencion.component.css']
})


export class AtencionComponent implements OnInit {
    titleBienvenida: string = "¡Iniciemos!";
    contentBienvenida: string = "Puedes empezar seleccionando Plan de Atención Integral Cada una de las secciones contiene todo lo que necesitas para completar su primera consulta.";
    titlePrimeraFase: string = "¡Continuamos!";
    contentPrimeraFase: string = "";
    titleSegundaFase: string = "Por último";
    contentSegundaFase: string = "";

    idRecuperado: string = "";
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: any;
    nroHcl: string;
    Gestacion: any;
    DataFiliacionPaciente: any;

    dataConsultorioObstetrico: any;
    DataPaciente: any;
    nombreDelGestante: string;


    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService,
        private filiancionService: FiliancionService) {

        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.DataFiliacionPaciente = JSON.parse(localStorage.getItem('dataPaciente'));


        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.DataFiliacionPaciente.tipoDoc;
            this.nroDocRecuperado = this.DataFiliacionPaciente.nroDoc;
            this.nroEmbarazo = this.DataFiliacionPaciente.nroEmbarazo;
            this.nroHcl = this.DataFiliacionPaciente.nroHcl;
        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idRecuperado = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }


    }

    ngOnInit(): void {
        this.getConsultorioObstetrico();
        this.pacienteByNroDoc();
    }

    pacienteByNroDoc() {
        let tipoDoc = this.tipoDocRecuperado;
        let nroDoc = this.nroDocRecuperado;
        this.filiancionService.getPacienteNroDocFiliacion(tipoDoc, nroDoc).subscribe((res: any) => {
            this.DataPaciente = res.object
            this.nombreDelGestante = this.DataPaciente.apePaterno + ' ' + this.DataPaciente.apeMaterno + ' ' + this.DataPaciente.primerNombre + ' ' + this.DataPaciente.otrosNombres
            console.log('paciente por doc 2 ', this.nombreDelGestante)
        });
    }

    getConsultorioObstetrico() {
        const data = {
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1,
        }
        this.obstetriciaGeneralService.getConsultorioObstetrico(this.idRecuperado, data).then((res: any) => {
            this.dataConsultorioObstetrico = res.object
            if (this.dataConsultorioObstetrico == null) {
                console.log('no se encontro naa');
                return
            }
            console.log('Data Consultorio Obstetrico', this.dataConsultorioObstetrico)
            this.obstetriciaGeneralService.idConsultoriObstetrico = this.dataConsultorioObstetrico.id;
            // console.log('Data consultorio id', this.obstetriciaGeneralService.idConsultoriObstetrico);
        });

    }

    ngOnDestroy() {
        localStorage.removeItem('idGestacionRegistro');
    }

}
