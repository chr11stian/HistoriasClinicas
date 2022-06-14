import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LabSolicitudComponent} from "./lab-solicitud/lab-solicitud.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-laboratorio',
    templateUrl: './laboratorio.component.html',
    styleUrls: ['./laboratorio.component.css'],
    providers: [DialogService]
})
export class LaboratorioComponent implements OnInit {
    ref: DynamicDialogRef;

    constructor(public dialog: DialogService,
                private form: FormBuilder) {
    }

    ngOnInit(): void {

    }

    openDialogSolicitud() {
        this.ref = this.dialog.open(LabSolicitudComponent, {
            header: "SOLICITUD DE EXAMENES DE LABORATORIO",
            width: "60%",
            height: "90%",
            // contentStyle: {
            //     "max-height": "92%",
            //     overflow: "auto",
            // },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            // if (data !== undefined) this.recuperarIntervalos();
        })
    }

}
