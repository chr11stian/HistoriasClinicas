import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { CieService } from "../../../../../services/cie.service";
import { ConsultasService } from "../../services/consultas.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
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
    constructor(private formBuilder: FormBuilder,
        private PrestacionService: PrestacionService,
        private CieService: CieService,
        private messageService: MessageService,
        private DxService: ConsultasService) {
        this.buildForm();

        /*********RECUPERAR DATOS*********/
        this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
        console.log("ipress", this.idIpress)

        /*usando local storage*/
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
        this.edadPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.edadAnio;
        this.sexoPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.sexo;
        this.recuperarUpsHis();
        this.recuperarUPS();
        //estado para saber que estado usar en consultas
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

        console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
        console.log("gestacion desde datos generales", this.Gestacion);

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
            console.log("entre a nueva consulta", this.nroAtencion)
        }
        else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            console.log("entre a edicion consulta", this.nroAtencion)
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
    }
    ngOnInit() {
        console.log("TipoDocRecuperado desde diagnostico", this.tipoDocRecuperado);
        console.log("NroDocRecuparado desde diagnostico", this.nroDocRecuperado);
        console.log("Nro de embarazo desde diagnostico", this.nroEmbarazo);
        console.log("Id Consultorio Obstetrico desde diagnostico", this.idConsultoriObstetrico);
        console.log("nroHcl desde diagnostico", this.nroHcl);
        this.recuperarPrestaciones();
        this.recuperarNroFetos();
        this.recuperarDatosGuardados();
    }
    recuperarPrestaciones() {
        this.DxService.getPrestaciones().subscribe((res: any) => {
            this.prestacionList = res.object;
            console.log("prestaciones:", this.prestacionList);
        })
    }
    recuperarUpsHis() {
        let Data = {
            idIpress: this.idIpress,
            edad: this.edadPaciente,
            sexo: this.sexoPaciente
        }
        console.log("DATA PARA UPS HIS", Data)
        this.DxService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
    }
    recuperarUPS() {
        this.DxService.listaUps(this.idIpress).then((res: any) => this.listaUps = res.object);
        console.log("DATA PARA UPS", this.listaUps)
    }
    recuperarNroFetos() {
        let idData = {
            id: this.idConsulta
        }
        this.DxService.getUltimaConsultaById(idData).subscribe((res: any) => {
            this.nroFetos = res.object.nroFetos;
            console.log("nroFetos:", this.nroFetos)
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
    }

    /*guardar datos de diagnosticos*/
    save1(form: any) {
        // this.messageService.add({ severity: 'info', summary: 'Recuperado', detail: 'Diagnostico no válido vuelva a ingresar.' });
        this.isUpdate = false;
        let bandera: boolean = false;
        let data = {
            //nro: this.diagnosticos.length + 1,
            diagnosticoHIS: this.form.value.diagnosticoHIS,
            cie10HIS: this.form.value.HISCIE.codigoItem,
            diagnosticoSIS: this.form.value.diagnosticoSIS,
            cie10SIS: this.form.value.SISCIE.cie10,
            tipo: this.form.value.tipo,
            codPrestacion: this.form.value.prestacion.codigo,
            nombreUPS: this.form.value.ups,
            nombreUPSaux: this.form.value.subtitulo,
            lab: this.form.value.lab,
            factorCondicional: null,
            patologiaMaterna: this.form.value.patologiaMaterna,
        }
        console.log(data)
        //enviar una consulta para guardar diagnostico
        this.DxService.guardarDiagnosticoDeGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then(
            (resp) => {
                console.log(resp);
                this.diagnosticoDialog = false;
                this.recuperarDatosGuardados();
            })
    }

    saveActualizarDiagnostico(form: any) {
        // this.messageService.add({ severity: 'info', summary: 'Recuperado', detail: 'Diagnostico no válido vuelva a ingresar.' });
        this.isUpdate = false;
        let data = {
            //nro: this.diagnosticos.length + 1,
            diagnosticoHIS: this.form.value.diagnosticoHIS,
            cie10HIS: this.form.value.HISCIE.codigoItem,
            diagnosticoSIS: this.form.value.diagnosticoSIS,
            cie10SIS: this.form.getRawValue().SISCIE.cie10,
            tipo: this.form.value.tipo,
            codPrestacion: this.form.getRawValue().prestacion.codigo,
            nombreUPS: this.form.value.ups,
            nombreUPSaux: this.form.value.subtitulo,
            lab: this.form.value.lab,
            factorCondicional: null,
            patologiaMaterna: this.form.value.patologiaMaterna,
        }
        console.log(data)
        //enviar una consulta para guardar diagnostico
        this.DxService.actualizarDiagnosticoDeGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then(
            (resp) => {
                console.log(resp);
                this.diagnosticoDialog = false;
                this.recuperarDatosGuardados();
            })
    }
    /******ABRIR DIALOGS DX****/
    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('prestacion').enable();
        this.form.get('autocompleteSIS').enable();
        this.form.get('SISCIE').enable();
        this.form.get('diagnosticoSIS').setValue("");
        this.form.get('diagnosticoHIS').setValue("");
        this.form.get('ups').setValue("OBSTETRICIA");
        this.form.get('subtitulo').setValue("MATERNO PERINATAL");
        this.listaDeCIESIS = [];
        this.diagnosticoDialog = true;
    }
    canceled1() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.diagnosticoDialog = false;
    }
    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }
    editarDx(rowData) {
        this.isUpdate = true;
        this.form.reset();
        this.form.get('prestacion').setValue(this.prestacionList.find(element => element.codigo == rowData.codPrestacion));
        this.form.get('tipo').setValue(rowData.tipo);
        this.form.get('diagnosticoSIS').setValue(rowData.diagnosticoSIS);
        this.form.get('diagnosticoHIS').setValue(rowData.diagnosticoHIS);
        this.form.get('ups').setValue(rowData.nombreUPS);
        this.form.get('subtitulo').setValue(rowData.nombreUPSaux);
        this.form.get('lab').setValue(rowData.lab);
        this.form.get('patologiaMaterna').setValue(rowData.patologiaMaterna);
        this.PrestacionService.getDiagnosticoPorCodigo(rowData.codPrestacion).subscribe((res: any) => {
            this.listaDeCIESIS = res.object.diagnostico;
            console.log(this.listaDeCIESIS)
            this.form.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.cie10 == rowData.cie10SIS) });
        })
        this.CieService.getCIEByDescripcion(rowData.cie10HIS).subscribe((res: any) => {
            this.listaDeCIE = res.object;
            this.form.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == rowData.cie10HIS) });
        })
        this.form.get('prestacion').disable();
        this.form.get('autocompleteSIS').disable();
        this.form.get('SISCIE').disable();
        this.diagnosticoDialog = true;
        console.log("modificando", rowData);
    }
    /*ELIMINAR DATOS DE LAS TABLAS*/
    eliminarDx(index) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.DxService.eliminarDiagnosticoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, index).subscribe(
                    (resp) => {
                        console.log(resp);
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado correctamente',
                            text: '',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.recuperarDatosGuardados();
                    })
            }
        })
    }
    enviarDatosRefProxCita() {
        //this.proxCita = { fecha: this.datePipe.transform(this.formOtrosDatos.value.proxCita, 'yyyy-MM-dd') }
        this.visitaDomiciliaria = {
            estado: this.formOtrosDatos.value.visita,
            fecha: this.datePipe.transform(this.formOtrosDatos.value.fechaVisita, 'yyyy-MM-dd HH:mm:ss')
        }
        this.planPartoReenfocada = this.formOtrosDatos.value.planPartoReenfocada
    }

    guardarTodosDatos() {
        this.enviarDatosRefProxCita();
        const req = {
            id: this.idConsultoriObstetrico,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            // referencia: this.referencia,
            visitaDomiciliaria: this.visitaDomiciliaria,
            planParto: this.planPartoReenfocada,
            orientaciones: [
                {
                    consejeria: "Orientación y consejería signos de alarma",
                    valor: this.form2.value.OrientaciónConsejeríaSignosAlarma,
                    cie10: "3232"
                },
                {
                    consejeria: "Consejería en enfermedades comunes",
                    valor: this.form2.value.ConsejeríaEnfermedadesComunes,
                    cie10: "1212"
                },
                {
                    consejeria: "Sospechas de tuberculosis",
                    valor: this.form2.value.SospechasTuberculosis,
                    cie10: "2232"
                },
                {
                    consejeria: "Infecciones de transmisión sexual",
                    valor: this.form2.value.InfeccionesTransmisiónSexual,
                    cie10: "4866"
                },
                {
                    consejeria: "Orientación nutricional",
                    valor: this.form2.value.OrientaciónNutricional,
                    cie10: "3233"
                },
                {
                    consejeria: "Orientación en planificación familiar",
                    valor: this.form2.value.OrientaciónPlanificaiónFamiliar,
                    cie10: "7779"
                },
                {
                    consejeria: "Orientación en prevención de cáncer ginecológico",
                    valor: this.form2.value.OrientaciónPrevenciónDeCancerGinecológico,
                    cie10: "8889"
                },
                {
                    consejeria: "Orientación y consej. Pretest. VIH",
                    valor: this.form2.value.OrientaciónConsejeriaPretestVIH,
                    cie10: "7777"
                },
                {
                    consejeria: "Orientación y consej. Postest. VIH",
                    valor: this.form2.value.OrientaciónConsejeriaPostestVIH,
                    cie10: "7777"
                },
                {
                    consejeria: "Consejería en estilos de vida saludable",
                    valor: this.form2.value.OrientaciónEnEstilosDeVidaSaludable,
                    cie10: "44545"
                },
                {
                    consejeria: "Orientación al acompañante",
                    valor: this.form2.value.OrientaciónAcompañante,
                    cie10: "21212"
                },
                {
                    consejeria: "Violencia intrafamiliar",
                    valor: this.form2.value.ViolenciaFamiliar,
                    cie10: "Z6381"
                },
                {
                    consejeria: "Plan de parto",
                    valor: this.form2.value.PlanDeParto,
                    cie10: "U1692"
                },
            ],

        }

        this.DxService.updateConsultas(this.nroFetos, req).subscribe(
            (resp) => {
                console.log(resp);
                console.log(req);

                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        )
    }
    recuperarDatosGuardados() {
        let aux = {
            id: this.idConsultoriObstetrico,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion
        }
        this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
            this.dataAux = res.object;
            console.log("data consulta:" + this.dataAux);

            if (res['cod'] = '2401') {
                if (this.dataAux != null) {
                    console.log(this.dataAux);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Recuperado',
                        detail: 'Registro recuperado satisfactoriamente'
                    });

                    /**********************RECUPERAR DATOS DE ORIENTACIONES********/
                    if (this.dataAux.orientaciones != null) {
                        let y: number = 0;
                        console.log(this.dataAux.orientaciones);
                        // this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro de orientaciones recuperado satisfactoriamente'});
                        while (y < this.dataAux.orientaciones.length) {
                            console.log("orientaciones consta de: ", this.dataAux.orientaciones[y]);
                            if (this.dataAux.orientaciones[y].valor === true) {
                                this.orientaciones.push(this.dataAux.orientaciones[y]);
                            }
                            y++;
                        }
                    }

                    /****************RECUPERAR EDAD GESTACIONAL********************/
                    console.log("edad gestacional:", this.dataAux.edadGestacionalSemanas);
                    if (this.dataAux.edadGestacionalSemanas === null || this.dataAux.edadGestacionalSemanas === undefined) {
                        this.edadGestacional = 0;
                    } else {
                        this.edadGestacional = this.dataAux.edadGestacionalSemanas;
                    }
                    console.log(this.edadGestacional);
                    //this.guardarDiagnosticosEmbarazo();
                    /************************RECUPERAR DATOS EXTRA**************************/

                    if (this.dataAux.visitaDomiciliaria != null) {
                        this.formOtrosDatos.patchValue({ 'visita': this.dataAux.visitaDomiciliaria.estado });
                        this.formOtrosDatos.patchValue({ 'fechaVisita': this.dataAux.visitaDomiciliaria.fecha });
                    }
                    if (this.dataAux.planParto) {
                        this.formOtrosDatos.patchValue({ 'planPartoReenfocada': this.dataAux.planParto });
                    }
                    //RECUPERA DESCARTE ATENCION INTEGRAL
                    this.form2.get('OrientaciónConsejeríaSignosAlarma').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[0].valor : null);
                    this.form2.get('ConsejeríaEnfermedadesComunes').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[1].valor : null);
                    this.form2.get('SospechasTuberculosis').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[2].valor : null);
                    this.form2.get('InfeccionesTransmisiónSexual').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[3].valor : null);
                    this.form2.get('OrientaciónNutricional').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[4].valor : null);
                    this.form2.get('OrientaciónPlanificaiónFamiliar').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[5].valor : null);
                    this.form2.get('OrientaciónPrevenciónDeCancerGinecológico').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[6].valor : null);
                    this.form2.get('OrientaciónConsejeriaPretestVIH').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[7].valor : null);
                    this.form2.get('OrientaciónConsejeriaPostestVIH').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[8].valor : null);
                    this.form2.get('OrientaciónEnEstilosDeVidaSaludable').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[9].valor : null);
                    this.form2.get('OrientaciónAcompañante').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[10].valor : null);
                    this.form2.get('ViolenciaFamiliar').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[11].valor : null);
                    this.form2.get('PlanDeParto').setValue(this.dataAux.orientaciones ? this.dataAux.orientaciones[12].valor : null);
                    /************************RECUPERAR DATOS DE DIAGNOSTICOS***************/
                    if (this.dataAux.diagnosticos != null) {
                        this.diagnosticos = [];
                        let x: number = 0;
                        while (x < this.dataAux.diagnosticos.length) {

                            console.log("diagnosticos consta de: ", this.dataAux.diagnosticos[x]);
                            this.diagnosticos.push(this.dataAux.diagnosticos[x]);
                            x++;
                        }
                    }


                } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
            }
        });
    }
    mostrarCronograma() {
        this.cronogramaDialog = true;
    }
    salirCronograma() {
        this.cronogramaDialog = false;
    }

    onChangePrestacion() {
        this.PrestacionService.getDiagnosticoPorCodigo(this.form.value.prestacion.codigo).subscribe((res: any) => {
            this.listaDeCIESIS = res.object.diagnostico;
            this.form.patchValue({ diagnosticoSIS: "" });
            this.form.patchValue({ SISCIE: "" });
        })
    }

    filterCIE10(event) {
        this.CieService.getPromiseCIEbyDescripcionTipo('CX', event.query).then((res:any) => this.listaDeCIE = res.object);
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
        console.log('lista de cie ', this.listaDeCIE);
        console.log('evento desde diagnos ', event);
        if (cieType == 0) {
            this.form.patchValue({ diagnosticoSIS: event.value.diagnostico });
            this.form.patchValue({ autocompleteSIS: "" });
            this.form.patchValue({ SISCIE: event.value }, { emitEvent: false });
            console.log(event.value)
        }
        if (cieType == 1) {
            this.form.patchValue({ diagnosticoHIS: event.descripcionItem });
            this.form.patchValue({ autocompleteHIS: "" });
            this.form.patchValue({ HISCIE: event }, { emitEvent: false });
        }
    }
}