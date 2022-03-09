import { Component, OnInit } from '@angular/core';
import {TestPeruano} from "../../services/test-peruano/test-peruano.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {dato} from "../../../../../../../../models/data";
import {ConsultaGeneralService} from "../../../../../../services/consulta-general.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-test-peruano',
  templateUrl: './test-peruano.component.html',
  styleUrls: ['./test-peruano.component.css'],
  providers: [TestPeruano]
})
export class TestPeruanoComponent implements OnInit {
  imagenes: any[];
  value: boolean;
  formDatos_TestPeruano: FormGroup;
  listaTestPeruano: any[] = [];
  displayMaximizable: boolean;
  attributeLocalS = 'documento';
  evaluacionDesarrollo: any;
  edadEvaluar: number;
  displayPosition: boolean;
  position: string;
  datePipe = new DatePipe('en-US');
  codigosArr: any[] = [];
  estadoVisualizar = false;
  calificacion = [];
  enableAgregar: boolean = false;
  estadoHayDatosPlan: boolean = false;
  data: dato;
  edadMeses:number;
  color: string = "";
  preguntas: pregunta[] = [{
    codigo: 'A', descripcion: 'CONTROL DE CABEZA Y TRONCO SENTADO'
  },
    {codigo: 'B', descripcion: 'CONTROL DE CABEZA Y TRONCO ROTACIONES'},
    {codigo: 'C', descripcion: 'CONTROL DE CABEZA Y TRONCO EN MARCHA'},
    {codigo: 'D', descripcion: 'USO DEL BRAZO Y MANO'},
    {codigo: 'E', descripcion: 'VISION'},
    {codigo: 'F', descripcion: 'AUDICION'},
    {codigo: 'G', descripcion: 'LENGUAJE COMPRESIVO'},
    {codigo: 'H', descripcion: 'LENGUAJE EXPRESIVO'},
    {codigo: 'I', descripcion: 'COMPORTAMIENTO SOCIAL'},
    {codigo: 'J', descripcion: 'ALIMENTACIÓN, VESTIDO E HIGIENE'},
    {codigo: 'K', descripcion: 'JUEGO'},
    {codigo: 'L', descripcion: 'INTELIGENCIA Y APRENDIZAJE'},
  ];

  constructor(private testDesarrollo: TestPeruano,
              private form: FormBuilder, private consultaGeneralService: ConsultaGeneralService,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.builForm();
    this.testDesarrollo.getImagenes().then(data => {
          this.imagenes = data;
        }
    )
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    // this.encontrarDiagnostico();
    this.recuperarEdadNinio();
    this.showDialogEdad('top');
    if(isNaN(this.edadMeses)){
      this.showMessageErrorEdadNaN();
    }
    else{
      this.recuperarTestPlanCred();
      this.buscarTestPeruanoPorEdad();
      this.getTestPerunoBDTestPorConsulta();
    }
  }

  /**Mostrar la edad del niño en alerta**/
  showDialogEdad(position: string) {
    console.log("entrado a dialog", this.edadMeses);
    this.position = position;
    this.displayPosition = true;
  }

  showMessageErrorEdadNaN() {
    Swal.fire({
      icon: 'error',
      title: 'Test Peruano',
      text: '¡¡Error, la edad es incorrecta!!',
      showConfirmButton: false,
      timer: 2000,
    })
  }
  recuperarEdadNinio() {

    this.edadEvaluar = this.data.anio * 12 + this.data.mes
    this.edadMeses=this.edadEvaluar;
    if(isNaN(this.edadEvaluar)){
      this.enableAgregar = true;
    }
    if (
        this.edadMeses === 0) {
        this.enableAgregar = true;
    }
  }

