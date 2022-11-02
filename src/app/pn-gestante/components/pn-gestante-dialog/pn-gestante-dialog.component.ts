import { Component, OnInit } from "@angular/core";
import { GestanteModel } from "../../interfaces/GestanteModel";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-pn-gestante-dialog",
  templateUrl: "./pn-gestante-dialog.component.html",
  styleUrls: ["./pn-gestante-dialog.component.css"],
  providers: [MessageService],
})
export class PnGestanteDialogComponent implements OnInit {
  formGestante: FormGroup;
  show = false;
  gestanteDialog: boolean;
  gestantes: GestanteModel[];
  gestante: GestanteModel;
  selectedGestantes: GestanteModel[];
  isNew: boolean;
  estadoGuardar: boolean = false;
  //
  isUpdate: boolean = false;
  dataGestante: GestanteModel;
  dataGestanteEditar: GestanteModel;
  listaGestantes: any[] = [];
  datePipe = new DatePipe("en-US");
  fecha_reg: any;
  checked: boolean = false;
  existeGestante: boolean = false;
  gestanteRegistrado: boolean = false;
  auxFPP: any;
  auxFUR: any;
  auxFechaRegistro: Date = new Date();
  selectedAborto: boolean;
  auxGestanteCambiar: any;
  listaGestantesPuerpera: any[] = [];

  sis: any[] = [{ value: "SI" }, { value: "NO" }];

  aborto: any[] = [
    { label: "SI", value: true },
    { label: "NO", value: false },
  ];

  estado_gestante: any[] = [{ value: "Activo" }, { value: "Inactivo" }];
  morbilidad_potencial_a: any[] = [
    { value: "NINGUNA" },
    { value: " GESTANTE CON ANTECEDENTE DE COMPLICACIÓN OBSTETRICA" },
    { value: "GESTANTE ADOLESCENTE" },
    { value: "PRIMIGISTA AÑOSA" },
    { value: "MULTIGESTA Y/O MULTIPARA" },
    { value: "GESTANTES CON CAPTACIÓN TARDIA" },
    { value: "GESTANTE CON RECHAZO AL SERVICIO DE SALUD" },
    { value: "GESTANTE TRASEUNTE" },
    { value: "GESTANTE CON TBC" },
    { value: "GESTANTE CON VIH/SIDA" },
    { value: "OTRA CAUSA" },
  ];

