import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";
import { NuevaGesta } from "../../interfaces/NuevaGesta";

@Component({
  selector: "app-pn-gestante-dia-gesta",
  templateUrl: "./pn-gestante-dia-gesta.component.html",
  styleUrls: ["./pn-gestante-dia-gesta.component.css"],
  providers: [MessageService],
})
export class PnGestanteDiaGestaComponent implements OnInit {
  formGestante: FormGroup;
  isUpdate: boolean = false;
  dataGestante: any;
  dataGestanteEditar: any = null;
  listaGestantes: any[] = [];
  datePipe = new DatePipe("en-US");
  checked: boolean = false;
  existeGestante: boolean = false;
  auxFechaRegistro: Date = new Date();
  selectedAborto: boolean;
  auxFPP: any;
  auxFUR: any;
  agregarNuevaGesta: boolean = true;
  FechaActual = new Date().getTime();
  sis: any[] = [{ value: "SI" }, { value: "NO" }];
  nuevaGesta: NuevaGesta;
  aborto: any[] = [
    { label: "SI", value: true },
    { label: "NO", value: false },
  ];
  gestanteEnGestacion: boolean = false;
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
    private messageService: MessageService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {}
  inicializarForm() {
    this.formGestante = this.fb.group({
      formTipoDoc: new FormControl({ value: ""}),
      formNroDocGestante: new FormControl(""),
      formTieneSis: new FormControl({ value: "", disabled: true }),
      formFechaNacimiento: new FormControl({ value: "", disabled: true }),
      formEdad: new FormControl({ value: "", disabled: true }),
      formAborto: new FormControl({ value: "", disabled: true }),
      formGesta: new FormControl({ value: "", disabled: true }),
      formNombresGestante: new FormControl({ value: "", disabled: true }),
      formApePaterno: new FormControl({ value: "", disabled: true }),
      formApeMaterno: new FormControl({ value: "", disabled: true }),
      formCod_eess_anterior: new FormControl({ value: "", disabled: true }),
      form_eess_anterior: new FormControl({ value: "", disabled: true }),
      formCod_eess_actual: new FormControl({ value: "", disabled: true }),
      form_eess_actual: new FormControl({ value: "", disabled: true }),
      formHCL: new FormControl({ value: "", disabled: true }),
      formFechaRegistro: new FormControl({ value: "", disabled: true }),
      formFur: new FormControl(""),
      formFpp: new FormControl({ value: "", disabled: true }),
      formDireccion: new FormControl({ value: "", disabled: true }),
      formReferencia: new FormControl({ value: "", disabled: true }),
      formTelefono: new FormControl({ value: "", disabled: true }),
      formMorbilidadPotencial: new FormControl({ value: "", disabled: true }),
      formObservaciones: new FormControl({ value: "", disabled: true }),
    });
  }
  async mostrarPadronNominalGestantes() {
    let cod_ipress = this.pn_gestanteServicio.getauxCodeessActual();
    this.pn_gestanteServicio.couch = true;
    await this.pn_gestanteServicio
      .mostrarPadronGestantes(cod_ipress)
      .then((res: any) => {
        this.listaGestantes = res["rows"];
      });
  }

  closeDialog() {
    this.ref.close();
    this.gestanteEnGestacion = false;
    this.agregarNuevaGesta = true;
    this.mostrarPadronNominalGestantes();
  }

