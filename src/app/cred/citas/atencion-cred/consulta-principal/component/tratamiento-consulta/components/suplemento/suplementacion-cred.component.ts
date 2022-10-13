import {Component, OnInit} from '@angular/core';
import {
    SuplementacionMicronutrientes
} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DatePipe} from "@angular/common";
import {
    SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {MessageService} from "primeng/api";
import {SuplementoComponent} from "../suplemento-modal/suplemento.component";
import {DialogService} from "primeng/dynamicdialog";
import {dato} from "../../../../../../models/data";

@Component({
    selector: 'app-suplementacion-cred',
    templateUrl: './suplementacion-cred.component.html',
    styleUrls: ['./suplementacion-cred.component.css'],
    providers: [DialogService],
})
export class SuplementacionCredComponent implements OnInit {

    isSuplementacion: boolean
    dni: string
    stateOptions: any[];
    expandir: boolean = true;
    listaMicronutrientes: SuplementacionMicronutrientes[] = []
    SF: SuplementacionMicronutrientes[] = []
    MNM: SuplementacionMicronutrientes[] = []
    vitaminaA: SuplementacionMicronutrientes[] = []
    suplementacionTerapeutica: SuplementacionMicronutrientes[] = []
    dataDocumento: dato
    edadMes: number;
    anio: number
    mes: number;
    dia: number;

    constructor(private servicio: SuplementacionesMicronutrientesService,
                private messageService: MessageService,
                public dialogService: DialogService) {
        this.dataDocumento = JSON.parse(localStorage.getItem('documento'))
        this.edadMes = this.dataDocumento.anio * 12 + this.dataDocumento.mes
        this.dni = this.dataDocumento.nroDocumento
        this.anio = this.dataDocumento.anio;
        this.mes = this.dataDocumento.mes;
        this.dia = this.dataDocumento.dia;
        this.stateOptions = [
            {label: 'SI', optionValue: true},
            {label: 'NO', optionValue: false}
        ];
    }
    ngOnInit(): void {
        this.getLista()
    }

    getLista() {
        this.servicio.getListaMicronutrientes(this.dni).toPromise()
            .then((result) => {
            this.listaMicronutrientes = result.object
            this.transform()})
            .catch((err) => {
            console.log(err)
        })
        this.servicio.getVitaminaA(this.dni).toPromise().then((result) => {
            this.vitaminaA = result.object;
            // console.log(this.vitaminaA)
            this.transformVitaA()
        })
        this.servicio.getListaSuplementacionAnemia(this.dni).toPromise().then((result) => {
            this.suplementacionTerapeutica = result.object;
            // console.log('tipo suplementacion',this.suplementacionTerapeutica)
            this.transformSA()
        })
    }
    transformSA() {
        this.suplementacionTerapeutica.forEach((element) => {
            element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
            element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
            element.codigosSis="99199.17"
            /* agregamos campo codHis */
        });
    }

    transformVitaA() {
        this.vitaminaA.forEach((element) => {
            element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
            element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
            element.codigosSis="99199.27"
        });
    }

    transform() {
        this.listaMicronutrientes.forEach((element) => {
            element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
            element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
            if(element.nombre=="SF")
                element.codigosSis='99199.17'
            else
                element.codigosSis="99199.19"
        });
        this.separacion()
    }

    separacion() {
        this.SF = this.listaMicronutrientes.filter(item => item.nombre === 'SF');
        // console.log('lista SF', this.SF);
        this.MNM = this.listaMicronutrientes.filter(item => item.nombre === 'MNM')
        // console.log('lista MMN', this.MNM);
    }

    agregarSuplementacion(suplementacion: SuplementacionMicronutrientes) {
        const ref = this.dialogService.open(SuplementoComponent, {
            data: {isSuplementacion: this.isSuplementacion, "suplementacion": suplementacion},
            header: `Agregar Suplementacion ${suplementacion.descripcion} Dosis numero (${suplementacion.dosis})`,
            width: "50%",
            contentStyle: {"max-height": "500px", overflow: "auto"},
            baseZIndex: 10000,
        });
        ref.onClose.subscribe((mensaje) => {
            if (mensaje == "agregado") {
                this.getLista();
                this.messageService.add({
                    severity: "success",
                    summary: "Exito",
                    detail: "suplementacion Registrada satisfactoriamente",
                });
            } else {
                // this.messageService.add({severity:'error', summary: 'warn', detail:'NO SE registro ninguna inmunizacion'});
            }
        });
    }

    contador: any = {
        sulfato: 0,
        micronutrientes: 0,
        vitaminaA: 0,
        terapeutico: 0
    };

    correspondeMes(mesPivot, suplemento) {
        if (mesPivot == this.edadMes) {
            this.contador[suplemento] += 1;
            return true;
        } else
            return false
    }


}
