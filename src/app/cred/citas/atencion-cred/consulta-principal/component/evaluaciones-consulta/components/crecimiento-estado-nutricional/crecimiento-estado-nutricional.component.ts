import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ControlCrecimiento} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DatePipe} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlCrecimientoService} from "../../../../../plan/component/plan-atencion-integral/services/control-crecimiento/control-crecimiento.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-crecimiento-estado-nutricional',
  templateUrl: './crecimiento-estado-nutricional.component.html',
  styleUrls: ['./crecimiento-estado-nutricional.component.css']
})
export class CrecimientoEstadoNutricionalComponent implements OnInit {
  tallaPesoFG:FormGroup
  display:boolean=false;
  mesesPeso:any[]=[]
  mesesAltura:any[]=[]
  mesesAlturaPeso:any[]=[]
  tipoDNI:string;
  nroDNI:string
  expandir: boolean = true
  // ref: DynamicDialogRef
  listaControles: ControlCrecimiento[] = []
  RN: ControlCrecimiento[] = []
  Menor_1A: ControlCrecimiento[] = []
  A1: ControlCrecimiento[] = []
  A2: ControlCrecimiento[] = []
  A3: ControlCrecimiento[] = []
  A4: ControlCrecimiento[] = []
  A5: ControlCrecimiento[] = []
  A6: ControlCrecimiento[] = []
  A7: ControlCrecimiento[] = []
  A8: ControlCrecimiento[] = []
  A9: ControlCrecimiento[] = []
  valor:number=0.9;
  sexo:boolean;
  datePipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder,
              // public dialogService: DialogService,
              private servicio: ControlCrecimientoService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.tipoDNI=this.rutaActiva.snapshot.queryParams.tipoDoc;
    // this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc;
    this.getLista()
    // this.getPaciente();
    this.builForm();

  }
  getPaciente(){
    this.servicio.getPaciente(this.nroDNI)
      .toPromise().then((result) => {
      this.sexo=result.object.formatoFiliacion.datosGeneralesFiliacion.sexo
    }).catch((err) => {
      console.log(err)
    })
  }
  getLista() {
    this.servicio.getListaControles('47825757')
      // this.servicio.getListaControles(this.nroDNI)
      .toPromise().then((result) => {
      this.listaControles = result.object
      // this.paralosGraficos()
      console.log('la lista',this.listaControles)
      this.transform()
    }).catch((err) => {
      console.log(err)
    })
  }
  paralosGraficos(){
    this.listaControles.forEach((item,index)=>{
      if(item.peso!==0.0 && item.talla!=0) {
        if (item.edadMes<=33){
          this.mesesAlturaPeso.push([item.talla,item.peso])
        }
        if(item.edadMes>=1 && item.edadMes<=60){
          this.mesesAltura.push([item.edadMes,item.talla]);
          this.mesesPeso.push([item.edadMes,item.peso])
        }
      }
    });
    console.log('hola mundo')
    // console.log(this.mesesAltura)
    // console.log(this.mesesPeso)
    // console.log(this.mesesAlturaPeso)
  }
  transform(){
    //transformacion a un solo formato que se usará
    this.listaControles.forEach(i => {
      if(i.fecha===null){
        i.fecha='';
      }
      if(i.fechaTentativa===null){
        i.fechaTentativa='';
      }
      else {
        i.fecha=i.fecha.split(' ')[0];
        i.fechaTentativa=i.fechaTentativa.split(' ')[0];
        // i.fechaTentativa = this.datePipe.transform(i.fechaTentativa, 'dd-MM-yyyy HH:mm:ss');
      }
    })
    console.log("lista conversa",this.listaControles);
    this.separacion()
    // this.determinaEdadPesoTalla();
  }
  separacion() {
    this.RN=this.listaControles.filter(item => item.descripcionEdad==='RN');
    // console.log('lista RN',this.RN);
    this.Menor_1A=this.listaControles.filter(item=> item.descripcionEdad==='Menor_1A')
    // console.log('lista Menor_1A',this.Menor_1A);
    this.A1=this.listaControles.filter(item=> item.descripcionEdad==='1A')
    // console.log('lista A1',this.A1);
    this.A2=this.listaControles.filter(item=> item.descripcionEdad==='2A')
    // console.log('lista A2',this.A2);
    this.A3=this.listaControles.filter(item=> item.descripcionEdad==='3A')
    // console.log('lista A3',this.A3);
    this.A4=this.listaControles.filter(item=> item.descripcionEdad==='4A')
    // console.log('lista A4',this.A4);
    this.A5=this.listaControles.filter(item=> item.descripcionEdad==='5A')
    // console.log('lista A5',this.A5);
    this.A6=this.listaControles.filter(item=> item.descripcionEdad==='6A')
    // console.log('lista A6',this.A6);
    this.A7=this.listaControles.filter(item=> item.descripcionEdad==='7A')
    // console.log('lista A7',this.A7);
    this.A8=this.listaControles.filter(item=> item.descripcionEdad==='8A')
    // console.log('lista A8',this.A8);
    this.A9=this.listaControles.filter(item=> item.descripcionEdad==='9A')
    // console.log('lista A9',this.A9);
    console.log('lista general',this.listaControles);
  }
  // getFecha(date: Date) {
  //   if (date.toString() !== '') {
  //     let hora = date.toLocaleTimeString();
  //     let dd = date.getDate();
  //     let dd1:string=dd.toString();
  //     if(dd<10){
  //       dd1='0'+dd;
  //     }
  //     let mm = date.getMonth() + 1;
  //     let mm1:string=mm.toString();
  //     if(mm<10){
  //       mm1='0'+mm;
  //     }
  //     let yyyy = date.getFullYear();
  //     return yyyy + '-' + mm1 + '-' + dd1+' '+hora
  //   } else {
  //     return '';
  //   }
  // }
  agregarPesoTalla(elemento){
    this.display=true;
    this.getFC('fecha').setValue(new Date('01-03-1993'))

  }
  builForm(){
    this.tallaPesoFG=new FormGroup({
      fecha: new FormControl('', Validators.required),
      peso:new FormControl('',Validators.required),
      talla:new FormControl('',Validators.required)
    });
  }
  getFC(control: string): AbstractControl {
    return this.tallaPesoFG.get(control);
  }
  cancelar(){

  }
  save(){

  }


}
