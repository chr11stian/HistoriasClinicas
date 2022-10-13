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
  nombres: any;
  apellidos: any;
  hcl: any;
  edad: any;
  dni: any;
  telefono: any;
  tiene_sis: any;
  direccion: any;
  referencia: any;
  cod_eess_anterior: any;
  eess_anterior: any;
  cod_eess_actual: any;
  eess_actual: any;
  fur: any;
  fpp: any;
  morbilidad_potencial: any;
  edad_gestacional: any;
  observaciones: any;
  dni_personal: any;
  personal_eess: any;
  fecha_reg: any;
  checked: boolean = false;
  existeGestante: boolean = false;
  dataGestanteCambio: any;
  //data personal
  auxNroDocPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .nroDocumento;
  auxNombresPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .nombres;
  auxApellidosPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .apellidos;
  auxCodeessActual: string = JSON.parse(localStorage.getItem("usuario")).ipress
    .renipress;
  aux_eessActual: string = JSON.parse(localStorage.getItem("usuario")).ipress
    .nombreEESS;
  sis: any[] = [{ value: "SI" }, { value: "NO" }];
  aborto: any[] = [{ value: "true" }, { value: "false" }];

  estado_gestante: any[] = [{ value: "Activo" }, { value: "Inactivo" }];
  morbilidad_potencial_a: any[] = [
    { value: "Gestante con antecedente de complicación obstetrica" },
    { value: "Gestante adolescente" },
    { value: "Primigista añosa" },
    { value: "Multigesta y/o multipara" },
    { value: "Gestantes con captación tardia" },
    { value: "Gestante con rechazo al servicio de salud" },
    { value: "Gestante traseunte" },
    { value: "Gestante con TBC" },
    { value: "Gestante con VIH/SIDA" },
    { value: "Otra causa" },
  ];

  listaDocumentos: any[] = [{ value: "DNI" }];
  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private pn_gestanteServicio: PnGestanteService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }
  inicializarForm() {
    this.formGestante = this.fb.group({
      formTipoDoc: new FormControl(""),
      formNroDocGestante: new FormControl(""),
      // formTieneSis:new FormControl(''),
      // formFechaNacimiento:new FormControl(''),
      // formEdad:new FormControl(''),
      // formAborto:new FormControl(''),
      // formGesta:new FormControl(''),
      formNombresGestante: new FormControl(""),
      formApellidos: new FormControl(""),
      formCod_eess_anterior: new FormControl(""),
      form_eess_anterior: new FormControl(""),
      formCod_eess_actual: new FormControl(""),
      form_eess_actual: new FormControl(""),
      // formHCL:new FormControl(''),
      // formFechaRegistro:new FormControl(''),
      // formFur:new FormControl(''),
      // formFpp:new FormControl(''),
      // formDireccion:new FormControl(),
      // formReferencia:new FormControl(),
      // formTelefono:new FormControl(''),
      // formMorbilidadPotencial:new FormControl(),
      // formObservaciones:new FormControl(''),
    });
  }
  mostrarPadronNominalGestantes() {
    let cod_ipress = "00002384";
    this.pn_gestanteServicio.couch = true;
    this.pn_gestanteServicio
      .mostrarPadronGestantes(cod_ipress)
      .subscribe((res: any) => {
        this.listaGestantes = res["rows"];
        console.log("lista de gestantes", this.listaGestantes);
      });
  }

  closeDialog() {
    this.ref.close();
    this.mostrarPadronNominalGestantes();
  }

  saveForm() {
    this.pn_gestanteServicio.couch = true;
    // console.log("_id", this.dataGestante._id);
    // console.log("_rev", this.dataGestante._rev);
    this.pn_gestanteServicio
      .cambioEESS(
        this.dataGestante._id,
        this.auxCodeessActual,
        this.aux_eessActual
      )
      .subscribe((res: any) => {
        this.closeDialog();
        if(res['ok']==true){
          Swal.fire({
            icon: "success",
            title: "Se cambio de establecimiento correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "No se pudo cambiar de establecimiento  correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  cargarDatosPadronNominal() {
    this.pn_gestanteServicio.couch = true;
    let nroDoc: String = String(this.formGestante.value.formNroDocGestante);
    if(nroDoc.length>=8){
      this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe((data: any) => {
        console.log("DATA RECUPERADA :", data);
        this.dataGestante = data.rows[0].value;
        console.log("dataaaaaa ", this.dataGestante);
        this.formGestante
          .get("formNombresGestante")
          .setValue(this.dataGestante.nombres);
        this.formGestante
          .get("formApellidos")
          .setValue(this.dataGestante.apellidos);
        this.formGestante
          .get("formCod_eess_anterior")
          .setValue(this.dataGestante.codEessActual);
        this.formGestante
          .get("form_eess_anterior")
          .setValue(this.dataGestante.eessActual);
        this.formGestante
          .get("formCod_eess_actual")
          .setValue(this.auxCodeessActual);
        this.formGestante.get("form_eess_actual").setValue(this.aux_eessActual);
      });
    }
    
  }

}
