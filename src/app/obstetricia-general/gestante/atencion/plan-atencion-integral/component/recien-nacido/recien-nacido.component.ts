import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DialogService } from 'primeng/dynamicdialog';
import { RecienNacidoDialogoComponent } from './recien-nacido-dialogo/recien-nacido-dialogo.component';

@Component({
  selector: 'app-recien-nacido',
  templateUrl: './recien-nacido.component.html',
  styleUrls: ['./recien-nacido.component.css'],
  providers: [DialogService]
})
export class RecienNacidoComponent implements OnInit {
  todosRN: any[];

  constructor(
    public dialog: DialogService
  ) {
    this.todosRN = [{
      nombre: "Jimmy Pimentel",
      sexo: "Masculino",
      hcl: "42359849",
    },
    {
      nombre: "Jonathan Morocco",
      sexo: "Masculino",
      hcl: "42903040",
    },
    {
      nombre: "Julian Cordova",
      sexo: "Masculino",
      hcl: "43159304",
    }
    ]
  }

  openDialogRN() {
    let dialog = this.dialog.open(RecienNacidoDialogoComponent, {
      header: "RECIEN NACIDO",
      width: "95%",
      contentStyle: {
        "max-height": "500px",
        overflow: "auto",
      },
      data: {
        texto: 'datossss'
      }
    })

  }

  ngOnInit(): void {
  }

}
