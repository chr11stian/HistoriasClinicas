import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-diagnostico',
  templateUrl: './modal-diagnostico.component.html',
  styleUrls: ['./modal-diagnostico.component.css']
})
export class ModalDiagnosticoComponent implements OnInit {
  dialogDiagnosticos:any[]=[];

  constructor(
      private ref: DynamicDialogRef,
      private config: DynamicDialogConfig)
  { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.ref.close();
  }
}
