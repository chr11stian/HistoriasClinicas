import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MenuItem, MessageService } from "primeng/api";
import { DiagnosticoConsultaService } from "../../services/diagnostico-consulta.service";
import { PrestacionService } from "src/app/mantenimientos/services/prestacion/prestacion.service";
import { CieService } from "../../../../../../obstetricia-general/services/cie.service";
import Swal from "sweetalert2";
import { UpsAuxIpressService } from "../../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import { DatePipe } from "@angular/common";
import { dato, outputTriajeInterface, proxCita } from "../../../../models/data";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { Procedure, ProcedureFUA, ProcedureHIS, ProcedurePrestation, ProceduresSave } from "../../models/FUAHIS";
// import { data } from "vis-network";

@Component({
    selector: "app-procedimientos-consulta",
    templateUrl: "./procedimientos-consulta.component.html",
    styleUrls: ["./procedimientos-consulta.component.css"],
})
export class ProcedimientosConsultaComponent implements OnInit {

    //
    selectedProducts: resultados[];
    tablaResumenDx: resultados[] = [];
    attributeLocalS = "documento";
    dataConsulta: dato;
    id: string = "";
    itemEdit: number = -1;
    isUpdate: boolean = false;

    loading: boolean = true;
    idIpress: string = "";

    formProcedimiento: FormGroup;
    procedimientoDialog: boolean;
    procedimientos: procedimiento[] = [];

    contador: number = 0;
    hayDatos: boolean = false;
    checked: boolean = false;

    ListaPrestacion: any[] = [];
    listaDeCIEHIS: any[] = [];
    listaDeCIESIS: any[] = [];
    listaDeProcedimientos: any[] = [];
    listaUpsHis: any[] = [];
    listaUpsAuxHis: any[] = [];
    listaDiagnosticos: any[] = [];
    tipoList: any[] = [];

    //--Interconsulta
    tooltipItems: MenuItem[];
    interconsulta: proxCita[] = [];
    listInterconsulta: proxCita[] = [];
    dialogInterconsulta: boolean;
    formInterconsulta: FormGroup;
    isUpdates: boolean = false;
    datePipe = new DatePipe("en-US");
    fecha: Date;
    servicios: string[] = [];
    loadings: boolean = false;
    data;
    /**new var */
    arrayDiagnosticType: any[] = [];
    arrayUPS: UPS[] = [];
    arrayUPSAux: UPSaux[] = [];
    arrayProcedureHIS: ProcedureHIS[] = [];
    arrayProcedureSIS: ProcedureFUA[] = [];
    arrayPrestationCode: ProcedurePrestation[] = [];
    listProcedures: Procedure[] = [];
    arrayProcedureSave: ProceduresSave[] = [];
    isSaved: boolean = false;

    fuaForm: FormGroup;
    hisForm: FormGroup;

    constructor(
        private rolGuardiaService: RolGuardiaService,
        private consultaGeneralService: ConsultaGeneralService,
        private PrestacionService: PrestacionService,
        private DiagnosticoService: DiagnosticoConsultaService,
        private formBuilder: FormBuilder,
        private cieService: CieService,
        private UpsAuxService: UpsAuxIpressService,
        private messageService: MessageService
    ) {
        this.buildForm();
        this.dataConsulta = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.idIpress = JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.idIpress;
        this.arrayDiagnosticType = [
            { label: "DEFINITIVO", value: "D" },
            { label: "PRESUNTIVO", value: "P" },
            { label: "REPETITIVO", value: "R" },
        ];

        // this.recuperarResumenDxBDInmunizaciones();
        // this.recuperarResumenDxBDSuplementaciones();
        this.recuperarResumenDxBDTamizajes();
        this.recuperarResumenDxBDEvaluaciones();
        // this.recuperarResumenDxBDLaboratorio();
        this.formProcedimiento.get("nombreUPS").setValue("ENFERMERIA");
        // this.formProcedimiento.get('nombreUPSaux').setValue("ATENCION INTEGRAL DE NINO");
        // this.formProcedimiento.get("tipo").setValue("DEFINITIVO");
    }

