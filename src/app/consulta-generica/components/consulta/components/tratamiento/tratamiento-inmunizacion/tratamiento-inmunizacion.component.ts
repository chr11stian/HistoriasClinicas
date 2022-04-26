import { Component, OnInit } from '@angular/core';
import {
  TratamientoInmunizacionModalComponent
} from "../tratamiento-inmunizacion-modal/tratamiento-inmunizacion-modal.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {TratamientosInmunizacionService} from "../../../../../services/tratamientos/tratamientos-inmunizacion.service";

@Component({
  selector: 'app-tratamiento-inmunizacion',
  templateUrl: './tratamiento-inmunizacion.component.html',
  styleUrls: ['./tratamiento-inmunizacion.component.css'],
  providers: [DialogService]
})
export class TratamientoInmunizacionComponent implements OnInit {

  ref: DynamicDialogRef;
  tratamientoInmunizaciones:any[]
  dataConsulta=<any>JSON.parse(localStorage.getItem('documento'))
  // console.log("ipress", this.idIpress)
  constructor(private dialog: DialogService,
              private tratamientosInmunizacionService:TratamientosInmunizacionService) {
    console.log('inmunizacione')
  }

  ngOnInit(): void {
    this.getInmunizaciones()
  }
  getInmunizaciones(){
    this.tratamientosInmunizacionService.getUnmunizaciones(this.dataConsulta.idConsulta).subscribe((resp:any)=>{
      this.tratamientoInmunizaciones=resp.object;
    })

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
      if(data=='agregado'){

        Swal.fire({
          icon: 'success',
          title: 'Agregado',
          text: 'Inmunización guardada correctamente',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getInmunizaciones();
      }
      // this.recuperarInmunizaciones();
    })
  }
  openDialogEditarTratamientoInmunizaciones(){

  }
  eliminarInmunizaciones(){

  }

}
