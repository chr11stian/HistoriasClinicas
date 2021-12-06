
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EspecialidadService } from 'src/app/mantenimientos/services/especialidad/especialidad.service';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import Swal from 'sweetalert2';

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

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private obstetriciaGeneralService: ObstetriciaGeneralService
    ) {
        this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
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
            acidoFolicoDescripcion: new FormControl(""),
            acidoFolicoNumero: new FormControl(""),
            acidoFolicoDosis: new FormControl(""),
            acidoFolicoViaAdministracion: new FormControl(""),
            acidoFolicoIntervalo: new FormControl(""),
            acidoFolicoDuracion: new FormControl(""),
            hierroYAcidoFolicoDescripcion: new FormControl(""),
            hierroYAcidoFolicoNumero: new FormControl(""),
            hierroYAcidoFolicoDosis: new FormControl(""),
            hierroYAcidoFolicoViaAdministracion: new FormControl(""),
            hierroYAcidoFolicoIntervalo: new FormControl(""),
            hierroYAcidoFolicoDuracion: new FormControl(""),
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
            fcf: this.formExamenFetal.value.latidosCardiacosFetales
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
            fcf: this.formExamenFetal.value.latidosCardiacosFetales
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
            numero: this.formTratamiento.value.numero,
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
            numero: this.formTratamiento.value.numero,
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
            fecha: this.formInterconsulta.value.fecha,
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
            fecha: this.formInterconsulta.value.fecha,
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
            numero: this.formInmunizacion.value.numero,
            dosis: this.formInmunizacion.value.dosis,
            viaAdministracion: this.formInmunizacion.value.viaAdministracion,
            lote: this.formInmunizacion.value.lote,
            fechaVenc: this.formInmunizacion.value.fechaVenc,
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
            numero: this.formInmunizacion.value.numero,
            dosis: this.formInmunizacion.value.dosis,
            viaAdministracion: this.formInmunizacion.value.viaAdministracion,
            lote: this.formInmunizacion.value.lote,
            fechaVenc: this.formInmunizacion.value.fechaVenc,
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

    guardarConsulta() {
        var consulta={
            nroHcl: "75757575",
            nroAtencion: this.form.value.edad.nroAtencion,
            nroControlSis: this.form.value.edad.nroControlSis,
            nroEmbarazo: 1,
            tipoDoc:"DNI",
            nroDoc: "75757575",
            fecha: this.form.value.fecha,
            datosPerHist:{
                edad: this.form.value.edad,
                direccion: this.form.value.direccion
            },
            psicoprofilaxis:{
                estado:this.form.value.psicoProfilaxis,
                fecha: this.form.value.fechaPsicoProfilaxis
            },
            decarteSignosAlarmas:[
                {
                    descripcion: "Dificultad respiratoria",
                    valor: this.form.value.dificultadRespiratoria
                },
                {
                    descripcion: "Hipertension arterial",
                    valor: this.form.value.hipertensionArterial
                },
                {
                    descripcion: "Sangrado nasal",
                    valor: this.form.value.sangradoNasal
                },
                {
                    descripcion: "Deshidratacion aguda",
                    valor: this.form.value.deshidratacionAguda
                },
                {
                    descripcion: "Compromiso del sensorio",
                    valor: this.form.value.compromisoSensorio
                },
                {
                    descripcion: "Traumatismo quemadura",
                    valor: this.form.value.traumatismoQuemadura
                },
                {
                    descripcion: "Abdomen agudo",
                    valor: this.form.value.abdomenAgudo
                },
                {
                    descripcion: "Intoxicacion Envenenamiento",
                    valor: this.form.value.intoxicacionEnvenenamiento
                },
                {
                    descripcion: "Fiebre alta",
                    valor: this.form.value.fiebreAlta
                },
                {
                    descripcion: "Convulsiones",
                    valor: this.form.value.convulsiones
                },
                {
                    descripcion: "Sangrado genital",
                    valor: this.form.value.sangradoGenital
                },
                {
                    descripcion: "Dolor de cabeza",
                    valor: this.form.value.dolorCabeza
                },
                {
                    descripcion: "Edema",
                    valor: this.form.value.edema
                }
            ],
            orientaciones:[
                {
                    consejeria: "Orientacion y consejeria Signos de alarma",
                    valor: this.form.value.consejeria1,
                    cie10: this.form.value.cie10_1
                },
                {
                    descripcion: "Consejeria en enfermedades comunes",
                    valor: this.form.value.consejeria2,
                    cie10: this.form.value.cie10_2
                },
                {
                    descripcion: "Sospecha de Tuberculosis",
                    valor: this.form.value.consejeria3,
                    cie10: this.form.value.cie10_3
                },
                {
                    descripcion: "Infecciones de transmision sexual",
                    valor: this.form.value.consejeria4,
                    cie10: this.form.value.cie10_4
                },
                {
                    descripcion: "Orientacion nutricional",
                    valor: this.form.value.consejeria5,
                    cie10: this.form.value.cie10_5
                },
                {
                    descripcion: "Orientacion en planificacion familiar ",
                    valor: this.form.value.consejeria6,
                    cie10: this.form.value.cie10_6
                },
                {
                    descripcion: "Orientacion en prevención de cáncer ginecológico",
                    valor: this.form.value.consejeria7,
                    cie10: this.form.value.cie10_7
                },
                {
                    descripcion: "Orientacion y consejeria Pretest. VIH",
                    valor: this.form.value.consejeria8,
                    cie10: this.form.value.cie10_8
                },
                {
                    descripcion: "Consejeria en estilos de vida saludable",
                    valor: this.form.value.consejeria9,
                    cie10: this.form.value.cie10_9
                },
                {
                    descripcion: "Orientacion al acompañante",
                    valor: this.form.value.consejeria10,
                    cie10: this.form.value.cie10_10
                },
                {
                    descripcion: "Violencia Intrafamiliar",
                    valor: this.form.value.consejeria11,
                    cie10: this.form.value.cie10_11
                },
                {
                    descripcion: "Plan de parto",
                    valor: this.form.value.consejeria12,
                    cie10: this.form.value.cie10_12
                }
            ],
            funcionesVitales: {
                
            }
        }
    }
    closeDialog() {
        this.ref.close();
    }
}
