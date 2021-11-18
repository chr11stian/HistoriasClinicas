import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-s-refiere-contrarefiere',
  templateUrl: './s-refiere-contrarefiere.component.html',
  styleUrls: ['./s-refiere-contrarefiere.component.css']
})
export class SRefiereContrarefiereComponent implements OnInit {

  formRefContraref: FormGroup;
  data:any[]=[];
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  TamizajeOptions=[
    {label:'PAT.', value: 'PAT'},
    {label:'NOR.', value: 'NOR'}
  ];
  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.formRefContraref = this.form.group({
      // apPaterno: new FormControl(''),
      // // ApMaterno: new FormControl(''),
      // // nombres: new FormControl(''),
      // aplica: new FormControl(''),
      // referencia: new FormControl(''),
    })
  }

}
