import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import {  AbstractControl,  FormControl,   FormControlDirective,    FormControlName,    FormGroup,    Validators,} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsultaGeneralService } from "../../../consulta-principal/services/consulta-general.service";
import { ListaConsultaService } from "../../../../services/lista-consulta.service";
import Swal from "sweetalert2";
import { MenuItem, MessageService } from "primeng/api";
import {
    dato,
    triajeInterface,
    SignosVitales,
    outputTriajeInterface,
    interconsultaInterface,
    proxCita,
} from "../../../../models/data";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";

// const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
// FormControlDirective.prototype.ngOnChanges = function () {
//     this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
//     return originFormControlNgOnChanges.apply(this, arguments);
// };

// const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
// FormControlName.prototype.ngOnChanges = function () {
//     const result = originFormControlNameNgOnChanges.apply(this, arguments);
//     this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
//     return result;
// };
interface formInterface {
    pro: string;
    label: string;
    nameFC: string;
}

interface formControlInterface {
    index: string;
    label: string;
    nameFC: string;
}

@Component({
    selector: "app-triaje-cred",
    templateUrl: "./triaje-cred.component.html",
    styleUrls: ["./triaje-cred.component.css"],
    providers: [MessageService],
})
export class TriajeCredComponent implements OnInit {
    examFG: FormGroup;
    generalInfoFG: FormGroup;
    signoPeligroFG: FormGroup;
    factorRiesgoFG: FormGroup;
    twoMonthsFG: FormGroup;
    twoMonthsMoreFG: FormGroup;
    allYearFG: FormGroup;
    tipoDoc: string;
    nroDoc: string;
    anio: number = 0;
    mes: number = 0;
    dia: number = 0;
    triaje: triajeInterface;
    auxTriaje: outputTriajeInterface;
    fecha_hoy: Date = new Date();
    data: dato;
    signosVitales: SignosVitales;
    aux: any[] = [];
    my: boolean = true;
    id: string;
    imcCred: number;
    attributeLocalS = "documento";
    anamnesisFC = new FormControl({ value: "", disabled: false });
    obsFC = new FormControl({ value: "", disabled: false });
    stateOptions = [
        { label: "Si", value: true },
        { label: "No", value: false },
    ];

