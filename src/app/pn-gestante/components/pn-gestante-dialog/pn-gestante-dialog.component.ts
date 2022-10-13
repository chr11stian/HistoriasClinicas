import { Component, OnInit } from '@angular/core';
import { GestanteModel } from '../../interfaces/GestanteModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {DatePipe} from '@angular/common';
import Swal from'sweetalert2';
import {ConfirmationService,MessageService} from 'primeng/api';

@Component({
  selector: 'app-pn-gestante-dialog',
  templateUrl: './pn-gestante-dialog.component.html',
  styleUrls: ['./pn-gestante-dialog.component.css'],
  providers: [MessageService],
})
export class PnGestanteDialogComponent implements OnInit {
  formGestante:FormGroup;
  show=false;
  gestanteDialog:boolean;
  gestantes:GestanteModel[];
  gestante:GestanteModel;
  selectedGestantes:GestanteModel [];
  isNew:boolean;
  //
  isUpdate:boolean=false;
  dataGestante:GestanteModel;
  dataGestanteEditar:any=null;
  listaGestantes:any []=[];
  datePipe = new DatePipe('en-US');
  nombres:any;
  apellidos:any;
  hcl:any;
  edad:any;
  dni:any;
  telefono:any;
  tiene_sis:any;
  direccion:any;
  referencia:any;
  cod_eess_anterior:any;
  eess_anterior:any;
  cod_eess_actual:any;
  eess_actual:any;
  fur:any;
  fpp:any;
  morbilidad_potencial:any;
  edad_gestacional:any;
  observaciones:any;
  dni_personal:any;
  personal_eess:any;
  fecha_reg:any;
  checked: boolean=false;
  existeGestante:boolean=false;
  gestanteRegistrado:boolean=false;
  auxFPP:any;
  auxFUR:any;
  auxFechaRegistro:Date=new Date();
  auxFechaActual:Date=new Date();
  selectedAborto:boolean;
  //data personal
  auxNroDocPersonal:string=JSON.parse(localStorage.getItem('usuario')).nroDocumento;
  auxNombresPersonal:string=JSON.parse(localStorage.getItem('usuario')).nombres;
  auxApellidosPersonal:string=JSON.parse(localStorage.getItem('usuario')).apellidos;
  auxCodeessActual:string=JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
  aux_eessActual:string=JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
  sis:any []=[
    {value:'SI'},
    {value:'NO'}
  ]
  aborto:any []=[
    {label:'SI',value:true},
    {label:'NO',value:false}
  ]

  estado_gestante:any []=[
    {value:'Activo'},
    {value:'Inactivo'}
  ]
  morbilidad_potencial_a:any []=[
    {value:'Gestante con antecedente de complicación obstetrica'},
    {value:'Gestante adolescente'},
    {value:'Primigista añosa'},
    {value:'Multigesta y/o multipara'},
    {value:'Gestantes con captación tardia'},
    {value:'Gestante con rechazo al servicio de salud'},
    {value:'Gestante traseunte'},
    {value:'Gestante con TBC'},
    {value:'Gestante con VIH/SIDA'},
    {value:'Otra causa'},
  ]

  listaDocumentos:any []=[
    {value:'DNI'},
  ];
  constructor(private fb:FormBuilder,
              private ref:DynamicDialogRef,
              private pn_gestanteServicio:PnGestanteService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService) {
              this.gestanteDialog=false;
              this.gestantes=[];
              this.selectedGestantes=[];
              this.gestante={};
              this.inicializarForm();
              // this.formGestante=this.inicializarForm();
              // this.isNew=false;
              // this.mostrarPadronNominalGestantes();
              
  }

