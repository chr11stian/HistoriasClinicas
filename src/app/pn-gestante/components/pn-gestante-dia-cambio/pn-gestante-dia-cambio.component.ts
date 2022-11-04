import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-pn-gestante-dia-cambio",
  templateUrl: "./pn-gestante-dia-cambio.component.html",
  styleUrls: ["./pn-gestante-dia-cambio.component.css"],
})
export class PnGestanteDiaCambioComponent implements OnInit {
  formGestante: FormGroup;
  isUpdate: boolean = false;
  dataGestante: any;
  dataGestanteCambiar: any = null;
  listaGestantes: any[] = [];
  datePipe = new DatePipe("en-US");
  checked: boolean = false;
  existeGestante: boolean = false;
  dataGestanteCambio: any;
  //data personal

  sis: any[] = [{ value: "SI" }, { value: "NO" }];
  aborto: any[] = [{ value: "true" }, { value: "false" }];

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
    private pn_gestanteServicio: PnGestanteService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {}
  inicializarForm() {
    this.formGestante = this.fb.group({
      formTipoDoc: new FormControl(""),
      formNroDocGestante: new FormControl(""),
      formNombresGestante: new FormControl(""),
      formApePaterno: new FormControl(""),
      formApeMaterno: new FormControl(""),
      formCod_eess_anterior: new FormControl(""),
      form_eess_anterior: new FormControl(""),
      formCod_eess_actual: new FormControl(""),
      form_eess_actual: new FormControl(""),
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
    this.mostrarPadronNominalGestantes();
  }

  saveForm() {
    this.pn_gestanteServicio.couch = true;
    this.pn_gestanteServicio
      .cambioEESS(
        this.dataGestante._id,
        this.pn_gestanteServicio.getauxCodeessActual(),
        this.pn_gestanteServicio.getaux_eessActual()
      )
      .subscribe((res: any) => {
        this.closeDialog();
        if (res["ok"] == true) {
          Swal.fire({
            icon: "success",
            title: "Se hizo el cambio de establecimiento correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title:
              "No se pudo hacer el cambio de establecimiento correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  async cargarDatosPadronNominal() {
    this.pn_gestanteServicio.couch = true;
    let nroDoc = this.formGestante.value.formNroDocGestante;
    if (nroDoc.length >= 8) {
      await this.pn_gestanteServicio
        .getGestanteDni(nroDoc)
        .then((data: any) => {
          this.dataGestante = data.rows[0].value;
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
            .setValue(this.dataGestante.codEessActual);
          this.formGestante
            .get("form_eess_anterior")
            .setValue(this.dataGestante.eessActual);
          this.formGestante
            .get("formCod_eess_actual")
            .setValue(this.pn_gestanteServicio.getauxCodeessActual());
          this.formGestante
            .get("form_eess_actual")
            .setValue(this.pn_gestanteServicio.getaux_eessActual());
        });
    }
  }
}
