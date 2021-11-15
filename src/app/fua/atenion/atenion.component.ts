import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-atenion',
  templateUrl: './atenion.component.html',
  styleUrls: ['./atenion.component.css']
})
export class AtenionComponent implements OnInit {
    formDeLaAtencion: any;

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formDeLaAtencion = this.form.group({
      // apPaterno: new FormControl(''),
      // // ApMaterno: new FormControl(''),
      // // nombres: new FormControl(''),
      // aplica: new FormControl(''),
      // referencia: new FormControl(''),
    })
  }

}
