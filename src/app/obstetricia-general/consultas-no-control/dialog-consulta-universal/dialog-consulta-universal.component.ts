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
    formInterconsulta: FormGroup;
    formInmunizacion: FormGroup;
    formRecomendacion: FormGroup;

    prueba: any;
    isUpdate: boolean = false;

    datosDiagnosticos: any[] = [];
    datosTratamientos: any[] = [];
    datosInterconsultas: any[] = [];
    datosInmunizaciones: any[] = [];
    datosRecomendaciones: any[] = [];
    diagnosticoDialog: boolean = false;
    tratamientoDialog: boolean = false;
    interconsultaDialog: boolean = false;
    inmunizacionDialog: boolean = false;
    recomendacionDialog: boolean = false;
    estadoEditarDiagnosticos: boolean = false;
    estadoEditarTratamientos: boolean = false;
    estadoEditarInterconsultas: boolean = false;
    estadoEditarInmunizaciones: boolean = false;
    estadoEditarRecomendaciones: boolean = false;
    indexDiagnosticoEditado: number;
    indexTratamientoEditado: number;
    indexInterconsultaEditado: number;
    indexInmunizacionEditado: number;
    indexRecomendacionEditado: number;
    listaDeCIE: any;
    dataConsulta: any;
    consultaNueva: any;
    datePipe = new DatePipe('en-US');

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
            this.form.get("edad").setValue(this.consultaNueva.edad ? this.consultaNueva.edad : "");
            this.form.get("nroControlSis").setValue(this.consultaNueva.nroMayorControlSis ? this.consultaNueva.nroMayorControlSis + 1 : 0);
            this.form.get("direccion").setValue(this.consultaNueva.direccion ? this.consultaNueva.direccion : "");
        });
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
            //orientaciones
            consejeria1: new FormControl(""),
            cie10_1: new FormControl("99401"),
            consejeria2: new FormControl(""),
            cie10_2: new FormControl(""),
            consejeria3: new FormControl(""),
            cie10_3: new FormControl(""),
            consejeria4: new FormControl(""),
            cie10_4: new FormControl("9940205"),
            consejeria5: new FormControl(""),
            cie10_5: new FormControl("99403"),
            consejeria6: new FormControl(""),
            cie10_6: new FormControl("99402"),
            consejeria7: new FormControl(""),
            cie10_7: new FormControl("U138 "),
            consejeria8: new FormControl(""),
            cie10_8: new FormControl("86703"),
            consejeria9: new FormControl(""),
            cie10_9: new FormControl(""),
            consejeria10: new FormControl(""),
            cie10_10: new FormControl(""),
            consejeria11: new FormControl(""),
            cie10_11: new FormControl("U121"),
            consejeria12: new FormControl(""),
            cie10_12: new FormControl("111692"),
            //referencia
            consultorioReferencia: new FormControl(""),
            motivoReferencia: new FormControl(""),
            codRENAESReferencia: new FormControl(""),

            //proxCita
            proxCita: new FormControl(""),
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
        this.formInterconsulta = this.fb.group({
            consultorio: new FormControl(""),
            motivo: new FormControl(""),
            fecha: new FormControl(""),
        });
        this.formInmunizacion = this.fb.group({
            codigo: new FormControl(""),
            descripcion: new FormControl(""),
            numero: new FormControl(""),
            dosis: new FormControl(""),
            viaAdministracion: new FormControl(""),
            lote: new FormControl(""),
            fechaVenc: new FormControl(""),
        });
        this.formRecomendacion = this.fb.group({
            recomendacion: new FormControl(""),
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

    openNewInterconsulta() {
        //this.isUpdate = false;
        this.formInterconsulta.reset();
        this.interconsultaDialog = true;
    }
    guardarNuevoInterconsulta() {
        var interconsulta = {
            consultorio: this.formInterconsulta.value.consultorio,
            motivo: this.formInterconsulta.value.motivo,
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(interconsulta);
        this.datosInterconsultas.push(interconsulta);
        this.interconsultaDialog = false;
    }
    canceledInterconsulta() {
        this.interconsultaDialog = false;
        this.estadoEditarInterconsultas = false;
    }
    openDialogEditarInterconsulta(rowData, rowIndex) {
        this.estadoEditarInterconsultas = true;
        this.indexInterconsultaEditado = rowIndex;
        this.formInterconsulta.reset();
        this.formInterconsulta.get('consultorio').setValue(rowData.consultorio);
        this.formInterconsulta.get('motivo').setValue(rowData.motivo);
        this.formInterconsulta.get('fecha').setValue(rowData.fecha);
        this.interconsultaDialog = true;
    }
    guardarEdicionInterconsulta() {
        var interconsulta = {
            consultorio: this.formInterconsulta.value.consultorio,
            motivo: this.formInterconsulta.value.motivo,
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(interconsulta);
        this.datosInterconsultas.splice(this.indexInterconsultaEditado, 1, interconsulta);
        this.interconsultaDialog = false;
        this.estadoEditarInterconsultas = false;
    }
    eliminarInterconsulta(rowIndex) {
        this.estadoEditarInterconsultas = false;
        // Swal.fire({
        //     showCancelButton: true,
        //     confirmButtonText: 'Eliminar',
        //     icon: 'warning',
        //     title: 'Estas seguro de eliminar este registro?',
        //     text: '',
        //     showConfirmButton: true,
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         this.datosInterconsultas.splice(rowIndex, 1);
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Eliminado correctamente',
        //             text: '',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //     }
        // })
    }

    openNewInmunizacion() {
        //this.isUpdate = false;
        this.formInmunizacion.reset();
        this.inmunizacionDialog = true;
    }
    guardarNuevoInmunizacion() {
        var inmunizacion = {
            codigo: this.formInmunizacion.value.codigo,
            descripcion: this.formInmunizacion.value.descripcion,
            numero: parseInt(this.formInmunizacion.value.numero),
            dosis: this.formInmunizacion.value.dosis,
            viaAdministracion: this.formInmunizacion.value.viaAdministracion,
            lote: this.formInmunizacion.value.lote,
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc, 'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(inmunizacion);
        this.datosInmunizaciones.push(inmunizacion);
        this.inmunizacionDialog = false;
    }
    canceledInmunizacion() {
        this.inmunizacionDialog = false;
        this.estadoEditarInmunizaciones = false;
    }
    openDialogEditarInmunizacion(rowData, rowIndex) {
        this.estadoEditarInmunizaciones = true;
        this.indexInmunizacionEditado = rowIndex;
        this.formInmunizacion.reset();
        this.formInmunizacion.get('codigo').setValue(rowData.codigo);
        this.formInmunizacion.get('descripcion').setValue(rowData.descripcion);
        this.formInmunizacion.get('numero').setValue(rowData.numero);
        this.formInmunizacion.get('dosis').setValue(rowData.dosis);
        this.formInmunizacion.get('viaAdministracion').setValue(rowData.viaAdministracion);
        this.formInmunizacion.get('lote').setValue(rowData.lote);
        this.formInmunizacion.get('fechaVenc').setValue(rowData.fechaVenc);
        this.inmunizacionDialog = true;
    }
    guardarEdicionInmunizacion() {
        var inmunizacion = {
            codigo: this.formInmunizacion.value.codigo,
            descripcion: this.formInmunizacion.value.descripcion,
            numero: parseInt(this.formInmunizacion.value.numero),
            dosis: this.formInmunizacion.value.dosis,
            viaAdministracion: this.formInmunizacion.value.viaAdministracion,
            lote: this.formInmunizacion.value.lote,
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc, 'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(inmunizacion);
        this.datosInmunizaciones.splice(this.indexInmunizacionEditado, 1, inmunizacion);
        this.inmunizacionDialog = false;
        this.estadoEditarInmunizaciones = false;
    }
    eliminarInmunizacion(rowIndex) {
        this.estadoEditarInmunizaciones = false;
    }

    openNewRecomendacion() {
        //this.isUpdate = false;
        this.formRecomendacion.reset();
        this.recomendacionDialog = true;
    }
    guardarNuevoRecomendacion() {
        console.log(this.formRecomendacion.value.recomendacion);
        this.datosRecomendaciones.push(this.formRecomendacion.value.recomendacion);
        this.recomendacionDialog = false;
    }
    canceledRecomendacion() {
        this.recomendacionDialog = false;
        this.estadoEditarRecomendaciones = false;
    }
    openDialogEditarRecomendacion(rowData, rowIndex) {
        this.estadoEditarRecomendaciones = true;
        this.indexRecomendacionEditado = rowIndex;
        this.formRecomendacion.reset();
        this.formRecomendacion.get('recomendacion').setValue(rowData);
        this.recomendacionDialog = true;
    }
    guardarEdicionRecomendacion() {
        console.log(this.formRecomendacion.value.recomendacion);
        this.datosRecomendaciones.splice(this.indexRecomendacionEditado, 1, this.formRecomendacion.value.recomendacion);
        this.recomendacionDialog = false;
        this.estadoEditarRecomendaciones = false;
    }
    eliminarRecomendacion(rowIndex) {
        this.estadoEditarRecomendaciones = false;
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
            nroHcl: this.consultaNueva.nroHcl,
            tipoDoc: this.consultaNueva.tipoDoc,
            nroDoc: this.consultaNueva.nroDoc,
            // nroAtencion: parseInt(this.form.value.nroAtencion),
            nroControlSis: parseInt(this.form.value.nroControlSis),
            fecha: datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            // datosPerHist: {
            //     edad: parseInt(this.form.value.edad),
            //     direccion: this.form.value.direccion
            // },
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
            examenFisicoObservaciones: this.form.value.obsExamenFisico,
            orientaciones: [
                {
                    consejeria: "ORIENTACIÓN Y CONSEJERIA SIGNOS DE ALARMA",
                    valor: this.form.value.consejeria1 === "true" ? true : false,
                    cie10: this.form.value.cie10_1
                },
                {
                    consejeria: "CONSEJERIA EN ENFERMEDADES COMUNES",
                    valor: this.form.value.consejeria2 === "true" ? true : false,
                    cie10: this.form.value.cie10_2
                },
                {
                    consejeria: "SOSPECHA DE TUBERCULOSIS",
                    valor: this.form.value.consejeria3 === "true" ? true : false,
                    cie10: this.form.value.cie10_3
                },
                {
                    consejeria: "INFECCIONES DE TRANSMISION SEXUAL",
                    valor: this.form.value.consejeria4 === "true" ? true : false,
                    cie10: this.form.value.cie10_4
                },
                {
                    consejeria: "ORIENTACIÓN NUTRICIONAL",
                    valor: this.form.value.consejeria5 === "true" ? true : false,
                    cie10: this.form.value.cie10_5
                },
                {
                    consejeria: "ORIENTACIÓN EN PLANIFICACIÓN FAMILIAR",
                    valor: this.form.value.consejeria6 === "true" ? true : false,
                    cie10: this.form.value.cie10_6
                },
                {
                    consejeria: "ORIENTACIÓN EN PREVENCION DE CÁNCER GINECOLÓGICO",
                    valor: this.form.value.consejeria7 === "true" ? true : false,
                    cie10: this.form.value.cie10_7
                },
                {
                    consejeria: "ORIENTACIÓN Y CONSEJERIA PRETEST. VIH",
                    valor: this.form.value.consejeria8 === "true" ? true : false,
                    cie10: this.form.value.cie10_8
                },
                {
                    consejeria: "CONSEJERIA EN ESTILOS DE VIDA SALUDABLE",
                    valor: this.form.value.consejeria9 === "true" ? true : false,
                    cie10: this.form.value.cie10_9
                },
                {
                    consejeria: "ORIENTACIÓN AL ACOMPAÑANTE",
                    valor: this.form.value.consejeria10 === "true" ? true : false,
                    cie10: this.form.value.cie10_10
                },
                {
                    consejeria: "VIOLENCIA INTRAFAMILIAR",
                    valor: this.form.value.consejeria11 === "true" ? true : false,
                    cie10: this.form.value.cie10_11
                },
                {
                    consejeria: "PLAN DE PARTO",
                    valor: this.form.value.consejeria12 === "true" ? true : false,
                    cie10: this.form.value.cie10_12
                }
            ],
            diagnosticos: this.datosDiagnosticos,
            tratamientos: this.datosTratamientos,
            inmunizaciones: this.datosInmunizaciones,
            recomendaciones: this.datosRecomendaciones,
            interconsultas: this.datosInterconsultas,
            referencia: {
                consultorio: this.form.value.consultorioReferencia,
                motivo: this.form.value.motivoReferencia,
                codRENAES: this.form.value.codRENAESReferencia
            },
            proxCita: this.datePipe.transform(this.form.value.proxCita, 'yyyy-MM-dd HH:mm:ss'),
            encargado: {
                tipoDoc: 'DNI',
                nroDoc: '10101010'
            },
            // codRENAES: '';
        }
    }

    guardarConsulta() {
        this.recuperarDatos();
        this.consultaObstetricaService.postConsultaNoControl(this.dataConsulta).subscribe((res: any) => {
            console.log('rpta ', res.object);
        });
    }
}
