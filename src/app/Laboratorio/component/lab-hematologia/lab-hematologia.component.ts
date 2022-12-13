import {Component, Input, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from 'sweetalert2';

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
                private ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {
        config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
    }

    ngOnInit(): void {
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
        this.formHematologia.get('nroMuestra').setValue(this.data.nroMuestra)
        this.dataHematologia = [{
            hemoglobina: this.config.data.edit ? this.data.hemoglobina : 0,
            rctoGlobulosRojos: this.config.data.edit ? this.data.rctoGlobulosRojos : 0,
            hematocrito: this.config.data.edit ? this.data.hematocrito : 0,
            rctoPlaquetas: this.config.data.edit ? this.data.rctoPlaquetas : 0,
            vsg1hora: this.config.data.edit ? this.data.vsg1hora : 0,
            vsg2hora: this.config.data.edit ? this.data.vsg2hora : 0,
            grupoSanguineo: this.config.data.edit ? this.data.grupoSanguineo : 0,
            rctoGlobulosBlancos: this.config.data.edit ? this.data.rctoGlobulosBlancos : 0,
            factorRH: this.config.data.edit ? this.data.factorRH : 0,
            vcm: this.config.data.edit ? this.data.vcm : 0,
            vrVcm: this.config.data.edit ? this.data.vrVcm : 0,
            tiempoSangria: this.config.data.edit ? this.data.tiempoSangria : 0,
            blastos: this.config.data.edit ? this.data.blastos : 0,
            linfocitos: this.config.data.edit ? this.data.linfocitos : 0,
            chcm: this.config.data.edit ? this.data.chcm : 0,
            vrChcm: this.config.data.edit ? this.data.vrChcm : 0,
            tiempoCoagulacion: this.config.data.edit ? this.data.tiempoCoagulacion : 0,
            juveniles: this.config.data.edit ? this.data.juveniles : 0,
            monocitos: this.config.data.edit ? this.data.monocitos : 0,
            hcm: this.config.data.edit ? this.data.hcm : 0,
            vrHcm: this.config.data.edit ? this.data.vrHcm : 0,
            tiempoProtrombina: this.config.data.edit ? this.data.tiempoProtrombina : 0,
            tiempoProtrombinaVr: this.config.data.edit ? this.data.tiempoProtrombinaVr : 0,
            neutrofilos: this.config.data.edit ? this.data.neutrofilos : 0,
            eosinofilos: this.config.data.edit ? this.data.eosinofilos : 0,
            tiempoTromboplastina: this.config.data.edit ? this.data.tiempoTromboplastina : 0,
            tiempoTromboplastinaVr: this.config.data.edit ? this.data.tiempoTromboplastinaVr : 0,
            nabastonados: this.config.data.edit ? this.data.nabastonados : 0,
            basofilos: this.config.data.edit ? this.data.basofilos : 0,
            reticulocitos: this.config.data.edit ? this.data.reticulocitos : 0,
            reticulocitosVr: this.config.data.edit ? this.data.reticulocitosVr : 0,
            nsegmentados: this.config.data.edit ? this.data.nsegmentados : 0,
            compatibilidadSanguinea: this.config.data.edit ? this.data.compatibilidadSanguinea : 0,
            tipoMuestra: this.config.data.edit ? this.data.tipoMuestra : 0,
        }]
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
            tiempoProtrombinaVr: this.dataHematologia[0].tiempoProtrombinaVr,
            neutrofilos: this.dataHematologia[0].neutrofilos,
            eosinofilos: this.dataHematologia[0].eosinofilos,
            tiempoTromboplastina: this.dataHematologia[0].tiempoTromboplastina,
            tiempoTromboplastinaVr: this.dataHematologia[0].tiempoTromboplastinaVr,
            nabastonados: this.dataHematologia[0].nabastonados,
            basofilos: this.dataHematologia[0].basofilos,
            reticulocitos: this.dataHematologia[0].reticulocitos,
            reticulocitosVr: this.dataHematologia[0].reticulocitosVr,
            nsegmentados: this.dataHematologia[0].nsegmentados,
            compatibilidadSanguinea: this.dataHematologia[0].compatibilidadSanguinea,
            tipoMuestra: this.dataHematologia[0].tipoMuestra,
            nroMuestra: this.formHematologia.value.nroMuestra,
        }
        this.laboratoriosService.guardarLaboratorioHematologico(this.config.data.id, aux).subscribe((r: any) => {
            this.ref.close("confirmado"); //confirmado o cancelado
            Swal.fire({
              icon: "success",
              title: "Exito!",
              text: "Se guardo el laboratorio",
              showConfirmButton: false,
              timer: 2000,
            });
    
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
    tiempoProtrombinaVr?: string | number
    neutrofilos?: string | number
    eosinofilos?: string | number
    tiempoTromboplastina?: string | number
    tiempoTromboplastinaVr?: string | number
    nabastonados?: string | number
    basofilos?: string | number
    reticulocitos?: string | number
    reticulocitosVr?: string | number
    nsegmentados?: string | number
    compatibilidadSanguinea?: string | number
    hbConFactorCorrecion?: string | number
    factorCorreccion?: string | number
    tipoMuestra?: string | number
}