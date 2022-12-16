import { NombresResponsable } from "./../../../../../../../visita-domiciliaria/interfaces/visita-domiciliaria";
import { Component, OnInit, DoCheck } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FinalizarConsultaService } from "../../../services/finalizar-consulta.service";
import {
    dato,
    laboratorio,
    ExamenesAuxiliares,
    SignosVitales,
    IpressOrigenOrIpressDestino,
    PersonalR,
    ReferenciaOrigen,
} from "../../../../../models/data";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

interface formControlInterface {
    pro: string;
    label: string;
    nameFC: string;
}

interface diagnosticoInterface {
    codPrestacion: string;
    nombreUPS: string;
    diagnosticoSIS: string;
    cie10SIS: string;
    diagnosticoHIS: string;
    cie10HIS: string;
    tipo: string;
    factorCondicional: string;
}

interface examenInterface {
    examen: string;
    tipo: string;
    descripcion: string;
}

interface tratamientoInterface {
    cantidad: string;
    dosis: string;
    intervalo: string;
    duracion: string;
    fechaVenc: string;
    medicamento: medicamentoInterface;
}

interface medicamentoInterface {
    codigo: string;
    nombre: string;
    ff: string;
    concentracion: string;
    viaAdministracion: string;
}

@Component({
    selector: "app-modal-referencia",
    templateUrl: "./modal-referencia.component.html",
    styleUrls: ["./modal-referencia.component.css"],
    providers: [DialogService],
})
export class ModalReferenciaComponent implements OnInit, DoCheck {
    fecha: Date = new Date();
    datePipe = new DatePipe("en-US");
    data: dato;
    attributeLocalS = "documento";
    formReferencia: FormGroup;
    examFG: FormGroup;
    sis: string = "CUZ-234234235";
    historia: string = "";
    edad: string = "";
    listIpress: IpressOrigenOrIpressDestino[] = [];
    //-- examenes auxiliares
    datosPaciente;
    dataExamenesRealizados;
    object;
    listaPersonalDestino;
    listaPersonalOrigen;
    personalDestino: PersonalR[];
    personalOrigen: PersonalR[];
    personalReferencia: PersonalR;
    usuario;
    stateOptions = [
        { label: "Si", value: true },
        { label: "No", value: false },
    ];
    sexOptions = [
        { label: "F", value: true },
        { label: "M", value: false },
    ];
    labelFisico: string[] = [
        "Piel y Faneras (cabello, uñas)",
        "Cabeza",
        "Cara",
        "Cuello",
        "Tórax",
        "Abdomen",
        "Columna Vertebral",
        "Extremidades",
        "Genitouriano",
        "Ano",
    ];
    dataExamFisicos: formControlInterface[] = [
        { pro: "temperatura", label: "T (c°)", nameFC: "TFC" },
        { pro: "presionSistolica", label: "PS (pa)", nameFC: "PSFC" },
        { pro: "presionDiastolica", label: "PD (pa)", nameFC: "PDFC" },
        { pro: "fc", label: "FC (l*min):", nameFC: "FC" },
        { pro: "fr", label: "FR", nameFC: "FRFC" },
        { pro: "peso", label: "Peso (kg)", nameFC: "PesoFC" },
        { pro: "talla", label: "Talla (m)", nameFC: "TallaFC" },
        { pro: "imc", label: "imc(kg/m2)", nameFC: "imcFC" },
        { pro: "perimetroCefalico", label: "PC (cm)", nameFC: "PCFC" },
    ];
    selectedDestino = [];
    selectedEspecialidad = [];
    destino = [
        { name: "Emergencia", code: "Emergencia" },
        { name: "Consulta Externa", code: "Consulta Externa" },
        { name: "Apoyo al diagnóstico", code: "Apoyo al diagnóstico" },
    ];
    especialidad = [
        { name: "Pediatria", code: "Pediatria" },
        { name: "Cirugía", code: "Cirugía" },
        { name: "Gineco Obstetra", code: "Gineco Obstetra" },
        { name: "Laboratorio", code: "Laboratorio" },
        { name: "Dx. Imagen", code: "Dx. Imagen" },
        { name: "Otros", code: "Otros" },
    ];
    condicion = [
        { name: "Estable", code: "Estable" },
        { name: "Mal estado", code: "Mal estado" },
    ];
    examenFisico: examenInterface[] = [];
    examenAux: ExamenesAuxiliares[] = [];
    diagnostico: diagnosticoInterface[] = [];
    tratamientos: tratamientoInterface[] = [];

    constructor(
        public dialog: DialogService,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private referenceService: FinalizarConsultaService
    ) {}

    ngDoCheck() {
        //console.log('form', this.formReferencia.get('destino').value)
    }

    ngOnInit(): void {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.buildForm();
        this.inicializar();
    }

