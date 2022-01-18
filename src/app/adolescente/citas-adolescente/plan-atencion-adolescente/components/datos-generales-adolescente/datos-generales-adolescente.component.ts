import { Component, OnInit } from '@angular/core';
import {UbicacionService} from "../../../../../mantenimientos/services/ubicacion/ubicacion.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatosGeneralesService} from "../../services/adolescentePAI/datos-generales.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-datos-generales-adolescente',
  templateUrl: './datos-generales-adolescente.component.html',
  styleUrls: ['./datos-generales-adolescente.component.css']
})
export class DatosGeneralesAdolescenteComponent implements OnInit {
  constructor(private ubicacionService:UbicacionService,
              private messageService: MessageService,
              private datosGeneralesService:DatosGeneralesService,
              private rutaActiva: ActivatedRoute) { }
  tipoDNI:string;
  nroDNI:string;
  isUpdate:boolean=false

  sexo = [
    {name: 'M', code: 'M'},
    {name: 'F', code: 'F'},
  ];
  grupoSanguineo=[
    {name:"A",code:"A"},
    {name:"B",code:"B"},
    {name:"AB",code:"AB"},
    {name:"O",code:"O"},
  ]
  rh=[{name:"+",code:"+"},
      {name:"-",code:"-"}
  ]
  opciones=[{name:'name1',code:'code1'},
    {name:'name2',code:'code2'},
    {name:'name3',code:'code3'},
    {name:'name4',code:'code4'},
    {name:'name5',code:'code5'},
    {name:'name6',code:'code6'}]
  idioma=[
    {name:"español",code:"espaniol"},
    {name:"quechua",code:"quechua"},
    {name:"aymara",code:"ayamara"},
  ]
  departamento=[];
  provincia=[];
  distrito=[];
  datosGeneralesFG:FormGroup;
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      fecha:new FormControl('',Validators.required),
      nroSeguro:new FormControl('',Validators.required),
      apellidoPaterno:new FormControl('',Validators.required),
      apellidoMaterno:new FormControl('',Validators.required),
      nombres:new FormControl('',Validators.required),
      sexo:new FormControl('',Validators.required),
      edad:new FormControl('',Validators.required),
      fechaNacimiento:new FormControl('',Validators.required),
      departamento:new FormControl('',Validators.required),
      provincia:new FormControl('',Validators.required),
      distrito:new FormControl('',Validators.required),
      grupoSanguineo:new FormControl('',Validators.required),
      rh:new FormControl('',Validators.required),
      procedencia:new FormControl('',Validators.required),
      idioma:new FormControl('',Validators.required),
      domicilioDireccion:new FormControl('',Validators.required),
      gradoInstruccion:new FormControl('',Validators.required),
      centroEducativo:new FormControl('',Validators.required),
      estadoCivil:new FormControl('',Validators.required),
      religion:new FormControl('',Validators.required),
      ocupacion:new FormControl('',Validators.required),
      aconpananteApellidosNombres:new FormControl('',Validators.required),
      aconpananteParentesco:new FormControl('',Validators.required),
      aconpananteDomicilioDireccion:new FormControl('',Validators.required),
    })
  }
  getFC(control:string):AbstractControl {
    return this.datosGeneralesFG.get(control);
  }
  getDepatamento(){
    this.ubicacionService.getDepartamentos().subscribe((resp)=>{
      this.departamento=resp['object']
    })
  }
  getProvincia(departamento){
    this.ubicacionService.getProvincias(departamento).subscribe((resp)=>{
      this.provincia=resp['object']
    })
  }
  getDistrito(provincia){
    this.ubicacionService.getDistritos(provincia).subscribe((resp)=>{
      this.distrito=resp['object']
    })
  }
  cambiarDepartamento(valor)
  {
    console.log(valor)
    this.getFC('provincia').setValue(null);
    this.getFC('distrito').setValue(null);
    const departamento=this.getFC('departamento').value;
    console.log(departamento)
    this.getProvincia(departamento);
  }
  cambiarProvincia(valor){
    let aux = {
      iddd:this.getFC('departamento').value['iddd'],
      idpp: valor.value.idpp
    }
    // const provincia=valor.value;
    this.getDistrito(aux)
  }
  getFechaHora(date: Date) {
    if (date.toString() !== '') {
      let hora = date.toLocaleTimeString();
      let dd = date.getDate();
      let dd1;
      if(dd<10){
        dd1='0'+dd;
        dd=dd1
      }
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      return yyyy + '-' + mm + '-' + dd
    } else {
      return '';
    }
  }
  ngOnInit(): void {

    this.tipoDNI=this.rutaActiva.snapshot.queryParams.tipoDoc
    this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc
    this.getDepatamento();
    this.buildForm();
    this.getDatosGenerales();
  }
  getDatosGenerales(){
    // this.tipoDNI='DNI'
    // this.nroDNI='10101013'
      this.datosGeneralesService.getAdolescente(this.tipoDNI,this.nroDNI).subscribe((resp)=>{
        if(resp['cod']=="2005"){
          this.isUpdate=true;
          this.messageService.add({severity:'info', summary:'Registor recuperado', detail:'Registro recuperado satifatoriamente'});
          const data=resp['object']
          this.getFC('fecha').setValue(new Date('2021-12-06 00:05:00'))
          this.getFC('fecha').setValue(new Date(data.fecha))
          this.getFC('nroSeguro').setValue(data.nroSeguro);
          this.getFC('apellidoPaterno').setValue(data.apePaterno);
          this.getFC('apellidoMaterno').setValue(data.apeMaterno);
          this.getFC('nombres').setValue(data.primerNombre);
          this.getFC('sexo').setValue(data.sexo);
          this.getFC('edad').setValue(data.edad);
          this.getFC('fechaNacimiento').setValue(new Date('2021-12-06 00:05:00'))
          this.getFC('fechaNacimiento').setValue(new Date((data.fechaNacimiento)))
          // this.getFC('departamento').setValue({iddd:'03',departamento:'APURIMAC'});
          // this.getFC('provincia').setValue({iddd:'03',departamento:'APURIMAC'});
          // this.getFC('distrito').setValue({iddd:'03',departamento:'APURIMAC'});
          this.getFC('aconpananteDomicilioDireccion').setValue(data.direccionAcompaniante);

        }
        else{
          this.messageService.add({severity:'info', summary:'nuevo registro', detail:'Ingrese nuevo registro'});

        }
      })


    }
  save(){
    console.log('estamos en el save')
    // this.tipoDNI='DNI'
    // this.nroDNI='10101013'
    const requestInput={
      fecha:this.getFechaHora(this.getFC('fecha').value),
      nroSeguro:this.getFC('nroSeguro').value,
      nroHcl:this.getFC('nroSeguro').value,
      primerNombre:this.getFC('nombres').value,
      otrosNombres:this.getFC('nombres').value,
      apePaterno:this.getFC('apellidoPaterno').value,
      apeMaterno:this.getFC('apellidoMaterno').value,
      sexo:this.getFC('sexo').value,
      grupoSanguineo:this.getFC('grupoSanguineo').value,
      rh:this.getFC('rh').value,
      fechaNacimiento:this.getFechaHora(this.getFC('fechaNacimiento').value),
      edad:this.getFC('edad').value,
      provinciaNacimiento:'CUSCO',
      distritoNacimiento:'CUSCO',
      departamentoNacimiento:'CUSCO',
      procedencia:this.getFC('procedencia').value,
      idioma:this.getFC('idioma').value,
      direccion:this.getFC('domicilioDireccion').value,
      gradoInstruccion:this.getFC('gradoInstruccion').value,
      centroEducativo:this.getFC('centroEducativo').value,
      estadoCivil:this.getFC('estadoCivil').value,
      religion:this.getFC('religion').value,
      ocupacion:this.getFC('ocupacion').value,
      acompaniante:this.getFC('aconpananteApellidosNombres').value,
      parentesco:this.getFC('aconpananteParentesco').value,
      direccionAcompaniante:this.getFC('aconpananteDomicilioDireccion').value
    }
    // console.log(requestInput)
    this.datosGeneralesService.addAdolescente(this.tipoDNI,this.nroDNI,requestInput).subscribe((resp)=>{
      if (!this.isUpdate) {
      this.messageService.add({severity:'success', summary:'Agregado', detail:'Registro Agregado'})
      }
      else{
        this.messageService.add({severity:'warn', summary:'Actualizado', detail:'Registro Actualizado'})
      }
    },
        (error)=>{
          console.log('error')
        })
  }

}
