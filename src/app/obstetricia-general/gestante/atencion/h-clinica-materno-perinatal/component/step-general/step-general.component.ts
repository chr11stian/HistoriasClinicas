import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from "primeng/api"
import { AtencionesComponent } from '../atenciones/atenciones.component';
import { DatosBasalesComponent } from '../datos-basales/datos-basales.component';
import { DatosGeneralesFiliacionComponent } from '../datos-generales-filiacion/datos-generales-filiacion.component';
import { DatosGeneralesObtetriciaComponent } from '../filiacion-antecedentes/datos-generales-obtetricia.component';
import { PartosComponent } from '../partos/partos.component';
import { PuerperioComponent } from '../puerperio/puerperio.component';
import { RecienNacidoComponent } from '../recien-nacido/recien-nacido.component';

@Component({
    selector: 'app-step-general',
    templateUrl: './step-general.component.html',
    styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit {
    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = "datosgeneralesfiliacion";
    @ViewChild(DatosGeneralesFiliacionComponent) filiacion: DatosGeneralesFiliacionComponent;
    @ViewChild(DatosGeneralesObtetriciaComponent) antecedentes: DatosGeneralesObtetriciaComponent;
    @ViewChild(DatosBasalesComponent) datosBasales: DatosBasalesComponent;
    @ViewChild(AtencionesComponent) atenciones: AtencionesComponent;
    @ViewChild(PartosComponent) partos: PartosComponent;
    @ViewChild(RecienNacidoComponent) recienNacido: RecienNacidoComponent;
    @ViewChild(PuerperioComponent) puerperio: PuerperioComponent;

    constructor() {
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ]
    }


    ngOnInit(): void {
        this.items = [
            { label: "Filiación" },
            { label: "Antecedentes" },
            { label: "Datos Basales" },
            { label: "Atenciones" },
            { label: "Partos o Abortos" },
            { label: "Recien Nacidos" },
            { label: "Puerperio" },
        ]
    }

    name() {
        switch (this.indiceActivo) {
            case 6:
                this.stepName = "puerperio"
                break
            case 5:
                this.stepName = "nacidos"
                break
            case 4:
                this.stepName = "partos"
                break
            case 3:
                this.stepName = "atenciones"
                break
            case 2:
                this.stepName = "basales"
                break
            case 1:
                this.stepName = "antecedentes"
                break
            case 0:
                this.stepName = "datosgeneralesfiliacion"
                break
        }
        console.log(this.stepName);
    }

    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name()
        console.log("aaa", event);
    }

    nextPage() {
        switch (this.stepName) {
            case 'datosgeneralesfiliacion':
                this.filiacion.agrgarFiliacionDatoPersonales()
                this.stepName = 'antecedentes';
                this.indiceActivo = 1;
                break;
            case 'antecedentes':
                this.antecedentes.addData();
                this.stepName = 'basales';
                this.indiceActivo = 2;
                break;
            case 'basales':
                this.datosBasales.guardarDatos();
                this.stepName = 'atenciones';
                this.indiceActivo = 3;
                break;
            case 'atenciones':
                // this.antecedentes.addData();
                this.stepName = 'partos';
                this.indiceActivo = 4;
                break;
            case 'partos':
                this.partos.save();
                this.stepName = 'nacidos';
                this.indiceActivo = 5;
                break;
            case 'nacidos':
                this.recienNacido.guardarRecienNacidos();
                this.stepName = 'puerperio';
                this.indiceActivo = 6;
                break;
        }
    }
    prevPage() {
        switch (this.stepName) {
            case 'nacidos':
                this.stepName = 'partos';
                this.indiceActivo = 4;
                break;
            case 'partos':
                console.log('fi ', this.stepName)
                this.stepName = 'atenciones';
                this.indiceActivo = 3;
                break;
            case 'atenciones':
                this.stepName = 'basales';
                this.indiceActivo = 2;
                break;
            case 'basales':
                this.stepName = 'antecedentes';
                this.indiceActivo = 1;
                break;
            case 'antecedentes':
                this.stepName = 'datosgeneralesfiliacion';
                this.indiceActivo = 0;
                break;
        }
    }
}

interface data {
    name: string
    code: number
}
