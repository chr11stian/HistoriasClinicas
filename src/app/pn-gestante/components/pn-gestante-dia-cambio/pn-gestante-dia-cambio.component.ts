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
    { value: "Ninguna" },
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
      formNombresGestante: new FormControl(""),
      formApellidos: new FormControl(""),
      formCod_eess_anterior: new FormControl(""),
      form_eess_anterior: new FormControl(""),
      formCod_eess_actual: new FormControl(""),
      form_eess_actual: new FormControl(""),
    });
  }
  mostrarPadronNominalGestantes() {
    let cod_ipress =this.pn_gestanteServicio.getauxCodeessActual();
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
    this.pn_gestanteServicio
      .cambioEESS(
        this.dataGestante._id,
        this.pn_gestanteServicio.getauxCodeessActual(),
        this.pn_gestanteServicio.getaux_eessActual()
      )
      .subscribe((res: any) => {
        this.closeDialog();
        if(res['ok']==true){
          Swal.fire({
            icon: "success",
            title: "Se hizo el cambio de establecimiento correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "No se pudo hacer el cambio de establecimiento correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  cargarDatosPadronNominal() {
    this.pn_gestanteServicio.couch = true;
    let nroDoc=this.formGestante.value.formNroDocGestante;
    if(nroDoc.length>=8){
      this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe((data: any) => {
        console.log("DATA RECUPERADA :", data);
        this.dataGestante = data.rows[0].value;
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
          .setValue(this.pn_gestanteServicio.getauxCodeessActual());
        this.formGestante.get("form_eess_actual").setValue(this.pn_gestanteServicio.getaux_eessActual());
      });
    }
    
  }

}
