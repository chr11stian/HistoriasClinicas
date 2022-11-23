import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { CieService } from "../../../../../services/cie.service";
import { ConsultasService } from "../../services/consultas.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { Diagnostic, DiagnosticFUA, DiagnosticHIS, DiagnosticSave, Prestation } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/FUAHIS';
import { DiagnosticoConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/diagnostico-consulta.service';
@Component({
    selector: 'app-giagnosticos',
    templateUrl: './giagnosticos.component.html',
    styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {
    selectedDiagnostico: any;
    opcionBusqueda: string;
    /**Recupera el Id del Consultorio Obstetrico**/
    idConsultoriObstetrico: string;
    form: FormGroup
    /*****PROPIEDADES del diagnositico**********/
    diagnosticoDialog: boolean;
    cronogramaDialog: boolean = false;
    diagnosticos: any[] = [];
    /******** PROPIEDADES de orientaciones******/
    data2: any[] = []; // data orientaciones
    isUpdate: boolean = false;
    // orientacionesDialog: boolean;
    /****LISTA CIE 10*****/
    Cie10: any;
    displayModal: boolean;
    /******PROPIEDADES DE DATOS ADICIONALES**********/
    form2: FormGroup; /*FORM DE ORIENTACIONES*/
    planPartoList: any[];
    visitaDomiciliariaList: any[];
    formOtrosDatos: FormGroup;
    referencia: any;
    proxCita: any;
    orientaciones: any[] = [];
    cronograma: any[] = [];
    /*******DATA AUX PARA RECUPERAR DE LA BD*******/
    dataAux: any;
    dataAux2: any;

    datePipe = new DatePipe('en-US');
    visitaDomiciliaria: any;
    testDialog: boolean = false;
    /****** Data recuperada********/
    private edadGestacional: any;
    private planPartoReenfocada: any;
    /********Lista tipo Dx*****/
    tipoList: any[] = [];
    eleccion: any;
    private nroFetos = 0;
    private encontradoDxTuberculosis: boolean = false;

    hoy: any = (new Date()).getTime();
    listaDeCIE: any;
    listaDeCIESIS: any;

    prestacionList: any[];
    upsList: any[];

    idConsulta: string;
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;
    nroHcl: string;

    Gestacion: any;
    dataPaciente2: any;
    estadoEdicion: Boolean;

    nroAtencion: any;
    opciones: any;

    listaUpsHis: any;
    listaUps: any;
    idIpress: any;
    edadPaciente: any;
    sexoPaciente: any;
    /** new var */
    fuaForm: FormGroup;
    hisForm: FormGroup;
    patientData: Patient;
    arrayPrestation: Prestation[] = [];
    arrayFuaDiagnostic: Diagnostic[] = [];
    arrayDiagnosticType: Lista[] = []
    arrayDiagnosticFUA: DiagnosticFUA[] = [];
    arrayDiagnosticHIS: DiagnosticHIS[] = [];
    arrayUPS: UPS[] = [];
    arrayUPSAux: UPSaux[] = [];
    arrayDiagnosticSave: DiagnosticSave[] = [];
    isSaved: boolean = false;
    listaDeCIEHIS: any[] = [];
    idConsult: string;
    arrayPrestationAuto: any;
    arrayfirstBatery: FirstBatery[] = [
        { diagnosticoHIS: "GESTANTE CON FACTOR DE RIESGO CONTROL 1ER. TRIMESTRE (14 SEMANAS)", CIE10: "Z3591", lab: "1" },
        { diagnosticoHIS: "PLAN DE ATENCION DE PARTO", CIE10: "U1692", lab: "1" },
        { diagnosticoHIS: "DOSAJE DE HEMOGLOBINA", CIE10: "85018", lab: "1" },
        { diagnosticoHIS: "GESTANTE CON BAJO PESO", CIE10: "O261", lab: "" },
        { diagnosticoHIS: "", CIE10: "", lab: "" },
        { diagnosticoHIS: "SUPLEMENTACIÓN DE ÁCIDO FÓLICO", CIE10: "99199.18", lab: "1" },
        { diagnosticoHIS: "CONSEJERÍA NUTRICIONAL: ALIMENTACIÓN SALUDABLE", CIE10: "99403.01", lab: "1" },
        { diagnosticoHIS: "TOMA DE PAP", CIE10: "88141", lab: "" },//FALTA
        { diagnosticoHIS: "CONSEJERÍA PREVENTIVA EN FACTORES DE RIESGO PARA EL CÁNCER", CIE10: "99402.08", lab: "1" },
        { diagnosticoHIS: "TAMIZAJE DE BACTERIURIA ASINTOMATICA", CIE10: "81002", lab: "RN" },//CORREGIR
        { diagnosticoHIS: "CONSEJERÍA PRETEST PARA VIH", CIE10: "99401.33", lab: "1" },
        { diagnosticoHIS: "ANTICUERPOS HIV-1 Y HIV-2 ANÁLISIS ÚNICO", CIE10: "86703", lab: "RN" },
        { diagnosticoHIS: "CONSEJERÍA POSTEST PARA VIH - RESULTADO NO REACTIVO", CIE10: "99401.34", lab: "1" },
        { diagnosticoHIS: "ANTICUERPO TREPONEMA PALLIDUM PRUEBA RÁPIDA SIFILIS", CIE10: "86780", lab: "RN" },//CORREGIR
        { diagnosticoHIS: "DETECCIÓN DE HEPATITIS B (HBSAG)", CIE10: "87342", lab: "RN" },
        { diagnosticoHIS: "CONSEJERÍA/ORIENTACIÓN EN PREVENCIÓN DE ITS VIH HEPATITIS B", CIE10: "99402.05", lab: "1" },
    ]
    consultationStatus$ = this.obstetriciaGeneralService.consultationStatus$;
    consultationFinished: boolean = false;
    actualConsultation: any;

    constructor(private formBuilder: FormBuilder,
        private PrestacionService: PrestacionService,
        private CieService: CieService,
        private messageService: MessageService,
        private DxService: ConsultasService,
        private DiagnosticoService: DiagnosticoConsultaService,
        private cieService: CieService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
    ) {
        this.buildForm();

        /*********RECUPERAR DATOS*********/
        this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
        this.idConsult = JSON.parse(localStorage.getItem('IDConsulta'))

        /*usando local storage*/
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
        this.edadPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.edadAnio;
        this.sexoPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.sexo;
        this.actualConsultation = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.actualConsultation ? this.actualConsultation.estadoAtencion == 2 ? this.consultationFinished = true : this.consultationFinished = false : this.consultationFinished = false;
        this.recuperarUpsHis();
        this.recuperarUPS();
        //estado para saber que estado usar en consultas
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

        // console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
        // console.log("gestacion desde datos generales", this.Gestacion);

        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
            this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
            this.nroHcl = this.dataPaciente2.nroHcl;

        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idConsulta = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }
        if (!this.estadoEdicion) {
            //guardar en el ls el nroAtencion
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
            this.nroAtencion = nroAtencion;
            // console.log("entre a nueva consulta", this.nroAtencion)
        }
        else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            // console.log("entre a edicion consulta", this.nroAtencion)
        }

        /***************DATOS DE LOS DROPDOWNS*******************/
        /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR TIPO DX*/
        this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
        { label: 'PRESUNTIVO', value: 'P' },
        { label: 'REPETITIVO', value: 'R' },
        ];
        this.planPartoList = [{ label: 'CONTROL', value: 'CONTROL' },
        { label: 'VISITA', value: 'VISITA' },
        { label: 'NO SE HIZO', value: 'NO SE HIZO' },
        { label: 'NO APLICA', value: 'NO APLICA' }
        ];
        this.visitaDomiciliariaList = [
            { label: 'SI', value: 'SI' },
            { label: 'NO', value: 'NO' },
            { label: 'NO APLICA', value: 'NO APLICA' }
        ];
        this.opciones = [
            { name: 'SI', boleano: true },
            { name: 'NO', boleano: false }
        ];
        this.patientData = JSON.parse(localStorage.getItem('datacupos')).paciente;
        // console.log('patient data ', this.patientData);
        this.arrayDiagnosticType = [
            { label: "DEFINITIVO", value: "D" },
            { label: "PRESUNTIVO", value: "P" },
            { label: "REPETITIVO", value: "R" },
        ];
    }
    ngOnInit() {
        this.recuperarPrestaciones();
        this.recuperarNroFetos();
        // this.recuperarDatosGuardados();
        this.getUpsPerIpress();
        this.recoverConsultationDiagnostic();
    }

    recuperarUpsHis() {
        let Data = {
            idIpress: this.idIpress,
            edad: this.edadPaciente,
            sexo: this.sexoPaciente
        }
        // console.log("DATA PARA UPS HIS", Data)
        this.DxService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
    }
    recuperarUPS() {
        this.DxService.listaUps(this.idIpress).then((res: any) => this.listaUps = res.object);
        // console.log("DATA PARA UPS", this.listaUps)
    }
    recuperarNroFetos() {
        let idData = {
            id: this.idConsulta
        }
        this.DxService.getUltimaConsultaById(idData).subscribe((res: any) => {
            this.nroFetos = res.object.nroFetos;
            // console.log("nroFetos:", this.nroFetos)
        })
    }
    showModalDialog() {
        this.displayModal = true;
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipo: ['', [Validators.required]],
            prestacion: ['', [Validators.required]],
            ups: ['', [Validators.required]],
            subtitulo: ['', [Validators.required]],
            autocompleteSIS: [''],
            diagnosticoSIS: ['', [Validators.required]],
            SISCIE: ['', [Validators.required]],
            autocompleteHIS: [''],
            diagnosticoHIS: ['', [Validators.required]],
            HISCIE: ['', [Validators.required]],
            patologiaMaterna: ['', [Validators.required]],
            lab: [''],

        });
        this.form2 = this.formBuilder.group({
            orientaciones: ['', [Validators.required]],
            /****ATENCION INTEGRAL******/
            OrientaciónConsejeríaSignosAlarma: new FormControl(''),
            ConsejeríaEnfermedadesComunes: new FormControl(''),
            SospechasTuberculosis: new FormControl(''),
            InfeccionesTransmisiónSexual: new FormControl(''),
            OrientaciónNutricional: new FormControl(''),
            OrientaciónPlanificaiónFamiliar: new FormControl(''),
            OrientaciónPrevenciónDeCancerGinecológico: new FormControl(''),
            OrientaciónConsejeriaPretestVIH: new FormControl(''),
            OrientaciónConsejeriaPostestVIH: new FormControl(''),
            OrientaciónEnEstilosDeVidaSaludable: new FormControl(''),
            OrientaciónAcompañante: new FormControl(''),
            ViolenciaFamiliar: new FormControl(''),
            PlanDeParto: new FormControl(''),
        });
        this.formOtrosDatos = this.formBuilder.group({
            consultorio: ['', [Validators.required]],
            motivo: ['', [Validators.required]],
            codRENAES: ['', [Validators.required]],
            proxCita: ['', [Validators.required]],
            planPartoReenfocada: ['', [Validators.required]],
            visita: ['', [Validators.required]],
            fechaVisita: ['', [Validators.required]]
        });
        this.fuaForm = new FormGroup({
            prestacion: new FormControl("", Validators.required),
            tipoDiagnosticoFUA: new FormControl('', Validators.required),
            diagnosticoFUA: new FormControl(''),
            codCIE10SIS: new FormControl('', Validators.required),
            diagnosticoSIS: new FormControl('', Validators.required),
        });
        this.hisForm = new FormGroup({
            nombreUPS: new FormControl("", Validators.required),
            nombreUPSAux: new FormControl("", Validators.required),
            tipoDiagnosticoHIS: new FormControl("", Validators.required),
            lab: new FormControl(""),
            buscarPDxHIS: new FormControl(""),
            codProcedimientoHIS: new FormControl("", Validators.required),
            procedimientoHIS: new FormControl("", Validators.required),
        })
    }
    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }


    filterCIE10(event) {
        let param: string = event.query.toUpperCase();
        this.CieService.getPromiseCIEByDescripcion(param).then((res: any) => this.listaDeCIEHIS = res.object);
        // this.CieService.getCIEByDescripcionTipo('CX', event.query).subscribe((res: any) => {
        //     this.listaDeCIE = res.object
        // })
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.form.patchValue({ diagnosticoSIS: event.value.diagnostico });
        }
        if (cieType == 1) {
            this.form.patchValue({ diagnosticoHIS: event.descripcionItem });
        }
    }

    selectedOptionNameCIE(event, cieType) {
        // console.log('lista de cie ', this.listaDeCIE);
        // console.log('evento desde diagnos ', event);
        if (cieType == 0) {
            this.form.patchValue({ diagnosticoSIS: event.value.diagnostico });
            this.form.patchValue({ autocompleteSIS: "" });
            this.form.patchValue({ SISCIE: event.value }, { emitEvent: false });
            // console.log(event.value)
        }
        if (cieType == 1) {
            this.form.patchValue({ diagnosticoHIS: event.descripcionItem });
            this.form.patchValue({ autocompleteHIS: "" });
            this.form.patchValue({ HISCIE: event }, { emitEvent: false });
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    recuperarPrestaciones() {
        this.DxService.getPrestaciones().subscribe((res: any) => {
            this.arrayPrestation = res.object;
            // console.log("prestaciones:", this.arrayPrestation);
            this.verifyPrestationPerAge(this.arrayPrestation, this.patientData);
        })
    }

    verifyPrestationPerAge(arrayPrestaciones: Prestation[], paciente: Patient): void {
        let monthAge = 12 * paciente.edadAnio + paciente.edadMes;
        let yearAge = paciente.edadAnio;
        let auxPrestacion: Prestation[] = [];
        arrayPrestaciones.forEach(item => {
            switch (item.denominacion) {
                case 'ANIOS':
                    if (item.edadMin <= yearAge && item.edadMax >= yearAge) {
                        auxPrestacion.push(item);
                    }
                    break;
                case 'MESES':
                    if (item.edadMin <= monthAge && item.edadMax >= monthAge) {
                        auxPrestacion.push(item);
                    }
                    break
                default:
                    // console.log('caso no evaluado');
                    break;
            }
        })
        this.arrayPrestation = auxPrestacion.filter(item => item.diagnostico != null);
        this.arrayPrestation.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
        // console.log('data de arreglo prestacion ', this.arrayPrestation);
    }

    getUpsPerIpress() {
        let data = {
            idIpress: this.idIpress,
            edad: this.patientData.edadAnio,
            sexo: this.patientData.sexo
        }
        this.DiagnosticoService.listaUpsHis(data).then((res: any) => {
            this.arrayUPS = res.object;
        });
        this.DiagnosticoService.listaUpsAuxHisPerIpress(this.idIpress).then((res: any) => {
            this.arrayUPSAux = res.object
        })
    }

    onChangePrestacion() {
        const dataPrestacion: Prestation = this.fuaForm.value.prestacion;
        this.arrayFuaDiagnostic = dataPrestacion.diagnostico;
    }

    onchangeSIS(event): void {
        this.fuaForm.patchValue({
            diagnosticoSIS: event.value.diagnostico,
            diagnosticoFUA: "",
            codCIE10SIS: event.value
        });
    }
    onChangeHIS(event): void {
        this.hisForm.patchValue({
            codProcedimientoHIS: event,
            buscarPDxHIS: "",
            procedimientoHIS: event.descripcionItem
        });
    }

    agregateDiagnosticFUA(): void {
        let isAdded: boolean = false;
        if (this.fuaForm.valid) {
            let FUAdiagnostic: DiagnosticFUA = {
                codPrestacion: this.fuaForm.value.prestacion.codigo,
                tipoDiagnostico: this.fuaForm.value.tipoDiagnosticoFUA,
                diagnostico: this.fuaForm.value.diagnosticoSIS,
                CIE10: this.fuaForm.value.codCIE10SIS.cie10
            }
            this.arrayDiagnosticFUA.forEach(item => {
                if (item.CIE10 === FUAdiagnostic.CIE10) {
                    this.repeatDataMessage();
                    isAdded = true;
                }
            })
            if (!isAdded) {
                this.arrayDiagnosticFUA.push(FUAdiagnostic);
                this.fuaForm.reset();
            }

        } else
            this.missDataMessage();
    }
    agregateDiagnosticHIS(): void {
        let isAdded: boolean = false;
        if (this.hisForm.valid) {
            let HISdiagnostic: DiagnosticHIS = {
                nombreUPS: this.hisForm.value.nombreUPS.nombreUPS,
                nombreUPSaux: this.hisForm.value.nombreUPSAux.nombre,
                tipoDiagnostico: this.hisForm.value.tipoDiagnosticoHIS,
                lab: this.hisForm.value.lab,
                diagnosticoHIS: this.hisForm.value.procedimientoHIS,
                CIE10: this.hisForm.value.codProcedimientoHIS.codigoItem,
            }
            this.arrayDiagnosticHIS.forEach(item => {
                if (item.CIE10 === HISdiagnostic.CIE10) {
                    this.repeatDataMessage();
                    isAdded = true;
                }
            });
            if (!isAdded) {
                this.arrayDiagnosticHIS.push(HISdiagnostic);
                this.hisForm.patchValue({
                    tipoDiagnosticoHIS: '',
                    lab: '',
                    codProcedimientoHIS: '',
                    procedimientoHIS: ''
                });
            }
        } else
            this.missDataMessage();
    }
    mergeArrayDiagnostic(diagnosticosSIS: DiagnosticFUA[], diagnosticosHIS: DiagnosticHIS[], diagnosticos: DiagnosticSave[]): void {
        diagnosticosSIS.forEach(item => {
            let auxDiagnostic: DiagnosticSave = {
                diagnosticoHIS: null,
                diagnosticoSIS: item.diagnostico,
                cie10SIS: item.CIE10,
                cie10HIS: null,
                tipo: item.tipoDiagnostico,
                codPrestacion: item.codPrestacion,
                nombreUPS: null,
                nombreUPSaux: null,
                lab: null,
            }
            diagnosticos.push(auxDiagnostic)
        });
        diagnosticosHIS.forEach(item => {
            let auxDiagnostic: DiagnosticSave = {
                diagnosticoHIS: item.diagnosticoHIS,
                diagnosticoSIS: null,
                cie10SIS: null,
                cie10HIS: item.CIE10,
                tipo: item.tipoDiagnostico,
                codPrestacion: null,
                nombreUPS: item.nombreUPS,
                nombreUPSaux: item.nombreUPSaux,
                lab: item.lab,
            }
            diagnosticos.push(auxDiagnostic)
        });
    }

    async saveDiagnostico(): Promise<void> {
        this.arrayDiagnosticSave = [];
        this.mergeArrayDiagnostic(this.arrayDiagnosticFUA, this.arrayDiagnosticHIS, this.arrayDiagnosticSave);
        if (this.arrayDiagnosticSave.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'No se agrego ningun procedimiento',
                text: '',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        await this.DiagnosticoService.postDiagnosticToPregmant(this.idConsult, this.arrayDiagnosticSave).then((res: any) => {
            if (res.cod == '2001') {
                Swal.fire({
                    icon: 'success',
                    title: 'Se guardo exitosamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
            if (res.cod == '2126') {
                Swal.fire({
                    icon: 'success',
                    title: 'Se actualizó exitosamente',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudoo guardar.',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
    }

    confirmToSave(): void {
        Swal.fire({
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Guardar',
            icon: this.isSaved ? 'info' : 'question',
            title: this.isSaved ? 'Actualizar' : 'Guardar',
            text: this.isSaved ? 'Se podria modificar los Procedimientos' : '¿Esta seguro que desea guardar los diagnosticos?',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                this.saveDiagnostico();
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No se guardo',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
    }
    recoverConsultationDiagnostic(): void {
        this.DxService.getDiagnosticByIdConsulta(this.idConsult).then((res: any) => {
            let dataRes: DiagnosticSave[] = res.object;
            if (dataRes == null) {
                return;
            }
            dataRes.forEach(item => {
                if (item.codPrestacion != null) {
                    let diagnostic: DiagnosticFUA = {
                        codPrestacion: item.codPrestacion,
                        diagnostico: item.diagnosticoSIS,
                        CIE10: item.cie10SIS,
                        tipoDiagnostico: item.tipo
                    }
                    this.arrayDiagnosticFUA.push(diagnostic);
                } else {
                    let diagnostic: DiagnosticHIS = {
                        nombreUPS: item.nombreUPS,
                        nombreUPSaux: item.nombreUPSaux,
                        diagnosticoHIS: item.diagnosticoHIS,
                        tipoDiagnostico: item.tipo,
                        CIE10: item.cie10HIS,
                        lab: item.lab
                    }
                    this.arrayDiagnosticHIS.push(diagnostic);
                }
            });
            this.isSaved = true;
        })
    }

    deleteItemOfArray(index: number, type: number): void {
        /**type:0=> lista de diagnosticos FUA; 1=> lista de diagnosticos HIS */
        type == 0 ? this.arrayDiagnosticFUA.splice(index, 1) : this.arrayDiagnosticHIS.splice(index, 1);
    }

    missDataMessage(): void {
        Swal.fire({
            icon: 'info',
            title: 'Falta llenar campos',
            text: '',
            showConfirmButton: false,
            timer: 2000
        });
    }
    repeatDataMessage(): void {
        Swal.fire({
            icon: 'info',
            title: 'Ya se agrego ese item',
            text: '',
            showConfirmButton: false,
            timer: 2000
        });
    }

    filterPrestation(event): void {
        this.cieService.getAuctocompleteByCodAndDescripcion(event.query).then((res: any) => {
            this.arrayPrestation = res.object;
        })
    }

    loadFirstBatery(arrayBatery: FirstBatery[]): DiagnosticHIS[] {
        let arrayDiagnosticHIS: DiagnosticHIS[] = [];
        arrayBatery.forEach(item => {
            // console.log('arreglo first');
            let HISdiagnostic: DiagnosticHIS = {
                nombreUPS: "OBSTETRICIA",
                nombreUPSaux: "CRED",
                tipoDiagnostico: "D",
                lab: item.lab,
                diagnosticoHIS: item.diagnosticoHIS,
                CIE10: item.CIE10,
            }
            arrayDiagnosticHIS.push(HISdiagnostic);
        });

        return arrayDiagnosticHIS;
    }
}
interface Lista {
    label: string;
    value: string;
}
interface UPS {
    codUPS: string;
    nombreUPS: string;
}
interface UPSaux {
    estado: boolean;
    nombre: string;
}
interface Patient {
    apellidos: string,
    edadAnio: number,
    edadDia: number,
    edadMes: number,
    nombre: string,
    nroDoc: string,
    nroHcl: string,
    nroTelefono: string,
    sexo: string,
    tipoDoc: string,
}
interface FirstBatery {
    diagnosticoHIS: string;
    CIE10: string;
    lab: string
}