import { Component, OnInit } from '@angular/core';
import {TestDesarrollo} from "../../../../../../../plan/component/evaluacion-general/test-desarrollo/test-desarrollo.service";
import {TestPeruano} from "../../services/test-peruano/tes-peruano.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-test-peruano',
  templateUrl: './test-peruano.component.html',
  styleUrls: ['./test-peruano.component.css'],
  providers: [TestPeruano]
})
export class TestPeruanoComponent implements OnInit {
  imagenes: any[];
  value: boolean;
  formDatos_TestPeruano:FormGroup;
  listaTestPeruano:any[]=[];
  displayMaximizable:boolean;
  constructor(private testDesarrollo: TestDesarrollo,
              private form: FormBuilder) { }

  ngOnInit(): void {
    this.builForm();
    this.testDesarrollo.getImagenes().then(data => {
          this.imagenes = data;
        }
    )
  }
  builForm(){
    this.formDatos_TestPeruano = this.form.group({
      /**Datos personales**/
      posicion1: new FormControl(''),
      posicion2: new FormControl(''),
      posicion3: new FormControl(''),
      posicion4: new FormControl(''),
      posicion5: new FormControl(''),
      posicion6: new FormControl(''),
      posicion7: new FormControl(''),
      posicion8: new FormControl(''),
      posicion9: new FormControl(''),
      posicion10: new FormControl(''),
      posicion11: new FormControl(''),
      posicion12: new FormControl(''),
      posicion15: new FormControl(''),
      posicion18: new FormControl(''),
      posicion21: new FormControl(''),
      posicion24: new FormControl(''),
      posicion30: new FormControl(''),

      fecha1:new FormControl(''),
      fecha2: new FormControl(''),
      fecha3: new FormControl(''),
      fecha4: new FormControl(''),
      fecha5: new FormControl(''),
      fecha6: new FormControl(''),
      fecha7: new FormControl(''),
      fecha8: new FormControl(''),
      fecha9: new FormControl(''),
      fecha10: new FormControl(''),
      fecha11: new FormControl(''),
      fecha12: new FormControl(''),
      fecha13: new FormControl(''),
      fecha14: new FormControl(''),
      fecha15: new FormControl(''),
      fecha16: new FormControl(''),
      fecha17: new FormControl(''),
      fecha18: new FormControl(''),
      fecha21: new FormControl(''),
      fecha24: new FormControl(''),
      fecha30: new FormControl(''),
    })
  }
  cambiarEstado(sale,rowIndex) {
    let cadenaAux = {}
    console.log("item seleccionado:");
    console.log("item seleccionado:" ,sale);
    console.log("item seleccionado:", rowIndex);
    console.log(this.formDatos_TestPeruano.value.posicion1);
    let letter = sale.letter;
    let texto = sale.texto;
    let x=rowIndex;
    let fecha1 = this.formDatos_TestPeruano.value.fecha1;


  }
  openTestPeruano(){
    console.log("abriendo test Peruano");
    this.displayMaximizable = true;
  }
}
