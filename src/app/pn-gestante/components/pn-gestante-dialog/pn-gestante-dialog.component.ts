import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from'sweetalert2';

@Component({
  selector: 'app-pn-gestante-dialog',
  templateUrl: './pn-gestante-dialog.component.html',
  styleUrls: ['./pn-gestante-dialog.component.css']
})
export class PnGestanteDialogComponent implements OnInit {
  formGestante:FormGroup;
  dataGestante:any;
  dataGestanteEditar:any=null;
  listaGestantes:any []=[];
  // datePipe = new DatePipe('en-US');
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
  sis:any []=[
    {value:'SI'},
    {value:'NO'}
  ]

  estado_gestante:any []=[
    {value:'Activo'},
    {value:'Inactivo'}
  ]
  constructor(private fb:FormBuilder,
              private ref:DynamicDialogRef,
              private pn_gestanteServicio:PnGestanteService) {
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
    formNroDocGestante:new FormControl(''),
    formEstado:new FormControl(''),
    formNombresGestante:new FormControl(''),
    formApellidoP:new FormControl(''),
    formApellidoM:new FormControl(''),
    formEdad:new FormControl(''),
    formHCL:new FormControl(''),
    fechaFUR:new FormControl(''),
    fechaFPP:new FormControl(''),
    formTieneSis:new FormControl(''),
    formTelefono:new FormControl(''),
    formDireccion:new FormControl(''),
    formReferencia:new FormControl(''),
    formObservaciones:new FormControl(''),
    formNroDocPersonal:new FormControl(''),
    formNombresPersonal:new FormControl(''),
    formApellidosPersonalP:new FormControl(''),
    formApellidosPersonalM:new FormControl(''),

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
this.dataGestante._id=this.dataGestanteEditar._id;
console.log("data gestante",this.dataGestanteEditar);
console.log('_id',this.dataGestante._id)
console.log('_rev',this.dataGestante._rev);
this.pn_gestanteServicio.updatedGestante(this.dataGestanteEditar._id,this.dataGestante,this.dataGestanteEditar._rev).subscribe((res:any)=>{
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
  tipoDoc:'padron_nominal_gestante',
  estado:this.formGestante.value.formNroDocGestante,
  nombres_apellidos:`${this.formGestante.value.formNombresGestante}-${this.formGestante.value.formApellidoP}-${this.formGestante.value.formApellidoM}`,
  hcl:this.formGestante.value.formHCL,
  edad:this.formGestante.value.formEdad,
  dni:this.formGestante.value. formNroDocGestante,
  telefono:this.formGestante.value.formTelefono,
  tiene_sis:this.formGestante.value.formTieneSis,
  direccion:this.formGestante.value.formDireccion,
  referencia:this.formGestante.value.formReferencia,
  cod_eess_anterior:this.formGestante.value.formCod_eess_anterior,
  eess_anterior:this.formGestante.value.form_eess_anterior,
  cod_eess_actual:this.formGestante.value.formCod_eess_actual,
  eess_actual:this.formGestante.value.form_eess_actual,
  fur:this.formGestante.value.fechaFUR,
  fpp:this.formGestante.value.fechaFPP,
  morbilidad_potencial:this.formGestante.value.formMorbilidadPotencial,
  observaciones:this.formGestante.value.formObservaciones,
  dni_responsable:this.formGestante.value.formNroDocPersonal,
  nombres_responsable:this.formGestante.value.formNombresPersonal,
  appellidosp_responsable:this.formGestante.value.formApellidosPersonalP,
  appellidosm_responsable:this.formGestante.value.formApellidosPersonalm,
}
}

editarDatos(){
let fullname=(this.dataGestanteEditar.value.nombres).split(' ');
let nombres=fullname[0];
let apellidosP=fullname[1];
let apellidosM=fullname[2];
console.log(nombres,apellidosP,apellidosM);
if((this.dataGestanteEditar!=null) || (this.dataGestanteEditar!==undefined)){
  console.log('DATA RECUPERADO',this.dataGestanteEditar);
    this.formGestante.get('formNroDocGestante').setValue(this.dataGestanteEditar.value.dni);
    this.formGestante.get('estado').setValue("Activo");
    this.formGestante.get('nombres').setValue(nombres);
    this.formGestante.get('apellidos_paterno').setValue(apellidosP);
    this.formGestante.get('apellidos_materno').setValue(apellidosM);
    this.formGestante.get('edad').setValue(this.dataGestanteEditar.value.edad);
    this.formGestante.get('hcl').setValue(this.dataGestanteEditar.hcl);
    // this.formGestante.get('fur').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fur,'yyyy-MM-dd'));
    // this.formGestante.get('fpp').setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy-MM-dd'));
    this.formGestante.get('sis').setValue(this.dataGestanteEditar.value.sis);
    this.formGestante.get('telefono').setValue(this.dataGestanteEditar.value.telefono);
    this.formGestante.get('direccion').setValue(this.dataGestanteEditar.value.direccion);
    this.formGestante.get('referencia').setValue(this.dataGestanteEditar.value.referencia);
    this.formGestante.get('observaciones').setValue(this.dataGestanteEditar.value.observaciones);
    //this.formGestante.get('dni_responsable').setValue(this.dataGestanteEditar.dni_responsable);
   // this.formGestante.get('nombres_responsable').setValue(this.dataGestanteEditar.nombres_responsable);
   // this.formGestante.get('appellidosp_responsable').setValue(this.dataGestanteEditar.appellidosp_responsable);
   // this.formGestante.get('appellidosm_responsable').setValue(this.dataGestanteEditar.appellidosm_responsable);
}
}

}