  builForm() {
    this.formDatos_TestPeruano = this.form.group({
      /**Datos personales**/
      /*************LETTER A*************/
      A_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      A_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      A_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      A_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      A_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      A_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      A_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      A_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      A_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      A_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      A_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      A_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      A_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      A_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      A_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      A_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      A_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER B****/
      B_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      B_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      B_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      B_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      B_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      B_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      B_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      B_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      B_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      B_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      B_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      B_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      B_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      B_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      B_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      B_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      B_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /********LETTER C***********/
      C_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      C_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      C_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      C_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      C_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      C_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      C_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      C_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      C_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      C_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      C_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      C_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      C_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      C_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      C_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      C_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      C_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER D***********/
      D_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      D_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      D_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      D_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      D_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      D_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      D_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      D_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      D_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      D_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      D_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      D_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      D_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      D_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      D_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      D_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      D_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /********LETTER E***********/
      E_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      E_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      E_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      E_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      E_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      E_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      E_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      E_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      E_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      E_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      E_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      E_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      E_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      E_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      E_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      E_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      E_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER F***********/
      F_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      F_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      F_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      F_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      F_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      F_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      F_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      F_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      F_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      F_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      F_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      F_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      F_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      F_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      F_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      F_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      F_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /********LETTER G***********/
      G_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      G_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      G_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      G_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      G_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      G_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      G_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      G_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      G_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      G_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      G_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      G_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      G_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      G_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      G_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      G_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      G_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER H***********/
      H_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      H_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      H_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      H_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      H_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      H_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      H_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      H_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      H_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      H_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      H_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      H_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      H_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      H_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      H_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      H_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      H_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /********LETTER I***********/
      I_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      I_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      I_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      I_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      I_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      I_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      I_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      I_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      I_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      I_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      I_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      I_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      I_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      I_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      I_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      I_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      I_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER J***********/
      J_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      J_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      J_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      J_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      J_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      J_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      J_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      J_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      J_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      J_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      J_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      J_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      J_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      J_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      J_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      J_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      J_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /********LETTER K***********/
      K_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      K_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      K_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      K_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      K_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      K_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      K_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      K_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      K_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      K_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      K_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      K_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      K_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      K_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      K_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      K_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      K_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*******LETTER L***********/
      L_1: new FormControl({value: false, disabled: this.edadMeses < 1}),
      L_2: new FormControl({value: false, disabled: this.edadMeses < 2}),
      L_3: new FormControl({value: false, disabled: this.edadMeses < 3}),
      L_4: new FormControl({value: false, disabled: this.edadMeses < 4}),
      L_5: new FormControl({value: false, disabled: this.edadMeses < 5}),
      L_6: new FormControl({value: false, disabled: this.edadMeses < 6}),
      L_7: new FormControl({value: false, disabled: this.edadMeses < 7}),
      L_8: new FormControl({value: false, disabled: this.edadMeses < 8}),
      L_9: new FormControl({value: false, disabled: this.edadMeses < 9}),
      L_10: new FormControl({value: false, disabled: this.edadMeses < 10}),
      L_11: new FormControl({value: false, disabled: this.edadMeses < 11}),
      L_12: new FormControl({value: false, disabled: this.edadMeses < 12}),
      L_15: new FormControl({value: false, disabled: this.edadMeses < 15}),
      L_18: new FormControl({value: false, disabled: this.edadMeses < 18}),
      L_21: new FormControl({value: false, disabled: this.edadMeses < 21}),
      L_24: new FormControl({value: false, disabled: this.edadMeses < 24}),
      L_30: new FormControl({value: false, disabled: this.edadMeses < 30}),
      /*********fECHA**********/
      f1: new FormControl({value: false, disabled: this.edadMeses!=1}),
      f2: new FormControl({value: false, disabled: this.edadMeses!=2}),
      f3: new FormControl({value: false, disabled: this.edadMeses!=3}),
      f4: new FormControl({value: false, disabled: this.edadMeses!=4}),
      f5: new FormControl({value: false, disabled: this.edadMeses!=5}),
      f6: new FormControl({value: false, disabled: this.edadMeses!=6}),
      f7: new FormControl({value: false, disabled: this.edadMeses!=7}),
      f8: new FormControl({value: false, disabled: this.edadMeses!=8}),
      f9: new FormControl({value: false, disabled: this.edadMeses!=9}),
      f10: new FormControl({value: false, disabled: this.edadMeses!=10}),
      f11: new FormControl({value: false, disabled: this.edadMeses!=11}),
      f12: new FormControl({value: false, disabled: this.edadMeses!=12}),
      f15: new FormControl({value: false, disabled: this.edadMeses!=15}),
      f18: new FormControl({value: false, disabled: this.edadMeses!=18}),
      f21: new FormControl({value: false, disabled: this.edadMeses!=21}),
      f24: new FormControl({value: false, disabled: this.edadMeses!=24}),
      f30: new FormControl({value: false, disabled: this.edadMeses!=30}),
    })
  }

