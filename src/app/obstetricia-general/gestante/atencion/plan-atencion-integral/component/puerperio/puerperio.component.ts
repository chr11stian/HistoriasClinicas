import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioModalComponent} from "../puerperio-modal/puerperio-modal.component"
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";
import Swal from "sweetalert2";
import {DialogConsultaComponent} from "../../../../../consultas-general/dialog-consulta/dialog-consulta.component";
import {DialogService} from "primeng/dynamicdialog";
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css'],
    providers:[DialogService]
})
export class PuerperioComponent implements OnInit {
    id: any;
    formPurperio: FormGroup;
    dataPuerperio: any;
    // puerperioInmediato: any[]=[];
    consultaPuerperio: boolean;
    isUpdate: boolean = false;
    idUpdate: string = "";
    cantidadPuerperios: any;

    constructor(
        private form: FormBuilder,
        private puerperioService: PuerperioInmediatoService,
        private dialog: DialogService,
        private filiancionService: FiliancionService,
        private obstetriciaService:ObstetriciaGeneralService
    ) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.id = this.obstetriciaService.id;
        console.log(this.id);
        this.recuperarPuerperio();
    }
    obtenerPuerperio(){
        this.puerperioService.getPuerperioService2(this.id).subscribe((res: any) => {
            this.dataPuerperio = res.object
            console.log('puerperio por id: ', this.dataPuerperio)
            this.formPurperio.get('')
        });
    }
    recuperarPuerperio() {
         this.dataPuerperio = {
             puerperioInmediato: [
                 {
                     fechaAtencion:this.formPurperio.value.fechaAtencion,
                     horasDiasPostPartoAborto:this.formPurperio.value.horasDias,
                     temperatura: this.formPurperio.value.temperatura,
                     pulso:this.formPurperio.value.temperatura,
                     presionArterialMaxima:this.formPurperio.value.presionArterialMaxima,
                     involucionArterialMaxima:this.formPurperio.value.involucionUterina,
                     caracteristicasLoquios:this.formPurperio.value.caracteristicasLoquios,
                     heridaOperacion:this.formPurperio.value.heridaOperacion,
                     observaciones:this.formPurperio.value.observaciones
                 }
             ],
             proceso : "puerperio"
         }
    }
    guardarPuerperio(){
        this.recuperarPuerperio();
        console.log('Datos a guardar en puerperio: ', this.dataPuerperio);
    }
    saveForm() {
        this.id = this.obstetriciaService.id;
        // let tipoDoc = "DNI";
        // let nroDoc = "24015415";
        this.isUpdate = false;

        const req = {
                puerperioInmediato: [
                    {
                        fechaAtencion:this.formPurperio.value.fechaAtencion,
                        horasDiasPostPartoAborto: this.formPurperio.value.horasDiasPostPartoAborto,
                        temperatura: this.formPurperio.value.temperatura,
                        pulso:this.formPurperio.value.temperatura,
                        presionArterialMaxima:this.formPurperio.value.presionArterialMaxima,
                        involucionUterina:this.formPurperio.value.involucionUterina,
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
           this.dataPuerperio = res.object
            console.log('puerperio:', this.dataPuerperio);
       });
   }
    openNew(){
        this.consultaPuerperio=true;
    }
    openModalPuerperio() {
        let dialog = this.dialog.open(PuerperioModalComponent, {
            header: "AGREGAR PUERPERIO",
            width:"60%",
            height:"50%",
            data:{
                texto:'datos'
            }
        })

    }

    buildForm() {
        this.formPurperio = this.form.group({
          fechaAtencion:new FormControl("", [Validators.required]),
          horasDias: new FormControl("", [Validators.required]),
          temperatura: new FormControl("", [Validators.required]),
          pulso: new FormControl("", [Validators.required]),
          presionArterial: new FormControl("", [Validators.required]),
          involucionUterina: new FormControl("", [Validators.required]),
          heridaOperacion: new FormControl("", [Validators.required]),
          caracteristicasLoquios: new FormControl("", [Validators.required]),
          observaciones: new FormControl("", [Validators.required]),
        });
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })

    }
    getFechaHora(date:Date){
        // let fecha=a.toLocaleDateString();
        if(date.toString()!==''){
            let hora=date.toLocaleTimeString();
            // return fecha+' '+hora;
            let dd = date.getDate();
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy+'-'+mm+'-'+dd+' '+hora
        }
        else{
            return '';
        }
    }
    getFecha(date:Date){
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!
        let yyyy = date.getFullYear();
        return yyyy+'-'+mm+'-'+dd+' '
    }
}
