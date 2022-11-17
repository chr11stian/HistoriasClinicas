import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { PesoEmbarazoUnicoMultipleComponent } from '../../../modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component'
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { AtencionesService } from "../../services/atenciones/Atenciones.service";
import { ModalAtencionesComponent } from "./modal-atenciones/modal-atenciones.component";
import { MessageService } from "primeng/api";
import { AlturaUterinaComponent } from "../../../modals/altura-uterina/altura-uterina.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css'],
    providers: [DialogService]

})
export class AtencionesComponent implements OnInit {

    form: FormGroup
    listaAtenciones: any[] = [];
    datosGraficoPesoMadre: any[] = [];
    datosGraficoAlturaUterina: any[] = [];
    datosGraficoY: any[] = [];

    // isUpdate: boolean = false;
    /**Datos del modal atenciones***/
    atencionGestanteDialog: boolean;
    ref: DynamicDialogRef;
    /**Datos a recuperar de la coleccion filiacion**/
    idFiliacion = "";

    cols: any[];
    Gestacion: any;
    estadoGestante: string;

    constructor(
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        private messageService: MessageService,
        private obstetriciaService: ObstetriciaGeneralService,
        private atencionesService: AtencionesService,
        private router: Router,
    ) {
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));

        // this.idObstetricia = this.obstetriciaService.idGestacion;
        if (this.Gestacion == null) {
            this.idFiliacion = JSON.parse(localStorage.getItem('idGestacionRegistro'));
        } else {
            this.idFiliacion = this.Gestacion.id;
        }
    }
    ngOnInit(): void {
        this.getAtencionesDeFiliacion();
        this.recuperarIMC();
    }
    /***************Recuperar Datos de Atenciones*********************/
    getAtencionesDeFiliacion() {
        this.atencionesService.getAtencionService(this.idFiliacion).toPromise().then((res: any) => {
            if (res.object != null) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro',
                    text: res.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.listaAtenciones = res.object;
                this.recuperarDatosGraficoPesoMadre();
                this.recuperarDatosGraficoAlturaUterina();
            }
        })
            .catch(error => {
                console.log(error);
            })
    }
    recuperarIMC() {
        this.atencionesService.getIMCgestante(this.Gestacion.nroHcl, this.Gestacion.nroEmbarazo).subscribe((res: any) => {
            let IMC = res.object.imc;
            if (IMC < 18.5)
                this.estadoGestante = "bajo_peso"
            else if (IMC < 24.9)
                this.estadoGestante = "normal"
            else if (IMC < 29.9)
                this.estadoGestante = "sobrepeso"
            else
                this.estadoGestante = "obesidad"
        })
    }


    /*********Recuperar Datos  para el gráfico Peso Madre*************/
    recuperarDatosGraficoPesoMadre() {
        this.listaAtenciones.forEach((item) => {
            if (item.edadGestacionalSemanas && item.evaluacionNutricional && item.evaluacionNutricional) {
                this.datosGraficoPesoMadre.push([item.edadGestacionalSemanas, item.evaluacionNutricional.valor]);
            }
        })
    }

    /*********Recuperar Datos  para el gráfico Altura uterina Madre*************/
    recuperarDatosGraficoAlturaUterina() {
        this.listaAtenciones.forEach((item) => {
            if (item.edadGestacionalSemanas && item.evaluacionNutricional && item.evaluacionNutricional) {
                this.datosGraficoAlturaUterina.push([item.edadGestacionalSemanas, item.alturaUterina]);
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
            if (data !== undefined) {
                this.listaAtenciones.splice(data.index, 1, data.row);
            }
            ;
        })
    }

    // /** grafica segun el tipo de grafico que se le manda tipoGrafico -> opciones: sobrepeso | normal | bajo_peso | obesidad */
    graficarPesoMadre() {
        let tipoGrafico = this.estadoGestante
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
                titleModal = 'Obesidad (IMC Pre-gestacional >= 30.0 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
        }
        /* data  tipo de dato:Array<number[]>; ejemplo: [[semana,peso],...] ejmpl2: [[1,1.45],[2,1.46]]*/
        console.log('peso madre', this.datosGraficoPesoMadre);
        const arreglo = [[1, 1], [7, 0.7], [13, 1.3], [20, 2.7], [26, 4], [34, 5.3], [40, 7]]
        console.log('ganancia', this.datosGraficoPesoMadre);

        this.ref = this.dialogService.open(PesoEmbarazoUnicoMultipleComponent, {
            data: {
                typeGraph: tipoGrafico,
                dataPregmant: this.datosGraficoPesoMadre
                // dataPregmant: arreglo,
            },
            header: titleModal,
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }
    /************+****grafico grafico Altura uterina********************/
    graficarAlturaUterina() {
        let titleModal = 'Grafico Altura Uterina';
        this.ref = this.dialogService.open(AlturaUterinaComponent, {
            data: {
                dataPregmant: this.datosGraficoAlturaUterina
            },
            header: titleModal,
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })

    }

    backPregmantMenu(): void {
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia']);
    }
}
