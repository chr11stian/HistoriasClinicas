import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';

export interface AntecedentesPersonales {
  dni?: string;
  embarazo: AEmbarazo[];
  parto: AParto[];
  nacimiento: ANacimiento[];
  alimentacion: AAlimentacion[];
  patologicos: APatologicos[];
}

export interface AEmbarazo {
  patologias1:string;
  patologias2:string;
  normal:boolean;
  complicado:boolean;
  nro1:string;
  nro2:string;
  atencionPrenatal:boolean;
  lugarApn:string;
}

export interface AParto {
  patologias:string;
  pEptopico:boolean;
  complicado:boolean;
  eess:boolean;
  domicilio:boolean;
  consulParticular:boolean;
  profSalud:boolean;
  tecnico:boolean;
  acs:boolean;
  familiar:boolean;
  otro:boolean;
  detalleOtro:string;
}

export interface ANacimiento {
  edadNacer:string;
  pesoNacer:string;
  tallaNacer:string;
  perimetroCefelico:string;
  perimetroTorax:string;
  inmediato:boolean;
  apgar:string;
  reanimacion:boolean;
  patologiaNeonatal:boolean;
  detallePatologia:boolean;
  hospitalizacion:boolean;
  tiempoHospital:string;
}

export interface AAlimentacion {
  lme:boolean;
  mixta:boolean;
  artificial:boolean;
  iniAlimentacionCompl:string;
  suplementoFe:boolean;
}

export interface APatologicos {
  tbc:boolean;
  asma:boolean;
  epilepsia:boolean;
  infecciones:boolean;
  hospitalizacion:boolean;
  transfuSang:boolean;
  cirugia:boolean;
  alergiaMedicamentos:boolean;
  detalleAlergia:string;
  otrosAnt:boolean;
  detalleOtro:string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  stateOptions: any[];
  stateOptions1: any[];
  
  personalFG: FormGroup;
  tabla: any[] =[{normal:true},{complicado:false}];
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];

    this.stateOptions1 = [{label: '1 m', value: 1},
                          {label: '5 m', value: 5}];
    
   }

   buildForm(): void {
    this.personalFG = new FormGroup({
      normal: new FormControl(true, [Validators.required]),
      complicado: new FormControl(true, [Validators.required]),
      
    })
  }

 // Get del form control
 getFC(control: string): AbstractControl {
  return this.personalFG.get(control)
}

// Get Valores del Form Control 
getValueFC(control: string): any {
  return this.getFC(control).value
}

// Set Valores del Form Control 
setValueFC(control: string, value: any): any {
  return this.getFC(control).setValue(value)
}

  rellenarForm() {

    
    this.setValueFC('normal', true)
    this.setValueFC('complicado', false)
    
  }


  ngOnInit(): void {
    this.rellenarForm();
    
    console.log(this.personalFG);
    
  }


  

}
