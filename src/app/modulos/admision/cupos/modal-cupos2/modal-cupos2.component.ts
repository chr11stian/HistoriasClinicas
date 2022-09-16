import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { DocumentoIdentidadService } from "../../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import Swal from "sweetalert2";
import { PacienteService } from "../../../../core/services/paciente/paciente.service";
import { CuposService } from "../../../../core/services/cupos.service";
import { UbicacionService } from "../../../../mantenimientos/services/ubicacion/ubicacion.service";
import { Distrito, Provincias } from "../../../../core/models/ubicacion.models";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { PacienteComponent } from "../../../paciente/paciente.component";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { DialogPacienteComponent } from "../../../paciente/dialog-paciente/dialog-paciente.component";
import { timer } from "rxjs";

@Component({
    selector: "app-modal-cupos2",
    templateUrl: "./modal-cupos2.component.html",
    styleUrls: ["./modal-cupos2.component.css"],
    providers: [DialogService, DynamicDialogConfig],
})
export class ModalCupos2Component implements OnInit {
    // idIpressLapostaMedica = "616de45e0273042236434b51";
    idIpressLapostaMedica: string;
    formPacientesCupo: FormGroup;
    listaDocumentosIdentidad: any;
    dataPacientes: any;
    detallePago: string = "PENDIENTE";
    TipoDoc: string = "DNI";
    dataSelectServicio = "";
    dataSelectAmbiente: "";
    personalSelected: "";
    selectedFecha: "";
    selectedHorario: any;
    dataPersonalSelecionado: any;

    dataDepartamentos: any;
    dataProvincia: any;
    dataDistrito: any;
    dataCentroPoblado: any;
    prov: Provincias;
    dist: Distrito;
    ccpp: any;

    datafecha: Date = new Date();
    datePipe = new DatePipe("en-US");

    /**Edad nacimiento**/
    edad: any;
    meses: any;
    dias: any;

    estadoHoras: string = "LIBRE";
    DataCupos: any;

    /**ID de los datos seleccionados**/
    DepartamentoIDSelct: any;
    ProvinciaIDSelct: any;
    DistritoIDSelct: any;
    listEstadoPago: any = [
        { name: "GRATUITO", value: "GRATUITO" },
        { name: "PENDIENTE ", value: "PENDIENTE" },
    ];
    listaTranseuntes: string[] = ["TRANSEUNTE", "RECURRENTE"];

    public pacienteComponent: PacienteComponent;
    estado: boolean = false;
    constructor(
        private fb: FormBuilder,
        private documentoIdentidadService: DocumentoIdentidadService,
        private messageService: MessageService,
        // public pacienteComponent: PacienteComponent,
        private pacienteService: PacienteService,
        private ubicacionService: UbicacionService,
        private dialog: DialogService,
        private cuposService: CuposService
    ) {
        this.dataSelectServicio = cuposService.ServicioSeleccionado;
        this.dataSelectAmbiente = cuposService.AmbienteSeleccionado;
        this.personalSelected = cuposService.PersonalResponsableSeleccionado;
        this.selectedFecha = cuposService.FechaAtencionSeleccionado;
        this.selectedHorario = cuposService.HoraAtencionSeleccionado;
        this.dataPersonalSelecionado = cuposService.dataPersonalSelecionado;
        this.getDepartamentos();
        this.idIpressLapostaMedica = JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.idIpress;
    }

    ngOnInit(): void {
        this.buildForm();
        this.formPacientesCupo.get("tipoDoc").setValue(this.TipoDoc);
        this.getDocumentosIdentidad();
        // this.calcularEdad("2022-01-31");
        console.log("DATA", this.dataPersonalSelecionado);
        // this.saveForm();
        this.iniciarPaciente();
    }

    /**Recupera las provincias  de un determinado departamento cuando buscas un paciente por su dni**/
    listarUbicacionPacienteProvincias() {
        let departamento = this.dataPacientes.domicilio.departamento;
        this.dataDepartamentos.forEach((object) => {
            if (object.departamento === departamento) {
                console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd;
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct,
        };
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log("PROVINCIA:", this.dataProvincia);
            this.listarUbicacionPacientedistritos();
        });
    }

