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
  gestante:GestanteModel ;;
  selectedGestantes:GestanteModel [];
  isNew:boolean;
  estadoGuardar:boolean=false;
  //
  isUpdate:boolean=false;
  dataGestante:GestanteModel;
  dataGestanteEditar:any=null;
  listaGestantes:any []=[];
  datePipe = new DatePipe('en-US');
  fecha_reg:any;
  checked: boolean=false;
  existeGestante:boolean=false;
  gestanteRegistrado:boolean=false;
  auxFPP:any;
  auxFUR:any;
  auxFechaRegistro:Date=new Date();
  auxFechaActual:Date=new Date();
  selectedAborto:boolean;
  auxGestanteCambiar:any;
  listaGestantesPuerpera: any[] = [];
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
              this.inicializarForm();
              this.mostrarPadronNominalGestantes();
              
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
    tipoDoc:new FormControl('padronNominal'),
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
    codEessAnterior:new FormControl(this.pn_gestanteServicio.getauxCodeessActual(),[Validators.required]),
    eessAnterior:new FormControl(this.pn_gestanteServicio.getaux_eessActual(),[Validators.required]),
    codEessActual:new FormControl(this.pn_gestanteServicio.getauxCodeessActual(),[Validators.required]),
    eessActual:new FormControl(this.pn_gestanteServicio.getaux_eessActual(),[Validators.required]),
    fur:new FormControl('',[Validators.required]),
    fpp:new FormControl('',[Validators.required]),
    morbilidadPotencial:new FormControl('',[Validators.required]),
    observaciones:new FormControl('',[Validators.required]),
    dniPersonal:new FormControl(this.pn_gestanteServicio.getauxNroDocPersonal(),[Validators.required]),
    personalEess:new FormControl(this.pn_gestanteServicio.getauxNombresPersonal(),[Validators.required]),
    fechaReg:new FormControl(this.datePipe.transform(this.auxFechaRegistro,'yyyy-MM-dd')),
    nroGesta:new FormControl(1,[Validators.required]),
    aborto:new FormControl(false,[Validators.required]),
  })
}


closeDialog(){
  this.gestanteDialog=false;
  this.ref.close();
  this.mostrarPadronNominalGestantes();
}

mostrarPadronNominalGestantes() {
  this.pn_gestanteServicio.couch = true;
  this.pn_gestanteServicio.mostrarPadronGestantes(this.pn_gestanteServicio.getauxCodeessActual()).subscribe(
    (data:any) => {
      this.listaGestantes = data['rows'];
      this.listaGestantesPuerpera = this.listaGestantes.filter((aux) => {
        if (this.semanaGestacional(aux.value.fur) < 42 && aux.value.aborto==false) return aux;
      });
      console.log("la data es :", data);
    },
    (err) => {
      this.listaGestantes = [];
      console.log("Ups algo salio mal", this.listaGestantes);
    }
  );
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
      this.formGestante.get("formCod_eess_actual").setValue(this.pn_gestanteServicio.getauxCodeessActual());
      this.formGestante.get("form_eess_actual").setValue(this.pn_gestanteServicio.getaux_eessActual());
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
      this.formGestante.get("fechaNacimiento").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fechaNacimiento,'yyyy/MM/dd'));
      this.formGestante.get("aborto").setValue(this.dataGestanteEditar.value.aborto==true?'SI':'NO');
      this.formGestante.get("nroGesta").setValue(this.dataGestanteEditar.value.nroGesta);
      this.formGestante.get("nombres").setValue(this.dataGestanteEditar.value.nombres);
      this.formGestante.get("apellidos").setValue(this.dataGestanteEditar.value.apellidos);
      this.formGestante.get("codEessAnterior").setValue(this.dataGestanteEditar.value.codEessAnterior);
      this.formGestante.get("eessAnterior").setValue(this.dataGestanteEditar.value.eessAnterior);
      this.formGestante.get("codEessActual").setValue(this.dataGestanteEditar.value.codEessActual);
      this.formGestante.get("eessActual").setValue(this.dataGestanteEditar.value.eessActual);
      this.formGestante.get("hcl2").setValue(this.dataGestanteEditar.value.hcl2);
      this.formGestante.get("fechaReg").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fechaReg,'yyyy/MM/dd'));
      this.formGestante.get("fur").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fur,'yyyy/MM/dd'));
      this.formGestante.get("fpp").setValue(this.datePipe.transform(this.dataGestanteEditar.value.fpp,'yyyy/MM/dd'));
      this.formGestante.get("direccion").setValue(this.dataGestanteEditar.value.direccion);
      this.formGestante.get("referencia").setValue(this.dataGestanteEditar.value.referencia);
      this.formGestante.get("telefono").setValue(this.dataGestanteEditar.value.telefono);
      this.formGestante.get("morbilidadPotencial").setValue(this.dataGestanteEditar.value.morbilidadPotencial);
      this.formGestante.get("observaciones").setValue(this.dataGestanteEditar.value.observaciones);
  }
  return
}

