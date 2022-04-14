import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    TratamientoInmunizacionModalComponent
} from "../tratamiento-inmunizacion-modal/tratamiento-inmunizacion-modal.component";
import {
    TratamientoSuplementacionModalComponent
} from "../tratamiento-suplementacion-modal/tratamiento-suplementacion-modal.component";
import Swal from "sweetalert2";
@Component({
  selector: 'app-tratamiento-suplementacion',
  templateUrl: './tratamiento-suplementacion.component.html',
  styleUrls: ['./tratamiento-suplementacion.component.css'],
    providers: [DialogService]
})
export class TratamientoSuplementacionComponent implements OnInit {

    ref: DynamicDialogRef;
    tratamientoSuplementacion:any[]
    constructor(private dialog: DialogService) {
        console.log('inmunizacione')
    }

    ngOnInit(): void {
    }
    openDialogTratamientoInmunizaciones() {
        this.ref = this.dialog.open(TratamientoSuplementacionModalComponent, {
            header: "Suplementaciones",
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
                    title: 'Guardado',
                    text: 'Suplementación Guardada satisfactoriamente',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
            // console.log("data de modal tratamiento", data)
            // this.recuperarInmunizaciones();
        })
    }
    openDialogEditarTratamientoInmunizaciones(){

    }
    eliminarInmunizaciones(){

    }


}
