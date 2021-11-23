import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-consulta',
  templateUrl: './dialog-consulta.component.html',
  styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

  form: FormGroup;
  prueba: any;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
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
    this.ref.close();
  }

}
