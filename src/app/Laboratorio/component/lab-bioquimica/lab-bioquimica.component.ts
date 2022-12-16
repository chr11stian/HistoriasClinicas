import {Component, Input, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from 'sweetalert2';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-lab-bioquimica',
    templateUrl: './lab-bioquimica.component.html',
    styleUrls: ['./lab-bioquimica.component.css']
})
export class LabBioquimicaComponent implements OnInit {
    dataBioquimica: bioquimicaInterface[]
    formBioquimica: FormGroup;
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
        this.formBioquimica = new FormGroup({
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
        this.formBioquimica.get('apellidosNombres').setValue(this.data.datosPaciente.apePaterno + ' ' + this.data.datosPaciente.apeMaterno + ' ' + this.data.datosPaciente.primerNombre + ' ' + this.data.datosPaciente.otrosNombres);
        this.formBioquimica.get('edad').setValue(this.data.datosPaciente.edad);
        this.formBioquimica.get('nroHistoria').setValue(this.data.datosPaciente.nroHcl);
        this.formBioquimica.get('nroCama').setValue(this.data.datosPaciente.nroCama);
        this.formBioquimica.get('solicitante').setValue(this.data.profesionalAcargo.apePaterno + ' ' + this.data.profesionalAcargo.apeMaterno + ' ' + this.data.profesionalAcargo.primerNombre + ' ' + this.data.profesionalAcargo.otrosNombres);
        this.formBioquimica.get('horaMuestra').setValue(this.fecha)
        this.formBioquimica.get('nroMuestra').setValue(this.data.nroMuestra)
        this.dataBioquimica = [{
            glicemia: this.config.data.edit ? this.data.glicemia : 0,
            acido_urico: this.config.data.edit ? this.data.acido_urico : 0,
            bilirrubinaTotal: this.config.data.edit ? this.data.bilirrubinaTotal : 0,
            urea: this.config.data.edit ? this.data.urea : 0,
            proteinasTotal: this.config.data.edit ? this.data.proteinasTotal : 0,
            billirubinaDirecta: this.config.data.edit ? this.data.billirubinaDirecta : 0,
            creatinina: this.config.data.edit ? this.data.creatinina : 0,
            albumina: this.config.data.edit ? this.data.albumina : 0,
            billirubinaIndirecta: this.config.data.edit ? this.data.billirubinaIndirecta : 0,
            colesterol_total: this.config.data.edit ? this.data.colesterol_total : 0,
            calcio: this.config.data.edit ? this.data.calcio : 0,
            fosfatasaAlcalina: this.config.data.edit ? this.data.fosfatasaAlcalina : 0,
            hdlColesterol: this.config.data.edit ? this.data.hdlColesterol : 0,
            amilasa: this.config.data.edit ? this.data.amilasa : 0,
            ldlColesterol: this.config.data.edit ? this.data.ldlColesterol : 0,
            tgo: this.config.data.edit ? this.data.tgo : 0,
            trigliceridos: this.config.data.edit ? this.data.trigliceridos : 0,
            tgp: this.config.data.edit ? this.data.tgp : 0,
            tipoMuestra: this.config.data.edit ? this.data.tipoMuestra : 0,
        }]
    }

    Guardar() {
        let aux: bioquimicaInterface = {
            glicemia: this.dataBioquimica[0].glicemia,
            acido_urico: this.dataBioquimica[0].acido_urico,
            bilirrubinaTotal: this.dataBioquimica[0].bilirrubinaTotal,
            urea: this.dataBioquimica[0].urea,
            proteinasTotal: this.dataBioquimica[0].proteinasTotal,
            billirubinaDirecta: this.dataBioquimica[0].billirubinaDirecta,
            creatinina: this.dataBioquimica[0].creatinina,
            albumina: this.dataBioquimica[0].albumina,
            billirubinaIndirecta: this.dataBioquimica[0].billirubinaIndirecta,
            colesterol_total: this.dataBioquimica[0].colesterol_total,
            calcio: this.dataBioquimica[0].calcio,
            fosfatasaAlcalina: this.dataBioquimica[0].fosfatasaAlcalina,
            hdlColesterol: this.dataBioquimica[0].hdlColesterol,
            amilasa: this.dataBioquimica[0].amilasa,
            ldlColesterol: this.dataBioquimica[0].ldlColesterol,
            tgo: this.dataBioquimica[0].tgo,
            trigliceridos: this.dataBioquimica[0].trigliceridos,
            tgp: this.dataBioquimica[0].tgp,

            tipoMuestra: this.dataBioquimica[0].tipoMuestra,
            nroMuestra: this.formBioquimica.value.nroMuestra,
        }
        this.laboratoriosService.guardarLaboratorioBioquimica(this.config.data.id, aux).subscribe((r: any) => {
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

export interface bioquimicaInterface {
    nroMuestra?: string | number
    resultadoExamen?: string | number
    tipoMuestra?: string | number

    glicemia?: string | number
    acido_urico?: string | number
    bilirrubinaTotal?: string | number
    urea?: string | number
    proteinasTotal?: string | number
    billirubinaDirecta?: string | number
    creatinina?: string | number
    albumina?: string | number
    billirubinaIndirecta?: string | number
    colesterol_total?: string | number
    calcio?: string | number
    fosfatasaAlcalina?: string | number
    hdlColesterol?: string | number
    amilasa?: string | number
    ldlColesterol?: string | number
    tgo?: string | number
    trigliceridos?: string | number
    tgp?: string | number
}
