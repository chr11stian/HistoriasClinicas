import { Component, OnInit } from '@angular/core';
import {UbicacionService} from "../../../../../mantenimientos/services/ubicacion/ubicacion.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-datos-generales-adolescente',
  templateUrl: './datos-generales-adolescente.component.html',
  styleUrls: ['./datos-generales-adolescente.component.css']
})
export class DatosGeneralesAdolescenteComponent implements OnInit {
  constructor(private ubicacionService:UbicacionService) { }
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
    {name:"español",code:"Español"},
    {name:"quechua",code:"Quechua"},
    {name:"aymara",code:"Aymara"},
  ]
  departamento=[];
  provincia=[];
  distrito=[];
  datosGeneralesFG:FormGroup;
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      fecha:new FormControl('',Validators.required),
      nroSeguro:new FormControl('',Validators.required),
      apellidos:new FormControl('',Validators.required),
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
    this.getFC('provincia').setValue(null);
    this.getFC('distrito').setValue(null);
    const departamento=valor.value;
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
  ngOnInit(): void {
    this.getDepatamento();
    this.buildForm();
  }
  save(){
    console.log(this.datosGeneralesFG.value)
  }

}
