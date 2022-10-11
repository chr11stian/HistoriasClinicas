import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {DatePipe} from '@angular/common';
import Swal from'sweetalert2';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-pn-gestante-dialog',
  templateUrl: './pn-gestante-dialog.component.html',
  styleUrls: ['./pn-gestante-dialog.component.css'],
  providers: [MessageService],
})
export class PnGestanteDialogComponent implements OnInit {
  formGestante:FormGroup;
  isUpdate:boolean=false;
  dataGestante:any;
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
  //data personal
  auxNroDocPersonal:string=JSON.parse(localStorage.getItem('usuario')).nroDocumento;
  auxNombresPersonal:string=JSON.parse(localStorage.getItem('usuario')).nombres;
  auxApellidosPersonal:string=JSON.parse(localStorage.getItem('usuario')).apellidos;
  auxCodeessActual:string=JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
  aux_eessActual:string=JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
  sis:any []=[
    {value:'SI'},
    {value:'NO'}
  ]
  aborto:any []=[
    {value:"true"},
    {value:"false"}
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
              private messageService:MessageService) {
              this.inicializarForm();
  }

  ngOnInit(): void {
  this.dataGestanteEditar=JSON.parse(localStorage.getItem('gestanteLocalStorage'));
  console.log('Gestante seleccionado',this.dataGestanteEditar);
  if(this.dataGestanteEditar!==null){
    this.editarDatos();
  }
  }
inicializarForm(){
  this.formGestante=this.fb.group({
    formTipoDoc:new FormControl(''),
    formNroDocGestante:new FormControl(''),
    formTieneSis:new FormControl(''),
    formFechaNacimiento:new FormControl(''),
    formEdad:new FormControl(''),
    formAborto:new FormControl(''),
    formGesta:new FormControl(''),
    formNombresGestante:new FormControl(''),
    formApellidos:new FormControl(''),
    formCod_eess_anterior:new FormControl(''),
    form_eess_anterior:new FormControl(''),
    formCod_eess_actual:new FormControl(''),
    form_eess_actual:new FormControl(''),
    formHCL:new FormControl(''),
    formFechaRegistro:new FormControl(''),
    formFur:new FormControl(''),
    formFpp:new FormControl(''),
    formDireccion:new FormControl(),
    formReferencia:new FormControl(),
    formTelefono:new FormControl(''),
    formMorbilidadPotencial:new FormControl(),
    formObservaciones:new FormControl(''),
  })
}
mostrarPadronNominalGestantes(){
  let cod_ipress="00002384"
  this.pn_gestanteServicio.mostrarPadronGestantes(cod_ipress).subscribe((res:any)=>{
    this.listaGestantes=res['rows'];
    console.log('lista de gestantes',this.listaGestantes);
  })
}

closeDialog(){
  this.ref.close();
  this.gestanteRegistrado=false;
  console.log('gestanteRegistrado',this.gestanteRegistrado);
  this.mostrarPadronNominalGestantes();
}

saveoupdate(){
  if(this.dataGestanteEditar==null){
    this.saveForm();
    this.mostrarPadronNominalGestantes();
  }else{
    this.editarGestante();
    this.mostrarPadronNominalGestantes();
  }
}

saveForm(){
this.pn_gestanteServicio.couch=true;
this.recuperarDatos();
this.pn_gestanteServicio.addGestante(this.dataGestante).subscribe((res:any)=>{
  this.closeDialog();
  Swal.fire({
    icon:'success',
    title:'Se guardo exitosamente',
    showConfirmButton:false,
    timer:1500
  })
  console.log('Data',res);
})
this.mostrarPadronNominalGestantes();
}

editarGestante(){
this.pn_gestanteServicio.couch=true;
this.recuperarDatos();
this.dataGestante;
console.log("data gestante",this.dataGestanteEditar);
console.log('_id',this.dataGestanteEditar.value._id)
console.log('_rev',this.dataGestanteEditar.value._rev);
this.pn_gestanteServicio.updatedGestante(this.dataGestanteEditar.value._id,this.dataGestante,this.dataGestanteEditar.value._rev).subscribe((res:any)=>{
  this.closeDialog();
  console.log('se actualizo correctamente',res);
  Swal.fire({
    icon:'success',
    title:'Se actualizo los datos correctamente',
    showConfirmButton:false,
    timer:1500,
  })
})
this.mostrarPadronNominalGestantes();
}

recuperarDatos(){
this.dataGestante={
  tipoDoc:'padronNominal',
  nombres:this.formGestante.value.formNombresGestante,
  apellidos:this.formGestante.value.formApellidos,
  fechaNacimiento:this.datePipe.transform(this.formGestante.value.formFechaNacimiento,'yyyy/MM/dd'),
  tipoDocIdentidad:this.formGestante.value.formTipoDoc,
  nroDocIdentidad:this.formGestante.value.formNroDocGestante,
  telefono:this.formGestante.value.formTelefono,
  tieneSis:this.formGestante.value.formTieneSis,
  direccion:this.formGestante.value.formDireccion,
  referencia:this.formGestante.value.formReferencia,
  hcl2:this.formGestante.value.formHCL,
  codEessAnterior:this.formGestante.value.formCod_eess_anterior,
  eessAnterior:this.formGestante.value.form_eess_anterior,
  codEessActual:this.formGestante.value.formCod_eess_actual,
  eessActual:this.formGestante.value.form_eess_actual,
  fur:this.datePipe.transform(this.formGestante.value.formFur,'dd-MM-yyyy'),
  fpp:this.datePipe.transform(this.formGestante.value.formFpp,'dd-MM-yyyy'),
  morbilidadPotencial:this.formGestante.value.formMorbilidadPotencial,
  observaciones:this.formGestante.value.formObservaciones,
  dniPersonal:this.auxNroDocPersonal,
  personalEess:`${this.auxNombresPersonal}  ${this.auxApellidosPersonal}`,
  fechaReg:this.datePipe.transform(this.formGestante.value.formFechaRegistro,'dd-MM-yyyy'),
  nroGesta:[this.formGestante.value.formNroGesta],
  aborto:this.formGestante.value.formAborto,
}
}

editarDatos(){
let fullname=(this.dataGestanteEditar.value.nombres).split(' ');
if((this.dataGestanteEditar!=null) || (this.dataGestanteEditar!==undefined)){
  console.log('DATA RECUPERADO',this.dataGestanteEditar);
    this.formGestante.get('formTipoDoc').setValue(this.dataGestanteEditar.value.tipoDocIdentidad);
    this.formGestante.get('formNroDocGestante').setValue(this.dataGestanteEditar.value.dni);
    this.formGestante.get('formTieneSis').setValue(this.dataGestanteEditar.value.tieneSis);
    this.formGestante.get('formFechaNacimiento').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fecha_nacimiento,'yyyy-MM-dd'));
    this.formGestante.get('formEdad').setValue(this.dataGestanteEditar.value.edad);
    this.formGestante.get('formNombresGestante').setValue(this.dataGestanteEditar.value.nombres);
    this.formGestante.get('formApellidos').setValue(this.dataGestanteEditar.value.apellidos);
    this.formGestante.get('formCod_eess_anterior').setValue(this.dataGestanteEditar.value.cod_eessAnterior);
    this.formGestante.get('form_eess_anterior').setValue(this.dataGestanteEditar.value.eess_anterior);
    this.formGestante.get('formCod_eess_actual').setValue(this.dataGestanteEditar.value.cod_eessActual);
    this.formGestante.get('form_eess_actual').setValue(this.dataGestanteEditar.value.eess_actual);
    this.formGestante.get('formHCL').setValue(this.dataGestanteEditar.value.nro_historial_clinica);
    this.formGestante.get('formFechaRegistro').setValue(this.dataGestanteEditar.value.fechaReg);
    this.formGestante.get('formFur').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fur,'yyyy-MM-dd'));
    this.formGestante.get('formFpp').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy-MM-dd'));
    this.formGestante.get('formDireccion').setValue(this.dataGestanteEditar.value.direccion);
    this.formGestante.get('formReferencia').setValue(this.dataGestanteEditar.value.referencia);
    this.formGestante.get('formTelefono').setValue(this.dataGestanteEditar.value.telefono);
    this.formGestante.get('formMorbilidadPotencial').setValue(this.dataGestanteEditar.value.morbilidadPotencial);
    this.formGestante.get('formObservaciones').setValue(this.dataGestanteEditar.value.observaciones);
    this.formGestante.get('formGesta').setValue(this.dataGestanteEditar.value.numero_de_gestacion);
    this.formGestante.get('formAborto').setValue(this.dataGestanteEditar.value.aborto);
}
}

