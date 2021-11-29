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
    dataPesoEdad: any[]=[];
    constructor(
        private formBuilder: FormBuilder,
        public dialogService: DialogService,
        public obstetriciaService:ObstetriciaGeneralService,

        public atencionesService: AtencionesService
    ) {

        this.idObstetricia = this.obstetriciaService.idGestacion;

    }
    recuperarAtenciones() {
        console.log(this.idObstetricia);
        this.atencionesService.getAtencionService(this.idObstetricia).subscribe((res: any) => {
            this.dataAtenciones= res.object;
            console.log("Atenciones recuperadas:"  + res);
            if (this.dataAtenciones.length === null || this.dataAtenciones.length === 0) {
                console.log("debe INGRESAR AL MENOS UNA ATENCION");

            } else {
                let i: number = 0;
                while (i < this.dataAtenciones.length) {
                    console.log("atencion", i);
                    console.log("atencion", this.dataAtenciones[i]);
                    this.atenciones.push(this.dataAtenciones[i]);
                    i++;
                }
            }
        });
    }
    buildForm() {
        this.form = this.formBuilder.group({
            nroAtencion: ['', [Validators.required]],
            fechaAtencion: ['', [Validators.required]],
            edadGestacional: ['', [Validators.required]],
            pesoMadre: ['', [Validators.required]],
            evalNutricional: ['', [Validators.required]],
            temperatura: ['', [Validators.required]],
            presionArterial: ['', [Validators.required]],
            pulsoMaterno: ['', [Validators.required]],
            alturaUterinal: ['', [Validators.required]],
            situacion: ['', [Validators.required]],
            presentacion: ['', [Validators.required]],
            posicion: ['', [Validators.required]],
            fcf: ['', [Validators.required]],
            movFetal: ['', [Validators.required]],
            proteinaCualitativa: ['', [Validators.required]],
            edema: ['', [Validators.required]],
            reflejoOsteotendinoso: ['', [Validators.required]],
            fechaEcografia: ['', [Validators.required]],
            consejeriaIntegral: ['', [Validators.required]],
            indAcidoFolico: ['', [Validators.required]],
            indFierro: ['', [Validators.required]],
            indCalcio: ['', [Validators.required]],
            interconsulta: ['', [Validators.required]],
            planParto: ['', [Validators.required]],
            visitaDomiciliaria: ['', [Validators.required]],
            proximaCita: ['', [Validators.required]],
            responsableAtencion: ['', [Validators.required]],
            establecimientoAtencion: ['', [Validators.required]],
        })
    }
    // save(form: any) {
    //     this.isUpdate = false
    //     console.log('enviando datos...')
    //     console.log(form)
    //     console.log(form.value)
    //     this.data.push(form.value)
    //
    //     Swal.fire({
    //         icon: 'success',
    //         title: 'Agregado correctamente',
    //         text: '',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     })
    //     this.atencionGestanteDialog = false
    // }

    openNew() {
        this.isUpdate = false
        this.form.reset()
        this.form.get('nroAtencion').setValue('1')
        this.form.get('fechaAtencion').setValue('')
        this.form.get('edadGestacional').setValue('0')
        this.form.get('pesoMadre').setValue('0')
        this.form.get('evalNutricional').setValue('')
        this.form.get('temperatura').setValue('0')
        this.form.get('presionArterial').setValue('')
        this.form.get('pulsoMaterno').setValue('')
        this.form.get('alturaUterinal').setValue('0')
        this.form.get('situacion').setValue('')
        this.form.get('presentacion').setValue('')
        this.form.get('posicion').setValue('')
        this.form.get('fcf').setValue('')
        this.form.get('movFetal').setValue('')
        this.form.get('proteinaCualitativa').setValue('')
        this.form.get('edema').setValue('')
        this.form.get('reflejoOsteotendinoso').setValue('')
        this.form.get('fechaEcografia').setValue('')
        this.form.get('consejeriaIntegral').setValue('')
        this.form.get('indAcidoFolico').setValue('')
        this.form.get('indFierro').setValue('')
        this.form.get('indCalcio').setValue('')
        this.form.get('interconsulta').setValue('')
        this.form.get('proximaCita').setValue('')
        this.form.get('visitaDomiciliaria').setValue('')
        this.form.get('responsableAtencion').setValue('')
        this.form.get('establecimientoAtencion').setValue('')
        this.atencionGestanteDialog = true
    }
    editar(rowData) {
        this.isUpdate = true
        this.form.get('fechaAtencion').setValue(rowData.fechaAtencion)
        this.form.get('edadGestacional').setValue(rowData.edadGestacional)
        this.form.get('pesoMadre').setValue(rowData.pesoMadre)
        this.form.get('evalNutricional').setValue(rowData.evalNutricional)
        this.form.get('temperatura').setValue(rowData.temperatura)
        this.form.get('presionArterial').setValue(rowData.presionArterial)
        this.form.get('pulsoMaterno').setValue(rowData.pulsoMaterno)
        this.form.get('alturaUterinal').setValue(rowData.alturaUterinal)
        this.form.get('situacion').setValue(rowData.situacion)
        this.form.get('presentacion').setValue(rowData.presentacion)
        this.form.get('posicion').setValue(rowData.posicion)
        this.form.get('fcf').setValue(rowData.fcf)
        this.form.get('movFetal').setValue(rowData.movFetal)
        this.form.get('proteinaCualitativa').setValue(rowData.proteinaCualitativa)
        this.form.get('edema').setValue(rowData.edema)
        this.form.get('reflejoOsteotendinoso').setValue(rowData.reflejoOsteotendinoso)
        this.form.get('fechaEcografia').setValue(rowData.fechaEcografia)
        this.form.get('consejeriaIntegral').setValue(rowData.consejeriaIntegral)
        this.form.get('indAcidoFolico').setValue(rowData.indAcidoFolico)
        this.form.get('indFierro').setValue(rowData.indFierro)
        this.form.get('indCalcio').setValue(rowData.indCalcio)
        this.form.get('interconsulta').setValue(rowData.interconsulta)
        this.form.get('proximaCita').setValue(rowData.proximaCita)
        this.form.get('visitaDomiciliaria').setValue(rowData.visitaDomiciliaria),
        this.form.get('responsableAtencion').setValue(rowData.responsableAtencion)
        this.form.get('responsableAtencion').setValue(rowData.responsableAtencion)
        this.form.get('establecimientoAtencion').setValue(rowData.establecimientoAtencion)
        this.isUpdate = rowData.id
        this.atencionGestanteDialog = true
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

        let titleModal = ''
        switch (tipoGrafico) {
            case 'normal':
                titleModal = 'Peso Normal (IMC Pre-gestacional 18.5 a 24.9 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
            case 'sobrepeso':
                titleModal = 'Sobrepeso (IMC Pre-gestacional 25.0 a 29.9 kg/m2) / Embarazo único y múltiple - Ganancia de peso'
                break
            case 'bajo_peso':
                titleModal = 'Pajo Peso (IMC Pre-gestacional <18.5 kg/m2 ) / Embarazo único - Ganancia de peso'
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

    // valorTipoSituacion(valor) {
    //     for (let i = 0; i < this.situacionList.length; i++) {
    //         if (valor === this.situacionList[i].value) return this.situacionList[i].label
    //     }
    // }
    //
    // valorTipoPresentacion(valor) {
    //     for (let i = 0; i < this.presentacionList.length; i++) {
    //         if (valor === this.presentacionList[i].value) return this.presentacionList[i].label
    //     }
    // }
    //
    // valorTipoPosicion(valor) {
    //     for (let i = 0; i < this.posicionList.length; i++) {
    //         if (valor === this.posicionList[i].value) return this.posicionList[i].label
    //     }
    // }
    //
    // valorTipomovFetal(valor) {
    //     for (let i = 0; i < this.movFetalList.length; i++) {
    //         if (valor === this.movFetalList[i].value) return this.movFetalList[i].label
    //     }
    // }
    //
    // valorproteiCualitativa(valor) {
    //     for (let i = 0; i < this.protcualitList.length; i++) {
    //         if (valor === this.protcualitList[i].value) return this.protcualitList[i].label
    //     }
    // }
    //
    // valorEdema(valor) {
    //     for (let i = 0; i < this.edemaList.length; i++) {
    //         if (valor === this.edemaList[i].value) return this.edemaList[i].label
    //     }
    // }
    //
    // valorReflejoO(valor) {
    //     for (let i = 0; i < this.reflejoOsteotendinosoList.length; i++) {
    //         if (valor === this.reflejoOsteotendinosoList[i].value) return this.reflejoOsteotendinosoList[i].label
    //     }
    // }
    //
    // valorInterconsultas(valor) {
    //     for (let i = 0; i < this.interconsultaList.length; i++) {
    //         if (valor === this.interconsultaList[i].value) return this.interconsultaList[i].label
    //     }
    // }
    //
    // valorPlanParto(valor) {
    //     for (let i = 0; i < this.planPartoList.length; i++) {
    //         if (valor === this.planPartoList[i].value) return this.planPartoList[i].label
    //     }
    // }
    //
    // valorVisitaDomiciliaria(valor) {
    //     for (let i = 0; i < this.visitaDomiciliariaList.length; i++) {
    //         if (valor === this.visitaDomiciliariaList[i].value) return this.visitaDomiciliariaList[i].label
    //     }
    // }

    ngOnInit(): void {
        this.recuperarAtenciones();
    }
}

