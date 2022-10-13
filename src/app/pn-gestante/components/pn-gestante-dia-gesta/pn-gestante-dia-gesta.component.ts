import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";

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
  auxFechaRegistro: Date = new Date();
  selectedAborto: boolean;
  auxFPP: any;
  auxFUR: any;
  agregarNuevaGesta: boolean = false;
  auxFechaActual: Date = new Date();
  //data personal
  auxNroDocPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .nroDocumento;
  auxNombresPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .nombres;
  auxApellidosPersonal: string = JSON.parse(localStorage.getItem("usuario"))
    .apellidos;
  auxCodeessActual: string = JSON.parse(localStorage.getItem("usuario")).ipress
    .idIpress;
  aux_eessActual: string = JSON.parse(localStorage.getItem("usuario")).ipress
    .nombreEESS;
  sis: any[] = [{ value: "SI" }, { value: "NO" }];

  aborto: any[] = [
    { label: "SI", value: true },
    { label: "NO", value: false },
  ];

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
    private pn_gestanteServicio: PnGestanteService,
    private messageService: MessageService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }
  inicializarForm() {
    this.formGestante = this.fb.group({
      formTipoDoc: new FormControl(""),
      formNroDocGestante: new FormControl(""),
      formTieneSis: new FormControl(""),
      formFechaNacimiento: new FormControl(""),
      formEdad: new FormControl(""),
      formAborto: new FormControl(""),
      formGesta: new FormControl(0),
      formNombresGestante: new FormControl(""),
      formApellidos: new FormControl(""),
      formCod_eess_anterior: new FormControl(""),
      form_eess_anterior: new FormControl(""),
      formCod_eess_actual: new FormControl(""),
      form_eess_actual: new FormControl(""),
      formHCL: new FormControl(""),
      formFechaRegistro: new FormControl(
        this.datePipe.transform(this.auxFechaRegistro, "yyyy-MM-dd")
      ),
      formFur: new FormControl(""),
      formFpp: new FormControl(""),
      formDireccion: new FormControl(""),
      formReferencia: new FormControl(""),
      formTelefono: new FormControl(""),
      formMorbilidadPotencial: new FormControl(""),
      formObservaciones: new FormControl(""),
    });
  }
  mostrarPadronNominalGestantes() {
    let cod_ipress =this.auxCodeessActual;
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

  editarGestante() {
    this.pn_gestanteServicio.couch = true;
    let id= this.dataGestante._id;
    let updateFur=this.formGestante.value.formFur;
    let updateFpp=this.formGestante.value.formFpp;
    let updateNroGesta=this.formGestante.value.formGesta;
    // console.log("data gestante", this.dataGestanteEditar);
    // console.log("_id", this.dataGestanteEditar.value._id);
    // console.log("_rev", this.dataGestanteEditar.value._rev);
    this.pn_gestanteServicio
      .actualizarNumeroGesta(id,updateNroGesta,updateFur,updateFpp)
      .subscribe((res: any) => {
        this.closeDialog();
        if(res['ok']==true){
          Swal.fire({
            icon: "success",
            title: "Se actualizo el número de gestacion correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar el número de gestacion correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }

  cargarDatosPadronNominal() {
    this.pn_gestanteServicio.couch = true;
    let nroDoc = this.formGestante.value.formNroDocGestante;
    if(nroDoc.length>=8){
      this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe((data: any) => {
        console.log("DATA RECUPERADA :", data);
        this.dataGestante = data.rows[0].value;
        console.log("dataaaaaa ", this.dataGestante);
        this.formGestante
          .get("formTipoDoc")
          .setValue(this.dataGestante.tipoDocIdentidad);
        this.formGestante
          .get("formNroDocGestante")
          .setValue(this.dataGestante.nroDocIdentidad
            );
        this.formGestante
          .get("formTieneSis")
          .setValue(this.dataGestante.tieneSis);
        this.formGestante
          .get("formFechaNacimiento")
          .setValue(
            this.datePipe.transform(
              this.dataGestante.fecha_nacimiento,
              "yyyy-MM-dd"
            )
          );
        this.formGestante.get("formEdad").setValue(this.dataGestante.edad);
        this.formGestante
          .get("formNombresGestante")
          .setValue(this.dataGestante.nombres);
        this.formGestante
          .get("formApellidos")
          .setValue(this.dataGestante.apellidos);
        this.formGestante
          .get("formCod_eess_anterior")
          .setValue(this.dataGestante.cod_eessAnterior);
        this.formGestante
          .get("form_eess_anterior")
          .setValue(this.dataGestante.eess_anterior);
        this.formGestante
          .get("formCod_eess_actual")
          .setValue(this.dataGestante.cod_eessActual);
        this.formGestante
          .get("form_eess_actual")
          .setValue(this.dataGestante.eess_actual);
        this.formGestante
          .get("formHCL")
          .setValue(this.dataGestante.nro_historial_clinica);
        this.formGestante
          .get("formFechaRegistro")
          .setValue(this.dataGestante.fechaReg);
        this.formGestante
          .get("formFur")
          .setValue(this.datePipe.transform(this.dataGestante.fur, "yyyy-MM-dd"));
        this.formGestante
          .get("formFpp")
          .setValue(this.datePipe.transform(this.dataGestante.fpp, "yyyy-MM-dd"));
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
          .setValue(this.dataGestante.numero_de_gestacion);
        this.formGestante
          .get("formAborto")
          .setValue(this.dataGestante.aborto == true ? "SI" : "NO");
        if (this.semanaGestacional(this.dataGestante.fur)>40 && this.dataGestante.fpp > this.auxFechaActual || this.dataGestante.aborto==true) {
          this.agregarNuevaGesta = false;

        } 
        else {
          this.agregarNuevaGesta = true;
          this.messageService.add({
            key: "myMessage1",
            severity: "warn",
            summary: "Data obtenida",
            detail: "Gestante en proceso de gestacion",
          });
        }
      });
    }
  
  }

  dateDiference = function (date1, date2) {
    date1 = Date.parse(date1);
    let diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  };

  formatoFecha = function (fecha) {
    var mydate = fecha.split("/");
    return `${mydate[2]}-${mydate[1]}-${mydate[0]}`;
  };

  semanaGestacional(date: string) {
    let fechaActual = Date.now();
    let fur = this.formatoFecha(date);
    let diference = this.dateDiference(fur, fechaActual) / 7;
    let semanas = Math.floor(diference);
    let dias = Math.floor(diference % 2);
    return semanas;
  }

  calcularFPP(){
    let fum: any = new DatePipe('en-CO').transform(this.auxFUR,'yyyy/MM/dd').split("/");
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
        newYear = (newYear) + 1;
    }
    if (newDay > 30) {
      
        newDay = newDay - 30;
        newMonth = newMonth + 1
    }
    if (newMonth > 12) {
        newMonth = newMonth - 12
        newYear = newYear + 1
    }
    if (newDay < 10) {
        newDay = '0' + newDay
    }
    if (newMonth < 10) {
        newMonth = '0' + newMonth
    }
    let auxBirth = newYear + '/' + newMonth + '/' + newDay ;
    fum = new Date(fum);
    fum.setMonth(fum.getMonth() + 9);
    fum.setDate(fum.getDate() + 7);
    console.log(fum);
    this.formGestante.get('formFpp').setValue(this.datePipe.transform(auxBirth,'yyyy-MM-dd'));
  
  }

  agregarGesta() {
    this.pn_gestanteServicio.couch = true;
    let nroGesta=this.formGestante.value.formGesta;
    let fur=this.formGestante.value.formFUR;
    this.pn_gestanteServicio
      .actualizarNumeroGesta(
        this.dataGestante._id,
        nroGesta,
        fur,
        this.auxFPP
    )
      .subscribe((res: any) => {
        this.closeDialog();
        if(res['ok']==true){
          console.log("se actualizo correctamente", res);
          Swal.fire({
            icon: "success",
            title: "Se actualizo los datos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          console.log("se actualizo correctamente", res);
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar los datos correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    this.mostrarPadronNominalGestantes();
  }
}
