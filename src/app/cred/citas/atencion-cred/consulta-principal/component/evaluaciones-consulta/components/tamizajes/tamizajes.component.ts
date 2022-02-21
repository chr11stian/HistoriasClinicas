import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {EvaluacionAlimentacionService} from "../../services/evaluacion-alimentacion.service";
import {dato} from "../../../../../../models/data";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  formTamizajeCred: FormGroup;
  listaPruebasVisuales: any[] = [];
  displayMaximizable: boolean;
  attributeLocalS = 'documento';
  data:dato;
  sino = [
    {label: 'SI', value: 'si'},
    {label: 'NO', value: 'no'}
  ];
  facil = [
    {label: 'facil', value: 'facil'},
    {label: 'dificil', value: 'dificil'}
  ];
  idConsulta = '6206f0460318fd575a0b4f6b';
  consideraFacil: boolean = false;
  tamizajes:any;
  idFichaTamizaje = "6206f0460318fd575a0b4f6b";
  tamizajesActualizar:any;
  constructor(private formBuilder: FormBuilder,
              private evalAlimenService: EvaluacionAlimentacionService) {
    this.builForm();
  }

  ngOnInit(): void {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.listaPruebasVisuales = [
      {
        prueba: 'INSPECCIÓN OCULAR',
        aplicacion: 'El evaluador, a una distancia de 30 centímetros, dirige la fuente de luz hacia los ojos de la niña y el niño, valora las características de los párpados, pestañas, conjuntiva, transparencia de la córnea, presencia y forma de la pupila, así como la presencia de lagrimeo permanente o secreciones..',
        indicacion: 'Anormalidad estructural',
        alteracion: 'El resultado anormal está dado por la presencia de cualquier alteración anatómica o morfológica del ojo y/o sus anexos.',
        edad: 'Recién nacido a 5 años'
      },
      {
        prueba: 'REFLEJO DE PARPADEO',
        aplicacion: 'Se explora aplicando una luz repentinamente sobre los ojos, provocando así el parpadeo de defensa. Aparece desde el nacimiento.',
        indicacion: 'Respuesta a la luz pobre o ausente. ',
        alteracion: 'La ausencia de este reflejo nos indicaría desde edad temprana una deficiencia visual severa. (Gessell, Fleming,Koupernik).',
        edad: 'Recién nacido a 5 años'
      },
      {
        prueba: 'REFLEJO PUPILAR',
        aplicacion: 'Consiste en la contracción de la pupila por acción de la luz sobre la retina y se explora con una linterna u oftalmoscopio directo. Aparece en el nacimiento y permanece siempre.',
        indicacion: 'Respuesta a la luz pobre o asimétrica.',
        alteracion: 'El resultado anormal está dado por ausencia, disminución o asimetría del reflejo. Sospechar de Catarata Congénita o Retinoblastoma.',
        edad: 'Recién nacido a 5 años'
      },
      {
        prueba: 'REFLEJO ROJO BINOCULAR Test de Bruckner o Reflejo rojo retiniano',
        aplicacion: 'A una distancia de 1 metro se dirige la luz del oftalmoscopio directo hacia ambos ojos del examinado y se observa, a través del mismo, buscando en el área de las pupilas presencia de un reflejo naranja-rojizo, bilateral y simétrico.',
        indicacion: 'Ausente, opaco, asimétrico, presencia de un reflejo blanco o manchas negras en el reflejo rojo.',
        alteracion: 'El resultado anormal está dado por ausencia, disminución o asimetría del reflejo. Sospechar de Catarata Congénita o Retinoblastoma.',
        edad: 'Recién nacido a 5 años'
      },
      {
        prueba: 'SEGUIMIENTO AMBOS OJOS',
        aplicacion: 'A una distancia de 50 cm por delante de los ojos del/la niño(a)se busca que mire el objeto y lo siga con la mirada a medida que el examinador desplaza el objeto de un lado a otro. El ambiente debe estar bien iluminado, con los dos ojos descubiertos y en simultáneo.',
        indicacion: 'Se considera anormal cuando a los 3 meses no sigue el objeto de colores llamativos durante el examen.',
        alteracion: 'Incapacidad de fijación y seguimiento.',
        edad: '3 meses'
      },
      {
        prueba: 'FIJACIÓN MONOCULAR',
        aplicacion: 'Para evaluar el OD se ocluye el OI, se coloca a una distancia de 50cm por delante de los ojos de la niña (o), buscando que mire el objeto con el ojo descubierto. Luego el evaluador verifica que siga con la mirada mientras desplaza el objeto de un lado a otro. Seguidamente se procede a evaluar el OI.',
        alteracion: 'Anormal, cuando a los 6m de edad o más hay ausencia de fijación. También indicativo de un hallazgo negativo el hecho en que la/el niña(o) llore o rechace la oclusión de uno de los ojos (del ojo que ve mejor). Sospecha de Ambliopía Profunda.',
        indicacion: 'Incapacidad de fijación y seguimiento.',
        edad: '6, 12 y 36 meses'
      },
      {
        prueba: 'REFLEJO LUMINOSO CORNEAL Test de Hirschberg',
        aplicacion: 'Se realiza mediante una fuente de luz situada a 30 cm del puente nasal observando si hay reflejo luminoso en la pupila de ambos ojos, de manera simétrica.',
        alteracion: 'Desalineamientos.',
        indicacion: 'Asimétrico o desplazado. Signos de Estrabismo..',
        edad: '6 meses a 5 años'
      },
      {
        prueba: 'COVER TEST cubrir/descubrir',
        aplicacion: 'Se procederá a cubrir uno de los ojos, con un cono de cartulina blanca, al ser éste destapado luego de tres segundos, se observara un movimiento inmediato de fijación, esto significara que hay estrabismo. En caso que sea normal el ojo no se moverá.',
        alteracion: 'Detectar tempranamente desalineamientos oculares como estrabismos o atropías.',
        indicacion: 'Movimiento de uno o ambos ojos no tapados.',
        edad: '6 meses a 5 años'
      },
      {
        prueba: 'AGUDEZA VISUAL',
        aplicacion: 'Se utiliza la cartilla de Snellen de la “E” direccional, adaptada para 3 metros, de preferencia (puede utilizarse también la de 6 metros), en un lugar bien iluminado. Enseñarle al niño a contestar “para qué lado están las patitas del dibujo (E)”.Utilizar un oclusor para cubrir el ojo izquierdo e iniciar la evaluación del ojo derecho. Solicitar al menor que señale con su mano la direccionalidad de las barras de la letra “E” contenidas en cada fila, de izquierda a derecha. Empezar por la letra “E” más grande (superior), hasta que el niño manifieste que no ve la letra señalada o se equivoque en su direccionalidad. Anotar la agudeza visual que corresponde a la fracción ubicada al inicio de la última línea que pudo leer completa o la última línea en la que leyó más de la mitad de las letras u optotipos. Ocluir el ojo derecho y repetir secuencia con ojo izquierdo. En los niños que ya usan lentes evaluarlos con lentes puestos.',
        alteracion: 'Es normal que la/el niña(o) a esta edad tenga una agudeza visual de 20/20 a 20/40. La diferencia de agudeza visual entre ambos ojos no debe superar 1 línea.',
        indicacion: 'Agudeza visual ≤ 20/50 en cualquiera de los dos ojos o que la agudeza visual de un ojo con relación al otro difiera en dos líneas o más de la Cartilla de Snellen.',
        edad: '3 a 5 años'
      },
    ]
    this.recuperarTamizajesBD();
  }

  builForm() {
    this.formTamizajeCred = this.formBuilder.group({
      tamizajeAuditivo: new FormControl(''),
      prematuro: new FormControl(''),
      hayViolencia: new FormControl(''),
      alguienInsulta: new FormControl(''),
      alguienGolpea: new FormControl(''),
      alguienChantajea: new FormControl(''),
      obligaRS: new FormControl(''),
      hijoFacil: new FormControl(''),
      pierdeControl: new FormControl(''),
      pega: new FormControl(''),
      grita: new FormControl(''),
      encierra: new FormControl(''),
      esDesobediente: new FormControl(''),
      tieneHematomas: new FormControl(''),
      tieneCicatrices: new FormControl(''),
      tieneFacturas: new FormControl(''),
      tieneMarcas: new FormControl(''),
      tieneLesiones: new FormControl(''),
      tieneLaceraciones: new FormControl(''),
      tieneQuejasCronicas: new FormControl(''),
      tieneProblemasApetito: new FormControl(''),
      tieneEnuresis: new FormControl(''),
      tieneFalta: new FormControl(''),
      tieneTristeza: new FormControl(''),
      tieneRetraimiento: new FormControl(''),
      tieneLlanto: new FormControl(''),
      tieneNecesidad: new FormControl(''),
      tieneDemanda: new FormControl(''),
      tieneAgresividad: new FormControl(''),
      tieneTartamudeo: new FormControl(''),
      tieneTemor: new FormControl(''),
      Roba: new FormControl(''),
      tieneAutismo: new FormControl(''),
      llegaTarde: new FormControl(''),
      bajoRendimiento: new FormControl(''),
      seAisla: new FormControl(''),
      intentaSuicidio: new FormControl(''),
      faltaPeso: new FormControl(''),
      noVacunado: new FormControl(''),
      tieneAccidentes: new FormControl(''),
      esDescuidado: new FormControl(''),
      faltaEstimulacion: new FormControl(''),
      tieneFatiga: new FormControl(''),
      conductaInapropiada: new FormControl(''),
      tieneIrritacion: new FormControl(''),
      tieneEnfermedad: new FormControl(''),
      tamizajeMental: new FormControl(''),
      ojoDerecho: new FormControl(''),
      ojoIzquierdo: new FormControl(''),
      descripcionTamizajeOcular: new FormControl(''),
      estomatologico: new FormControl(''),
      expuestoSonido: new FormControl(''),
      meningitis: new FormControl(''),
      infeccionOido: new FormControl(''),
      perdidaAudicion: new FormControl(''),
      billirubina: new FormControl(''),
      uci: new FormControl(''),
      empuja: new FormControl(''),
      quienObligaRS: new FormControl(''),
      consideraFacil: new FormControl(''),
    })
  }

  verGuiaEvaluacionOcular() {
    this.displayMaximizable = true;
  }

  recuperarTamizajesBD() {
    this.evalAlimenService.getTamizajeCred(this.data.idConsulta).subscribe((res: any) => {
      console.log('se edito correctamente ', res.object);
      this.idFichaTamizaje = res.object.id;
      let negligencia: any = res.object.negligencia;
      let auditivo: any = res.object.auditivo;
      let observacionesAuditivo: any = res.object.observacionesAuditivo;
      let alteracionVisual: any = res.object.alteracionVisual;
      let fisico: any = res.object.fisico;
      let otrasPreguntas: any = res.object.otrasPreguntas;
      let psicologico: any = res.object.psicologico;
      let resultado: any = res.object.resultado;
      let sexuales: any = res.object.sexuales;


      /********** RECUPERAR TAMIZAJE VIF**************/
      this.formTamizajeCred.get('hayViolencia').setValue(otrasPreguntas[0].valor);
      this.formTamizajeCred.get('alguienInsulta').setValue(otrasPreguntas[1].valor);
      this.formTamizajeCred.get('alguienGolpea').setValue(otrasPreguntas[2].valor);
      this.formTamizajeCred.get('alguienChantajea').setValue(otrasPreguntas[3].valor);
      this.formTamizajeCred.get('obligaRS').setValue(otrasPreguntas[4].valor);
      this.formTamizajeCred.get('quienObligaRS').setValue(otrasPreguntas[4].descripcion);
      if(otrasPreguntas[4].valor='facil'){this.formTamizajeCred.get('hijoFacil').setValue('facil');}
      else{
          this.formTamizajeCred.get('hijoFacil').setValue('dificil');
      }
      this.formTamizajeCred.get('pierdeControl').setValue(otrasPreguntas[6].valor);
      if(otrasPreguntas[7].valor=='si'){
        this.formTamizajeCred.get('pega').setValue(true);
      }
      if(otrasPreguntas[8].valor='si'){
        this.formTamizajeCred.get('grita').setValue(true);
      }
      if(otrasPreguntas[9].valor=='si'){
        this.formTamizajeCred.get('empuja').setValue(true);
      }
      if(otrasPreguntas[10].valor=='si'){
        this.formTamizajeCred.get('encierra').setValue(true);
      }
      this.formTamizajeCred.get('esDesobediente').setValue(otrasPreguntas[11].valor);


      /********fisico************/
      if(fisico[0].valor=='si'){this.formTamizajeCred.get('tieneHematomas').setValue(true);}
      if(fisico[1].valor=='si'){this.formTamizajeCred.get('tieneCicatrices').setValue(true);}
      if(fisico[2].valor=='si'){this.formTamizajeCred.get('tieneFacturas').setValue(true);}
      if(fisico[3].valor=='si'){this.formTamizajeCred.get('tieneMarcas').setValue(true);}
      if(fisico[4].valor=='si'){this.formTamizajeCred.get('tieneLesiones').setValue(true);}
      if(fisico[5].valor=='si'){this.formTamizajeCred.get('tieneLaceraciones').setValue(true);}
      if(fisico[6].valor=='si'){this.formTamizajeCred.get('tieneQuejasCronicas').setValue(true);}
      if(fisico[7].valor=='si'){this.formTamizajeCred.get('tieneProblemasApetito').setValue(true);}
      if(fisico[8].valor=='si'){this.formTamizajeCred.get('tieneEnuresis').setValue(true);}
      /********psicologico*******/

      if(psicologico[0].valor=='si'){this.formTamizajeCred.get('tieneFalta').setValue(true);}
      if(psicologico[1].valor=='si'){this.formTamizajeCred.get('tieneTristeza').setValue(true);}
      if(psicologico[2].valor=='si'){this.formTamizajeCred.get('tieneRetraimiento').setValue(true);}
      if(psicologico[3].valor=='si'){this.formTamizajeCred.get('tieneLlanto').setValue(true);}
      if(psicologico[4].valor=='si'){this.formTamizajeCred.get('tieneNecesidad').setValue(true);}
      if(psicologico[5].valor=='si'){this.formTamizajeCred.get('tieneDemanda').setValue(true);}
      if(psicologico[6].valor=='si'){this.formTamizajeCred.get('tieneAgresividad').setValue(true);}
      if(psicologico[7].valor=='si'){this.formTamizajeCred.get('tieneTartamudeo').setValue(true);}
      if(psicologico[8].valor=='si'){this.formTamizajeCred.get('tieneTemor').setValue(true);}
      if(psicologico[9].valor=='si'){this.formTamizajeCred.get('Roba').setValue(true);}
      if(psicologico[10].valor=='si'){this.formTamizajeCred.get('tieneAutismo').setValue(true);}
      if(psicologico[11].valor=='si'){this.formTamizajeCred.get('llegaTarde').setValue(true);}
      if(psicologico[12].valor=='si'){this.formTamizajeCred.get('bajoRendimiento').setValue(true);}
      if(psicologico[13].valor=='si'){this.formTamizajeCred.get('seAisla').setValue(true);}
      if(psicologico[14].valor=='si'){this.formTamizajeCred.get('intentaSuicidio').setValue(true);}
      /********negligencia*******/
      if(negligencia[0].valor=='si'){this.formTamizajeCred.get('faltaPeso').setValue(true);}
      if(negligencia[1].valor=='si'){this.formTamizajeCred.get('noVacunado').setValue(true);}
      if(negligencia[2].valor=='si'){this.formTamizajeCred.get('tieneAccidentes').setValue(true);}
      if(negligencia[3].valor=='si'){this.formTamizajeCred.get('esDescuidado').setValue(true);}
      if(negligencia[4].valor=='si'){this.formTamizajeCred.get('faltaEstimulacion').setValue(true);}
      if(negligencia[5].valor=='si'){this.formTamizajeCred.get('tieneFatiga').setValue(true);}
      /********sexuales**********/
      if(sexuales[0].valor=='si'){this.formTamizajeCred.get('conductaInapropiada').setValue(true);}
      if(sexuales[1].valor=='si'){this.formTamizajeCred.get('tieneIrritacion').setValue(true);}
      if(sexuales[2].valor=='si'){this.formTamizajeCred.get('tieneEnfermedad').setValue(true);}
      this.formTamizajeCred.get('tamizajeMental').setValue(resultado.valor);
      /*******RECUPERAR ALTERACIONES VISUALES******/
      this.formTamizajeCred.get('ojoDerecho').setValue(alteracionVisual.ojoDerecho);
      this.formTamizajeCred.get('ojoIzquierdo').setValue(alteracionVisual.ojoIzquierdo);
      this.formTamizajeCred.get('descripcionTamizajeOcular').setValue(alteracionVisual.descripcion);
      /*************RECUPERAR TAMIZAJE AUDITIVO*******************/
      this.formTamizajeCred.get("tamizajeAuditivo").setValue(observacionesAuditivo);
      if (auditivo[0].valor) {
        this.formTamizajeCred.get("prematuro").setValue(auditivo[0].valor);
      }
      if (auditivo[1].valor) {
        this.formTamizajeCred.get("uci").setValue(auditivo[1].valor);
      }
      if (auditivo[2].valor) {
        this.formTamizajeCred.get("billirubina").setValue(auditivo[2].valor);
      }
      if (auditivo[3].valor) {
        this.formTamizajeCred.get("perdidaAudicion").setValue(auditivo[3].valor);
      }
      if (auditivo[4].valor) {
        this.formTamizajeCred.get("infeccionOido").setValue(auditivo[4].valor);
      }
      if (auditivo[5].valor) {
        this.formTamizajeCred.get("meningitis").setValue(auditivo[5].valor);
      }
      if (auditivo[6].valor) {
        this.formTamizajeCred.get("expuestoSonido").setValue(auditivo[6].valor);
      }
    });
  }

  getTamizaje() {
    /************FISICOS***************/
    let fisicos: any[] = [];
    if (this.formTamizajeCred.value.tieneHematomas == true)
    {
      let aux = {
        clave: "Hematomas, contusiones inexplicables",
        valor: 'si',
        descripcion: "Hematomas, contusiones inexplicables"
      }
      fisicos.push(aux);
    }
    else{
        let aux = {
            clave: "Hematomas, contusiones inexplicables",
            valor: 'no',
            descripcion: "Hematomas, contusiones inexplicables"
        }
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneCicatrices == true) {
      let aux = {clave: "Cicatrices, quemaduras", valor: 'si', descripcion: "Cicatrices, quemaduras"}
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Cicatrices, quemaduras", valor: 'no', descripcion: "Cicatrices, quemaduras"}
        fisicos.push(aux); }
    if (this.formTamizajeCred.value.tieneFacturas == 'si') {
      let aux = {clave: "Fracturas inexpliables", valor: 'si', descripcion: "Fracturas inexpliables"}
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Fracturas inexpliables", valor: 'no', descripcion: "Fracturas inexpliables"}
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneMarcas == true) {
      let aux = {clave: "Marcas de mordeduras", valor: 'si', descripcion: "Marcas de mordeduras"}
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Marcas de mordeduras", valor: 'no', descripcion: "Marcas de mordeduras"}
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneLesiones == true) {
      let aux = {clave: "Lesiones de perineo, vulva, recto, etc", valor: 'si', descripcion: "Lesiones de perineo, vulva, recto, etc"
      }
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Lesiones de perineo, vulva, recto, etc", valor: 'no', descripcion: "Lesiones de perineo, vulva, recto, etc"
        }
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneLaceraciones == true) {
      let aux = { clave: "Laceraciones en boca mejillas, ojos, etc", valor: 'si', descripcion: "Laceraciones en boca mejillas, ojos, etc"
      }
      fisicos.push(aux);
    }
    else{
        let aux = { clave: "Laceraciones en boca mejillas, ojos, etc", valor: 'no', descripcion: "Laceraciones en boca mejillas, ojos, etc"
        }
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneQuejasCronicas == true) {
      let aux = {
        clave: "Quejas crónicas sin causa física, cefalea, problemas de sueño (mucho sueño interrupciones del sueño)",
        valor: 'si',
        descripcion: "Quejas crónicas sin causa física, cefalea, problemas de sueño (mucho sueño interrupciones del sueño)"
      }
      fisicos.push(aux);
    }
    else{
        let aux = {
            clave: "Quejas crónicas sin causa física, cefalea, problemas de sueño (mucho sueño interrupciones del sueño)",
            valor: 'no',
            descripcion: "Quejas crónicas sin causa física, cefalea, problemas de sueño (mucho sueño interrupciones del sueño)"
        }
        fisicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneProblemasApetito == true) {
      let aux = {clave: "Problemas con el apetito", valor: 'si', descripcion: "Problemas con el apetito"}
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Problemas con el apetito", valor: 'no', descripcion: "Problemas con el apetito"}
        fisicos.push(aux)
    }
    if (this.formTamizajeCred.value.tieneEnuresis == true) {
      let aux = {clave: "Enuresis (niños)", valor: 'si', descripcion: "Enuresis (niños)"}
      fisicos.push(aux);
    }
    else{
        let aux = {clave: "Enuresis (niños)", valor: 'no', descripcion: "Enuresis (niños)"}
        fisicos.push(aux);
    }
    /***********PSICOLOGICO************/
    let psicologicos: any[] = [];
    if (this.formTamizajeCred.value.tieneFalta == true) {
      let aux = {
        clave: "Extrema falta de confianza en si mismo",
        valor: 'si',
        descripcion: "Extrema falta de confianza en si mismo"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Extrema falta de confianza en si mismo",
            valor: 'no',
            descripcion: "Extrema falta de confianza en si mismo"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneTristeza == true) {
      let aux = {clave: "Tristeza, depresión o angustia", valor: 'si', descripcion: "Tristeza, depresión o angustia"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Tristeza, depresión o angustia", valor: 'no', descripcion: "Tristeza, depresión o angustia"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneRetraimiento == true) {
      let aux = {clave: "Retraimiento", valor: 'si', descripcion: "Retraimiento"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Retraimiento", valor: 'no', descripcion: "Retraimiento"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneLlanto == true) {
      let aux = {clave: "Llanto frecuente", valor: 'si', descripcion: "Llanto frecuente"}
      psicologicos.push(aux);
    }
    else{
      let aux = {clave: "Llanto frecuente", valor: 'no', descripcion: "Llanto frecuente"}
      psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneNecesidad == true) {
      let aux = {
        clave: "Exagerada necesidad de ganar, sobresalir",
        valor: 'si',
        descripcion: "Exagerada necesidad de ganar, sobresalir"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Exagerada necesidad de ganar, sobresalir",
            valor: 'no',
            descripcion: "Exagerada necesidad de ganar, sobresalir"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneDemanda == true) {
      let aux = {clave: "Demanda excesiva de atención", valor: 'si', descripcion: "Demanda excesiva de atención"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Demanda excesiva de atención", valor: 'no', descripcion: "Demanda excesiva de atención"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneAgresividad == true) {
      let aux = {
        clave: "Mucha agresividad o mucha pasividad frente a otros niños", valor: 'si', descripcion: "Mucha agresividad o mucha pasividad frente a otros niños"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Mucha agresividad o mucha pasividad frente a otros niños", valor: 'no', descripcion: "Mucha agresividad o mucha pasividad frente a otros niños"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneTartamudeo == true) {
      let aux = {clave: "Tartamudeo", valor: 'si', descripcion: "Tartamudeo"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Tartamudeo", valor: 'no', descripcion: "Tartamudeo"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneTemor == true) {
      let aux = {
        clave: "Temor a los padres o de llegar al hogar",valor: 'si', descripcion: "Temor a los padres o de llegar al hogar"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Temor a los padres o de llegar al hogar", valor: 'no', descripcion: "Temor a los padres o de llegar al hogar"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.Roba == true) {
      let aux = {
        clave: "Robo, mentira, fuga, desobediencia, agresividad", valor: 'si', descripcion: "Robo, mentira, fuga, desobediencia, agresividad"
      }
      psicologicos.push(aux);
    }else{
        let aux = {
            clave: "Robo, mentira, fuga, desobediencia, agresividad", valor: 'no', descripcion: "Robo, mentira, fuga, desobediencia, agresividad"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.tieneAutismo == true) {
      let aux = {
        clave: "Autismo escolar", valor: 'si', descripcion: "Autismo escolar"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Extrema falta de confianza en si mismo",
            valor: 'no',
            descripcion: "Extrema falta de confianza en si mismo"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.llegaTarde == true) {
      let aux = {clave: "Llegar tarde a la escuela o retirarse tarde", valor: 'si', descripcion: "Llegar tarde a la escuela o retirarse tarde"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Autismo escolar", valor: 'no', descripcion: "Autismo escolar"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.bajoRendimiento == true) {
      let aux = {
        clave: "Bajo rendimiento académico", valor: 'si', descripcion: "Bajo rendimiento académico"
      }
      psicologicos.push(aux);
    }
    else{
        let aux = {
            clave: "Llegar tarde a la escuela o retirarse tarde",
            valor: 'no',
            descripcion: "Llegar tarde a la escuela o retirarse tarde"
        }
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.seAisla == true) {
      let aux = {clave: "Aislamiento de personas", valor: 'si', descripcion: "Aislamiento de personas"}
      psicologicos.push(aux);
    }
    else{
        let aux = {clave: "Aislamiento de personas", valor: 'no', descripcion: "Aislamiento de personas"}
        psicologicos.push(aux);
    }
    if (this.formTamizajeCred.value.intentaSuicidio == true) {
      let aux = {clave: "Intento de suicidio", valor: 'si', descripcion: "Intento de suicidio"}
      psicologicos.push(aux);
    }
    else{
      let aux = {clave: "Intento de suicidio", valor: 'no', descripcion: "Intento de suicidio"}
      psicologicos.push(aux);
    }

    /***********NEGLIGENCIA************/
    let negligencia: any[] = [];
    if (this.formTamizajeCred.value.faltaPeso == true) {
      let aux = {clave: "Falta de peso o pobre patrón de crecimiento", valor: 'si', descripcion: "Falta de peso o pobre patrón de crecimiento"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "Falta de peso o pobre patrón de crecimiento", valor: 'no', descripcion: "Falta de peso o pobre patrón de crecimiento"}
        negligencia.push(aux);
    }
    if (this.formTamizajeCred.value.noVacunado == true) {
      let aux = {clave: "No vacunas o atención de salud", valor: 'si', descripcion: "No vacunas o atención de salud"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "No vacunas o atención de salud", valor: 'no', descripcion: "No vacunas o atención de salud"}
        negligencia.push(aux);
    }
    if (this.formTamizajeCred.value.tieneAccidentes == true) {
      let aux = {clave: "Accidentes o enfermedades muy frecuentes", valor: 'si', descripcion: "Accidentes o enfermedades muy frecuentes"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "Accidentes o enfermedades muy frecuentes", valor: 'no', descripcion: "Accidentes o enfermedades muy frecuentes"}
        negligencia.push(aux);
    }
    if (this.formTamizajeCred.value.esDescuidado == true) {
      let aux = {clave: "Descuido en higiene o aliño", valor: 'si', descripcion: "Descuido en higiene o aliño"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "Descuido en higiene o aliño", valor: 'no', descripcion: "Descuido en higiene o aliño"}
        negligencia.push(aux);
    }
    if (this.formTamizajeCred.value.faltaEstimulacion == true) {
      let aux = {clave: "Falta de estimulación del desarrollo", valor: 'si', descripcion: "Falta de estimulación del desarrollo"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "Falta de estimulación del desarrollo", valor: 'no', descripcion: "Falta de estimulación del desarrollo"}
        negligencia.push(aux);
    }
    if (this.formTamizajeCred.value.tieneFatiga == true) {
      let aux = {clave: "Fatiga, sueño, hambre", valor: 'si', descripcion: "Fatiga, sueño, hambre"}
      negligencia.push(aux);
    }
    else{
        let aux = {clave: "Fatiga, sueño, hambre", valor: 'no', descripcion: "Fatiga, sueño, hambre"}
        negligencia.push(aux);
    }
    /***********NEGLIGENCIA************/
    let sexuales: any[] = [];
    if (this.formTamizajeCred.value.conductaInapropiada == true) {
      let aux = {clave: "Conocimiento y conducta sexual inapropiada (niños)", valor: 'si', descripcion: "Conocimiento y conducta sexual inapropiada (niños)"}
      sexuales.push(aux);
    }
    else{
        let aux = {clave: "Conocimiento y conducta sexual inapropiada (niños)", valor: 'no', descripcion: "Conocimiento y conducta sexual inapropiada (niños)"}
        sexuales.push(aux);
    }
    if (this.formTamizajeCred.value.tieneIrritacion == true) {
      let aux = {
        clave: "Irritación, dolor, lesión, hemorragia en zona genital",
        valor: 'si',
        descripcion: "Irritación, dolor, lesión, hemorragia en zona genital"
      }
      sexuales.push(aux);
    }
    else{
        let aux = {clave: "Irritación, dolor, lesión, hemorragia en zona genital", valor: 'no', descripcion: "Irritación, dolor, lesión, hemorragia en zona genital"}
        sexuales.push(aux);
    }
    if (this.formTamizajeCred.value.tieneEnfermedad == true) {
      let aux = {
        clave: "Enfermedad de transmisión sexual",
        valor: 'si',
        descripcion: "Enfermedad de transmisión sexual"
      }
      sexuales.push(aux);
    }else{
        let aux = {
            clave: "Enfermedad de transmisión sexual",
            valor: 'no',
            descripcion: "Enfermedad de transmisión sexual"
        }
        sexuales.push(aux);
    }
    let otrasPreguntas: any[] = [];
    if (this.formTamizajeCred.value.hayViolencia == 'si') {
      let aux = {
        clave: '¿Diria que en su familia se dan situaciones de violencia?',
        valor: 'si',
        descripcion: '¿Diria que en su familia se dan situaciones de violencia?'
      }
      otrasPreguntas.push(aux);
    }
    else{
        let aux = {
            clave: '¿Diria que en su familia se dan situaciones de violencia?',
            valor: 'no',
            descripcion: '¿Diria que en su familia se dan situaciones de violencia?'
        }
        otrasPreguntas.push(aux);
    }
    if (this.formTamizajeCred.value.alguienInsulta == 'si') {
      let aux = {
        clave: '¿Alguna vez algún miembro de su familia le insulta?',
        valor: 'si',
        descripcion: '¿Alguna vez algún miembro de su familia le insulta?'
      }
      otrasPreguntas.push(aux);
    }
    else{
        let aux = {clave: '¿Alguna vez algún miembro de su familia le insulta?', valor: 'no', descripcion: '¿Alguna vez algún miembro de su familia le insulta?'}
        otrasPreguntas.push(aux);
    }
    if (this.formTamizajeCred.value.alguienGolpea == 'si') {
      let aux = {clave: '¿Alguna vez algún miembro de su familia le golpea?', valor: 'si', descripcion: '¿Alguna vez algún miembro de su familia le golpea?'}
      otrasPreguntas.push(aux);
    }
    else{
        let aux = {clave: '¿Alguna vez algún miembro de su familia le golpea?', valor: 'no', descripcion: '¿Alguna vez algún miembro de su familia le golpea?'}
        otrasPreguntas.push(aux);
    }
    if (this.formTamizajeCred.value.alguienChantajea == 'si') {
      let aux = {clave: '¿Alguna vez algún miembro de su familia le chantajea?', valor: 'si', descripcion: '¿Alguna vez algún miembro de su familia le chantajea?'}
      otrasPreguntas.push(aux);
    }
    else{
        let aux = {clave: '¿Alguna vez algún miembro de su familia le chantajea?', valor: 'no', descripcion: '¿Alguna vez algún miembro de su familia le chantajea?'}
        otrasPreguntas.push(aux);
    }
    if (this.formTamizajeCred.value.obligaRS == 'si') {
      let aux = {
        clave: '¿Alguna vez algún miembro de su familia lo insulta, lo golpea, le obliga a tener relaciones sexuales?',
        valor: 'si',
        descripcion: this.formTamizajeCred.value.quienObligaRS
      }
      otrasPreguntas.push(aux);
    }
    else{
        let aux = {clave: '¿Alguna vez algún miembro de su familia lo insulta, lo golpea, le obliga a tener relaciones sexuales?', valor: 'no', descripcion: this.formTamizajeCred.value.quienObligaRS
        }
        otrasPreguntas.push(aux);
    }
    if(this.formTamizajeCred.value.hijoFacil=='facil'){
        let auxOtras1 = {clave: 'Piensa en la mayor parte del tiempo, diría que ¿Su hijo(a) es fácil o díficil?', valor: 'facil', descripcion: "Piensa en la mayor parte del tiempo, diría que ¿Su hijo(a) es fácil o díficil?"}
        otrasPreguntas.push(auxOtras1);
    }else{
        let auxOtras1 = {clave: 'Piensa en la mayor parte del tiempo, diría que ¿Su hijo(a) es fácil o díficil?', valor: 'dificil', descripcion: "Piensa en la mayor parte del tiempo, diría que ¿Su hijo(a) es fácil o díficil?"}
        otrasPreguntas.push(auxOtras1);
    }
    if(this.formTamizajeCred.value.valor=='si'){
        let auxOtras2 = {clave: 'Alguna vez pierde el control?', valor: 'si', descripcion: "Alguna vez pierde el control?"}
        otrasPreguntas.push(auxOtras2);
    }
    else{
        let auxOtras2 = {clave: 'Alguna vez pierde el control?', valor: 'no', descripcion: "Alguna vez pierde el control?"}
        otrasPreguntas.push(auxOtras2);
    }
    if(this.formTamizajeCred.value.pega==true)
    {
        let auxOtras3 = {
            clave: 'pega',
            valor: 'si',
            descripcion: "pega"
        }
        otrasPreguntas.push(auxOtras3);
    }
    else{
        let auxOtras3 = {
            clave: 'pega',
            valor: 'no',
            descripcion: "pega"
        }
        otrasPreguntas.push(auxOtras3);
    }
   if(this.formTamizajeCred.value.grita==true){
       let auxOtras4 = {
           clave: 'grita',
           valor: 'si',
           descripcion: "grita"
       }
       otrasPreguntas.push(auxOtras4);
   }
   else{
       let auxOtras4 = {
           clave: 'grita',
           valor: 'no',
           descripcion: "grita"
       }
       otrasPreguntas.push(auxOtras4);
   }
   if(this.formTamizajeCred.value.empuja==true){
       let auxOtras5 = {
           clave: 'empuja',
           valor: 'si',
           descripcion: "empuja"
       }
       otrasPreguntas.push(auxOtras5);
   }
   else{
       let auxOtras5 = {
           clave: 'empuja',
           valor: 'no',
           descripcion: "empuja"
       }
       otrasPreguntas.push(auxOtras5);
   }
   if(this.formTamizajeCred.value.encierra==true){
       let auxOtras7 = {
           clave: 'encierra',
           valor: 'si',
           descripcion: "encierra"
       }
       otrasPreguntas.push(auxOtras7);
   }
   else{
       let auxOtras7 = {
           clave: 'encierra',
           valor: 'no',
           descripcion: "encierra"
       }
       otrasPreguntas.push(auxOtras7);
   }
   if(this.formTamizajeCred.value.esDesobediente=='si'){
       let auxOtras8 = {clave: 'esDesobediente', valor: 'si', descripcion: "esDesobediente"}
       otrasPreguntas.push(auxOtras8);
   }
   else{
       let auxOtras8 = {clave: 'esDesobediente', valor: 'no', descripcion: "esDesobediente"}
       otrasPreguntas.push(auxOtras8);
   }
   let resultado ={clave:this.formTamizajeCred.value.tamizajeMental, valor:this.formTamizajeCred.value.tamizajeMental,descripcion:this.formTamizajeCred.value.tamizajeMental}
   let observacionesAuditivo = this.formTamizajeCred.value.tamizajeAuditivo;
   let alteracionVisual = {
      ojoIzquierdo:this.formTamizajeCred.value.ojoIzquierdo,
      ojoDerecho:this.formTamizajeCred.value.ojoDerecho,
      descripcion:this.formTamizajeCred.value.descripcionTamizajeOcular
   }
    let auditivo:any[]=[];
    if(this.formTamizajeCred.value.prematuro=='si'){
        let auditivoAux1 = {
            clave: '¿El niño nació prematuro?',
            valor: 'si',
            descripcion: "¿El niño nació prematuro?"
        }
        auditivo.push(auditivoAux1);
    }
    else{
        let auditivoAux1 = {
            clave: '¿El niño nació prematuro?',
            valor: 'no',
            descripcion: "¿El niño nació prematuro?"
        }
        auditivo.push(auditivoAux1);
    }
    if(this.formTamizajeCred.value.uci=='si'){
         let auditivoAux2 = {clave: '¿Permaneció en UCI?', valor: 'si', descripcion: "¿Permaneció en UCI?"}
         auditivo.push(auditivoAux2);
     }
     else{
         let auditivoAux2 = {clave: '¿Permaneció en UCI?', valor: 'no', descripcion: "¿Permaneció en UCI?"
         }
         auditivo.push(auditivoAux2);
     }
     if(this.formTamizajeCred.value.billirubina=='si'){
         let auditivoAux3 = {clave: '¿Tuvo alta concentración de Billirubina y requirió transfusión sanguínea?', valor: 'si', descripcion: "¿Tuvo alta concentración de Billirubina y requirió transfusión sanguínea?"
         }
         auditivo.push(auditivoAux3);
     }
     else{
         let auditivoAux3 = {clave: '¿Tuvo alta concentración de Billirubina y requirió transfusión sanguínea?', valor: 'no', descripcion: "¿Tuvo alta concentración de Billirubina y requirió transfusión sanguínea?"
         }
         auditivo.push(auditivoAux3);
     }
     if(this.formTamizajeCred.value.perdidaAudicion=='si'){
         let auditivoAux4 = {clave: '¿Tiene antecedentes familiares de pérdida de audición?', valor: 'si', descripcion: "¿Tiene antecedentes familiares de pérdida de audición?"
         }
         auditivo.push(auditivoAux4);
     }
     else{
         let auditivoAux4 = {clave: '¿Tiene antecedentes familiares de pérdida de audición?', valor: 'no', descripcion: "¿Tiene antecedentes familiares de pérdida de audición?"
         }
         auditivo.push(auditivoAux4);
     }
     if(this.formTamizajeCred.value.infeccionOido=='si'){
         let auditivoAux5  = {clave: '¿Tuvo infecciones frecuentes en los oídos?', valor: 'si', descripcion: "¿Tuvo infecciones frecuentes en los oídos?"
         }
         auditivo.push(auditivoAux5);
     }
     else{
         let auditivoAux5  = {
             clave: '¿Tuvo infecciones frecuentes en los oídos?', valor: 'no', descripcion: "¿Tuvo infecciones frecuentes en los oídos?"
         }
         auditivo.push(auditivoAux5);
     }
    if(this.formTamizajeCred.value.meningitis=='si'){
        let auditivoAux6  = {
            clave: '¿Tuvo infecciones como: meningitis o citomegalovirus?', valor: 'si', descripcion: "¿Tuvo infecciones como: meningitis o citomegalovirus?"
        }
        auditivo.push(auditivoAux6);
    }
    else{
        let auditivoAux6  = {
            clave: '¿Tuvo infecciones como: meningitis o citomegalovirus?', valor: 'no', descripcion: "¿Tuvo infecciones como: meningitis o citomegalovirus?"
        }
        auditivo.push(auditivoAux6);
    }
    if(this.formTamizajeCred.value.expuestoSonido=='si'){
        let auditivoAux7  = {
            clave: '¿Estuvo expuesto a sonidos muy fuerte?(Incluso por poco tiempo?', valor: 'si', descripcion: "¿Estuvo expuesto a sonidos muy fuerte?(Incluso por poco tiempo?"
        }
        auditivo.push(auditivoAux7);
    }
    else{
        let auditivoAux7  = {
            clave: '¿Estuvo expuesto a sonidos muy fuerte?(Incluso por poco tiempo?', valor: 'no', descripcion: "¿Estuvo expuesto a sonidos muy fuerte?(Incluso por poco tiempo?"
        }
        auditivo.push(auditivoAux7);
    }

    this.tamizajes = {

      alteracionVisual : alteracionVisual,
      resultado:resultado,
      observacionesAuditivo:observacionesAuditivo,
      auditivo:auditivo,
      otrasPreguntas:otrasPreguntas,
      fisico:fisicos,
      negligencia:negligencia,
      psicologico:psicologicos,
      sexuales:sexuales
    }
    this.tamizajesActualizar = {
        id:this.idFichaTamizaje,
        alteracionVisual : alteracionVisual,
        resultado:resultado,
        observacionesAuditivo:observacionesAuditivo,
        auditivo:auditivo,
        otrasPreguntas:otrasPreguntas,
        fisico:fisicos,
        negligencia:negligencia,
        psicologico:psicologicos,
        sexuales:sexuales
    }
  }
  addTamizaje(){
    console.log("entrando a guardar data");
    this.getTamizaje();
    this.evalAlimenService.addTamizajeCred(this.data.idConsulta,this.tamizajes).subscribe((res: any) => {
      console.log('se guardo correctamente ', res.object);
      Swal.fire({
        icon: 'success',
        title: 'Tamizajes',
        text: 'Se guardo existosamente',
        showConfirmButton: false,
        timer: 2000,
      })
    });
  }
  updateTamizaje(){
    console.log("entrando a actualizar data");
    this.getTamizaje();
    this.evalAlimenService.updateTamizajeCred(this.tamizajesActualizar).subscribe((res: any) => {
      console.log('se guardo correctamente ', res.object);
      Swal.fire({
        icon: 'success',
        title: 'Tamizajes',
        text: 'Se actualizo existosamente',
        showConfirmButton: false,
        timer: 2000,
      })
    });
  }
  actualizarGuardar(){
    this.evalAlimenService.getTamizajeCred(this.idFichaTamizaje).subscribe((res: any) => {
      console.log('se edito correctamente ', res.object);
      if(res.object==null || res.object==undefined)
      {this.addTamizaje();}
      else{this.updateTamizaje();}
    })
  }
}
