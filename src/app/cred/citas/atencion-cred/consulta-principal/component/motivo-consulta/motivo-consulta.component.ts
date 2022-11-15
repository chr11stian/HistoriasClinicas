import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { MotivosConsultaService } from "../../services/motivos-consulta.service";
import {
    dato,
    motivoConsultaInterface,
    proxCita,
} from "../../../../models/data";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { MenuItem, MessageService } from "primeng/api";

interface formControlInterface {
    pro: string;
    label: string;
    nameFC: string;
}

interface controlInterface {
    codigo: string;
    nombreForm: string;
}

@Component({
    selector: "app-motivo-consulta",
    templateUrl: "./motivo-consulta.component.html",
    styleUrls: ["./motivo-consulta.component.css"],
})
export class MotivoConsultaComponent implements OnInit {
    data: dato;
    attributeLocalS = "documento";
    isCloseConsulta:boolean=false
    examFG: FormGroup;
    motivoFG: FormGroup;
    formExam: FormGroup;
    formExamNeurologico: FormGroup;
    headAlert: boolean = false;
    hairAlert: boolean = false;
    faceAlert: boolean = false;
    neckAlert: boolean = false;
    thoraxAlert: boolean = false;
    abdomenAlert: boolean = false;
    spineAlert: boolean = false;
    extremitiesAlert: boolean = false;
    genitourianAlert: boolean = false;
    anusAlert: boolean = false;
    skinAlert: boolean = false;
    olfactoryAlert: boolean = false;

    dataExamFisicos: formControlInterface[] = [
        { pro: "temperatura", label: "T (c°)", nameFC: "TFC" },
        { pro: "presionSistolica", label: "PS (pa)", nameFC: "PSFC" },
        { pro: "presionDiastolica", label: "PD (pa)", nameFC: "PDFC" },
        { pro: "fc", label: "FC (l*min):", nameFC: "FC" },
        { pro: "fr", label: "FR", nameFC: "FRFC" },
        { pro: "peso", label: "Peso (gr)", nameFC: "PesoFC" },
        { pro: "talla", label: "Talla (cm)", nameFC: "TallaFC" },
        { pro: "imc", label: "imc(kg/m2)", nameFC: "imcFC" },
        { pro: "perimetroCefalico", label: "PC (cm)", nameFC: "PCFC" },
    ];

    ExamenFisico: controlInterface[] = [
        {
            codigo: "AG",
            nombreForm: "aspectosGenerales",
        },
        {
            codigo: "CA",
            nombreForm: "cabeza",
        },
        {
            codigo: "CAR",
            nombreForm: "cara",
        },
        {
            codigo: "CU",
            nombreForm: "cuello",
        },
        {
            codigo: "TO",
            nombreForm: "torax",
        },
        {
            codigo: "AB",
            nombreForm: "abdomen",
        },
        {
            codigo: "CV",
            nombreForm: "columnaVert",
        },
        {
            codigo: "EX",
            nombreForm: "extremidades",
        },
        {
            codigo: "GE",
            nombreForm: "genitouriano",
        },
        {
            codigo: "PI",
            nombreForm: "piel",
        },
        {
            codigo: "AN",
            nombreForm: "ano",
        },
    ];

    examenNeurologico: controlInterface[] = [
        {
            codigo: "OL",
            nombreForm: "olfatorio",
        },
        {
            codigo: "OP",
            nombreForm: "optico",
        },
        {
            codigo: "OC",
            nombreForm: "oculomotores",
        },
        {
            codigo: "TR",
            nombreForm: "trigemino",
        },
        {
            codigo: "FA",
            nombreForm: "facial",
        },
        {
            codigo: "AU",
            nombreForm: "auditivo",
        },
        {
            codigo: "GL",
            nombreForm: "glosoNeumo",
        },
        {
            codigo: "ES",
            nombreForm: "espinal",
        },
        {
            codigo: "HI",
            nombreForm: "hipogloso",
        },
    ];
    edad: number = 18;
    // // genero: string = 'FEMENINO';
    // genero: string = 'MASCULINO';
    motivosConsulta: motivoConsultaInterface;
    loading$ = this.spinnerHandler.showSpinner$;