    dataExamFisicos: formInterface[] = [
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
    list: formControlInterface[] = [
        {
            index: "1",
            label: "No quiere mamar ni succiona",
            nameFC: "noMama",
        },
        {
            index: "2",
            label: "Convulsiones",
            nameFC: "convulsion",
        },
        {
            index: "3",
            label: "Fontanela abombada",
            nameFC: "abombada",
        },
        {
            index: "4",
            label: "Enrojecimiento del ombligo se extiende a la piel",
            nameFC: "enrojemiento",
        },
        {
            index: "5",
            label: "Fiebre o temperatura baja",
            nameFC: "temperatura",
        },
        {
            index: "6",
            label: "Rigidez de nuca",
            nameFC: "rigidezNuca",
        },
        {
            index: "7",
            label: "Pústulas muchas y extensas",
            nameFC: "pustulas",
        },
        {
            index: "8",
            label: "Letárgico o comatoso",
            nameFC: "letargico",
        },
        {
            index: "1",
            label: "No puede beber o tomar el pecho",
            nameFC: "noTomaPecho",
        },
        {
            index: "2",
            label: "Convulsiones",
            nameFC: "convulsionesMore",
        },
        {
            index: "3",
            label: "Letárgico o comatoso",
            nameFC: "letargicoMore",
        },
        {
            index: "4",
            label: "Vomita todo",
            nameFC: "vomitaTodo",
        },
        {
            index: "5",
            label: "Estridor en reposo / tiraje subcostal",
            nameFC: "tirajeSubcostal",
        },
        {
            index: "1",
            label: "Emaciación visible grave",
            nameFC: "emaciacionVisibleAll",
        },
        {
            index: "2",
            label: "Piel vuelve muy lentamente",
            nameFC: "pielvuelveAll",
        },
        {
            index: "3",
            label: "Traumatismo / Quemaduras",
            nameFC: "traumatismoQuemaduraAll",
        },
        {
            index: "4",
            label: "Envenenamiento",
            nameFC: "envenenamientoAll",
        },
        {
            index: "5",
            label: "Palidez palmar intensa",
            nameFC: "palidezAll",
        },
    ];
    twoMonths: formControlInterface[] = [
        {
            index: "1",
            label: "No quiere mamar ni succiona",
            nameFC: "noMama",
        },
        {
            index: "2",
            label: "Convulsiones",
            nameFC: "convulsion",
        },
        {
            index: "3",
            label: "Fontanela abombada",
            nameFC: "abombada",
        },
        {
            index: "4",
            label: "Enrojecimiento del ombligo se extiende a la piel",
            nameFC: "enrojemiento",
        },
        {
            index: "5",
            label: "Fiebre o temperatura baja",
            nameFC: "temperatura",
        },
        {
            index: "6",
            label: "Rigidez de nuca",
            nameFC: "rigidezNuca",
        },
        {
            index: "7",
            label: "Pústulas muchas y extensas",
            nameFC: "pustulas",
        },
        {
            index: "8",
            label: "Letárgico o comatoso",
            nameFC: "letargico",
        },
    ];
    twoMonthsMore: formControlInterface[] = [
        {
            index: "1",
            label: "No puede beber o tomar el pecho",
            nameFC: "noTomaPecho",
        },
        {
            index: "2",
            label: "Convulsiones",
            nameFC: "convulsionesMore",
        },
        {
            index: "3",
            label: "Letárgico o comatoso",
            nameFC: "letargicoMore",
        },
        {
            index: "4",
            label: "Vomita todo",
            nameFC: "vomitaTodo",
        },
        {
            index: "5",
            label: "Estridor en reposo / tiraje subcostal",
            nameFC: "tirajeSubcostal",
        },
    ];
    allYear: formControlInterface[] = [
        {
            index: "1",
            label: "Emaciación visible grave",
            nameFC: "emaciacionVisibleAll",
        },
        {
            index: "2",
            label: "Piel vuelve muy lentamente",
            nameFC: "pielvuelveAll",
        },
        {
            index: "3",
            label: "Traumatismo / Quemaduras",
            nameFC: "traumatismoQuemaduraAll",
        },
        {
            index: "4",
            label: "Envenenamiento",
            nameFC: "envenenamientoAll",
        },
        {
            index: "5",
            label: "Palidez palmar intensa",
            nameFC: "palidezAll",
        },
    ];
    botonGuardarVolver: string;
    //--Interconsulta
    interconsulta: proxCita[] = [];
    listInterconsulta: proxCita[] = [];
    dialogInterconsulta: boolean;
    formInterconsulta: FormGroup;
    isUpdate: boolean = false;
    datePipe = new DatePipe("en-US");
    fecha: Date;
    servicios: string[] = [];
    loading: boolean = false;
    idConsultaInterconsulta = "";
    urgencia = [
        { name: "Nivel 1", code: "Nivel 1" },
        { name: "Nivel 2", code: "Nivel 2" },
        { name: "Nivel 3", code: "Nivel 3" },
        { name: "Nivel 4", code: "Nivel 4" },
        { name: "Nivel 5", code: "Nivel 5" },
    ];
    constructor(
        private rolGuardiaService: RolGuardiaService,
        private router: Router,
        private route: ActivatedRoute,
        private consultaService: ListaConsultaService,
        private consultaGeneralService: ConsultaGeneralService
    ) {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.data.idConsulta !== ""
            ? this.recuperarData(this.data.idConsulta)
            : this.recuperarPersona();
        this.botonGuardarVolver =
            this.data.idConsulta == "" ? "Guardar" : "Volver";
        this.buildForm();
        // this.getTotalConsulta();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.consulta.currentValue !== changes.consulta.previousValue) {
        }
    }

    recuperarPersona() {
        this.consultaGeneralService
            .datosGenerales({
                tipoDoc: this.data.tipoDoc,
                nroDoc: this.data.nroDocumento,
            })
            .subscribe((r: any) => {
                let nombre =
                    r.object.primerNombre +
                    " " +
                    r.object.otrosNombres +
                    " " +
                    r.object.apePaterno +
                    " " +
                    r.object.apeMaterno;
                this.generalInfoFG.get("name").setValue(nombre);
                this.calcularEdad(r.object.nacimiento.fechaNacimiento);
                const edad =
                    this.anio +
                    " años " +
                    this.mes +
                    " meses " +
                    this.dia +
                    " dias";
                this.generalInfoFG.get("year").setValue(edad);
                this.generalInfoFG
                    .get("dateAttention")
                    .setValue(this.fecha_hoy);
                this.generalInfoFG.get("hour").setValue(this.fecha_hoy);
            });
    }

