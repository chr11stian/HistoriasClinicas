import { Component, OnInit } from '@angular/core';
import { TestDesarrollo } from './test-desarrollo.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {dato} from "../../../../../models/data";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-test-desarrollo',
  templateUrl: './test-desarrollo.component.html',
  styleUrls: ['./test-desarrollo.component.css'],
  providers: [TestDesarrollo]
})
export class TestDesarrolloComponent implements OnInit {
  imagenes: any[];
  value: boolean;
  formDatos_TestPeruano:FormGroup;
  attributeLocalS = 'documento';
  data:dato;
  datePipe = new DatePipe('en-US');
  listaTestPeruano:TestPeruano[]=[];
  displayMaximizable:boolean;

  constructor(
      private testDesarrollo: TestDesarrollo,
      private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.builForm();
    this.formDatos_TestPeruano.disable();
    this.testDesarrollo.getImagenes().then(data => {
          this.imagenes = data;
        }
    )
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.recuperarTestsBD();
  }
  builForm(){
    this.formDatos_TestPeruano = this.form.group({
      /**Datos personales**/
      /*************LETTER A*************/
      A_1: new FormControl(false),
      A_2: new FormControl(false),
      A_3: new FormControl(false),
      A_4: new FormControl(false),
      A_5: new FormControl(false),
      A_6: new FormControl(false),
      A_7: new FormControl(false),
      A_8: new FormControl(false),
      A_9: new FormControl(false),
      A_10: new FormControl(false),
      A_11: new FormControl(false),
      A_12: new FormControl(false),
      A_15: new FormControl(false),
      A_18: new FormControl(false),
      A_21: new FormControl(false),
      A_24: new FormControl(false),
      A_30: new FormControl(false),
      /*******LETTER B****/
      B_1: new FormControl( false),
      B_2: new FormControl(false),
      B_3: new FormControl(false),
      B_4: new FormControl(false),
      B_5: new FormControl(false),
      B_6: new FormControl(false),
      B_7: new FormControl(false),
      B_8: new FormControl(false),
      B_9: new FormControl(false),
      B_10: new FormControl(false),
      B_11: new FormControl(false),
      B_12: new FormControl(false),
      B_15: new FormControl(false),
      B_18: new FormControl(false),
      B_21: new FormControl(false),
      B_24: new FormControl(false),
      B_30: new FormControl(false),
      /********LETTER C***********/
      C_1: new FormControl(false),
      C_2: new FormControl(false),
      C_3: new FormControl(false),
      C_4: new FormControl(false),
      C_5: new FormControl(false),
      C_6: new FormControl(false),
      C_7: new FormControl(false),
      C_8: new FormControl(false),
      C_9: new FormControl(false),
      C_10: new FormControl(false),
      C_11: new FormControl(false),
      C_12: new FormControl(false),
      C_15: new FormControl(false),
      C_18: new FormControl(false),
      C_21: new FormControl(false),
      C_24: new FormControl(false),
      C_30: new FormControl(false),
      /*******LETTER D***********/
      D_1: new FormControl(false),
      D_2: new FormControl(false),
      D_3: new FormControl(false),
      D_4: new FormControl(false),
      D_5: new FormControl(false),
      D_6: new FormControl(false),
      D_7: new FormControl(false),
      D_8: new FormControl(false),
      D_9: new FormControl(false),
      D_10: new FormControl(false),
      D_11: new FormControl(false),
      D_12: new FormControl(false),
      D_15: new FormControl(false),
      D_18: new FormControl( false),
      D_21: new FormControl(false),
      D_24: new FormControl(false),
      D_30: new FormControl(false),
      /********LETTER E***********/
      E_1: new FormControl(false),
      E_2: new FormControl(false),
      E_3: new FormControl(false),
      E_4: new FormControl(false),
      E_5: new FormControl(false),
      E_6: new FormControl(false),
      E_7: new FormControl(false),
      E_8: new FormControl(false),
      E_9: new FormControl(false),
      E_10: new FormControl(false),
      E_11: new FormControl(false),
      E_12: new FormControl(false),
      E_15: new FormControl(false),
      E_18: new FormControl(false),
      E_21: new FormControl(false),
      E_24: new FormControl(false),
      E_30: new FormControl(false),
      /*******LETTER F***********/
      F_1: new FormControl(false),
      F_2: new FormControl(false),
      F_3: new FormControl(false),
      F_4: new FormControl(false),
      F_5: new FormControl(false),
      F_6: new FormControl(false),
      F_7: new FormControl(false),
      F_8: new FormControl(false),
      F_9: new FormControl(false),
      F_10: new FormControl(false),
      F_11: new FormControl(false),
      F_12: new FormControl(false),
      F_15: new FormControl(false),
      F_18: new FormControl( false),
      F_21: new FormControl( false),
      F_24: new FormControl( false),
      F_30: new FormControl( false),
      /********LETTER G***********/
      G_1: new FormControl(false),
      G_2: new FormControl(false),
      G_3: new FormControl(false),
      G_4: new FormControl(false),
      G_5: new FormControl(false),
      G_6: new FormControl(false),
      G_7: new FormControl(false),
      G_8: new FormControl(false),
      G_9: new FormControl(false),
      G_10: new FormControl( false),
      G_11: new FormControl(false),
      G_12: new FormControl(false),
      G_15: new FormControl(false),
      G_18: new FormControl( false),
      G_21: new FormControl( false),
      G_24: new FormControl( false),
      G_30: new FormControl( false),
      /*******LETTER H***********/
      H_1: new FormControl(false),
      H_2: new FormControl(false),
      H_3: new FormControl(false),
      H_4: new FormControl(false),
      H_5: new FormControl(false),
      H_6: new FormControl(false),
      H_7: new FormControl(false),
      H_8: new FormControl(false),
      H_9: new FormControl(false),
      H_10: new FormControl(false),
      H_11: new FormControl(false),
      H_12: new FormControl(false),
      H_15: new FormControl(false),
      H_18: new FormControl( false),
      H_21: new FormControl( false),
      H_24: new FormControl( false),
      H_30: new FormControl( false),
      /********LETTER I***********/
      I_1: new FormControl(false),
      I_2: new FormControl(false),
      I_3: new FormControl(false),
      I_4: new FormControl(false),
      I_5: new FormControl(false),
      I_6: new FormControl(false),
      I_7: new FormControl(false),
      I_8: new FormControl(false),
      I_9: new FormControl(false),
      I_10: new FormControl(false),
      I_11: new FormControl(false),
      I_12: new FormControl(false),
      I_15: new FormControl(false),
      I_18: new FormControl(false),
      I_21: new FormControl(false),
      I_24: new FormControl(false),
      I_30: new FormControl(false),
      /*******LETTER J***********/
      J_1: new FormControl(false),
      J_2: new FormControl(false),
      J_3: new FormControl(false),
      J_4: new FormControl(false),
      J_5: new FormControl(false),
      J_6: new FormControl(false),
      J_7: new FormControl(false),
      J_8: new FormControl(false),
      J_9: new FormControl(false),
      J_10: new FormControl(false),
      J_11: new FormControl(false),
      J_12: new FormControl(false),
      J_15: new FormControl(false),
      J_18: new FormControl(false),
      J_21: new FormControl(false),
      J_24: new FormControl(false),
      J_30: new FormControl(false),
      /********LETTER K***********/
      K_1: new FormControl(false),
      K_2: new FormControl(false),
      K_3: new FormControl(false),
      K_4: new FormControl(false),
      K_5: new FormControl(false),
      K_6: new FormControl(false),
      K_7: new FormControl(false),
      K_8: new FormControl(false),
      K_9: new FormControl(false),
      K_10: new FormControl(false),
      K_11: new FormControl(false),
      K_12: new FormControl(false),
      K_15: new FormControl(false),
      K_18: new FormControl(false),
      K_21: new FormControl(false),
      K_24: new FormControl(false),
      K_30: new FormControl(false),
      /*******LETTER L***********/
      L_1: new FormControl(false),
      L_2: new FormControl(false),
      L_3: new FormControl(false),
      L_4: new FormControl(false),
      L_5: new FormControl(false),
      L_6: new FormControl(false),
      L_7: new FormControl(false),
      L_8: new FormControl(false),
      L_9: new FormControl(false),
      L_10: new FormControl( false),
      L_11: new FormControl(false),
      L_12: new FormControl(false),
      L_15: new FormControl(false),
      L_18: new FormControl( false),
      L_21: new FormControl(false),
      L_24: new FormControl(false),
      L_30: new FormControl( false),
      /*********fECHA**********/
      f1:new FormControl(''),
      f2:new FormControl(''),
      f3:new FormControl(''),
      f4:new FormControl(''),
      f5:new FormControl(''),
      f6:new FormControl(''),
      f7:new FormControl(''),
      f8:new FormControl(''),
      f9:new FormControl(''),
      f10:new FormControl(''),
      f11:new FormControl(''),
      f12:new FormControl(''),
      f15:new FormControl(''),
      f18:new FormControl(''),
      f21:new FormControl(''),
      f24:new FormControl(''),
      f30:new FormControl('')
    })
  }

