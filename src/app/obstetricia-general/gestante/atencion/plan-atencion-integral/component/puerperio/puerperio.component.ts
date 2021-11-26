import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioModalComponent} from "./puerperio-modal/puerperio-modal.component"
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css'],
    providers:[DialogService]
})
export class PuerperioComponent implements OnInit {

    id: any;
    ref: DynamicDialogRef;
    dataPuerperio: any;
    consultaPuerperio: boolean;
    isUpdate: boolean = false;
    idUpdate: string = "";
    proceso:string="";
    fecha = new Date();
    formPurperio: FormGroup;
    data: any[] = [];

    constructor(
        private form: FormBuilder,
        private puerperioService: PuerperioInmediatoService,
        private dialog: DialogService,
        private messageService: MessageService,
        private obstetriciaService:ObstetriciaGeneralService
    ) {
        this.buildForm();
    }
    ngOnInit(): void {
        this.id = this.obstetriciaService.idGestacion;
        console.log(this.id);
        this.recuperarPuerperios();

    }

    buildForm() {
        this.formPurperio = new FormGroup({
            fechaAtencion:new FormControl("", [Validators.required]),
            horasDias: new FormControl("", [Validators.required]),
            temperatura: new FormControl("", [Validators.required]),
            pulso: new FormControl("", [Validators.required]),
            presionArterial: new FormControl("", [Validators.required]),
            involucionUterina: new FormControl("", [Validators.required]),
            heridaOperacion: new FormControl("", [Validators.required]),
            caracteristicasLoquios: new FormControl("", [Validators.required]),
            observaciones: new FormControl("", [Validators.required]),
            proceso:new FormControl("", []),
        });
        // this.puerperios = new FormArray([this.formPurperio]);
    }
    saveForm() {
        this.id = this.obstetriciaService.idGestacion;
        this.isUpdate = false;
        const req = {
                puerperioInmediato: [
                    {
                        fechaAtencion:this.getFecha(this.formPurperio.value.fechaAtencion),
                        horasDiasPostPartoAborto:this.formPurperio.value.horasDias,
                        temperatura: this.formPurperio.value.temperatura,
                        pulso:this.formPurperio.value.pulso,
                        presionArterialMaxima:this.formPurperio.value.presionArterial,
                        involucionUteriana:this.formPurperio.value.involucionUterina,
                        caracteristicasLoquios:this.formPurperio.value.caracteristicasLoquios,
                        heridaOperacion:this.formPurperio.value.heridaOperacion,
                        observaciones:this.formPurperio.value.observaciones
                    }
                ],
                proceso: "puerperio"
            }
            this.puerperioService.addPuerperioService2(this.id,req).subscribe(
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
    recuperarPuerperios() {
       this.isUpdate = true;
       console.log(this.id);
       this.puerperioService.getPuerperioService2(this.id).subscribe((res: any) => {
           this.dataPuerperio=res.object;
            console.log(this.dataPuerperio.puerperioInmediato.length);
           if (this.dataPuerperio.puerperioInmediato.length === null || this.dataPuerperio.puerperioInmediato.length === 0)
           {
               console.log("debe ingresar un puerperio, NO SE ATENDIO HASTA EL MOMENTO");
               // this.saveForm();
           }else {
               this.proceso = this.recuperarProceso(this.dataPuerperio);
               console.log(this.dataPuerperio.puerperioInmediato);
               let fecha  = this.dataPuerperio.puerperioInmediato[0].fechaAtencion;
               // console.log(this.recuperarFecha(fecha));
               // this.formPurperio.get("fechaAtencion").setValue(fecha);
               this.formPurperio.get("fechaAtencion").setValue(this.ObtenerFecha(fecha));
               this.formPurperio.get('pulso').setValue(this.dataPuerperio.puerperioInmediato[0].pulso);
               this.formPurperio.get('horasDias').setValue(this.dataPuerperio.puerperioInmediato[0].horasDiasPostPartoAborto);
               this.formPurperio.get('involucionUterina').setValue(this.dataPuerperio.puerperioInmediato[0].involucionUteriana);
               this.formPurperio.get('heridaOperacion').setValue(this.dataPuerperio.puerperioInmediato[0].heridaOperacion);
               this.formPurperio.get('observaciones').setValue(this.dataPuerperio.puerperioInmediato[0].observaciones);
               this.formPurperio.get('temperatura').setValue(this.dataPuerperio.puerperioInmediato[0].temperatura);
               this.formPurperio.get('presionArterial').setValue(this.dataPuerperio.puerperioInmediato[0].presionArterialMaxima);
               this.formPurperio.get('caracteristicasLoquios').setValue(this.dataPuerperio.puerperioInmediato[0].caracteristicasLoquios);
           }
           // let i:number=0;
           // while(i < this.tamanioPuerperio) {
           //     console.log("puerperio", i);
           //     i++;
           // }
       });
   }

   recuperarProceso(dataPuerperio){
        return dataPuerperio.proceso;
   }
   openNew(){
        this.consultaPuerperio=true;
   }
   // openModalPuerperio() {
   //      let dialog = this.dialog.open(PuerperioModalComponent, {
   //          header: "AGREGAR PUERPERIO",
   //          width:"60%",
   //          height:"50%",
   //          data:{
   //              texto:'datos'
   //          }
   //      })
   // }
   canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })

    }
   getFecha(date:Date){

        let dd = date.getDate();
        let mm = date.getMonth() +1;
        let yyyy = date.getFullYear();
        return yyyy+'-'+mm+'-'+dd
    }
   ObtenerFecha(date:string){
        let values = date.split("-");
        let dia = values[2];
        let mes = values[1];
        let anio = values[0];
        return dia+"/"+mes+"/"+anio;


    }

}
