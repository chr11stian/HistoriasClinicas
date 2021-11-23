import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioModalComponent} from "../puerperio-modal/puerperio-modal.component"
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";

import Swal from "sweetalert2";
import {DialogConsultaComponent} from "../../../../../consultas-general/dialog-consulta/dialog-consulta.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css'],
    providers:[DialogService]
})
export class PuerperioComponent implements OnInit {

    formPurperio: FormGroup;
    dataPuerperio: any[] = [];
    consultaPuerperio: boolean;
    isUpdate:boolean=false;
    idUpdate: string="";


    constructor(
        private form: FormBuilder,
        private puerperioService:PuerperioInmediatoService,
        private dialog: DialogService
    ) {
        this.buildForm();
    }

    ngOnInit(): void {

    }
    // getPuerperioPorDoc(){
    //
    //     let TipoDoc="DNI";
    //     let nroDoc="10101010"
    //     this.puerperioService.getPuerperioService(TipoDoc,nroDoc).subscribe((res: any) => {
    //         this.dataPuerperio = res.object
    //         console.log('puerperio: ', this.dataPuerperio)
    //    });
    // }
    saveForm() {
        this.isUpdate = false;
        const req = {
            fechaAtencion: this.formPurperio.value.fechaAtencion,
            horasDias:this.formPurperio.value.horasDias,
            pulso:this.formPurperio.value.pulso,
            involucionUterina:this.formPurperio.value.involucionUterina,
            heridaOperacion:this.formPurperio.value.heridaOperacion,
            observaciones:this.formPurperio.value.observaciones,
        }
        if (req.fechaAtencion.trim() !== "") {
            this.puerperioService.createPuerperioService(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })

                    this.consultaPuerperio = false;
                }
            )
        }
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
}
