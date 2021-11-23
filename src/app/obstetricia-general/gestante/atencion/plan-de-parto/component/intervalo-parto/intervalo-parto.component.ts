import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DialogService } from 'primeng/dynamicdialog';
import { IntervaloDialogoComponent } from './intervalo-dialogo/intervalo-dialogo.component';

@Component({
  selector: 'app-intervalo-parto',
  templateUrl: './intervalo-parto.component.html',
  styleUrls: ['./intervalo-parto.component.css'],
  providers: [DialogService]
})
export class IntervaloPartoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];
  intervaloDialog: boolean;
  prueba: any[];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: DialogService
  ) {
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
    this.prueba = [{
      fecha: "01/02/2021",
      edad: "10 semanas",
    },
    {
      fecha: "01/04/2021",
      edad: "20 semanas",
    },
    {
      fecha: "01/06/2021",
      edad: "30 semanas",
    },
    {
      fecha: "01/09/2021",
      edad: "36 semanas",
    }]
  }

  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      dondeParto: ['', [Validators.required]],
      posicionParto: ['', [Validators.required]],
      transporteParto: ['', [Validators.required]],
      selected: ['', [Validators.required]],
    })
  }
  openNew() {
    this.intervaloDialog = true;
  }
  openDialogConsulta() {
    let dialog = this.dialog.open(IntervaloDialogoComponent, {
        header: "CONSULTA",
        width: "95%",
        contentStyle: {
            "max-height": "500px",
            overflow: "auto",
        },
        footer:`hola mundo`,
        data:{
            texto:'datossss'
        }
    })

}
  ngOnInit(): void {
    this.buildForm();
  }

}