cargarDatosPadronNominal(){
  this.pn_gestanteServicio.couch=true;
  let nroDoc: String = String(this.formGestante.value.formNroDocGestante);
  this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe(
    (data:any)=>{
      console.log('DATA RECUPERADA :',data);
      this.dataGestante=data.rows[0].value;
      if(data['rows'].length>0){
        this.gestanteRegistrado=true;
        console.log('gestanteRegistrado',this.gestanteRegistrado);
        this.messageService.add({
          key: "myMessage1",
          severity: "warn",
          summary: "Data obtenida",
          detail: "Gestante ya registrado en el padron nominal",
        })
      }
    });
      // console.log('dataaaaaa ',this.dataGestante);
      // this.formGestante.get('formTipoDoc').setValue(this.dataGestante.tipoDocIdentidad);
      // this.formGestante.get('formNroDocGestante').setValue(this.dataGestante.dni);
      // this.formGestante.get('formTieneSis').setValue(this.dataGestante.tieneSis);
      // this.formGestante.get('formFechaNacimiento').setValue(this.datePipe.transform(this.dataGestante.fecha_nacimiento,'yyyy-MM-dd'));
      // this.formGestante.get('formEdad').setValue(this.dataGestante.edad);
      // this.formGestante.get('formNombresGestante').setValue(this.dataGestante.nombres);
      // this.formGestante.get('formApellidos').setValue(this.dataGestante.apellidos);
      // this.formGestante.get('formCod_eess_anterior').setValue(this.dataGestante.cod_eessAnterior);
      // this.formGestante.get('form_eess_anterior').setValue(this.dataGestante.eess_anterior);
      // this.formGestante.get('formCod_eess_actual').setValue(this.dataGestante.cod_eessActual);
      // this.formGestante.get('form_eess_actual').setValue(this.dataGestante.eess_actual);
      // this.formGestante.get('formHCL').setValue(this.dataGestante.nro_historial_clinica);
      // this.formGestante.get('formFechaRegistro').setValue(this.dataGestante.fechaReg);
      // this.formGestante.get('formFur').setValue(this.datePipe.transform(this.dataGestante.fur,'yyyy-MM-dd'));
      // this.formGestante.get('formFpp').setValue(this.datePipe.transform(this.dataGestante.fpp,'yyyy-MM-dd'));
      // this.formGestante.get('formDireccion').setValue(this.dataGestante.direccion);
      // this.formGestante.get('formReferencia').setValue(this.dataGestante.referencia);
      // this.formGestante.get('formTelefono').setValue(this.dataGestante.telefono);
      // this.formGestante.get('formMorbilidadPotencial').setValue(this.dataGestante.morbilidadPotencial);
      // this.formGestante.get('formObservaciones').setValue(this.dataGestante.observaciones);
      // this.formGestante.get('formGesta').setValue(this.dataGestante.numero_de_gestacion);
      // this.formGestante.get('formAborto').setValue(this.dataGestante.aborto);
}

calcularFPP(fur:string){
  let myArr=fur.split("/");
  let dia=parseInt(myArr[0])+7;
  let mes=parseInt(myArr[1])-3;
  let anio=parseInt(myArr[2])+1;
  this.auxFPP=`${dia}/${mes}/${anio}`;
 // this.formGestante.get('formFpp').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy-MM-dd'));
  }

selectedTipoDoc(event){
}
  
}