  getTestPerunoBDTestPorConsulta() {
    this.testDesarrollo.getTestPeruano(this.data.idConsulta).subscribe((res: any) => {
      console.log('se RECUPERO correctamente ', res.object);
      if (res.object != null || res.object != undefined) {
        this.estadoHayDatosPlan = true;
        this.color = "amarillo";
        this.enableAgregar = true;
        let cadena = {
          fecha: res.object.evaluacionDesarrolloMes.fecha,
          edad: res.object.evaluacionDesarrolloMes.edad,
          diagnostico: res.object.evaluacionDesarrolloMes.diagnostico
        }
        this.listaTestPeruano[0] = (cadena);
        this.evaluacionDesarrollo = res.object.evaluacionDesarrolloMes;
      } else {
        this.estadoHayDatosPlan = false;
      }
    });
  }

  recuperarTestPlanCred() {
    this.formDatos_TestPeruano.reset();
    this.testDesarrollo.getTestPeruanoPlan(this.data.nroDocumento).subscribe((res: any) => {
      if (res.object != null) {
        let testRecuperados: any[] = [];
        let testFechas: any[] = [];
        let testCalificaciones: any[] = [];
        testRecuperados = (res.object);
        console.log('TEST RECUPERADOS', testRecuperados);
        testRecuperados.forEach(element => {
          testFechas.push(element.fecha);
          testCalificaciones.push(element.calificacion)
        });
        console.log('Fechas', testFechas);
        for (let i = 0; i < testCalificaciones.length; i++) {
          let edad = 'f' + testRecuperados[i].edad.toString()
          this.formDatos_TestPeruano.get(edad).setValue(this.datePipe.transform(testFechas[i], 'dd-MM-yyyy HH:mm:ss'));
          console.log('edad' + edad);
          for (let j = 0; j < 12; j++) {
            let codigo = testCalificaciones[i][j].codigo;
            console.log('codigo' + codigo);
            this.formDatos_TestPeruano.get(codigo).setValue(true);

          }
        }
      } else {
        this.messageService.add({severity: 'info', summary: 'Test Peruano', detail: 'No hay registros anteriores'});
      }
    });
  }

  recuperarData() {
    console.log("evaluacion Desarrollo:", this.evaluacionDesarrollo);
    let x = this.evaluacionDesarrollo.calificacion[0].x;
    let y = this.evaluacionDesarrollo.calificacion[0].y;
    console.log(x, y);
    let calificaciones: any[] = [];
    // this.evaluacionDesarrollo.calificacion.forEach(element=>calificaciones.push(element.calificacion));
    for (let i = 0; i < this.evaluacionDesarrollo.calificacion.length; i++) {
      calificaciones.push(this.evaluacionDesarrollo.calificacion[i].codigo);
    }
    calificaciones.forEach(codigo => this.formDatos_TestPeruano.get(codigo).setValue(true))
    let codigo = this.evaluacionDesarrollo.calificacion[0].codigo;
    let edad = 'f' + this.evaluacionDesarrollo.edad.toString();
    this.formDatos_TestPeruano.get(codigo).setValue(true);
    this.formDatos_TestPeruano.get(edad).setValue(this.datePipe.transform(this.listaTestPeruano[0].fecha, 'dd-MM-yyyy HH:mm:ss'));
  }