  listaDocumentos: any[] = [{ value: "DNI" }];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private pn_gestanteServicio: PnGestanteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.inicializarForm();
    this.mostrarPadronNominalGestantes();
  }

  ngOnInit(): void {
    this.dataGestanteEditar = JSON.parse(
      localStorage.getItem("gestanteLocalStorage")
    );
    if (this.dataGestanteEditar !== null) {
      this.editarDatos();
    }
  }

  inicializarForm() {
    this.formGestante = this.fb.group({
      tipoDoc: new FormControl("padronNominal"),
      nombres: new FormControl("", [Validators.required]),
      apePaterno: new FormControl("", [Validators.required]),
      apeMaterno: new FormControl("", [Validators.required]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      tipoDocIdentidad: new FormControl("", [Validators.required]),
      nroDocIdentidad: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      telefono: new FormControl("", [Validators.required]),
      tieneSis: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      referencia: new FormControl("", [Validators.required]),
      hcl: new FormControl("", [Validators.required]),
      codEessAnterior: new FormControl(
        this.pn_gestanteServicio.getauxCodeessActual(),
        [Validators.required]
      ),
      eessAnterior: new FormControl(
        this.pn_gestanteServicio.getaux_eessActual(),
        [Validators.required]
      ),
      codEessActual: new FormControl(
        this.pn_gestanteServicio.getauxCodeessActual(),
        [Validators.required]
      ),
      eessActual: new FormControl(
        this.pn_gestanteServicio.getaux_eessActual(),
        [Validators.required]
      ),
      fur: new FormControl("", [Validators.required]),
      fpp: new FormControl("", [Validators.required]),
      morbilidadPotencial: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required]),
      dniPersonal: new FormControl(
        this.pn_gestanteServicio.getauxNroDocPersonal(),
        [Validators.required]
      ),
      personalEess: new FormControl(
        this.pn_gestanteServicio.getauxNombresPersonal(),
        [Validators.required]
      ),
      fechaReg: new FormControl(
        this.datePipe.transform(this.auxFechaRegistro, "yyyy-MM-dd")
      ),
      nroGesta: new FormControl(1, [Validators.required]),
      aborto: new FormControl(false, [Validators.required]),
    });
  }

  closeDialog() {
    this.gestanteDialog = false;
    this.ref.close();
    this.mostrarPadronNominalGestantes();
  }

  async mostrarPadronNominalGestantes() {
    this.pn_gestanteServicio.couch = true;
    await this.pn_gestanteServicio
      .mostrarPadronGestantes(this.pn_gestanteServicio.getauxCodeessActual())
      .then(
        (data: any) => {
          this.listaGestantes = data["rows"];
          this.listaGestantesPuerpera = this.listaGestantes.filter((aux) => {
            if (
              this.semanaGestacional(aux.value.fur) < 44 &&
              aux.value.aborto == false
            )
              return aux;
          });
        },
        (err) => {
          this.listaGestantes = [];
        }
      );
  }

  calcularFPP() {
    let fum: any = new DatePipe("en-CO")
      .transform(this.auxFUR, "yyyy/MM/dd")
      .split("/");
    let newDay: any = parseInt(fum[2]) + 7;
    let newMonth: any = parseInt(fum[1]) - 3;
    let newYear: any = parseInt(fum[0]);

    if (newMonth == 2) {
      if (newDay > 28 && newDay <= 30) {
        newDay = newDay - 28;
        newMonth = newMonth + 1;
      }
    }
    if (parseInt(fum[1]) <= 3) {
      newMonth = 12 + newMonth;
    } else {
      newYear = newYear + 1;
    }
    if (newDay > 30) {
      newDay = newDay - 30;
      newMonth = newMonth + 1;
    }
    if (newMonth > 12) {
      newMonth = newMonth - 12;
      newYear = newYear + 1;
    }
    if (newDay < 10) {
      newDay = "0" + newDay;
    }
    if (newMonth < 10) {
      newMonth = "0" + newMonth;
    }
    let auxBirth = newYear + "/" + newMonth + "/" + newDay;
    fum = new Date(fum);
    fum.setMonth(fum.getMonth() + 9);
    fum.setDate(fum.getDate() + 7);
    this.formGestante
      .get("fpp")
      .setValue(this.datePipe.transform(auxBirth, "yyyy-MM-dd"));
  }

  editarDatos() {
    if (
      this.dataGestanteEditar !== null ||
      this.dataGestanteEditar !== undefined
    ) {
      this.auxFUR = this.dataGestanteEditar.auxFur;
      this.auxFPP = this.dataGestanteEditar.auxFpp;
      this.formGestante
        .get("tipoDocIdentidad")
        .setValue(this.dataGestanteEditar.tipoDocIdentidad);
      this.formGestante
        .get("nroDocIdentidad")
        .setValue(this.dataGestanteEditar.nroDocIdentidad);
      this.formGestante
        .get("tieneSis")
        .setValue(this.dataGestanteEditar.tieneSis === "" ? "NO" : "SI");
      this.formGestante
        .get("fechaNacimiento")
        .setValue(
          this.datePipe.transform(
            this.dataGestanteEditar.fechaNacimiento,
            "yyyy-MM-dd"
          )
        );
      this.formGestante
        .get("aborto")
        .setValue(this.dataGestanteEditar.aborto);
      this.formGestante
        .get("nroGesta")
        .setValue(this.dataGestanteEditar.nroGesta.length);
      this.formGestante
        .get("nombres")
        .setValue(this.dataGestanteEditar.nombres);
      this.formGestante
        .get("apePaterno")
        .setValue(this.dataGestanteEditar.apePaterno);
      this.formGestante
        .get("apeMaterno")
        .setValue(this.dataGestanteEditar.apeMaterno);
      this.formGestante
        .get("codEessAnterior")
        .setValue(this.dataGestanteEditar.codEessAnterior);
      this.formGestante
        .get("eessAnterior")
        .setValue(this.dataGestanteEditar.eessAnterior);
      this.formGestante
        .get("codEessActual")
        .setValue(this.dataGestanteEditar.codEessActual);
      this.formGestante
        .get("eessActual")
        .setValue(this.dataGestanteEditar.eessActual);
      this.formGestante.get("hcl").setValue(this.dataGestanteEditar.hcl);
      this.formGestante
        .get("fechaReg")
        .setValue(
          this.datePipe.transform(
            this.dataGestanteEditar.fechaReg,
            "yyyy-MM-dd"
          )
        );
      // this.formGestante.get("fur").setValue(this.datePipe.transform(this.dataGestanteEditar.auxFur,'yyyy-MM-dd'));
      // this.formGestante.get("fpp").setValue(this.datePipe.transform(this.dataGestanteEditar.auxFpp,'yyyy-MM-dd'));
      this.formGestante
        .get("direccion")
        .setValue(this.dataGestanteEditar.direccion);
      this.formGestante
        .get("referencia")
        .setValue(this.dataGestanteEditar.referencia);
      this.formGestante
        .get("telefono")
        .setValue(this.dataGestanteEditar.telefono);
      this.formGestante
        .get("morbilidadPotencial")
        .setValue(this.dataGestanteEditar.morbilidadPotencial);
      this.formGestante
        .get("observaciones")
        .setValue(this.dataGestanteEditar.observaciones);
    }
    return;
  }
  formatoFecha(date: string) {
    let fecha: any = date.split("/");
    let newDay: any = fecha[0];
    let newMonth: any = fecha[1];
    let newYear: any = fecha[2];

    let fecha_nuevo_formato = newYear + "/" + newMonth + "/" + newDay;
    return fecha_nuevo_formato;
  }

  async cargarDatosPadron(event) {
    let nroDoc = this.formGestante.value.nroDocIdentidad;
    this.pn_gestanteServicio.couch = true;
    if (nroDoc.length >= 8) {
      await this.pn_gestanteServicio
        .getGestanteDni(nroDoc)
        .then((data: any) => {
          // this.dataGestante = data.rows[0].value;
          // console.log("dataaaa",data);
          // console.log("data gestanteeee",this.dataGestante);
          if (data.rows.length == 0) {
            this.limpiarFormulario();
            this.estadoGuardar = false;
            this.messageService.add({
              key: "myMessage1",
              severity: "info",
              summary: "Consulta realizada",
              detail: "Gestante no registrado en el padron nominal",
            });
          } else if (data.rows[0].value != undefined) {
            this.dataGestante = data.rows[0].value;
            this.estadoGuardar = true;
            this.formGestante
              .get("tipoDocIdentidad")
              .setValue(this.dataGestante.tipoDocIdentidad);
            this.formGestante
              .get("nroDocIdentidad")
              .setValue(this.dataGestante.nroDocIdentidad);
            this.formGestante
              .get("tieneSis")
              .setValue(this.dataGestante.tieneSis === "" ? "NO" : "SI");
            this.formGestante
              .get("fechaNacimiento")
              .setValue(
                this.datePipe.transform(
                  this.dataGestante.fechaNacimiento,
                  "yyyy-MM-dd"
                )
              );
            this.formGestante
              .get("aborto")
              .setValue(this.dataGestante.aborto);
            this.formGestante
              .get("nroGesta")
              .setValue(this.dataGestante.nroGesta.length);
            this.formGestante
              .get("nombres")
              .setValue(this.dataGestante.nombres);
            this.formGestante
              .get("apePaterno")
              .setValue(this.dataGestante.apePaterno);
            this.formGestante
              .get("apeMaterno")
              .setValue(this.dataGestante.apeMaterno);
            this.formGestante
              .get("codEessAnterior")
              .setValue(this.dataGestante.codEessAnterior);
            this.formGestante
              .get("eessAnterior")
              .setValue(this.dataGestante.eessAnterior);
            this.formGestante
              .get("codEessActual")
              .setValue(this.dataGestante.codEessActual);
            this.formGestante
              .get("eessActual")
              .setValue(this.dataGestante.eessActual);
            this.formGestante.get("hcl").setValue(this.dataGestante.hcl);
            this.formGestante
              .get("fechaReg")
              .setValue(
                this.datePipe.transform(
                  this.dataGestante.fechaReg,
                  "yyyy-MM-dd"
                )
              );
            this.formGestante
              .get("fur")
              .setValue(
                this.datePipe.transform(
                  this.formatoFecha(this.dataGestante.fur),
                  "yyyy-MM-dd"
                )
              );
            this.formGestante
              .get("fpp")
              .setValue(
                this.datePipe.transform(
                  this.formatoFecha(this.dataGestante.fpp),
                  "yyyy-MM-dd"
                )
              );
            this.formGestante
              .get("direccion")
              .setValue(this.dataGestante.direccion);
            this.formGestante
              .get("referencia")
              .setValue(this.dataGestante.referencia);
            this.formGestante
              .get("telefono")
              .setValue(this.dataGestante.telefono);
            this.formGestante
              .get("morbilidadPotencial")
              .setValue(this.dataGestante.morbilidadPotencial);
            this.formGestante
              .get("observaciones")
              .setValue(this.dataGestante.observaciones);
            this.messageService.add({
              key: "myMessage1",
              severity: "success",
              summary: "Consulta realizada",
              detail: "Gestante registrado en el padron nominal",
            });
          }
        });
    }
  }

  updateOEdith() {
    if (this.dataGestanteEditar == null) {
      this.saveForm();
    } else {
      this.EditarGestante();
    }
  }

  recuperarDatos() {
    this.gestante = {
      nombres: this.formGestante.value.nombres,
      apePaterno: this.formGestante.value.apePaterno,
      apeMaterno: this.formGestante.value.apeMaterno,
      fechaNacimiento: this.datePipe.transform(
        this.formGestante.value.fechaNacimiento,
        "yyyy/MM/dd"
      ),
      tipoDocIdentidad: this.formGestante.value.tipoDocIdentidad,
      nroDocIdentidad: this.formGestante.value.nroDocIdentidad,
      telefono: this.formGestante.value.telefono,
      tieneSis: this.formGestante.value.tieneSis,
      direccion: this.formGestante.value.direccion,
      referencia: this.formGestante.value.referencia,
      hcl: this.formGestante.value.hcl,
      codEessAnterior: this.formGestante.value.codEessAnterior,
      eessAnterior: this.formGestante.value.eessAnterior,
      codEessActual: this.formGestante.value.codEessActual,
      eessActual: this.formGestante.value.eessActual,
      fur: this.datePipe.transform(this.formGestante.value.fur, "dd/MM/yyyy"),
      fpp: this.datePipe.transform(this.formGestante.value.fpp, "dd/MM/yyyy"),
      morbilidadPotencial: this.formGestante.value.morbilidadPotencial,
      observaciones: this.formGestante.value.observaciones,
      dniPersonal: this.formGestante.value.dniPersonal,
      personalEess: this.pn_gestanteServicio.getauxNombresPersonal(),
      fechaReg: this.datePipe.transform(
        this.formGestante.value.fechaReg,
        "yyyy/MM/dd"
      ),
      nroGesta: [
        {
          nroGesta: this.formGestante.value.nroGesta,
          fur: this.datePipe.transform(
            this.formGestante.value.fur,
            "dd/MM/yyyy"
          ),
          fpp: this.datePipe.transform(
            this.formGestante.value.fpp,
            "dd/MM/yyyy"
          ),
          codEessActual: this.pn_gestanteServicio.getauxCodeessActual(),
          eessActual: this.pn_gestanteServicio.getaux_eessActual(),
          morbilidadPotencial: this.formGestante.value.morbilidadPotencial,
          observaciones: this.formGestante.value.observaciones,
          aborto: this.formGestante.value.aborto,
          estado: "",
        },
      ],
      aborto: this.formGestante.value.aborto,
    };
  }

  recuperarDatosEditar() {
    this.gestante = {
      nombres: this.formGestante.value.nombres,
      apePaterno: this.formGestante.value.apePaterno,
      apeMaterno: this.formGestante.value.apeMaterno,
      fechaNacimiento: this.datePipe.transform(
        this.formGestante.value.fechaNacimiento,
        "yyyy/MM/dd"
      ),
      tipoDocIdentidad: this.formGestante.value.tipoDocIdentidad,
      nroDocIdentidad: this.formGestante.value.nroDocIdentidad,
      telefono: this.formGestante.value.telefono,
      tieneSis: this.formGestante.value.tieneSis,
      direccion: this.formGestante.value.direccion,
      referencia: this.formGestante.value.referencia,
      hcl: this.formGestante.value.hcl,
      codEessAnterior: this.formGestante.value.codEessAnterior,
      eessAnterior: this.formGestante.value.eessAnterior,
      codEessActual: this.formGestante.value.codEessActual,
      eessActual: this.formGestante.value.eessActual,
      fur: this.datePipe.transform(this.formGestante.value.fur, "dd/MM/yyyy"),
      fpp: this.datePipe.transform(this.formGestante.value.fpp, "dd/MM/yyyy"),
      morbilidadPotencial: this.formGestante.value.morbilidadPotencial,
      observaciones: this.formGestante.value.observaciones,
      dniPersonal: this.formGestante.value.dniPersonal,
      personalEess: this.pn_gestanteServicio.getauxNombresPersonal(),
      fechaReg: this.datePipe.transform(
        this.formGestante.value.fechaReg,
        "yyyy/MM/dd"
      ),
      aborto: this.formGestante.value.aborto,
    };
  }

  saveForm() {
    if (this.formGestante.valid == true) {
      this.recuperarDatos();
      // this.dataGestante=this.formGestante.value;
      this.pn_gestanteServicio.couch = true;
      this.pn_gestanteServicio
        .addGestante(this.gestante)
        .subscribe((res: any) => {
          this.closeDialog();
          Swal.fire({
            icon: "success",
            title: "Se registro Exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      this.messageService.add({
        key: "myMessage1",
        severity: "error",
        summary: "Error",
        detail: "Tiene que completar el formulario",
      });
    }
    this.mostrarPadronNominalGestantes();
  }

  EditarGestante() {
    this.recuperarDatosEditar();
    this.estadoGuardar = false;
    let id = this.dataGestanteEditar._id;
    this.pn_gestanteServicio.couch = true;
    this.pn_gestanteServicio
      .actualizarInformacionGestante(id, this.gestante)
      .subscribe((res: any) => {
        this.closeDialog();
        if (res["ok"] == true) {
          Swal.fire({
            icon: "success",
            title: "Se actualizo los campos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar los campos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  semanaGestacional(date: any): any {
    if (date) {
      let today = new Date().getTime();
      let auxFUR = new Date(date).getTime();
      auxFUR = auxFUR + 0;
      let auxWeek = today - auxFUR;
      let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
      let semanas = Math.trunc(edadGestacional / 7);
      return semanas;
    }
  }

  limpiarFormulario() {
    // this.formGestante.get("tipoDocIdentidad").setValue("");
    // this.formGestante.get("nroDocIdentidad").setValue("");
    this.formGestante.get("tieneSis").setValue("");
    this.formGestante.get("fechaNacimiento").setValue("");
    this.formGestante.get("aborto").setValue("");
    this.formGestante.get("nroGesta").setValue(1);
    this.formGestante.get("nombres").setValue("");
    this.formGestante.get("apePaterno").setValue("");
    this.formGestante.get("apeMaterno").setValue("");
    // this.formGestante.get("codEessAnterior").setValue("");
    // this.formGestante.get("eessAnterior").setValue("");
    // this.formGestante.get("codEessActual").setValue("");
    // this.formGestante.get("eessActual").setValue("");
    this.formGestante.get("hcl").setValue("");
    // this.formGestante.get("fechaReg").setValue("");
    this.formGestante.get("fur").setValue("");
    this.formGestante.get("fpp").setValue("");
    this.formGestante.get("direccion").setValue("");
    this.formGestante.get("referencia").setValue("");
    this.formGestante.get("telefono").setValue("");
    this.formGestante.get("morbilidadPotencial").setValue("");
    this.formGestante.get("observaciones").setValue("");
  }
}
