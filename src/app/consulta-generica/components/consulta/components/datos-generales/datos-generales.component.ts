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
  attributeLocalS = 'documento'
  // attributeLocalSConsulta='idConsultaGeneral'
  idConsulta="";
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
    // this.idConsulta=this.data.idConsulta;
    console.log(this.data);
    console.log(this.data.idConsulta);
    if(this.data.idConsulta==""){
      this.getPacientefromPaciente();
    }
    else{
      this.recuperarDatosGeneralesBD()
    }
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
      codSeguro:new FormControl(''),
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
      nroDoc:this.data.nroDocumento
    }
    this.datosGeneralesService.getPacientePorDoc(data).subscribe((res: any) => {
      console.log(res);
      console.log(res.object);
      this.formDatos_Generales.get('tipoDoc').setValue(res.object.tipoDoc);
      this.formDatos_Generales.get('docIndentidad').setValue(res.object.nroDoc);
      this.formDatos_Generales.get('apePaterno').setValue(res.object.apePaterno);
      this.formDatos_Generales.get('apeMaterno').setValue(res.object.apeMaterno);
      this.formDatos_Generales.get('nombre').setValue(res.object.primerNombre + " " +res.object.otrosNombres);
      this.formDatos_Generales.get('fechaNacimiento').setValue(res.object.nacimiento.fechaNacimiento);
      this.formDatos_Generales.get('hcl').setValue(res.object.nroHcl);
      this.formDatos_Generales.get('edad').setValue(this.data.anio);
      this.formDatos_Generales.get('sexo').setValue(res.object.sexo);
      this.formDatos_Generales.get('cel').setValue(res.object.celular);
      this.formDatos_Generales.get('direccion').setValue(res.object.domicilio.direccion);
      // this.formDatos_Generales.get('codSeguro').setValue(res.object.nombreEESS);
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
      // funcionesBiologicas:this.listaFuncionesBiologicas,
      listaSignosAlarma:this.listaSignosAlarma,
      servicio:"MEDICINA GENERAL",
      tipoConsulta:this.data.tipoConsulta
    }

    this.datosGenerales = req;
  }
  actualizarConsulta() {
    let req = {
      id:this.data.idConsulta,
      // fecha:this.datePipe.transform(this.formDatos_Generales.value.fecha,'yyyy-MM-dd HH:mm:ss'),
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
      // funcionesBiologicas:this.listaFuncionesBiologicas,
      listaSignosAlarma:this.listaSignosAlarma,
      // servicio:"MEDICINA GENERAL",
      // tipoConsulta:this.data.tipoConsulta
    }
    console.log(this.datosGenerales);
    this.datosGeneralesService.updateConsultaDatosGenerales(req).subscribe((r: any) => {
    },error => {
      console.log("ocurrio un error")
    })
    this.recuperarDatosGeneralesBD();
  }
  guardarNuevaConsulta(){
    this.recuperarDatos();
    console.log(this.datosGenerales);
    this.datosGeneralesService.addConsultaDatosGenerales(this.datosGenerales).subscribe((r: any) => {
      let id=r.object.id;
      this.data.idConsulta=r.object.id;
      let data={
        fechaNacimiento:this.data.fechaNacimiento,
        hidden:this.data.hidden,
        idConsulta:id,
        see:this.data.see,
        sexo:this.data.sexo,
        tipoDoc:this.data.tipoDoc,
        nroDocumento:this.data.nroDocumento,
        tipoConsulta:this.data.tipoConsulta
      }
      localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
      this.recuperarDatosGeneralesBD();

    })
  }
  guardarActualizar(){
    console.log("idConsulta",this.data.idConsulta)
    if(this.data.idConsulta==""){
      console.log("no tiene id",this.data.idConsulta)
      this.guardarNuevaConsulta();
    }
    else{
      this.actualizarConsulta();
      console.log("tiene id",this.data.idConsulta)
    }
  }
  traerDataReniec() {
    this.datosGeneralesService.getDatosReniec(this.data.nroDocumento).subscribe((res: any) => {
      // console.log(res);
      if(res.foto==null){
        this.imagePath="../../../assets/images/hcl.png";
      }
      else{
        this.imagePath = res.foto;
      }

    });
  }

  AgregarSignos() {
    let a:any = {
      codSigno:this.listaSignosAlarma.length+1,
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

  recuperarDatosGeneralesBD(){
    this.datosGeneralesService.searchConsultaDatosGenerales(this.data.idConsulta).subscribe((res: any) => {
     console.log(res.object);
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
      // this.listaFuncionesBiologicas=res.object.listaFuncionesBiologicas;
      this.formDatos_Generales.get('docIndentidad').setValue(res.object.nroDoc);
      this.formDatos_Generales.get('tipoDoc').setValue(res.object.tipoDoc);
      this.formDatos_Generales.get('apePaterno').setValue(res.object.datosPaciente.apePaterno);
      this.formDatos_Generales.get('apeMaterno').setValue(res.object.datosPaciente.apeMaterno);
      this.formDatos_Generales.get('nombre').setValue(res.object.datosPaciente.primerNombre + " " +res.object.datosPaciente.otrosNombres);
      this.formDatos_Generales.get('fechaNacimiento').setValue(res.object.datosPaciente.fechaNacimiento);
      this.formDatos_Generales.get('hcl').setValue(res.object.nroHcl);
      this.formDatos_Generales.get('edad').setValue(this.data.anio);
      this.formDatos_Generales.get('sexo').setValue(res.object.datosPaciente.sexo);
      this.formDatos_Generales.get('cel').setValue(res.object.datosPaciente.celular);
      this.formDatos_Generales.get('direccion').setValue(res.object.datosPaciente.domicilio.direccion);
      this.formDatos_Generales.get('codSeguro').setValue(res.object.datosPaciente.codSeguro);
    });
  }
}
