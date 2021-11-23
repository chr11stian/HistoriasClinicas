import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-consulta-universal',
  templateUrl: './dialog-consulta-universal.component.html',
  styleUrls: ['./dialog-consulta-universal.component.css']
})
export class DialogConsultaUniversalComponent implements OnInit {

  form: FormGroup;
  prueba: any;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    // private 
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({

    })
  }

  closeDialog(){
    
  }

}