    /**Recupera los Distritos de un determinado provincia cuando buscas un paciente por su dni**/
    listarUbicacionPacientedistritos() {
        let provincia = this.dataPacientes.domicilio.provincia;
        this.dataProvincia.forEach((object) => {
            if (object.provincia === provincia) {
                console.log("Provincia:", object);
                this.ProvinciaIDSelct = object.idpp;
            }
        });
        let provincia1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.ubicacionService.getDistritos(provincia1).subscribe((res: any) => {
            this.dataDistrito = res.object;
            this.listarUbicacionPacienteCCPP();
        });
    }

    /**Recupera los Centros poblados de un determinado Distrito cuando buscas un paciente por su dni**/
    listarUbicacionPacienteCCPP() {
        let distrito = this.dataPacientes.domicilio.distrito;
        this.dataDistrito.forEach((object) => {
            if (object.distrito === distrito) {
                console.log("Distrito:", object);
                this.DistritoIDSelct = object.iddis;
            }
        });
        let distrito1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        };
        this.ubicacionService
            .getCentroPoblado(distrito1)
            .subscribe((res: any) => {
                this.dataCentroPoblado = res.object;
            });
    }

    /**Lista todos los departamento **/
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
            console.log("Departamento", this.dataDepartamentos);
        });
    }

    /**Selecciona un departamento y lista las provincias**/
    selectedDepartamento() {
        let depa = this.formPacientesCupo.value.dpto;
        this.dataDepartamentos.forEach((object) => {
            if (object.departamento === depa) {
                console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd;
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct,
        };
        this.dataDistrito = "";
        this.dataCentroPoblado = "";
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
        });
        this.formPacientesCupo.get("ccpp").setValue("");
    }

    /**Selecciona un Provincia y lista los Distritos**/
    selectedProvincia() {
        // DistritoIDSelct
        let provinciaX = this.formPacientesCupo.value.prov;
        this.dataProvincia.forEach((object) => {
            if (object.provincia === provinciaX) {
                console.log("Provincia:", object);
                this.ProvinciaIDSelct = object.idpp;
            }
        });

        let provincia = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.dataCentroPoblado = "";
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
        });
        this.formPacientesCupo.get("ccpp").setValue("");
    }

    /**Selecciona un Distrito y lista los Centros Poblados**/
    selectedDistrito() {
        let distritoX = this.formPacientesCupo.value.dist;
        this.dataDistrito.forEach((object) => {
            if (object.distrito === distritoX) {
                console.log("Distrito:", object);
                this.DistritoIDSelct = object.iddis;
            }
        });
        let distrito = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        };
        this.ubicacionService
            .getCentroPoblado(distrito)
            .subscribe((res: any) => {
                this.dataCentroPoblado = res.object;
            });
    }

    buildForm() {
        this.formPacientesCupo = this.fb.group({
            apePaterno: new FormControl({value:"",disabled:true}),
            apeMaterno: new FormControl({value:"",disabled:true}),
            primerNombre: new FormControl({value:"",disabled:true}),
            otrosNombres: new FormControl({value:"",disabled:true}),
            sexo: new FormControl({value:"",disabled:true}),
            estadoCivil: new FormControl({value:"",disabled:true}),
            fechaNacimiento: new FormControl({value:"",disabled:true}),
            nacionalidad: new FormControl({value:"",disabled:true}),

            LugarNacimiento: new FormControl({value:"",disabled:true}),
            GradoInstrucion: new FormControl({value:"",disabled:true}),
            discapacidad: new FormControl({value:"",disabled:true}),
            celular: new FormControl("", Validators.required),

            departamento: new FormControl(""),
            provincia: new FormControl(""),
            distrito: new FormControl(""),
            centroPoblado: new FormControl(""),
            
            tipoDoc: new FormControl("", [Validators.required]),
            nroDoc: new FormControl("", [
                Validators.required,
                Validators.maxLength(8),
            ]),
            
            
            edadAnio: new FormControl({value:"",disabled:true}),
            edadMes: new FormControl({value:"",disabled:true}),
            edadDia: new FormControl({value:"",disabled:true}),
            
            dpto: new FormControl({value:"",disabled:true}),
            prov: new FormControl({value:"",disabled:true}),
            dist: new FormControl({value:"",disabled:true}),
            ccpp: new FormControl({value:"",disabled:true}),
            direccion: new FormControl({value:"",disabled:true}),
            
            tipoSeguro: new FormControl({value:"",disabled:true}),
            detallePago: new FormControl("", [Validators.required]),
            transeunte: new FormControl("", [Validators.required]),
        });
    }

    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService
            .getDocumentosIdentidad()
            .subscribe((res: any) => {
                this.listaDocumentosIdentidad = res.object;
                console.log("docs ", this.listaDocumentosIdentidad);
            });
    }

    obtenerFecha(fecha: Date): string {
        let arr = fecha.toString().split("-");
        const Year: string = arr[0];
        const Months: string = arr[1];
        const Day: string = arr[1];
        console.log(Year + "-" + Months + "-" + Day);
        return Year + "-" + Months + "-" + Day;
    }

    /**Busca un paciente por su numero de documento y los recupera en el formPacientesCupo**/
    pacienteByNroDoc() {
        if (
            this.formPacientesCupo.value.tipoDoc != null &&
            this.formPacientesCupo.value.nroDoc != ""
        ) {
            let auxNroDoc = {
                tipoDoc: this.formPacientesCupo.value.tipoDoc,
                nroDoc: this.formPacientesCupo.value.nroDoc,
            };
            this.pacienteService
                .getPacienteByNroDoc(auxNroDoc)
                .subscribe((res: any) => {
                    if (res.object != null || res.object != undefined) {
                        this.dataPacientes = res.object;
                        console.log("paciente por doc ", this.dataPacientes);
                        this.listarUbicacionPacienteProvincias();
                        if (this.dataSelectServicio == "OBSTETRICIA") {
                            if (
                                this.dataPacientes.sexo == "Femenino" ||
                                this.dataPacientes.sexo == "FEMENINO"
                            ) {
                                this.formPacientesCupo
                                    .get("apePaterno")
                                    .setValue(this.dataPacientes.apePaterno);
                                this.formPacientesCupo
                                    .get("apeMaterno")
                                    .setValue(this.dataPacientes.apeMaterno);
                                this.formPacientesCupo
                                    .get("primerNombre")
                                    .setValue(this.dataPacientes.primerNombre);
                                this.formPacientesCupo
                                    .get("otrosNombres")
                                    .setValue(this.dataPacientes.otrosNombres);
                                this.formPacientesCupo
                                    .get("sexo")
                                    .setValue(this.dataPacientes.sexo);
                                this.formPacientesCupo
                                    .get("fechaNacimiento")
                                    .setValue(this.datePipe.transform(this.dataPacientes.nacimiento.fechaNacimiento,'yyyy-MM-dd'));
                                this.formPacientesCupo
                                    .get("estadoCivil")
                                    .setValue(this.dataPacientes.estadoCivil);
                                this.formPacientesCupo
                                    .get("celular")
                                    .setValue(this.dataPacientes.celular);
                                this.formPacientesCupo
                                    .get("nacionalidad")
                                    .setValue(this.dataPacientes.nacionalidad);
                                this.formPacientesCupo
                                    .get("tipoSeguro")
                                    .setValue(this.dataPacientes.tipoSeguro);
                                this.formPacientesCupo
                                    .get("dpto")
                                    .setValue(
                                        this.dataPacientes.domicilio
                                            .departamento
                                    );
                                this.formPacientesCupo
                                    .get("prov")
                                    .setValue(
                                        this.dataPacientes.domicilio.provincia
                                    );
                                this.formPacientesCupo
                                    .get("dist")
                                    .setValue(
                                        this.dataPacientes.domicilio.distrito
                                    );
                                this.formPacientesCupo
                                    .get("ccpp")
                                    .setValue(
                                        this.dataPacientes.domicilio.ccpp
                                    );
                                this.formPacientesCupo
                                    .get("direccion")
                                    .setValue(
                                        this.dataPacientes.domicilio.direccion
                                    );
                                this.formPacientesCupo
                                    .get("tipoSeguro")
                                    .setValue(this.dataPacientes.tipoSeguro);
                                this.formPacientesCupo
                                    .get("GradoInstrucion")
                                    .setValue(
                                        this.dataPacientes.gradoInstruccion
                                    );
                                this.formPacientesCupo
                                .get("discapacidad")
                                .setValue(this.dataPacientes.discapacidad.length>=1?this.dataPacientes.discapacidad[0]:'No registra');

                                this.calcularEdad(
                                    this.obtenerFecha(this.dataPacientes.nacimiento
                                            .fechaNacimiento
                                    )
                                );
                                this.formPacientesCupo
                                    .get("edadAnio")
                                    .setValue(this.edad);
                                this.formPacientesCupo
                                    .get("edadMes")
                                    .setValue(this.meses);
                                this.formPacientesCupo
                                    .get("edadDia")
                                    .setValue(this.dias);

                                this.formPacientesCupo
                                    .get("GradoInstrucion")
                                    .setValue(
                                        this.dataPacientes.gradoInstruccion
                                    );
                                this.formPacientesCupo
                                    .get("LugarNacimiento")
                                    .setValue(
                                        this.dataPacientes.nacimiento
                                            .departamento +
                                            " " +
                                            this.dataPacientes.nacimiento
                                                .provincia +
                                            " " +
                                            this.dataPacientes.nacimiento
                                                .distrito
                                    );
                                if (this.dataPacientes.tipoSeguro == "SIS") {
                                    this.detallePago = "GRATUITO";
                                }
                            } else {
                                this.messageService.add({
                                    key: "tc",
                                    severity: "info",
                                    summary:
                                        this.dataPacientes.apePaterno +
                                        " " +
                                        this.dataPacientes.apeMaterno +
                                        " " +
                                        this.dataPacientes.primerNombre,
                                    detail: "El servicio no esta disponible",
                                });
                            }
                        } else {
                            /* datosPaciente */
                            this.formPacientesCupo
                                .get("apePaterno")
                                .setValue(this.dataPacientes.apePaterno);
                            this.formPacientesCupo
                                .get("apeMaterno")
                                .setValue(this.dataPacientes.apeMaterno);
                            this.formPacientesCupo
                                .get("primerNombre")
                                .setValue(this.dataPacientes.primerNombre);
                            this.formPacientesCupo
                                .get("otrosNombres")
                                .setValue(this.dataPacientes.otrosNombres);
                            this.formPacientesCupo
                                .get("sexo")
                                .setValue(this.dataPacientes.sexo);
                            this.formPacientesCupo
                                .get("estadoCivil")
                                .setValue(this.dataPacientes.estadoCivil);
                            this.formPacientesCupo
                                .get("fechaNacimiento")
                                .setValue((this.datePipe.transform(this.dataPacientes.nacimiento.fechaNacimiento,'yyyy-MM-dd')));
                            this.formPacientesCupo
                                .get("nacionalidad")
                                .setValue(this.dataPacientes.nacionalidad);    
                            this.formPacientesCupo
                                .get("LugarNacimiento")
                                .setValue(
                                    this.dataPacientes.nacimiento
                                        .departamento +
                                        " " +
                                        this.dataPacientes.nacimiento
                                            .provincia +
                                        " " +
                                        this.dataPacientes.nacimiento
                                            .distrito
                                );
                            this.formPacientesCupo
                                .get("GradoInstrucion")
                                .setValue(this.dataPacientes.gradoInstruccion);
                            this.formPacientesCupo
                                .get("discapacidad")
                                .setValue(this.dataPacientes.discapacidad.length>=1?this.dataPacientes.discapacidad[0]:'No registra');
                            this.formPacientesCupo
                                .get("celular")
                                .setValue(this.dataPacientes.celular);
                            /* domicilio paciente */
                            this.formPacientesCupo
                                .get("tipoSeguro")
                                .setValue(this.dataPacientes.tipoSeguro);
                            this.formPacientesCupo
                                .get("dpto")
                                .setValue(
                                    this.dataPacientes.domicilio.departamento
                                );
                            this.formPacientesCupo
                                .get("prov")
                                .setValue(
                                    this.dataPacientes.domicilio.provincia
                                );
                            this.formPacientesCupo
                                .get("dist")
                                .setValue(
                                    this.dataPacientes.domicilio.distrito
                                );
                            this.formPacientesCupo
                                .get("ccpp")
                                .setValue(this.dataPacientes.domicilio.ccpp);
                            this.formPacientesCupo
                                .get("direccion")
                                .setValue(
                                    this.dataPacientes.domicilio.direccion
                                );
                            this.formPacientesCupo
                                .get("tipoSeguro")
                                .setValue(this.dataPacientes.tipoSeguro);
                            

                            this.calcularEdad(this.dataPacientes.nacimiento.fechaNacimiento)
                            this.formPacientesCupo
                                .get("edadAnio")
                                .setValue(this.edad);
                            this.formPacientesCupo
                                .get("edadMes")
                                .setValue(this.meses);
                            this.formPacientesCupo
                                .get("edadDia")
                                .setValue(this.dias);

                            this.formPacientesCupo
                                .get("GradoInstrucion")
                                .setValue(this.dataPacientes.gradoInstruccion);
                            
                            if (this.dataPacientes.tipoSeguro == "SIS") {
                                this.detallePago = "GRATUITO";
                            }
                        }
                    } else {
                        let timerInterval;
                        Swal.fire({
                            icon: "info",
                            title: "Paciente",
                            html:
                                "No existe en la Base de Datos,<b>" +
                                "<br>" +
                                "</b>Registre nuevo paciente",
                            text: "Resgiste nuevo paciente en la Base de Datos",
                            timer: 2000,
                            timerProgressBar: true,
                            target: document.getElementById("swal"),
                            didOpen: () => {
                                Swal.showLoading();
                                setTimeout(() => {
                                    this.buscarNuevoPaciente();
                                }, 2002);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                        });

                        // Swal.fire({
                        //         icon: 'warning',
                        //         title: 'Paciente',
                        //         text: 'No existe en la base de Datos',
                        //         showConfirmButton: false,
                        //         target: document.getElementById('swal'),
                        //         timer: 1500,
                        //     },
                        // )
                        // setTimeout(() => {
                        //     this.buscarNuevoPaciente();
                        // }, 2002);
                    }
                    console.log("nro", this.formPacientesCupo.value.nroDoc);
                });
        } else {
            console.log("nro", this.formPacientesCupo.value.nroDoc);
            return;
        }
    }

    buscarNuevoPaciente() {
        this.cuposService.modalPacientes = this.dialog.open(
            DialogPacienteComponent,
            {
                header: "NUEVO PACIENTE",
                style: {
                    width: "90%",
                },
                contentStyle: {
                    overflow: "auto",
                },
            }
        );
    }

    /**Registra un nuevo cupo para un determinado paciente**/
    saveForm() {
        const req = {
            fechaAtencion: this.selectedFecha,
            nroCupo: "",
            oferta_id: this.dataPersonalSelecionado.id,
            descripcion: "asdfgh",
            horaAtencion: this.selectedHorario[0].horaInicio,
            horaAtencionFin: this.selectedHorario[0].horaFin,
            ambiente: this.dataPersonalSelecionado.ambiente,

            paciente: {
                nombre:
                    this.formPacientesCupo.get('primerNombre').value +
                    ", " +
                    this.formPacientesCupo.get('otrosNombres').value,
                apellidos:
                    this.formPacientesCupo.get('apePaterno').value +
                    ", " +
                    this.formPacientesCupo.get('apeMaterno').value,
                tipoDoc: this.formPacientesCupo.value.tipoDoc,
                nroDoc: this.formPacientesCupo.value.nroDoc,
                edadAnio: this.formPacientesCupo.value.edadAnio,
                edadMes: this.formPacientesCupo.value.edadMes,
                edadDia: this.formPacientesCupo.value.edadDia,
                nroHcl: this.dataPacientes.nroHcl,
                sexo: this.formPacientesCupo.get('sexo').value,
                nroTelefono: this.formPacientesCupo.value.celular,
            },

            transeunte:
                this.formPacientesCupo.value.transeunte == "TRANSEUNTE"
                    ? true
                    : false,
            detallePago: this.detallePago,
            tipoConsulta: this.cuposService.tipoConsulta,

            ipress: {
                ipress_id: this.dataPersonalSelecionado.ipress.idIpress,
                nombre: this.dataPersonalSelecionado.ipress.nombre,
                servicio: this.dataPersonalSelecionado.ipress.servicio,
            },
        };

        if (this.cuposService.data == undefined) {
            console.log("guardar cupo ", req);
            this.cuposService.saveCupos(req).subscribe((result: any) => {
                console.log(result.object);
                if (result.object != null || result.object != undefined) {
                    this.cuposService.modal2.close();
                    this.getCuposXservicio();
                    Swal.fire({
                        icon: "success",
                        title: "Cupo",
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    this.updatePacienteCupos();
                    this.actualizarOfertaEstado();
                    this.formPacientesCupo.reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Cupo No Registrado",
                        text: result.mensaje,
                        showConfirmButton: false,
                        target: document.getElementById("swal"),
                        timer: 2000,
                    });
                    return;
                }
            });
        } else {
            const reqInterconsulta = {
                id: this.cuposService.data.id,
                fechaAtencion: this.selectedFecha,
                nroCupo: this.cuposService.data.nroCupo,
                descripcion: "",
                ambiente: this.dataPersonalSelecionado.ambiente,
                detallePago: this.detallePago,

                horaAtencion: this.selectedHorario[0].horaInicio,
                horaAtencionFin: this.selectedHorario[0].horaFin,

                ipress: {
                    ipress_id: this.cuposService.data.ipress.ipress_id,
                    nombre: this.dataPersonalSelecionado.ipress.nombre,
                    servicio: this.cuposService.data.ipress.servicio,
                },
                nivelUrgencia: this.cuposService.data.nivelUrgencia,

                oferta_id: this.dataPersonalSelecionado.id,
                paciente: {
                    nombre:
                        this.formPacientesCupo.get('primerNombre').value +
                        ", " +
                        this.formPacientesCupo.get('otrosNombres').value,
                    apellidos:
                        this.formPacientesCupo.get('apePaterno').value +
                        ", " +
                        this.formPacientesCupo.get('apeMaterno').value,
                    tipoDoc: this.formPacientesCupo.value.tipoDoc,
                    nroDoc: this.formPacientesCupo.value.nroDoc.toString(),
                    edadAnio: this.formPacientesCupo.value.edadAnio,
                    edadMes: this.formPacientesCupo.value.edadMes,
                    edadDia: this.formPacientesCupo.value.edadDia,
                    nroHcl: this.dataPacientes.nroHcl,
                    sexo: this.formPacientesCupo.get('sexo').value,
                    nroTelefono: this.formPacientesCupo.value.celular,
                },
                tipoConsulta: this.cuposService.tipoConsulta,
                transeunte:
                    this.formPacientesCupo.value.transeunte == "TRANSEUNTE"
                        ? true
                        : false,
            };
            this.cuposService
                .putInterconsultaCupo(reqInterconsulta)
                .subscribe((r: any) => {
                    if (r.object != null || r.object != undefined) {
                        this.cuposService.modal2.close();
                        this.getCuposXservicio();
                        this.actualizarOfertaEstado();
                        Swal.fire({
                            icon: "success",
                            title: "Cupo",
                            text: r.mensaje,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }
                });
        }
    }

    /**Actualiza el estdo de una oferta que pertenece al Personal**/
    actualizarOfertaEstado() {
        let data = {
            idOferta: this.dataPersonalSelecionado.id,
            horaInicio: this.selectedHorario[0].horaInicio,
            horaFin: this.selectedHorario[0].horaFin,
            estado: "OCUPADO",
        };
        console.log("DATA ACTUALIZAR OFERTA", data);
        this.cuposService.updateEstadoOferta(data).subscribe((resp) => {
            this.messageService.add({
                severity: "success",
                summary: "Oferta",
                detail: "Actualizo con exito",
            });
        });
    }

    updatePacienteCupos() {
        let data = {
            tipoDoc: this.formPacientesCupo.value.tipoDoc,
            nroDoc: this.formPacientesCupo.value.nroDoc,
            celular: this.formPacientesCupo.value.celular,
            tipoSeguro: this.formPacientesCupo.value.tipoSeguro,
            gradoInstruccion: this.formPacientesCupo.value.GradoInstrucion,
            domicilio: {
                departamento: this.formPacientesCupo.value.dpto,
                provincia: this.formPacientesCupo.value.prov,
                distrito: this.formPacientesCupo.value.dist,
                direccion: this.formPacientesCupo.value.direccion,
                idccpp: "",
                ccpp: this.formPacientesCupo.value.ccpp,
                ubigeo:
                    this.DepartamentoIDSelct +
                    this.ProvinciaIDSelct +
                    this.DistritoIDSelct,
            },
        };
        console.log("DATA PACIENTE YY", data);
        this.cuposService.updatePacienteExtras(data).subscribe((resp) => {
            this.messageService.add({
                severity: "success",
                summary: "Paciente",
                detail: "Actualizo con exito",
            });
        });
    }

    esNumero(strNumber) {
        if (strNumber == null) return false;
        if (strNumber == undefined) return false;
        if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
        if (strNumber == "") return false;
        if (strNumber === "") return false;
        let psInt, psFloat;
        psInt = parseInt(strNumber);
        psFloat = parseFloat(strNumber);
        return !isNaN(strNumber) && !isNaN(psFloat);
    }

    /**Calcula la edad del paciente**/
    calcularEdad1(fecha) {
        /** Si la fecha es correcta, calculamos la edad*/
        if (
            typeof fecha != "string" &&
            fecha &&
            this.esNumero(fecha.getTime())
        ) {
            fecha = fecha.formatDate(fecha, "yyyy-MM-dd");
        }
        let values = fecha.split("-");
        let dia = values[2];
        let mes = values[1];
        let ano = values[0];

        // cogemos los valores actuales
        let fecha_hoy = new Date();
        let ahora_ano = fecha_hoy.getFullYear();
        let ahora_mes = fecha_hoy.getMonth() + 1;
        let ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        this.edad = ahora_ano + 0 - ano;
        if (ahora_mes < mes) {
            this.edad--;
        }
        if (mes == ahora_mes && ahora_dia < dia) {
            this.edad--;
        }
        if (this.edad > 0) {
            this.edad -= 0;
        }

        // calculamos los meses
        this.meses = 0;

        if (ahora_mes > mes && dia > ahora_dia)
            this.meses = ahora_mes - mes - 1;
        else if (ahora_mes > mes) this.meses = ahora_mes - mes;
        if (ahora_mes < mes && dia < ahora_dia)
            this.meses = 12 - (mes - ahora_mes);
        else if (ahora_mes < mes) this.meses = 12 - (mes - ahora_mes + 1);
        if (ahora_mes == mes && dia > ahora_dia) this.meses = 11;

        // calculamos los dias
        this.dias = 0;
        if (ahora_dia > dia) this.dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            let ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
            this.dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        return (
            this.edad +
            " años, " +
            this.meses +
            "meses y " +
            this.dias +
            " días"
        );
    }
    fecha_hoy = new Date();
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
        this.edad = edad;
        this.meses = meses;
        this.dias = dias;
    }

    /**Lista de Cupos y citas sin importar el estado reservados por servicio **/
    getCuposXservicio() {
        let data = {
            servicio: this.dataPersonalSelecionado.ipress.servicio,
            fecha: this.dataPersonalSelecionado.fechaOferta,
        };
        console.log("DATA ", data);
        this.cuposService
            .getCuposServicioFecha(this.idIpressLapostaMedica, data)
            .subscribe((res: any) => {
                this.DataCupos = res.object;
                this.cuposService.dataCupos = res.object;
            });
    }

    cerrar() {
        this.formPacientesCupo.reset();
        this.cuposService.modal2.close();
    }

    isInvalid(control: string): boolean {
        const formC: AbstractControl = this.formPacientesCupo.get(control);
        return formC.invalid && (formC.dirty || formC.touched);
    }
    tipoPagoChg() {
        this.detallePago = this.formPacientesCupo.value.detallePago;
        console.log("detalle Pago", this.detallePago);
    }
    /* interconsulta */
    iniciarPaciente() {
        if (this.cuposService.tab == 4) {
            this.estado = true;
            this.formPacientesCupo
                .get("nroDoc")
                .setValue(this.cuposService.data.paciente.nroDoc);
            this.pacienteByNroDoc();
        }
    }
}
