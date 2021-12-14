import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultaObstetriciaService } from '../../gestante/consulta/services/consulta-obstetricia/consulta-obstetricia.service';
import { CieService } from '../../services/cie.service';

@Component({
    selector: 'app-dialog-consulta-universal',
    templateUrl: './dialog-consulta-universal.component.html',
    styleUrls: ['./dialog-consulta-universal.component.css']
})
export class DialogConsultaUniversalComponent implements OnInit {
    @Input() dataHijo: string;
    listaTiposDiagnosticos = [
        { name: "REPETITIVO", code: "R" },
        { name: "DEFINITIVO", code: "D" },
        { name: "PRESUNTIVO", code: "P" },
    ];
    listaViaAdministracion = [
        { name: 'ENDOVENOSA', code: "1" },
        { name: 'INHALADORA', code: "2" },
        { name: 'INTRADERMICO', code: "3" },
        { name: 'INTRAMUSCULAR', code: "4" },
        { name: 'NASAL', code: "5" },
        { name: 'OFTALMICO', code: "6" },
        { name: 'ORAL', code: "7" },
        { name: 'OPTICO', code: "8" },
        { name: 'RECTAL', code: "9" },
        { name: 'SUBCUTANEO', code: "10" },
        { name: 'SUBLINGUAL', code: "11" },
        { name: 'TOPICO', code: "12" },
        { name: 'VAGINAL', code: "13" },
    ];
    listaIntervalos = [
        { name: 'CADA 1 HORA', code: '1' },
        { name: 'CADA 2 HORAS', code: '2' },
        { name: 'CADA 3 HORAS', code: '3' },
        { name: 'CADA 4 HORAS', code: '4' },
        { name: 'CADA 5 HORAS', code: '5' },
        { name: 'CADA 6 HORAS', code: '6' },
        { name: 'CADA 8 HORAS', code: '7' },
        { name: 'CADA 12 HORAS', code: '8' },
        { name: 'CADA 24 HORAS', code: '9' },
        { name: 'CONDICIONAL A FIEBRE', code: '10' },
        { name: 'DOSIS UNICA', code: '11' },
        { name: 'CADA 48 HORAS', code: '12' }
    ];
    form: FormGroup;
    formDiagnostico: FormGroup;
    formTratamiento: FormGroup;
    prueba: any;
    isUpdate: boolean = false;
    datosDiagnosticos: any[] = [];
    datosTratamientos: any[] = [];
    diagnosticoDialog: boolean = false;
    tratamientoDialog: boolean = false;
    estadoEditarDiagnosticos: boolean = false;
    estadoEditarTratamientos: boolean = false;
    indexDiagnosticoEditado: number;
    indexTratamientoEditado: number;
    listaDeCIE: any;
    dataConsulta: any;
    consultaNueva: any;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private CieService: CieService,
        private consultaObstetricaService: ConsultaObstetriciaService,
    ) {
        this.inicializarForm();
        let auxNroHcl: string = '10101044'
        this.consultaObstetricaService.traerDatosParaConsultaNueva({ nroHcl: auxNroHcl }).subscribe((res: any) => {
            this.consultaNueva = res.object
            this.form.patchValue({ edad: this.consultaNueva.edad });
            this.form.patchValue({})
        })
    }

    ngOnInit(): void {
        
    }

    inicializarForm() {
        this.form = this.fb.group({
            fecha: new FormControl(""),
            edad: new FormControl(0),
            nroAtencion: new FormControl(""),
            nroControlSis: new FormControl(""),
            direccion: new FormControl(""),
            //funciones vitales
            temperatura: new FormControl(""),
            presionSis: new FormControl(""),//sistolica y diastoloica
            presionDias: new FormControl(""),
            fc: new FormControl(""),
            fr: new FormControl(""),
            peso: new FormControl(""),
            talla: new FormControl(""),
            imc: new FormControl(""),
            //funciones biologicas
            apetito: new FormControl(""),
            sed: new FormControl(""),
            sueño: new FormControl(""),
            estadoAnimo: new FormControl(""),
            orina: new FormControl(""),
            deposiciones: new FormControl(""),
            //interrogatorio
            motivoConsulta: new FormControl(""),
            tiempoEnfermedad: new FormControl(""),
            interrogatorioOtro: new FormControl(""),
            //examen Fisico
            obsExamenFisico: new FormControl(""),
            //otros
            proximaCita: new FormControl(""),
            referencia: new FormControl(""),
            nroReferencia: new FormControl(""),
        })
        this.formDiagnostico = this.fb.group({
            diagnostico: new FormControl(""),
            cie10: new FormControl(""),
            tipo: new FormControl(""),
            autocompleteDiagnostico: new FormControl(""),
        });
        this.formTratamiento = this.fb.group({
            descripcion: new FormControl(""),
            numero: new FormControl(""),
            dosis: new FormControl(""),
            viaAdministracion: new FormControl(""),
            intervalo: new FormControl(""),
            duracion: new FormControl(""),
            observaciones: new FormControl(""),
        });
    }

    closeDialog() {
        let a = {
            a: 2,
            b: 'hola mundo'
        }
        this.ref.close(a);
    }

    openNewDiagnostico() {
        this.formDiagnostico.reset();
        this.diagnosticoDialog = true;
    }

    closeDialogDiagnostico() {
        this.diagnosticoDialog = false;
        this.estadoEditarDiagnosticos = false;
    }

    guardarNuevoDiagnostico() {
        var diagnostico = {
            tipo: this.formDiagnostico.value.tipo,
            diagnostico: this.formDiagnostico.value.diagnostico,
            cie10: this.formDiagnostico.value.cie10 === '' ? '' : this.formDiagnostico.value.cie10.codigoItem,
        }
        console.log(diagnostico);
        this.datosDiagnosticos.push(diagnostico);
        this.diagnosticoDialog = false;
    }

    openDialogEditarDiagnostico(rowData, rowIndex) {
        this.estadoEditarDiagnosticos = true;
        this.indexDiagnosticoEditado = rowIndex;
        this.formDiagnostico.reset();
        this.formDiagnostico.get('diagnostico').setValue(rowData.diagnostico);
        this.CieService.getCIEByCod(rowData.cie10).subscribe((resCIE: any) => {
            this.formDiagnostico.patchValue({ 'cie10': resCIE.object });
        })
        this.formDiagnostico.get('tipo').setValue(rowData.tipo);
        this.diagnosticoDialog = true;
    }
    guardarEdicionDiagnostico() {
        var diagnostico = {
            diagnostico: this.formDiagnostico.value.diagnostico,
            cie10: this.formDiagnostico.value.cie10 === '' ? '' : this.formDiagnostico.value.cie10.codigoItem,
            tipo: this.formDiagnostico.value.tipo,
        }
        console.log(diagnostico);
        this.datosDiagnosticos.splice(this.indexDiagnosticoEditado, 1, diagnostico);
        this.diagnosticoDialog = false;
        this.estadoEditarDiagnosticos = false;
    }
    eliminarDiagnostico(rowIndex) {
        this.estadoEditarDiagnosticos = false;
    }


    openNewTratamiento() {
        this.formTratamiento.reset();
        this.tratamientoDialog = true;
    }

    closeDialogTratamiento() {
        this.tratamientoDialog = false;
        this.estadoEditarTratamientos = false;
    }

    guardarNuevoTratamiento() {
        var tratamiento = {
            descripcion: this.formTratamiento.value.descripcion,
            numero: parseInt(this.formTratamiento.value.numero),
            dosis: this.formTratamiento.value.dosis,
            viaAdministracion: this.formTratamiento.value.viaAdministracion,
            intervalo: this.formTratamiento.value.intervalo,
            duracion: this.formTratamiento.value.duracion,
            observaciones: this.formTratamiento.value.observaciones,
        }
        console.log(tratamiento);
        this.datosTratamientos.push(tratamiento);
        this.tratamientoDialog = false;
    }

    openDialogEditarTratamiento(rowData, rowIndex) {
        this.estadoEditarTratamientos = true;
        this.indexTratamientoEditado = rowIndex;
        this.formTratamiento.reset();
        this.formTratamiento.get('descripcion').setValue(rowData.descripcion);
        this.formTratamiento.get('numero').setValue(rowData.numero);
        this.formTratamiento.get('dosis').setValue(rowData.dosis);
        this.formTratamiento.get('viaAdministracion').setValue(rowData.viaAdministracion);
        this.formTratamiento.get('intervalo').setValue(rowData.intervalo);
        this.formTratamiento.get('duracion').setValue(rowData.duracion);
        this.formTratamiento.get('observaciones').setValue(rowData.observaciones);
        this.tratamientoDialog = true;
    }

    guardarEdicionTratamiento() {
        var tratamiento = {
            descripcion: this.formTratamiento.value.descripcion,
            numero: parseInt(this.formTratamiento.value.numero),
            dosis: this.formTratamiento.value.dosis,
            viaAdministracion: this.formTratamiento.value.viaAdministracion,
            intervalo: this.formTratamiento.value.intervalo,
            duracion: this.formTratamiento.value.duracion,
            observaciones: this.formTratamiento.value.observaciones,
        }
        console.log(tratamiento);
        this.datosTratamientos.splice(this.indexTratamientoEditado, 1, tratamiento);
        this.tratamientoDialog = false;
        this.estadoEditarTratamientos = false;
    }

    filterCIE10(event) {
        this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.listaDeCIE = res.object
        })
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.formDiagnostico.patchValue({ diagnostico: event.descripcionItem });
        }
    }

    selectedOptionNameCIE(event, cieType) {
        console.log('lista de cie ', this.listaDeCIE);
        if (cieType == 0) {
            this.formDiagnostico.get("diagnostico").setValue(event.descripcionItem);
            this.formDiagnostico.get("autocompleteDiagnostico").setValue("");
            this.formDiagnostico.patchValue({ cie10: event }, { emitEvent: false });
        }
    }

    recuperarDatos() {
        let datePipe = new DatePipe('en-US');
        this.dataConsulta = {
            nroAtencion: parseInt(this.form.value.nroAtencion),
            nroControlSis: parseInt(this.form.value.nroControlSis),
            fecha: datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            datosPerHist: {
                edad: parseInt(this.form.value.edad),
                direccion: this.form.value.direccion
            },
            funcionesVitales: {
                t: parseFloat(this.form.value.temperatura),
                presionSistolica: parseInt(this.form.value.presionSis),
                presionDiastolica: parseInt(this.form.value.presionDias),
                fc: parseInt(this.form.value.fc),
                fr: parseInt(this.form.value.fr),
                peso: parseFloat(this.form.value.peso),
                talla: parseFloat(this.form.value.talla),
                imc: parseFloat(this.form.value.imc)
            },
            funcionesBiologicas: [
                { funcion: "APETITO", valor: this.form.value.apetito },
                { funcion: "SED", valor: this.form.value.sed },
                { funcion: "SUEÑO", valor: this.form.value.sueño },
                { funcion: "ESTADO ANIMO", valor: this.form.value.estadoAnimo },
                { funcion: "ORINA", valor: this.form.value.orina },
                { funcion: "DEPOSICIONES", valor: this.form.value.deposiciones }
            ],
            interrogatorio: [
                { pregunta: "MOTIVO DE CONSULTA", respuesta: this.form.value.motivoConsulta },
                { pregunta: "TIEMPO DE ENFERMEDAD", respuesta: this.form.value.tiempoEnfermedad },
                { pregunta: "OBSERVACIONES", respuesta: this.form.value.interrogatorioOtro }
            ],
            diagnosticos: this.datosDiagnosticos,
            tratamientos: this.datosTratamientos,
        }
    }

    guardarConsulta() {
        this.recuperarDatos();
        console.log('data to save ', this.dataConsulta);
    }

}
