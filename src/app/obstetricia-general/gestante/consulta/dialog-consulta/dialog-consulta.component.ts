
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { ImcService } from 'src/app/obstetricia-general/services/imc.service';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import Swal from 'sweetalert2';
import { ConsultaObstetriciaService } from '../services/consulta-obstetricia/consulta-obstetricia.service';

@Component({
    selector: 'app-dialog-consulta',
    templateUrl: './dialog-consulta.component.html',
    styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

    nroHcl: string;

    datosNuevaConsulta: any;

    form: FormGroup;
    formExamenFetal: FormGroup;
    formDiagnostico: FormGroup;
    formTratamiento: FormGroup;
    formRecomendacion: FormGroup;
    formInmunizacion: FormGroup;
    formInterconsulta: FormGroup;
    formOtrosPruebas: FormGroup;
    formExamenAuxiliar: FormGroup;

    prueba: any[];
    isUpdate: boolean = false;

    estadoVisitaDomiciMostrar: boolean;

    examenFetalDialog: boolean;
    diagnosticoDialog: boolean;
    tratamientoDialog: boolean;
    recomendacionDialog: boolean;
    inmunizacionDialog: boolean;
    interconsultaDialog: boolean;
    otrosPruebasDialog: boolean;
    examenAuxiliarDialog: boolean;

    listaSituacion = [
        { name: "LONGITUDINAL", code: "1" },
        { name: "TRANSVERSAL", code: "2" },
        { name: "NO APLICA", code: "3" },
    ];
    listaPresentacion = [
        { name: "CEFALICA", code: "1" },
        { name: "PELVICA", code: "2" },
        { name: "NO APLICA", code: "3" },
    ];
    listaPosicion = [
        { name: "DERECHA", code: "1" },
        { name: "IZQUIERDA", code: "2" },
        { name: "NO APLICA", code: "3" },
    ];
    listaEdema = [
        { name: "+", code: "1" },
        { name: "++", code: "2" },
        { name: "+++", code: "3" },
        { name: "SE", code: "4" },
    ];
    listaIndicadores = [
        { name: "GANANCIA INADECUADA DE PESO", code: "GIP" },
        { name: "GANANCIA ADECUADA DE PESO", code: "GAP" },
        { name: "GANANCIA ELEVADA DE PESO", code: "GEP" },
    ];
    opciones = [
        { name: 'SI', code: 'SI' },
        { name: 'NO', code: 'NO' },
    ];

    listaSuplementoAcido = [
        { name: "ACIDO FOLICO", code: "1" },
        { name: "ACIDO FOLICO Y HIERRO", code: "2" },
    ];
    listaSuplementoCalcio = [
        { name: "CALCIO", code: "1" },
    ];
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
    listaVisitaDomiciliaria = [
        { name: 'SI', code: "1" },
        { name: 'NO', code: "2" },
        { name: 'NO APLICA', code: "3" }
    ];
    listaReenfocada = [
        { name: 'SI', code: true },
        { name: 'NO', code: false }
    ];
    listaPlanParto = [
        { name: 'CONTROL', code: "1" },
        { name: 'VISITA', code: "2" },
        { name: 'NO SE HIZO', code: "3" }
    ];
    listaIntervalos = [
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
    listaExamenesAuxiliaresExistentes = [
        { tipo: 'HEMATOLOGIA', examen: 'HEMOGLOBINA' },
        { tipo: 'HEMATOLOGIA', examen: 'HEMATOCRITO' },
        { tipo: 'HEMATOLOGIA', examen: 'HEMOGRAMA COMPLETO' },
        { tipo: 'HEMATOLOGIA', examen: 'TIEMPO DE COAGULACION' },
        { tipo: 'HEMATOLOGIA', examen: 'TIEMPO DE SANGRIA' },
        { tipo: 'HEMATOLOGIA', examen: 'V.S.G.' },
        { tipo: 'HEMATOLOGIA', examen: 'RECUENTO DE PLAQUETAS' },
        { tipo: 'HEMATOLOGIA', examen: 'RECUENTO DE GLÓBULOS ROJOS' },
        { tipo: 'HEMATOLOGIA', examen: 'RECUENTO DE GLÓBULOS BLANCOS' },
        { tipo: 'HEMATOLOGIA', examen: 'CONSTANTES CORPUSCULARES' },
        { tipo: 'HEMATOLOGIA', examen: 'COMPATIBILIDAD SANGUINEA' },
        { tipo: 'BIOQUIMICA', examen: 'GLUCOSA' },
        { tipo: 'BIOQUIMICA', examen: 'COLESTEROL TOTAL' },
        { tipo: 'BIOQUIMICA', examen: 'TRIGLICERIDOS' },
        { tipo: 'BIOQUIMICA', examen: 'UREA' },
        { tipo: 'BIOQUIMICA', examen: 'CREATININA' },
        { tipo: 'BIOQUIMICA', examen: 'T.G.O.' },
        { tipo: 'BIOQUIMICA', examen: 'T.G.P.' },
        { tipo: 'BIOQUIMICA', examen: 'BILIRRUBINAS TOTAL Y FRACC.' },
        { tipo: 'BIOQUIMICA', examen: 'PROTEINAS TOTALES Y FRACC.' },
        { tipo: 'BIOQUIMICA', examen: 'ALBÚMINA' },
        { tipo: 'BIOQUIMICA', examen: 'FOSFATASA ALCALINA' },
        { tipo: 'MICROBIOLOGIA', examen: 'EXAMEN DIR. DE SECRECIÓN VAG.' },
        { tipo: 'MICROBIOLOGIA', examen: 'GRAM' },
        { tipo: 'INMUNOLOGIA', examen: 'GRUPO SANGUINEO Y FACTOR RH' },
        { tipo: 'INMUNOLOGIA', examen: 'PROTEINA C REACTIVA' },
        { tipo: 'INMUNOLOGIA', examen: 'REACCION DE WIDAL' },
        { tipo: 'INMUNOLOGIA', examen: 'FACTOR REUMATOIDEO' },
        { tipo: 'INMUNOLOGIA', examen: 'R.P.R. Y/O PRUEBA RÁPIDA DE SÍFILIS' },
        { tipo: 'INMUNOLOGIA', examen: 'V.I.H. (PRUEBA RÁPIDA)' },
        { tipo: 'INMUNOLOGIA', examen: 'ANTÍGENO DE SUPERFICIE HEPATITIS B' },
        { tipo: 'INMUNOLOGIA', examen: 'BHCG (TEST DE EMBARAZO)' },
        { tipo: 'INMUNOLOGIA', examen: 'ANTIESTREPTOLISINAS (ASO)' },
        { tipo: 'INMUNOLOGIA', examen: 'ANTIGENO FEBRIL PARA BRUCELA' },
        { tipo: 'UROANÁLISIS', examen: 'EXAMEN COMPLETO DE ORINA' },
        { tipo: 'UROANÁLISIS', examen: 'SEDIMENTO URINARIO' },
        { tipo: 'UROANÁLISIS', examen: 'PROTEINURIA CUANTITATIVA/CUALITATIVA' },
        { tipo: 'UROANÁLISIS', examen: 'TEST DE ÁCIDO SULFOSALICÍLICO' },
        { tipo: 'PARASITOLOGÍA', examen: 'EX. PARASITOLÓGICO DIRECTO DE HECES' },
        { tipo: 'PARASITOLOGÍA', examen: 'EX. PARASITOLÓGICO SERIADO DE HECES' },
        { tipo: 'PARASITOLOGÍA', examen: 'TEST DE GRAHAM' },
        { tipo: 'PARASITOLOGÍA', examen: 'COPROFUNCIONAL' },
        { tipo: 'PARASITOLOGÍA', examen: 'THEVENON EN HECES' },
        { tipo: 'PARASITOLOGÍA', examen: 'REACCIÓN INFLAMATORIA/MOCO FECAL' },
        { tipo: 'OTROS EXÁMENES', examen: 'BATERÍA DE LABORATORIO GESTANTE' },
        { tipo: 'OTROS EXÁMENES', examen: 'TEST DE HELECHO' },
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
    datosExamenesAuxiliares: any[] = [];

    //estados de edicion
    estadoEditarExamenFetal: boolean = false;
    estadoEditarDiagnosticos: boolean = false;
    estadoEditarTratamientos: boolean = false;
    estadoEditarInterconsultas: boolean = false;
    estadoEditarRecomendaciones: boolean = false;
    estadoEditarInmunizaciones: boolean = false;
    estadoEditarExamenesAuxiliares: boolean = false;

    //index de la edicion
    indexExamenFetalEditado: number;
    indexDiagnosticoEditado: number;
    indexTratamientoEditado: number;
    indexInterconsultaEditado: number;
    indexRecomendacionEditado: number;
    indexInmunizacionEditado: number;
    indexExamenAuxiliarEditado: number;

    estadoEdicion: boolean = false;
    datePipe = new DatePipe('en-US');
    listaDeCIE: any;

    eleccion: any;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private consultaObstetriciaService: ConsultaObstetriciaService,
        private imcService: ImcService,
        public config: DynamicDialogConfig,
        private CieService: CieService,
    ) {
        this.nroHcl = this.obstetriciaGeneralService.nroHcl;
        this.inicializarForm();
        this.consultaObstetriciaService.traerDatosParaConsultaNueva({ nroHcl: this.nroHcl }).subscribe((res: any) => {
            //console.log('datos ', res.object);
            this.datosNuevaConsulta = res.object;
            //console.log("este config", config.data);
            this.form.get("edad").setValue(this.datosNuevaConsulta.edad ? this.datosNuevaConsulta.edad : "");
            this.form.get("nroAtencion").setValue(this.datosNuevaConsulta.nroUltimaAtencion ? this.datosNuevaConsulta.nroUltimaAtencion + 1 : "");
            this.form.get("nroControlSis").setValue(this.datosNuevaConsulta.nroMayorControlSis ? this.datosNuevaConsulta.nroMayorControlSis + 1 : "");
            this.form.get("direccion").setValue(this.datosNuevaConsulta.direccion ? this.datosNuevaConsulta.direccion : "");
            this.form.get("pesoHabitual").setValue(this.datosNuevaConsulta.pesoHabitual ? this.datosNuevaConsulta.pesoHabitual : "");
            this.form.get("imc").setValue(this.datosNuevaConsulta.imc ? this.datosNuevaConsulta.imc : "");
            this.form.get("nroFetos").setValue(this.datosNuevaConsulta.nroFetos ? this.datosNuevaConsulta.nroFetos : "");
            this.calcularEdadGestacional(this.datosNuevaConsulta.fum);

            if (config.data) {
                this.llenarCamposEdicionConsulta();
                this.estadoEdicion = true;
                //console.log("estadoEdicion", this.estadoEdicion);
            }
        });

    }
    calcularEdadGestacional(fum) {
        if (fum) {
            let today = new Date().getTime();
            let auxFUM = new Date(fum).getTime();
            auxFUM = auxFUM + 0;
            let auxWeek = today - auxFUM;
            let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));

            this.form.get("edadSemanas").setValue(Math.trunc(edadGestacional / 7));
            this.form.get("edadDias").setValue(edadGestacional % 7);
            this.form.get("ecografiaEdadSemanas").setValue(Math.trunc(edadGestacional / 7));
            this.form.get("ecografiaEdadDias").setValue(edadGestacional % 7);
            //console.log('edad gestacional ', edadGestacional);
        }
    }
    onChangeEstadoVisita() {
        this.estadoVisitaDomiciMostrar = this.form.value.visitaDomiciliariaEstado === "SI" ? true : false;
    }
    ngOnInit(): void { }

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
            pesoHabitual: new FormControl(""),
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
            nroFetos: new FormControl(""),

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
            cie10_1: new FormControl("99401"),
            consejeria2: new FormControl(""),
            cie10_2: new FormControl("99403"),
            consejeria3: new FormControl(""),
            cie10_3: new FormControl("99204.08"),
            consejeria4: new FormControl(""),
            cie10_4: new FormControl(""),
            consejeria5: new FormControl(""),
            cie10_5: new FormControl("U140"),
            consejeria6: new FormControl(""),
            cie10_6: new FormControl("U1692"),
            consejeria7: new FormControl(""),
            cie10_7: new FormControl(""),
            consejeria8: new FormControl(""),
            cie10_8: new FormControl(""),
            consejeria9: new FormControl(""),
            cie10_9: new FormControl(""),
            consejeria10: new FormControl(""),
            cie10_10: new FormControl(""),
            consejeria11: new FormControl(""),
            cie10_11: new FormControl("9940133"),
            consejeria12: new FormControl(""),
            cie10_12: new FormControl("9940134"),
            consejeria13: new FormControl(""),
            cie10_13: new FormControl(""),
            consejeria14: new FormControl(""),
            cie10_14: new FormControl(""),

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
            acidoFolicoObservaciones: new FormControl(""),
            calcioSuplemento: new FormControl(""),
            calcioDescripcion: new FormControl(""),
            calcioNumero: new FormControl(""),
            calcioDosis: new FormControl(""),
            calcioViaAdministracion: new FormControl(""),
            calcioIntervalo: new FormControl(""),
            calcioDuracion: new FormControl(""),
            calcioObservaciones: new FormControl(""),

            //visita domiciliaria
            visitaDomiciliariaEstado: new FormControl(""),
            visitaDomiciliariaFecha: new FormControl(""),
            planParto: new FormControl(""),
            reenfocada: new FormControl(""),

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
        this.formExamenAuxiliar = this.fb.group({
            tipo: new FormControl(""),
            examen: new FormControl(""),
            codigo: new FormControl(""),
        });
    }
    calcularGanancia() {
        let gananciaPeso = Math.round(((this.form.value.peso - this.form.value.pesoHabitual) + Number.EPSILON) * 100) / 100;
        let imc = this.form.value.imc;
        let indicador = "";
        let semanas = this.form.value.edadSemanas;
        this.form.get("evalNutricionalValor").setValue(gananciaPeso);
        if (parseFloat(imc) < 18.5) {//bajo peso
            this.imcService.getGananciaBajoPeso(semanas).subscribe((res: any) => {
                //console.log('datos ', res.object);
                let auxiliar = res.object.recomendacionGananciaBajoPeso[0]

                if (parseFloat(this.form.value.talla) < 157) {
                    if (gananciaPeso < auxiliar.min) {
                        indicador = "GIP"
                    }
                    else {
                        (gananciaPeso > auxiliar.min && gananciaPeso < res.object.med) ? indicador = "GAP" : indicador = "GEP"
                    }
                }
                else {
                    if (gananciaPeso < auxiliar.med) {
                        indicador = "GIP"
                    }
                    else {
                        (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
                    }
                }
                this.form.get("evalNutricionalIndicador").setValue(indicador);
            });
        }
        else {
            if (parseFloat(imc) < 25) {//normal
                this.imcService.getGananciaPesoRegular(semanas).subscribe((res: any) => {
                    let auxiliar = res.object.recomendacionGananciaPesoRegular[0];
                    //console.log('datos ', auxiliar);
                    if (this.form.value.nroFetos < 2) {
                        if (parseFloat(this.form.value.talla) < 157) {
                            if (gananciaPeso < auxiliar.min) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                        else {
                            if (gananciaPeso < auxiliar.med) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                    }
                    else {
                        if (parseFloat(this.form.value.talla) < 157) {
                            if (gananciaPeso < auxiliar.minMult) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.minMult && gananciaPeso < auxiliar.medMult) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                        else {
                            if (gananciaPeso < auxiliar.medMult) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.medMult && gananciaPeso < auxiliar.maxMult) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                    }
                    this.form.get("evalNutricionalIndicador").setValue(indicador);
                });
            }
            else {
                if (parseFloat(imc) < 30) {//sobrepeso
                    this.imcService.getGananciaSobrePeso(semanas).subscribe((res: any) => {
                        let auxiliar = res.object.recomendacionGananciaSobrePeso[0];
                        //console.log('datos ', res.object);
                        if (parseFloat(this.form.value.talla) < 157) {
                            if (gananciaPeso < auxiliar.min) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.min && gananciaPeso < res.auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                        else {
                            if (gananciaPeso < auxiliar.med) {
                                indicador = "GIP"
                            }
                            else {
                                (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
                            }
                        }
                        this.form.get("evalNutricionalIndicador").setValue(indicador);
                    });
                }
                else {//obesidad
                    this.imcService.getGananciaObesa(semanas).subscribe((res: any) => {
                        //console.log('datos ', res.object);
                        let auxiliar = res.object.recomendacionGananciaObesa[0];
                        if (this.form.value.nroFetos < 2) {
                            if (parseFloat(this.form.value.talla) < 157) {
                                if (gananciaPeso < auxiliar.min) {
                                    indicador = "GIP"
                                }
                                else {
                                    (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
                                }
                            }
                            else {
                                if (gananciaPeso < auxiliar.med) {
                                    indicador = "GIP"
                                }
                                else {
                                    (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
                                }
                            }
                        }
                        else {
                            if (parseFloat(this.form.value.talla) < 157) {
                                if (gananciaPeso < auxiliar.minMult) {
                                    indicador = "GIP"
                                }
                                else {
                                    (gananciaPeso > auxiliar.minMult && gananciaPeso < auxiliar.medMult) ? indicador = "GAP" : indicador = "GEP"
                                }
                            }
                            else {
                                if (gananciaPeso < auxiliar.medMult) {
                                    indicador = "GIP"
                                }
                                else {
                                    (gananciaPeso > auxiliar.medMult && gananciaPeso < auxiliar.maxMult) ? indicador = "GAP" : indicador = "GEP"
                                }
                            }
                        }
                        this.form.get("evalNutricionalIndicador").setValue(indicador);
                    });
                }
            }
        }
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
        //console.log(prueba);
        this.datosOtrosPruebasFisicas.push(prueba);
        this.datosOtrosPruebasFisicas = [...this.datosOtrosPruebasFisicas];
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
        //console.log(prueba);
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
        //console.log(examenFetal);
        this.datosExamenesFetales.push(examenFetal);
        this.datosExamenesFetales = [...this.datosExamenesFetales];
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
        //console.log(examenFetal);
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
            tipo: this.formDiagnostico.value.tipo,
            diagnostico: this.formDiagnostico.value.diagnostico,
            cie10: this.formDiagnostico.value.cie10 === '' ? '' : this.formDiagnostico.value.cie10.codigoItem,
        }
        //console.log(diagnostico);
        this.datosDiagnosticos.push(diagnostico);
        this.datosDiagnosticos = [...this.datosDiagnosticos];
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
        //console.log(diagnostico);
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
            observaciones: this.formTratamiento.value.observaciones,
        }
        //console.log(tratamiento);
        this.datosTratamientos.push(tratamiento);
        this.datosTratamientos = [...this.datosTratamientos];
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
        //console.log(tratamiento);
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
    openNewExamenAuxiliar() {
        //this.isUpdate = false;
        this.formExamenAuxiliar.reset();
        this.examenAuxiliarDialog = true;
    }
    guardarNuevoExamenAuxiliar() {
        var examen = //{
            //tipo: this.formTratamiento.value.tipo,
            /*examen:*/ this.formExamenAuxiliar.value.examen;
        //codigo: this.formTratamiento.value.codigo,
        //}
        //console.log(examen);
        this.datosExamenesAuxiliares.push(examen);
        this.datosExamenesAuxiliares = [...this.datosExamenesAuxiliares];
        this.examenAuxiliarDialog = false;
    }
    canceledExamenAuxiliar() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.examenAuxiliarDialog = false;
        this.estadoEditarExamenesAuxiliares = false;
    }
    openDialogEditarExamenAuxiliar(rowData, rowIndex) {
        this.estadoEditarExamenesAuxiliares = true;
        this.indexExamenAuxiliarEditado = rowIndex;
        this.formExamenAuxiliar.reset();
        //this.formExamenAuxiliar.get('tipo').setValue(rowData.tipo);
        this.formExamenAuxiliar.get('examen').setValue(rowData);
        //this.formExamenAuxiliar.get('codigo').setValue(rowData.codigo);
        this.examenAuxiliarDialog = true;
    }
    guardarEdicionExamenAuxiliar() {
        var examen = //{
            //tipo: this.formTratamiento.value.tipo,
            /*examen:*/ this.formExamenAuxiliar.value.examen;
        //codigo: this.formTratamiento.value.codigo,
        //}
        //console.log(examen);
        this.datosExamenesAuxiliares.splice(this.indexExamenAuxiliarEditado, 1, examen);
        this.examenAuxiliarDialog = false;
        this.estadoEditarExamenesAuxiliares = false;
    }
    eliminarExamenAuxiliar(rowIndex) {
        this.estadoEditarExamenesAuxiliares = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.datosExamenesAuxiliares.splice(rowIndex, 1);
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
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
        }
        //console.log(interconsulta);
        this.datosInterconsultas.push(interconsulta);
        this.datosInterconsultas = [...this.datosInterconsultas];
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
            fecha: this.datePipe.transform(this.formInterconsulta.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
        }
        //console.log(interconsulta);
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
        //console.log(this.formRecomendacion.value.recomendacion);
        this.datosRecomendaciones.push(this.formRecomendacion.value.recomendacion);
        this.datosRecomendaciones = [...this.datosRecomendaciones];
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
        //console.log(this.formRecomendacion.value.recomendacion);
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
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc, 'yyyy-MM-dd HH:mm:ss'),
        }
        //console.log(inmunizacion);
        this.datosInmunizaciones.push(inmunizacion);
        this.datosInmunizaciones = [...this.datosInmunizaciones];
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
            fechaVenc: this.datePipe.transform(this.formInmunizacion.value.fechaVenc, 'yyyy-MM-dd HH:mm:ss'),
        }
        //console.log(inmunizacion);
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
            fecha: this.datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            anioEdad: parseInt(this.form.value.edad),
            fum: "2022-01-15",
            nroHcl: this.datosNuevaConsulta.nroHcl,
            tipoDoc: this.datosNuevaConsulta.tipoDoc,
            nroDoc: this.datosNuevaConsulta.nroDoc,
            direccion: this.form.value.direccion,
            acompanante: {
                tipoDoc: "DNI",
                nroDoc: "74656565",
                nombre: "peter",
                apellidos: "parker",
                lazoParentesco: "tio ben :'v",
                edad: 22,
                direccion: "villa san maypi",
                telefono: "987654321"
            },
            listaSignosAlarma: [
                {
                    tipoEdad: null,
                    nombreSigno: "DIFICULTAD RESPIRATORIA",
                    valorSigno: this.form.value.dificultadRespiratoria === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "HIPERTENSION ARTERIAL",
                    valorSigno: this.form.value.hipertensionArterial === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "SANGRADO NASAL",
                    valorSigno: this.form.value.sangradoNasal === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "DESHIDRATACION AGUDA",
                    valorSigno: this.form.value.deshidratacionAguda === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "COMPROMISO DEL SENSORIO",
                    valorSigno: this.form.value.compromisoSensorio === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "TRAUMATISMO QUEMADURA",
                    valorSigno: this.form.value.traumatismoQuemadura === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "ABDOMEN AGUDO",
                    valorSigno: this.form.value.abdomenAgudo === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "INTOXICACION ENVENENAMIENTO",
                    valorSigno: this.form.value.intoxicacionEnvenenamiento === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "FIEBRE ALTA",
                    valorSigno: this.form.value.fiebreAlta === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "CONVULSIONES",
                    valorSigno: this.form.value.convulsiones === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "SANGRADO GENITAL",
                    valorSigno: this.form.value.sangradoGenital === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "DOLOR DE CABEZA",
                    valorSigno: this.form.value.dolorCabeza === "true" ? true : false
                },
                {
                    tipoEdad: null,
                    nombreSigno: "EDEMA",
                    valorSigno: this.form.value.edema === "true" ? true : false
                }
            ],
            funcionesBiologicas: [
                { funcion: "APETITO", valor: this.form.value.apetito },
                { funcion: "SED", valor: this.form.value.sed },
                { funcion: "SUEÑO", valor: this.form.value.sueño },
                { funcion: "ESTADO ANIMO", valor: this.form.value.estadoAnimo },
                { funcion: "ORINA", valor: this.form.value.orina },
                { funcion: "DEPOSICIONES", valor: this.form.value.deposiciones }
            ],
            signosVitales: {
                temperatura: parseFloat(this.form.value.temperatura),
                presionSistolica: parseInt(this.form.value.presionSis),
                presionDiastolica: parseInt(this.form.value.presionDias),
                fc: parseInt(this.form.value.fc),
                fr: parseInt(this.form.value.fr),
                peso: parseFloat(this.form.value.peso),
                talla: parseFloat(this.form.value.talla),
                imc: parseFloat(this.form.value.imc),
                perimetroCefalico: parseFloat(this.form.value.imc),
            },
            examenesFisicos: [
                { codigoExamen:null, nombreExamen: "PIEL", valor: this.form.value.piel },
                { codigoExamen:null, nombreExamen: "MUCOSAS", valor: this.form.value.mucosas },
                { codigoExamen:null, nombreExamen: "CABEZA", valor: this.form.value.cabeza },
                { codigoExamen:null, nombreExamen: "CUELLO", valor: this.form.value.cuello },
                { codigoExamen:null, nombreExamen: "CARDIO VASCULAR", valor: this.form.value.cardioVascular },
                { codigoExamen:null, nombreExamen: "PULMONES", valor: this.form.value.pulmones },
                { codigoExamen:null, nombreExamen: "MAMAS", valor: this.form.value.mamas },
                { codigoExamen:null, nombreExamen: "PEZONES", valor: this.form.value.pezones },
                { codigoExamen:null, nombreExamen: "ABDOMEN", valor: this.form.value.abdomen },
            ],
            obsExamenFisico:  this.form.value.examenFisicoObservaciones,
            diagnosticos: this.datosDiagnosticos,
            anamnesis: "paciente acude x maleStar",
            motivoConsulta: this.form.value.motivoConsulta,
            interMedicinaGeneral: null,
            referencia: {
                consultorio: this.form.value.consultorioReferencia,
                motivoReferencia: this.form.value.motivoReferencia,
                RENIPRESS: this.form.value.codRENAESReferencia,
                nombreIPRESS: "posta medica las machitas cevicheria medica",

                idRef: "id del documento de la referencia",
                DISA: "codigo diSa",
                lote: "eS un codigo que va en le referencia",
                nroFormato: "numeracion de la referencia"
            },
            idDocContrareferencia: null,
            citas: [
                {
                    fecha: this.datePipe.transform(this.form.value.proxCita, 'yyyy-MM-dd HH:mm:ss'),
                    motivo: "prox cita",
                    servicio: "OBSTETRICIA",
                    estado: "TENTATIVO",
                    nivelUrgencia: "aqui define Si en caSo de interconSulta hay priSa por que Sea atendido inmediatamente"
                }
            ],
            tratamientos: [
                {
                    suplementaciones: [
                        {
                            id: "",
                            codigo: "",
                            descripcion: "",
                            CIE10: "",
                            cantidad: 1,
                            dosis: "",
                            frecuencia: "",
                            duracion: "",
                            viaAdministracion: "",
                            fechaVenc: "2022-02-09"
                        }
                    ],
                    inmunizaciones: [
                        {
                            codigo: "",
                            edadMes: 40,
                            descripcion: "",
                            CIE10: "",
                            HIS: "",
                            cantidad: 1,
                            dosis: "55cc",
                            viaAdministracion: "",
                            duracion: "",
                            lote: "",
                            fechaVenc: "anio-mes-dia",
                            encargado: {
                                tipoDoc: "DNI",
                                nroDoc: "98798778",
                                profesion: "Pepe el meme",
                                colegiatura: "456789"
                            }
                        }
                    ],
                    tratamientoGenerales: [
                        {
                            id: "",
                            codigo: "",
                            descripcion: "",
                            CIE10: "",
                            cantidad: 1,
                            dosis: "",
                            frecuencia: "",
                            duracion: "",
                            viaAdministracion: "",
                            fechaVenc: "2022-02-09"
                        }
                    ],
                    observaciones: ""
                }
            ],
            examenesAuxiliares: [
                {
                    idSolicitudExamen: "id del documento de la solicitud de los examenes (apunta a otra coleccion)",
                    listaExamenes: [
                        {
                            idResultadoExamen: "ada654ad6546ad864ad",
                            tipoLaboratorio: "nombre del laboratorio",
                            codigo: "465465",
                            nombreExamen: "nombre del examen",
                            fecha: "anio-mes-dia"
                        }
                    ]
                }
            ],
            recomendaciones: this.datosRecomendaciones,
            profesionalACargo: {
                tipoDoc: "DNI",
                nroDoc: "98798778",
                profesion: "Pepe el meme",
                colegiatura: "456789"
            },
            RENIPRESS: "codigo de la ipress",
            servicio: "OBSTETRICIA",
            servicioPrevio: null,


            //solo obstetricia datos
            nroAtencion: parseInt(this.form.value.nroAtencion),
            nroControlSis: parseInt(this.form.value.nroControlSis),
            nroEmbarazo: this.datosNuevaConsulta.nroEmbarazo,
            psicoprofilaxis: {
                estado: this.form.value.psicoProfilaxis,
                fecha: this.datePipe.transform(this.form.value.fechaPsicoProfilaxis, 'yyyy-MM-dd HH:mm:ss'),
            },
            examenesObstetricos: {
                alturaUterina: this.form.value.alturaUterina,
                miembrosInferiores: this.form.value.miembrosInferiores,
                reflejoOsteotendinoso: this.form.value.osteotendinoso,
                genitalesExternos: this.form.value.genitalesExter,
                vagina: this.form.value.vagina,
                cuelloUterino: this.form.value.cuelloUterino,
                edema: this.form.value.edemaExamen,
                semanas: parseInt(this.form.value.edadSemanas),
                dias: parseInt(this.form.value.edadDias)
            },
            examenesFetos: this.datosExamenesFetales,
            orientaciones: [
                {
                    consejeria: "ORIENTACIÓN Y CONSEJERIA SIGNOS DE ALARMA",
                    valor: this.form.value.consejeria1 === "true" ? true : false,
                    cie10: this.form.value.cie10_1
                },
                {
                    consejeria: "ORIENTACIÓN NUTRICIONAL",
                    valor: this.form.value.consejeria2 === "true" ? true : false,
                    cie10: this.form.value.cie10_2
                },
                {
                    consejeria: "ORIENTACIÓN EN PLANIFICACIÓN FAMILIAR",
                    valor: this.form.value.consejeria3 === "true" ? true : false,
                    cie10: this.form.value.cie10_3
                },
                {
                    consejeria: "ORIENTACIÓN EN PREVENCION DE CÁNCER GINECOLÓGICO",
                    valor: this.form.value.consejeria4 === "true" ? true : false,
                    cie10: this.form.value.cie10_4
                },
                {
                    consejeria: "VIOLENCIA INTRAFAMILIAR",
                    valor: this.form.value.consejeria5 === "true" ? true : false,
                    cie10: this.form.value.cie10_5
                },
                {
                    consejeria: "PLAN DE PARTO",
                    valor: this.form.value.consejeria6 === "true" ? true : false,
                    cie10: this.form.value.cie10_6
                },
                {
                    consejeria: "CONSEJERIA LACTANCIA MATERNA",
                    valor: this.form.value.consejeria7 === "true" ? true : false,
                    cie10: this.form.value.cie10_7
                },
                {
                    consejeria: "CONSEJERIA EN ENFERMEDADES COMUNES",
                    valor: this.form.value.consejeria8 === "true" ? true : false,
                    cie10: this.form.value.cie10_8
                },
                {
                    consejeria: "SOSPECHA DE TUBERCULOSIS",
                    valor: this.form.value.consejeria9 === "true" ? true : false,
                    cie10: this.form.value.cie10_9
                },
                {
                    consejeria: "INFECCIONES DE TRANSMISION SEXUAL",
                    valor: this.form.value.consejeria10 === "true" ? true : false,
                    cie10: this.form.value.cie10_10
                },
                {
                    consejeria: "ORIENTACIÓN Y CONSEJERIA PRETEST. VIH",
                    valor: this.form.value.consejeria11 === "true" ? true : false,
                    cie10: this.form.value.cie10_11
                },
                {
                    consejeria: "ORIENTACIÓN Y CONSEJERIA POSTTEST. VIH",
                    valor: this.form.value.consejeria12 === "true" ? true : false,
                    cie10: this.form.value.cie10_12
                },
                {
                    consejeria: "CONSEJERIA EN ESTILOS DE VIDA SALUDABLE",
                    valor: this.form.value.consejeria13 === "true" ? true : false,
                    cie10: this.form.value.cie10_13
                },
                {
                    consejeria: "ORIENTACIÓN AL ACOMPAÑANTE",
                    valor: this.form.value.consejeria14 === "true" ? true : false,
                    cie10: this.form.value.cie10_14
                }
            ],
            tratamientosSuplementos: {
                acidoFolico: {
                    descripcion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoDescripcion : "",
                    numero: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        parseInt(this.form.value.acidoFolicoNumero) : 0,
                    dosis: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoDosis : "",
                    viaAdministracion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoViaAdministracion : "",
                    intervalo: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoIntervalo : "",
                    duracion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoDuracion : "",
                    observaciones: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
                        this.form.value.acidoFolicoObservaciones : ""
                },
                hierroYAcidoFolico: {
                    descripcion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoDescripcion : "",
                    numero: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        parseInt(this.form.value.acidoFolicoNumero) : 0,
                    dosis: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoDosis : "",
                    viaAdministracion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoViaAdministracion : "",
                    intervalo: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoIntervalo : "",
                    duracion: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoDuracion : "",
                    observaciones: this.form.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
                        this.form.value.acidoFolicoObservaciones : "",
                },
                calcio: {
                    descripcion: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioDescripcion : "",
                    numero: this.form.value.calcioSuplemento === "CALCIO" ?
                        parseInt(this.form.value.calcioNumero) : 0,
                    dosis: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioDosis : "",
                    viaAdministracion: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioViaAdministracion : "",
                    intervalo: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioIntervalo : "",
                    duracion: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioDuracion : "",
                    observaciones: this.form.value.calcioSuplemento === "CALCIO" ?
                        this.form.value.calcioObservaciones : "",
                }
            },
            evaluacionNutricional: {
                valor: this.form.value.evalNutricionalValor,
                indicador: this.form.value.evalNutricionalIndicador
            },
            visitaDomiciliaria: {
                estado: this.form.value.visitaDomiciliariaEstado,
                fecha: this.datePipe.transform(this.form.value.visitaDomiciliariaFecha, 'yyyy-MM-dd HH:mm:ss'),
            },
            planParto: this.form.value.planParto,
            reenfocada: this.form.value.reenfocada,

            //datos de consulta antiguo
            interconsultas: this.datosInterconsultas,
            //examenesAuxiliares: this.datosExamenesAuxiliares,
            //tratamientos: this.datosTratamientos,
            inmunizaciones: this.datosInmunizaciones,
            
            
            
            

            

            // interrogatorio: [
            //     { pregunta: "MOTIVO DE CONSULTA", respuesta: this.form.value.motivoConsulta },
            //     { pregunta: "TIEMPO DE ENFERMEDAD", respuesta: this.form.value.tiempoEnfermedad },
            //     { pregunta: "OBSERVACIONES", respuesta: this.form.value.interrogatorioOtro }
            // ],

            
        }
        for (let i = 0; i < this.datosOtrosPruebasFisicas.length; i++) {
            consulta.examenesFisicos.push(this.datosOtrosPruebasFisicas[i])
        }
        //console.log('data to save ', consulta);
        //console.log("estadoEdicion", this.estadoEdicion);
        if (!this.estadoEdicion) {
            this.consultaObstetriciaService.postDatoConsultaObstetrica(consulta, this.form.value.nroFetos).subscribe((res: any) => {
                //console.log('rpta ', res.object);
                this.ref.close(res);
            });
        }
        else {
            this.consultaObstetriciaService.putDatoConsultaObstetrica(consulta, this.form.value.nroFetos).subscribe((res: any) => {
                //console.log('rpta ', res.object);
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
        this.estadoEdicion = true;
        let configuracion = this.config.data.row;
        //console.log("Imprimiento objeto del dialog", configuracion);
        this.form.get('fecha').setValue(configuracion.fecha ?
            this.datePipe.transform(new Date(configuracion.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('edad').setValue(configuracion.datosPerHist.edad);
        this.form.get('nroAtencion').setValue(configuracion.nroAtencion);
        this.form.get('nroControlSis').setValue(configuracion.nroControlSis);

        this.form.get('direccion').setValue(configuracion.datosPerHist.direccion);
        this.form.get('psicoProfilaxis').setValue(configuracion.psicoprofilaxis.estado);
        this.form.get('fechaPsicoProfilaxis').setValue(configuracion.psicoprofilaxis.fecha ?
            this.datePipe.transform(new Date(configuracion.psicoprofilaxis.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('apetito').setValue(configuracion.funcionesBiologicas[0].valor);
        this.form.get('sed').setValue(configuracion.funcionesBiologicas[1].valor);
        this.form.get('sueño').setValue(configuracion.funcionesBiologicas[2].valor);
        this.form.get('estadoAnimo').setValue(configuracion.funcionesBiologicas[3].valor);
        this.form.get('orina').setValue(configuracion.funcionesBiologicas[4].valor);
        this.form.get('deposiciones').setValue(configuracion.funcionesBiologicas[5].valor);

        this.form.get('temperatura').setValue(configuracion.funcionesVitales.t);
        this.form.get('presionSis').setValue(configuracion.funcionesVitales.presionSistolica);
        this.form.get('presionDias').setValue(configuracion.funcionesVitales.presionDiastolica);
        this.form.get('fc').setValue(configuracion.funcionesVitales.fc);
        this.form.get('fr').setValue(configuracion.funcionesVitales.fr);
        this.form.get('peso').setValue(configuracion.funcionesVitales.peso);
        this.form.get('talla').setValue(configuracion.funcionesVitales.talla);
        this.form.get('imc').setValue(configuracion.funcionesVitales.imc);
        this.form.get('evalNutricionalValor').setValue(configuracion.evaluacionNutricional.valor);
        this.form.get('evalNutricionalIndicador').setValue(configuracion.evaluacionNutricional.indicador);

        this.form.get('motivoConsulta').setValue(configuracion.interrogatorio[0].respuesta);
        this.form.get('tiempoEnfermedad').setValue(configuracion.interrogatorio[1].respuesta);
        this.form.get('interrogatorioOtro').setValue(configuracion.interrogatorio[2].respuesta);

        this.form.get('piel').setValue(configuracion.examenesFisicos[0].valor);
        this.form.get('mucosas').setValue(configuracion.examenesFisicos[1].valor);
        this.form.get('cabeza').setValue(configuracion.examenesFisicos[2].valor);
        this.form.get('cuello').setValue(configuracion.examenesFisicos[3].valor);
        this.form.get('cardioVascular').setValue(configuracion.examenesFisicos[4].valor);
        this.form.get('pulmones').setValue(configuracion.examenesFisicos[5].valor);
        this.form.get('mamas').setValue(configuracion.examenesFisicos[6].valor);
        this.form.get('pezones').setValue(configuracion.examenesFisicos[7].valor);
        this.form.get('abdomen').setValue(configuracion.examenesFisicos[8].valor);
        //this.form.get('examenFisicoOtro').setValue(configuracion.examenesFisicos[0].valor);// modificar
        this.form.get('examenFisicoObservaciones').setValue(configuracion.examenFisicoObservaciones);
        this.form.get('alturaUterina').setValue(configuracion.examenesObstetricos.alturaUterina);
        this.form.get('miembrosInferiores').setValue(configuracion.examenesObstetricos.miembrosInferiores);
        this.form.get('osteotendinoso').setValue(configuracion.examenesObstetricos.reflejoOsteotendinoso);
        this.form.get('genitalesExter').setValue(configuracion.examenesObstetricos.genitalesExternos);
        this.form.get('vagina').setValue(configuracion.examenesObstetricos.vagina);
        this.form.get('cuelloUterino').setValue(configuracion.examenesObstetricos.cuelloUterino);
        this.form.get('edemaExamen').setValue(configuracion.examenesObstetricos.edema);
        this.form.get('edadSemanas').setValue(configuracion.examenesObstetricos.semanas);
        this.form.get('edadDias').setValue(configuracion.examenesObstetricos.dias);

        this.form.get('dificultadRespiratoria').setValue(configuracion.descarteSignosAlarmas[0].valor ? "true" : "false");
        this.form.get('hipertensionArterial').setValue(configuracion.descarteSignosAlarmas[1].valor ? "true" : "false");
        this.form.get('sangradoNasal').setValue(configuracion.descarteSignosAlarmas[2].valor ? "true" : "false");
        this.form.get('deshidratacionAguda').setValue(configuracion.descarteSignosAlarmas[3].valor ? "true" : "false");
        this.form.get('compromisoSensorio').setValue(configuracion.descarteSignosAlarmas[4].valor ? "true" : "false");
        this.form.get('traumatismoQuemadura').setValue(configuracion.descarteSignosAlarmas[5].valor ? "true" : "false");
        this.form.get('abdomenAgudo').setValue(configuracion.descarteSignosAlarmas[6].valor ? "true" : "false");
        this.form.get('intoxicacionEnvenenamiento').setValue(configuracion.descarteSignosAlarmas[7].valor ? "true" : "false");
        this.form.get('fiebreAlta').setValue(configuracion.descarteSignosAlarmas[8].valor ? "true" : "false");
        this.form.get('convulsiones').setValue(configuracion.descarteSignosAlarmas[9].valor ? "true" : "false");
        this.form.get('sangradoGenital').setValue(configuracion.descarteSignosAlarmas[10].valor ? "true" : "false");
        this.form.get('dolorCabeza').setValue(configuracion.descarteSignosAlarmas[11].valor ? "true" : "false");
        this.form.get('edema').setValue(configuracion.descarteSignosAlarmas[12].valor ? "true" : "false");
        //orientaciones
        this.form.get('consejeria1').setValue(configuracion.orientaciones[0].valor ? "true" : "false");
        this.form.get('cie10_1').setValue(configuracion.orientaciones[0].cie10);
        this.form.get('consejeria2').setValue(configuracion.orientaciones[1].valor ? "true" : "false");
        this.form.get('cie10_2').setValue(configuracion.orientaciones[1].cie10);
        this.form.get('consejeria3').setValue(configuracion.orientaciones[2].valor ? "true" : "false");
        this.form.get('cie10_3').setValue(configuracion.orientaciones[2].cie10);
        this.form.get('consejeria4').setValue(configuracion.orientaciones[3].valor ? "true" : "false");
        this.form.get('cie10_4').setValue(configuracion.orientaciones[3].cie10);
        this.form.get('consejeria5').setValue(configuracion.orientaciones[4].valor ? "true" : "false");
        this.form.get('cie10_5').setValue(configuracion.orientaciones[4].cie10);
        this.form.get('consejeria6').setValue(configuracion.orientaciones[5].valor ? "true" : "false");
        this.form.get('cie10_6').setValue(configuracion.orientaciones[5].cie10);
        this.form.get('consejeria7').setValue(configuracion.orientaciones[6].valor ? "true" : "false");
        this.form.get('cie10_7').setValue(configuracion.orientaciones[6].cie10);
        this.form.get('consejeria8').setValue(configuracion.orientaciones[7].valor ? "true" : "false");
        this.form.get('cie10_8').setValue(configuracion.orientaciones[7].cie10);
        this.form.get('consejeria9').setValue(configuracion.orientaciones[8].valor ? "true" : "false");
        this.form.get('cie10_9').setValue(configuracion.orientaciones[8].cie10);
        this.form.get('consejeria10').setValue(configuracion.orientaciones[9].valor ? "true" : "false");
        this.form.get('cie10_10').setValue(configuracion.orientaciones[9].cie10);
        this.form.get('consejeria11').setValue(configuracion.orientaciones[10].valor ? "true" : "false");
        this.form.get('cie10_11').setValue(configuracion.orientaciones[10].cie10);
        this.form.get('consejeria12').setValue(configuracion.orientaciones[11].valor ? "true" : "false");
        this.form.get('cie10_12').setValue(configuracion.orientaciones[11].cie10);
        this.form.get('consejeria13').setValue(configuracion.orientaciones[12].valor ? "true" : "false");
        this.form.get('cie10_13').setValue(configuracion.orientaciones[12].cie10);
        this.form.get('consejeria14').setValue(configuracion.orientaciones[13].valor ? "true" : "false");
        this.form.get('cie10_14').setValue(configuracion.orientaciones[13].cie10);
        //atencion
        this.form.get('consultorioReferencia').setValue(configuracion.referencia.consultorio);
        this.form.get('motivoReferencia').setValue(configuracion.referencia.motivo);
        this.form.get('codRENAESReferencia').setValue(configuracion.referencia.codRENAES);
        this.form.get('proxCita').setValue(configuracion.proxCita.fecha ?
            this.datePipe.transform(new Date(configuracion.proxCita.fecha), 'yyyy-MM-ddTHH:mm') : "");
        //suplementos
        this.form.get('acidoFolicoSuplemento').setValue(
            configuracion.tratamientosSuplementos.acidoFolico.descripcion !== "" ?
                "ACIDO FOLICO" :
                (configuracion.tratamientosSuplementos.hierroYAcidoFolico.descripcion !== "" ?
                    "ACIDO FOLICO Y HIERRO" : ""));
        if (configuracion.tratamientosSuplementos.acidoFolico.descripcion !== "") {
            this.form.get('acidoFolicoDescripcion').setValue(configuracion.tratamientosSuplementos.acidoFolico.descripcion);
            this.form.get('acidoFolicoNumero').setValue(configuracion.tratamientosSuplementos.acidoFolico.numero);
            this.form.get('acidoFolicoDosis').setValue(configuracion.tratamientosSuplementos.acidoFolico.dosis);
            this.form.get('acidoFolicoViaAdministracion').setValue(configuracion.tratamientosSuplementos.acidoFolico.viaAdministracion);
            this.form.get('acidoFolicoIntervalo').setValue(configuracion.tratamientosSuplementos.acidoFolico.intervalo);
            this.form.get('acidoFolicoDuracion').setValue(configuracion.tratamientosSuplementos.acidoFolico.duracion);
            this.form.get('acidoFolicoObservaciones').setValue(configuracion.tratamientosSuplementos.acidoFolico.observaciones);
        }
        else {
            if (configuracion.tratamientosSuplementos.hierroYAcidoFolico.descripcion !== "") {
                this.form.get('acidoFolicoDescripcion').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.descripcion);
                this.form.get('acidoFolicoNumero').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.numero);
                this.form.get('acidoFolicoDosis').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.dosis);
                this.form.get('acidoFolicoViaAdministracion').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion);
                this.form.get('acidoFolicoIntervalo').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.intervalo);
                this.form.get('acidoFolicoDuracion').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.duracion);
                this.form.get('acidoFolicoObservaciones').setValue(configuracion.tratamientosSuplementos.hierroYAcidoFolico.observaciones);
            }
            else {
                this.form.get('acidoFolicoDescripcion').setValue("");
                this.form.get('acidoFolicoNumero').setValue("");
                this.form.get('acidoFolicoDosis').setValue("");
                this.form.get('acidoFolicoViaAdministracion').setValue("");
                this.form.get('acidoFolicoIntervalo').setValue("");
                this.form.get('acidoFolicoDuracion').setValue("");
                this.form.get('acidoFolicoObservaciones').setValue("");
            }
        }
        this.form.get('calcioSuplemento').setValue(configuracion.tratamientosSuplementos.calcio.descripcion !== "" ? "CALCIO" : "");
        this.form.get('calcioDescripcion').setValue(configuracion.tratamientosSuplementos.calcio.descripcion);
        this.form.get('calcioNumero').setValue(configuracion.tratamientosSuplementos.calcio.numero);
        this.form.get('calcioDosis').setValue(configuracion.tratamientosSuplementos.calcio.dosis);
        this.form.get('calcioViaAdministracion').setValue(configuracion.tratamientosSuplementos.calcio.viaAdministracion);
        this.form.get('calcioIntervalo').setValue(configuracion.tratamientosSuplementos.calcio.intervalo);
        this.form.get('calcioDuracion').setValue(configuracion.tratamientosSuplementos.calcio.duracion);
        this.form.get('calcioObservaciones').setValue(configuracion.tratamientosSuplementos.calcio.observaciones);
        //visita domiciliaria
        this.form.get('visitaDomiciliariaEstado').setValue(configuracion.visitaDomiciliaria.estado);
        this.form.get('visitaDomiciliariaFecha').setValue(configuracion.visitaDomiciliaria.fecha ?
            this.datePipe.transform(new Date(configuracion.visitaDomiciliaria.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('planParto').setValue(configuracion.planParto);
        this.form.get('reenfocada').setValue(configuracion.reenfocada);
        //laboratorio
        this.form.get('grupoSanguineo').setValue(configuracion.laboratorios.grupoSanguineo.valor);
        this.form.get('grupoSanguineoFecha').setValue(configuracion.laboratorios.grupoSanguineo.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.grupoSanguineo.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('factorRH').setValue(configuracion.laboratorios.factorRH.valor);
        this.form.get('factorRHFecha').setValue(configuracion.laboratorios.factorRH.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.factorRH.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('hemograma').setValue(configuracion.laboratorios.hemograma.valor);
        this.form.get('hemogramaFecha').setValue(configuracion.laboratorios.hemograma.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.hemograma.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('hemoglobina').setValue(configuracion.laboratorios.hemoglobina.valor);
        this.form.get('hemoglobinaFecha').setValue(configuracion.laboratorios.hemoglobina.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.hemoglobina.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('factorCorreccion').setValue(configuracion.laboratorios.factorCorreccion.valor);
        this.form.get('factorCorreccionFecha').setValue(configuracion.laboratorios.factorCorreccion.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.factorCorreccion.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('hto').setValue(configuracion.laboratorios.hto.valor);
        this.form.get('htoFecha').setValue(configuracion.laboratorios.hto.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.hto.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('glucosa').setValue(configuracion.laboratorios.glucosa.valor);
        this.form.get('glucosaFecha').setValue(configuracion.laboratorios.glucosa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.glucosa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('rpr').setValue(configuracion.laboratorios.rpr.valor);
        this.form.get('rprFecha').setValue(configuracion.laboratorios.rpr.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.rpr.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('rprReactivo').setValue(configuracion.laboratorios.rprReactivo.valor);
        this.form.get('rprReactivoFecha').setValue(configuracion.laboratorios.rprReactivo.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.rprReactivo.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('pruebaVIH').setValue(configuracion.laboratorios.pruebaVIH.valor);
        this.form.get('pruebaVIHFecha').setValue(configuracion.laboratorios.pruebaVIH.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.pruebaVIH.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('prHepatitis').setValue(configuracion.laboratorios.prHepatitis.valor);
        this.form.get('prHepatitisFecha').setValue(configuracion.laboratorios.prHepatitis.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.prHepatitis.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('elisa').setValue(configuracion.laboratorios.elisa.valor);
        this.form.get('elisaFecha').setValue(configuracion.laboratorios.elisa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.elisa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('toleranciaGlucosa').setValue(configuracion.laboratorios.toleranciaGlucosa.valor);
        this.form.get('toleranciaGlucosaFecha').setValue(configuracion.laboratorios.toleranciaGlucosa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.toleranciaGlucosa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('glicemia').setValue(configuracion.laboratorios.glicemia.valor);
        this.form.get('glicemiaFecha').setValue(configuracion.laboratorios.glicemia.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.glicemia.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('exaOrina').setValue(configuracion.laboratorios.exaOrina.valor);
        this.form.get('exaOrinaFecha').setValue(configuracion.laboratorios.exaOrina.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.exaOrina.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('bacteriuria').setValue(configuracion.laboratorios.bacteriuria.valor);
        this.form.get('bacteriuriaFecha').setValue(configuracion.laboratorios.bacteriuria.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.bacteriuria.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('nitritos').setValue(configuracion.laboratorios.nitritos.valor);
        this.form.get('nitritosFecha').setValue(configuracion.laboratorios.nitritos.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.nitritos.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('urocultivo').setValue(configuracion.laboratorios.urocultivo.valor);
        this.form.get('urocultivoFecha').setValue(configuracion.laboratorios.urocultivo.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.urocultivo.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('bkEsputo').setValue(configuracion.laboratorios.bkEsputo.valor);
        this.form.get('bkEsputoFecha').setValue(configuracion.laboratorios.bkEsputo.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.bkEsputo.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('wsternBlotlfi').setValue(configuracion.laboratorios.wsternBlotlfi.valor);
        this.form.get('wsternBlotlfiFecha').setValue(configuracion.laboratorios.wsternBlotlfi.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.wsternBlotlfi.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('thlv1').setValue(configuracion.laboratorios.thlv1.valor);
        this.form.get('thlv1Fecha').setValue(configuracion.laboratorios.thlv1.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.thlv1.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('torch').setValue(configuracion.laboratorios.torch.valor);
        this.form.get('torchFecha').setValue(configuracion.laboratorios.torch.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.torch.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('gotaGruesa').setValue(configuracion.laboratorios.gotaGruesa.valor);
        this.form.get('gotaGruesaFecha').setValue(configuracion.laboratorios.gotaGruesa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.gotaGruesa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('proteinuriaCuantitativa').setValue(configuracion.laboratorios.proteinuriaCuantitativa.valor);
        this.form.get('proteinuriaCuantitativaFecha').setValue(configuracion.laboratorios.proteinuriaCuantitativa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.proteinuriaCuantitativa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('proteinuriaCualitativa').setValue(configuracion.laboratorios.proteinuriaCualitativa.valor);
        this.form.get('proteinuriaCualitativaFecha').setValue(configuracion.laboratorios.proteinuriaCualitativa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.proteinuriaCualitativa.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('exSecV').setValue(configuracion.laboratorios.exSecV.valor);
        this.form.get('exSecVFecha').setValue(configuracion.laboratorios.exSecV.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.exSecV.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('pap').setValue(configuracion.laboratorios.pap.valor);
        this.form.get('papFecha').setValue(configuracion.laboratorios.pap.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.pap.fecha), 'yyyy-MM-ddTHH:mm') : "");
        this.form.get('ivaa').setValue(configuracion.laboratorios.ivaa.valor);
        this.form.get('ivaaFecha').setValue(configuracion.laboratorios.ivaa.fecha ?
            this.datePipe.transform(new Date(configuracion.laboratorios.ivaa.fecha), 'yyyy-MM-ddTHH:mm') : "");

        this.form.get('ecografiaEdadSemanas').setValue(configuracion.ecografia.semanas);
        this.form.get('ecografiaEdadDias').setValue(configuracion.ecografia.dias);
        this.form.get('descripcionEcografia').setValue(configuracion.ecografia.observaciones);
        this.form.get('ecografiaFecha').setValue(configuracion.ecografia.fecha ?
            this.datePipe.transform(new Date(configuracion.ecografia.fecha), 'yyyy-MM-ddTHH:mm') : "");

        this.datosExamenesFetales = configuracion.examenesFetos;
        this.datosDiagnosticos = configuracion.diagnosticos;
        this.datosTratamientos = configuracion.tratamientos;
        this.datosInterconsultas = configuracion.interconsultas;
        this.datosExamenesAuxiliares = configuracion.examenesAuxiliares;
        this.datosRecomendaciones = configuracion.recomendaciones;
        this.datosInmunizaciones = configuracion.inmunizaciones;

        if (configuracion.examenesFisicos.length > 9) {
            //console.log(configuracion.examenesFisicos.length);
            for (let i = 0; i < configuracion.examenesFisicos.length - 9; i++) {
                //console.log("entre bucle");
                this.datosOtrosPruebasFisicas.push(configuracion.examenesFisicos[9 + i]);
                //console.log(this.datosOtrosPruebasFisicas);
            }
        }
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
        //console.log('lista de cie ', this.listaDeCIE);
        if (cieType == 0) {
            this.formDiagnostico.get("diagnostico").setValue(event.descripcionItem);
            this.formDiagnostico.get("autocompleteDiagnostico").setValue("");
            this.formDiagnostico.patchValue({ cie10: event }, { emitEvent: false });
        }
    }


}
