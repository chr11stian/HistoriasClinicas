import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {dato} from "../../../../../cred/citas/models/data";
import {DatosGeneralesService} from "../../../../services/datos-generales/datos-generales.service";
import {DatePipe} from "@angular/common";
import {DocumentoIdentidadService} from "../../../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  datosGeneralesFG:FormGroup;
  aconpanienteFG:FormGroup;
  signoAlarmaFG:FormGroup;
  tipoDocList: any[];
  
  datePipe = new DatePipe('en-US');
  attributeLocalS = 'documento'
  dataFromlocal:any;
  signoAlarmaList:any[]=[];
  idConsulta="";
  isUpdate:boolean=false
  
  imagePath: string;
  hayFoto=false;


  constructor(private formBuilder: FormBuilder,
              private datosGeneralesService:DatosGeneralesService,
              private documentoIdentidadService: DocumentoIdentidadService){
        this.builForm();
        this.dataFromlocal = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.idConsulta=this.dataFromlocal.idConsulta
  }
    ngOnInit(): void {
      this.getTipoDoc();
      if(this.idConsulta==""){
        this.getDataPaciente();
        this.isUpdate=false 
      }
      else{
        this.getDatoGenerales()
        this.isUpdate=true
      }
  }
  builForm(){
    this.datosGeneralesFG = this.formBuilder.group({
      fechaAtencion:new FormControl({value:new Date(),disabled:true},Validators.required),
      tipoDoc:new FormControl({value:'',disabled:true},Validators.required),
      nroDoc:new FormControl({value:'',disabled:true},Validators.required),
      apePaterno:new FormControl({value:'',disabled:true},Validators.required),
      apeMaterno:new FormControl({value:'',disabled:true},Validators.required),
      nombres:new FormControl({value:'',disabled:true},Validators.required),
      fechaNacimiento:new FormControl({value:'',disabled:true},Validators.required),
      hcl:new FormControl({value:'',disabled:true},Validators.required),
      edad:new FormControl({value:'',disabled:true},Validators.required),
      sexo:new FormControl({value:'',disabled:true},Validators.required),
      codSeguro:new FormControl({value:'',disabled:true},Validators.required),
      // fum:new FormControl({value:'',disabled:false},Validators.required),
      cel:new FormControl({value:'',disabled:false},Validators.required),
      direccion:new FormControl({value:'',disabled:false},Validators.required),
    }),
    this.aconpanienteFG = this.formBuilder.group({
      tipoDocA:new FormControl({value:'',disabled:false},Validators.required),
      nroDocA:new FormControl({value:'',disabled:false},Validators.required),
      parentesco:new FormControl({value:'',disabled:false},Validators.required),
      apellidosA:new FormControl({value:'',disabled:false},Validators.required),
      nombreA:new FormControl({value:'',disabled:false},Validators.required),
      edad:new FormControl({value:'',disabled:false},Validators.required),
      telefono:new FormControl({value:'',disabled:false},Validators.required),
      direccion:new FormControl({value:'',disabled:false},Validators.required),
    }),
    this.signoAlarmaFG = this.formBuilder.group({
      tipoEdad:new FormControl({value:'',disabled:false},Validators.required),
      nombreSigno:new FormControl({value:'',disabled:false},Validators.required),
      valorSigno:new FormControl({value:'',disabled:false},Validators.required),
    })
  }

  /**Lista los tipos de documentos de Identidad de un paciente**/
  getTipoDoc() {
    this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
      this.tipoDocList = res.object;
    })
  }

  getDataPaciente(){
    // this.traerDataReniec();
    const data={
      tipoDoc:this.dataFromlocal.tipoDoc,
      nroDoc:this.dataFromlocal.nroDocumento
    } 
    this.datosGeneralesService.getPacientePorDoc(data).subscribe((resp: any) => {
      console.log({resp});
      this.datosGeneralesFG.get('fechaAtencion').setValue(new Date());
      this.datosGeneralesFG.get('tipoDoc').setValue(resp.object.tipoDoc);
      this.datosGeneralesFG.get('nroDoc').setValue(resp.object.nroDoc);
      this.datosGeneralesFG.get('apePaterno').setValue(resp.object.apePaterno);
      this.datosGeneralesFG.get('apeMaterno').setValue(resp.object.apeMaterno);
      this.datosGeneralesFG.get('nombres').setValue(resp.object.primerNombre + " " +resp.object.otrosNombres);
      this.datosGeneralesFG.get('fechaNacimiento').setValue(new Date (resp.object.nacimiento.fechaNacimiento));
      this.datosGeneralesFG.get('hcl').setValue(resp.object.nroHcl);
      this.datosGeneralesFG.get('edad').setValue(this.dataFromlocal.anio + " años " + this.dataFromlocal.mes+" meses " + this.dataFromlocal.dia + " dias");
      this.datosGeneralesFG.get('sexo').setValue(resp.object.sexo);
      this.datosGeneralesFG.get('codSeguro').setValue(resp.object.codSeguro);
      this.datosGeneralesFG.get('cel').setValue(resp.object.celular);
      this.datosGeneralesFG.get('direccion').setValue(resp.object.domicilio.direccion);
    });
  }
  getDatoGenerales(){
    this.datosGeneralesService.searchConsultaDatosGenerales(this.dataFromlocal.idConsulta).subscribe((resp: any) => {
      // console.log({resp});
      this.datosGeneralesFG.get('fechaAtencion').setValue(new Date(resp.object.fecha));
      this.datosGeneralesFG.get('tipoDoc').setValue(resp.object.tipoDoc);
      this.datosGeneralesFG.get('nroDoc').setValue(resp.object.nroDoc);
      this.datosGeneralesFG.get('apePaterno').setValue(resp.object.datosPaciente.apePaterno);
      this.datosGeneralesFG.get('apeMaterno').setValue(resp.object.datosPaciente.apeMaterno);
      this.datosGeneralesFG.get('nombres').setValue(resp.object.datosPaciente.primerNombre + " " +resp.object.datosPaciente.otrosNombres);
      this.datosGeneralesFG.get('fechaNacimiento').setValue(new Date(resp.object.datosPaciente.fechaNacimiento));
      this.datosGeneralesFG.get('hcl').setValue(resp.object.nroHcl);
      this.datosGeneralesFG.get('edad').setValue(this.dataFromlocal.anio + " años " + this.dataFromlocal.mes + " meses " + this.dataFromlocal.dia + " dias");
      this.datosGeneralesFG.get('sexo').setValue(resp.object.datosPaciente.sexo);
      this.datosGeneralesFG.get('codSeguro').setValue(resp.object.datosPaciente.codSeguro);
      /* falta fun */
      this.datosGeneralesFG.get('cel').setValue(resp.object.datosPaciente.celular);
      this.datosGeneralesFG.get('direccion').setValue(resp.object.datosPaciente.domicilio.direccion);
      /* aconpañante */
      this.aconpanienteFG.get('tipoDocA').setValue(resp.object.acompanante.tipoDoc);
      this.aconpanienteFG.get('nroDocA').setValue(resp.object.acompanante.nroDoc);
      this.aconpanienteFG.get('parentesco').setValue(resp.object.acompanante.lazoParentesco);
      this.aconpanienteFG.get('nombreA').setValue(resp.object.acompanante.nombre);
      this.aconpanienteFG.get('apellidosA').setValue(resp.object.acompanante.apellidos);
      this.aconpanienteFG.get('edad').setValue(resp.object.acompanante.edad);
      this.aconpanienteFG.get('telefono').setValue(resp.object.acompanante.telefono);
      this.aconpanienteFG.get('direccion').setValue(resp.object.acompanante.direccion);

      this.signoAlarmaList=resp.object.listaSignosAlarma;
    });
  }
  guardarActualizar(){
    if(!this.isUpdate){
      this.guardarNuevaConsulta();
    }
    else{
      this.actualizarConsulta();
    }
  }
  guardarNuevaConsulta(){
    let inputRequest = {
      fecha:this.datePipe.transform(this.datosGeneralesFG.get("fechaAtencion").value,'yyyy-MM-dd HH:mm:ss'),
      anioEdad:this.dataFromlocal.anio,
      // fum:this.datePipe.transform(this.datosGeneralesFG.get("fum").value,'yyyy-MM-dd'),
      nroHcl:this.datosGeneralesFG.get("hcl").value,
      tipoDoc:this.datosGeneralesFG.get("tipoDoc").value,
      nroDoc:this.datosGeneralesFG.get("nroDoc").value,
      direccion:this.datosGeneralesFG.get("direccion").value,
      acompanante:{
        tipoDoc:this.aconpanienteFG.get("tipoDocA").value,
        nroDoc:this.aconpanienteFG.get("nroDocA").value,
        nombre:this.aconpanienteFG.get("nombreA").value,
        apellidos:this.aconpanienteFG.get("apellidosA").value,
        lazoParentesco:this.aconpanienteFG.get("parentesco").value,
        edad:this.aconpanienteFG.get("edad").value,
        direccion:this.aconpanienteFG.get("direccion").value,
        telefono:this.aconpanienteFG.get("telefono").value
      },
      listaSignosAlarma:this.signoAlarmaList,
      servicio:this.dataFromlocal.ups,
      tipoConsulta:this.dataFromlocal.tipoConsulta
    }
    // console.log({inputRequest});
    
    
    this.datosGeneralesService.addConsultaDatosGenerales(inputRequest).subscribe((resp: any) => {
      this.idConsulta=resp.object.id;
      this.isUpdate=true;
      Swal.fire({
        icon: 'success',
        title: 'DATOS GENERALES',
        text: 'Guardado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      /* setteamos id consulta */
      const  dataForLocal={
        fechaNacimiento:this.dataFromlocal.fechaNacimiento,
        idConsulta:this.idConsulta,
        anio:this.dataFromlocal.anio,
        dia:this.dataFromlocal.dia,
        mes:this.dataFromlocal.mes,
        sexo:this.dataFromlocal.sexo,
        tipoDoc:this.dataFromlocal.tipoDoc,
        nroDocumento:this.dataFromlocal.nroDocumento,
        ups:this.dataFromlocal.ups,
        tipoConsulta:this.dataFromlocal.tipoConsulta
      }
      localStorage.setItem(this.attributeLocalS, JSON.stringify(dataForLocal));
    })
  }
  actualizarConsulta() {
    let inputRequest = {
      id:this.idConsulta,
      anioEdad:this.dataFromlocal.anio,
      // fum:this.datePipe.transform(this.datosGeneralesFG.get("fum").value,'yyyy-MM-dd'),
      nroHcl:this.datosGeneralesFG.get("hcl").value,
      direccion:this.datosGeneralesFG.get("direccion").value || '',
      acompanante:{
        tipoDoc:this.aconpanienteFG.get("tipoDocA").value,
        nroDoc:this.aconpanienteFG.get("nroDocA").value,
        nombre:this.aconpanienteFG.get("nombreA").value,
        apellidos:this.aconpanienteFG.get("apellidosA").value,
        lazoParentesco:this.aconpanienteFG.get("parentesco").value,
        edad:this.aconpanienteFG.get("edad").value,
        direccion:this.aconpanienteFG.get("direccion").value,
        telefono:this.aconpanienteFG.get("telefono").value
      },
      listaSignosAlarma:this.signoAlarmaList,
    }
    this.datosGeneralesService.updateConsultaDatosGenerales(inputRequest).subscribe((r: any) => {
      Swal.fire({
        icon: 'success',
        title: 'DATOS GENERALES',
        text: 'Actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
    },error => {
    })
    // this.getDatoGenerales();
  }
  traerDataReniec() {
    this.datosGeneralesService.getDatosReniec(this.dataFromlocal.nroDocumento).subscribe((res: any) => {
      // console.log(res);
      if(res.foto==null){
        this.hayFoto=false;
      }
      else{
        this.hayFoto=true;
        this.imagePath = res.foto;
      }
      
    });
  }
  
  /* AgregarSignos() {
    let a:any = {
      codSigno:this.signoAlarmaList.length+1,
      tipoEdad: this.signoAlarmaFG.value.tipoEdad,
      nombreSigno: this.signoAlarmaFG.value.nombreSigno.toUpperCase(),
      valorSigno: true
    }
    console.log('a', a)
    this.signoAlarmaList.push(a)
    this.signoAlarmaFG.get('nombreSigno').setValue('')
  }

  eliminarFuncion(rowIndex: any) {
    this.listaFuncionesBiologicas.splice(rowIndex, 1)
  }
  eliminarSigno(rowIndex: any) {
    this.signoAlarmaList.splice(rowIndex, 1)
    
  } */
  
  
}
