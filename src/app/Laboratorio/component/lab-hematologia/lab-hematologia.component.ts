import {Component, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'app-lab-hematologia',
    templateUrl: './lab-hematologia.component.html',
    styleUrls: ['./lab-hematologia.component.css']
})
export class LabHematologiaComponent implements OnInit {
    dataHematologia: hematologiaInterface[]
    constructor() {
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
            tiempoProtrombinaVr: 0,
            neutrofilos: 0,
            eosinofilos: 0,
            tiempoTromboplastina: 0,
            tiempoTromboplastinaVr: 0,
            nAbastonados: 0,
            basofilos: 0,
            reticulocitos: 0,
            reticulocitosVr: 0,
            nSegmentados: 0,
            compatibilidadSanguinea: 0
        }]
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
    tiempoProtrombinaVr?: string | number
    neutrofilos?: string | number
    eosinofilos?: string | number
    tiempoTromboplastina?: string | number
    tiempoTromboplastinaVr?: string | number
    nAbastonados?: string | number
    basofilos?: string | number
    reticulocitos?: string | number
    reticulocitosVr?: string | number
    nSegmentados?: string | number
    compatibilidadSanguinea?: string | number
    hbConFactorCorrecion?: string | number
    factorCorreccion?: string | number
}