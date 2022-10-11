import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {DatePipe} from '@angular/common';
import Swal from'sweetalert2';

@Component({
  selector: 'app-pn-gestante-dia-cambio',
  templateUrl: './pn-gestante-dia-cambio.component.html',
  styleUrls: ['./pn-gestante-dia-cambio.component.css']
})
export class PnGestanteDiaCambioComponent implements OnInit {

  formGestante:FormGroup;
  isUpdate:boolean=false;
  dataGestante:any;
  dataGestanteCambiar:any=null;
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
  dataGestanteCambio:any;
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
              private pn_gestanteServicio:PnGestanteService) {
              this.inicializarForm();
  }

  ngOnInit(): void {
  this.dataGestanteCambiar=JSON.parse(localStorage.getItem('gestanteLocalStorage'));
  console.log('Gestante seleccionado',this.dataGestanteCambiar);
  if(this.dataGestanteCambiar!==null){
    this.editarDatos();
  }
  }
inicializarForm(){
  this.formGestante=this.fb.group({
    formTipoDoc:new FormControl(''),
    formNroDocGestante:new FormControl(''),
    // formTieneSis:new FormControl(''),
    // formFechaNacimiento:new FormControl(''),
    // formEdad:new FormControl(''),
    // formAborto:new FormControl(''),
    // formGesta:new FormControl(''),
    formNombresGestante:new FormControl(''),
    formApellidos:new FormControl(''),
    formCod_eess_anterior:new FormControl(''),
    form_eess_anterior:new FormControl(''),
    formCod_eess_actual:new FormControl(''),
    form_eess_actual:new FormControl(''),
    // formHCL:new FormControl(''),
    // formFechaRegistro:new FormControl(''),
    // formFur:new FormControl(''),
    // formFpp:new FormControl(''),
    // formDireccion:new FormControl(),
    // formReferencia:new FormControl(),
    // formTelefono:new FormControl(''),
    // formMorbilidadPotencial:new FormControl(),
    // formObservaciones:new FormControl(''),
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
  this.mostrarPadronNominalGestantes();
}

// saveoupdate(){
//   if(this.dataGestanteEditar==null){
//     this.saveForm();
//     this.mostrarPadronNominalGestantes();
//   }else{
//     this.editarGestante();
//     this.mostrarPadronNominalGestantes();
//   }
// }

saveForm(){
this.pn_gestanteServicio.couch=true;
this.recuperarDatos();
console.log('dataGestanteCambiar',this.dataGestanteCambiar);
console.log('dataGestante',this.dataGestante);
// console.log("data gestante",this.dataGestanteEditar);
console.log('_id',this.dataGestante.value._id)
console.log('_rev',this.dataGestante.value._rev);
this.pn_gestanteServicio.updatedGestante(this.dataGestante.value._id,this.dataGestanteCambiar,this.dataGestante.value._rev).subscribe((res:any)=>{
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
// this.pn_gestanteServicio.updatedGestante(this.dataGestante).subscribe((res:any)=>{
//   this.closeDialog();
//   Swal.fire({
//     icon:'success',
//     title:'Se guardo exitosamente',
//     showConfirmButton:false,
//     timer:1500
//   })
//   console.log('Data',res);
// })
//this.mostrarPadronNominalGestantes();
}


recuperarDatos(){
this.dataGestanteCambiar={
  tipoDoc:'padronNominal',
  nombres:this.dataGestante.nombres,
  apellidos:this.dataGestante.apellidos,
  fechaNacimiento:this.dataGestante.fechaNacimiento,
  tipoDocIdentidad:this.dataGestante.tipoDocIdentidad,
  nroDocIdentidad:this.dataGestante.nroDocIdentidad,
  telefono:this.dataGestante.telefono,
  tieneSis:this.dataGestante.tieneSis,
  direccion:this.dataGestante.direccion,
  referencia:this.dataGestante.referencia,
  hcl2:this.dataGestante.hcl2,
  codEessAnterior:this.dataGestante.codEessActual,
  eessAnterior:this.dataGestante.eessActual,
  codEessActual:this.auxCodeessActual,
  eessActual:this.eess_actual,
  fur:this.dataGestante.fur,
  fpp:this.dataGestante.fpp,
  morbilidadPotencial:this.dataGestante.morbilidadPotencial,
  observaciones:this.dataGestante.observaciones,
  dniPersonal:this.auxNroDocPersonal,
  personalEess:`${this.auxNombresPersonal}  ${this.auxApellidosPersonal}`,
  fechaReg:this.datePipe.transform(this.formGestante.value.formFechaRegistro,'dd-MM-yyyy'),
  nroGesta:this.dataGestante.nroGesta,
  aborto:this.dataGestante.aborto,
}
}

editarDatos(){
let fullname=(this.dataGestanteCambiar.value.nombres).split(' ');
if((this.dataGestanteCambiar!=null) || (this.dataGestanteCambiar!==undefined)){
  console.log('DATA RECUPERADO',this.dataGestanteCambiar);
    this.formGestante.get('formTipoDoc').setValue(this.dataGestanteCambiar.value.tipoDocIdentidad);
    this.formGestante.get('formNroDocGestante').setValue(this.dataGestanteCambiar.value.dni);
    // this.formGestante.get('formTieneSis').setValue(this.dataGestanteEditar.value.tieneSis);
    // this.formGestante.get('formFechaNacimiento').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fecha_nacimiento,'yyyy-MM-dd'));
    // this.formGestante.get('formEdad').setValue(this.dataGestanteEditar.value.edad);
    this.formGestante.get('formNombresGestante').setValue(this.dataGestanteCambiar.value.nombres);
    this.formGestante.get('formApellidos').setValue(this.dataGestanteCambiar.value.apellidos);
    this.formGestante.get('formCod_eess_anterior').setValue(this.dataGestanteCambiar.value.cod_eessActual);
    this.formGestante.get('form_eess_anterior').setValue(this.dataGestanteCambiar.value.eess_actual);
    this.formGestante.get('formCod_eess_actual').setValue(this.auxCodeessActual);
    this.formGestante.get('form_eess_actual').setValue(this.aux_eessActual);
    // this.formGestante.get('formHCL').setValue(this.dataGestanteEditar.value.nro_historial_clinica);
    // this.formGestante.get('formFechaRegistro').setValue(this.dataGestanteEditar.value.fechaReg);
    // this.formGestante.get('formFur').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fur,'yyyy-MM-dd'));
    // this.formGestante.get('formFpp').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy-MM-dd'));
    // this.formGestante.get('formDireccion').setValue(this.dataGestanteEditar.value.direccion);
    // this.formGestante.get('formReferencia').setValue(this.dataGestanteEditar.value.referencia);
    // this.formGestante.get('formTelefono').setValue(this.dataGestanteEditar.value.telefono);
    // this.formGestante.get('formMorbilidadPotencial').setValue(this.dataGestanteEditar.value.morbilidadPotencial);
    // this.formGestante.get('formObservaciones').setValue(this.dataGestanteEditar.value.observaciones);
    // this.formGestante.get('formGesta').setValue(this.dataGestanteEditar.value.numero_de_gestacion);
    // this.formGestante.get('formAborto').setValue(this.dataGestanteEditar.value.aborto);
}
}

cargarDatosPadronNominal(){
  this.pn_gestanteServicio.couch=true;
  let nroDoc: String = String(this.formGestante.value.formNroDocGestante);
  this.pn_gestanteServicio.getGestanteDni(nroDoc).subscribe(
    (data:any)=>{
      console.log('DATA RECUPERADA :',data);
      this.dataGestante=data.rows[0].value;
      console.log('dataaaaaa ',this.dataGestante);
      this.formGestante.get('formNombresGestante').setValue(this.dataGestante.nombres);
      this.formGestante.get('formApellidos').setValue(this.dataGestante.apellidos);
      this.formGestante.get('formCod_eess_anterior').setValue(this.dataGestante.cod_eessActual);
      this.formGestante.get('form_eess_anterior').setValue(this.dataGestante.eess_actual);
      this.formGestante.get('formCod_eess_actual').setValue(this.auxCodeessActual);
      this.formGestante.get('form_eess_actual').setValue(this.aux_eessActual);
    }
  );
}

calcularFPP(fur:string):string{
let myArr=fur.split("/")
let dia=parseInt(myArr[0])+7;
let mes=parseInt(myArr[1])-3
let anio=parseInt(myArr[2])+1;
return `${dia}/${mes}/${anio}`;
}
Cambio(){}
}