  ngOnInit(): void {
    this.dataGestanteEditar = JSON.parse(localStorage.getItem('gestanteLocalStorage'));
    console.log("GESTANTE SELECCIONADO", this.dataGestanteEditar)

    if (this.dataGestanteEditar!== null) {
        this.editarDatos()
    }
  }
inicializarForm(){
    this.formGestante=this.fb.group({
    tipoDoc:new FormControl(''),
    nombres:new FormControl('',[Validators.required]),
    apellidos:new FormControl('',[Validators.required]),
    fechaNacimiento:new FormControl('',[Validators.required]),
    tipoDocIdentidad:new FormControl('',[Validators.required]),
    nroDocIdentidad:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    tieneSis:new FormControl('',[Validators.required]),
    direccion:new FormControl('',[Validators.required]),
    referencia:new FormControl('',[Validators.required]),
    hcl2:new FormControl('',[Validators.required]),
    codEessAnterior:new FormControl(this.auxCodeessActual,[Validators.required]),
    eessAnterior:new FormControl(this.aux_eessActual,[Validators.required]),
    codEessActual:new FormControl(this.auxCodeessActual,[Validators.required]),
    eessActual:new FormControl(this.aux_eessActual,[Validators.required]),
    fur:new FormControl('',[Validators.required]),
    fpp:new FormControl('',[Validators.required]),
    morbilidadPotencial:new FormControl('',[Validators.required]),
    observaciones:new FormControl('',[Validators.required]),
    dniPersonal:new FormControl(this.auxNroDocPersonal,[Validators.required]),
    personalEess:new FormControl(this.auxNombresPersonal,[Validators.required]),
    fechaReg:new FormControl(this.datePipe.transform(this.auxFechaRegistro,'yyyy-MM-dd')),
    nroGesta:new FormControl([1],[Validators.required]),
    aborto:new FormControl(false,[Validators.required]),
  })
}
mostrarPadronNominalGestantes(){
  this.pn_gestanteServicio.couch=true;
  this.pn_gestanteServicio.mostrarPadronGestantes(this.auxCodeessActual).subscribe((res:any)=>{
    this.listaGestantes=res['rows'];
    console.log('lista de gestantes',this.listaGestantes);
  })
}

closeDialog(){
  this.gestanteDialog=false;
  this.ref.close();
  // this.gestanteRegistrado=false;
  // console.log('gestanteRegistrado',this.gestanteRegistrado);
  this.mostrarPadronNominalGestantes();
}

cargarDatosPadronNominal(){
  this.pn_gestanteServicio.couch=true;
  let nroDoc=this.formGestante.value.formNroDocGestante;
  if(nroDoc.length>=8){
    this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe((data: any) => {
      console.log("DATA RECUPERADA :", data);
      this.dataGestante = data.rows[0].value;
      this.formGestante.get("formNombresGestante").setValue(this.dataGestante.nombres);
      this.formGestante.get("formApellidos").setValue(this.dataGestante.apellidos);
      this.formGestante.get("formCod_eess_anterior").setValue(this.dataGestante.codEessActual);
      this.formGestante.get("form_eess_anterior").setValue(this.dataGestante.eessActual);
      this.formGestante.get("formCod_eess_actual").setValue(this.auxCodeessActual);
      this.formGestante.get("form_eess_actual").setValue(this.aux_eessActual);
     // this.gestanteRegistrado=true;
      console.log('gestanteRegistrado',this.gestanteRegistrado);
      this.messageService.add({
        key:"myMessage1",
        severity:"warn",
        summary:"Data obtenida",
        detail:"Gestante ya registrado en el padron nominal",
      })
    });
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
  this.formGestante.get('fpp').setValue(this.datePipe.transform(auxBirth,'yyyy-MM-dd'));

}

editarDatos() {
  if ((this.dataGestanteEditar !== null) || (this.dataGestanteEditar !== undefined)) {
      console.log("DATA RECUPERADO GESTANTE", this.dataGestanteEditar)
      this.formGestante.get("tipoDocIdentidad").setValue(this.dataGestanteEditar.value.tipoDocIdentidad);
      this.formGestante.get("nroDocIdentidad").setValue(this.dataGestanteEditar.value.nroDocIdentidad);
      this.formGestante.get("tieneSis").setValue(this.dataGestanteEditar.value.tieneSis);
      this.formGestante.get("fechaNacimiento").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fechaNacimiento,'yyyy-MM-dd'));
      this.formGestante.get("aborto").setValue(this.dataGestanteEditar.value.aborto==true?'SI':'NO');
      this.formGestante.get("nroGesta").setValue(this.dataGestanteEditar.value.nroGesta);
      this.formGestante.get("nombres").setValue(this.dataGestanteEditar.value.nombres);
      this.formGestante.get("apellidos").setValue(this.dataGestanteEditar.value.apellidos);
      this.formGestante.get("codEessAnterior").setValue(this.dataGestanteEditar.value.codEessAnterior);
      this.formGestante.get("eessAnterior").setValue(this.dataGestanteEditar.value.eessAnterior);
      this.formGestante.get("codEessActual").setValue(this.dataGestanteEditar.value.codEessActual);
      this.formGestante.get("eessActual").setValue(this.dataGestanteEditar.value.eessActual);
      this.formGestante.get("hcl2").setValue(this.dataGestanteEditar.value.hcl2);
      this.formGestante.get("fechaReg").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fechaReg,'dd-MM-yyyy'));
      this.formGestante.get("fur").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fur,'dd-MM-yyyy'));
      this.formGestante.get("fpp").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'dd-MM-yyyy'));
      this.formGestante.get("direccion").setValue(this.dataGestanteEditar.value.direccion);
      this.formGestante.get("referencia").setValue(this.dataGestanteEditar.value.referencia);
      this.formGestante.get("telefono").setValue(this.dataGestanteEditar.value.telefono);
      this.formGestante.get("morbilidadPotencial").setValue(this.dataGestanteEditar.value.morbilidadPotencial);
      this.formGestante.get("observaciones").setValue(this.dataGestanteEditar.value.observaciones);
  }
  return
}