    nroConsulta: number = 0;
    // getTotalConsulta(){
    //     this.consultaGeneralService.getTotalConsultas(this.data.nroDocumento).subscribe((resp:any)=>{
    //         console.log('nro de consulta------>',resp.object.length)
    //         this.nroConsulta=resp.object.length;
    //     })
    // }

    recuperarData(id) {
        this.consultaGeneralService
            .datosGenerales({
                tipoDoc: this.data.tipoDoc,
                nroDoc: this.data.nroDocumento,
            })
            .subscribe((r: any) => {
                let nombre =
                    r.object.primerNombre +
                    " " +
                    r.object.otrosNombres +
                    " " +
                    r.object.apePaterno +
                    " " +
                    r.object.apeMaterno;
                this.generalInfoFG.get("name").setValue(nombre);
            });
        this.consultaService.getDatosGenerales(id).subscribe((r: any) => {
            this.auxTriaje = r.object;
            let date: Date = new Date(this.auxTriaje.fecha);
            this.generalInfoFG.get("dateAttention").setValue(date);
            this.generalInfoFG.get("hour").setValue(date);
            let edad =
                this.auxTriaje.anioEdad +
                " años " +
                this.auxTriaje.mesEdad +
                " meses " +
                this.auxTriaje.diaEdad +
                " dias";
            this.generalInfoFG.get("year").setValue(edad);

            this.examFG
                .get("TFC")
                .setValue(this.auxTriaje.signosVitales.temperatura);
            this.examFG
                .get("PSFC")
                .setValue(this.auxTriaje.signosVitales.presionSistolica);
            this.examFG
                .get("PDFC")
                .setValue(this.auxTriaje.signosVitales.presionDiastolica);
            this.examFG.get("FC").setValue(this.auxTriaje.signosVitales.fc);
            this.examFG.get("FRFC").setValue(this.auxTriaje.signosVitales.fr);
            this.examFG
                .get("PesoFC")
                .setValue(this.auxTriaje.signosVitales.peso);
            this.examFG
                .get("TallaFC")
                .setValue(this.auxTriaje.signosVitales.talla);
            this.examFG.get("imcFC").setValue(this.auxTriaje.signosVitales.imc);
            this.examFG
                .get("PCFC")
                .setValue(this.auxTriaje.signosVitales.perimetroCefalico);

            this.twoMonthsFG
                .get("1")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[0].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("2")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[1].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("3")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[2].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("4")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[3].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("5")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[4].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("6")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[5].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("7")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[6].valorSigno as boolean
                );
            this.twoMonthsFG
                .get("8")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[7].valorSigno as boolean
                );

            this.twoMonthsMoreFG
                .get("1")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[8].valorSigno as boolean
                );
            this.twoMonthsMoreFG
                .get("2")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[9].valorSigno as boolean
                );
            this.twoMonthsMoreFG
                .get("3")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[10].valorSigno as boolean
                );
            this.twoMonthsMoreFG
                .get("4")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[11].valorSigno as boolean
                );
            this.twoMonthsMoreFG
                .get("5")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[12].valorSigno as boolean
                );

            this.allYearFG
                .get("1")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[13].valorSigno as boolean
                );
            this.allYearFG
                .get("2")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[14].valorSigno as boolean
                );
            this.allYearFG
                .get("3")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[15].valorSigno as boolean
                );
            this.allYearFG
                .get("4")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[16].valorSigno as boolean
                );
            this.allYearFG
                .get("5")
                .setValue(
                    this.auxTriaje.listaSignosAlarma[17].valorSigno as boolean
                );

            this.signoPeligroFG
                .get("presentSigns")
                .setValue(this.auxTriaje.presentaSigno);
            this.factorRiesgoFG
                .get("cuidaNinio")
                .setValue(this.auxTriaje.factorRiesgo.cuidaNinio);
            this.factorRiesgoFG
                .get("participaPadre")
                .setValue(this.auxTriaje.factorRiesgo.participaPadre);
            this.factorRiesgoFG
                .get("recibeAfecto")
                .setValue(this.auxTriaje.factorRiesgo.recibeAfecto);
            this.factorRiesgoFG
                .get("especificacion")
                .setValue(this.auxTriaje.factorRiesgo.especificacion);

            this.anamnesisFC.setValue(this.auxTriaje.anamnesis);
            this.obsFC.setValue(this.auxTriaje.obsSignosVitales);
        });
    }

    buildForm(): void {
        /** Signos vitales */
        this.examFG = new FormGroup({
            TFC: new FormControl({ value: "", disabled: false }, [Validators.required]),
            PSFC: new FormControl({ value: "", disabled: false }, []),
            PDFC: new FormControl({ value: "", disabled: false }, []),
            FC: new FormControl({ value: "", disabled: false }, [Validators.required]),
            FRFC: new FormControl({ value: "", disabled: false }, [Validators.required]),
            PesoFC: new FormControl({ value: "", disabled: false }, [Validators.required]),
            TallaFC: new FormControl({ value: "", disabled: false }, [Validators.required]),
            imcFC: new FormControl({ value: "", disabled: true }, []),
            PCFC: new FormControl({ value: "", disabled: false }, [ Validators.required]),
            obsFC: new FormControl({ value: "", disabled: false }, []),
        });
        this.generalInfoFG = new FormGroup({
            name: new FormControl({ value: "", disabled: true }, [
                Validators.required,
            ]),
            dateAttention: new FormControl({ value: "", disabled: true }, [
                Validators.required,
            ]),
            hour: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
            year: new FormControl({ value: null, disabled: true }, [
                Validators.required,
            ]),
        });
        this.signoPeligroFG = new FormGroup({
            presentSigns: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
        });
        const selectFC = new FormControl({ value: null, disabled: false }, []);
        this.twoMonths.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC);
        });
        this.twoMonthsMore.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC);
        });

        this.allYear.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC);
        });

        this.twoMonthsFG = new FormGroup({
            1: new FormControl(false),
            2: new FormControl(false),
            3: new FormControl(false),
            4: new FormControl(false),
            5: new FormControl(false),
            6: new FormControl(false),
            7: new FormControl(false),
            8: new FormControl(false),
        });
        this.twoMonthsMoreFG = new FormGroup({
            1: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            2: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            3: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            4: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            5: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
        });
        this.allYearFG = new FormGroup({
            1: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            2: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            3: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            4: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
            5: new FormControl({ value: false, disabled: false }, [
                Validators.required,
            ]),
        });
        /** form para factor de riesgo */
        this.factorRiesgoFG = new FormGroup({
            /** quien cuida al ninio */
            cuidaNinio: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
            /** participa el apdre en el cuidado del ninio: atributo tipo boolean*/
            participaPadre: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
            /** ninio recibe muestras de afecto : atributo tipo boolean */
            recibeAfecto: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
            /** detalle string*/
            especificacion: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
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
        this.ListaServicios();
        this.listaInterconsulta();
    }

    outData() {
        this.twoMonths.map((element, index) => {
            this.aux.push({
                codSigno: index + 1 + "",
                tipoEdad: "Menor de 2 Meses",
                nombreSigno: element.label,
                valorSigno:
                    this.twoMonthsFG.get(element.index).value === null
                        ? false
                        : (this.twoMonthsFG.get(element.index)
                            .value as boolean),
            });
        });
        this.twoMonthsMore.map((element, index) => {
            this.aux.push({
                codSigno: index + 1 + "",
                tipoEdad: "De 2 meses a 4 años",
                nombreSigno: element.label,
                valorSigno:
                    this.twoMonthsMoreFG.get(element.index).value === null
                        ? false
                        : (this.twoMonthsMoreFG.get(element.index)
                            .value as boolean),
            });
        });
        this.allYear.map((element, index) => {
            this.aux.push({
                codSigno: index + 1 + "",
                tipoEdad: "Para todas las edades",
                nombreSigno: element.label,
                valorSigno:
                    this.allYearFG.get(element.index).value === null
                        ? false
                        : (this.allYearFG.get(element.index).value as boolean),
            });
        });

        this.signosVitales = {
            temperatura: this.examFG.value.TFC,
            presionSistolica: this.examFG.value.PSFC,
            presionDiastolica: this.examFG.value.PDFC,
            fc: this.examFG.value.FC,
            fr: this.examFG.value.FRFC,
            peso: this.examFG.value.PesoFC,
            talla: this.examFG.value.TallaFC,
            imc: this.imcCred,
            perimetroCefalico: this.examFG.value.PCFC,
        };
    }
    isInvalid(control: string): boolean {
        const formControl: AbstractControl = this.getFC(control);
        return (
            formControl.invalid && (formControl.touched || formControl.dirty)
        );
    }
    getFC(control: string): AbstractControl {
        return this.examFG.get(control);
    }

    async save() {
        this.getPlan(this.data.nroDocumento);
        let hayPlan: boolean = false;
        await this.consultaGeneralService
            .traerPlan(this.data.nroDocumento)
            .toPromise()
            .then(
                (result) => {
                    hayPlan = result.cod === "2403" ? true : false;
                    // console.log('cod', result.cod)
                    // if (result.cod === '2404') {
                    //     this.getNuevoPlan()
                    //     console.log('2404', result)
                    // }
                    // if (result.cod === '2403') {
                    //     console.log('2403', result)
                    // }
                },
                (err) => {
                    console.log(err);
                }
            );
        if (!hayPlan) {
            console.log("***entramos a crarle el plan****");
            await this.consultaGeneralService
                .crearPlan({
                    tipoDoc: this.data.tipoDoc,
                    nroDoc: this.data.nroDocumento,
                })
                .toPromise()
                .then((result) => { })
                .catch((err) => {
                    console.log(err);
                });
            // this.getNuevoPlan()
        }
        this.outData();
        const req: triajeInterface = {
            signosVitales: this.signosVitales,
            listaSignosAlarma: this.aux,
            obsSignosVitales: this.obsFC.value,
            presentaSigno: this.signoPeligroFG.get("presentSigns").value,
            factorRiesgo: this.factorRiesgoFG.value,
            anamnesis: this.anamnesisFC.value,
            servicio: "ATENCION INTEGRAL DEL NINO",
        };
        if (req) {
            await this.consultaService
                .crearConsulta(this.data.nroDocumento, req)
                .toPromise()
                .then((r: any) => {
                    console.log(
                        "respuesta del servidor despues de afiliar a cred",
                        r
                    );
                    let data: dato = {
                        nroDocumento: this.data.nroDocumento,
                        tipoDoc: this.data.tipoDoc,
                        idConsulta: r.object.id,
                        anio: r.object.anioEdad,
                        mes: r.object.mesEdad,
                        dia: r.object.diaEdad,
                        sexo: this.data.sexo,
                        fechaNacimiento: this.data.fechaNacimiento,
                        hidden: true,
                        fechaConsulta: this.datePipe.transform(
                            new Date(),
                            "yyyy-MM-dd HH:mm:ss"
                        ),
                    };
                    this.consultaService.idConsulta = r.object.id;
                    localStorage.setItem(
                        this.attributeLocalS,
                        JSON.stringify(data)
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Actualizado correctamente",
                        text: "",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    /* nos aseguramos que aya guardado para redireccionar */
                    // setTimeout(() => {
                        this.router.navigate(["/dashboard/cred/citas/atencion"]);
                    /* }, 1000); */
                });
        }
    }

    async getPlan(dni: string) {
        await this.consultaGeneralService.traerPlan(dni).subscribe(
            (result) => {
                if (result.cod === "2404") {
                    this.getNuevoPlan();
                    console.log("2404", result);
                }
                if (result.cod === "2403") {
                    console.log("2403", result);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getNuevoPlan(): void {
        this.consultaGeneralService
            .crearPlan({
                tipoDoc: this.data.tipoDoc,
                nroDoc: this.data.nroDocumento,
            })
            .toPromise()
            .then((result) => { })
            .catch((err) => {
                console.log(err);
            });
    }

    saveInterconsulta(): void {
        this.outData();
        const req: interconsultaInterface = {
            signosVitales: this.signosVitales,
            listaSignosAlarma: this.aux,
            obsSignosVitales: this.obsFC.value,
            presentaSigno: this.signoPeligroFG.get("presentSigns").value,
        };
        if (req) {
            this.consultaService
                .crearInterconsulta(this.data.nroDocumento, req)
                .subscribe((r: any) => {
                    /*let data: dato = {
                        nroDocumento: this.data.nroDocumento,
                        tipoDoc: this.data.tipoDoc,
                        idConsulta: r.object.id
                    }
                    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));*/
                    this.idConsultaInterconsulta = r.object.id;
                    Swal.fire({
                        icon: "success",
                        title: "Actualizado correctamente",
                        text: "",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    }

    calcularEdad(fecha: string) {
        let fechaNacimiento: Date = new Date(fecha);
        let dia = fechaNacimiento.getDate();
        let mes = fechaNacimiento.getMonth() + 1;
        let ano = fechaNacimiento.getFullYear();

        // cogemos los valores actuales
        let ahora_ano = this.fecha_hoy.getFullYear();
        let ahora_mes = this.fecha_hoy.getMonth() + 1;
        let ahora_dia = this.fecha_hoy.getDate();

        let edad = ahora_ano + 1900 - ano;
        if (ahora_mes < mes) {
            edad--;
        }
        if (mes == ahora_mes && ahora_dia < dia) {
            edad--;
        }
        if (edad >= 1900) {
            edad -= 1900;
        }

        let meses = 0;
        if (ahora_mes > mes && dia > ahora_dia) meses = ahora_mes - mes - 1;
        else if (ahora_mes > mes) meses = ahora_mes - mes;
        if (ahora_mes < mes && dia < ahora_dia) meses = 12 - (mes - ahora_mes);
        else if (ahora_mes < mes) meses = 12 - (mes - ahora_mes + 1);
        if (ahora_mes == mes && dia > ahora_dia) meses = 11;

        // calculamos los dias
        let dias = 0;
        if (ahora_dia > dia) dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            let ultimoDiaMes: Date = new Date(ahora_ano, ahora_mes - 1, 0);
            dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        this.anio = edad;
        this.mes = meses;
        this.dia = dias;
    }

    imc() {
        let peso = this.examFG.value.PesoFC / 1000;
        let talla = this.examFG.value.TallaFC / 100;
        let imc: number = peso / (talla * talla);
        this.examFG.get("imcFC").setValue(imc.toFixed(2));
        this.imcCred = Number(imc.toFixed(2));
    }

    cambio(e) {
        let bol = false;
        if (this.signoPeligroFG.get("presentSigns").value == true) bol = true;
        this.twoMonthsMore.map((element, index) => {
            if (this.twoMonthsMoreFG.get(element.index).value == true)
                bol = true;
        });
        this.twoMonths.map((element, index) => {
            if (this.twoMonthsFG.get(element.index).value == true) bol = true;
        });
        this.allYear.map((element, index) => {
            if (this.allYearFG.get(element.index).value == true) bol = true;
        });

        if (bol == this.my) {
            this.my = !e.value;
        }
    }

    getExamenes(): void {
        this.saveInterconsulta();
        this.open();
    }
    findInvalidControls(){
        const listInvalid=[]
        const listControls=this.examFG.controls;
        for (const name in listControls) {
            if (listControls[name].invalid) {
                listInvalid.push(name);
            }
        }
        return listInvalid;
            
    }
    getConsultaPrincipal(): void {
        if (this.examFG.invalid) {
            this.examFG.markAllAsTouched();
            const firstInvalid=(this.findInvalidControls())[0]
            document.getElementById(firstInvalid).focus();
            return;
        }
        if (this.data.idConsulta === "") {
            this.save();
        }
        
    }
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
            });
    }

    eliminarInterconsulta(id, index) {
        this.listInterconsulta.splice(index, 1);
        this.consultaGeneralService
            .deleteInterconsulta(this.idConsultaInterconsulta, id)
            .subscribe((r: any) => {
            });
    }
    listaInterconsulta() {
        this.consultaGeneralService
            .listInterconsulta(this.idConsultaInterconsulta)
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
                .addInterconsulta(this.idConsultaInterconsulta, interconsulta)
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
