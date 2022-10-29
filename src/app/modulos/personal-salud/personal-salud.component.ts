import { Component, OnInit } from "@angular/core";
import { PersonalService } from "../../core/services/personal-services/personal.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Personal } from "src/app/core/models/personal.models";
import { DocumentoIdentidadService } from "src/app/mantenimientos/services/documento-identidad/documento-identidad.service";
import {
    ColegioProfesional,
    DocumentoIdentidad,
    Especialidad,
    TipoPersonal,
} from "src/app/core/models/mantenimiento.models";
import { PidePatient } from "../admision/models/model";
import { TipoPersonalService } from "src/app/mantenimientos/services/tipo-personal/tipo-personal.service";
import { EspecialidadService } from "src/app/mantenimientos/services/especialidad/especialidad.service";
import { ColegioProfesionalService } from "src/app/mantenimientos/services/colegio-profesional/colegio-profesional.service";
import { DatePipe, getLocaleDateFormat } from "@angular/common";
import { TipoContratoService } from "src/app/mantenimientos/services/tipo-contrato/tipo-contrato.service";
import { IpressService } from "src/app/core/services/ipress/ipress.service";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { image } from "../../../assets/images/image.const";
import { TipoUpsService } from "src/app/mantenimientos/services/tipo-ups.service";
import { UsuarioService } from "../usuarios/services/usuario.service";
import { LoginService } from "../../login/services/login.service";
import { dato } from "../../cred/citas/models/data";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { InputSwitchModule } from "primeng/inputswitch";

@Component({
    selector: "app-personal-salud",
    templateUrl: "./personal-salud.component.html",
    styleUrls: ["./personal-salud.component.css"],
    providers: [DynamicDialogRef],
})
export class PersonalSaludComponent implements OnInit {
    // Creacion del formulario
    form: FormGroup;
    formEspecialidad: FormGroup;
    formRol: FormGroup;
    formRoles: FormGroup;
    imagePath: string = image;
    //datos a usar
    data: Personal[] = [];
    dataPIDE: any;
    isUpdate: boolean = false;
    isUpdateEspecialidad: boolean = false;
    isUpdateRolX: boolean = false;
    idUpdate: string = "";
    docList: DocumentoIdentidad[];
    tiposPersonalList: TipoPersonal[];
    especialidadesList: Especialidad[];
    rolesXList: any[];
    colegiosList: ColegioProfesional[];
    sexoList: any[];
    tiposContratoList: any[];
    domicilioList: any[];
    stateOptions: any[];
    nombrePersonal: string = "";
    idEspecialidad: string = "";
    idRolX: string = "";
    estadoUpdateEspecialidad: boolean;
    ipressList: any[];
    datosPersonales: any[];
    especialidades: any[];
    rolesX: any[] = [];
    rolesSistema: any[] = [];
    listaUpsX: any[];
    personalDialog: boolean;
    personalEspecialidadDialog: boolean;
    personalRolDialogX: boolean;
    rolSistema: boolean;
    datePipe = new DatePipe("en-US");
    idIpress: string = "";
    iprees: any;
    listaRol: rol[] = [];
    nombreRolOpciones: any[] = [
        //"ASISTENCIAL",
        //"ADMINISTRATIVO"
    ];
    datoLocalStore: dato;
    nroDocRow: string = "";
    idPersonal: string = "";
    dataEditRol: Edit;
    root: boolean;
    description: any[] = [];
    dniPersonal: string = "";
    texto: string = "";
    dataPersona: PidePatient;
    designar: boolean;
    ipressNombre: string;
    constructor(
        public ref: DynamicDialogRef,
        private personalservice: PersonalService,
        private documentoservice: DocumentoIdentidadService,
        private tipoPersonalservice: TipoPersonalService,
        private especialidadservice: EspecialidadService,
        private colegioservice: ColegioProfesionalService,
        private tipoContratoservice: TipoContratoService,
        private ipressservice: IpressService,
        private formBuilder: FormBuilder,
        private rolGuardiaService: RolGuardiaService,
        private tipoUpsService: TipoUpsService,
        private loginService: LoginService
    ) {
        this.root =
            JSON.parse(localStorage.getItem("rol")) === "ROLE_ADMININ_PERSONAL"
                ? true
                : false;
        if (!this.root) {
            this.idIpress = JSON.parse(
                localStorage.getItem("usuario")
            ).ipress.idIpress;
            this.iprees = JSON.parse(localStorage.getItem("usuario")).ipress;
        }
        this.buildForm();
        this.getDocumentos();
        this.getTiposPersonal();
        this.getEspecialidades();
        this.getColegios();
        this.getTipoContratos();
        this.getIpress();
        this.getListaUps();
        this.getSexos();
        this.getNombreRoles();
        this.root ? this.getListAdmin() : this.getPersonal();
        this.texto = this.root
            ? "Lista de Administradores"
            : "Lista del Personal de " +
            JSON.parse(localStorage.getItem("usuario")).ipress.nombreEESS;
        this.stateOptions = [
            { label: "Activo", value: true },
            { label: "Inactivo", value: false },
        ];
        this.domicilioList = [
            {
                apePaterno: "OLAZABAL",
                apeMaterno: "CALLER",
                nombres: "LETICIA GIULIANA",
                sexo: "FEMENINO",
                fechaNacimiento: "2000-05-06",
                estadoCivil: "SOLTERA",
                domicilioActual: "URB. TUPAC AMARU",
                nacionalidad: "PERUANA",
                departamento: "CUSCO",
                provincia: "CUSCO",
                distrito: "SAN SEBASTIAN",
            },
        ];
        this.datosPersonales = [];
        this.description = [
            {
                rol: "ROLE_ADMIN",
                description: "rol administrador de iprees",
            },
            {
                rol: "ROLE_ENF_PERSONAL",
                description:
                    "rol destinado para el personal de CRED y OBSTETRICIA",
            },
            {
                rol: "VISITA_DOMICILIARIA_PROFESIONAL",
                description:
                    "rol destinado para el personal encargado de visita domiciliaria",
            },
            {
                rol: "VISITA_DOMICILIARIA_ACTOR_SOCIAL",
                description:
                    "rol destinado para el personal que cumple labores de actor social",
            },
            {
                rol: "ROLE_TEC_ADMINI_ADMIN",
                description:
                    "rol destinado para el personal que cumple las funciones de administrar los cupos",
            },
            {
                rol: "ROLE_FARM_PERSONAL",
                description:
                    "rol destinado para el personal que cumple las labores dentro de la farmacia",
            },
            {
                rol: "ROLE_LAB_PERSONAL",
                description:
                    "rol destinado para el personal que cumple las labores dentro del laboratorio",
            },
            {
                rol: "ROLE_TEC_ADMINI_PERSONAL",
                description:
                    "rol destinado para el personal que administra los cupos",
            },
        ];
    }

