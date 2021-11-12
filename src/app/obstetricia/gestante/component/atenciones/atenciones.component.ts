import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DialogAtencionComponent} from "../atenciones/dialog-atencion/dialog-atencion.component";
import {debounceTime} from "rxjs/operators";
import {AtencionesService} from "../../services/atenciones/Atenciones.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css'],
    providers: [DialogService],
})
export class AtencionesComponent implements OnInit {
    data: any[] = [];
    isUpdate: boolean = false;

    // /* ---  listas ---*/
    situacionList: any[];
    presentacionList: any[];
    posicionList: any[];
    movFetalList: any[];
    protcualitList: any[];
    edemaList: any[];
    reflejoOsteotendinosoList: any[];
    interconsultaList: any[];
    planPartoList: any[];
    visitaDomiciliariaList: any[];

    constructor(
        private atencionService: AtencionesService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.getAtencion();

    }

    ngOnInit(): void {
    }
    valorTipoSituacion(valor) {
        for (let i = 0; i < this.situacionList.length; i++) {
            if (valor === this.situacionList[i].value) return this.situacionList[i].label;
        }
    }

    valorTipoPresentacion(valor) {
        for (let i = 0; i < this.presentacionList.length; i++) {
            if (valor === this.presentacionList[i].value) return this.presentacionList[i].label;
        }
    }

    valorTipoPosicion(valor) {
        for (let i = 0; i < this.posicionList.length; i++) {
            if (valor === this.posicionList[i].value) return this.posicionList[i].label;
        }
    }

    valorTipomovFetal(valor) {
        for (let i = 0; i < this.movFetalList.length; i++) {
            if (valor === this.movFetalList[i].value) return this.movFetalList[i].label;
        }
    }

    valorproteiCualitativa(valor) {
        for (let i = 0; i < this.protcualitList.length; i++) {
            if (valor === this.protcualitList[i].value) return this.protcualitList[i].label;
        }
    }

    valorEdema(valor) {
        for (let i = 0; i < this.edemaList.length; i++) {
            if (valor === this.edemaList[i].value) return this.edemaList[i].label;
        }
    }

    valorReflejoO(valor) {
        for (let i = 0; i < this.reflejoOsteotendinosoList.length; i++) {
            if (valor === this.reflejoOsteotendinosoList[i].value) return this.reflejoOsteotendinosoList[i].label;
        }
    }

    valorInterconsultas(valor) {
        for (let i = 0; i < this.interconsultaList.length; i++) {
            if (valor === this.interconsultaList[i].value) return this.interconsultaList[i].label;
        }
    }

    valorPlanParto(valor) {
        for (let i = 0; i < this.planPartoList.length; i++) {
            if (valor === this.planPartoList[i].value) return this.planPartoList[i].label;
        }
    }

    valorVisitaDomiciliaria(valor) {
        for (let i = 0; i < this.visitaDomiciliariaList.length; i++) {
            if (valor === this.visitaDomiciliariaList[i].value) return this.visitaDomiciliariaList[i].label;
        }
    }
    getAtencion() {
        this.atencionService.getAtenciones().subscribe((resp: any) => {
            this.data = resp["object"];
        });
    }
    agregarActualizar(rowIndex?: any) {
        let id: string = "";
        let title: string = "AGREGAR NUEVA ATENCION";
        if (this.isUpdate) {
            id = this.data[rowIndex].id;
            title = "EDITAR ATENCION";
        }
        const ref = this.dialogService.open(DialogAtencionComponent, {
            data: {
                id: id,
            },
            header: title,
            width: "70%",
        });
        ref.onClose.subscribe((mensaje?: string) => {
            // console.log("mensaje:", mensaje);
            let detail: string = "Elemento agregado satisfactoriomente";
            let summary: string = "Agregado";
            if (mensaje === "actualizado") {
                detail = "Elemento Actualizado satisfactoriamente";
                summary = "Actualizado";
            }
            if (mensaje === "actualizado" || mensaje === "agregado") {
                this.getAtencion();
                this.messageService.add({
                    severity: "success",
                    summary: summary,
                    detail: detail,
                });
            }
        });
    }
}