cargarDatosPadron() {
  let nroDoc:String=String(this.formGestante.value.nroDocIdentidad);
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
      this.formGestante.get("fechaReg").setValue(this.datePipe.transform(this.dataGestante.fechaReg,'dd/MM/yyyy'));
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

recuperarDatos(){
  this.gestante={
    nombres:this.formGestante.value.nombres,
    apellidos:this.formGestante.value.apellidos,
    fechaNacimiento:this.datePipe.transform(this.formGestante.value.fechaNacimiento,"yyyy/MM/dd"),
    tipoDocIdentidad:this.formGestante.value.tipoDocIdentidad,
    nroDocIdentidad:this.formGestante.value.nroDocIdentidad,
    telefono:this.formGestante.value.telefono,
    tieneSis:this.formGestante.value.tieneSis,
    direccion:this.formGestante.value.direccion,
    referencia:this.formGestante.value.referencia,
    hcl2:this.formGestante.value.hcl2,
    codEessAnterior:this.formGestante.value.codEessAnterior,
    eessAnterior:this.formGestante.value.eessAnterior,
    codEessActual:this.formGestante.value.codEessActual,
    eessActual:this.formGestante.value.eessActual,
    fur:this.datePipe.transform(this.formGestante.value.fur,"dd/MM/yyyy"),
    fpp:this.datePipe.transform(this.formGestante.value.fpp,"dd/MM/yyyy"),
    morbilidadPotencial:this.formGestante.value.morbilidadPotencial,
    observaciones:this.formGestante.value.observaciones,
    dniPersonal:this.formGestante.value.dniPersonal,
    personalEess:this.pn_gestanteServicio.getauxNombresPersonal(),
    fechaReg:this.datePipe.transform(this.formGestante.value.fechaReg,"dd/MM/yyyy"),
    nroGesta:[
        {nroGesta:this.formGestante.value.nroGesta,
        fur:this.datePipe.transform(this.formGestante.value.fur,"dd/MM/yyyy"),
        fpp:this.datePipe.transform(this.formGestante.value.fpp,"dd/MM/yyyy"),
        codEessActual:this.pn_gestanteServicio.getauxCodeessActual(),
        eessActual:this.pn_gestanteServicio.getaux_eessActual(),
        }],
    aborto:this.formGestante.value.aborto,  
  }
}

recuperarDatosEditar(){
  this.gestante={
    nombres:this.formGestante.value.nombres,
    apellidos:this.formGestante.value.apellidos,
    fechaNacimiento:this.datePipe.transform(this.formGestante.value.fechaNacimiento,"yyyy/MM/dd"),
    tipoDocIdentidad:this.formGestante.value.tipoDocIdentidad,
    nroDocIdentidad:this.formGestante.value.nroDocIdentidad,
    telefono:this.formGestante.value.telefono,
    tieneSis:this.formGestante.value.tieneSis,
    direccion:this.formGestante.value.direccion,
    referencia:this.formGestante.value.referencia,
    hcl2:this.formGestante.value.hcl2,
    codEessAnterior:this.formGestante.value.codEessAnterior,
    eessAnterior:this.formGestante.value.eessAnterior,
    codEessActual:this.formGestante.value.codEessActual,
    eessActual:this.formGestante.value.eessActual,
    fur:this.datePipe.transform(this.formGestante.value.fur,"dd/MM/yyyy"),
    fpp:this.datePipe.transform(this.formGestante.value.fpp,"dd/MM/yyyy"),
    morbilidadPotencial:this.formGestante.value.morbilidadPotencial,
    observaciones:this.formGestante.value.observaciones,
    dniPersonal:this.formGestante.value.dniPersonal,
    personalEess:this.pn_gestanteServicio.getauxNombresPersonal(),
    fechaReg:this.datePipe.transform(this.formGestante.value.fechaReg,"dd/MM/yyyyy"),
    aborto:this.formGestante.value.aborto,  
  }
}

saveForm() {
  if(this.formGestante.valid==true){
    this.recuperarDatos();
    // this.dataGestante=this.formGestante.value;
    this.pn_gestanteServicio.couch=true;
    this.pn_gestanteServicio.addGestante(this.gestante).subscribe((res: any) => {
        this.closeDialog();
        console.log(res);
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
    // this.auxGestanteCambiar=this.formGestante.value;
    // this.dataGestante.aborto=this.auxGestanteCambiar['aborto'];
    // console.log("editar gestante",this.dataGestante)
    // console.log(this.dataGestante.aborto);
    // console.log(this.dataGestante.apellidos);
    this.recuperarDatosEditar();
    this.estadoGuardar=false;
    let id=this.dataGestanteEditar.id;
    console.log('el id es',id);
    this.pn_gestanteServicio.couch=true;
    console.log(this.gestante);
    this.pn_gestanteServicio.actualizarInformacionGestante(id,this.gestante).subscribe((res: any) => {
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
}

