import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { CieService } from "../../../../../services/cie.service";
import { ConsultasService } from "../../services/consultas.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
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
    private tipoDocRecuperado: any;
    private nroDocRecuperado: any;
    private nroEmbarazo: any;
    private nroHclRecuperado: any;
    /********Lista tipo Dx*****/
    tipoList: any[] = [];
    eleccion: any;
    private nroFetos = 0;
    private idConsulta: any;
    private encontradoDxTuberculosis: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private obstetriciaService: ObstetriciaGeneralService,
        private cieService: CieService,
        private messageService: MessageService,
        private DxService: ConsultasService) {
        this.buildForm();
        /*********RECUPERAR DATOS*********/
        this.tipoDocRecuperado = this.obstetriciaService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaService.nroDoc;
        this.nroEmbarazo = this.obstetriciaService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaService.idConsultoriObstetrico;
        this.idConsulta = this.obstetriciaService.idGestacion;
        this.nroHclRecuperado = this.obstetriciaService.nroHcl;
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
        this.recuperarCronograma();
    }
    ngOnInit() {
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("Id Consultorio Obstetrico", this.idConsultoriObstetrico);
        this.recuperarNroFetos();
        this.recuperarDatosGuardados();

    }
    recuperarCronograma() {
        this.DxService.getCronogramaGestante(this.obstetriciaService.nroHcl).subscribe((res: any) => {
            this.cronograma = res.object;
            console.log("cronograma:", this.cronograma)
        })
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
            diagnostico: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
        });
        this.form2 = this.formBuilder.group({
            orientaciones: ['', [Validators.required]],
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
        this.isUpdate = false;
        let bandera: boolean = false;
        let dx = this.form.value.diagnostico.descripcionItem;
        let cie = this.form.value.diagnostico.codigoItem;
        if (dx == " " || dx == null || dx == undefined) {
            this.messageService.add({ severity: 'info', summary: 'Recuperado', detail: 'Diagnostico no válido vuelva a ingresar.' });
        } else {
            /***verificar si ya ingreso este dx************/
            for (let i = 0; i < this.diagnosticos.length; i++) {
                if (this.diagnosticos[i].cie10SIS === cie) {
                    bandera = true;
                    console.log(bandera)
                }
            }
            /***si el dx es repetido -> mensaje si no ingresar al sistema***/
            if (bandera === true) {
                this.messageService.add({ severity: 'info', summary: 'Recuperado', detail: 'Diagnostico ya ingresado, ingrese otro porfavor.' });
            }
            else {
                this.diagnosticos.push({
                    diagnosticoSIS: dx,
                    cie10SIS: cie,
                    tipo: this.form.value.tipo
                }
                )
            }
        }
        this.diagnosticoDialog = false;
    }
    /******ABRIR DIALOGS DX****/
    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('diagnostico').setValue("");
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
    /******EVENTO PARA BUSQUEDA SEGUN FILTRO*****/
    filterDiagnostico(event) {

        console.log('event ', event.query);
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.Cie10 = res.object;
            // console.log('seleccion de autocomplete ', this.Cie10)

        })
    }
    selectedOption(event) {
        console.log('seleccion de autocomplete ', this.Cie10)
    }
    /*****FIN PARA BUSQUEDA SEGUN FILTRO*******/
    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }
    editar(rowData: any) {
        console.log("modificando" + rowData)
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
                this.diagnosticos.splice(index, 1)
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
    enviarDatosRefProxCita() {
        this.referencia = {
            consultorio: this.formOtrosDatos.value.consultorio,
            motivoReferencia: this.formOtrosDatos.value.motivo,
            renipress: this.formOtrosDatos.value.codRENAES,
            nombreIPRESS: null,
            idRef: null,
            DISA: null,
            lote: null,
            nroFormato: null
        }
        this.proxCita = { fecha: this.datePipe.transform(this.formOtrosDatos.value.proxCita, 'yyyy-MM-dd') }
        this.visitaDomiciliaria = {
            estado: this.formOtrosDatos.value.visita,
            fecha: this.datePipe.transform(this.formOtrosDatos.value.fechaVisita, 'yyyy-MM-dd HH:mm:ss')
        }
        this.planPartoReenfocada = this.formOtrosDatos.value.planPartoReenfocada
    }
    guardarDiagnosticosEmbarazo() {
        let diagnosticosPorConsejeria: any[] = [];
        let encontradoDxTuberculosis: boolean = false;
        let buscado = '2232';
        for (let i = 0; i <= this.orientaciones.length; i++) {
            if (this.orientaciones[i] != undefined || this.orientaciones[i] != null) {
                console.log(this.orientaciones[i]);
                console.log(this.orientaciones[i].cie10);
                console.log('buscado:', buscado);
                if (this.orientaciones[i].cie10 === "2232") {
                    encontradoDxTuberculosis = true;
                    console.log('bandera es ', this.encontradoDxTuberculosis);
                }

            }
        }
        console.log('bandera es ', this.encontradoDxTuberculosis);
        console.log(this.edadGestacional);
        let dx: any;
        let cie10SIS: any;
        if (this.edadGestacional <= 50) { dx = "GESTANTE CON FACTOR DE RIESGO CONTROL 3ER. TRIMESTRE (36 SEMANAS)", cie10SIS = "Z3593" }
        if (this.edadGestacional <= 27) { dx = "GESTANTE CON FACTOR DE RIESGO CONTROL 2DO. TRIMESTRE (24 SEMANAS)", cie10SIS = "Z3592" }
        if (this.edadGestacional <= 13) { dx = "GESTANTE CON FACTOR DE RIESGO CONTROL 1ER. TRIMESTRE (12 SEMANAS)", cie10SIS = "Z3591" }
        diagnosticosPorConsejeria.push({
            diagnosticoSIS: dx,
            cie10SIS: cie10SIS,
            tipo: 'D'

        })
        console.log(encontradoDxTuberculosis);
        if (encontradoDxTuberculosis) {
            diagnosticosPorConsejeria.push({
                diagnosticoSIS: 'TBC PULMONAR BK (+)',
                cie10SIS: 'A150',
                tipo: 'P'
            })
        }

        const req = {
            id: this.idConsultoriObstetrico,
            nroHcl: this.nroHclRecuperado,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1,
            // nroControlSis: 1,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            diagnosticos: diagnosticosPorConsejeria
        }
        this.DxService.updateConsultas(this.nroFetos, req).subscribe(
            (resp) => {
                console.log(resp);
                console.log(req);
            })
    }
    guardarTodosDatos() {
        this.enviarDatosRefProxCita();
        const req = {
            id: this.idConsultoriObstetrico,
            nroHcl: this.nroHclRecuperado,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1,
            // nroControlSis: 1,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            referencia: this.referencia,
            visitaDomiciliaria: this.visitaDomiciliaria,
            planParto: this.planPartoReenfocada,
            diagnosticos: this.diagnosticos,
            citas: [
                {
                    fecha: this.proxCita,
                    motivo: "próxima cita",
                    servicio: "OBSTETRICIA",
                    estado: "TENTATIVO",
                    nivelUrgencia: "4"
                }
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
            nroHcl: this.nroHclRecuperado,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1
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
                    if (this.dataAux.referencia != null) {
                        this.formOtrosDatos.patchValue({ 'consultorio': this.dataAux.referencia.consultorio });
                        this.formOtrosDatos.patchValue({ 'motivo': this.dataAux.referencia.motivoReferencia });
                        this.formOtrosDatos.patchValue({ 'codRENAES': this.dataAux.referencia.renipress });
                    }
                    /****************RECUPERAR EDAD GESTACIONAL********************/
                    console.log("edad gestacional:", this.dataAux.edadGestacionalSemanas);
                    if (this.dataAux.edadGestacionalSemanas === null || this.dataAux.edadGestacionalSemanas === undefined) {
                        this.edadGestacional = 0;
                    } else {
                        this.edadGestacional = this.dataAux.edadGestacionalSemanas;
                    }
                    console.log(this.edadGestacional);
                    this.guardarDiagnosticosEmbarazo();
                    /************************RECUPERAR DATOS EXTRA**************************/
                    if (this.dataAux.proxCita != null) {
                        this.formOtrosDatos.patchValue({ 'proxCita': this.dataAux.proxCita.fecha });
                    }
                    if (this.dataAux.visitaDomiciliaria != null) {
                        this.formOtrosDatos.patchValue({ 'visita': this.dataAux.visitaDomiciliaria.estado });
                        this.formOtrosDatos.patchValue({ 'fechaVisita': this.dataAux.visitaDomiciliaria.fecha });
                    }
                    if (this.dataAux.planParto) {
                        this.formOtrosDatos.patchValue({ 'planPartoReenfocada': this.dataAux.planParto });

                    }
                    /************************RECUPERAR DATOS DE DIAGNOSTICOS***************/
                    if (this.dataAux.diagnosticos != null) {
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
        // this.cronogramaDialog=true;
        this.testDialog = true;
    }
    salirCronograma() {
        this.cronogramaDialog = false;
    }
}