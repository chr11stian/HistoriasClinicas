import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AntecedentesVivienda } from '../../models/antecedentes.interface';

// export interface AntecedentesVivienda {
//   dni?: string;
//   aguaPotable:boolean;
//   aguaPotableDetalle:string;
//   desague:boolean;
//   desagueDetalle:string;
// }

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {
  @Output() viviendaEmit: EventEmitter<AntecedentesVivienda> = new EventEmitter<AntecedentesVivienda>();
  viviendaFG: FormGroup;

  stateOptions: any[];
  prueba: AntecedentesVivienda[];

  constructor(
    private formBuilder: FormBuilder) {

      this.buildForm();
      this.stateOptions = [{label: 'SI', value: true},
                            {label: 'NO', value: false}];
  }


  getFC(control: string): AbstractControl {
    return this.viviendaFG.get(control)
  }

  buildForm(): void {
    this.viviendaFG = this.formBuilder.group({
      agua: [null],
      detalleAgua: [''],
      desague: [null],
      detalleDesague: [''],

    })
  }


  rellenarForm(tabla: AntecedentesVivienda): void {

    this.getFC('agua').setValue(tabla.aguaPotable)
    this.getFC('detalleAgua').setValue(tabla.aguaPotableDetalle)
    this.getFC('desague').setValue(tabla.desague)
    this.getFC('detalleDesague').setValue(tabla.desagueDetalle)
    }

  ngOnInit(): void {
    //console.log(this.viviendaFG);
    
  }

  save(){
    this.viviendaEmit.emit({
      aguaPotable: this.getFC('agua').value,
      aguaPotableDetalle: this.getFC('detalleAgua').value,
      desague: this.getFC('desague').value,
      desagueDetalle: this.getFC('detalleDesague').value
      
  })
  
  console.log(this.viviendaFG);
  
  }

  limpiar() {
    this.viviendaFG.reset();
  }

}