    ngOnInit(): void {
        this.recuperarUpsHis();
        this.recuperarUpsAuxHis();
        this.recuperarPrestaciones();
        // this.recuperarDxBD();
        this.listarDiagnosticos();
        this.recoverPrestationData();
        this.recoverSavedProcedureData();
    }

    buildForm() {
        this.formProcedimiento = this.formBuilder.group({
            nro: new FormControl(""),
            buscarPDxSIS: [""],

            diagnostico: new FormControl("", [Validators.required]),
            prestacion: new FormControl("", [Validators.required]),
            procedimientoSIS: new FormControl("", [Validators.required]),

            codProcedimientoSIS: new FormControl("", [Validators.required]),
            codPrestacion: new FormControl("", [Validators.required]),



            tipoDiagnostico: new FormControl("", [Validators.required]),
            cie10SIS: new FormControl("", [Validators.required]),
            resultadoFUA: new FormControl("", [Validators.required]),

            nombreUPS: new FormControl("", [Validators.required]),
            nombreUPSaux: new FormControl("", [Validators.required]),
            tipoDiagnosticoHIS: new FormControl(""),
            tipoDiagnosticoSIS: new FormControl(""),
            lab: new FormControl(""),
            buscarPDxHIS: new FormControl(""),
            codProcedimientoHIS: new FormControl("", [Validators.required]),
            procedimientoHIS: new FormControl("", [Validators.required]),
        });
        this.fuaForm = new FormGroup({
            prestacion: new FormControl("", Validators.required),
            tipoDiagnosticoSIS: new FormControl("", Validators.required),
            buscarPDxSIS: new FormControl(""),
            codProcedimientoSIS: new FormControl("", Validators.required),
            procedimientoSIS: new FormControl("", Validators.required),
        })
        this.hisForm = new FormGroup({
            nombreUPS: new FormControl("", Validators.required),
            nombreUPSaux: new FormControl("", Validators.required),
            tipoDiagnosticoHIS: new FormControl("", Validators.required),
            lab: new FormControl(""),
            buscarPDxHIS: new FormControl(""),
            codProcedimientoHIS: new FormControl("", Validators.required),
            procedimientoHIS: new FormControl("", Validators.required),
        })
        /* Interconsulta */
        this.formInterconsulta = new FormGroup({
            fecha: new FormControl({ value: null, disabled: false }, []),
            motivo: new FormControl({ value: "", disabled: false }, []),
            servicio: new FormControl({ value: "", disabled: false }, []),
            urgencia: new FormControl({ value: "", disabled: false }, []),
        });
    }

    /********lista dx********/
    listarDiagnosticos() {
        this.DiagnosticoService.getDiagnostico(
            this.dataConsulta.idConsulta
        ).subscribe((data: any) => {
            if (data.object != undefined || data.object != null) {
                // console.log(data.object);
                this.listaDiagnosticos = data.object;
            } else {
                Swal.fire({
                    icon: "info",
                    title: "DIAGNOSTICOS",
                    text: "No tiene Diagnosticos registrados!",
                });
            }
        });
    }

