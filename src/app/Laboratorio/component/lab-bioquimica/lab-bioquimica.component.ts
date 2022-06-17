import {Component, Input, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

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
    this.data = config.data;
  }

  ngOnInit(): void {
    this.dataBioquimica = [{
      glicemia: 0,
      acido_urico: 0,
      bilirrubinaTotal: 0,
      urea: 0,
      proteinasTotal: 0,
      billirubinaDirecta: 0,
      creatinina: 0,
      albumina: 0,
      billirubinaIndirecta: 0,
      colesterol_total: 0,
      calcio: 0,
      fosfatasaAlcalina: 0,
      HDLcolesterol: 0,
      amilasa: 0,
      LDLcolesterol: 0,
      tgo: 0,
      trigliceridos: 0,
      tgp: 0,
      tipoMuestra: 0
    }]
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
    console.log('XL',this.data)
    this.formBioquimica.get('apellidosNombres').setValue(this.data.datosPaciente.apePaterno + ' ' + this.data.datosPaciente.apeMaterno + ' ' + this.data.datosPaciente.primerNombre + ' ' + this.data.datosPaciente.otrosNombres);
    this.formBioquimica.get('edad').setValue(this.data.datosPaciente.edad);
    this.formBioquimica.get('nroHistoria').setValue(this.data.datosPaciente.nroHcl);
    this.formBioquimica.get('nroCama').setValue(this.data.datosPaciente.nroCama);
    this.formBioquimica.get('solicitante').setValue(this.data.profesionalAcargo.apePaterno + ' ' + this.data.profesionalAcargo.apeMaterno + ' ' + this.data.profesionalAcargo.primerNombre + ' ' + this.data.profesionalAcargo.otrosNombres);
    this.formBioquimica.get('horaMuestra').setValue(this.fecha)
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
      HDLcolesterol: this.dataBioquimica[0].HDLcolesterol,
      amilasa: this.dataBioquimica[0].amilasa,
      LDLcolesterol: this.dataBioquimica[0].LDLcolesterol,
      tgo: this.dataBioquimica[0].tgo,
      trigliceridos: this.dataBioquimica[0].trigliceridos,
      tgp: this.dataBioquimica[0].tgp,

      tipoMuestra: this.dataBioquimica[0].tipoMuestra,
      nroMuestra: this.formBioquimica.value.nroMuestra,
    }
    this.laboratoriosService.guardarLaboratorioInmunologico(this.config.data.id, aux).subscribe((r: any) => {
      console.log(r)
    })
    this.ref.close()
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
  HDLcolesterol?: string | number
  amilasa?: string | number
  LDLcolesterol?: string | number
  tgo?: string | number
  trigliceridos?: string | number
  tgp?: string | number
}
