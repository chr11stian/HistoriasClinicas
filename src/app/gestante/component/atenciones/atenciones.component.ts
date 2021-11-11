import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DialogAtencionComponent} from "./dialog-atencion/dialog-atencion.component"
import {debounceTime} from "rxjs/operators";


@Component({
    selector: 'app-atenciones',
    templateUrl: './atenciones.component.html',
    styleUrls: ['./atenciones.component.css']
})
export class AtencionesComponent implements OnInit {
    form: FormGroup;

    data: any[] = [];
    isUpdate: boolean = false;
    idUpdate: string = "";
    datafecha: any;

    /* ---  listas ---*/
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

    atencionGestanteDialog: boolean;

    nroAtencion: number;
    fechaAtencion: string;
    edadGestacional: number;
    pesoMadre: number;
    evalNutricional: string;
    temperatura: number;
    presionArterial: string;
    pulsoMaterno: string;
    alturaUterinal: number;
    situacion: string;
    presentacion: string;
    posicion: string;
    fcf: string;
    movFetal: string;
    proteinaCualitativa: string;
    edema: string;
    reflejoOsteotendinoso: string;
    fechaEcografia: string;
    consejeriaIntegral: string;
    indAcidoFolico: string;
    indFierro: string;
    indCalcio: string;
    interconsulta: string;
    planParto: string;
    visitaDomiciliaria: string;
    proximaCita: string;
    responsableAtencion: string;
    establecimientoAtencion: string;


