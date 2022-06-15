import {Component, Input, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LaboratoriosService} from "../../services/laboratorios.service";
import {GraphInterface} from "../../../shared/models/graph.interface";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-lab-hematologia',
    templateUrl: './lab-hematologia.component.html',
    styleUrls: ['./lab-hematologia.component.css']
})
export class LabHematologiaComponent implements OnInit {
    dataHematologia: hematologiaInterface[]
    formHematologia: FormGroup;
    data: any
    fecha: Date = new Date()

    constructor(private laboratoriosService: LaboratoriosService,
                private fb: FormBuilder,
                public config: DynamicDialogConfig) {
        this.data = config.data;
    }

    ngOnInit(): void {
        this.dataHematologia = [{
            hemoglobina: 0,
            rctoGlobulosRojos: 0,
            hematocrito: 0,
            rctoPlaquetas: 0,
            vsg1hora: 0,
            vsg2hora: 0,
            grupoSanguineo: 0,
            rctoGlobulosBlancos: 0,
            factorRH: 0,
            vcm: 0,
            vrVcm: 0,
            tiempoSangria: 0,
            blastos: 0,
            linfocitos: 0,
            chcm: 0,
            vrChcm: 0,
            tiempoCoagulacion: 0,
            juveniles: 0,
            monocitos: 0,
            hcm: 0,
            vrHcm: 0,
            tiempoProtrombina: 0,
            tiempoProtrombinaVR: 0,
            neutrofilos: 0,
            eosinofilos: 0,
            tiempoTromboplastina: 0,
            tiempoTromboplastinaVR: 0,
            nAbastonados: 0,
            basofilos: 0,
            reticulocitos: 0,
            reticulocitosVR: 0,
            nSegmentados: 0,
            compatibilidadSanguinea: 0,
            tipoMuestra: 0
        }]
        this.buildForm()
        this.cargarData()

    }

    buildForm() {
        this.formHematologia = new FormGroup({
            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            nroCama: new FormControl(''),
            nroHistoria: new FormControl(''),
            nroSis: new FormControl(''),
            horaMuestra: new FormControl(''),
            nroMuestra: new FormControl(''),
            solicitante: new FormControl(''),
        })
    }

    cargarData() {
        this.formHematologia.get('apellidosNombres').setValue(this.data.datosPaciente.apePaterno + ' ' + this.data.datosPaciente.apeMaterno + ' ' + this.data.datosPaciente.primerNombre + ' ' + this.data.datosPaciente.otrosNombres);
        this.formHematologia.get('edad').setValue(this.data.datosPaciente.edad);
        this.formHematologia.get('nroHistoria').setValue(this.data.datosPaciente.nroHcl);
        this.formHematologia.get('nroCama').setValue(this.data.datosPaciente.nroCama);
        this.formHematologia.get('solicitante').setValue(this.data.profesionalAcargo.apePaterno + ' ' + this.data.profesionalAcargo.apeMaterno + ' ' + this.data.profesionalAcargo.primerNombre + ' ' + this.data.profesionalAcargo.otrosNombres);
        this.formHematologia.get('horaMuestra').setValue(this.fecha)
    }

    Guardar() {
        let aux: hematologiaInterface = {
            hemoglobina: this.dataHematologia[0].hemoglobina,
            rctoGlobulosRojos: this.dataHematologia[0].rctoGlobulosRojos,
            hematocrito: this.dataHematologia[0].hematocrito,
            rctoPlaquetas: this.dataHematologia[0].rctoPlaquetas,
            vsg1hora: this.dataHematologia[0].vsg1hora,
            vsg2hora: this.dataHematologia[0].vsg2hora,
            grupoSanguineo: this.dataHematologia[0].grupoSanguineo,
            rctoGlobulosBlancos: this.dataHematologia[0].rctoGlobulosBlancos,
            factorRH: this.dataHematologia[0].factorRH,
            vcm: this.dataHematologia[0].vcm,
            vrVcm: this.dataHematologia[0].vrVcm,
            tiempoSangria: this.dataHematologia[0].tiempoSangria,
            blastos: this.dataHematologia[0].blastos,
            linfocitos: this.dataHematologia[0].linfocitos,
            chcm: this.dataHematologia[0].chcm,
            vrChcm: this.dataHematologia[0].vrChcm,
            tiempoCoagulacion: this.dataHematologia[0].tiempoCoagulacion,
            juveniles: this.dataHematologia[0].juveniles,
            monocitos: this.dataHematologia[0].monocitos,
            hcm: this.dataHematologia[0].hcm,
            vrHcm: this.dataHematologia[0].vrHcm,
            tiempoProtrombina: this.dataHematologia[0].tiempoProtrombina,
            tiempoProtrombinaVR: this.dataHematologia[0].tiempoProtrombinaVR,
            neutrofilos: this.dataHematologia[0].neutrofilos,
            eosinofilos: this.dataHematologia[0].eosinofilos,
            tiempoTromboplastina: this.dataHematologia[0].tiempoTromboplastina,
            tiempoTromboplastinaVR: this.dataHematologia[0].tiempoTromboplastinaVR,
            nAbastonados: this.dataHematologia[0].nAbastonados,
            basofilos: this.dataHematologia[0].basofilos,
            reticulocitos: this.dataHematologia[0].reticulocitos,
            reticulocitosVR: this.dataHematologia[0].reticulocitosVR,
            nSegmentados: this.dataHematologia[0].nSegmentados,
            compatibilidadSanguinea: this.dataHematologia[0].compatibilidadSanguinea,
            tipoMuestra: this.dataHematologia[0].tipoMuestra
        }
        this.laboratoriosService.guardarLaboratorioHematologico(this.config.data.id, aux).subscribe((r: any) => {
            console.log(r)
        })
    }
}

export interface hematologiaInterface {
    nroMuestra?: string | number
    resultadoExamen?: string | number
    hemoglobina?: string | number
    rctoGlobulosRojos?: string | number
    hematocrito?: string | number
    rctoPlaquetas?: string | number
    vsg1hora?: string | number
    vsg2hora?: string | number
    grupoSanguineo?: string | number
    rctoGlobulosBlancos?: string | number
    factorRH?: string | number
    vcm?: string | number
    vrVcm?: string | number
    tiempoSangria?: string | number
    blastos?: string | number
    linfocitos?: string | number
    chcm?: string | number
    vrChcm?: string | number
    tiempoCoagulacion?: string | number
    juveniles?: string | number
    monocitos?: string | number
    hcm?: string | number
    vrHcm?: string | number
    tiempoProtrombina?: string | number
    tiempoProtrombinaVR?: string | number
    neutrofilos?: string | number
    eosinofilos?: string | number
    tiempoTromboplastina?: string | number
    tiempoTromboplastinaVR?: string | number
    nAbastonados?: string | number
    basofilos?: string | number
    reticulocitos?: string | number
    reticulocitosVR?: string | number
    nSegmentados?: string | number
    compatibilidadSanguinea?: string | number
    hbConFactorCorrecion?: string | number
    factorCorreccion?: string | number
    tipoMuestra?: string | number
}