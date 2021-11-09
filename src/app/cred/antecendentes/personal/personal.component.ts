import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';

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
      normal: new FormControl(null, [Validators.required]),
      complicado: new FormControl(null, [Validators.required]),
      
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