    //--Interconsulta
    tooltipItems: MenuItem[];
    interconsulta: proxCita[] = [];
    listInterconsulta: proxCita[] = [];
    dialogInterconsulta: boolean;
    formInterconsulta: FormGroup;
    isUpdate: boolean = false;
    datePipe = new DatePipe("en-US");
    fecha: Date;
    servicios: string[] = [];
    loading: boolean = false;
    urgencia = [
        { name: "Nivel 1", code: "Nivel 1" },
        { name: "Nivel 2", code: "Nivel 2" },
        { name: "Nivel 3", code: "Nivel 3" },
        { name: "Nivel 4", code: "Nivel 4" },
        { name: "Nivel 5", code: "Nivel 5" },
    ];

    constructor(
        private rolGuardiaService: RolGuardiaService,
        private motivosService: MotivosConsultaService,
        public spinnerHandler: SpinnerHandlerService,
        private consultaGeneralService: ConsultaGeneralService
    ) {
        // this.isCloseConsulta=(JSON.parse(localStorage.getItem('documento')).estadoAtencion)==2?true:false
        this.buildFG();
        this.recuperarMotivos();
    }

    buildFG(): void {
        this.motivoFG = new FormGroup({
            detailMotivoFC: new FormControl(
                { value: null, disabled: false },
                []
            ),
        }); 
        this.examFG = new FormGroup({
            obsFC: new FormControl({ value: "", disabled: this.isCloseConsulta }),
            TFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            PSFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            PDFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            FC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            FRFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            PesoFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            TallaFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            imcFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            PCFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
            detailFC: new FormControl({ value: null, disabled: this.isCloseConsulta }, []),
        });
        /** examen fisico */
        this.formExam = new FormGroup({
            aspectosGenerales: new FormControl(""),
            piel: new FormControl(""),
            cabeza: new FormControl(""),
            cara: new FormControl(""),
            cuello: new FormControl(""),
            torax: new FormControl(""),
            abdomen: new FormControl(""),
            columnaVert: new FormControl(""),
            extremidades: new FormControl(""),
            genitouriano: new FormControl(""),
            ano: new FormControl(""),
            obsExamenFisico: new FormControl(""),
        });
        /** examen neurologico */
        this.formExamNeurologico = new FormGroup({
            olfatorio: new FormControl(""),
            optico: new FormControl(""),
            oculomotores: new FormControl(""),
            trigemino: new FormControl(""),
            facial: new FormControl(""),
            auditivo: new FormControl(""),
            glosoNeumo: new FormControl(""),
            espinal: new FormControl(""),
            hipogloso: new FormControl(""),
            obsExamenNeurologico: new FormControl(""),
        });
        /* Interconsulta */
        this.formInterconsulta = new FormGroup({
            fecha: new FormControl({ value: null, disabled: false }, []),
            motivo: new FormControl({ value: "", disabled: false }, []),
            servicio: new FormControl({ value: "", disabled: false }, []),
            urgencia: new FormControl({ value: "", disabled: false }, []),
        });
    }