    inicializar() {
        this.referenceService
            .getReferenciaDatos(this.data.idConsulta)
            .subscribe((r: any) => {
                //console.log(r.object);
                this.object = r.object;
                this.datosPaciente = r.object.datosPaciente;
                let signosVitales: SignosVitales = r.object.signosVitales;
                let examFisico = r.object.examenesFisicos;
                this.diagnostico = r.object.diagnosticos;
                this.tratamientos = r.object.tratamientos;
                this.historia = r.object.nroHcl;
                this.formReferencia
                    .get("origen")
                    .setValue(r.object.ipress.nombreEESS);
                let anio = r.object.anioEdad === null ? "0" : r.object.anioEdad;
                let mes = r.object.mesEdad === null ? "0" : r.object.mesEdad;
                let dia = r.object.diaEdad === null ? "0" : r.object.diaEdad;
                this.edad = anio + " años " + mes + " meses " + dia + " dias ";
                this.formReferencia
                    .get("nombre")
                    .setValue(
                        this.datosPaciente.primerNombre +
                            " " +
                            this.datosPaciente.otrosNombres +
                            " " +
                            this.datosPaciente.apePaterno +
                            " " +
                            this.datosPaciente.apeMaterno
                    );
                this.formReferencia
                    .get("domicilio")
                    .setValue(this.datosPaciente.domicilio.direccion);
                this.formReferencia
                    .get("departamento")
                    .setValue(this.datosPaciente.domicilio.departamento);
                this.formReferencia
                    .get("distrito")
                    .setValue(this.datosPaciente.domicilio.distrito);
                this.formReferencia
                    .get("sex")
                    .setValue(!(this.datosPaciente.sexo === "MASCULINO"));
                this.formReferencia
                    .get("anamnesis")
                    .setValue(r.object.anamnesis);

                this.examFG.get("TFC").setValue(signosVitales.temperatura);
                this.examFG
                    .get("PSFC")
                    .setValue(signosVitales.presionSistolica);
                this.examFG
                    .get("PDFC")
                    .setValue(signosVitales.presionDiastolica);
                this.examFG.get("FC").setValue(signosVitales.fc);
                this.examFG.get("FRFC").setValue(signosVitales.fr);
                this.examFG.get("PesoFC").setValue(signosVitales.peso);
                this.examFG.get("TallaFC").setValue(signosVitales.talla);
                this.examFG.get("imcFC").setValue(signosVitales.imc);
                this.examFG
                    .get("PCFC")
                    .setValue(signosVitales.perimetroCefalico);
                if (examFisico !== null) {
                    examFisico.map((obj: any, index) => {
                        this.examenFisico.push({
                            examen: "Examen Fisico",
                            tipo: this.labelFisico[index],
                            descripcion: obj.valor,
                        });
                    });
                }
            });
        this.referenceService
            .searchLaboratorio(this.data.idConsulta)
            .subscribe((r: any) => {
                let aux: laboratorio[] = r.object;
                if (aux.length > 0) {
                    aux.map((obj: laboratorio) => {
                        let aux_: ExamenesAuxiliares = {
                            tipoExamAux: obj.datosLaboratorio.tipoLaboratorio,
                            subTipo: obj.datosLaboratorio.subTipo,
                            nombreExamen: obj.datosLaboratorio.nombreExamen,
                        };
                        this.examenAux.push(aux_);
                    });
                }
            });
    }

    buildForm(): void {
        this.examFG = new FormGroup({
            obsFC: new FormControl({ value: "", disabled: false }),
            TFC: new FormControl({ value: null, disabled: false }, []),
            PSFC: new FormControl({ value: null, disabled: false }, []),
            PDFC: new FormControl({ value: null, disabled: false }, []),
            FC: new FormControl({ value: null, disabled: false }, []),
            FRFC: new FormControl({ value: null, disabled: false }, []),
            PesoFC: new FormControl({ value: null, disabled: false }, []),
            TallaFC: new FormControl({ value: null, disabled: false }, []),
            imcFC: new FormControl({ value: null, disabled: false }, []),
            PCFC: new FormControl({ value: null, disabled: false }, []),
            detailFC: new FormControl({ value: null, disabled: false }, []),
        });
        this.formReferencia = this.formBuilder.group({
            motivo: new FormControl("", []),
            anamnesis: new FormControl("", []),
            asegurado: new FormControl(true),
            sex: new FormControl(true),
            fecha: new FormControl("", []),
            hour: new FormControl("", []),
            fechaAtencion: new FormControl("", []),
            hourAtencion: new FormControl("", []),
            tipoSub: new FormControl("", []),
            subsidiado: new FormControl("", []),
            semisubsidiado: new FormControl("", []),
            otros: new FormControl("", []),
            origen: new FormControl("", []),
            destino: new FormControl("", []),
            sis: new FormControl("", []),
            historia: new FormControl("", []),
            nombre: new FormControl("", []),
            domicilio: new FormControl("", []),
            departamento: new FormControl("", []),
            distrito: new FormControl("", []),
            referencia: new FormControl("", []),
            especialidad: new FormControl("", []),
            condicion: new FormControl("", []),
            nombreAtendera: new FormControl("", []),
            nombreCoordino: new FormControl("", []),
            nombreReferencia: new FormControl("", []),
            nombreResponsableEstablecimiento: new FormControl("", []),
            nombreAcompania: new FormControl("", []),
            nombreRecibe: new FormControl("", []),
        });
    }