  visualizar() {
      this.recuperarTestPlanCred();
      this.formDatos_TestPeruano.reset();
      this.estadoVisualizar = true;
      this.displayMaximizable = true;
      this.formDatos_TestPeruano.disable();
      this.recuperarData();
  }
  visualizar2() {
    this.recuperarTestPlanCred();
    this.formDatos_TestPeruano.reset();
    this.estadoVisualizar = true;
    this.displayMaximizable = true;
    this.formDatos_TestPeruano.disable();
  }
  // openEditar(row,data){
  //   this.formDatos_TestPeruano.enable();
  //   this.builForm();
  //   this.formDatos_TestPeruano.reset();
  //   this.estadoVisualizar=false;
  //   this.displayMaximizable = true;
  //   this.recuperarData();
  //
  //   for (let i = 0; i<this.codigosArr.length;i++){
  //     console.log(this.codigosArr[i]);
  //     console.log(this.formDatos_TestPeruano.value[this.codigosArr[i]]);
  //     if(this.formDatos_TestPeruano.value[this.codigosArr[i]]==false){
  //       this.codigosArr.splice(i,1);
  //     }
  //   }
  //   this.calificacion=[];
  //   for(let i = 0; i<this.codigosArr.length;i++){
  //     if(this.codigosArr[i]!=this.codigosArr[i+1]){
  //       this.calificacion.push({
  //         codigo:this.codigosArr[i],
  //         descripcion:this.encontrarPregunta(this.codigosArr[i]),
  //         actividad:this.encontrarPregunta(this.codigosArr[i]),
  //         x:this.convetirX(this.codigosArr[i]),
  //         y:this.convertirY(this.codigosArr[i])
  //       })
  //     }
  //   }
  // }
  convetirX(letra_numero) {
    let partes = letra_numero.split("_");
    if (partes[0] === 'A') {
      return 1;
    } else {
      if (partes[0] === 'B') {
        return 2;
      } else {
        if (partes[0] === 'C') {
          return 3;
        } else {
          if (partes[0] === 'D') {
            return 4;
          } else {
            if (partes[0] === 'E') {
              return 5;
            } else {
              if (partes[0] === 'F') {
                return 6;
              } else {
                if (partes[0] === 'G') {
                  return 7;
                } else {
                  if (partes[0] === 'H') {
                    return 8;
                  } else {
                    if (partes[0] === 'I') {
                      return 9;
                    } else {
                      if (partes[0] === 'J') {
                        return 10;
                      } else {
                        if (partes[0] === 'K') {
                          return 11;
                        } else {
                          return 12;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  convertirY(letra_numero) {
    let partes = letra_numero.split("_");
    return Number(partes[1])
  }

  recuperarFechaCampo(edad) {
    if (edad == 1) {
      return this.formDatos_TestPeruano.value.f1;
    } else {
      if (edad == 2) {
        return this.formDatos_TestPeruano.value.f2;
      } else {
        if (edad == 3) {
          return this.formDatos_TestPeruano.value.f3;
        } else {
          if (edad == 4) {
            return this.formDatos_TestPeruano.value.f4;
          } else {
            if (edad == 5) {
              return this.formDatos_TestPeruano.value.f5;
            } else {
              if (edad == 6) {
                return this.formDatos_TestPeruano.value.f6;
              } else {
                if (edad == 7) {
                  return this.formDatos_TestPeruano.value.f7;
                } else {
                  if (edad == 8) {
                    return this.formDatos_TestPeruano.value.f8;
                  } else {
                    if (edad == 9) {
                      return this.formDatos_TestPeruano.value.f9;
                    } else {
                      if (edad == 10) {
                        return this.formDatos_TestPeruano.value.f10;
                      } else {
                        if (edad == 11) {
                          return this.formDatos_TestPeruano.value.f11;
                        } else {
                          if (edad == 12) {
                            return this.formDatos_TestPeruano.value.f12;
                          } else {
                            if (edad == 15) {
                              return this.formDatos_TestPeruano.value.f15;
                            } else {
                              if (edad == 18) {
                                return this.formDatos_TestPeruano.value.f18;
                              } else {
                                if (edad == 21) {
                                  return this.formDatos_TestPeruano.value.f21;
                                } else {
                                  if (edad == 24) {
                                    return this.formDatos_TestPeruano.value.f24;
                                  } else {
                                    return this.formDatos_TestPeruano.value.f30;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  encontrarPregunta(codigo) {
    let partes = codigo.split("_");
    const index = this.preguntas.find(element => element.codigo === partes[0]);
    return index.descripcion;
  }

  addTestPeruano() {
    this.estadoVisualizar = false;
    for (let i = 0; i < this.codigosArr.length; i++) {
      if (this.formDatos_TestPeruano.value[this.codigosArr[i]] == false) {
        this.codigosArr.splice(i, 1);
      }
    }
    for (let i = 0; i < this.codigosArr.length; i++) {
      if (this.codigosArr[i] != this.codigosArr[i + 1]) {

        this.calificacion.push({
          codigo: this.codigosArr[i],
          descripcion: this.encontrarPregunta(this.codigosArr[i]),
          actividad: this.encontrarPregunta(this.codigosArr[i]),
          x: this.convetirX(this.codigosArr[i]),
          y: this.convertirY(this.codigosArr[i])
        })
      }
    }
  }
  encontrarDiagnostico(calificacion)
  {
    var calificacion2 = this.preguntas.map(element=>(element.codigo+"_"+this.edadMeses).toString())
    console.log(calificacion2)
    if(calificacion == calificacion2){
      return 'NORMAL'
    }
    else{
      return 'RETRASO'
    }
  }

  btnGuardar() {
    this.addTestPeruano();

    let fecha = (this.datePipe.transform(this.recuperarFechaCampo(this.edadMeses), 'yyyy-MM-dd HH:mm:ss'));
    let diagnostico=this.encontrarDiagnostico(this.calificacion);
    const data = {
      nombreEvaluacion: "TEST_PERUANO",
      codigoCIE10: "Z009",
      codigoHIS: "Z009",
      codigoPrestacion: '0001',
      estadoEvaluacion:"",
      evaluacionDesarrolloMes: {
        docExaminador:'24242424',
        edad: this.edadMeses,
        diagnostico: diagnostico,
        fecha: fecha,
        calificacion: this.calificacion
      }
    }
    let cadena = {
      fecha: data.evaluacionDesarrolloMes.fecha,
      edad: data.evaluacionDesarrolloMes.edad,
      diagnostico: data.evaluacionDesarrolloMes.diagnostico
    }
    this.listaTestPeruano[0] = (cadena);
    this.displayMaximizable = false;
    Swal.fire({
      title: 'Esta seguro que desea guardar este registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.testDesarrollo.addTestPeruano(this.data.idConsulta, data).subscribe((res: any) => {
          console.log('se guardo correctamente ', res.object);
          Swal.fire({
            icon: 'success',
            title: 'Test Peruano',
            text: 'Se guardo existosamente la evaluacion para la edad ' + this.edadMeses,
            showConfirmButton: false,
            timer: 2000,
          })
        });
        Swal.fire('Guardado!', '', 'success')
        this.getTestPerunoBDTestPorConsulta();
      } else if (result.isDenied) {
        Swal.fire('No se guardo este registro', '', 'info')
      }
    })
    this.codigosArr = [];
  }

  // btnActualizar(){
  //   this.addTestPeruano();
  //   let fecha = (this.datePipe.transform(this.recuperarFechaCampo(this.edadMeses),'yyyy-MM-dd HH:mm:ss'));
  //
  //   const data={
  //     nombreEvaluacion:"TEST_PERUANO",
  //     codigoCIE10:"Z009",
  //     codigoHIS:"Z009",
  //     codigoPrestacion:'0001',
  //     evaluacionDesarrolloMes:{
  //       edad:this.edadMeses,
  //       diagnostico:"Retraso",
  //       fecha:fecha,
  //       calificacion:this.calificacion
  //     }
  //   }
  //   this.testDesarrollo.updatePeruano(this.id,data).subscribe((res: any) => {
  //     console.log('se actualizo correctamente ', res.object);
  //   });
  //   this.codigosArr=[];
  // }

  guardarActualizar() {
    this.formDatos_TestPeruano.enabled;
    if (this.listaTestPeruano[0] != null) {
      this.enableAgregar = true;
      this.displayMaximizable = false;
      Swal.fire({
        icon: 'error',
        title: 'Test Peruano',
        text: 'Ya existe un registro de Test Peruano Guardado para esta consulta',
        showConfirmButton: false,
        timer: 2000,
      })
    } else {
      this.btnGuardar();
    }
  }

  buscarTestPeruanoPorEdad()
  {
    this.testDesarrollo.getUltimoTestPeruanoPorEdad(this.edadMeses,this.data.nroDocumento).subscribe((res: any) => {
     console.log(res.object);
     if(res.object!=null){
       this.enableAgregar=true;
     }
    });
  }
  cambiarEstado(codigo) {
    let cadenaAux = {}
    console.log("item seleccionado:", codigo);
    // this.codigosArr:any[]=[];
    if(this.formDatos_TestPeruano.value[codigo]==true){ this.codigosArr.push(codigo);}
  }
  openNuevoTestPeruano(){
    this.formDatos_TestPeruano.enable();
    this.builForm();
    this.formDatos_TestPeruano.reset();
    this.recuperarTestPlanCred();
    this.estadoVisualizar=false;
    this.displayMaximizable =true;
  }
}
interface pregunta{
  codigo?:string,
  descripcion?:string,
}
