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
  facil = [
    { label: 'facil', value: true },
    { label: 'dificil', value: false }
  ];
  consideraFacil: boolean=false;
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
    this.listaPruebasVisuales = [
      {
        prueba:'INSPECCIÓN OCULAR',
        aplicacion:'El evaluador, a una distancia de 30 centímetros, dirige la fuente de luz hacia los ojos de la niña y el niño, valora las características de los párpados, pestañas, conjuntiva, transparencia de la córnea, presencia y forma de la pupila, así como la presencia de lagrimeo permanente o secreciones..',
        indicacion:'Anormalidad estructural',
        alteracion:'El resultado anormal está dado por la presencia de cualquier alteración anatómica o morfológica del ojo y/o sus anexos.',
        edad:'Recién nacido a 5 años'
      },
      {
        prueba:'REFLEJO DE PARPADEO',
        aplicacion:'Se explora aplicando una luz repentinamente sobre los ojos, provocando así el parpadeo de defensa. Aparece desde el nacimiento.',
        indicacion:'Respuesta a la luz pobre o ausente. ',
        alteracion:'La ausencia de este reflejo nos indicaría desde edad temprana una deficiencia visual severa. (Gessell, Fleming,Koupernik).',
        edad:'Recién nacido a 5 años'
      },
      {
        prueba:'REFLEJO PUPILAR',
        aplicacion:'Consiste en la contracción de la pupila por acción de la luz sobre la retina y se explora con una linterna u oftalmoscopio directo. Aparece en el nacimiento y permanece siempre.',
        indicacion:'Respuesta a la luz pobre o asimétrica.',
        alteracion:'El resultado anormal está dado por ausencia, disminución o asimetría del reflejo. Sospechar de Catarata Congénita o Retinoblastoma.',
        edad:'Recién nacido a 5 años'
      },
      {
        prueba:'REFLEJO ROJO BINOCULAR Test de Bruckner o Reflejo rojo retiniano',
        aplicacion:'A una distancia de 1 metro se dirige la luz del oftalmoscopio directo hacia ambos ojos del examinado y se observa, a través del mismo, buscando en el área de las pupilas presencia de un reflejo naranja-rojizo, bilateral y simétrico.',
        indicacion:'Ausente, opaco, asimétrico, presencia de un reflejo blanco o manchas negras en el reflejo rojo.',
        alteracion:'El resultado anormal está dado por ausencia, disminución o asimetría del reflejo. Sospechar de Catarata Congénita o Retinoblastoma.',
        edad:'Recién nacido a 5 años'
      },
      {
        prueba:'SEGUIMIENTO AMBOS OJOS',
        aplicacion:'A una distancia de 50 cm por delante de los ojos del/la niño(a)se busca que mire el objeto y lo siga con la mirada a medida que el examinador desplaza el objeto de un lado a otro. El ambiente debe estar bien iluminado, con los dos ojos descubiertos y en simultáneo.',
        indicacion:'Se considera anormal cuando a los 3 meses no sigue el objeto de colores llamativos durante el examen.',
        alteracion:'Incapacidad de fijación y seguimiento.',
        edad:'3 meses'
      },
      {
        prueba:'FIJACIÓN MONOCULAR',
        aplicacion:'Para evaluar el OD se ocluye el OI, se coloca a una distancia de 50cm por delante de los ojos de la niña (o), buscando que mire el objeto con el ojo descubierto. Luego el evaluador verifica que siga con la mirada mientras desplaza el objeto de un lado a otro. Seguidamente se procede a evaluar el OI.',
        alteracion:'Anormal, cuando a los 6m de edad o más hay ausencia de fijación. También indicativo de un hallazgo negativo el hecho en que la/el niña(o) llore o rechace la oclusión de uno de los ojos (del ojo que ve mejor). Sospecha de Ambliopía Profunda.',
        indicacion:'Incapacidad de fijación y seguimiento.',
        edad:'6, 12 y 36 meses'
      },
      {
        prueba:'REFLEJO LUMINOSO CORNEAL Test de Hirschberg',
        aplicacion:'Se realiza mediante una fuente de luz situada a 30 cm del puente nasal observando si hay reflejo luminoso en la pupila de ambos ojos, de manera simétrica.',
        alteracion:'Desalineamientos.',
        indicacion:'Asimétrico o desplazado. Signos de Estrabismo..',
        edad:'6 meses a 5 años'
      },
      {
        prueba:'COVER TEST cubrir/descubrir',
        aplicacion:'Se procederá a cubrir uno de los ojos, con un cono de cartulina blanca, al ser éste destapado luego de tres segundos, se observara un movimiento inmediato de fijación, esto significara que hay estrabismo. En caso que sea normal el ojo no se moverá.',
        alteracion:'Detectar tempranamente desalineamientos oculares como estrabismos o atropías.',
        indicacion:'Movimiento de uno o ambos ojos no tapados.',
        edad:'6 meses a 5 años'
      },
      {
        prueba:'AGUDEZA VISUAL',
        aplicacion:'Se utiliza la cartilla de Snellen de la “E” direccional, adaptada para 3 metros, de preferencia (puede utilizarse también la de 6 metros), en un lugar bien iluminado. Enseñarle al niño a contestar “para qué lado están las patitas del dibujo (E)”.Utilizar un oclusor para cubrir el ojo izquierdo e iniciar la evaluación del ojo derecho. Solicitar al menor que señale con su mano la direccionalidad de las barras de la letra “E” contenidas en cada fila, de izquierda a derecha. Empezar por la letra “E” más grande (superior), hasta que el niño manifieste que no ve la letra señalada o se equivoque en su direccionalidad. Anotar la agudeza visual que corresponde a la fracción ubicada al inicio de la última línea que pudo leer completa o la última línea en la que leyó más de la mitad de las letras u optotipos. Ocluir el ojo derecho y repetir secuencia con ojo izquierdo. En los niños que ya usan lentes evaluarlos con lentes puestos.',
        alteracion:'Es normal que la/el niña(o) a esta edad tenga una agudeza visual de 20/20 a 20/40. La diferencia de agudeza visual entre ambos ojos no debe superar 1 línea.',
        indicacion:'Agudeza visual ≤ 20/50 en cualquiera de los dos ojos o que la agudeza visual de un ojo con relación al otro difiera en dos líneas o más de la Cartilla de Snellen.',
        edad:'3 a 5 años'
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
      consideraFacil:new FormControl(''),
    })
  }
  verGuiaEvaluacionOcular(){
    this.displayMaximizable=true;
  }

}
