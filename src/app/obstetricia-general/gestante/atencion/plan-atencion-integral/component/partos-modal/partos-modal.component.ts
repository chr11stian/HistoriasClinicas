import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-partos-modal',
  templateUrl: './partos-modal.component.html',
  styleUrls: ['./partos-modal.component.css']
})
export class PartosModalComponent implements OnInit {
  medicacion:string;
  medicacionFG:FormGroup;
  constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
  ) {
    this.medicacion = config.data;
    this.buildForm();
  }
  getFC(control: string): AbstractControl {
    return this.medicacionFG.get(control);
  }

  ngOnInit(): void {
    if(this.medicacion!=' '){
      this.getFC('medicacion').setValue(this.medicacion)
    }

  }
  buildForm() {
    console.log(this.medicacion)
    this.medicacionFG = new FormGroup({
      medicacion: new FormControl("", Validators.required),
    });
  }
  agregarActualizar(){
  this.ref.close(this.getFC('medicacion').value)
  }



}
