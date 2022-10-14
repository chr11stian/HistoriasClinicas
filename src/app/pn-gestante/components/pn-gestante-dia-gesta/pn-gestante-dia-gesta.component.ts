import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";
import { NuevaGesta } from '../../interfaces/NuevaGesta';

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
  nuevaGesta:NuevaGesta;
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
    this.agregarNuevaGesta = true;
    this.mostrarPadronNominalGestantes();
  }

  editarGestante() {
     //(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
    this.recuperarNuevaGesta();
    this.pn_gestanteServicio.couch = true;
    let id= this.dataGestante._id;
    let updatedFur=this.datePipe.transform(this.formGestante.value.formFur,'dd/MM/yyyy');
    let updateFpp=this.datePipe.transform(this.formGestante.value.formFpp,'dd/MM/yyyy');
    console.log('valor de la nueva gesta',this.nuevaGesta);
    console.log('fur actual',updatedFur);
    console.log('fpp actual',updateFpp);
    this.pn_gestanteServicio
      .actualizarNumeroGesta(id,this.nuevaGesta,updatedFur,updateFpp)
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

  recuperarNuevaGesta(){
     //(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
    this.nuevaGesta={
      nroGesta:this.dataGestante.nroGesta.length+1,
      fur:this.datePipe.transform(this.auxFUR,'dd/MM/yyyy'),
      fpp:this.datePipe.transform(this.auxFPP,'dd/MM/yyyy'),
      codEessActual:this.pn_gestanteServicio.getauxCodeessActual(),
      eessActual:this.pn_gestanteServicio.getaux_eessActual(),
    }
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
          .setValue(this.dataGestante.nroGesta.length);
        this.formGestante
          .get("formAborto")
          .setValue(this.dataGestante.aborto == true ? "SI" : "NO");
          console.log(this.FechaActual)
        if (this.semanaGestacional(this.dataGestante.fur)>40 || this.dataGestante.aborto==true || this.dataGestante.fpp>this.FechaActual) {
          this.agregarNuevaGesta = false;
          this.messageService.add({
            key: "myMessage1",
            severity: "warn",
            summary: "Data obtenida",
            detail: "No gestante",
          });
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

  semanaGestacional(date: any):any {
    if (date) {
      let today = new Date().getTime();
      let auxFUR = new Date(date).getTime();
      auxFUR = auxFUR + 0;
      let auxWeek = today - auxFUR;
      let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
      let semanas=Math.trunc(edadGestacional / 7);
      let dias=edadGestacional % 7
      return semanas;
    }
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
    //(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
    this.pn_gestanteServicio.couch = true;
    let nroGesta=this.formGestante.value.formGesta;
    let fur=this.datePipe.transform(this.formGestante.value.formFUR,'yyyy/MM/dd');
    let fpp=this.datePipe.transform(this.auxFPP,'yyyy/MM/dd');
    this.nuevaGesta.codEessActual=this.pn_gestanteServicio.getauxCodeessActual();
    this.nuevaGesta.eessActual=this.pn_gestanteServicio.getaux_eessActual();
    this.nuevaGesta.nroGesta=this.formGestante.value.formGesta;
    this.pn_gestanteServicio
      .actualizarNumeroGesta(
        this.dataGestante._id,
        nroGesta,
        fur,
        fpp
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
