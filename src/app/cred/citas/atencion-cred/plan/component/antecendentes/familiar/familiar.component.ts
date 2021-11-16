import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AntecedentesFamiliares } from '../../models/antecedentes.interface';

// export interface AntecedentesFamiliares {
//   dni?: string;
//   tbc:boolean;
//   tbcQuien:string;
//   asma:boolean;
//   asmaQuien:string;
//   vih:boolean;
//   vihQuien:string;
//   diabetes:boolean;
//   diabetesQuien:string;
//   epilepsia:boolean;
//   epilepsiaQuien:string;
//   alergiaMedicinas:boolean;
//   alergiaMediQuien:string;
//   violenciaFam:boolean;
//   violenciaFamQuien:string;
//   alcoholismo:boolean;
//   alcoholismoQuien:string;
//   drogadiccion:boolean;
//   drogadiccionQuien:string;
//   hepatitisB:boolean;
//   hepatitisBQuien:string;
// }

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent implements OnInit {
  @Output() familiarEmit: EventEmitter<AntecedentesFamiliares> = new EventEmitter<AntecedentesFamiliares>();
  familiarFG: FormGroup;

  familiares: any[];
  stateOptions: any[];

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
    this.familiares = [
                            {name: 'Padre', code: 'P'},
                            {name: 'Madre', code: 'M'},
                            {name: 'Hermano', code: 'H'},
                            {name: 'Abuelo', code: 'A'},
                            {name: 'Otro', code: 'O'}
                        ];
  }

  getFC(control: string): AbstractControl {
    return this.familiarFG.get(control)
  }

  buildForm(): void {
    this.familiarFG = this.formBuilder.group({
      tuberculosis: [true],
      tuberculosisQuien: [''],
      asma: [true],
      asmaQuien: [''],
      sida: [true],
      sidaQuien: [''],
      diabetes: [true],
      diabetesQuien: [''],
      epilepsia: [true],
      epilepsiaQuien: [''],
      alergiam: [true],
      alergiamQuien: [''],
      violenciaF: [true],
      violenciaFQuien: [''],
      alcoholismo: [true],
      alcoholismoQuien: [''],
      droga: [true],
      drogaQuien: [''],
      hepatitisB: [true],
      hepatitisBQuien: [''],
      
    })
  }


  rellenarForm(tabla: AntecedentesFamiliares): void {

    this.getFC('tuberculosis').setValue(tabla.tbc)
    this.getFC('tuberculosisQuien').setValue(tabla.tbcQuien)
    this.getFC('asma').setValue(tabla.asma)
    this.getFC('asmaQuien').setValue(tabla.asmaQuien)
    this.getFC('sida').setValue(tabla.vih)
    this.getFC('sidaQuien').setValue(tabla.vihQuien)
    this.getFC('diabetes').setValue(tabla.diabetes)
    this.getFC('diabetesQuien').setValue(tabla.diabetesQuien)
    this.getFC('epilepsia').setValue(tabla.epilepsia)
    this.getFC('epilepsiaQuien').setValue(tabla.epilepsiaQuien)
    this.getFC('alergiam').setValue(tabla.alergiaMedicinas)
    this.getFC('alergiamQuien').setValue(tabla.alergiaMediQuien)
    this.getFC('violenciaF').setValue(tabla.violenciaFam)
    this.getFC('violenciaFQuien').setValue(tabla.violenciaFamQuien)
    this.getFC('alcoholismo').setValue(tabla.alcoholismo)
    this.getFC('alcoholismoQuien').setValue(tabla.alcoholismoQuien)
    this.getFC('droga').setValue(tabla.drogadiccion)
    this.getFC('drogaQuien').setValue(tabla.drogadiccionQuien)
    this.getFC('hepatitisB').setValue(tabla.hepatitisB)
    this.getFC('hepatitisBQuien').setValue(tabla.hepatitisBQuien)    

  }

  ngOnInit(): void {

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