    /** Servicios para recuperar Resumen DX ***/
    recuperarResumenDxBDSuplementaciones() {
        this.DiagnosticoService.getSuplementacionResumen(
            this.dataConsulta.idConsulta
        ).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if (r.object.suplementaciones != null) {
                this.loading = false;
                for (let i = 0; i < r.object.suplementaciones.length; i++) {
                    let aux = {
                        nombre: r.object.suplementaciones[i].nombre,
                        evaluacion: r.object.suplementaciones[i].descripcion,
                        resultado: "ADMINISTRADO",
                    };
                    this.tablaResumenDx.push(aux);
                }
            }
        });
    }

    recuperarResumenDxBDLaboratorio() {
        this.DiagnosticoService.getLaboratorioResumen(
            this.dataConsulta.idConsulta
        ).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if (r.object != null || r.length > 0) {
                this.loading = false;
                for (let i = 0; i < r.object.length; i++) {
                    let resu0: string = " ";
                    let resu1: string = " ";
                    let resu2: string = " ";
                    let resu3: string = " ";

                    if (r.object[i].lugar == null) {
                        resu0 = "";
                    } else {
                        resu0 = r.object[i].lugarExamen;
                    }
                    if (r.object[i].resultado.clave == null) {
                        resu1 = "";
                    } else {
                        resu1 = r.object[i].resultado.clave;
                    }
                    if (r.object[i].resultado.valor == null) {
                        resu2 = "";
                    } else {
                        resu2 = r.object[i].resultado.valor;
                    }
                    if (r.object[i].resultado.resultado == null) {
                        resu3 = "";
                    } else {
                        resu3 = r.object[i].resultado.resultado;
                    }

                    let aux = {
                        nombre: "LABORATORIO",
                        evaluacion:
                            r.object[i].datosLaboratorio.nombreExamen +
                            " : " +
                            resu0,
                        resultado: resu1 + " " + resu2 + " " + resu3,
                    };
                    this.tablaResumenDx.push(aux);
                }
            }
        });
    }

    recuperarResumenDxBDInmunizaciones() {
        this.DiagnosticoService.getInmunizacionesResumen(
            this.dataConsulta.idConsulta
        ).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if (r.object != null || r.length > 0) {
                this.loading = false;
                for (let i = 0; i < r.object.length; i++) {
                    let aux = {
                        nombre: "INMUNIZACIONES",
                        evaluacion:
                            r.object[i].nombre +
                            "- Dosis:" +
                            r.object[i].dosis +
                            "- Tipo Dosis:" +
                            r.object[i].tipoDosis,
                        resultado: " ",
                    };
                    this.tablaResumenDx.push(aux);
                }
            }
        });
    }

    recuperarResumenDxBDTamizajes() {
        this.DiagnosticoService.getTamizajesResumen(
            this.dataConsulta.idConsulta
        ).subscribe((r: any) => {
            if (r.object != null || r.length > 0) {
                this.loading = false;
                for (let i = 0; i < r.object.length; i++) {
                    let aux = {
                        nombre: "TAMIZAJES",
                        evaluacion: "TAMIZAJE AUDITIVO",
                        resultado: r.object[i].resultadoAuditivo.valor,
                    };
                    this.tablaResumenDx.push(aux);
                    let aux1 = {
                        nombre: "TAMIZAJES",
                        evaluacion: "TAMIZAJE VIF",
                        resultado: r.object[i].resultadoVIF.valor,
                    };
                    this.tablaResumenDx.push(aux1);
                    let aux2 = {
                        nombre: "TAMIZAJES",
                        evaluacion: "TAMIZAJE VISUAL",
                        resultado: r.object[i].resultadoVisual.valor,
                    };
                    this.tablaResumenDx.push(aux2);
                }
            }
        });
    }

    recuperarResumenDxBDEvaluaciones() {
        this.DiagnosticoService.getEvaluacionesResumen(
            this.dataConsulta.idConsulta
        ).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if (r.object != null || r.length > 0) {
                this.loading = false;
                for (let i = 0; i < r.object.length; i++) {
                    if (r.object[i].evaluacioAlimentacion) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "EVALUACION DE ALIMENTACION",
                            resultado: r.object[i].evaluacioAlimentacion,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].testPeruano) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "TEST PERUANO",
                            resultado: r.object[i].testPeruano,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].testEEDP) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "TEST EDDP",
                            resultado: r.object[i].testEEDP,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].testTepsi) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "TEST TEPSI",
                            resultado: r.object[i].testTepsi,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].testPautaBreve) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "TEST PAUTA BREVE",
                            resultado: r.object[i].testPautaBreve,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].resultadoControlPE) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "CONTROL PESO - EDAD",
                            resultado: r.object[i].resultadoControlPE,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].resultadoControlTE) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "CONTROL TALLA - EDAD",
                            resultado: r.object[i].resultadoControlTE,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].resultadoControlPT) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "CONTROL PESO - TALLA",
                            resultado: r.object[i].resultadoControlPT,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                    if (r.object[i].resultadoControlPC) {
                        let aux = {
                            nombre: "EVALUACIONES O TEST",
                            evaluacion: "CONTROL PERIMETRO CEFÁLICO",
                            resultado: r.object[i].resultadoControlPC,
                        };
                        this.tablaResumenDx.push(aux);
                    }
                }
            }
        });
    }

    /*** Servicio para recuperar Prestaciones ***/
    recuperarPrestaciones() {
        this.PrestacionService.getPrestacion().subscribe((res: any) => {
            this.ListaPrestacion = res.object;
            // console.log("prestaciones:", this.ListaPrestacion);
        });
    }

    /**funciones para procedimientos***/
    openProcedimiento() {
        this.formProcedimiento.reset();
        this.checked = false;
        this.isUpdate = false;
        this.formProcedimiento.get("prestacion").enable();
        this.formProcedimiento.get("nombreUPS").setValue("ENFERMERIA");
        this.listaDeCIESIS = [];
        this.formProcedimiento.get("procedimientoSIS").setValue("");
        this.formProcedimiento.get("codProcedimientoSIS").setValue("");

        this.procedimientoDialog = true;
    }

    filterCIE10(event: any) {
        this.cieService
            .getCIEByDescripcion(event.query)
            .subscribe((res: any) => {
                this.listaDeCIEHIS = res.object;
            });
    }

    selectedDxHIS(event: any) {
        this.hisForm.patchValue({
            procedimientoHIS: event.descripcionItem,
            buscarPDxHIS: "",
            codProcedimientoHIS: event
        });
    }

    cancelProcedimiento() {
        this.procedimientoDialog = false;
        Swal.fire({
            icon: "warning",
            title: "Cancelado...",
            text: "",
            showConfirmButton: false,
            timer: 1000,
        });
    }

    getDatatoSavePx() {
        console.log(this.formProcedimiento.value.codProcedimientoHIS);
        let aux = {
            procedimientoSIS:
                this.formProcedimiento.getRawValue().procedimientoSIS,
            procedimientoHIS:
                this.formProcedimiento.getRawValue().procedimientoHIS,
            codProcedimientoSIS:
                this.formProcedimiento.getRawValue().codProcedimientoSIS.codigo,
            codProcedimientoHIS:
                this.formProcedimiento.getRawValue().codProcedimientoHIS
                    .codigoItem,
            codPrestacion:
                this.formProcedimiento.getRawValue().prestacion.codigo,
            cie10SIS: this.formProcedimiento.getRawValue().diagnostico.cie10SIS,
            nombreUPS: this.formProcedimiento.getRawValue().nombreUPS,
            nombreUPSaux:
                this.formProcedimiento.getRawValue().nombreUPSaux.nombre,
            lab: this.formProcedimiento.getRawValue().lab,
            tipo: this.formProcedimiento.value.tipoDiagnostico,
            resultadoFua: this.formProcedimiento.value.resultadoFUA,
        };
        // console.log("aux", aux);

        var duplicado: boolean;
        duplicado = this.procedimientos.some(
            (element) => element.procedimientoHIS == aux.procedimientoHIS
        );
        // console.log(duplicado);
        this.procedimientoDialog = false;
        if (!duplicado) {
            this.procedimientos.push(aux);
            if (this.selectedProducts) {
                this.tablaResumenDx = this.tablaResumenDx.filter(
                    (val) => !this.selectedProducts.includes(val)
                );
                this.selectedProducts = null;
                // console.log(this.tablaResumenDx);

                if (this.tablaResumenDx.length == 0) {
                    // console.log(this.tablaResumenDx);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito!",
                        detail: "No hay Procedimientos pendientes",
                    });
                } else {
                    // console.log(this.tablaResumenDx);
                    this.messageService.add({
                        severity: "warn",
                        summary: "Cuidado!",
                        detail: "Aún tiene evaluaciones realizadas sin ingresar a procedimientos",
                    });
                }
            }
        } else {
            this.messageService.add({
                severity: "error",
                summary: "Cuidado!",
                detail: "Ya ingreso este procedimiento, vuelva a intentar.",
            });
        }
    }

    getDatatoEditPx() {
        this.isUpdate = false;
        // console.log(this.formProcedimiento.value.nombreUPS);
        // console.log(this.formProcedimiento.value.cie10SIS);
        // console.log(this.itemEdit);
        this.procedimientos.splice(this.itemEdit, 1);
        let aux = {
            procedimientoSIS:
                this.formProcedimiento.getRawValue().procedimientoSIS,
            procedimientoHIS:
                this.formProcedimiento.getRawValue().procedimientoHIS,
            codProcedimientoSIS:
                this.formProcedimiento.getRawValue().codProcedimientoSIS.codigo,
            codProcedimientoHIS:
                this.formProcedimiento.getRawValue().codProcedimientoHIS
                    .codigoItem,
            codPrestacion:
                this.formProcedimiento.getRawValue().prestacion.codigo,
            cie10SIS: this.formProcedimiento.getRawValue().diagnostico.cie10SIS,
            nombreUPS: this.formProcedimiento.getRawValue().nombreUPS,
            nombreUPSaux:
                this.formProcedimiento.getRawValue().nombreUPSaux.nombre,
            lab: this.formProcedimiento.getRawValue().lab,
            tipo: this.formProcedimiento.getRawValue().tipoDiagnostico,
            resultadoFua: this.formProcedimiento.value.resultadoFUA,
        };
        this.procedimientos.push(aux);
        this.procedimientoDialog = false;
    }
    editarDx(rowData, rowindex) {
        this.isUpdate = true;
        this.checked = false;
        this.itemEdit = rowindex;
        this.formProcedimiento.reset();
        // console.log(rowData);
        // console.log("lista ups aux", this.listaUpsAuxHis);
        // console.log("lista ups", this.listaUpsHis);
        this.formProcedimiento
            .get("prestacion")
            .setValue(
                this.ListaPrestacion.find(
                    (element) => element.codigo == rowData.codPrestacion
                )
            );
        this.formProcedimiento.get("tipoDiagnostico").setValue(rowData.tipo);
        this.formProcedimiento.get("nombreUPS").setValue(rowData.nombreUPS);
        this.formProcedimiento
            .get("nombreUPSaux")
            .setValue(
                this.listaUpsAuxHis.find(
                    (element) => element.nombre == rowData.nombreUPSaux
                )
            );
        this.formProcedimiento
            .get("procedimientoSIS")
            .setValue(rowData.procedimientoSIS);
        this.formProcedimiento
            .get("procedimientoHIS")
            .setValue(rowData.procedimientoHIS);
        this.formProcedimiento.get("lab").setValue(rowData.lab);
        this.formProcedimiento
            .get("resultadoFUA")
            .setValue(rowData.resultadoFua);
        this.formProcedimiento
            .get("diagnostico")
            .setValue(
                this.listaDiagnosticos.find(
                    (element) => element.cie10SIS == rowData.cie10SIS
                )
            );
        this.PrestacionService.getProcedimientoPorCodigo(
            this.formProcedimiento.value.diagnostico.codPrestacion
        ).subscribe((res: any) => {
            this.listaDeCIESIS = res.object.procedimientos;
            // console.log("LISTA DE PROCEDIMIENTOS", this.listaDeCIESIS);
            // this.formProcedimiento.patchValue({prestacion:res.object.descripcion});
            this.formProcedimiento.patchValue({
                codProcedimientoSIS: this.listaDeCIESIS.find(
                    (elemento) => elemento.codigo == rowData.codProcedimientoSIS
                ),
            });
            // this.formProcedimiento.patchValue({ cie10SIS: this.listaDeCIESIS.find(elemento => elemento.codigo == rowData.codProcedimientoSIS) });
            // this.formProcedimiento.patchValue({ buscarPDxSIS: "" });
        });
        this.cieService
            .getCIEByDescripcion(rowData.codProcedimientoHIS)
            .subscribe((res: any) => {
                this.listaDeCIEHIS = res.object;
                this.formProcedimiento.patchValue({
                    codProcedimientoHIS: this.listaDeCIEHIS.find(
                        (elemento) =>
                            elemento.codigoItem == rowData.codProcedimientoHIS
                    ),
                });
                // this.formProcedimiento.get("codProcedimientoHIS").setValue(rowData.codProcedimientoHIS);
            });
        // console.log("lista de diagnosticos", this.listaDiagnosticos);
        this.formProcedimiento.get("nro").setValue(rowData.nro);
        this.formProcedimiento.get("prestacion").disable();
        // this.formProcedimiento.get('buscarPDxSIS').disable();
        // this.formProcedimiento.get('codProcedimientoSIS').disable();
        this.procedimientoDialog = true;
        // console.log("modificando", rowData);
    }

    onChangeDiagnostico() {
        this.PrestacionService.getProcedimientoPorCodigo(
            this.formProcedimiento.value.diagnostico.codPrestacion
        ).subscribe((res: any) => {
            // console.log(res.object);
            this.listaDeCIESIS = res.object.procedimientos;
            this.formProcedimiento.patchValue({ prestacion: res.object });
            this.formProcedimiento.patchValue({ diagnosticoSIS: "" });
            this.formProcedimiento.patchValue({ cie10SIS: "" });
        });
    }

    selectDxSIS(event) {
        // console.log(this.formProcedimiento.value.buscarPDxSIS);
        this.fuaForm.patchValue({
            procedimientoSIS: event.value.procedimiento,
            codProcedimientoSIS: event.value,
            buscarPDxSIS: ""
        });
    }

    async saveProcedimiento() {
        let dataProcedimiento = {
            procedimientos: this.procedimientos,
            proxCita: { fecha: this.consultaGeneralService.fecha },
        };
        if (this.procedimientos.length > 0) {
            Swal.fire({
                showCancelButton: true,
                confirmButtonText: "Cerrar la Consulta",
                icon: "warning",
                title: "Estas seguro que desea cerrar la consulta?",
                text: "",
                showConfirmButton: true,
            }).then((result) => {
                this.DiagnosticoService.saveProcedimiento(
                    this.dataConsulta.idConsulta,
                    dataProcedimiento
                ).subscribe(
                    (resp) => {
                        // console.log(resp);
                        Swal.fire({
                            icon: "success",
                            title: "PROCEDIMIENTOS...",
                            text: "Guardado correctamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    },
                    (error) => {
                        Swal.fire({
                            icon: "error",
                            title: "PROCEDIMIENTOS...",
                            text: "Hubo un error, vuelva a intentarlo",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    }
                );
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "PROCEDIMIENTOS...",
                text: "Hubo un error, vuelva a intentarlo",
                showConfirmButton: false,
                timer: 1000,
            });
        }
        /* else {
            this.DiagnosticoService.updateProcedimiento(
                this.dataConsulta.idConsulta,
                this.procedimientos
            ).subscribe(
                (resp) => {
                    console.log(resp);
                    Swal.fire({
                        icon: "success",
                        title: "PROCEDIMIENTOS...",
                        text: "Actualizado correctamente",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                },
                (error) => {
                    console.log(error);
                    if (error.status == 406) {
                        Swal.fire({
                            icon: "warning",
                            title: "PROCEDIMIENTOS...",
                            text: "No hubo ningun cambio",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "PROCEDIMIENTOS...",
                            text: "Hubo un error, vuelva a intentarlo",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    }
                }
            );
        } */
    }

    agregarToPx() {
        this.checked = true;
        // console.log(this.selectedProducts);
        this.isUpdate = false;
        this.formProcedimiento.reset();
        this.formProcedimiento.get("nombreUPS").setValue("ENFERMERIA");
        this.formProcedimiento.get("prestacion").enable();
        // this.formProcedimiento.get('codProcedimientoSIS').enable();
        this.formProcedimiento.get("buscarPDxSIS").setValue("");
        this.formProcedimiento.get("buscarPDxHIS").setValue("");
        this.listaDeCIESIS = [];
        this.formProcedimiento.get("procedimientoSIS").setValue("");
        this.formProcedimiento.get("procedimientoHIS").setValue("");
        this.formProcedimiento.get("codProcedimientoSIS").setValue("");
        this.formProcedimiento.get("codProcedimientoHIS").setValue("");
        this.procedimientoDialog = true;
        this.selectedProducts.forEach((element) => console.log(element));
    }

    elimininarProcedimiento(rowIndex: any) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            icon: "warning",
            title: "Estas seguro de eliminar este registro?",
            text: "",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.procedimientos.splice(rowIndex, 1);
                Swal.fire({
                    icon: "success",
                    title: "Eliminado correctamente",
                    text: "",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
    selectedOption(event: any) {
        this.formProcedimiento.patchValue({
            procedimientoSIS: event.value.procedimiento,
        });
    }
    /* interconsulta */
    open(): void {
        this.isUpdates = false;
        this.formInterconsulta.reset();
        this.formInterconsulta.get("fecha").setValue("");
        this.formInterconsulta.get("motivo").setValue("");
        this.formInterconsulta.get("servicio").setValue("");
        this.formInterconsulta.get("urgencia").setValue("");
        this.dialogInterconsulta = true;
    }
    recoverPrestationData(): void {
        this.DiagnosticoService.getPrestationPerIdConsulta(this.dataConsulta.idConsulta).then(res => {
            let hash: any = {};
            this.arrayPrestationCode = res.object;
            this.arrayPrestationCode = this.arrayPrestationCode.filter(item => hash[item.codPrestacion] ? false : hash[item.codPrestacion] = true);
        });
    }
    onChangePrestacion() {
        let prestation = this.fuaForm.value.prestacion;
        this.listProcedures = prestation.procedimientos;
        // console.log('lista de proced ', this.listProcedures);
    }

    /** Servicios para recuperar lista de ups Aux por ipress***/
    recuperarUpsHis() {
        let data = {
            idIpress: this.idIpress,
            edad: this.dataConsulta.anio,
            sexo: this.dataConsulta.sexo,
        };
        this.DiagnosticoService.listaUpsHis(data).then(
            (res: any) => (this.arrayUPS = res.object)
        );
    }
    /** Servicios para recuperar lista de ups Aux por ipress***/
    recuperarUpsAuxHis() {
        this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe(
            (r: any) => {
                if (r.object != null) {
                    this.arrayUPSAux = r.object.filter(
                        (element) => element.estado == true
                    );
                }
            }
        );
    }

    agregateProcedureSIS(): void {
        let isAdded: boolean = false;
        if (this.fuaForm.valid) {
            let procedureSIS: ProcedureFUA = {
                codPrestacion: this.fuaForm.value.prestacion.codPrestacion,
                tipoDiagnostico: this.fuaForm.value.tipoDiagnosticoSIS,
                procedimientoSIS: this.fuaForm.value.procedimientoSIS,
                cie10SIS: this.fuaForm.value.codProcedimientoSIS.codigo,
                codProcedimientoSIS: this.fuaForm.value.codProcedimientoSIS.codigo,
            }
            this.arrayProcedureSIS.forEach(item => {
                if (item.cie10SIS === procedureSIS.cie10SIS) {
                    isAdded = true;
                    this.repeatDataMessage();
                }
            })
            if (!isAdded) {
                this.arrayProcedureSIS.push(procedureSIS);
                this.fuaForm.reset();
            }
        } else
            this.missDataMessage();
    }

    agregateProcedureHIS(): void {
        let isAdded: boolean = false;
        if (this.hisForm.valid) {
            let HISprocedure: ProcedureHIS = {
                nombreUPS: this.hisForm.value.nombreUPS.nombreUPS,
                nombreUPSaux: this.hisForm.value.nombreUPSaux.nombre,
                tipoDiagnostico: this.hisForm.value.tipoDiagnosticoHIS,
                lab: this.hisForm.value.lab,
                codProcedimientoHIS: this.hisForm.value.codProcedimientoHIS.codigoItem,
                procedimientoHIS: this.hisForm.value.procedimientoHIS,
            }
            this.arrayProcedureHIS.forEach(item => {
                if (item.codProcedimientoHIS === HISprocedure.codProcedimientoHIS) {
                    isAdded = true;
                    this.repeatDataMessage();
                }
            });
            if (!isAdded) {
                this.arrayProcedureHIS.push(HISprocedure);
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
    mergeArrayProcedures(procedimientoSIS: ProcedureFUA[], procedimientoHIS: ProcedureHIS[], procedimientos: ProceduresSave[]) {
        procedimientoSIS.forEach(item => {
            let auxProcedure: ProceduresSave = {
                procedimientoSIS: item.procedimientoSIS,
                codProcedimientoSIS: item.codProcedimientoSIS,
                codPrestacion: item.codPrestacion,
                cie10SIS: item.cie10SIS,
                procedimientoHIS: null,
                codProcedimientoHIS: null,
                nombreUPS: null,
                nombreUPSaux: null,
                tipo: item.tipoDiagnostico,
                lab: null
            }
            procedimientos.push(auxProcedure)
        });

        procedimientoHIS.forEach(item => {
            let auxProcedure: ProceduresSave = {
                procedimientoSIS: null,
                codProcedimientoSIS: null,
                codPrestacion: null,
                cie10SIS: null,
                procedimientoHIS: item.procedimientoHIS,
                codProcedimientoHIS: item.codProcedimientoHIS,
                nombreUPS: item.nombreUPS,
                nombreUPSaux: item.nombreUPSaux,
                tipo: item.tipoDiagnostico,
                lab: item.lab
            }
            procedimientos.push(auxProcedure)
        });
    }

    saveProcedures(): void {
        this.arrayProcedureSave = []
        this.mergeArrayProcedures(this.arrayProcedureSIS, this.arrayProcedureHIS, this.arrayProcedureSave);
        if (this.arrayProcedureSave.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'No se agrego ningun procedimiento',
                text: '',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        let dataSave: DataSave = { procedimientos: [] };
        dataSave.procedimientos = this.arrayProcedureSave;
        this.DiagnosticoService.postSaveProcedure(this.dataConsulta.idConsulta, dataSave).then(res => {
            if (res.cod == '2001') {
                Swal.fire({
                    icon: 'success',
                    title: 'Se guardo exitosamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo guardar',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            
        });
    }

    deleteItemOfArray(index: number, type: number): void {
        /**type:0=> lista de diagnosticos FUA; 1=> lista de diagnosticos HIS */
        type == 0 ? this.arrayProcedureSIS.splice(index, 1) : this.arrayProcedureHIS.splice(index, 1);
    }

    recoverSavedProcedureData(): void {
        this.DiagnosticoService.getPromiseProcedimiento(this.dataConsulta.idConsulta).then(res => {

            let dataRes: ProceduresSave[] = res.object;
            if (dataRes == null) {
                return
            }
            dataRes.forEach(item => {
                if (item.codPrestacion != null) {
                    let procedure: ProcedureFUA = {
                        codPrestacion: item.codPrestacion,
                        cie10SIS: item.cie10SIS,
                        codProcedimientoSIS: item.codProcedimientoSIS,
                        procedimientoSIS: item.procedimientoSIS,
                        tipoDiagnostico: item.tipo
                    }
                    this.arrayProcedureSIS.push(procedure);
                } else {
                    let procedure: ProcedureHIS = {
                        nombreUPS: item.nombreUPS,
                        nombreUPSaux: item.nombreUPSaux,
                        codProcedimientoHIS: item.codProcedimientoHIS,
                        procedimientoHIS: item.procedimientoHIS,
                        tipoDiagnostico: item.tipo,
                        lab: item.lab
                    }
                    this.arrayProcedureHIS.push(procedure);
                }
                this.isSaved = true;
            });
        })
    }

    confirmSave() {
        Swal.fire({
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Guardar',
            icon: 'question',
            title: 'Guardar',
            text: '¿Esta seguro que desea guardar los diagnosticos?',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                this.saveProcedures();
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No se guardo',
                    text: '',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
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
}
interface resultados {
    nombre?: string;
    evaluacion?: string;
    resultado?: string;
}
interface procedimiento {
    procedimientoHIS?: string;
    codProcedimientoHIS?: string;
    codProcedimientoSIS?: string;
    procedimientoSIS?: string;
    cie10SIS?: string;
    codPrestacion?: string;
    resultadoFua?: string;
    lab?: string;
}
interface UPS {
    codUPS: string;
    nombreUPS: string;
}
interface UPSaux {
    estado: boolean;
    nombre: string;
}
interface Lista {
    label: string;
    value: string;
}
interface DataSave {
    procedimientos: ProceduresSave[];
}