  editarGestante() {
    //(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
    this.recuperarNuevaGesta();
    this.pn_gestanteServicio.couch = true;
    let id = this.dataGestante._id;
    let updatedFur = this.datePipe.transform(this.auxFUR, "dd/MM/yyyy");
    let updateFpp = this.datePipe.transform(this.auxFPP, "dd/MM/yyyy");
    this.pn_gestanteServicio
      .actualizarNumeroGesta(id, this.nuevaGesta, updatedFur, updateFpp)
      .subscribe((res: any) => {
        this.closeDialog();
        if (res["ok"] == true) {
          Swal.fire({
            icon: "success",
            title: "Se actualizo el número de gestación correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar el número de gestación correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  recuperarNuevaGesta() {
    //(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
    //  eessAnterior:this.formGestante.value.eessAnterior,
    this.nuevaGesta = {
      nroGesta: this.dataGestante.nroGesta.length + 1,
      fur: this.datePipe.transform(
        this.formGestante.value.formFur,
        "dd/MM/yyyy"
      ),
      fpp: this.datePipe.transform(
        this.formGestante.value.formFpp,
        "dd/MM/yyyy"
      ),
      codEessActual: this.pn_gestanteServicio.getauxCodeessActual(),
      eessActual: this.pn_gestanteServicio.getaux_eessActual(),
      morbilidadPotencial: this.dataGestante.morbilidadPotencial,
      observaciones: this.dataGestante.observaciones,
      aborto: this.dataGestante.aborto,
      estado: "",
    };
  }

  cargarDatosPadronNominal() {
    this.pn_gestanteServicio.couch = true;
    let nroDoc = this.formGestante.value.formNroDocGestante;
    if (nroDoc.length >= 8) {
      this.limpiarFormulario();
      this.pn_gestanteServicio
        .getGestanteDniIpress(
          this.pn_gestanteServicio.getauxCodeessActual(),
          nroDoc
        )
        .subscribe(
          (data: any) => {
            if (data.rows.length == 0) {
              this.gestanteEnGestacion = false;
              this.messageService.add({
                key: "myMessage1",
                severity: "error",
                summary: "Consulta realizada",
                detail:
                  "La gestante no se encuentra registrada en este establecimiento de salud",
              });
            } else if (data.rows[0].value != undefined) {
              this.dataGestante = data.rows[0].value;
              this.formGestante
                .get("formTipoDoc")
                .setValue(this.dataGestante.tipoDocIdentidad);
              this.formGestante
                .get("formNroDocGestante")
                .setValue(this.dataGestante.nroDocIdentidad);
              this.formGestante
                .get("formTieneSis")
                .setValue(this.dataGestante.tieneSis == "" ? "NO" : "SI");
              this.formGestante
                .get("formFechaNacimiento")
                .setValue(
                  this.datePipe.transform(
                    this.dataGestante.fechaNacimiento,
                    "yyyy-MM-dd"
                  )
                );
              this.formGestante
                .get("formEdad")
                .setValue(this.dataGestante.edad);
              this.formGestante
                .get("formNombresGestante")
                .setValue(this.dataGestante.nombres);
              this.formGestante
                .get("formApePaterno")
                .setValue(this.dataGestante.apePaterno);
              this.formGestante
                .get("formApeMaterno")
                .setValue(this.dataGestante.apeMaterno);
              this.formGestante
                .get("formCod_eess_anterior")
                .setValue(this.dataGestante.codEessAnterior);
              this.formGestante
                .get("form_eess_anterior")
                .setValue(this.dataGestante.eessAnterior);
              this.formGestante
                .get("formCod_eess_actual")
                .setValue(this.dataGestante.codEessActual);
              this.formGestante
                .get("form_eess_actual")
                .setValue(this.dataGestante.eessActual);
              this.formGestante.get("formHCL").setValue(this.dataGestante.hcl);
              this.formGestante
                .get("formFechaRegistro")
                .setValue(
                  this.datePipe.transform(
                    this.dataGestante.fechaReg,
                    "yyyy-MM-dd"
                  )
                );
              this.formGestante
                .get("formFur")
                .setValue(
                  this.datePipe.transform(
                    this.formatoFecha(this.dataGestante.fur),
                    "yyyy-MM-dd"
                  )
                );
              this.formGestante
                .get("formFpp")
                .setValue(
                  this.datePipe.transform(
                    this.formatoFecha(this.dataGestante.fpp),
                    "yyyy-MM-dd"
                  )
                );
              this.formGestante
                .get("formDireccion")
                .setValue(this.dataGestante.direccion);
              this.formGestante
                .get("formReferencia")
                .setValue(this.dataGestante.referencia);
              this.formGestante
                .get("formTelefono")
                .setValue(this.dataGestante.telefono);
              this.formGestante
                .get("formMorbilidadPotencial")
                .setValue(this.dataGestante.morbilidadPotencial);
              this.formGestante
                .get("formObservaciones")
                .setValue(this.dataGestante.observaciones);
              this.formGestante
                .get("formGesta")
                .setValue(this.dataGestante.nroGesta.length);
              this.formGestante
                .get("formAborto")
                .setValue(this.dataGestante.aborto);
              if (
                this.semanaGestacional(
                  this.formatoFecha(this.dataGestante.fur)
                ) > 40 ||
                this.dataGestante.aborto == true ||
                this.dataGestante.fpp > this.FechaActual
              ) {
                this.agregarNuevaGesta = false;
                this.messageService.add({
                  key: "myMessage2",
                  severity: "info",
                  summary: "Consulta realizada",
                  detail: "Estado,no gestante",
                });
              } else {
                this.gestanteEnGestacion = true;
                this.agregarNuevaGesta = true;
                this.messageService.add({
                  key: "myMessage3",
                  severity: "warn",
                  summary: "Consulta realizada",
                  detail: "Estado,gestante en proceso de gestación",
                });
              }
            }
          },
          (err) => {
            this.dataGestante = {};
          }
        );
    }
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
      let dias = edadGestacional % 7;
      return semanas;
    }
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
      .get("formFpp")
      .setValue(this.datePipe.transform(auxBirth, "yyyy-MM-dd"));
    console.log(this.datePipe.transform(auxBirth, "yyyy-MM-dd"));
    console.log("auxFpp", this.auxFPP);
  }

  agregarGesta() {
    this.pn_gestanteServicio.couch = true;
    let nroGesta = this.formGestante.value.formGesta;
    let fur = this.datePipe.transform(
      this.formGestante.value.formFUR,
      "dd/MM/yyyy"
    );
    let fpp = this.datePipe.transform(
      this.formGestante.value.formFPP,
      "dd/MM/yyyy"
    );
    console.log("fpp", fpp);
    this.nuevaGesta.codEessActual =
      this.pn_gestanteServicio.getauxCodeessActual();
    this.nuevaGesta.eessActual = this.pn_gestanteServicio.getaux_eessActual();
    nroGesta = this.formGestante.value.formGesta;
    this.nuevaGesta.fur = this.datePipe.transform(
      this.formGestante.value.formFUR,
      "dd/MM/yyyy"
    );
    this.nuevaGesta.fpp = this.datePipe.transform(
      this.formGestante.value.formFPP,
      "dd/MM/yyyy"
    );
    this.pn_gestanteServicio
      .actualizarNumeroGesta(this.dataGestante._id, nroGesta, fur, fpp)
      .subscribe((res: any) => {
        this.closeDialog();
        if (res["ok"] == true) {
          Swal.fire({
            icon: "success",
            title: "Se actualizo los datos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.mostrarPadronNominalGestantes();
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar los datos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.mostrarPadronNominalGestantes();
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  formatoFecha(date: string) {
    let fum: any = date.split("/");
    let newDay: any = fum[0];
    let newMonth: any = fum[1];
    let newYear: any = fum[2];

    let auxBirth = newYear + "/" + newMonth + "/" + newDay;
    return auxBirth;
    // this.formGestante.get('fpp').setValue(this.datePipe.transform(auxBirth,'yyyy-MM-dd'));
  }

  limpiarFormulario() {
    this.formGestante.get("formTipoDoc").setValue("");
    this.formGestante.get("formNroDocGestante").setValue("");
    this.formGestante.get("formTieneSis").setValue("");
    this.formGestante.get("formFechaNacimiento").setValue("");
    this.formGestante.get("formEdad").setValue("");
    this.formGestante.get("formNombresGestante").setValue("");
    this.formGestante.get("formApePaterno").setValue("");
    this.formGestante.get("formApeMaterno").setValue("");
    this.formGestante.get("formCod_eess_anterior").setValue("");
    this.formGestante.get("form_eess_anterior").setValue("");
    this.formGestante.get("formCod_eess_actual").setValue("");
    this.formGestante.get("form_eess_actual").setValue("");
    this.formGestante.get("formHCL").setValue("");
    this.formGestante.get("formFechaRegistro").setValue("");
    this.formGestante.get("formFur").setValue("");
    this.formGestante.get("formFpp").setValue("");
    this.formGestante.get("formDireccion").setValue("");
    this.formGestante.get("formReferencia").setValue("");
    this.formGestante.get("formTelefono").setValue("");
    this.formGestante.get("formMorbilidadPotencial").setValue("");
    this.formGestante.get("formObservaciones").setValue("");
    this.formGestante.get("formGesta").setValue("");
    this.formGestante.get("formAborto").setValue("");
  }
}
