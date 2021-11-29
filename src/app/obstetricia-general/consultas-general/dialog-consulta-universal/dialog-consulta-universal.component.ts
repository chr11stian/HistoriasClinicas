import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-consulta-universal',
  templateUrl: './dialog-consulta-universal.component.html',
  styleUrls: ['./dialog-consulta-universal.component.css']
})
export class DialogConsultaUniversalComponent implements OnInit {
  @Input() dataHijo: string;

  form: FormGroup;
  prueba: any;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef
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
    let a = {
      a:2,
      b:'hola mundo'
    }
    this.ref.close(a);
  }

}