    getListAdmin() {
        this.personalservice.getListAdmin().subscribe((r: any) => {
            r.map((obj) => {
                this.data.push(obj.personal);
            });
        });
    }

    getNombreRoles() {
        this.tipoUpsService.getTipoUPSs().subscribe((res: any) => {
            this.nombreRolOpciones = res.object;
        });
    }

    getDocumentos() {
        this.documentoservice.getDocumentosIdentidad().subscribe((res: any) => {
            this.docList = res.object;
        });
    }

    getTiposPersonal() {
        this.tipoPersonalservice.getTipoPersonales().subscribe((res: any) => {
            this.tiposPersonalList = res.object;
        });
    }

    getEspecialidades() {
        this.especialidadservice.getEspecialidad().subscribe((res: any) => {
            this.especialidadesList = res.object;
        });
    }

    getColegios() {
        this.colegioservice.getColegioProfesional().subscribe((res: any) => {
            this.colegiosList = res.object;
        });
    }

    getTipoContratos() {
        this.tipoContratoservice.getTipoContrato().subscribe((res: any) => {
            this.tiposContratoList = res.object;
        });
    }

    getPersonalIdEspecialidad() {
        this.personalservice
            .getPersonalID(this.idEspecialidad)
            .subscribe((res: any) => {
                this.especialidades = res.object.especialidad;
            });
    }

    getPersonalIdRol() {
        this.personalservice
            .getPersonalID(this.idEspecialidad)
            .subscribe((res: any) => {
                this.especialidades = res.object.especialidad;
            });
    }

    getIpress() {
        this.ipressservice.getIpress().subscribe((res: any) => {
            this.ipressList = res.object;
            console.log(this.ipressList);
        });
    }

    getSexos() {
        this.personalservice.getSexos().subscribe((res: any) => {
            this.sexoList = res.sexo;
        });
    }

