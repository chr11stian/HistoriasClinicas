import { Component, OnInit } from '@angular/core';
import {
  TratamientoInmunizacionModalComponent
} from "../tratamiento-inmunizacion-modal/tratamiento-inmunizacion-modal.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-tratamiento-inmunizacion',
  templateUrl: './tratamiento-inmunizacion.component.html',
  styleUrls: ['./tratamiento-inmunizacion.component.css'],
  providers: [DialogService]
})
export class TratamientoInmunizacionComponent implements OnInit {

  ref: DynamicDialogRef;
  tratamientoInmunizaciones:any[]
  constructor(private dialog: DialogService) {
    console.log('inmunizacione')
  }

  ngOnInit(): void {
  }
  openDialogTratamientoInmunizaciones() {
    this.ref = this.dialog.open(TratamientoInmunizacionModalComponent, {
      header: "INMUNIZACIONES",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      // console.log("data de modal tratamiento", data)
      // this.recuperarInmunizaciones();
    })
  }
  openDialogEditarTratamientoInmunizaciones(){

  }
  eliminarInmunizaciones(){

  }

}
