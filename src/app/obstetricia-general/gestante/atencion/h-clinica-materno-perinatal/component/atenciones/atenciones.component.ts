import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
import Swal from 'sweetalert2'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {PesoEmbarazoUnicoMultipleComponent} from '../../../modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component'
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {AtencionesService} from "../../services/atenciones/Atenciones.service";


@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css'],
    providers: [DialogService]

})
export class AtencionesComponent implements OnInit {
    form: FormGroup
    data: any[] = []
    edadPeso: any[] = []
    isUpdate: boolean = false
    atencionGestanteDialog: boolean
    datos
    ref: DynamicDialogRef
    idObstetricia = "";
    dataAtenciones:any[] = [];
    atenciones:any[] = [];
    constructor(
        private formBuilder: FormBuilder,
        public dialogService: DialogService,
        public obstetriciaService:ObstetriciaGeneralService,

        public atencionesService: AtencionesService
    ) {

        this.idObstetricia = this.obstetriciaService.idGestacion;

    }
    // recuperarAtenciones() {
    //     console.log(this.idObstetricia);
    //     this.atencionesService.getAtencionService(this.idObstetricia).subscribe((res: any) => {
    //         this.dataAtenciones= res.object;
    //         console.log("Atenciones recuperadas:"  + res);
    //         if (this.dataAtenciones.length === null || this.dataAtenciones.length === 0) {
    //             console.log("debe INGRESAR AL MENOS UNA ATENCION");
    //
    //         } else {
    //             let i: number = 0;
    //             while (i < this.dataAtenciones.length) {
    //                 console.log("atencion", i);
    //                 console.log("atencion", this.dataAtenciones[i]);
    //                 this.atenciones.push(this.dataAtenciones[i]);
    //                 i++;
    //             }
    //         }
    //     });
    // }
    buildForm() {
        this.form = this.formBuilder.group({
            nroAtencion: new FormControl(),
            fechaAtencion: new FormControl(),
            edadGestacional: new FormControl(),
            pesoMadre: new FormControl(),
            evalNutricional: new FormControl(),
            temperatura: new FormControl(),
            presionArterial: new FormControl(),
            pulsoMaterno: new FormControl(),
            alturaUterinal: new FormControl(),
            situacion: new FormControl(),
            presentacion: new FormControl(),
            posicion: new FormControl(),
            fcf: new FormControl(),
            movFetal: new FormControl(),
            proteinaCualitativa: new FormControl(),
            edema: new FormControl(),
            reflejoOsteotendinoso: new FormControl(),
            fechaEcografia: new FormControl(),
            consejeriaIntegral: new FormControl(),
            indAcidoFolico: new FormControl(),
            indFierro: new FormControl(),
            indCalcio: new FormControl(),
            interconsulta: new FormControl(),
            planParto: new FormControl(),
            visitaDomiciliaria: new FormControl(),
            proximaCita: new FormControl(),
            responsableAtencion: new FormControl(),
            establecimientoAtencion: new FormControl(),
        })
    }
    save(form: any) {
        this.isUpdate = false
        console.log('enviando datos...')
        console.log(form)
        console.log(form.value)
        this.data.push(form.value)

        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.atencionGestanteDialog = false
    }

    openNew() {
        this.isUpdate = false
        // this.form.reset()
        // this.form.get('nroAtencion').setValue('')
        // this.form.get('fechaAtencion').setValue('')
        // this.form.get('edadGestacional').setValue('')
        // this.form.get('pesoMadre').setValue('')
        // this.form.get('evalNutricional').setValue('')
        // this.form.get('temperatura').setValue('')
        // this.form.get('presionArterial').setValue('')
        // this.form.get('pulsoMaterno').setValue('')
        // this.form.get('alturaUterinal').setValue('')
        // this.form.get('situacion').setValue('')
        // this.form.get('presentacion').setValue('')
        // this.form.get('posicion').setValue('')
        // this.form.get('fcf').setValue('')
        // this.form.get('movFetal').setValue('')
        // this.form.get('proteinaCualitativa').setValue('')
        // this.form.get('edema').setValue('')
        // this.form.get('reflejoOsteotendinoso').setValue('')
        // this.form.get('fechaEcografia').setValue('')
        // this.form.get('consejeriaIntegral').setValue('')
        // this.form.get('indAcidoFolico').setValue('')
        // this.form.get('indFierro').setValue('')
        // this.form.get('indCalcio').setValue('')
        // this.form.get('interconsulta').setValue('')
        // this.form.get('proximaCita').setValue('')
        // this.form.get('visitaDomiciliaria').setValue('')
        // this.form.get('responsableAtencion').setValue('')
        // this.form.get('establecimientoAtencion').setValue('')
        this.atencionGestanteDialog = true
    }
    editar(rowData) {
        // this.isUpdate = true
        // this.form.get('fechaAtencion').setValue(rowData.fechaAtencion)
        // this.form.get('edadGestacional').setValue(rowData.edadGestacional)
        // this.form.get('pesoMadre').setValue(rowData.pesoMadre)
        // this.form.get('evalNutricional').setValue(rowData.evalNutricional)
        // this.form.get('temperatura').setValue(rowData.temperatura)
        // this.form.get('presionArterial').setValue(rowData.presionArterial)
        // this.form.get('pulsoMaterno').setValue(rowData.pulsoMaterno)
        // this.form.get('alturaUterinal').setValue(rowData.alturaUterinal)
        // this.form.get('situacion').setValue(rowData.situacion)
        // this.form.get('presentacion').setValue(rowData.presentacion)
        // this.form.get('posicion').setValue(rowData.posicion)
        // this.form.get('fcf').setValue(rowData.fcf)
        // this.form.get('movFetal').setValue(rowData.movFetal)
        // this.form.get('proteinaCualitativa').setValue(rowData.proteinaCualitativa)
        // this.form.get('edema').setValue(rowData.edema)
        // this.form.get('reflejoOsteotendinoso').setValue(rowData.reflejoOsteotendinoso)
        // this.form.get('fechaEcografia').setValue(rowData.fechaEcografia)
        // this.form.get('consejeriaIntegral').setValue(rowData.consejeriaIntegral)
        // this.form.get('indAcidoFolico').setValue(rowData.indAcidoFolico)
        // this.form.get('indFierro').setValue(rowData.indFierro)
        // this.form.get('indCalcio').setValue(rowData.indCalcio)
        // this.form.get('interconsulta').setValue(rowData.interconsulta)
        // this.form.get('proximaCita').setValue(rowData.proximaCita)
        // this.form.get('visitaDomiciliaria').setValue(rowData.visitaDomiciliaria),
        // this.form.get('responsableAtencion').setValue(rowData.responsableAtencion)
        // this.form.get('responsableAtencion').setValue(rowData.responsableAtencion)
        // this.form.get('establecimientoAtencion').setValue(rowData.establecimientoAtencion)
        // this.isUpdate = rowData.id
        // this.atencionGestanteDialog = true
    }
    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.atencionGestanteDialog = false
    }
    titulo() {
        if (this.isUpdate) return 'EDITE ATENCION PRENATAL'
        else return 'NUEVA ATENCION PRENATAL'
    }
    recuperarPesoEdad(){

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
        // this.recuperarAtenciones();
    }
}
