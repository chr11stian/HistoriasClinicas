import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {dato} from "../../../../../cred/citas/models/data";
import {DatosGeneralesService} from "../../../../services/datos-generales/datos-generales.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  formDatos_Generales:FormGroup;
  form_Acompaniante:FormGroup;
  form_Funciones:FormGroup;
  form_SignosAlarma:FormGroup;
  imagePath: string;
  attributeLocalS = 'consultaGeneral'
  attributeLocalSConsulta='idConsultaGeneral'
  idConsulta=null;
  data:any;
  datosGenerales:any;
  listaSignosAlarma:any[]=[];
  listaFuncionesBiologicas:any[]=[];
  datePipe = new DatePipe('en-US');
  constructor(private formBuilder: FormBuilder,
              private datosGeneralesService:DatosGeneralesService){ }
  ngOnInit(): void {
    this.builForm();
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    console.log(this.data);
    this.getPacientefromPaciente();
  }
  builForm(){
    this.formDatos_Generales = this.formBuilder.group({
      fecha:new FormControl(''),
      tipoDoc:new FormControl(''),
      docIndentidad:new FormControl(''),
      apePaterno:new FormControl(''),
      apeMaterno:new FormControl(''),
      nombre:new FormControl(''),
      fechaNacimiento:new FormControl(''),
      hcl:new FormControl(''),
      edad:new FormControl(''),
      // ocupacion:new FormControl(''),
      estabOrigen:new FormControl(''),
      fum:new FormControl(''),
      cel:new FormControl(''),
      direccion:new FormControl(''),
      sexo:new FormControl(''),
    }),
    this.form_Acompaniante = this.formBuilder.group({
      tipoDocA:new FormControl(''),
      nroDocA:new FormControl(''),
      direccion:new FormControl(''),
      telefono:new FormControl(''),
      nombreA:new FormControl(''),
      apellidosA:new FormControl(''),
      parentesco:new FormControl(''),
      edad:new FormControl(''),
    }),
    this.form_SignosAlarma = this.formBuilder.group({
      tipoEdad:new FormControl(''),
      nombreSigno:new FormControl(''),
      valorSigno:new FormControl(''),
    }),
    this.form_Funciones = this.formBuilder.group({
      funcion:new FormControl(''),
      valor:new FormControl(''),
      detalle:new FormControl(''),
    })

  }
  getPacientefromPaciente(){
    this.traerDataReniec();
    let data={
      tipoDoc:this.data.tipoDoc,
      nroDoc:this.data.nroDoc
    }
    this.datosGeneralesService.getPacientePorDoc(data).subscribe((res: any) => {
      console.log(res);
      console.log(res.object);
        this.formDatos_Generales.get('tipoDoc').setValue(res.object.tipoDoc);
        this.formDatos_Generales.get('docIndentidad').setValue(res.object.nroDoc);
        // this.formDatos_Generales.patchValue({ tipoDoc: res.object.tipoDoc});
      // this.formDatos_Generales.patchValue({ docIndentidad: res.object.nroDoc});
      this.formDatos_Generales.get('apePaterno').setValue(res.object.apePaterno);
      this.formDatos_Generales.get('apeMaterno').setValue(res.object.apeMaterno);
      this.formDatos_Generales.get('nombre').setValue(res.object.primerNombre + " " +res.object.otrosNombres);
      this.formDatos_Generales.get('fechaNacimiento').setValue(res.object.nacimiento.fechaNacimiento);
      this.formDatos_Generales.get('hcl').setValue(res.object.nroHcl);
      this.formDatos_Generales.get('edad').setValue(this.data.anio + " años " + this.data.mes + " meses " + this.data.dia + " dias");
      this.formDatos_Generales.get('sexo').setValue(res.object.sexo);
      this.formDatos_Generales.get('cel').setValue(res.object.celular);
      this.formDatos_Generales.get('direccion').setValue(res.object.domicilio.direccion);
      this.formDatos_Generales.get('estabOrigen').setValue(res.object.nombreEESS);
    });
  }
  recuperarDatos(){
    let req = {
      fecha:this.datePipe.transform(this.formDatos_Generales.value.fecha,'yyyy-MM-dd HH:mm:ss'),
      anioEdad:this.data.anio,
      fum:this.datePipe.transform(this.formDatos_Generales.getRawValue().fum,'yyyy-MM-dd'),
      nroHcl:this.formDatos_Generales.getRawValue().hcl,
      tipoDoc:this.formDatos_Generales.getRawValue().tipoDoc,
      nroDoc:this.formDatos_Generales.getRawValue().docIndentidad,
      direccion:this.formDatos_Generales.getRawValue().direccion,
      acompanante:{
        tipoDoc:this.form_Acompaniante.value.tipoDocA,
        nroDoc:this.form_Acompaniante.value.nroDocA,
        nombre:this.form_Acompaniante.value.nombreA,
        apellidos:this.form_Acompaniante.value.apellidosA,
        lazoParentesco:this.form_Acompaniante.value.parentesco,
        edad:this.form_Acompaniante.value.edad,
        direccion:this.form_Acompaniante.value.direccion,
        telefono:this.form_Acompaniante.value.telefono
      },
      funcionesBiologicas:this.listaFuncionesBiologicas,
      listaSignosAlarma:this.listaSignosAlarma,
      servicio:"MEDICINA GENERAL",
      tipoConsulta:"ADULTO"
    }

    this.datosGenerales = req;
  }
  actualizarConsulta() {
    let req = {
      id:this.idConsulta,
      fecha:this.datePipe.transform(this.formDatos_Generales.value.fecha,'yyyy-MM-dd HH:mm:ss'),
      anioEdad:this.data.anio,
      fum:this.datePipe.transform(this.formDatos_Generales.getRawValue().fum,'yyyy-MM-dd'),
      nroHcl:this.formDatos_Generales.getRawValue().hcl,
      tipoDoc:this.formDatos_Generales.getRawValue().tipoDoc,
      nroDoc:this.formDatos_Generales.getRawValue().docIndentidad,
      direccion:this.formDatos_Generales.getRawValue().direccion,
      acompanante:{
        tipoDoc:this.form_Acompaniante.value.tipoDocA,
        nroDoc:this.form_Acompaniante.value.nroDocA,
        nombre:this.form_Acompaniante.value.nombreA,
        apellidos:this.form_Acompaniante.value.apellidosA,
        lazoParentesco:this.form_Acompaniante.value.parentesco,
        edad:this.form_Acompaniante.value.edad,
        direccion:this.form_Acompaniante.value.direccion,
        telefono:this.form_Acompaniante.value.telefono
      },
      funcionesBiologicas:this.listaFuncionesBiologicas,
      listaSignosAlarma:this.listaSignosAlarma,
      servicio:"MEDICINA GENERAL",
      tipoConsulta:"ADULTO"
    }
    console.log(this.datosGenerales);
    this.datosGeneralesService.updateConsultaDatosGenerales(req).subscribe((r: any) => {
    },error => {
      console.log("ocurrio un error")
    })
  }
  guardarNuevaConsulta(){
    this.recuperarDatos();
    console.log(this.datosGenerales);
    this.datosGeneralesService.addConsultaDatosGenerales(this.datosGenerales).subscribe((r: any) => {
      this.idConsulta=r.object.id;
      let id={id:this.idConsulta,
      estadoEditar:true
      }
      localStorage.setItem(this.attributeLocalSConsulta, JSON.stringify(id));

    })
  }
  guardarActualizar(){
    console.log("idConsulta",this.idConsulta)
    if(this.idConsulta==null){
      console.log("no tiene id",this.idConsulta)
      this.guardarNuevaConsulta();
    }
    else{
      this.actualizarConsulta();
      console.log("tiene id",this.idConsulta)
    }
  }
  traerDataReniec() {
    this.datosGeneralesService.getDatosReniec(this.data.nroDoc).subscribe((res: any) => {
      // console.log(res);
      this.imagePath = res.foto;
    });
  }

  AgregarSignos() {
    let a:any = {
      tipoEdad: this.form_SignosAlarma.value.tipoEdad,
      nombreSigno: this.form_SignosAlarma.value.nombreSigno.toUpperCase(),
      valorSigno: true
    }
    console.log('a', a)
    this.listaSignosAlarma.push(a)
    this.form_SignosAlarma.get('nombreSigno').setValue('')
  }

  eliminarFuncion(rowIndex: any) {
    this.listaFuncionesBiologicas.splice(rowIndex, 1)
  }

  AgregarFuncion() {
    let a:any = {
      funcion: this.form_Funciones.value.funcion,
      valor: this.form_Funciones.value.valor.toUpperCase(),
      detalle: this.form_Funciones.value.detalle.toUpperCase()
    }
    console.log('a', a)
    this.listaFuncionesBiologicas.push(a)
    this.form_Funciones.get('funcion').setValue('')
  }

  eliminarSigno(rowIndex: any) {
    this.listaSignosAlarma.splice(rowIndex, 1)
  }

  recuperarDatosGenerales(){
    this.datosGeneralesService.searchConsultaDatosGenerales(this.idConsulta).subscribe((res: any) => {
      this.form_Acompaniante.get('tipoDocA').setValue(res.object.acompanante.tipoDoc);
      this.form_Acompaniante.get('nroDocA').setValue(res.object.acompanante.nroDoc);
      this.form_Acompaniante.get('nombreA').setValue(res.object.acompanante.nombre);
      this.form_Acompaniante.get('apellidosA').setValue(res.object.acompanante.apellidos);
      this.form_Acompaniante.get('parentesco').setValue(res.object.acompanante.lazoParentesco);
      this.form_Acompaniante.get('edad').setValue(res.object.acompanante.edad);
      this.form_Acompaniante.get('direccion').setValue(res.object.acompanante.direccion);
      this.form_Acompaniante.get('telefono').setValue(res.object.acompanante.telefono);
      this.formDatos_Generales.get('fecha').setValue(res.object.fecha);
      this.listaSignosAlarma=res.object.listaSignosAlarma;
      this.listaFuncionesBiologicas=res.object.listaFuncionesBiologicas;
      // this.formDatos_Generales.get('apePaterno').setValue(res.object.apePaterno);
      // this.formDatos_Generales.get('apeMaterno').setValue(res.object.apeMaterno);
      // this.formDatos_Generales.get('nombre').setValue(res.object.primerNombre + " " +res.object.otrosNombres);
      // this.formDatos_Generales.get('fechaNacimiento').setValue(res.object.nacimiento.fechaNacimiento);
      // this.formDatos_Generales.get('hcl').setValue(res.object.nroHcl);
      // this.formDatos_Generales.get('edad').setValue(this.data.anio + " años " + this.data.mes + " meses " + this.data.dia + " dias");
      // this.formDatos_Generales.get('sexo').setValue(res.object.sexo);
      // this.formDatos_Generales.get('cel').setValue(res.object.celular);
      // this.formDatos_Generales.get('direccion').setValue(res.object.domicilio.direccion);
      // this.formDatos_Generales.get('estabOrigen').setValue(res.object.nombreEESS);
    });
  }
}
