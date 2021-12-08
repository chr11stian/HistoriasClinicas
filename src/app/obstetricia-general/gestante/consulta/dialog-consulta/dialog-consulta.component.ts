
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import Swal from 'sweetalert2';
import { ConsultaObstetriciaService } from '../services/consulta-obstetricia/consulta-obstetricia.service';

@Component({
    selector: 'app-dialog-consulta',
    templateUrl: './dialog-consulta.component.html',
    styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

    idObstetricia: string;

    form: FormGroup;
    formExamenFetal: FormGroup;
    formDiagnostico: FormGroup;
    formTratamiento: FormGroup;
    formRecomendacion: FormGroup;
    formInmunizacion: FormGroup;
    formInterconsulta: FormGroup;
    formOtrosPruebas: FormGroup;

    prueba: any[];
    isUpdate: boolean = false;

    examenFetalDialog: boolean;
    diagnosticoDialog: boolean;
    tratamientoDialog: boolean;
    recomendacionDialog: boolean;
    inmunizacionDialog: boolean;
    interconsultaDialog: boolean;
    otrosPruebasDialog: boolean;

    listaSituacion = [
        { name: "Longitudinal", code: "1" },
        { name: "Transversal", code: "2" },
        { name: "No Aplica", code: "3" },
    ];
    listaPresentacion = [
        { name: "Cefalica", code: "1" },
        { name: "Pelvica", code: "2" },
        { name: "No Aplica", code: "3" },
    ];
    listaPosicion = [
        { name: "Derecha", code: "1" },
        { name: "Izquierda", code: "2" },
        { name: "No Aplica", code: "3" },
    ];
    listaEdema = [
        { name: "+", code: "1" },
        { name: "++", code: "2" },
        { name: "+++", code: "3" },
        { name: "es", code: "4" },
    ];
    listaIndicadores = [
        { name: "GAP", code: "1" },
        { name: "GEP", code: "2" },
        { name: "GIP", code: "3" },
    ];
    opciones = [
        { name: 'Si', code: 'Si' },
        { name: 'No', code: 'No' },
    ];

    listaSuplementoAcido = [
        { name: "Acido Folico", code: "1" },
        { name: "Acido Folico y Hierro", code: "2" },
    ];
    listaSuplementoCalcio = [
        { name: "Calcio", code: "1" },
    ];
    datosOtrosPruebasFisicas: any[] = [];
    indexEditarOtrosPruebasFisicasEditado: number = 0;
    estadoEditarOtrosPruebasFisicas: boolean = false;
    //tablas adicionales
    datosExamenesFetales: any[] = [];
    datosDiagnosticos: any[] = [];
    datosTratamientos: any[] = [];
    datosInterconsultas: any[] = [];
    datosRecomendaciones: any[] = [];
    datosInmunizaciones: any[] = [];

    //estados de edicion
    estadoEditarExamenFetal: boolean = false;
    estadoEditarDiagnosticos: boolean = false;
    estadoEditarTratamientos: boolean = false;
    estadoEditarInterconsultas: boolean = false;
    estadoEditarRecomendaciones: boolean = false;
    estadoEditarInmunizaciones: boolean = false;

    //index de la edicion
    indexExamenFetalEditado: number;
    indexDiagnosticoEditado: number;
    indexTratamientoEditado: number;
    indexInterconsultaEditado: number;
    indexRecomendacionEditado: number;
    indexInmunizacionEditado: number;

    estadoEdicion: boolean;
    datePipe = new DatePipe('en-US');
    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private consultaObstetriciaService: ConsultaObstetriciaService,
        public config: DynamicDialogConfig
    ) {
        this.idObstetricia = this.obstetriciaGeneralService.idGestacion;
        this.estadoEdicion = false;
        if (config.data) {
            //this.llenarCamposEdicionIntervalo();
            this.estadoEdicion = true;
        }
    }

    ngOnInit(): void {
        this.inicializarForm();
    }

    inicializarForm() {
        this.form = this.fb.group({
            fecha: new FormControl(""),
            edad: new FormControl(""),
            nroAtencion: new FormControl(""),
            nroControlSis: new FormControl(""),
            direccion: new FormControl(""),

            psicoProfilaxis: new FormControl(""),
            fechaPsicoProfilaxis: new FormControl(""),

            //funciones biologicas
            apetito: new FormControl(""),
            sed: new FormControl(""),
            sueño: new FormControl(""),
            estadoAnimo: new FormControl(""),
            orina: new FormControl(""),
            deposiciones: new FormControl(""),

            //funciones vitales
            temperatura: new FormControl(""),
            presionSis: new FormControl(""),
            presionDias: new FormControl(""),
            fc: new FormControl(""),
            fr: new FormControl(""),
            peso: new FormControl(""),
            talla: new FormControl(""),
            imc: new FormControl(""),
            evalNutricionalValor: new FormControl(""),
            evalNutricionalIndicador: new FormControl(""),

            //interrogatorio
            motivoConsulta: new FormControl(""),
            tiempoEnfermedad: new FormControl(""),
            interrogatorioOtro: new FormControl(""),


            //examen fisico items
            piel: new FormControl(""),
            mucosas: new FormControl(""),
            cabeza: new FormControl(""),
            cuello: new FormControl(""),
            cardioVascular: new FormControl(""),
            pulmones: new FormControl(""),
            mamas: new FormControl(""),
            pezones: new FormControl(""),
            abdomen: new FormControl(""),
            examenFisicoOtro: new FormControl(""),
            examenFisicoObservaciones: new FormControl(""),

            //examen Obstetrico
            alturaUterina: new FormControl(""),
            miembrosInferiores: new FormControl(""),
            osteotendinoso: new FormControl(""),
            genitalesExter: new FormControl(""),
            vagina: new FormControl(""),
            cuelloUterino: new FormControl(""),
            edemaExamen: new FormControl(""),
            edadSemanas: new FormControl(""),
            edadDias: new FormControl(""),

            //signos de alarma
            dificultadRespiratoria: new FormControl(""),
            hipertensionArterial: new FormControl(""),
            sangradoNasal: new FormControl(""),
            deshidratacionAguda: new FormControl(""),
            compromisoSensorio: new FormControl(""),
            traumatismoQuemadura: new FormControl(""),
            abdomenAgudo: new FormControl(""),
            intoxicacionEnvenenamiento: new FormControl(""),
            fiebreAlta: new FormControl(""),
            convulsiones: new FormControl(""),
            sangradoGenital: new FormControl(""),
            dolorCabeza: new FormControl(""),
            edema: new FormControl(""),

            //orientaciones
            consejeria1: new FormControl(""),
            cie10_1: new FormControl(""),
            consejeria2: new FormControl(""),
            cie10_2: new FormControl(""),
            consejeria3: new FormControl(""),
            cie10_3: new FormControl(""),
            consejeria4: new FormControl(""),
            cie10_4: new FormControl(""),
            consejeria5: new FormControl(""),
            cie10_5: new FormControl(""),
            consejeria6: new FormControl(""),
            cie10_6: new FormControl(""),
            consejeria7: new FormControl(""),
            cie10_7: new FormControl(""),
            consejeria8: new FormControl(""),
            cie10_8: new FormControl(""),
            consejeria9: new FormControl(""),
            cie10_9: new FormControl(""),
            consejeria10: new FormControl(""),
            cie10_10: new FormControl(""),
            consejeria11: new FormControl(""),
            cie10_11: new FormControl(""),
            consejeria12: new FormControl(""),
            cie10_12: new FormControl(""),

            //referencia
            consultorioReferencia: new FormControl(""),
            motivoReferencia: new FormControl(""),
            codRENAESReferencia: new FormControl(""),

            //proxCita
            proxCita: new FormControl(""),

            //suplementos
            acidoFolicoSuplemento: new FormControl(""),
            acidoFolicoDescripcion: new FormControl(""),
            acidoFolicoNumero: new FormControl(""),
            acidoFolicoDosis: new FormControl(""),
            acidoFolicoViaAdministracion: new FormControl(""),
            acidoFolicoIntervalo: new FormControl(""),
            acidoFolicoDuracion: new FormControl(""),
            calcioSuplemento: new FormControl(""),
            calcioDescripcion: new FormControl(""),
            calcioNumero: new FormControl(""),
            calcioDosis: new FormControl(""),
            calcioViaAdministracion: new FormControl(""),
            calcioIntervalo: new FormControl(""),
            calcioDuracion: new FormControl(""),

            //visita domiciliaria
            visitaDomiciliariaEstado: new FormControl(""),
            visitaDomiciliariaFecha: new FormControl(""),
            planPartoReenfocada: new FormControl(""),

            //laboratorios
            grupoSanguineo: new FormControl(""),
            grupoSanguineoFecha: new FormControl(""),
            factorRH: new FormControl(""),
            factorRHFecha: new FormControl(""),
            hemograma: new FormControl(""),
            hemogramaFecha: new FormControl(""),
            hemoglobina: new FormControl(""),
            hemoglobinaFecha: new FormControl(""),
            factorCorreccion: new FormControl(""),
            factorCorreccionFecha: new FormControl(""),
            hto: new FormControl(""),
            htoFecha: new FormControl(""),
            glucosa: new FormControl(""),
            glucosaFecha: new FormControl(""),


            rpr: new FormControl(""),
            rprFecha: new FormControl(""),
            rprReactivo: new FormControl(""),
            rprReactivoFecha: new FormControl(""),
            pruebaVIH: new FormControl(""),
            pruebaVIHFecha: new FormControl(""),
            prHepatitis: new FormControl(""),
            prHepatitisFecha: new FormControl(""),
            elisa: new FormControl(""),
            elisaFecha: new FormControl(""),

            glicemia: new FormControl(""),
            glicemiaFecha: new FormControl(""),
            toleranciaGlucosa: new FormControl(""),
            toleranciaGlucosaFecha: new FormControl(""),

            exaOrina: new FormControl(""),
            exaOrinaFecha: new FormControl(""),
            bacteriuria: new FormControl(""),
            bacteriuriaFecha: new FormControl(""),
            nitritos: new FormControl(""),
            nitritosFecha: new FormControl(""),
            urocultivo: new FormControl(""),
            urocultivoFecha: new FormControl(""),
            bkEsputo: new FormControl(""),
            bkEsputoFecha: new FormControl(""),
            wsternBlotlfi: new FormControl(""),
            wsternBlotlfiFecha: new FormControl(""),
            thlv1: new FormControl(""),
            thlv1Fecha: new FormControl(""),
            torch: new FormControl(""),
            torchFecha: new FormControl(""),
            gotaGruesa: new FormControl(""),
            gotaGruesaFecha: new FormControl(""),

            proteinuriaCuantitativa: new FormControl(""),
            proteinuriaCuantitativaFecha: new FormControl(""),
            proteinuriaCualitativa: new FormControl(""),
            proteinuriaCualitativaFecha: new FormControl(""),
            exSecV: new FormControl(""),
            exSecVFecha: new FormControl(""),
            pap: new FormControl(""),
            papFecha: new FormControl(""),
            ivaa: new FormControl(""),
            ivaaFecha: new FormControl(""),

            //ecografia
            ecografiaEdadSemanas: new FormControl(""),
            ecografiaEdadDias: new FormControl(""),
            descripcionEcografia: new FormControl(""),
            ecografiaFecha: new FormControl(""),
        });

        this.formExamenFetal = this.fb.group({
            selectSituacion: new FormControl(""),
            selectPresentacion: new FormControl(""),
            selectPosicion: new FormControl(""),
            movimientosFetales: new FormControl(""),
            latidosCardiacosFetales: new FormControl(""),
        });

        this.formDiagnostico = this.fb.group({
            diagnostico: new FormControl(""),
            cie10: new FormControl(""),
        });

        this.formTratamiento = this.fb.group({
            descripcion: new FormControl(""),
            numero: new FormControl(""),
            dosis: new FormControl(""),
            viaAdministracion: new FormControl(""),
            intervalo: new FormControl(""),
            duracion: new FormControl(""),
        });

        this.formInterconsulta = this.fb.group({
            consultorio: new FormControl(""),
            motivo: new FormControl(""),
            fecha: new FormControl(""),
        });

        this.formRecomendacion = this.fb.group({
            recomendacion: new FormControl(""),
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
        this.formOtrosPruebas = this.fb.group({
            nombre: new FormControl(""),
            resultado: new FormControl(""),
        });

    }
    openNewOtrosPruebasFisicas() {
        this.formOtrosPruebas.reset();
        this.otrosPruebasDialog = true;
    }
    guardarNuevoOtrosPruebasFisicas() {
        var prueba = {
            funcion: this.formOtrosPruebas.value.nombre,
            valor: this.formOtrosPruebas.value.resultado,
        }
        console.log(prueba);
        this.datosOtrosPruebasFisicas.push(prueba);
        this.otrosPruebasDialog = false;
    }
    canceledOtrosPruebasFisicas() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.otrosPruebasDialog = false;
        this.estadoEditarOtrosPruebasFisicas = false;
    }
    openDialogEditarOtrosPruebasFisicas(rowData, rowIndex) {
        this.estadoEditarOtrosPruebasFisicas = true;
        this.indexEditarOtrosPruebasFisicasEditado = rowIndex;
        this.formOtrosPruebas.reset();
        this.formOtrosPruebas.get('nombre').setValue(rowData.funcion);
        this.formOtrosPruebas.get('resultado').setValue(rowData.valor);
        this.otrosPruebasDialog = true;
    }
    guardarEdicionOtrosPruebasFisicas() {
        var prueba = {
            funcion: this.formOtrosPruebas.value.nombre,
            valor: this.formOtrosPruebas.value.resultado,
        }
        console.log(prueba);
        this.datosOtrosPruebasFisicas.splice(this.indexEditarOtrosPruebasFisicasEditado, 1, prueba);
        this.otrosPruebasDialog = false;
        this.estadoEditarOtrosPruebasFisicas = false;
    }
    eliminarOtrosPruebasFisicas(rowIndex) {
        this.estadoEditarOtrosPruebasFisicas = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosOtrosPruebasFisicas.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    openNewExamenFetal() {
        //this.isUpdate = false;
        this.formExamenFetal.reset();
        this.examenFetalDialog = true;
    }
    guardarNuevoExamenFetal() {
        var examenFetal = {
            movimientosFetales: this.formExamenFetal.value.movimientosFetales,
            situacion: this.formExamenFetal.value.selectSituacion,
            presentacion: this.formExamenFetal.value.selectPresentacion,
            posicion: this.formExamenFetal.value.selectPosicion,
            fcf: parseInt(this.formExamenFetal.value.latidosCardiacosFetales)
        }
        console.log(examenFetal);
        this.datosExamenesFetales.push(examenFetal);
        this.examenFetalDialog = false;
    }
    canceledExamenFetal() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.examenFetalDialog = false;
        this.estadoEditarExamenFetal = false;
    }
    openDialogEditarExamenFetal(rowData, rowIndex) {
        this.estadoEditarExamenFetal = true;
        this.indexExamenFetalEditado = rowIndex;
        this.formExamenFetal.reset();
        this.formExamenFetal.get('movimientosFetales').setValue(rowData.movimientosFetales);
        this.formExamenFetal.get('selectSituacion').setValue(rowData.situacion);
        this.formExamenFetal.get('selectPresentacion').setValue(rowData.presentacion);
        this.formExamenFetal.get('selectPosicion').setValue(rowData.posicion);
        this.formExamenFetal.get('latidosCardiacosFetales').setValue(rowData.fcf);
        this.examenFetalDialog = true;
    }
    guardarEdicionExamenFetal() {
        var examenFetal = {
            movimientosFetales: this.formExamenFetal.value.movimientosFetales,
            situacion: this.formExamenFetal.value.selectSituacion,
            presentacion: this.formExamenFetal.value.selectPresentacion,
            posicion: this.formExamenFetal.value.selectPosicion,
            fcf: parseInt(this.formExamenFetal.value.latidosCardiacosFetales)
        }
        console.log(examenFetal);
        this.datosExamenesFetales.splice(this.indexExamenFetalEditado, 1, examenFetal);
        this.examenFetalDialog = false;
        this.estadoEditarExamenFetal = false;
    }
    eliminarExamenFetal(rowIndex) {
        this.estadoEditarExamenFetal = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosExamenesFetales.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    openNewDiagnostico() {
        //this.isUpdate = false;
        this.formDiagnostico.reset();
        this.diagnosticoDialog = true;
    }
    guardarNuevoDiagnostico() {
        var diagnostico = {
            diagnostico: this.formDiagnostico.value.diagnostico,
            cie10: this.formDiagnostico.value.cie10,
        }
        console.log(diagnostico);
        this.datosDiagnosticos.push(diagnostico);
        this.diagnosticoDialog = false;
    }
    canceledDiagnostico() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.diagnosticoDialog = false;
        this.estadoEditarDiagnosticos = false;
    }
    openDialogEditarDiagnostico(rowData, rowIndex) {
        this.estadoEditarDiagnosticos = true;
        this.indexDiagnosticoEditado = rowIndex;
        this.formDiagnostico.reset();
        this.formDiagnostico.get('diagnostico').setValue(rowData.diagnostico);
        this.formDiagnostico.get('cie10').setValue(rowData.cie10);
        this.diagnosticoDialog = true;
    }
    guardarEdicionDiagnostico() {
        var diagnostico = {
            diagnostico: this.formDiagnostico.value.diagnostico,
            cie10: this.formDiagnostico.value.cie10,
        }
        console.log(diagnostico);
        this.datosDiagnosticos.splice(this.indexDiagnosticoEditado, 1, diagnostico);
        this.diagnosticoDialog = false;
        this.estadoEditarDiagnosticos = false;
    }
    eliminarDiagnostico(rowIndex) {
        this.estadoEditarDiagnosticos = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosDiagnosticos.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    openNewTratamiento() {
        //this.isUpdate = false;
        this.formTratamiento.reset();
        this.tratamientoDialog = true;
    }
    guardarNuevoTratamiento() {
        var tratamiento = {
            descripcion: this.formTratamiento.value.descripcion,
            numero: parseInt(this.formTratamiento.value.numero),
            dosis: this.formTratamiento.value.dosis,
            viaAdministracion: this.formTratamiento.value.viaAdministracion,
            intervalo: this.formTratamiento.value.intervalo,
            duracion: this.formTratamiento.value.duracion,
        }
        console.log(tratamiento);
        this.datosTratamientos.push(tratamiento);
        this.tratamientoDialog = false;
    }
    canceledTratamiento() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.tratamientoDialog = false;
        this.estadoEditarTratamientos = false;
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
        }
        console.log(tratamiento);
        this.datosTratamientos.splice(this.indexTratamientoEditado, 1, tratamiento);
        this.tratamientoDialog = false;
        this.estadoEditarTratamientos = false;
    }
    eliminarTratamiento(rowIndex) {
        this.estadoEditarTratamientos = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosTratamientos.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
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
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha,'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(interconsulta);
        this.datosInterconsultas.push(interconsulta);
        this.interconsultaDialog = false;
    }
    canceledInterconsulta() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
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
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha,'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(interconsulta);
        this.datosInterconsultas.splice(this.indexInterconsultaEditado, 1, interconsulta);
        this.interconsultaDialog = false;
        this.estadoEditarInterconsultas = false;
    }
    eliminarInterconsulta(rowIndex) {
        this.estadoEditarInterconsultas = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosInterconsultas.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
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
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
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
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosRecomendaciones.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
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
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc,'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(inmunizacion);
        this.datosInmunizaciones.push(inmunizacion);
        this.inmunizacionDialog = false;
    }
    canceledInmunizacion() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
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
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc,'yyyy-MM-dd HH:mm:ss'),
        }
        console.log(inmunizacion);
        this.datosInmunizaciones.splice(this.indexInmunizacionEditado, 1, inmunizacion);
        this.inmunizacionDialog = false;
        this.estadoEditarInmunizaciones = false;
    }
    eliminarInmunizacion(rowIndex) {
        this.estadoEditarInmunizaciones = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosInmunizaciones.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    closeDialogGuardar() {
        var consulta = {
            nroHcl: "10101013",
            nroAtencion: parseInt(this.form.value.nroAtencion),
            nroControlSis: parseInt(this.form.value.nroControlSis),
            nroEmbarazo: 1,
            tipoDoc: "DNI",
            nroDoc: "10101013",
            fecha: this.datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            datosPerHist: {
                edad: parseInt(this.form.value.edad),
                direccion: this.form.value.direccion
            },
            psicoprofilaxis: {
                estado: this.form.value.psicoProfilaxis,
                fecha: this.datePipe.transform(this.form.value.fechaPsicoProfilaxis, 'yyyy-MM-dd HH:mm:ss'),
            },
            decarteSignosAlarmas: [
                {
                    descripcion: "Dificultad respiratoria",
                    valor: this.form.value.dificultadRespiratoria === "true" ? true : false
                },
                {
                    descripcion: "Hipertension arterial",
                    valor: this.form.value.hipertensionArterial === "true" ? true : false
                },
                {
                    descripcion: "Sangrado nasal",
                    valor: this.form.value.sangradoNasal === "true" ? true : false
                },
                {
                    descripcion: "Deshidratacion aguda",
                    valor: this.form.value.deshidratacionAguda === "true" ? true : false
                },
                {
                    descripcion: "Compromiso del sensorio",
                    valor: this.form.value.compromisoSensorio === "true" ? true : false
                },
                {
                    descripcion: "Traumatismo quemadura",
                    valor: this.form.value.traumatismoQuemadura === "true" ? true : false
                },
                {
                    descripcion: "Abdomen agudo",
                    valor: this.form.value.abdomenAgudo === "true" ? true : false
                },
                {
                    descripcion: "Intoxicacion Envenenamiento",
                    valor: this.form.value.intoxicacionEnvenenamiento === "true" ? true : false
                },
                {
                    descripcion: "Fiebre alta",
                    valor: this.form.value.fiebreAlta === "true" ? true : false
                },
                {
                    descripcion: "Convulsiones",
                    valor: this.form.value.convulsiones === "true" ? true : false
                },
                {
                    descripcion: "Sangrado genital",
                    valor: this.form.value.sangradoGenital === "true" ? true : false
                },
                {
                    descripcion: "Dolor de cabeza",
                    valor: this.form.value.dolorCabeza === "true" ? true : false
                },
                {
                    descripcion: "Edema",
                    valor: this.form.value.edema === "true" ? true : false
                }
            ],
            orientaciones: [
                {
                    consejeria: "Orientacion y consejeria Signos de alarma",
                    valor: this.form.value.consejeria1 === "true" ? true : false,
                    cie10: this.form.value.cie10_1
                },
                {
                    consejeria: "Consejeria en enfermedades comunes",
                    valor: this.form.value.consejeria2 === "true" ? true : false,
                    cie10: this.form.value.cie10_2
                },
                {
                    consejeria: "Sospecha de Tuberculosis",
                    valor: this.form.value.consejeria3 === "true" ? true : false,
                    cie10: this.form.value.cie10_3
                },
                {
                    consejeria: "Infecciones de transmision sexual",
                    valor: this.form.value.consejeria4 === "true" ? true : false,
                    cie10: this.form.value.cie10_4
                },
                {
                    consejeria: "Orientacion nutricional",
                    valor: this.form.value.consejeria5 === "true" ? true : false,
                    cie10: this.form.value.cie10_5
                },
                {
                    consejeria: "Orientacion en planificacion familiar ",
                    valor: this.form.value.consejeria6 === "true" ? true : false,
                    cie10: this.form.value.cie10_6
                },
                {
                    consejeria: "Orientacion en prevención de cáncer ginecológico",
                    valor: this.form.value.consejeria7 === "true" ? true : false,
                    cie10: this.form.value.cie10_7
                },
                {
                    consejeria: "Orientacion y consejeria Pretest. VIH",
                    valor: this.form.value.consejeria8 === "true" ? true : false,
                    cie10: this.form.value.cie10_8
                },
                {
                    consejeria: "Consejeria en estilos de vida saludable",
                    valor: this.form.value.consejeria9 === "true" ? true : false,
                    cie10: this.form.value.cie10_9
                },
                {
                    consejeria: "Orientacion al acompañante",
                    valor: this.form.value.consejeria10 === "true" ? true : false,
                    cie10: this.form.value.cie10_10
                },
                {
                    consejeria: "Violencia Intrafamiliar",
                    valor: this.form.value.consejeria11 === "true" ? true : false,
                    cie10: this.form.value.cie10_11
                },
                {
                    consejeria: "Plan de parto",
                    valor: this.form.value.consejeria12 === "true" ? true : false,
                    cie10: this.form.value.cie10_12
                }
            ],
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
                { funcion: "Apetito", valor: this.form.value.apetito },
                { funcion: "Sed", valor: this.form.value.sed },
                { funcion: "Sueño", valor: this.form.value.sueño },
                { funcion: "Estado animo", valor: this.form.value.estadoAnimo },
                { funcion: "Orina", valor: this.form.value.orina },
                { funcion: "Deposiciones", valor: this.form.value.deposiciones }
            ],
            interrogatorio: [
                { pregunta: "motivo de consulta", respuesta: this.form.value.motivoConsulta },
                { pregunta: "tiempo de enfermedad", respuesta: this.form.value.tiempoEnfermedad },
                { pregunta: "observaciones", respuesta: this.form.value.interrogatorioOtro }
            ],
            examenesFisicos: [
                { funcion: "Piel", valor: this.form.value.piel },
                { funcion: "Mucosas", valor: this.form.value.mucosas },
                { funcion: "Cabeza", valor: this.form.value.cabeza },
                { funcion: "Cuello", valor: this.form.value.cuello },
                { funcion: "CardioVascular", valor: this.form.value.cardioVascular },
                { funcion: "Pulmones", valor: this.form.value.pulmones },
                { funcion: "Mamas", valor: this.form.value.mamas },
                { funcion: "Pezones", valor: this.form.value.pezones },
                { funcion: "Abdomen", valor: this.form.value.pezones },
            ],
            examenesObstetricos: {
                alturaUterina: this.form.value.alturaUterina,
                miembrosInferiores: this.form.value.miembrosInferiores,
                reflejoOsteotendinoso: this.form.value.osteotendinoso,
                genitalesExternos: this.form.value.genitalesExter,
                vagina: this.form.value.vagina,
                cuelloUterino: this.form.value.cuelloUterino,
                edemaUterino: this.form.value.edemaExamen,
                semanas: parseInt(this.form.value.edadSemanas),
                dias: parseInt(this.form.value.edadDias)
            },
            examenesFetos: this.datosExamenesFetales,
            examenFisicoObservaciones: this.form.value.examenFisicoObservaciones,
            diagnosticos: this.datosDiagnosticos,
            referencia: {
                consultorio: this.form.value.consultorioReferencia,
                motivo: this.form.value.motivoReferencia,
                codRENAES: this.form.value.codRENAESReferencia
            },
            interconsultas: this.datosInterconsultas,
            proxCita: this.datePipe.transform(this.form.value.proxCita, 'yyyy-MM-dd HH:mm:ss'),
            tratamientos: this.datosTratamientos,
            tratamientosSuplementos: {
                acidoFolico: {
                    descripcion: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        this.form.value.acidoFolicoDescripcion : "",
                    numero: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        parseInt(this.form.value.acidoFolicoNumero) : 0,
                    dosis: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        this.form.value.acidoFolicoDosis : "",
                    viaAdministracion: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        this.form.value.acidoFolicoViaAdministracion : "",
                    intervalo: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        this.form.value.acidoFolicoIntervalo : "",
                    duracion: this.form.value.acidoFolicoSuplemento === "Acido Folico" ?
                        this.form.value.acidoFolicoDuracion : ""
                },
                hierroYAcidoFolico: {
                    descripcion: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        this.form.value.acidoFolicoDescripcion : "",
                    numero: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        parseInt(this.form.value.acidoFolicoNumero) : 0,
                    dosis: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        this.form.value.acidoFolicoDosis : "",
                    viaAdministracion: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        this.form.value.acidoFolicoViaAdministracion : "",
                    intervalo: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        this.form.value.acidoFolicoIntervalo : "",
                    duracion: this.form.value.acidoFolicoSuplemento === "Acido Folico y Hierro" ?
                        this.form.value.acidoFolicoDuracion : "",
                },
                calcio: {
                    descripcion: this.form.value.calcioSuplemento === "Calcio" ?
                        this.form.value.calcioDescripcion : "",
                    numero: this.form.value.calcioSuplemento === "Calcio" ?
                        parseInt(this.form.value.calcioNumero) : 0,
                    dosis: this.form.value.calcioSuplemento === "Calcio" ?
                        this.form.value.calcioDosis : "",
                    viaAdministracion: this.form.value.calcioSuplemento === "Calcio" ?
                        this.form.value.calcioViaAdministracion : "",
                    intervalo: this.form.value.calcioSuplemento === "Calcio" ?
                        this.form.value.calcioIntervalo : "",
                    duracion: this.form.value.calcioSuplemento === "Calcio" ?
                        this.form.value.calcioDuracion : "",
                }
            },
            inmunizaciones: this.datosInmunizaciones,
            recomendaciones: this.datosRecomendaciones,
            examenesAuxiliares: null,
            evaluacionNutricional: {
                valor: this.form.value.evalNutricionalValor,
                indicador: this.form.value.evalNutricionalIndicador
            },
            visitaDomiciliaria: {
                estado: this.form.value.visitaDomiciliariaEstado,
                fecha: this.datePipe.transform(this.form.value.visitaDomiciliariaFecha, 'yyyy-MM-dd HH:mm:ss'),
            },
            laboratorios: {
                grupoSanguineo: {
                    valor: this.form.value.grupoSanguineo,
                    fecha: this.datePipe.transform(this.form.value.grupoSanguineoFecha, 'yyyy-MM-dd HH:mm:ss'),
                },
                factorRH: {
                    valor: this.form.value.factorRH,
                    fecha: this.datePipe.transform(this.form.value.factorRHFecha, 'yyyy-MM-dd HH:mm:ss'),
                },
                hemograma: {
                    valor: this.form.value.hemograma,
                    fecha: this.datePipe.transform(this.form.value.hemogramaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                hemoglobina: {
                    valor: this.form.value.hemoglobina,
                    fecha: this.datePipe.transform(this.form.value.hemoglobinaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                factorCorreccion: {
                    valor: this.form.value.factorCorreccion,
                    fecha: this.datePipe.transform(this.form.value.factorCorreccionFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                hto: {
                    valor: this.form.value.hto,
                    fecha: this.datePipe.transform(this.form.value.htoFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                glucosa: {
                    valor: this.form.value.glucosa,
                    fecha: this.datePipe.transform(this.form.value.glucosaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                toleranciaGlucosa: {
                    valor: this.form.value.toleranciaGlucosa,
                    fecha: this.datePipe.transform(this.form.value.toleranciaGlucosaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                exaOrina: {
                    valor: this.form.value.exaOrina,
                    fecha: this.datePipe.transform(this.form.value.exaOrinaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                rpr: {
                    valor: this.form.value.rpr,
                    fecha: this.datePipe.transform(this.form.value.rprFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                rprReactivo: {
                    valor: this.form.value.rprReactivo,
                    fecha: this.datePipe.transform(this.form.value.rprReactivoFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                exSecV: {
                    valor: this.form.value.exSecV,
                    fecha: this.datePipe.transform(this.form.value.exSecVFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                proteinuriaCuantitativa: {
                    valor: this.form.value.proteinuriaCuantitativa,
                    fecha: this.datePipe.transform(this.form.value.proteinuriaCuantitativaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                proteinuriaCualitativa: {
                    valor: this.form.value.proteinuriaCualitativa,
                    fecha: this.datePipe.transform(this.form.value.proteinuriaCualitativaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                pruebaVIH: {
                    valor: this.form.value.pruebaVIH,
                    fecha: this.datePipe.transform(this.form.value.pruebaVIHFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                prHepatitis: {
                    valor: this.form.value.prHepatitis,
                    fecha: this.datePipe.transform(this.form.value.prHepatitisFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                elisa: {
                    valor: this.form.value.elisa,
                    fecha: this.datePipe.transform(this.form.value.elisaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                glicemia: {
                    valor: this.form.value.glicemia,
                    fecha: this.datePipe.transform(this.form.value.glicemiaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                bacteriuria: {
                    valor: this.form.value.bacteriuria,
                    fecha: this.datePipe.transform(this.form.value.bacteriuriaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                nitritos: {
                    valor: this.form.value.nitritos,
                    fecha: this.datePipe.transform(this.form.value.nitritosFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                urocultivo: {
                    valor: this.form.value.urocultivo,
                    fecha: this.datePipe.transform(this.form.value.urocultivoFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                bkEsputo: {
                    valor: this.form.value.bkEsputo,
                    fecha: this.datePipe.transform(this.form.value.bkEsputoFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                wsternBlotlfi: {
                    valor: this.form.value.wsternBlotlfi,
                    fecha: this.datePipe.transform(this.form.value.wsternBlotlfiFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                thlv1: {
                    valor: this.form.value.thlv1,
                    fecha: this.datePipe.transform(this.form.value.thlv1Fecha,'yyyy-MM-dd HH:mm:ss'),
                },
                torch: {
                    valor: this.form.value.torch,
                    fecha: this.datePipe.transform(this.form.value.torchFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                gotaGruesa: {
                    valor: this.form.value.gotaGruesa,
                    fecha: this.datePipe.transform(this.form.value.gotaGruesaFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                pap: {
                    valor: this.form.value.pap,
                    fecha: this.datePipe.transform(this.form.value.papFecha,'yyyy-MM-dd HH:mm:ss'),
                },
                ivaa: {
                    valor: this.form.value.ivaa,
                    fecha: this.datePipe.transform(this.form.value.ivaaFecha,'yyyy-MM-dd HH:mm:ss'),
                }

            },
            ecografia: {
                fecha: this.datePipe.transform(this.form.value.ecografiaFecha,'yyyy-MM-dd HH:mm:ss'),
                descripcion: this.form.value.descripcionEcografia,
                semanas: parseInt(this.form.value.ecografiaEdadSemanas),
                dias: parseInt(this.form.value.ecografiaEdadDias),
            },
            codRENAES: "123123",
            planPartoReenfocada: this.form.value.planPartoReenfocada,
        }
        console.log('data to save ', consulta);

        if (!this.estadoEdicion) {
            this.consultaObstetriciaService.postDatoConsultaObstetrica(consulta).subscribe((res: any) => {
                console.log('rpta ', res.object);
                this.ref.close(res);
            });
        }
        else {
            this.consultaObstetriciaService.postDatoConsultaObstetrica(consulta).subscribe((res: any) => {
                console.log('rpta ', res.object);
                this.ref.close(res);
            });
        }
        this.estadoEdicion = false;
    }
    closeDialog() {
        this.ref.close();
        this.estadoEdicion = false;
    }
    llenarCamposEdicionConsulta() {

    }
}
