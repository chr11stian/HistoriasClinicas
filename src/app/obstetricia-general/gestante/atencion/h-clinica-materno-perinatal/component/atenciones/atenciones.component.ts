import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {PesoEmbarazoUnicoMultipleComponent} from '../../../modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component'
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {AtencionesService} from "../../services/atenciones/Atenciones.service";
import {ModalAtencionesComponent} from "./modal-atenciones/modal-atenciones.component";
import {MessageService} from "primeng/api";
import {AlturaUterinaComponent} from "../../../modals/altura-uterina/altura-uterina.component";

@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css'],
    providers: [DialogService]

})
export class AtencionesComponent implements OnInit {

    form: FormGroup
    atenciones: any[] = [];
    datosGrafico: any[] = [];
    datosGraficoAltura: any[] = [];
    datosGraficoY: any[] = [];

    // isUpdate: boolean = false;
    /**Datos del modal atenciones***/
    atencionGestanteDialog: boolean;
    ref: DynamicDialogRef;
    /**Datos a recuperar de la coleccion filiacion**/
    idObstetricia = "";

    cols: any[];
    Gestacion: any;

    constructor(
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        private messageService: MessageService,
        private obstetriciaService: ObstetriciaGeneralService,
        private atencionesService: AtencionesService
    ) {
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));

        // this.idObstetricia = this.obstetriciaService.idGestacion;
        if (this.Gestacion == null) {
            this.idObstetricia = JSON.parse(localStorage.getItem('idGestacionRegistro'));
        } else {
            this.idObstetricia = this.Gestacion.id;
        }
    }

    buildForm() {
        this.form = this.formBuilder.group({})
    }

    /***************Recuperar Datos de Atenciones*********************/
    recuperarDatosAtenciones() {
        this.atencionesService.getAtencionService(this.idObstetricia).subscribe((res: any) => {
            this.atenciones = res.object;
            console.log("atenciones", this.atenciones);
            if (this.atenciones != null || this.atenciones != undefined) {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Recuperado',
                    detail: 'registro recuperado satisfactoriamente'
                });
            } else {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Recuperado',
                    detail: 'no existe registro atenciones'
                });
            }

        })
    }

    /*********Recuperar Datos  para el gráfico Peso Madre*************/
    recuperarDatosGraficoPesoMadre() {
        this.atencionesService.getDatosGrafico(this.idObstetricia).subscribe((res: any) => {
            this.datosGrafico = res.obj;
            console.log(this.datosGrafico);
        })
    }

    /*********Recuperar Datos  para el gráfico Peso Madre*************/
    recuperarDatosGraficoAlturaUterina() {
        this.atencionesService.getDatosGraficoAlturaUterina(this.idObstetricia).subscribe((res: any) => {
            let tamanio = res.object.length;
            let i = 0;
            while (i < tamanio) {
                this.datosGraficoAltura.push([res.object[i].edadGestacional, res.object[i].alturaUterina]);
                // this.datosGraficoY.push(res.object[i].alturaUterina)
                i++;
            }

        })

    }

    /****abrir modal que muestre las atenciones de la paciente  gestante*****/
    openDialogMostrarAtenciones(row, index) {
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialogService.open(ModalAtencionesComponent, {
            header: "ATENCIONES",
            width: "70%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('datos de modal atenciones ', data)
            if (data !== undefined) {
                this.atenciones.splice(data.index, 1, data.row);
            }
            ;
        })
    }

    // /** grafica segun el tipo de grafico que se le manda tipoGrafico -> opciones: sobrepeso | normal | bajo_peso | obesidad */
    graficar(tipoGrafico: string) {
        tipoGrafico = 'sobrepeso'
        let titleModal = ''
        switch (tipoGrafico) {
            case 'normal':
                titleModal = 'Peso Normal (IMC Pre-gestacional 18.5 a 24.9 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
            case 'sobrepeso':
                titleModal = 'Sobrepeso (IMC Pre-gestacional 25.0 a 29.9 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
            case 'bajo_peso':
                titleModal = 'Bajo Peso (IMC Pre-gestacional <18.5 kg/m2 ) / Embarazo único - Ganancia de peso'
                break
            case 'obesidad':
                titleModal = 'Obesidad (IMC Pre-gestacional = 30.0 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
        }
        /* data  tipo de dato:Array<number[]>; ejemplo: [[semana,peso],...] ejmpl2: [[1,1.45],[2,1.46]]*/
        this.openModal([], tipoGrafico, titleModal)
        //** peso - edad gestacional*/
    }

    openModal(data: Array<number[]>, tipoGrafico: string, titleModal: string): void {
        this.ref = this.dialogService.open(PesoEmbarazoUnicoMultipleComponent, {
            data: {
                typeGraph: tipoGrafico,
                dataPregmant: data
            },
            header: titleModal,
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

    /************+****grafico grafico Altura uterina********************/
    graficarAltura() {
        let titleModal = 'Grafico Altura Uterina';
        this.openModalGraficoAltura(this.datosGraficoAltura, titleModal);

    }

    openModalGraficoAltura(data: Array<number[]>, titleModal: string): void {
        this.ref = this.dialogService.open(AlturaUterinaComponent, {
            data: {
                dataPregmant: data
            },
            header: titleModal,
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

    ///******************************************/
    ngOnInit(): void {
        this.recuperarDatosAtenciones();
        this.recuperarDatosGraficoAlturaUterina();
        // this.recuperarDatosGraficoPesoMadre();
    }

    openNew() {

    }

}
