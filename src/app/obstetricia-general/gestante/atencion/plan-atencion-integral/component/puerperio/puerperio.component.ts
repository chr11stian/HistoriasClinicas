import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioModalComponent} from "./puerperio-modal/puerperio-modal.component"
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css'],
    providers:[DialogService]
})
export class PuerperioComponent implements OnInit {

    puerperios: any[] = [];
    ref: DynamicDialogRef;
    idObstetricia: string;
    private dataPuerperio: any;

    constructor(
        private form: FormBuilder,
        private puerperioService: PuerperioInmediatoService,
        private dialog: DialogService,
        private obstetriciaService: ObstetriciaGeneralService
    ) {
        this.idObstetricia = this.obstetriciaService.idGestacion;
    }
    ngOnInit(): void {

        this.recuperar2();
    }

    openDialogPuerperio() {
        this.ref = this.dialog.open(PuerperioModalComponent, {
            header: "PUERPERIO",
            width: "70%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('datos de modal puerperio ', data)
            if (data !== undefined)
                this.puerperios.push(data);
        })
    }

    openDialogEditarPuerperio(row, index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(PuerperioModalComponent, {
            header: "PUERPERIOS",
            width: "70%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('datos de modal puerperio ', data)
            if(data!==undefined) {
                this.puerperios.splice(data.index, 1,data.row);
            };
        })
    }
    openDialogEditarPuerperio2(row, index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(PuerperioModalComponent, {
            header: "PUERPERIOS",
            width: "70%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('datos de modal puerperio ', data)
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
        this.puerperioService.addPuerperioService2(this.idObstetricia, req).subscribe(
            (resp) => {
                console.log(resp);
                console.log(req);
                // this.puerperios.push(req);
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

    recuperar2() {

        console.log(this.idObstetricia);
        this.puerperioService.getPuerperioService2(this.idObstetricia).subscribe((res: any) => {
            this.dataPuerperio = res.object;
            console.log(this.dataPuerperio.puerperioInmediato.length);
            if (this.dataPuerperio.puerperioInmediato.length === null || this.dataPuerperio.puerperioInmediato.length === 0) {
                console.log("debe ingresar un puerperio, NO SE ATENDIO HASTA EL MOMENTO");

            } else {
                let i: number = 0;
                while (i < this.dataPuerperio.puerperioInmediato.length) {
                    console.log("puerperio", i);
                    console.log("puerperio", this.dataPuerperio.puerperioInmediato[i]);
                    this.puerperios.push(this.dataPuerperio.puerperioInmediato[i]);
                    i++;
                }

            }

        });
    }
}
