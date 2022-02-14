import { Component, OnInit } from '@angular/core';
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
  events:any[];
  constructor(private testDesarrollo: TestPeruano,
              private form: FormBuilder) { }

  ngOnInit(): void {
    this.builForm();
    this.testDesarrollo.getImagenes().then(data => {
          this.imagenes = data;
        }
    )
    this.events = [
      {status: 'A', date: '15/10/2020 10:30', color: '#9C27B0', edad:'1m'},
      {status: 'B', date: '15/10/2020 10:30', color: '#9C27B0', edad:'2m'},
      {status: 'C', date: '15/10/2020 10:30', color: '#9C27B0', edad:'2m'},
      {status: 'D', date: '15/10/2020 10:30', color: '#9C27B0', edad:'2m'},
      {status: 'E', date: '15/10/2020 10:30', color: '#9C27B0', edad:'2m'},
      {status: 'F', date: '15/10/2020 10:30', color: '#9C27B0', edad:'2m'},
    ];
  }
  builForm(){
    this.formDatos_TestPeruano = this.form.group({
      /**Datos personales**/
      posicion1: new FormControl(''),
      fecha:new FormControl(''),
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
