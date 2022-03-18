import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
interface DosajeHemoglobina{
  descripcionEdad: string,
  edadMes: number,
  nombre: string,
  nroControl: number,
  estadoControlado: boolean,
  valorHb: number,
  fecha:Date,
  fechaTentativa: Date
}
@Component({
  selector: 'app-dosaje',
  templateUrl: './dosaje.component.html',
  styleUrls: ['./dosaje.component.css']
})
export class DosajeComponent implements OnInit {
  nivelAnemia=[
      {name:'Anemia Leve',code:'ANEMIA LEVE'},
      {name:'Anemia Moderada',code:'ANEMIA MODERADA'},
      {name:'Anemia Severa',code:'ANEMIA SEVERA'}
  ]
  positivoAnemia=[
    {name:'Positivo',code:'POSITIVO'},
    {name:'Negativo',code:'NEGATIVO'},
  ]
  dosajeFG:FormGroup;
  dosaje:DosajeHemoglobina= this.config.data;
  documento=JSON.parse(localStorage.getItem('documento'))
  idConsulta=this.documento.idConsulta;

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig
              ,private dosajeService:SuplementacionesMicronutrientesService
  ) {
  }

  ngOnInit(): void {
    this.buildForm()
    this.getDosaje()
  }
  getFC(control:string):AbstractControl{
    return this.dosajeFG.get(control);
  }
  buildForm(){
    this.dosajeFG=new FormGroup({
        fechaTentativa:new FormControl('',Validators.required),
        fechaAdministrada:new FormControl('',Validators.required),
        valorHb:new FormControl('',Validators.required),
        valorHbFactor:new FormControl('',Validators.required),
        nivelAnemia:new FormControl('',Validators.required),
        positivoAnemia:new FormControl('',Validators.required),

    })
  }
  getDosaje(){
    console.log('dosaje recuperado',this.dosaje)
    this.getFC("fechaTentativa").setValue(this.dosaje.fechaTentativa);
    this.getFC("fechaAdministrada").setValue(new Date());
    // this.getFC('valogHb').setValue(this.dosaje.valorHb))

  }
  cancel(){
    this.ref.close('cerrado')
  }
  save(){
    const inputRequest={
      descripcionEdad:this.dosaje.descripcionEdad,
      edadMes: this.dosaje.edadMes,
      nombre: this.dosaje.nombre,
      nroControl: this.dosaje.nroControl,
      estadoControlado: true,
      valorHb: this.getFC('valorHb').value,
      fecha: this.obtenerFecha(this.getFC('fechaAdministrada').value)
    }
    console.log('id consulta',inputRequest)
    this.dosajeService.PostDosajeHemoglobina(this.idConsulta,inputRequest).subscribe((resp)=>{
      this.ref.close('guardar')

    })
  }
  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split("T");
    const parte2 = parte1[1].split(".")[0];
    return `${parte1[0]}`;
  }

}