    imc() {
        let peso = this.examFG.value.PesoFC;
        let talla = this.examFG.value.TallaFC;
        this.examFG.get("imcFC").setValue(peso / (talla * talla));
    }

    save() {
        let body: ReferenciaOrigen = {
            tipoSubsidio: this.formReferencia.value.tipoSub,
            mesEdad: this.object.mesEdad === null ? "0" : this.object.mesEdad,
            diaEdad: this.object.diaEdad === null ? "0" : this.object.diaEdad,
            ipressDestino: {
                nombreEESS: this.listIpress[0].nombreEESS,
                idIpress: this.listIpress[0].id,
                disa: this.listIpress[0].red.disa,
                renipress: this.listIpress[0].renipress,
            },
            tipoReferencia: this.formReferencia.value.referencia,
            fechaAtendera: this.datePipe.transform(
                this.formReferencia.value.fechaAtencion,
                "yyyy-MM-dd"
            ),
            horaAtendera: this.datePipe.transform(
                this.formReferencia.value.hourAtencion,
                "HH:mm"
            ),
            personalAtendera: this.formReferencia.value.nombreAtendera,
            personalCoordino: this.formReferencia.value.nombreCoordino,
            especialidadDestino: this.formReferencia.value.especialidad,
            condicionPacienteSalida: this.formReferencia.value.condicion,
            responsableReferencia: this.formReferencia.value.nombreReferencia,
            resposableEstablecimiento:
                this.formReferencia.value.nombreResponsableEstablecimiento,
            personalQueAcompania: this.formReferencia.value.nombreAcompania,
            personalQueRecibe: this.formReferencia.value.nombreRecibe,
        };
        //console.log("clg", body);
        this.ref.close()
        /* this.referenceService
            .postReferencia(this.data.idConsulta, body)
            .subscribe((r: any) => {
                if (r.cod == "2125") {
                    Swal.fire({
                        icon: "success",
                        title: "Se genero la referencia",
                        text: "",
                        showConfirmButton: true,
                        timer: 2000,
                    });
                }
            }); */
    }

    filterIpress(event: any) {
        this.referenceService
            .buscarIprees(event.query)
            .subscribe((res: any) => {
                this.listIpress = res.object;
                this.buildPersonal(this.listIpress[0].id);
            });
    }

    filterPersonalDestino(event) {
        let filtered: PersonalR[] = [];
        let query = event.query;

        for (let i = 0; i < this.listaPersonalDestino.length; i++) {
            let personal = this.listaPersonalDestino[i];
            if (
                personal.nombreCompleto
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(personal);
            }
        }

        this.personalDestino = filtered;
    }

    filterPersonalOrigen(event) {
        let filtered: PersonalR[] = [];
        let query = event.query;

        for (let i = 0; i < this.listaPersonalOrigen.length; i++) {
            let personal = this.listaPersonalOrigen[i];
            if (
                personal.nombreCompleto
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(personal);
            }
        }

        this.personalOrigen = filtered;
    }

    buildPersonal(idIpress) {
        let lista: PersonalR[] = [];
        this.referenceService.getListPersonal(idIpress).subscribe((r: any) => {
            r.object.map((p: any) => {
                lista.push({
                    idPersonal: p.id,
                    nroDoc: p.nroDoc,
                    tipoDoc: p.tipoDoc,
                    colegiatura: p.colegiatura,
                    profesion: p.tipoPersonal.nombre,
                    nombres: p.primerNombre + " " + p.otrosNombres,
                    apellidos: p.apePaterno + " " + p.apeMaterno,
                    nombreCompleto:
                        p.primerNombre +
                        " " +
                        p.otrosNombres +
                        " " +
                        p.apePaterno +
                        " " +
                        p.apeMaterno,
                });
            });
            this.listaPersonalDestino = lista;
        });
        let listaO: PersonalR[] = [];
        console.log("object", this.object.ipress.idIpress);
        this.referenceService
            .getListPersonal(this.object.ipress.idIpress)
            .subscribe((r: any) => {
                r.object.map((p: any) => {
                    listaO.push({
                        idPersonal: p.id,
                        nroDoc: p.nroDoc,
                        tipoDoc: p.tipoDoc,
                        colegiatura: p.colegiatura,
                        profesion: p.tipoPersonal.nombre,
                        nombres: p.primerNombre + " " + p.otrosNombres,
                        apellidos: p.apePaterno + " " + p.apeMaterno,
                        nombreCompleto:
                            p.primerNombre +
                            " " +
                            p.otrosNombres +
                            " " +
                            p.apePaterno +
                            " " +
                            p.apeMaterno,
                    });
                });
                this.listaPersonalOrigen = listaO;
                //console.log("origen", this.listaPersonalOrigen);
            });
    }
}