    constructor(
        //private etniaservice: EtniaService,
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
        /*LLENADO DE LISSTAS- VALORES QUE PUEDEN TOMAR CIERTAS PROPIEDADES*/
        this.situacionList = [{label: 'Longitudinal', value: '1'},
            {label: 'Transversa', value: '2'},
            {label: 'No Aplica', value: '3'}];

        this.presentacionList = [{label: 'Cefálica', value: '1'},
            {label: 'Pélvica', value: '2'},
            {label: 'No Aplica', value: '3'}];

        this.posicionList = [{label: 'Derecha', value: '1'},
            {label: 'Izquierda', value: '2'},
            {label: 'No Aplica', value: '3'}];

        this.movFetalList = [{label: '+', value: '1'},
            {label: '++', value: '2'},
            {label: '+++', value: '3'},
            {label: 'Sin Movimiento', value: '4'},
            {label: 'No Aplica', value: '5'}];

        this.protcualitList = [{label: '+', value: '1'},
            {label: '++', value: '2'},
            {label: '+++', value: '3'},
            {label: 'No se hizo', value: '4'}];

        this.edemaList = [{label: '+', value: '1'},
            {label: '++', value: '2'},
            {label: '+++', value: '3'},
            {label: 'Sin Edema', value: '4'}];

        this.reflejoOsteotendinosoList = [{label: '0', value: '1'},
            {label: '+', value: '2'},
            {label: '++', value: '3'},
            {label: '+++', value: '4'}];

        this.interconsultaList = [{label: 'Psicologia', value: '1'},
            {label: 'Nutricion', value: '2'},
            {label: 'Odontologia', value: '3'},
            {label: 'Medicina', value: '4'},

        ];

        this.planPartoList = [{label: 'Control', value: '1'},
            {label: 'Visita', value: '2'},
            {label: 'No se hizo', value: '3'},
            {label: 'No Aplica', value: '4'}];

        this.visitaDomiciliariaList = [{label: 'Si', value: '1'},
            {label: 'No', value: '2'},
            {label: 'No Aplica', value: '3'}];

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
        });

    }


    save(form: any) {
        this.isUpdate = false;
        console.log("enviando datos...");
        console.log(form);
        console.log(form.value);
        this.data.push(form.value);

        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.atencionGestanteDialog = false;
        //  const req = {
        //    fechaAtencion: this.form.value.fechaAtencion,
        //    edadGestacional: this.form.value.edadGestacional,
        //    pesoMadre: this.form.value.pesoMadre,
        //    evalNutricional: this.form.value.evalNutricional,
        //    temperatura: this.form.value.temperatura,
        //    presionArterial: this.form.value.presionArterial,
        //    pulsoMaterno: this.form.value.pulsoMaterno,
        //    alturaUterinal: this.form.value.alturaUterinal,
        //    situacion: this.form.value.situacion,
        //    presentacion: this.form.value.presentacion,
        //    posicion: this.form.value.posicion,
        //    fcf: this.form.value.fcf,
        //    movFetal: this.form.value.movFetal,
        //    proteinaCualitativa: this.form.value.proteinaCualitativa,
        //    edema: this.form.value.edema,
        //    reflejoOsteotendinoso: this.form.value.reflejoOsteotendinoso,
        //    fechaEcografia: this.form.value.fechaEcografia,
        //    consejeriaIntegral: this.form.value.consejeriaIntegral,
        //    indAcidoFolico: this.form.value.indAcidoFolico,
        //    indFierro: this.form.value.indFierro,
        //    indCalcio: this.form.value.indCalcio,
        //    interconsulta: this.form.value.interconsulta,
        //    planParto: this.form.value.planParto,
        //    visitaDomiciliaria: this.form.value.visitaDomiciliaria,
        //    proximaCita: this.form.value.proximaCita,
        //    responsableAtencion: this.form.value.responsableAtencion,
        //    establecimientoAtencion: this.form.value.establecimientoAtencion,
        //
        // }


    }

    // abrir() {
    //     this.atencionGestanteDialog = null
    //     this.atencionGestanteDialog = true
    // }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('nroAtencion').setValue("1");
        this.form.get('fechaAtencion').setValue("");
        this.form.get('edadGestacional').setValue("0");
        this.form.get('pesoMadre').setValue("0");
        this.form.get('evalNutricional').setValue("");
        this.form.get('temperatura').setValue("0");
        this.form.get('presionArterial').setValue("");
        this.form.get('pulsoMaterno').setValue("");
        this.form.get('alturaUterinal').setValue("0");
        this.form.get('situacion').setValue("");
        this.form.get('presentacion').setValue("");
        this.form.get('posicion').setValue("");
        this.form.get('fcf').setValue("");
        this.form.get('movFetal').setValue("");
        this.form.get('proteinaCualitativa').setValue("");
        this.form.get('edema').setValue("");
        this.form.get('reflejoOsteotendinoso').setValue("");
        this.form.get('fechaEcografia').setValue("");
        this.form.get('consejeriaIntegral').setValue("");
        this.form.get('indAcidoFolico').setValue("");
        this.form.get('indFierro').setValue("");
        this.form.get('indCalcio').setValue("");
        this.form.get('interconsulta').setValue("");
        this.form.get('proximaCita').setValue("");
        this.form.get('visitaDomiciliaria').setValue("");
        this.form.get('responsableAtencion').setValue("");
        this.form.get('establecimientoAtencion').setValue("");

        this.atencionGestanteDialog = true;
    }

    editar(rowData) {

        this.isUpdate = true;
        this.form.get('fechaAtencion').setValue(rowData.fechaAtencion);
        this.form.get('edadGestacional').setValue(rowData.edadGestacional);
        this.form.get('pesoMadre').setValue(rowData.pesoMadre);
        this.form.get('evalNutricional').setValue(rowData.evalNutricional);
        this.form.get('temperatura').setValue(rowData.temperatura);
        this.form.get('presionArterial').setValue(rowData.presionArterial);
        this.form.get('pulsoMaterno').setValue(rowData.pulsoMaterno);
        this.form.get('alturaUterinal').setValue(rowData.alturaUterinal);
        this.form.get('situacion').setValue(rowData.situacion);
        this.form.get('presentacion').setValue(rowData.presentacion);
        this.form.get('posicion').setValue(rowData.posicion);
        this.form.get('fcf').setValue(rowData.fcf);
        this.form.get('movFetal').setValue(rowData.movFetal);
        this.form.get('proteinaCualitativa').setValue(rowData.proteinaCualitativa);
        this.form.get('edema').setValue(rowData.edema);
        this.form.get('reflejoOsteotendinoso').setValue(rowData.reflejoOsteotendinoso);
        this.form.get('fechaEcografia').setValue(rowData.fechaEcografia);
        this.form.get('consejeriaIntegral').setValue(rowData.consejeriaIntegral);
        this.form.get('indAcidoFolico').setValue(rowData.indAcidoFolico);
        this.form.get('indFierro').setValue(rowData.indFierro);
        this.form.get('indCalcio').setValue(rowData.indCalcio);
        this.form.get('interconsulta').setValue(rowData.interconsulta);
        this.form.get('proximaCita').setValue(rowData.proximaCita);
        this.form.get('visitaDomiciliaria').setValue(rowData.visitaDomiciliaria),
        this.form.get('responsableAtencion').setValue(rowData.responsableAtencion);
        this.form.get('responsableAtencion').setValue(rowData.responsableAtencion);
        this.form.get('establecimientoAtencion').setValue(rowData.establecimientoAtencion);
        this.isUpdate = rowData.id;
        this.atencionGestanteDialog = true;

    }




    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.atencionGestanteDialog = false;
    }

    titulo() {
        if (this.isUpdate) return "EDITE ATENCION PRENATAL";
        else return "NUEVA ATENCION PRENATAL";
    }

    graficar() {

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

    ngOnInit(): void {
    }


}
