import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { item,  valoracionFuncional,
} from "../../models/plan-atencion-adulto-mayor.model";
import {AdultoMayorService} from "../../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-valoracion-funcional-adulto-mayor',
  templateUrl: './valoracionFuncional.component.html',
  styleUrls: ['./valoracionFuncional.component.css']
})
export class ValoracionFuncionalComponent implements OnInit {
  idRecuperado = "";
  formValoracionClinicaFuncional:FormGroup;
  valoracionesFuncional:valoracionFuncional;
  isUpdate: boolean = false;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  diagnostico:string;
  docRecuperado="";
  tipoDocRecuperado="";
  ListaValoracionFuncional:any;
  dialogValoracionFuncional:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private valoracionService: AdultoMayorService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDocRecuperado = params['tipoDoc']
            this.docRecuperado = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/adulto-mayor/citas'])
          }
        })
    this.recuperarDataFuncionalBDPorDoc();
  }
  buildForm() {
    this.formValoracionClinicaFuncional = this.formBuilder.group({
      lavarse: new FormControl(''),
      vestirse: new FormControl(''),
      usoservicioH: new FormControl(''),
      movilizarse: new FormControl(''),
      continencia: new FormControl(''),
      alimentarse: new FormControl(''),
      diagnostico: new FormControl(''),
    })
  }
  recuperarValoracionFuncional() {
    let items: item[] = [];
    let lavarse: boolean = this.formValoracionClinicaFuncional.value.lavarse;
    let vestirse:boolean = this.formValoracionClinicaFuncional.value.vestirse;
    let usoservicioH: boolean = this.formValoracionClinicaFuncional.value.usoservicioH;
    let movilizarse: boolean = this.formValoracionClinicaFuncional.value.movilizarse;
    let continencia: boolean = this.formValoracionClinicaFuncional.value.continencia;
    let alimentarse: boolean = this.formValoracionClinicaFuncional.value.alimentarse;

    /************1 LAVARSE LAS MANOS********************/
    if (lavarse) {
      let aux = {nombreItem: 'LAVARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }else{
          let aux = {nombreItem: 'LAVARSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
        }
    /************2 VESTIRSE********************/
    if (vestirse) {
      let aux = {nombreItem: 'VESTIRSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }else{
      let aux = {nombreItem: 'VESTIRSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
    }
    /************ 3 USO DE SERVICIOS HIGIENICOS*********************/
    if (usoservicioH) {
      let aux = {nombreItem: 'USO DE SERVICIO HIGIENICO', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }
    else{
      let aux = {nombreItem: 'USO DE SERVICIO HIGIENICO', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
    }
    /************4 MOVILIZARSE*********************/
    if (movilizarse) {
      let aux = {nombreItem: 'MOVILIZARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }else{
      let aux = {nombreItem: 'MOVILIZARSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
    }
    /************5 CONTINENCIA********************/
    if (continencia) {
      let aux = {nombreItem: 'CONTINENCIA', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }else{
      let aux = {nombreItem: 'CONTINENCIA', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
    }
    /************6 ALIMENTARSE********************/
    if (alimentarse) {
      let aux = {nombreItem: 'ALIMENTARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      items.push(aux);
    }else{
      let aux = {nombreItem: 'ALIMENTARSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      items.push(aux);
    }
    let suma = 0;
    let diagnosticos:string="";
    for(let i = 0;i<items.length;i++){
      suma+=items[i].puntaje;
    }

    if(suma==0){diagnosticos="INDEPENDIENTE"}
    else{
      if(suma==6){
        diagnosticos="DEPENDIENTE";}
      else{
            diagnosticos="DEPENDIENTE PARCIAL";
      }
    }
    this.valoracionesFuncional = {
      diagnostico: diagnosticos,
      items:items
    }

  }
  obtenerFecha():string{
    const Dates = new Date();
    //Año
    const Year : number = Dates.getFullYear();
    // El subíndice del mes es 0-11
    const Months : any = ( Dates.getMonth() + 1 ) < 10  ?  '0' + (Dates.getMonth() + 1) : ( Dates.getMonth() + 1);
    // Número específico de días
    const Day : any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    //Hora
    const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
    //Minuto
    const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
    //segundo
    const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
    // Devolver formato de datos,
    console.log(Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds);
    return Year + '-' + Months + '-' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
  }
  agregarValoracionFuncional(){

      this.recuperarValoracionFuncional();
      let cadena = {
        tipoDoc:this.tipoDocRecuperado,
        nroDoc:this.docRecuperado,
        valoracionClinica:{
          fecha: this.obtenerFecha(),
          valoracionFuncional: this.valoracionesFuncional
        }
      }
      this.formValoracionClinicaFuncional.patchValue({ 'diagnostico': this.valoracionesFuncional.diagnostico });
      console.log('valoracion funcional a guardar:', cadena);
      this.valoracionService.postValoracionClinicaAgregarPorDoc(cadena).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });

  }
  agregarActualizar(){
    console.log(this.valoracionesFuncional);
    if(this.valoracionesFuncional==null || this.valoracionesFuncional == undefined){
      console.log(true);
      this.agregarValoracionFuncional();
    }
    else{
      this.actualizarValoracionFuncional();
    }
  }
  actualizarValoracionFuncional(){
    this.recuperarValoracionFuncional();
    let cadena = {
      tipoDoc:this.tipoDocRecuperado,
      nroDoc:this.docRecuperado,
      valoracionClinica:{
        fecha: this.obtenerFecha(),
        valoracionClinica: this.valoracionesFuncional
      }
    }
    this.formValoracionClinicaFuncional.patchValue({ 'diagnostico': this.valoracionesFuncional.diagnostico });
    console.log('valoracion funcional a guardar:',cadena);
    this.valoracionService.updateValoracionClinicaEditarPorDoc(cadena).subscribe((res: any) => {
      console.log('se actualizo correctamente ', res.object);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }
  recuperarDataFuncionalBDPorDoc(){
    const data = {
      tipoDoc:this.tipoDocRecuperado,
      nroDoc:this.docRecuperado
    }
    this.valoracionService.postValoracionClinicaPorDoc(data).subscribe((res: any) => {
      console.log('se recupero datos satisfactoriamente', res.object);
     if(res.object.valoracionesClinicas!=null) {
       this.idRecuperado = res.object.id;
       this.valoracionesFuncional = res.object.valoracionesClinicas[0].valoracionFuncional;
       console.log(this.valoracionesFuncional);
       this.messageService.add({
         severity: "success",
         summary: "Exito",
         detail: res.mensaje
       });
        /*****LLENAR CAMPOS RECUPERADOS DE LA BD*****/
        let dx = this.valoracionesFuncional.diagnostico;
        console.log("dx",dx);
        let aux1=this.valoracionesFuncional.items[0].puntaje;
        console.log(aux1);
        let aux2=this.valoracionesFuncional.items[1].puntaje;
        console.log(aux2);
        let aux3=this.valoracionesFuncional.items[2].puntaje;
        console.log(aux3);
        let aux4=this.valoracionesFuncional.items[3].puntaje;
        console.log(aux4);
        let aux5=this.valoracionesFuncional.items[4].puntaje;
        console.log(aux5);
        let aux6=this.valoracionesFuncional.items[5].puntaje;
        console.log(aux6);
        if(aux1==0)
          this.formValoracionClinicaFuncional.get("lavarse").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("lavarse").setValue(true);
        }
        if(aux2==0)
          this.formValoracionClinicaFuncional.get("vestirse").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("vestirse").setValue(true);
        }
        if(aux3==0)
          this.formValoracionClinicaFuncional.get("usoservicioH").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("usoservicioH").setValue(true);
        }
        if(aux4==0)
          this.formValoracionClinicaFuncional.get("movilizarse").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("movilizarse").setValue(true);
        }
        if(aux5==0)
          this.formValoracionClinicaFuncional.get("continencia").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("continencia").setValue(true);
        }
        if(aux6==0)
          this.formValoracionClinicaFuncional.get("alimentarse").setValue(false);
        else{
          this.formValoracionClinicaFuncional.get("alimentarse").setValue(true);
        }
        this.formValoracionClinicaFuncional.patchValue({ 'diagnostico': this.valoracionesFuncional.diagnostico });
      }
    else{
       this.messageService.add({
         severity: "warn",
         summary: "Error",
         detail: "No hay datos en Valoración"
       });
     }});


  }
  recuperarDataFuncionalBD(){
    this.valoracionService.getValoracionClinica(this.idRecuperado).subscribe((res: any) => {
      console.log('se recupero datos satisfactoriamente', res.object);
      console.log(res.object.valoracionesClinicas[0].valoracionFuncional);
      this.valoracionesFuncional=res.object.valoracionesClinicas[0].valoracionFuncional;
       console.log(this.valoracionesFuncional);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
      /*****LLENAR CAMPOS RECUPERADOS DE LA BD*****/
      let dx = this.valoracionesFuncional.diagnostico;
      console.log("dx",dx);
      let aux1=this.valoracionesFuncional.items[0].puntaje;
      console.log(aux1);
      let aux2=this.valoracionesFuncional.items[1].puntaje;
      console.log(aux2);
      let aux3=this.valoracionesFuncional.items[2].puntaje;
      console.log(aux3);
      let aux4=this.valoracionesFuncional.items[3].puntaje;
      console.log(aux4);
      let aux5=this.valoracionesFuncional.items[4].puntaje;
      console.log(aux5);
      let aux6=this.valoracionesFuncional.items[5].puntaje;
      console.log(aux6);
      if(aux1==0)
      this.formValoracionClinicaFuncional.get("lavarse").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("lavarse").setValue(true);
      }
      if(aux2==0)
        this.formValoracionClinicaFuncional.get("vestirse").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("vestirse").setValue(true);
      }
      if(aux3==0)
        this.formValoracionClinicaFuncional.get("usoservicioH").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("usoservicioH").setValue(true);
      }
      if(aux4==0)
        this.formValoracionClinicaFuncional.get("movilizarse").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("movilizarse").setValue(true);
      }
      if(aux5==0)
        this.formValoracionClinicaFuncional.get("continencia").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("continencia").setValue(true);
      }
      if(aux6==0)
        this.formValoracionClinicaFuncional.get("alimentarse").setValue(false);
      else{
        this.formValoracionClinicaFuncional.get("alimentarse").setValue(true);
      }
     this.formValoracionClinicaFuncional.patchValue({ 'diagnostico': this.valoracionesFuncional.diagnostico });
    });
  }
  listarValoraciones(){
    this.dialogValoracionFuncional=true;

  }
}
