
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { EspecialidadService } from 'src/app/mantenimientos/services/especialidad/especialidad.service';

@Component({
    selector: 'app-dialog-consulta',
    templateUrl: './dialog-consulta.component.html',
    styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

    form: FormGroup;
    formExamenFetal: FormGroup;
    formDiagnostico: FormGroup;
    formTratamiento: FormGroup;
    formRecomendacion: FormGroup;
    formInmunizacion: FormGroup;
    formInterconsulta: FormGroup;

    prueba: any[];
    isUpdate: boolean = false;
    
    examenFetalDialog: boolean;
    diagnosticoDialog: boolean;
    tratamientoDialog: boolean;
    recomendacionDialog: boolean;
    inmunizacionDialog: boolean;
    interconsultaDialog: boolean;

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
    listaEdema= [
        { name: "+", code: "1" },
        { name: "++", code: "2" },
        { name: "+++", code: "3" },
        { name: "es", code: "4" },
    ];
    listaIndicadores=[
        { name: "GAP", code: "1" },
        { name: "GEP", code: "2" },
        { name: "GIP", code: "3" },
    ];
    opciones = [
        {name: 'Si', code: 'Si'},
        {name: 'No', code: 'No'},
    ];

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
    ) {
        this.prueba = [{
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de alerta",
        },
        {
            tratamientos: "Mantener Reposo",
            diagnostico: "Presenta sintomas leves",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de peligro",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas leves",
        }]
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
            consultorio_referencia: new FormControl(""),
            motivo_referencia: new FormControl(""),
            codRENAES_referencia: new FormControl(""),

            //proxCita
            proxCita: new FormControl(""),

            //suplementos
            acidoFolicoDescripcion: new FormControl(""),
            acidoFolicoNumero: new FormControl(""),
            acidoFolicoDosis: new FormControl(""),
            acidoFolicoViaAdministracion: new FormControl(""),
            acidoFolicoFrecuencia: new FormControl(""),
            hierroYAcidoFolicoDescripcion: new FormControl(""),
            hierroYAcidoFolicoNumero: new FormControl(""),
            hierroYAcidoFolicoDosis: new FormControl(""),
            hierroYAcidoFolicoViaAdministracion: new FormControl(""),
            hierroYAcidoFolicoFrecuencia: new FormControl(""),
            calcioDescripcion: new FormControl(""),
            calcioNumero: new FormControl(""),
            calcioDosis: new FormControl(""),
            calcioViaAdministracion: new FormControl(""),
            calcioFrecuencia: new FormControl(""),

            //visita domiciliaria
            visitaDomiciliariaEstado: new FormControl(""),
            visitaDomiciliariaFecha: new FormControl(""),

            proteinuria: new FormControl(""),

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
            frecuencia: new FormControl(""),
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
        
    }
    openNewExamenFetal() {
        //this.isUpdate = false;
        this.formExamenFetal.reset();
        this.examenFetalDialog = true;
    }
    openNewDiagnostico() {
        //this.isUpdate = false;
        this.formDiagnostico.reset();
        this.diagnosticoDialog = true;
    }
    openNewTratamiento() {
        //this.isUpdate = false;
        this.formTratamiento.reset();
        this.tratamientoDialog = true;
    }
    openNewInterconsulta() {
        //this.isUpdate = false;
        this.formInterconsulta.reset();
        this.interconsultaDialog = true;
    }
    openNewRecomendacion() {
        //this.isUpdate = false;
        this.formRecomendacion.reset();
        this.recomendacionDialog = true;
    }
    openNewInmunizacion() {
        //this.isUpdate = false;
        this.formInmunizacion.reset();
        this.inmunizacionDialog = true;
    }
    closeDialog() {
        this.ref.close();
    }
}
