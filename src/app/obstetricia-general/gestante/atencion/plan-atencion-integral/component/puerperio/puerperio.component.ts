import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioModalComponent} from "./puerperio-modal/puerperio-modal.component"
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {MessageService} from "primeng/api";
import {RecienNacidoDialogoComponent} from "../recien-nacido/recien-nacido-dialogo/recien-nacido-dialogo.component";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css'],
    providers:[DialogService]
})
export class PuerperioComponent implements OnInit {

    puerperios: any[] = [];
    ref: DynamicDialogRef;
    idObstetricia:string;

    constructor(
        private form: FormBuilder,
        private puerperioService: PuerperioInmediatoService,
        private dialog: DialogService,
        private obstetriciaService:ObstetriciaGeneralService
    ) {
        this.idObstetricia = this.obstetriciaService.idGestacion;
        this.recuperarPuerperios();
    }
    ngOnInit(): void {
        this.recuperarPuerperios();
    }

   //  recuperarPuerperios() {
   //     this.isUpdate = true;
   //     console.log(this.id);
   //     this.puerperioService.getPuerperioService2(this.id).subscribe((res: any) => {
   //         this.dataPuerperio=res.object;
   //          console.log(this.dataPuerperio.puerperioInmediato.length);
   //         if (this.dataPuerperio.puerperioInmediato.length === null || this.dataPuerperio.puerperioInmediato.length === 0)
   //         {
   //             console.log("debe ingresar un puerperio, NO SE ATENDIO HASTA EL MOMENTO");
   //             // this.saveForm();
   //         }else {
   //             this.proceso = this.recuperarProceso(this.dataPuerperio);
   //             console.log(this.dataPuerperio.puerperioInmediato);
   //             let fecha  = this.dataPuerperio.puerperioInmediato[0].fechaAtencion;
   //             // console.log(this.recuperarFecha(fecha));
   //             // this.formPurperio.get("fechaAtencion").setValue(fecha);
   //             this.formPurperio.get("fechaAtencion").setValue(this.ObtenerFecha(fecha));
   //             this.formPurperio.get('pulso').setValue(this.dataPuerperio.puerperioInmediato[0].pulso);
   //             this.formPurperio.get('horasDias').setValue(this.dataPuerperio.puerperioInmediato[0].horasDiasPostPartoAborto);
   //             this.formPurperio.get('involucionUterina').setValue(this.dataPuerperio.puerperioInmediato[0].involucionUteriana);
   //             this.formPurperio.get('heridaOperacion').setValue(this.dataPuerperio.puerperioInmediato[0].heridaOperacion);
   //             this.formPurperio.get('observaciones').setValue(this.dataPuerperio.puerperioInmediato[0].observaciones);
   //             this.formPurperio.get('temperatura').setValue(this.dataPuerperio.puerperioInmediato[0].temperatura);
   //             this.formPurperio.get('presionArterial').setValue(this.dataPuerperio.puerperioInmediato[0].presionArterialMaxima);
   //             this.formPurperio.get('caracteristicasLoquios').setValue(this.dataPuerperio.puerperioInmediato[0].caracteristicasLoquios);
   //         }
   //         // let i:number=0;
   //         // while(i < this.tamanioPuerperio) {
   //         //     console.log("puerperio", i);
   //         //     i++;
   //         // }
   //     });
   // }
   //
   // recuperarProceso(dataPuerperio){
   //      return dataPuerperio.proceso;
   // }
   // openNew(){
   //      this.consultaPuerperio=true;
   // }
   // // openModalPuerperio() {
   // //      let dialog = this.dialog.open(PuerperioModalComponent, {
   // //          header: "AGREGAR PUERPERIO",
   // //          width:"60%",
   // //          height:"50%",
   // //          data:{
   // //              texto:'datos'
   // //          }
   // //      })
   // // }
   // canceled() {
   //      Swal.fire({
   //          icon: 'warning',
   //          title: 'Cancelado...',
   //          text: '',
   //          showConfirmButton: false,
   //          timer: 1000
   //      })
   //
   //  }
   // getFecha(date:Date){
   //
   //      let dd = date.getDate();
   //      let mm = date.getMonth() +1;
   //      let yyyy = date.getFullYear();
   //      return yyyy+'-'+mm+'-'+dd
   //  }
   // ObtenerFecha(date:string){
   //      let values = date.split("-");
   //      let dia = values[2];
   //      let mes = values[1];
   //      let anio = values[0];
   //      return dia+"/"+mes+"/"+anio;
   //
   //
   //  }
    openDialogPuerperio() {
        this.ref = this.dialog.open(PuerperioModalComponent, {
            header: "PUERPERIO",
            width: "95%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if(data!==undefined)
                this.puerperios.push(data);
        })
    }
    openDialogEditarPuerperio(row, index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(PuerperioModalComponent, {
            header: "PUERPERIO",
            width: "95%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if(data!==undefined) {
                this.puerperios.splice(data.index, 1,data.row);
            };
        })
    }
    guardarPuerperios() {

        const req = {
                         puerperioInmediato: this.puerperios,
                         proceso: "puerperio"
                     }
        console.log('data to save ', this.puerperios);
        this.puerperioService.addPuerperioService2(this.idObstetricia,req).subscribe(
                         (resp) => {
                         console.log(resp);
                         console.log(req);
                         // this.puerperios.push(this.formPurperio);
                         Swal.fire({
                             icon: 'success',
                             title: 'Agregado correctamente',
                             text: '',
                             showConfirmButton: false,
                             timer: 1500,
                         })
                  }
              )
      }
    recuperarPuerperios(){
        console.log('data to save ', this.puerperios);
        this.puerperioService.getPuerperioService2(this.idObstetricia).subscribe((res: any) => {
            this.puerperios=res.object.puerperios?res.object.puerperios.puerperioInmediato:[];
        })
    }


}
