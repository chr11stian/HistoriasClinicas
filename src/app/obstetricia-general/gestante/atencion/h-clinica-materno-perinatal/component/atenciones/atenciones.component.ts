import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
import Swal from 'sweetalert2'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {PesoEmbarazoUnicoMultipleComponent} from '../../../modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component'
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {AtencionesService} from "../../services/atenciones/Atenciones.service";
import {ModalAtencionesComponent} from "./modal-atenciones/modal-atenciones.component";

@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css'],
    providers: [DialogService]

})
export class AtencionesComponent implements OnInit {
    form: FormGroup
    atenciones: any[] = []
    edadPeso: any[] = []
    isUpdate: boolean = false
    atencionGestanteDialog: boolean
    datos
    ref: DynamicDialogRef
    idObstetricia = "";

    constructor(
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        private obstetriciaService:ObstetriciaGeneralService,
        private atencionesService: AtencionesService
    ) {

        this.idObstetricia = this.obstetriciaService.idGestacion;
    }
    buildForm() {
        this.form = this.formBuilder.group({

        })
    }

    recuperarDatosAtenciones(){
        this.atencionesService.getAtencionService(this.idObstetricia).subscribe((res:any)=>{
            this.atenciones = res.object;
            console.log(this.atenciones);
        })
    }
    openDialogAtenciones(){
        this.ref = this.dialogService.open(ModalAtencionesComponent, {
            header: "ATENCIONES",
            width: "70%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('datos de modal atenciones ', data)
            if (data !== undefined)
                this.atenciones.push(data);
        })
    }
    /*abrir modal que muestre las atenciones de la paciente  gestante*/
    openDialogMostrarAtenciones(row,index){
        let aux={
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
            if(data!==undefined) {
                this.atenciones.splice(data.index, 1,data.row);
            };
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
    ngOnInit(): void {
        this.recuperarDatosAtenciones();
    }

    openNew() {

    }

}
