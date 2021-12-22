import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup ,Validators} from "@angular/forms";

@Component({
  selector: 'app-antecedentes-adolescente',
  templateUrl: './antecedentes-adolescente.component.html',
  styleUrls: ['./antecedentes-adolescente.component.css']
})
export class AntecedentesAdolescenteComponent implements OnInit {
  threeOptions=[
      {name:'Si',code:'si'},
      {name:'No sé',code:'no se'},
      {name:'No',code:'no'}
  ]
    thwoOptions=[
        {name:'Si',code:'si'},
        {name:'No',code:'no'}
    ]
    nivelEducacion=[
        {name:'No escolarizado',code:'no escolarizado'},
        {name:'Primaria',code:'primaria'},
        {name:'Secundaria',code:'secundaria'},
        {name:'Superior',code:'superior'},
    ]
    antecendentesFamiliaresFG:FormGroup;
  buildForm(){
      this.antecendentesFamiliaresFG=new FormGroup({
          madre:new FormControl('',Validators.required),
          padre:new FormControl('',Validators.required),
          otro:new FormControl('',Validators.required)
      })
  }
  constructor() { }


  ngOnInit(): void {
      this.buildForm()
  }

}