    ngOnInit(): void {
        /* interconsulta */
        this.ListaServicios();
        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Interconsulta",
                    tooltipPosition: "left",
                },
                icon: "pi pi-external-link",
                command: (event: Event) => {
                    this.open();
                },
            },
        ];
        /* lista interconsulta */
        this.listaInterconsulta();
    }

    /*  objeto motivo */
    recuperarMotivos() {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.motivosService.getMotivos(this.data.idConsulta).subscribe((r: any) => {
                //-- recupera informacion de motivos
                this.motivosConsulta = r.object;
                // console.log("motivos", r);
                this.motivoFG
                    .get("detailMotivoFC")
                    .setValue(
                        this.motivosConsulta.motivoConsulta !== null
                            ? this.motivosConsulta.motivoConsulta
                            : ""
                    );

                this.examFG
                    .get("TFC")
                    .setValue(this.motivosConsulta.signosVitales.temperatura);
                this.examFG
                    .get("PSFC")
                    .setValue(
                        this.motivosConsulta.signosVitales.presionSistolica
                    );
                this.examFG
                    .get("PDFC")
                    .setValue(
                        this.motivosConsulta.signosVitales.presionDiastolica
                    );
                this.examFG
                    .get("FC")
                    .setValue(this.motivosConsulta.signosVitales.fc);
                this.examFG
                    .get("FRFC")
                    .setValue(this.motivosConsulta.signosVitales.fr);
                this.examFG
                    .get("PesoFC")
                    .setValue(this.motivosConsulta.signosVitales.peso);
                this.examFG
                    .get("TallaFC")
                    .setValue(this.motivosConsulta.signosVitales.talla);
                this.examFG
                    .get("imcFC")
                    .setValue(this.motivosConsulta.signosVitales.imc);
                this.examFG
                    .get("PCFC")
                    .setValue(
                        this.motivosConsulta.signosVitales.perimetroCefalico
                    );
                this.examFG
                    .get("detailFC")
                    .setValue(this.motivosConsulta.obsSignosVitales);

                if (this.motivosConsulta.examenesFisicos !== null) {
                    this.formExam
                        .get("aspectosGenerales")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[0].valor
                        );
                    this.formExam
                        .get("cabeza")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[1].valor
                        );
                    this.formExam
                        .get("cara")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[2].valor
                        );
                    this.formExam
                        .get("cuello")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[3].valor
                        );
                    this.formExam
                        .get("torax")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[4].valor
                        );
                    this.formExam
                        .get("abdomen")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[5].valor
                        );
                    this.formExam
                        .get("columnaVert")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[6].valor
                        );
                    this.formExam
                        .get("extremidades")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[7].valor
                        );
                    this.formExam
                        .get("genitouriano")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[8].valor
                        );
                    this.formExam
                        .get("piel")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[9].valor
                        );
                    this.formExam
                        .get("ano")
                        .setValue(
                            this.motivosConsulta.examenesFisicos[10].valor
                        );
                    this.formExam
                        .get("obsExamenFisico")
                        .setValue(this.motivosConsulta.obsExamenFisico);
                }

                // if (this.motivosConsulta.examenNeurologico !== null) {
                //     this.formExamNeurologico
                //         .get("olfatorio")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[0].valor
                //         );
                //     this.formExamNeurologico
                //         .get("optico")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[1].valor
                //         );
                //     this.formExamNeurologico
                //         .get("oculomotores")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[2].valor
                //         );
                //     this.formExamNeurologico
                //         .get("trigemino")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[3].valor
                //         );
                //     this.formExamNeurologico
                //         .get("facial")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[4].valor
                //         );
                //     this.formExamNeurologico
                //         .get("auditivo")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[5].valor
                //         );
                //     this.formExamNeurologico
                //         .get("glosoNeumo")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[6].valor
                //         );
                //     this.formExamNeurologico
                //         .get("espinal")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[7].valor
                //         );
                //     this.formExamNeurologico
                //         .get("hipogloso")
                //         .setValue(
                //             this.motivosConsulta.examenNeurologico[8].valor
                //         );
                //     this.formExamNeurologico
                //         .get("obsExamenNeurologico")
                //         .setValue(this.motivosConsulta.obsExamenNeurologico);
                // }
            });
    }

    save() {
        let req: motivoConsultaInterface = {
            motivoConsulta: this.motivoFG.value.detailMotivoFC,
            examenesFisicos: this.ExamenFisico.map((element) => {
                return {
                    codigoExamen: element.codigo,
                    nombreExamen: element.codigo,
                    valor:
                        this.formExam.get(element.nombreForm).value === null
                            ? ""
                            : this.formExam.get(element.nombreForm).value,
                };
            }),
            obsExamenFisico: this.formExam.value.obsExamenFisico,
            signosVitales: {
                temperatura: this.examFG.value.TFC,
                presionSistolica: this.examFG.value.PSFC,
                presionDiastolica: this.examFG.value.PDFC,
                fc: this.examFG.value.FC,
                fr: this.examFG.value.FRFC,
                peso: this.examFG.value.PesoFC,
                talla: this.examFG.value.TallaFC,
                imc: this.examFG.value.imcFC,
                perimetroCefalico: this.examFG.value.PCFC,
            },
            obsSignosVitales: this.examFG.value.detailFC,
            // examenNeurologico: this.examenNeurologico.map((element) => {
            //     return {
            //         codigoExamen: element.codigo,
            //         nombreExamen: element.codigo,
            //         valor:
            //             this.formExamNeurologico.get(element.nombreForm)
            //                 .value === null
            //                 ? ""
            //                 : this.formExamNeurologico.get(element.nombreForm)
            //                     .value,
            //     };
            // }),
            obsExamenNeurologico:
                this.formExamNeurologico.value.obsExamenNeurologico,
        };
        // console.log("req", req);
        if (req) {
            this.motivosService
                .updateMotivos(this.data.idConsulta, req)
                .subscribe((resp: any) => {
                    if (resp.cod == '2121') {
                        Swal.fire({
                            icon: "success",
                            title: "Actualizado correctamente",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se pudo actualizar",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }
                });
        }
    }

    imc() {
        let peso = this.examFG.value.PesoFC / 1000;
        let talla = this.examFG.value.TallaFC / 100;
        if(talla==0 || talla==null) {
            return 
        }
        let imc: number = peso / (talla * talla);
        this.examFG.get("imcFC").setValue(imc.toFixed(2));
    }

    openAlert(key) {
        switch (key) {
            case 1:
                this.formExam.value.piel.length < 1
                    ? (this.skinAlert = true)
                    : "";
                break;
            case 2:
                this.formExam.value.cabeza.length < 1
                    ? (this.headAlert = true)
                    : "";
                break;
            case 3:
                this.formExam.value.cara.length < 1
                    ? (this.faceAlert = true)
                    : "";
                break;
            case 4:
                this.formExam.value.cuello.length < 1
                    ? (this.neckAlert = true)
                    : "";
                break;
            case 5:
                this.formExam.value.torax.length < 1
                    ? (this.thoraxAlert = true)
                    : "";
                break;
            case 6:
                this.formExam.value.abdomen.length < 1
                    ? (this.abdomenAlert = true)
                    : "";
                break;
            case 7:
                this.formExam.value.columnaVert.length < 1
                    ? (this.spineAlert = true)
                    : "";
                break;
            case 8:
                this.formExam.value.extremidades.length < 1
                    ? (this.extremitiesAlert = true)
                    : "";
                break;
            case 9:
                this.formExam.value.genitouriano.length < 1
                    ? (this.genitourianAlert = true)
                    : "";
                break;
            case 10:
                this.formExam.value.ano.length < 1
                    ? (this.anusAlert = true)
                    : "";
                break;
            case 11:
                this.formExam.value.piel.length < 1
                    ? (this.skinAlert = true)
                    : "";
                break;
            case 11:
                this.formExam.value.piel.olfatorio < 1
                    ? (this.olfactoryAlert = true)
                    : "";
                break;
            default:
                break;
        }
    }

    openSpinner() { }
    /* interconsulta */
    open(): void {
        this.isUpdate = false;
        this.formInterconsulta.reset();
        this.formInterconsulta.get("fecha").setValue("");
        this.formInterconsulta.get("motivo").setValue("");
        this.formInterconsulta.get("servicio").setValue("");
        this.formInterconsulta.get("urgencia").setValue("");
        this.dialogInterconsulta = true;
    }
    ListaServicios() {
        let idIpress = JSON.parse(localStorage.getItem("usuario")).ipress
            .idIpress;
        this.rolGuardiaService
            .getServiciosPorIpress(idIpress)
            .subscribe((res: any) => {
                this.servicios = res.object;
                // console.log("LISTA DE SERVICIOS DE IPRESSS", this.servicios);
            });
    }

    eliminarInterconsulta(id, index) {
        this.listInterconsulta.splice(index, 1);
        console.log();
        this.consultaGeneralService
            .deleteInterconsulta(this.data.idConsulta, id)
            .subscribe((r: any) => {
                console.log(r.object);
            });
    }
    listaInterconsulta() {
        this.consultaGeneralService
            .listInterconsulta(this.data.idConsulta)
            .subscribe((r: any) => {
                this.listInterconsulta = r.object;
            });
    }
    agregarInterconsulta() {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1000);
        /* agregar */
        if (
            this.formInterconsulta.value.fecha != null &&
            this.formInterconsulta.value.motivo != "" &&
            this.formInterconsulta.value.servicio != ""
        ) {
            let interconsulta: proxCita = {
                fecha: this.datePipe.transform(
                    this.formInterconsulta.value.fecha,
                    "yyyy-MM-dd"
                ),
                motivo: this.formInterconsulta.value.motivo.toUpperCase(),
                servicio: this.formInterconsulta.value.servicio,
                nivelUrgencia: this.formInterconsulta.value.urgencia,
            };
            this.consultaGeneralService
                .addInterconsulta(this.data.idConsulta, interconsulta)
                .subscribe((r: any) => {
                    this.listInterconsulta = r.object;
                });
            Swal.fire({
                icon: "success",
                title: "Agregado correctamente",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Datos incompletos",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
}