    buildForm() {
        this.formRoles = this.formBuilder.group({
            rol: [""],
        });
        this.form = this.formBuilder.group({
            tipoDoc: ["", [Validators.required]],
            nroDoc: ["", [Validators.required]],
            apePaterno: ["", [Validators.required]],
            apeMaterno: ["", [Validators.required]],
            nombres: ["", [Validators.required]],
            fechaNacimiento: ["", [Validators.required]],
            tipoPersonal: ["", [Validators.required]],
            colegioProfesional: ["", [Validators.required]],
            colegiatura: ["", [Validators.required]],
            estado: ["", [Validators.required]],
            contratoAbreviatura: ["", [Validators.required]],
            sexo: ["", [Validators.required]],
            detalleIpress: ["", [Validators.required]],
            estadoCivil: [""],
            domicilioActual: [""],
            nacionalidad: [""],
            departamento: [""],
            provincia: [""],
            distrito: [""],
            fechaInicio: ["", [Validators.required]],
        });
        this.formEspecialidad = this.formBuilder.group({
            nombre: ["", [Validators.required]],
            nroEspecialidad: ["", [Validators.required]],
        });
        this.formRol = this.formBuilder.group({
            nombreFuncion: ["", [Validators.required]],
            ups: ["", [Validators.required]],
            rolGuardia: ["", [Validators.required]],
            // delete: ["", [Validators.required]],
            // update: ["", [Validators.required]],
            // create: ["", [Validators.required]],
            // insert: ["", [Validators.required]],
            // read: ["", [Validators.required]],
        });
    }

    getPersonal() {
        this.personalservice
            .getPersonalIpress(this.idIpress)
            .subscribe((res: any) => {
                //this.personalservice.getPersonal().subscribe((res: any) => {
                this.data = res.object;
            });
        //-- lista de administradores
    }

    getListaUps() {
        this.rolGuardiaService
            .getServiciosPorIpress(this.idIpress)
            .subscribe((resp) => {
                this.listaUpsX = resp["object"];
                console.log("upsX-->", this.listaUpsX);
            });
    }

    buscarNombre(id) {
        return (
            this.listaUpsX.find((elemento) => elemento.id == id)?.nombreUPS ||
            "UPS ELIMINADA"
        );
    }

