import { dato } from "./../../../../models/data";
import { Component, OnInit, ViewChild, DoCheck } from "@angular/core";
import { MenuItem } from "primeng/api";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { ApiConsulta } from "../../models/consultaGeneral";
import { ActivatedRoute, Router } from "@angular/router";
import { DatosGeneralesConsultaComponent } from "../datos-generales-consulta/datos-generales-consulta.component";
import { MotivoConsultaComponent } from "../motivo-consulta/motivo-consulta.component";
import { DiagnosticoConsultaComponent } from "../diagnostico-consulta/diagnostico-consulta.component";
import { TratamientoConsultaComponent } from "../tratamiento-consulta/tratamiento-consulta.component";
import { FinalizarConsultaComponent } from "../finalizar-consulta/finalizar-consulta.component";
import { EvaluacionesConsultaComponent } from "../evaluaciones-consulta/evaluaciones-consulta.component";
import { ExamenesAuxiliaresConsultaComponent } from "../examenes-auxiliares-consulta/examenes-auxiliares-consulta.component";
import { ProcedimientosConsultaComponent } from "../procedimientos-consulta/procedimientos-consulta.component";
import { FinalizarConsultaService } from "../../services/finalizar-consulta.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-step-general",
    templateUrl: "./step-general.component.html",
    styleUrls: ["./step-general.component.css"],
})
export class StepGeneralComponent implements OnInit, DoCheck {
    /* lo que reciben del paso anterior */
    tipoDoc: string = "";
    nroDoc: string = "";
    /** key de lo que se guarda en el local storage */
    attributeLocalS = "idConsulta";
    /* 61ae372a42e4dc7ba7de654e */

    options: data[];
    selectedOption: data;
    items: MenuItem[];
    j: number = 100;
    indiceActivo: number = 0;
    stepName = "datos";
    consulta: ApiConsulta;

    @ViewChild(DatosGeneralesConsultaComponent)
    datosGeneralesConsulta: DatosGeneralesConsultaComponent;
    @ViewChild(MotivoConsultaComponent) motivoConsulta: MotivoConsultaComponent;
    @ViewChild(DiagnosticoConsultaComponent)
    diagnosticoConsulta: DiagnosticoConsultaComponent;
    @ViewChild(TratamientoConsultaComponent)
    tratamientoConsulta: TratamientoConsultaComponent;
    @ViewChild(FinalizarConsultaComponent)
    finalizarConsulta: FinalizarConsultaComponent;
    @ViewChild(EvaluacionesConsultaComponent)
    evaluacionesConsulta: EvaluacionesConsultaComponent;
    @ViewChild(ExamenesAuxiliaresConsultaComponent)
    examenesAuxConsulta: ExamenesAuxiliaresConsultaComponent;
    @ViewChild(ProcedimientosConsultaComponent)
    procedimientosConsulta: ProcedimientosConsultaComponent;
    /* cita */
    cita: string = "";
    data: dato;
    fecha: Date;
    listaEventos: evento[] = [];
    listaAct: evento[] = [];
    dialog: boolean = false;
    datePipe = new DatePipe("en-US");