  openTestPeruano(fecha,edad,calificacion){
    this.formDatos_TestPeruano.reset();
    console.log("abriendo test Peruano");
    this.displayMaximizable = true;
    console.log(calificacion);
    console.log(edad);
    console.log(fecha);
    calificacion.forEach(element=>this.formDatos_TestPeruano.get(element.codigo).setValue(true))
    let edadFecha = 'f'+edad.toString();
    this.formDatos_TestPeruano.get(edadFecha).setValue(this.datePipe.transform(fecha,'dd-MM-yyyy HH:mm:ss'));

  }

  visualizar() {
    this.formDatos_TestPeruano.reset();
    this.displayMaximizable = true;
    let testRecuperados:any[]=[];
    let testFechas:any[]=[];
    let testCalificaciones:any[]=[];
    testRecuperados=(this.listaTestPeruano);
    testRecuperados.forEach(element=>{testFechas.push(element.fecha);testCalificaciones.push(element.calificacion)});
    for(let i = 0 ; i<testCalificaciones.length;i++){
      let edad = 'f'+testRecuperados[i].edad.toString()
      this.formDatos_TestPeruano.get(edad).setValue(this.datePipe.transform(testFechas[i],'dd-MM-yyyy HH:mm:ss'));
      for(let j = 0;j<12;j++){
        let codigo = testCalificaciones[i][j].codigo;
        this.formDatos_TestPeruano.get(codigo).setValue(true);

      }
    }
  }

  async recuperarTestsBD(){
    this.testDesarrollo.listarTestPeruanoPlan(this.data.nroDocumento).subscribe((res: any) => {
      if(res.object!=null){
        res.object.forEach(element=>this.listaTestPeruano.push(element));
      }
    });
  }

}
export interface TestPeruano{
  id?:string;
  fecha?:string,
  edad?:string,
  diagnostico?:string,
  calificacion?:Calificacion[]
}
export interface Calificacion{
  codigo:string,
  desripcion:string,
  actividad:string,
  x:string,
  y:string
}