cargarDatosPadron() {
  let nroDoc= this.formGestante.value.nroDocIdentidad;
  this.pn_gestanteServicio.couch=true;
  if (nroDoc.length >= 8){
    this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe((data: any) => {
      console.log("DATA RECUPERADA :", data);
      this.dataGestante = data.rows[0].value;
      console.log("dataaaaaa ", this.dataGestante);
      this.formGestante.get("tipoDocIdentidad").setValue(this.dataGestante.tipoDocIdentidad);
      this.formGestante.get("nroDocIdentidad").setValue(this.dataGestante.nroDocIdentidad);
      this.formGestante.get("tieneSis").setValue(this.dataGestante.tieneSis);
      this.formGestante.get("fechaNacimiento").setValue(this.datePipe.transform(this.dataGestante.fechaNacimiento,'yyyy/MM/dd'));
      this.formGestante.get("aborto").setValue(this.dataGestante.aborto==true?'SI':'NO');
      this.formGestante.get("nroGesta").setValue(this.dataGestante.nroGesta);
      this.formGestante.get("nombres").setValue(this.dataGestante.nombres);
      this.formGestante.get("apellidos").setValue(this.dataGestante.apellidos);
      this.formGestante.get("codEessAnterior").setValue(this.dataGestante.codEessAnterior);
      this.formGestante.get("eessAnterior").setValue(this.dataGestante.eessAnterior);
      this.formGestante.get("codEessActual").setValue(this.dataGestante.codEessActual);
      this.formGestante.get("eessActual").setValue(this.dataGestante.eessActual);
      this.formGestante.get("hcl2").setValue(this.dataGestante.hcl2);
      this.formGestante.get("fechaReg").setValue(this.datePipe.transform(this.dataGestante.fechaReg,'dd-MM-yyyy'));
      this.formGestante.get("fur").setValue(this.datePipe.transform(this.dataGestante.fur,'dd/MM/yyyy'));
      this.formGestante.get("fpp").setValue(this.datePipe.transform(this.dataGestante.fpp,'dd/MM/yyyy'));
      this.formGestante.get("direccion").setValue(this.dataGestante.direccion);
      this.formGestante.get("referencia").setValue(this.dataGestante.referencia);
      this.formGestante.get("telefono").setValue(this.dataGestante.telefono);
      this.formGestante.get("morbilidadPotencial").setValue(this.dataGestante.morbilidadPotencial);
      this.formGestante.get("observaciones").setValue(this.dataGestante.observaciones);
    })
  }
}

updateOEdith() {
  if (this.dataGestanteEditar == null) {
      this.saveForm();
  } else {
      this.EditarGestante();
  }
}

saveForm() {
  if(this.formGestante.valid==true){
    this.dataGestante=this.formGestante.value;
    this.pn_gestanteServicio.couch=true;
    this.dataGestante.tipoDoc = 'padronNominal';
    this.pn_gestanteServicio.addGestante(this.dataGestante).subscribe((res: any) => {
        this.closeDialog();
        Swal.fire({
            icon: 'success',
            title: 'Se registro Exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
        console.log("RESPUESTA", res)
    });
  }else{
    this.messageService.add({
      key: "myMessage1",
      severity: "error",
      summary: "Error",
      detail: "Tiene que completar el formulario",
    });
  }
  
}

EditarGestante() {
    this.dataGestante=this.formGestante.value;
    let id=this.dataGestanteEditar.id;
    this.pn_gestanteServicio.couch=true;
    this.pn_gestanteServicio.actualizarInformacionGestante(id,this.dataGestante).subscribe((res: any) => {
      this.closeDialog();
      if(res['ok']==true){
        Swal.fire({
          icon: "success",
          title: "Se actualizo los campos correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "No se pudo actualizar los campos correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
}

}