    saveForm() {
        this.isUpdate = false;
        let otrosNombres = this.form.value.nombres.split(" ", 2);
        let otros = otrosNombres.shift();
        otrosNombres = otrosNombres.join(" ");
        let primerNombre = this.form.value.nombres.split(" ")[0];
        let tipoPersonalSelected = this.tiposPersonalList.find(
            (tipo) => tipo.nombre === this.form.value.tipoPersonal
        );
        let colegioSelected = this.colegiosList.find(
            (colegio) => colegio.codigo === this.form.value.colegioProfesional
        );
        let ipressSelected;
        let detalleIpressNoAdmin;
        let detalleIpressAdmin;
        if (!this.root) {
            ipressSelected = this.ipressList.find(
                (ipress) => ipress.nombreEESS === this.form.value.detalleIpress
            );
            detalleIpressNoAdmin = {
                idIpress: ipressSelected.id,
                eess: ipressSelected.nombreEESS,
                fechaInicio:
                    this.datePipe.transform(
                        this.form.value.fechaInicio,
                        "yyyy-MM-dd"
                    ) + " 00:00:00",
            };
        } else {
            detalleIpressAdmin = {
                idIpress: this.form.get("detalleIpress").value.id,
                eess: this.form.get("detalleIpress").value.nombreEESS,
                fechaInicio:
                    this.datePipe.transform(
                        this.form.value.fechaInicio,
                        "yyyy-MM-dd"
                    ) + " 00:00:00",
            };
        }
        //console.log(this.form.value.fechaNacimiento);

        const req = {
            tipoDoc: this.form.value.tipoDoc,
            nroDoc: this.form.value.nroDoc,
            apePaterno: this.form.value.apePaterno,
            apeMaterno: this.form.value.apeMaterno,
            primerNombre: primerNombre,
            otrosNombres: otrosNombres,
            fechaNacimiento: this.datePipe.transform(
                this.form.value.fechaNacimiento,
                "yyyy-MM-dd"
            ),
            sexo: this.form.value.sexo,
            contratoAbreviatura: this.form.value.contratoAbreviatura,
            tipoPersonal: {
                nombre: tipoPersonalSelected.nombre,
                esProfesional: tipoPersonalSelected.esProfesional,
                abreviatura: tipoPersonalSelected.abreviatura,
            },
            colegioProfesional: {
                codigo: colegioSelected.codigo,
                nombre: colegioSelected.nombre,
            },
            colegiatura: this.form.value.colegiatura,
            estado: this.form.value.estado,
            detalleIpress: !this.root
                ? detalleIpressNoAdmin
                : detalleIpressAdmin,
        };
        console.log("req", req);
        let objectAdmin = {
            tipoDoc: "DNI",
            nroDoc: this.form.value.nroDoc,
            apps: ["hce"],
            escalas: [
                {
                    escala: "IPRESS",
                    unidades: [this.form.get("detalleIpress").value.renipress],
                },
            ],
        };

        if (req.nroDoc.trim() !== "") {
            this.personalservice.createPersonal(req).subscribe((result) => {
                //--Agregar Admin
                if (this.root) {
                    this.loginService
                        .createAdmin(objectAdmin)
                        .subscribe((r: any) => {
                            Swal.fire({
                                icon: "success",
                                title: "Administrador agregado correctamente",
                                text: "",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        });
                    //--listar administradores
                }
                if (!this.root) {
                    Swal.fire({
                        icon: "success",
                        title: "Agregado correctamente",
                        text: "",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.getPersonal();
                }

                this.personalDialog = false;
            });
        }
    }

    openNew(designar: boolean) {
        this.designar = designar;
        this.isUpdate = false;
        this.form.reset();
        this.imagePath = image;
        this.form.get("nroDoc").enable();
        this.form.get("nroDoc").setValue("");
        this.form.get("tipoDoc").setValue("DNI");
        this.form.get("apePaterno").setValue("");
        this.form.get("apeMaterno").setValue("");
        this.form.get("nombres").setValue("");
        this.form.get("fechaNacimiento").setValue("");
        this.form.get("estadoCivil").setValue("");
        this.form.get("estadoCivil").disable();
        this.form.get("domicilioActual").setValue("");
        this.form.get("domicilioActual").disable();
        this.form.get("departamento").setValue("");
        this.form.get("departamento").disable();
        this.form.get("provincia").setValue("");
        this.form.get("provincia").disable();
        this.form.get("distrito").disable();
        this.form.get("distrito").setValue("");
        this.form.get("tipoPersonal").setValue("");
        this.form.get("colegioProfesional").setValue("");
        this.form.get("colegiatura").setValue("");
        this.form.get("estado").setValue("");
        this.form.get("contratoAbreviatura").setValue("");
        this.form.get("sexo").setValue("");
        console.log("wr234234", this.iprees);
        !this.root
            ? this.form.get("detalleIpress").setValue(this.iprees.nombreEESS)
            : this.form.get("detalleIpress").setValue(this.iprees);
        this.form.get("fechaInicio").setValue("");
        this.personalDialog = true;
    }

    editar(rowData) {
        console.log("rowdata ", rowData);
        //console.log("first", rowData.detalleIpress[0].eess);
        this.isUpdate = true;
        this.form.reset();
        this.imagePath = image;
        this.form.get("nroDoc").setValue(rowData.nroDoc);
        this.traerDataEditar();
        this.form.get("tipoDoc").setValue(rowData.tipoDoc);
        this.form.get("apePaterno").setValue(rowData.apePaterno);
        this.form.get("apeMaterno").setValue(rowData.apeMaterno);
        this.form
            .get("nombres")
            .setValue(rowData.primerNombre + " " + rowData.otrosNombres);
        this.form.get("fechaNacimiento").setValue(rowData.fechaNacimiento);
        this.form
            .get("tipoPersonal")
            .setValue(rowData.tipoPersonal ? rowData.tipoPersonal.nombre : "");
        this.form
            .get("colegioProfesional")
            .setValue(
                rowData.colegioProfesional
                    ? rowData.colegioProfesional.codigo
                    : ""
            );
        this.form.get("colegiatura").setValue(rowData.colegiatura);
        this.form.get("estado").setValue(rowData.estado);
        this.form
            .get("contratoAbreviatura")
            .setValue(rowData.contratoAbreviatura);
        this.form.get("sexo").setValue(rowData.sexo);
        this.form
            .get("detalleIpress")
            .setValue(
                !this.root
                    ? rowData.detalleIpress.eess
                    : rowData.detalleIpress[0].eess
            );
        this.form
            .get("fechaInicio")
            .setValue(
                rowData.detalleIpress
                    ? this.datePipe.transform(
                        rowData.detalleIpress.fechaInicio,
                        "yyyy-MM-dd"
                    )
                    : ""
            );
        this.idUpdate = rowData.id;
        this.form.get("estadoCivil").disable();
        this.form.get("distrito").disable();
        this.form.get("provincia").disable();
        this.form.get("departamento").disable();
        this.form.get("domicilioActual").disable();
        this.personalDialog = true;
    }

    editarDatos(rowData) {
        this.isUpdate = true;
        let otrosNombres = this.form.value.nombres.split(" ");
        let otros = otrosNombres.shift();
        otrosNombres = otrosNombres.join(" ");
        let primerNombre = this.form.value.nombres.split(" ")[0];
        let tipoPersonalSelected = this.tiposPersonalList.find(
            (tipo) => tipo.nombre === this.form.value.tipoPersonal
        );
        let colegioSelected = this.colegiosList.find(
            (colegio) => colegio.codigo === this.form.value.colegioProfesional
        );
        let ipressSelected = this.ipressList.find(
            (ipress) => ipress.id === this.form.value.detalleIpress
        );
        console.log(this.form.value.fechaNacimiento);
        const req = {
            id: this.idUpdate,
            tipoDoc: this.form.value.tipoDoc,
            nroDoc: this.form.value.nroDoc,
            apePaterno: this.form.value.apePaterno,
            apeMaterno: this.form.value.apeMaterno,
            primerNombre: primerNombre,
            otrosNombres: otrosNombres,
            fechaNacimiento: this.datePipe.transform(
                this.form.value.fechaNacimiento,
                "yyyy-MM-dd"
            ),
            sexo: this.form.value.sexo,
            contratoAbreviatura: this.form.value.contratoAbreviatura,
            tipoPersonal: {
                nombre: tipoPersonalSelected.nombre,
                esProfesional: tipoPersonalSelected.esProfesional,
                abreviatura: tipoPersonalSelected.abreviatura,
            },
            colegioProfesional: {
                codigo: colegioSelected.codigo,
                nombre: colegioSelected.nombre,
            },
            colegiatura: this.form.value.colegiatura,
            estado: this.form.value.estado,
            detalleIpress: {
                idIpress: this.form.get("detalleIpress").value.id,
                eess: this.form.get("detalleIpress").value.nombreEESS,
                // idIpress: this.idIpress,
                // eess: this.iprees,
                fechaInicio:
                    this.datePipe.transform(
                        this.form.value.fechaInicio,
                        "yyyy-MM-dd"
                    ) + " 00:00:00",
            },
        };

        this.personalservice.editPersonal(req).subscribe((result) => {
            Swal.fire({
                icon: "success",
                title: "Editado correctamente",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
            this.getPersonal();
            this.personalDialog = false;
        });
    }

    eliminar(rowData) {
        this.isUpdate = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            icon: "warning",
            title: "Estas seguro de eliminar",
            text: "",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.personalservice
                    .deletePersonal(rowData.id)
                    .subscribe((result) => {
                        this.getPersonal();
                    });
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

    canceled() {
        Swal.fire({
            icon: "warning",
            title: "Cancelado...",
            text: "",
            showConfirmButton: false,
            timer: 1000,
        });
        this.personalDialog = false;
    }

    close() {
        this.personalEspecialidadDialog = false;
        this.guardarNuevoEspecialidad();
    }

    closeRol() {
        this.personalRolDialogX = false;
        // this.guardarNuevoEspecialidad();
    }

    titulo() {
        if (this.isUpdate) return "Edite Personal de Salud";
        else return "Ingrese Nuevo Personal de Salud";
    }

    traerData() {
        let nroDoc = this.form.value.nroDoc;
        this.personalservice.getPidePersonalData(nroDoc).then((res: any) => {
            if (res.error) {
                console.log('no se encontro persona');
                return;
            }
            this.dataPersona = res;
            this.form.patchValue({
                apePaterno: this.dataPersona.apePaterno,
                apeMaterno: this.dataPersona.apeMaterno,
                nombres: this.dataPersona.nombres,
                sexo: this.dataPersona.genero,  
                fechaNacimiento: this.dataPersona.fecNacimiento,
                domicilioActual: this.dataPersona.direccion,
            })
        })
        // this.personalservice
        //     .getDatosReniec(this.form.value.nroDoc)
        //     .subscribe((res: any) => {
        //         this.dataPIDE = res;
        //         console.log(res);
        //         this.imagePath = res.foto;
        //         this.form.get("apePaterno").setValue(this.dataPIDE.apePaterno);
        //         this.form.get("apeMaterno").setValue(this.dataPIDE.apeMaterno);
        //         this.form.get("nombres").setValue(this.dataPIDE.nombres);
        //         this.form
        //             .get("fechaNacimiento")
        //             .setValue(
        //                 this.dataPIDE.fecNacimiento == null
        //                     ? ""
        //                     : this.dataPIDE.fecNacimiento.split("T", 1)[0]
        //             );
        //         this.form
        //             .get("sexo")
        //             .setValue(
        //                 this.dataPIDE.genero == ""
        //                     ? ""
        //                     : this.dataPIDE.genero == "0"
        //                         ? "FEMENINO"
        //                         : "MASCULINO"
        //             );
        //         this.form
        //             .get("domicilioActual")
        //             .setValue(this.dataPIDE.direccion);
        //         this.form
        //             .get("estadoCivil")
        //             .setValue(this.dataPIDE.estadoCivil);
        //         let aux = this.dataPIDE.ubigeo.split("/", 3);
        //         this.form.get("departamento").setValue(aux[0]);
        //         this.form.get("provincia").setValue(aux[1]);
        //         this.form.get("distrito").setValue(aux[2]);
        //     });
    }

    traerDataEditar() {
        this.personalservice
            .getDatosReniec(this.form.value.nroDoc)
            .subscribe((res: any) => {
                this.dataPIDE = res;
                this.imagePath = res.foto;
                this.form
                    .get("domicilioActual")
                    .setValue(this.dataPIDE.direccion);
                this.form
                    .get("estadoCivil")
                    .setValue(this.dataPIDE.estadoCivil);
                let aux = this.dataPIDE.ubigeo.split("/", 3);
                this.form.get("departamento").setValue(aux[0]);
                this.form.get("provincia").setValue(aux[1]);
                this.form.get("distrito").setValue(aux[2]);
            });
    }

    newEspecialidad(rowData) {
        console.log("rowdata", rowData);
        console.log("lista de especialidades ", this.especialidadesList);
        this.especialidades = rowData.especialidad;
        this.nombrePersonal = `${rowData.apePaterno} ${rowData.apeMaterno}, ${rowData.primerNombre}`;
        this.idEspecialidad = rowData.id;
        // let auxSpecialties:any[] = rowData.especialidad.map(item=>item.nombre);
        // this.especialidadesList = this.especialidadesList.filter(item=>!auxSpecialties.includes(item.nombre))
        // console.log('aux specialities ', this.especialidadesList);
        this.form.reset();
        this.personalEspecialidadDialog = true;
    }

    newRolX(rowData) {
        this.rolesX = [];
        this.idPersonal = rowData.id;
        console.log("data de personal ", this.idPersonal);
        this.ipressservice
            .getRolPersonalIpress(this.idPersonal)
            .then((res: any) => {
                if ((res.cod = "2402")) {
                    this.rolesX = res.object[0].roles;
                }
            });
        this.nombrePersonal = `${rowData.apePaterno} ${rowData.apeMaterno}, ${rowData.primerNombre}`;
        this.idRolX = rowData.id;
        this.formRol.reset();
        this.personalRolDialogX = true;
        this.isUpdateRolX = false;
    }

    newRolSistema(rowData) {
        this.rolesSistema = [];
        //console.log("row", rowData);
        this.nroDocRow = rowData.nroDoc;
        this.nombrePersonal = `${rowData.apePaterno} ${rowData.apeMaterno}, ${rowData.primerNombre}`;
        this.dniPersonal = rowData.nroDoc;
        this.idRolX = rowData.id;
        this.formRol.reset();
        this.cargarRoles(rowData.nroDoc);
        this.rolSistema = true;
    }

    guardarNuevoEspecialidad() {
        this.isUpdateEspecialidad = false;
        this.formEspecialidad.reset();
        this.formEspecialidad.get("nombre").setValue("");
        this.formEspecialidad.get("nroEspecialidad").setValue("");
    }

    guardarNuevoRol() {
        this.isUpdateRolX = false;
        this.formRol.reset();
        // this.formRol.get("nombreFuncion").setValue("");
        // this.formRol.get("ups").setValue("");
    }

    editarEspecialidad(rowData) {
        console.log("editar", rowData);
        this.isUpdateEspecialidad = true;
        this.formEspecialidad.get("nombre").setValue(rowData.nombre);
        this.formEspecialidad
            .get("nroEspecialidad")
            .setValue(rowData.nroEspecialidad);
        this.estadoUpdateEspecialidad = rowData.estado;
    }

    editarRolX(rowData) {
        console.log("data to edit ", rowData);
        this.isUpdateRolX = true;
        const auxUPS = this.listaUpsX.filter(
            (item) => item.nombreUPS == rowData.nombreUPS
        );
        console.log("aux ups ", auxUPS, "lista de ups ", this.listaUpsX);
        this.formRol.get("nombreFuncion").setValue(rowData.nombreFuncion);
        this.formRol.get("ups").setValue(auxUPS[0].id);
        this.formRol.get("rolGuardia").setValue(rowData.rolGuardia);
        this.dataEditRol = {
            oldCodUPS: auxUPS[0].id,
            oldNombreFuncion: rowData.nombreFuncion,
        };
    }

    tituloEspecialidad() {
        if (this.isUpdateEspecialidad) return "Edite Especialidad";
        else return "Ingrese Nueva Especialidad";
    }

    eliminarEspecialidad(rowData) {
        console.log("row", rowData);
        this.isUpdateEspecialidad = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            icon: "warning",
            title: "Estas seguro de eliminar",
            text: "",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.personalservice
                    .deletePersonalEspecialidad(
                        this.idEspecialidad,
                        rowData.nombre
                    )
                    .subscribe((result) => {
                        this.getPersonalIdEspecialidad();
                        this.getPersonal();
                    });
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

    eliminarRolX(rowData, index) {
        this.isUpdateRolX = false;
        console.log("rowData delete ", rowData);
        const auxUPS = this.listaUpsX.filter(
            (item) => item.nombreUPS == rowData.nombreUPS
        );
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            icon: "warning",
            title: "Estas seguro de eliminar",
            text: "",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.personalservice
                    .deleteRol(this.idRolX, auxUPS[0].id)
                    .subscribe((result) => {
                        Swal.fire({
                            icon: "success",
                            title: "Eliminado correctamente",
                            text: "",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.rolesX.splice(index, 1);
                        this.getPersonalIdEspecialidad();
                        this.getPersonal();
                    });
            }
        });
    }

    agregarRol() {
        console.log(
            "this.formRoles.value.rol.nombre",
            this.formRoles.value.rol.nombre
        );
        if (
            this.rolesSistema.find(
                (rol) => rol.nombre === this.formRoles.value.rol.nombre
            ) === undefined
        )
            this.rolesSistema.push({
                rol: this.formRoles.value.rol.rol,
                nombre: this.nombreRol(this.formRoles.value.rol.rol),
                descripcion: this.descripcionRol(this.formRoles.value.rol.rol),
            });
    }

    guardarRolSistema() {
        let apps: string[] = [];
        let roles: string[] = [];
        this.rolesSistema.map((e) => {
            roles.push(e.rol);
            if (
                e.rol === "VISITA_DOMICILIARIA_PROFESIONAL" ||
                e.rol === "VISITA_DOMICILIARIA_ACTOR_SOCIAL"
            ) {
                if (apps.findIndex((obj) => obj === "app-visita") === -1)
                    apps.push("app-visita");
            } else {
                if (apps.findIndex((obj) => obj === "hce") === -1)
                    apps.push("hce");
            }
        });
        let body = {
            tipoDoc: "DNI",
            nroDoc: this.nroDocRow,
            apps: apps,
            roles: roles,
        };
        this.personalservice.getRoles(this.nroDocRow).subscribe(
            (res: any) => {
                this.personalservice
                    .updateRol(this.nroDocRow, body)
                    .subscribe((r: any) => {
                        if (r.mensaje == "CORRECTO") {
                            Swal.fire({
                                icon: "success",
                                title: "ROLES ACTUALIZADOS",
                                text: "",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
            },
            (error) => {
                if (error.status == 400) {
                    this.personalservice.saveRol(body).subscribe((rp: any) => {
                        if (rp.mensaje == "CORRECTO") {
                            Swal.fire({
                                icon: "success",
                                title: "ROLES GUARDADOS",
                                text: "",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
                }
            }
        );

        /* this.personalservice.crearRol(data).subscribe((r: any) => {
            console.log(r);
            Swal.fire({
                icon: "success",
                title: "Agregado correctamente",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        }); */
        this.ref.close();
    }

    eliminarRolSistema(rowData, index) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            icon: "warning",
            title: "Estas seguro de eliminar",
            text: "",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.rolesSistema.splice(index, 1);
            }
        });
    }

    saveEspecialidad(rowData) {
        let est = this.especialidadesList.find(
            (espe) => espe.nombre === this.formEspecialidad.value.nombre
        );
        const req = {
            nombre: this.formEspecialidad.value.nombre,
            nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
            estado: est.estado,
        };
        let auxSpecialties: any[] = [];
        console.log("auxSpecialties ", this.especialidades);
        if (this.especialidades != null) {
            auxSpecialties = this.especialidades.filter(
                (item) => item.nombre == req.nombre
            );
        }
        if (auxSpecialties.length == 0) {
            this.personalservice
                .createPersonalEspecialidad(this.idEspecialidad, req)
                .subscribe((result) => {
                    Swal.fire({
                        icon: "success",
                        title: "Agregado correctamente",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    this.getPersonalIdEspecialidad();
                    this.getPersonal();
                    this.guardarNuevoEspecialidad();
                });
        } else {
            Swal.fire({
                icon: "info",
                title: "Ya se agrego esa especialidad",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }

    saveRol() {
        var isRepeat;
        if (this.rolesX == null) this.rolesX = [];
        if (this.rolesX.length !== 0)
            isRepeat = this.rolesX.find(
                (rol) => rol.codUPS === this.formRol.value.ups
            )
                ? true
                : false;
        if (!isRepeat) {
            const req = {
                nombreFuncion: this.formRol.value.nombreFuncion,
                codUPS: this.formRol.value.ups,
                rolGuardia: this.formRol.value.rolGuardia,
                // delete: this.formRol.value.delete,
                // update: this.formRol.value.update,
                // create: this.formRol.value.create,
                // insert: this.formRol.value.insert,
                // read: this.formRol.value.read,
            };
            this.personalservice
                .addRolesPersonal(this.idRolX, req)
                .subscribe((result) => {
                    Swal.fire({
                        icon: "success",
                        title: "Agregado correctamente",
                        text: "",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.rolesX.push(req);
                    this.ipressservice
                        .getRolPersonalIpress(this.idPersonal)
                        .then((res: any) => {
                            this.rolesX = res.object[0].roles;
                        });
                    this.getPersonal();
                    this.guardarNuevoRol();
                    this.isUpdateRolX = false;
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Ups repetida",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    saveEdicionEspecialidad() {
        let est = this.especialidadesList.find(
            (espe) => espe.nombre === this.formEspecialidad.value.nombre
        );
        const req = {
            nombre: this.formEspecialidad.value.nombre,
            nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
            estado: this.estadoUpdateEspecialidad,
        };
        this.personalservice
            .editPersonalEspecialidad(this.idEspecialidad, req)
            .subscribe((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Editado correctamente",
                    text: "",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.getPersonalIdEspecialidad();
                this.getPersonal();
                this.guardarNuevoEspecialidad();
            });
    }

    saveEdicionRol() {
        // let est = this.especialidadesList.find(
        //     (espe) => espe.nombre === this.formEspecialidad.value.nombre
        // );
        // console.log(est);
        const req = {
            nombreFuncion: this.formRol.value.nombreFuncion,
            codUPS: this.formRol.value.ups,
            rolGuardia: this.formRol.value.rolGuardia,
            oldCodUPS: this.dataEditRol.oldCodUPS,
            oldNombreFuncion: this.dataEditRol.oldNombreFuncion,
        };
        this.personalservice.editRol(this.idRolX, req).subscribe((result) => {
            Swal.fire({
                icon: "success",
                title: "Editado correctamente",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
            // this.getPersonalIdEspecialidad();
            // this.getPersonal();
            this.guardarNuevoRol();
            this.ipressservice
                .getRolPersonalIpress(this.idPersonal)
                .then((res: any) => {
                    this.rolesX = res.object[0].roles;
                });
            this.isUpdateRolX = false;
        });
    }

    ngOnInit(): void {
        this.loginService.getRol().subscribe((r: any) => {
            console.log("roles", r);
            this.listaRol = r;
        });
    }

    cargarRoles(dni) {
        this.loginService.getRoles(dni).subscribe((r: any) => {
            r.object.roles.map((r: any) => {
                console.log("roles", r);
                this.rolesSistema.push({
                    rol: r,
                    nombre: this.nombreRol(r),
                    descripcion: this.descripcionRol(r),
                });
            });
        });
    }
    descripcionRol(text) {
        let a = this.description.find((espe) => espe.rol === text);
        return a.description;
    }
    nombreRol(text) {
        let a = this.listaRol.find((espe) => espe.rol === text);
        return a.nombre;
    }
    resetPassword() {
        this.personalservice
            .resetPass(this.dniPersonal, {})
            .subscribe((r: any) => {
                if (r.mensaje == "CORRECTO") {
                    Swal.fire({
                        icon: "success",
                        title: "CONTRASEÑA RESETEADA...",
                        text: "",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }
}

export interface rol {
    nombre: string;
    rol: string;
}
interface Edit {
    oldNombreFuncion: string;
    oldCodUPS: string;
}
