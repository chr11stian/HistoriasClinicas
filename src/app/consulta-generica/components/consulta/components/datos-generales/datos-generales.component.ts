import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {image} from "../../../../../../assets/images/image.const";
import {DatePipe} from "@angular/common";
import {dato} from "../../../../../cred/citas/models/data";
import {DatosGeneralesService} from "../../../../services/datos-generales/datos-generales.service";

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  formDatos_Generales:FormGroup;
  form_Acompaniante:FormGroup;
  imagePath: string;
  attributeLocalS = 'consultaGeneral'
  data:any;
  datosGenerales:any;
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
      this.formDatos_Generales.get('hcl').setValue(res.object.hcl);
      this.formDatos_Generales.get('edad').setValue(this.data.anio + " años " + this.data.mes + " meses " + this.data.dia + " dias");
      this.formDatos_Generales.get('sexo').setValue(res.object.sexo);
      this.formDatos_Generales.get('cel').setValue(res.object.celular);
      this.formDatos_Generales.get('direccion').setValue(res.object.domicilio.direccion);
      this.formDatos_Generales.get('estabOrigen').setValue(res.object.nombreEESS);
    });
  }
  recuperarDatos(){
    let req = {
      fecha: this.formDatos_Generales.value.fecha,
      anioEdad:this.data.anio,
      fum:this.formDatos_Generales.value.fum,
      nroHcl:this.formDatos_Generales.value.hcl,
      tipoDoc:this.formDatos_Generales.value.tipoDoc,
      nroDoc:this.formDatos_Generales.value.nroDoc,
      direccion:this.formDatos_Generales.value.direccion,
      acompañante:{
        tipoDoc:this.form_Acompaniante.value.tipoDocA,
        nroDoc:this.form_Acompaniante.value.nroDocA,
        nombre:this.form_Acompaniante.value.nombreA,
        apellidos:this.form_Acompaniante.value.apellidosA,
        parentesco:this.form_Acompaniante.value.parentesco,
        edad:this.form_Acompaniante.value.edad,
        direccion:this.form_Acompaniante.value.direccion,
        telefono:this.form_Acompaniante.value.telefono
      },
      servicio:"MEDICINA GENERAL",
      tipoConsulta:"CONSULTA EXTERNA"
    }
    this.datosGenerales = req;
  }
  guardarDatosGenerales() {
    this.datosGeneralesService.addConsultaDatosGenerales(this.datosGenerales).subscribe();
  }
  traerDataReniec() {
    this.datosGeneralesService.getDatosReniec(this.data.nroDoc).subscribe((res: any) => {
      // console.log(res);
      this.imagePath = res.foto;
    });
  }
}
