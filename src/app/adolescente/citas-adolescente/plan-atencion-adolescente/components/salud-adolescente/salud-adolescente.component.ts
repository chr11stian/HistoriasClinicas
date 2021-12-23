import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-salud-adolescente',
  templateUrl: './salud-adolescente.component.html',
  styleUrls: ['./salud-adolescente.component.css']
})
export class SaludAdolescenteComponent implements OnInit {
  siNo=[{name:'Si',code:'si'},
    {name:'No',code:'no'}]
  saludFG:FormGroup
  constructor() { }
  buildForm(){
    this.saludFG=new FormGroup({
      menarquiaEspermarquia:new FormControl('',Validators.required),
      menarquiaEspermarquiaEdad:new FormControl('',Validators.required),
      inicioRelacionSexual:new FormControl('',Validators.required),
      inicioRelacionSexualEdad:new FormControl('',Validators.required),
      abusoSexual:new FormControl('',Validators.required),
      abusoSexualNro:new FormControl('',Validators.required),
      enbarazo:new FormControl('',Validators.required),
      enbarazoNro:new FormControl('',Validators.required),
      hijos:new FormControl('',Validators.required),
      hijosNro:new FormControl('',Validators.required),
      aborto:new FormControl('',Validators.required),
      abortoNro:new FormControl('',Validators.required),
      observaciones:new FormControl('',Validators.required),
      usaMetodoAnticonceptivo:new FormControl('',Validators.required),
      sabePrevenirEmbarazoNoDeseado:new FormControl('',Validators.required),
      sabePrevenirITSVIH:new FormControl('',Validators.required),
      especifique:new FormControl('',Validators.required),


    })
  }

  ngOnInit(): void {
    this.buildForm()
  }
  getFC(control:string):AbstractControl{
    return this.saludFG.get(control);
  }
  save(){
    console.log(this.saludFG.value)
  }



}
