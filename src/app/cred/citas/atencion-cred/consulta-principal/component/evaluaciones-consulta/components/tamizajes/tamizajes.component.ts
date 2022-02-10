import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  formTamizajeCred:FormGroup;
  listaPruebasVisuales:any[]=[];
  displayMaximizable:boolean;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
    this.listaPruebasVisuales = [
      {
        prueba:'INSPECCIÓN',
        aplicacion:'Observación de los ojos del niño a simple vista con la ayuda de una linterna, tomando en cuenta características tales como simetría de la cabeza, posición inclinada o girada de la cabeza, posición y forma de las orejas, ptosis palpebral, anomalías en forma de la hendidura palpebral, y cualquier alteración respecto del aspecto normal del globo ocular (anomalía estructural), opacidades del cristalino.',
        indicacion:'Anomalía estructural',
        edad:'Recién nacido a tres meses'
      },
      {
        prueba:'FIJACIÓN Y SEGUIMIENTO',
        aplicacion:'El reflejo de fijación está desarrollado hacia los dos meses de edad. Utilizando un objeto pequeño se evalúa la capacidad para realizar fijación del objeto, se evalúa si la fijación es central,y se evalúa si es capaz de realizar un adecuado seguimiento del objeto (30 centímetros de distancia), esta prueba se realiza primero evaluando ambos ojos por separado, ocluyendo un ojo para evaluar el otro, y posteriormente se evalúan ambos ojos al tiempo, principalmente en los niños o niñas que presentan estrabismo, para evaluar si el paciente tiene un ojo preferido para la fijación.',
        indicacion:'Falla de fijación y seguimiento ',
        edad:'Tres a seis meses'
      },
      {
        prueba:'REFLEJO CORNEAL(TEST DE HIRSCHBERG)',
        aplicacion:'Se realiza con una linterna situada a 30 cm del puente nasal observando si el reflejo luminoso es simétrico en ambos ojos (mirar los puntitos de luz en la córnea y ver dónde caen con respecto al iris)',
        indicacion:'Asimétrico',
        edad:'Seis meses a doce meses'
      },
      {
        prueba:'REFLEJO CORNEAL O COVER-UNCOVER',
        aplicacion:'Lograr que el niño fije la mirada en una imagen y cubrir uno de los ojos (uno a dos segundos) con un trozo de cartulina blanca, y observar si el otro permanece quieto o si realiza movimiento de refijación. Repetir la prueba con el otro ojo.Si se evidencia algún movimiento de refi jación es indicadorde estrabismo. Referir al oftalmólogo',
        indicacion:'Reflejo corneal asimétrico o movimientos de reflejacion al cover–uncover',
        edad:'Doce meses a tres años'
      },
      {
        prueba:'TABLA DE AGUDEZA VISUAL DE SNELLEN',
        aplicacion:'Utilizar Tabla de Snellen apropiada para la edad (signos alfabéticos o direccionales). Realizar el examen en un espacio bien iluminado y a una distancia de 6 metros entreel niño y la Tabla de Snellen. Evaluación individual de cadauno de los ojos, tapando el ojo no examinado, sin cerrarlo, ni ejercer presión sobre el mismo. No debe saltarseninguna línea. Se toma como agudeza visual el valor al ladode la última línea que el niño contestó correctamente. Enlos niños que ya usan lentes evaluarlos con lentes puestos',
        indicacion:'Niños que vean menos de 20/40 con cualquier ojo o con una diferencia de más de dos líneas entre los dos ojos, en dos evaluaciones repetidas. ',
        edad:'Tres a cinco años'
      },
    ]
  }
  builForm(){
    this.formTamizajeCred = this.formBuilder.group({
      tamizajeAuditivo:new FormControl(''),
      prematuro:new FormControl(''),
      uci:new FormControl(''),
      billirubina:new FormControl(''),
      perdidaAudicion:new FormControl(''),
      infeccionOido:new FormControl(''),
      meningitis:new FormControl(''),
      expuestoSonido:new FormControl(''),
      ojoDerecho:new FormControl(''),
      ojoIzquierdo:new FormControl(''),
      descripcionTamizajeOcular:new FormControl(''),
      estomatologico:new FormControl(''),
      tamizajeMental:new FormControl(''),
    })
  }
  verGuiaEvaluacionOcular(){
    this.displayMaximizable=true;
  }

}
