import { Component, OnInit } from '@angular/core';
import {SuplementacionMicronutrientes} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {SuplementacionesMicronutrientesService} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";

@Component({
  selector: 'app-suplemento',
  templateUrl: './suplemento.component.html',
  styleUrls: ['./suplemento.component.css']
})
export class SuplementoComponent implements OnInit {
  suplemento:SuplementacionMicronutrientes
  suplemetancionFG:FormGroup
  tipoHierro: any[]=[
    {code:'Complejo Polimaltosado Ferrico',name:'Complejo Polimaltosado Ferrico'},
    {code:'Sulfato Ferroso',name:'Sulfato Ferroso'},
  ]
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private SuplementacionService:SuplementacionesMicronutrientesService) {
    this.build();
    this.suplemento = this.config.data;
    this.getSuplemtancion()
  }
  ngOnInit(): void {
  }
  build(){
    this.suplemetancionFG=new FormGroup({
      hierro:new FormControl('',Validators.required),
      fechaTentativa:new FormControl('',Validators.required),
      fechaAplicacion:new FormControl('',Validators.required),
    })
  }
  getFC(control:string):AbstractControl{
    return this.suplemetancionFG.get(control)
  }
  getSuplemtancion(){
    this.getFC('fechaTentativa').setValue(this.suplemento.fechaTentativa);
    this.getFC('fechaAplicacion').setValue(new Date())

  }
  save(){
    const requestInput= {
      "suplementacionMes": {
      "codPrestacion": "21312",//duro
        "codSISMED": "123322",//duro
        "nroDiagnostico": 0,//duro
        "codProcedimientoHIS": "32323",//duro
        "codUPS": "324231",//duro
        "tipoSuplementacion":"Preventiva",
        "nombre": this.suplemento.nombre,
        "descripcion": this.getFC('hierro').value,
        "dosisIndicacion": "1 sobre",
        "viaAdministracion": "oral",
        "frecuencia": "cada dia",
        "duracion": "1 mes",
        "indicacion": "temor con citricos",
        "dosis": this.suplemento.dosis,
        "fecha": this.obtenerFecha(this.getFC('fechaAplicacion').value),
        "estadoAdministrado": true,
        "edadMes": this.suplemento.edadMes
     }
    }
    this.SuplementacionService.PostSuplementacion('6220faa7de66de66da819c08',requestInput).subscribe(()=>{
      this.ref.close('agregado')
    })
  }
  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split('T')
    const parte2 = parte1[1].split('.')[0]
    return `${parte1[0]}`
  }
  cancel(){
    this.getFC('')
    // this.ref.close('cancelado')

  }




}
