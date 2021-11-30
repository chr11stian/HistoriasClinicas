import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  myGroup:FormGroup;
  examenList :any=[
    {name:'Grupo Sanguineo'},
    {name:'factor RH'},
    {name:'Hemograma'},
    {name:'Hemoglobina'},
    {name:'Factor Correccion'},
    {name:'Hto'},
    {name:'Glucosa'},
    {name:'Tolerancia Glucosa'},
    {name:'Examen Orina'},
    {name:'RPR'},
    {name:'RPR Reactivo'},
    {name:'Examen Orina'},
    {name:'Ex Sec V'},
    {name:'Protenuari Cuatitativa'},
    {name:'Prueba VIH'},
    {name:'Prueba Hepatitas'},
    {name:'Elisa'},
    {name:'Glicemia'},
    {name:'Bacteriuria'},
    {name:'Nitriitos'},
    {name:'Urocultivo'},
    {name:'bkEsputo '},
    {name:'wsternBlotlfi '},
    {name:'thlv1'},
    {name:'torch'},
    {name:'gotaGruesa'},
    {name:'pap'},
    {name:'iva'},
  ]
  constructor() {

  }


  ngOnInit(): void {
    // this.buildForm()
  }
  buildForm(){
   this.myGroup=new FormGroup({

      fechaResultado:new FormControl('defecto',[Validators.required]),
      grupoS:new FormControl('defecto',[Validators.required]),
      FRH:new FormControl('defecto',[Validators.required]),
      Hemograma:new FormControl('defecto',[Validators.required]),
      hemoglobina:new FormControl('defecto',[Validators.required]),
      hto:new FormControl('defecto',[Validators.required]),
      glucosa:new FormControl('defecto',[Validators.required]),
      eOrina:new FormControl('defecto',[Validators.required]),
      RPR:new FormControl('defecto',[Validators.required]),
      preVIH:new FormControl('defecto',[Validators.required]),
      ExSecV:new FormControl('defecto',[Validators.required]),

     fechaEcografia1:new FormControl('defecto',[Validators.required]),
     resultado1:new FormControl('defecto',[Validators.required]),
     fechaEcografia2:new FormControl('defecto',[Validators.required]),
     resultado2:new FormControl('defecto',[Validators.required]),
     fechaEcografia3:new FormControl('defecto',[Validators.required]),
     resultado3:new FormControl('defecto',[Validators.required]),
     fechaEcografia4:new FormControl('defecto',[Validators.required]),
     resultado4:new FormControl('defecto',[Validators.required]),




   })
  }

}
