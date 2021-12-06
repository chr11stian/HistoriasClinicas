import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AntecedentesViviendaFormType, AntecedentesViviendaType } from '../../models/antecedentes.interface';
import { AntecedenteViviendaService } from '../../../../../../services/antecedentes/antecedente-vivienda.service';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {
  @Output() viviendaEmit: EventEmitter<AntecedentesViviendaFormType> = new EventEmitter<AntecedentesViviendaFormType>();
  viviendaFG: FormGroup;

  stateOptions: any[];
  datosVivienda: AntecedentesViviendaType[];

  constructor(
    private formBuilder: FormBuilder,
    private servicioVivienda: AntecedenteViviendaService) {

      this.buildForm();
      this.stateOptions = [{label: 'SI', value: true},
                            {label: 'NO', value: false}];
  }

  async getTablaDatos() {
    await this.servicioVivienda.getDatosGenerales('11111111')
    .toPromise().then(res => <AntecedentesViviendaType[]> res['object'])
    .then(data => {
        this.datosVivienda = data;
        console.log(this.datosVivienda);
        this.rellenarForm(this.datosVivienda);
    })
    .catch(error => { return error;});
    
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


  rellenarForm(tabla: AntecedentesViviendaType[]): void {

    this.getFC('agua').setValue(tabla[0].valor)
    this.getFC('detalleAgua').setValue(tabla[0].especificar)
    this.getFC('desague').setValue(tabla[0].valor)
    this.getFC('detalleDesague').setValue(tabla[0].especificar)
    }

  ngOnInit(): void {
    this.getTablaDatos();
    
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
