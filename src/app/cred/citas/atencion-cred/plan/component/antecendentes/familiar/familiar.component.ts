import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AntecedenteFamiliarService } from 'src/app/cred/services/antecedentes/antecedente-familiar.service';
import { AntecedentesFamiliaresFormType, AntecedentesFamiliaresType } from '../../models/antecedentes.interface';
import {dato} from "../../../../../models/data";

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent implements OnInit {
  @Output() familiarEmit: EventEmitter<AntecedentesFamiliaresFormType> = new EventEmitter<AntecedentesFamiliaresFormType>();
  familiarFG: FormGroup;
  nroDoc: string = ''
  attributeLocalS = 'documento'
  data: dato
  familiares: any[];
  stateOptions: any[];

  datosFamiliares: AntecedentesFamiliaresType[];

  constructor(private formBuilder: FormBuilder,
              private familiarServicio: AntecedenteFamiliarService) {
    this.buildForm();
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
    this.familiares = [
                            {name: 'Padre', code: 'P'},
                            {name: 'Madre', code: 'M'},
                            {name: 'Hermano', code: 'H'},
                            {name: 'Abuelo', code: 'A'},
                            {name: 'Otro', code: 'T'}
                        ];
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.nroDoc = this.data.nroDocumento
  }

  async getTablaDatos() {
    await this.familiarServicio.getDatosGenerales(this.nroDoc)
    .toPromise().then(res => <AntecedentesFamiliaresType[]> res['object'])
    .then(data => {
        this.datosFamiliares = data;
        console.log(this.datosFamiliares);
        this.rellenarForm(this.datosFamiliares);
    })
    .catch(error => { return error;});
    
    
    
}

  getFC(control: string): AbstractControl {
    return this.familiarFG.get(control)
  }

  buildForm(): void {
    this.familiarFG = this.formBuilder.group({
      tuberculosis: [null],
      tuberculosisQuien: [''],
      asma: [null],
      asmaQuien: [''],
      sida: [null],
      sidaQuien: [''],
      diabetes: [null],
      diabetesQuien: [''],
      epilepsia: [null],
      epilepsiaQuien: [''],
      alergiam: [null],
      alergiamQuien: [''],
      violenciaF: [null],
      violenciaFQuien: [''],
      alcoholismo: [null],
      alcoholismoQuien: [''],
      droga: [null],
      drogaQuien: [''],
      hepatitisB: [null],
      hepatitisBQuien: [''],
      
    })
  }


  rellenarForm(tabla: AntecedentesFamiliaresType[]): void {

    this.getFC('tuberculosis').setValue(tabla[0].valor)
    this.getFC('tuberculosisQuien').setValue(tabla[0].quien)
    this.getFC('asma').setValue(tabla[1].valor)
    this.getFC('asmaQuien').setValue(tabla[1].quien)
    this.getFC('sida').setValue(tabla[2].valor)
    this.getFC('sidaQuien').setValue(tabla[2].quien)
    this.getFC('diabetes').setValue(tabla[3].valor)
    this.getFC('diabetesQuien').setValue(tabla[3].quien)
    this.getFC('epilepsia').setValue(tabla[4].valor)
    this.getFC('epilepsiaQuien').setValue(tabla[4].quien)
    this.getFC('alergiam').setValue(tabla[5].valor)
    this.getFC('alergiamQuien').setValue(tabla[5].quien)
    this.getFC('violenciaF').setValue(tabla[6].valor)
    this.getFC('violenciaFQuien').setValue(tabla[6].quien)
    this.getFC('alcoholismo').setValue(tabla[7].valor)
    this.getFC('alcoholismoQuien').setValue(tabla[7].quien)
    this.getFC('droga').setValue(tabla[8].valor)
    this.getFC('drogaQuien').setValue(tabla[8].quien)
    this.getFC('hepatitisB').setValue(tabla[9].valor)
    this.getFC('hepatitisBQuien').setValue(tabla[9].quien)    

  }

  ngOnInit(): void {
    this.getTablaDatos();
  }
  
  save() {
    this.familiarEmit.emit({
      tbc: this.getFC('tuberculosis').value,
      tbcQuien: this.getFC('tuberculosisQuien').value,
      asma:this.getFC('asma').value,
      asmaQuien:this.getFC('asmaQuien').value,
      vih:this.getFC('sida').value,
      vihQuien:this.getFC('sidaQuien').value,
      diabetes:this.getFC('diabetes').value,
      diabetesQuien:this.getFC('diabetesQuien').value,
      epilepsia:this.getFC('epilepsia').value,
      epilepsiaQuien:this.getFC('epilepsiaQuien').value,
      alergiaMedicinas:this.getFC('alergiam').value,
      alergiaMediQuien:this.getFC('alergiamQuien').value,
      violenciaFam:this.getFC('violenciaF').value,
      violenciaFamQuien:this.getFC('violenciaFQuien').value,
      alcoholismo:this.getFC('alcoholismo').value,
      alcoholismoQuien:this.getFC('alcoholismoQuien').value,
      drogadiccion:this.getFC('droga').value,
      drogadiccionQuien:this.getFC('drogaQuien').value,
      hepatitisB:this.getFC('hepatitisB').value,
      hepatitisBQuien:this.getFC('hepatitisBQuien').value,
    })
    console.log(this.familiarFG.value);
    
  }

  limpiar() {
    this.familiarFG.reset();
  }
  

}
