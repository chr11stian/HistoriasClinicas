import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogReqLaboratorioComponent } from './dialog-req-laboratorio/dialog-req-laboratorio.component';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css'],
  providers: [DialogService]
})
export class LaboratorioComponent implements OnInit {
  ref: DynamicDialogRef

  constructor(
    public dialog: DialogService
  ) { }

  ngOnInit(): void {
  }
  openDialogSolicitud() {
    this.ref = this.dialog.open(DialogReqLaboratorioComponent, {
      header: "SOLICITUD DE EXAMENES DE LABORATORIO",
      width: "90%",
      height: "800px",
    });
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de dialog ', data);
    })
  }
}
