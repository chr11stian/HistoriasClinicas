import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecienNacidoDialogoComponent } from './recien-nacido-dialogo/recien-nacido-dialogo.component';
import { RecienNacidoService } from '../../services/recien-nacido/recien-nacido.service';

@Component({
  selector: 'app-recien-nacido',
  templateUrl: './recien-nacido.component.html',
  styleUrls: ['./recien-nacido.component.css'],
  providers: [DialogService]
})
export class RecienNacidoComponent implements OnInit {
  todosRN: any[] = [];
  ref: DynamicDialogRef;

  constructor(
    public dialog: DialogService,
    public recienNacidoService: RecienNacidoService
  ) {
  }

  openDialogRN() {
    this.ref = this.dialog.open(RecienNacidoDialogoComponent, {
      header: "RECIEN NACIDO",
      width: "95%",
      contentStyle: {
        "max-height": "500px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
      if(data!==undefined)
        this.todosRN.push(data);
    })
  }

  guardarRecienNacidos(){
    console.log('data to save ', this.todosRN);
    this.recienNacidoService.postRecienNacido('DNI', '10101011', {recienNacido: this.todosRN}).subscribe((res: any) => {
      console.log('se guardo con exito ', res)
    })
  }
  ngOnInit(): void {
  }

}