    constructor(
        private acuerdosService: FinalizarConsultaService,
        private consultaGeneralService: ConsultaGeneralService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ];
    }

    ngDoCheck() {
        this.saveStep();
    }

    ngOnInit() {
        this.fecha = new Date();
        this.data = <dato>JSON.parse(localStorage.getItem("documento"));

        this.items = [
            { label: "Datos Generales", styleClass: "icon" },
            { label: "Motivo de Consulta", styleClass: "icon1" },
            { label: "Evaluaciones", styleClass: "icon2" },
            { label: "Exámenes Auxiliares", styleClass: "icon3" },
            { label: "Diagnóstico", styleClass: "icon4" },
            { label: "Procedimientos", styleClass: "icon5" },
            { label: "Tratamiento", styleClass: "icon6" },
            { label: "Referencia Calendario", styleClass: "icon7" },
        ];
        this.getQueryParams();
        this.agenda();
        console.log("a");
        setTimeout(() => {
            this.listaEventos.sort();
            this.listaAct = this.listaEventos.filter(
                (fecha) => fecha.start == this.listaEventos[0].start
            );
            let fecha = this.datePipe.transform(
                new Date(this.listaAct[0].start),
                "dd/MM/yyyy"
            );
            this.cita = "PRÓXIMA CITA: " + fecha;
            this.consultaGeneralService.fecha = this.listaAct[0].start;
        }, 10);
    }

    getQueryParams() {
        /*this.route.queryParams
            .subscribe(params => {
                if (params['nroDoc'] && !localStorage.getItem(this.attributeLocalS)) {
                    this.tipoDoc = params['tipoDoc']
                    this.nroDoc = params['nroDoc']
                    console.log('1')
                    this.getNuevaConsulta()

                } else if (localStorage.getItem(this.attributeLocalS)) {
                    this.getConsulta(localStorage.getItem(this.attributeLocalS))
                } else {
                    this.router.navigate(['/dashboard/cred/citas'])
                }
            })*/
    }

    getConsulta(idConsulta: string) {
        this.consultaGeneralService.traerConsulta(idConsulta).subscribe(
            (result) => {
                console.log(result);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    /*async getNuevaConsulta() {
        await this.consultaGeneralService.crearConsulta(
            {
                'tipoDoc': this.tipoDoc,
                'nroDoc': this.nroDoc,
                'tipoDocProfesional': 'DNI',
                'nroDocProfesional': '45678912'
            }
        ).toPromise().then((result) => {
            this.consulta = result
            console.log('result: ' + result)
            localStorage.setItem(this.attributeLocalS, this.consulta.object.id)
            console.log('2')

        }).catch((err) => {
            console.log(err)
        })
    }*/

    async getNuevaConsulta() {
        await this.consultaGeneralService
            .crearConsulta({
                tipoDoc: this.tipoDoc,
                nroDoc: this.nroDoc,
                tipoDocProfesional: "DNI",
                nroDocProfesional: "45678912",
            })
            .subscribe((r) => {
                this.consulta = r;
                console.log("result: " + r);
                localStorage.setItem(
                    this.attributeLocalS,
                    this.consulta.object.id
                );
                this.datosGeneralesConsulta.recuperarData(
                    this.consulta.object.id
                );
                console.log("2");
            });
    }

    //--cambia los nombres de los steps según el indice
    name() {
        switch (this.indiceActivo) {
            case 7:
                this.stepName = "finalizar";
                break;
            case 6:
                // this.stepName = "procedimientos";
                this.stepName = "tratamiento";
                break;
            case 5:
                // this.stepName = "tratamiento";
                this.stepName = "procedimientos";
                break;
            case 4:
                // this.stepName = "examenesAux";
                this.stepName = 'diagnostico'
                break;
            case 3:
                // this.stepName = "diagnostico";
                this.stepName = 'examenesAux'
                break;
            case 2:
                this.stepName = "evaluaciones";
                break;
            case 1:
                this.stepName = "motivo";
                break;
            case 0:
                this.stepName = "datos";
                break;
        }
    }

    //--cambia step
    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name();
    }

    // pasamos al siguiente step
    nextPage() {
        switch (this.stepName) {
            case "datos":
                this.datosGeneralesConsulta.save();
                this.stepName = "motivo";
                this.indiceActivo = 1;
                break;
            case "motivo":
                this.motivoConsulta.save();
                this.stepName = "evaluaciones";
                this.indiceActivo = 2;
                break;
            case "evaluaciones":
                // this.evaluacionesConsulta.save()
                this.stepName = "examenesAux";
                this.indiceActivo = 3;
                break;
            case "examenesAux":
                // this.examenesAuxConsulta.saveAuxiliarsExams();
                this.stepName = "diagnostico";
                this.indiceActivo = 4;
                break;
            case "diagnostico":
                // this.diagnosticoConsulta.SaveDiagnostico();
                this.stepName = "procedimientos";
                this.indiceActivo = 5;
                break;
            case "procedimientos":
                // this.procedimientosConsulta.saveProcedimiento();
                this.stepName = "tratamiento";
                this.indiceActivo = 6;
                break;

            case "tratamiento":
                // this.tratamientoConsulta.save()
                this.stepName = "finalizar";
                this.indiceActivo = 7;
                break;
            case "finalizar":
                this.finalizarConsulta.save();
                break;
        }
    }

    // regresamos al anterior step
    prevPage() {
        switch (this.stepName) {
            case "finalizar":
                console.log("fi ", this.stepName);
                this.stepName = "tratamiento";
                this.indiceActivo = 6;
                break;
            case "tratamiento":
                this.stepName = "procedimientos";
                this.indiceActivo = 5;
                break;
            case "procedimientos":
                console.log("fi ", this.stepName);
                this.stepName = "diagnostico";
                this.indiceActivo = 4;
                break;
            case "diagnostico":
                this.stepName = "examenesAux";
                this.indiceActivo = 3;
                break;
            case "examenesAux":
                this.stepName = "evaluaciones";
                this.indiceActivo = 2;
                break;

            case "evaluaciones":
                this.stepName = "motivo";
                this.indiceActivo = 1;
                break;
            case "motivo":
                this.stepName = "datos";
                this.indiceActivo = 0;
                break;
        }
    }

    saveStep() {
        if (this.indiceActivo !== this.j) {
            console.log("j ", this.indiceActivo, this.j);
            switch (this.j) {
                case 7:
                    this.finalizarConsulta.save();
                    break;
                case 6:
                    // this.finalizarConsulta.save()
                    break;
                case 5:
                    //this.tratamientoConsulta.save()
                    break;
                case 4:
                    // this.diagnosticoConsulta.save()
                    break;
                case 3:
                    break;
                case 2:
                    break;
                case 1:
                    // this.motivoConsulta.save()
                    break;
                case 0:
                    // this.datosGeneralesConsulta.save()
                    break;
            }
            this.j = this.indiceActivo;
        }
    }

    agenda() {
        let listaEventAux: evento[] = [];
        let index;
        this.acuerdosService
            .listPlan(this.data.nroDocumento)
            .subscribe((r: any) => {
                let aux = r.object.planAtencion;
                //--- proxima cita ---
                console.log("agenda");
                index = 0;
                aux.controlCrecimientoDesa.map((r_: any) => {
                    /* aux */
                    let fechaDate = new Date(r_.fechaTentativa);
                    if (fechaDate > this.fecha && index < 1) {
                        index++;
                        listaEventAux.push({
                            title:
                                r_.nroControl +
                                "° control de crecimiento de " +
                                this.descripcion(r_.descripcionEdad),
                            start: r_.fechaTentativa,
                        });
                    }
                });
                index = 0;
                aux.suplementacionSFMicronutrientes.map((r_: any) => {
                    /* aux */

                    let fechaDate = new Date(r_.fechaTentativa);
                    if (fechaDate > this.fecha && index < 1) {
                        index++;
                        listaEventAux.push({
                            title:
                                r_.dosis +
                                "° dosis de " +
                                r_.descripcion.toLowerCase() +
                                " de " +
                                this.descripcion(r_.descripcionEdad),
                            start: r_.fechaTentativa,
                        });
                    }
                });
                index = 0;
                aux.suplementacionVitaminaA.map((r_: any) => {
                    /* aux */

                    let fechaDate = new Date(r_.fechaTentativa);
                    if (fechaDate > this.fecha && index < 1) {
                        index++;
                        listaEventAux.push({
                            title:
                                r_.dosis +
                                "° dosis de " +
                                r_.descripcion.toLowerCase() +
                                " de " +
                                this.descripcion(r_.descripcionEdad),
                            start: r_.fechaTentativa,
                        });
                    }
                });
                index = 0;
                aux.tratamientoDosajeHemoglobina.map((r_: any) => {
                    /* aux */

                    let fechaDate = new Date(r_.fechaTentativa);
                    if (fechaDate > this.fecha && index < 1) {
                        index++;
                        listaEventAux.push({
                            title:
                                r_.nroControl +
                                "° control de " +
                                (r_.nombre === "Dosaje_Hb"
                                    ? "dosaje de hemoglobina"
                                    : "") +
                                " de " +
                                this.descripcion(r_.descripcionEdad),
                            start: r_.fechaTentativa,
                        });
                    }
                });
                index = 0;
                aux.inmunizacionesCred.map((r_: any) => {
                    /* aux */

                    let fechaDate = new Date(r_.fechaTentativa);
                    if (fechaDate > this.fecha && index < 1) {
                        index++;
                        listaEventAux.push({
                            title:
                                r_.dosis +
                                "° dosis de " +
                                r_.descripcion.toLowerCase() +
                                " de " +
                                this.descripcion(r_.descripcionEdad),
                            start: r_.fechaTentativa,
                        });
                    }
                });
            });
        this.listaEventos = listaEventAux;
    }
    citas() {
        this.dialog = true;
    }
    descripcion(s: string) {
        return s == "RN"
            ? "recien nacido"
            : s == "Menor_1A"
                ? "menor de un año"
                : s == "1A"
                    ? "un año"
                    : s == "2A"
                        ? "dos años"
                        : s == "3A"
                            ? "tres años"
                            : s == "4A"
                                ? "cuatro años"
                                : s == "5A"
                                    ? "cinco años"
                                    : s == "6A"
                                        ? "seis años"
                                        : s == "7A"
                                            ? "siete años"
                                            : s == "8A"
                                                ? "ocho años"
                                                : "nueve años";
    }
}

interface data {
    name: string;
    code: number;
}
interface evento {
    title: string;
    start: string;
}
