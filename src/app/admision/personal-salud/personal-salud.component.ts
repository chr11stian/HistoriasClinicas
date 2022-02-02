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
import { TipoPersonalService } from "src/app/mantenimientos/services/tipo-personal/tipo-personal.service";
import { EspecialidadService } from "src/app/mantenimientos/services/especialidad/especialidad.service";
import { ColegioProfesionalService } from "src/app/mantenimientos/services/colegio-profesional/colegio-profesional.service";
import {DatePipe, getLocaleDateFormat} from "@angular/common";
import { TipoContratoService } from "src/app/mantenimientos/services/tipo-contrato/tipo-contrato.service";
import { IpressService } from "src/app/core/services/ipress/ipress.service";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { image } from '../../../assets/images/image.const';

@Component({
  selector: "app-personal-salud",
  templateUrl: "./personal-salud.component.html",
  styleUrls: ["./personal-salud.component.css"],
})
export class PersonalSaludComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;
  formEspecialidad: FormGroup;
  formRol: FormGroup;

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
  rolesX: any[];
  listaUpsX: any[];
  personalDialog: boolean;
  personalEspecialidadDialog: boolean;
  personalRolDialogX: boolean;
  datePipe = new DatePipe("en-US");
  constructor(
    private personalservice: PersonalService,
    private documentoservice: DocumentoIdentidadService,
    private tipoPersonalservice: TipoPersonalService,
    private especialidadservice: EspecialidadService,
    private colegioservice: ColegioProfesionalService,
    private tipoContratoservice: TipoContratoService,
    private ipressservice: IpressService,
    private formBuilder: FormBuilder,
    private rolGuardiaService: RolGuardiaService,
  ) {
    this.buildForm();
    this.getPersonal();
    this.getDocumentos();
    this.getTiposPersonal();
    this.getEspecialidades();
    this.getColegios();
    this.getTipoContratos();
    this.getIpress();
    this.getListaUps();
    this.getSexos();

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
      console.log(this.tiposContratoList);
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
    });
  }
  getSexos(){
    this.personalservice.getSexos().subscribe((res: any) => {
      this.sexoList = res.sexo;
      console.log(this.sexoList);
    });
  }
  buildForm() {
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
    });
  }
  getPersonal() {
    this.personalservice.getPersonal().subscribe((res: any) => {
      this.data = res.object;
      // console.log(this.data)
    });
  }
  getListaUps() {
    this.rolGuardiaService
      .getServiciosPorIpress("616de45e0273042236434b51")
      .subscribe((resp) => {
        this.listaUpsX = resp["object"];
        console.log('ups-->', this.listaUpsX)
      });
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
    let ipressSelected = this.ipressList.find(
      (ipress) => ipress.id === this.form.value.detalleIpress
    );
    console.log(this.form.value.fechaNacimiento);
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
      colegioProfesional: [
        {
          codigo: colegioSelected.codigo,
          nombre: colegioSelected.nombre,
        },
      ],
      colegiatura: this.form.value.colegiatura,
      estado: this.form.value.estado,
      detalleIpress: {
        idIpress: this.form.value.detalleIpress,
        eess: ipressSelected.nombreEESS,
        fechaInicio:
          this.datePipe.transform(this.form.value.fechaInicio, "yyyy-MM-dd") +
          " 00:00:00",
      },
    };
    console.log(req);
    if (req.nroDoc.trim() !== "") {
      this.personalservice.createPersonal(req).subscribe((result) => {
        Swal.fire({
          icon: "success",
          title: "Agregado correctamente",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getPersonal();
        this.personalDialog = false;
      });
    }
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.imagePath= image;
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
    this.form.get("detalleIpress").setValue("");
    this.form.get("fechaInicio").setValue("");
    this.personalDialog = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.reset();
    this.imagePath= image;
    this.form.get("nroDoc").setValue(rowData.nroDoc);
    this.traerDataEditar();
    this.form.get("tipoDoc").setValue(rowData.tipoDoc);
    this.form.get("apePaterno").setValue(rowData.apePaterno);
    this.form.get("apeMaterno").setValue(rowData.apeMaterno);
    this.form.get("nombres").setValue(rowData.primerNombre + " " + rowData.otrosNombres);
    this.form.get("fechaNacimiento").setValue(rowData.fechaNacimiento);
    this.form.get("tipoPersonal").setValue(rowData.tipoPersonal ? rowData.tipoPersonal.nombre : "");
    this.form.get("colegioProfesional").setValue(rowData.colegioProfesional ? rowData.colegioProfesional[0].codigo : "");
    this.form.get("colegiatura").setValue(rowData.colegiatura);
    this.form.get("estado").setValue(rowData.estado);
    this.form.get("contratoAbreviatura").setValue(rowData.contratoAbreviatura);
    this.form.get("sexo").setValue(rowData.sexo);
    this.form.get("detalleIpress").setValue(rowData.detalleIpress ? rowData.detalleIpress[0].idIpress : "");
    this.form.get("fechaInicio").setValue(rowData.detalleIpress ? 
      this.datePipe.transform(rowData.detalleIpress[0].fechaInicio,"yyyy-MM-dd"): "");
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
      colegioProfesional: [
        {
          codigo: colegioSelected.codigo,
          nombre: colegioSelected.nombre,
        },
      ],
      colegiatura: this.form.value.colegiatura,
      estado: this.form.value.estado,
      detalleIpress: {
        idIpress: this.form.value.detalleIpress,
        eess: ipressSelected.nombreEESS,
        fechaInicio:
          this.datePipe.transform(this.form.value.fechaInicio, "yyyy-MM-dd") +
          " 00:00:00",
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
        this.personalservice.deletePersonal(rowData.id).subscribe((result) => {
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
    this.personalservice.getDatosReniec(this.form.value.nroDoc).subscribe((res: any) => {
      this.dataPIDE = res;
      console.log(res);
      this.imagePath= res.foto;
      this.form.get("apePaterno").setValue(this.dataPIDE.apePaterno);
      this.form.get("apeMaterno").setValue(this.dataPIDE.apeMaterno);
      this.form.get("nombres").setValue(this.dataPIDE.nombres);
      this.form.get("fechaNacimiento").setValue(this.dataPIDE.fecNacimiento==null?"":this.dataPIDE.fecNacimiento.split("T", 1)[0]);
      this.form.get("sexo").setValue(this.dataPIDE.genero==""?"":(this.dataPIDE.genero=="0"?"FEMENINO":"MASCULINO"));
      this.form.get("domicilioActual").setValue(this.dataPIDE.direccion);
      this.form.get("estadoCivil").setValue(this.dataPIDE.estadoCivil);
      let aux=this.dataPIDE.ubigeo.split("/", 3);
      this.form.get("departamento").setValue(aux[0]);
      this.form.get("provincia").setValue(aux[1]);
      this.form.get("distrito").setValue(aux[2]);
    });
  }
  traerDataEditar() {
    this.personalservice.getDatosReniec(this.form.value.nroDoc).subscribe((res: any) => {
      this.dataPIDE = res;
      this.imagePath= res.foto;
      this.form.get("domicilioActual").setValue(this.dataPIDE.direccion);
      this.form.get("estadoCivil").setValue(this.dataPIDE.estadoCivil);
      let aux=this.dataPIDE.ubigeo.split("/", 3);
      this.form.get("departamento").setValue(aux[0]);
      this.form.get("provincia").setValue(aux[1]);
      this.form.get("distrito").setValue(aux[2]);
    });
  }
  newEspecialidad(rowData) {
    this.especialidades = rowData.especialidad;
    this.nombrePersonal = `${rowData.apePaterno} ${rowData.apeMaterno}, ${rowData.primerNombre}`;
    this.idEspecialidad = rowData.id;
    this.form.reset();
    this.personalEspecialidadDialog = true;
  }
  newRolX(rowData) {
    if(rowData.roles!=null){
      this.rolesX = rowData.roles;
    }
    console.log(this.rolesX);
    this.nombrePersonal = `${rowData.apePaterno} ${rowData.apeMaterno}, ${rowData.primerNombre}`;
    this.idRolX = rowData.id;
    this.formRol.reset();
    this.personalRolDialogX = true;
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
    console.log("editar", rowData);
    this.isUpdateRolX = true;
    this.formRol.get("nombreFuncion").setValue(rowData.nombreFuncion);
    this.formRol.get("ups").setValue(rowData.codUPS);
    // this.estadoUpdateRol = rowData.estado;

  }
  tituloEspecialidad() {
    if (this.isUpdateEspecialidad) return "Edite Especialidad";
    else return "Ingrese Nueva Especialidad";
  }
  eliminarEspecialidad(rowData) {
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
          .deletePersonalEspecialidad(this.idRolX, rowData.nombre)
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
          .deleteRol(this.idRolX, rowData.codUPS)
          .subscribe((result) => {
            Swal.fire({
              icon: "success",
              title: "Eliminado correctamente",
              text: "",
              showConfirmButton: false,
              timer: 1500,
            });
            this.rolesX.splice(index, 1)
            this.getPersonalIdEspecialidad();
            // this.getPersonal();
          });
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

    this.personalservice
      .createPersonalEspecialidad(this.idEspecialidad, req)
      .subscribe((result) => {
        Swal.fire({
          icon: "success",
          title: "Agregado correctamente",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getPersonalIdEspecialidad();
        this.getPersonal();
        this.guardarNuevoEspecialidad();
      });
  }
  saveRol() {
    const isRepeat = this.rolesX.find((rol) => rol.codUPS === this.formRol.value.ups)?true:false;
    if(!isRepeat){
      const req = {
            nombreFuncion: this.formRol.value.nombreFuncion,
            codUPS: this.formRol.value.ups,
          }
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
              this.getPersonal();
              this.guardarNuevoRol();
            });
    }
    else{
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
    }
    console.log(req);

    this.personalservice.editRol(this.idRolX, req)
      .subscribe((result) => {
        Swal.fire({
          icon: "success",
          title: "Editado correctamente",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
        // this.getPersonalIdEspecialidad();
        // this.getPersonal();
        this.guardarNuevoEspecialidad();
      });
  }
  ngOnInit(): void { }
}
