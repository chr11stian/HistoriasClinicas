import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../models/data";
import {TamizajesService} from "../service/tamizajes/tamizajes.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  listaTamizajes:Tamizaje[]=[];
  attributeLocalS = 'documento';
  data:dato;
  formTamizajeAuditivo:FormGroup;
  formTamizajeVIF:FormGroup;
  formTamizajeVisual:FormGroup;
  diagnosticoR: Diagnostico[]=[];
  sino :sino[]=[];
  facil:sino[]=[];
  displayMaximizable: boolean;
  constructor(private tamizajeService:TamizajesService,
              private formBuilder: FormBuilder) {
    this.builForm();
    this.diagnosticoR = [
      {name: 'POSITIVO (+)', diagnostico: 'POSITIVO'},
      {name: 'NEGATIVO (-)', diagnostico: 'NEGATIVO'}
    ];
    this.sino = [
      {label: 'SI', value: 'si'},
      {label: 'NO', value: 'no'}
    ];
    this.facil = [
      {label: 'FÁCIL', value: 'facil'},
      {label: 'DÍFICIL', value: 'dificil'}
    ];
  }
  ngOnInit(): void {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.recuperarTamizajeBD();
  }
  builForm() {
    this.formTamizajeAuditivo=this.formBuilder.group({
      prematuro:new FormControl(false),
      uci:new FormControl(false),
      billirubina: new FormControl(false),
      perdidaAudicion:new FormControl(false),
      infeccionOido:new FormControl(false),
      meningitis:new FormControl(false),
      expuestoSonido:new FormControl(false),
      diagnosticoAuditivo:new FormControl(''),
      tamizajeAuditivo:new FormControl('')
    });
    this.formTamizajeVIF=this.formBuilder.group({
      /***otras preguntas***/
      hayViolencia: new FormControl('no'),
      alguienInsulta:new FormControl('no'),
      alguienGolpea:new FormControl('no'),
      alguienChantajea:new FormControl('no'),
      obligaRS:new FormControl('no'),
      quienObligaRS:new FormControl(''),
      hijoFacil:new FormControl('dificil'),
      pierdeControl: new FormControl('no'),
      pega: new FormControl('no'),
      grita: new FormControl('no'),
      encierra: new FormControl('no'),
      empuja: new FormControl('no'),
      esDesobediente:new FormControl('no'),
      /******fisico*****/
      tieneHematomas: new FormControl('no'),
      tieneCicatrices: new FormControl('no'),
      tieneFacturas: new FormControl('no'),
      tieneMarcas: new FormControl('no'),
      tieneLesiones: new FormControl('no'),
      tieneLaceraciones: new FormControl('no'),
      tieneQuejasCronicas: new FormControl('no'),
      tieneProblemasApetito: new FormControl('no'),
      tieneEnuresis: new FormControl('no'),
      /***psicologico***/
      tieneFalta: new FormControl('no'),
      tieneTristeza: new FormControl('no'),
      tieneRetraimiento: new FormControl('no'),
      tieneLlanto: new FormControl('no'),
      tieneNecesidad: new FormControl('no'),
      tieneDemanda: new FormControl('no'),
      tieneAgresividad: new FormControl('no'),
      tieneTartamudeo: new FormControl('no'),
      tieneTemor: new FormControl('no'),
      Roba: new FormControl('no'),
      tieneAutismo: new FormControl('no'),
      llegaTarde: new FormControl('no'),
      bajoRendimiento: new FormControl('no'),
      seAisla: new FormControl('no'),
      intentaSuicidio: new FormControl('no'),
      /***negligencia***/
      faltaPeso: new FormControl('no'),
      noVacunado: new FormControl('no'),
      tieneAccidentes: new FormControl('no'),
      esDescuidado: new FormControl('no'),
      faltaEstimulacion: new FormControl('no'),
      tieneFatiga:new FormControl('no'),

      /****sexuales*****/
      conductaInapropiada: new FormControl('no'),
      tieneIrritacion: new FormControl('no'),
      tieneEnfermedad: new FormControl('no'),
      /**diagnostico vif**/
      diagnosticoVIF:new FormControl('no'),
      tamizajeMental: new FormControl(''),
    });
    this.formTamizajeVisual=this.formBuilder.group({
      ojoDerecho: new FormControl(0),
      ojoIzquierdo: new FormControl(0),
      descripcionTamizajeOcular: new FormControl(''),
      diagnosticoVisual:new FormControl('')
    })
  }
  async recuperarTamizajeBD(){
    this.tamizajeService.getTamizajePlan(this.data.nroDocumento).subscribe((res: any) => {
      if(res.object!=null){
        res.object.fichasTamizaje.forEach(element=>this.listaTamizajes.push(element));
        console.log(this.listaTamizajes)
      }
    });
  }
  openTamizajes(id) {
      this.formTamizajeVisual.reset();
      this.formTamizajeVIF.reset();
      this.formTamizajeAuditivo.reset();
      this.formTamizajeVIF.disabled;
      this.formTamizajeVisual.disabled;
      this.formTamizajeAuditivo.disabled;
      this.displayMaximizable=true;
      this.tamizajeService.searchTamizaje(id).subscribe((res: any) => {
        console.log(res.object);
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
          this.formTamizajeVIF.get('hayViolencia').setValue(otrasPreguntas[0].valor);
          this.formTamizajeVIF.get('alguienInsulta').setValue(otrasPreguntas[1].valor);
          this.formTamizajeVIF.get('alguienGolpea').setValue(otrasPreguntas[2].valor);
          this.formTamizajeVIF.get('alguienChantajea').setValue(otrasPreguntas[3].valor);
          this.formTamizajeVIF.get('obligaRS').setValue(otrasPreguntas[4].valor);
          this.formTamizajeVIF.get('quienObligaRS').setValue(otrasPreguntas[4].descripcion);
          if(otrasPreguntas[4].valor='facil'){this.formTamizajeVIF.get('hijoFacil').setValue('facil');}
          else{
            this.formTamizajeVIF.get('hijoFacil').setValue('dificil');
          }
          this.formTamizajeVIF.get('pierdeControl').setValue(otrasPreguntas[6].valor);
          if(otrasPreguntas[7].valor=='si'){
            this.formTamizajeVIF.get('pega').setValue(true);
          }
          if(otrasPreguntas[8].valor='si'){
            this.formTamizajeVIF.get('grita').setValue(true);
          }
          if(otrasPreguntas[9].valor=='si'){
            this.formTamizajeVIF.get('empuja').setValue(true);
          }
          if(otrasPreguntas[10].valor=='si'){
            this.formTamizajeVIF.get('encierra').setValue(true);
          }
          this.formTamizajeVIF.get('esDesobediente').setValue(otrasPreguntas[11].valor);
          /********fisico************/
          if(fisico[0].valor=='si'){this.formTamizajeVIF.get('tieneHematomas').setValue(true);}
          if(fisico[1].valor=='si'){this.formTamizajeVIF.get('tieneCicatrices').setValue(true);}
          if(fisico[2].valor=='si'){this.formTamizajeVIF.get('tieneFacturas').setValue(true);}
          if(fisico[3].valor=='si'){this.formTamizajeVIF.get('tieneMarcas').setValue(true);}
          if(fisico[4].valor=='si'){this.formTamizajeVIF.get('tieneLesiones').setValue(true);}
          if(fisico[5].valor=='si'){this.formTamizajeVIF.get('tieneLaceraciones').setValue(true);}
          if(fisico[6].valor=='si'){this.formTamizajeVIF.get('tieneQuejasCronicas').setValue(true);}
          if(fisico[7].valor=='si'){this.formTamizajeVIF.get('tieneProblemasApetito').setValue(true);}
          if(fisico[8].valor=='si'){this.formTamizajeVIF.get('tieneEnuresis').setValue(true);}
          /********psicologico*******/
          if(psicologico[0].valor=='si'){this.formTamizajeVIF.get('tieneFalta').setValue(true);}
          if(psicologico[1].valor=='si'){this.formTamizajeVIF.get('tieneTristeza').setValue(true);}
          if(psicologico[2].valor=='si'){this.formTamizajeVIF.get('tieneRetraimiento').setValue(true);}
          if(psicologico[3].valor=='si'){this.formTamizajeVIF.get('tieneLlanto').setValue(true);}
          if(psicologico[4].valor=='si'){this.formTamizajeVIF.get('tieneNecesidad').setValue(true);}
          if(psicologico[5].valor=='si'){this.formTamizajeVIF.get('tieneDemanda').setValue(true);}
          if(psicologico[6].valor=='si'){this.formTamizajeVIF.get('tieneAgresividad').setValue(true);}
          if(psicologico[7].valor=='si'){this.formTamizajeVIF.get('tieneTartamudeo').setValue(true);}
          if(psicologico[8].valor=='si'){this.formTamizajeVIF.get('tieneTemor').setValue(true);}
          if(psicologico[9].valor=='si'){this.formTamizajeVIF.get('Roba').setValue(true);}
          if(psicologico[10].valor=='si'){this.formTamizajeVIF.get('tieneAutismo').setValue(true);}
          if(psicologico[11].valor=='si'){this.formTamizajeVIF.get('llegaTarde').setValue(true);}
          if(psicologico[12].valor=='si'){this.formTamizajeVIF.get('bajoRendimiento').setValue(true);}
          if(psicologico[13].valor=='si'){this.formTamizajeVIF.get('seAisla').setValue(true);}
          if(psicologico[14].valor=='si'){this.formTamizajeVIF.get('intentaSuicidio').setValue(true);}
          /********negligencia*******/
          if(negligencia[0].valor=='si'){this.formTamizajeVIF.get('faltaPeso').setValue(true);}
          if(negligencia[1].valor=='si'){this.formTamizajeVIF.get('noVacunado').setValue(true);}
          if(negligencia[2].valor=='si'){this.formTamizajeVIF.get('tieneAccidentes').setValue(true);}
          if(negligencia[3].valor=='si'){this.formTamizajeVIF.get('esDescuidado').setValue(true);}
          if(negligencia[4].valor=='si'){this.formTamizajeVIF.get('faltaEstimulacion').setValue(true);}
          if(negligencia[5].valor=='si'){this.formTamizajeVIF.get('tieneFatiga').setValue(true);}
          /********sexuales**********/
          if(sexuales[0].valor=='si'){this.formTamizajeVIF.get('conductaInapropiada').setValue(true);}
          if(sexuales[1].valor=='si'){this.formTamizajeVIF.get('tieneIrritacion').setValue(true);}
          if(sexuales[2].valor=='si'){this.formTamizajeVIF.get('tieneEnfermedad').setValue(true);}
          this.formTamizajeVIF.get('diagnosticoVIF').setValue(resultado.valor);
          this.formTamizajeVIF.get('tamizajeMental').setValue(resultado.descripcion);
          /*******RECUPERAR ALTERACIONES VISUALES******/
          this.formTamizajeVisual.get('ojoDerecho').setValue(alteracionVisual.ojoDerecho);
          this.formTamizajeVisual.get('ojoIzquierdo').setValue(alteracionVisual.ojoIzquierdo);
          this.formTamizajeVisual.get('descripcionTamizajeOcular').setValue(alteracionVisual.descripcion);
          this.formTamizajeVisual.get('diagnosticoVisual').setValue(alteracionVisual.resultado.valor);
          /*************RECUPERAR TAMIZAJE AUDITIVO*******************/
          this.formTamizajeAuditivo.get("tamizajeAuditivo").setValue(observacionesAuditivo.descripcion);
          this.formTamizajeAuditivo.get("diagnosticoAuditivo").setValue(observacionesAuditivo.valor);
          if (auditivo[0].valor) {
            this.formTamizajeAuditivo.get("prematuro").setValue(auditivo[0].valor);
          }
          if (auditivo[1].valor) {
            this.formTamizajeAuditivo.get("uci").setValue(auditivo[1].valor);
          }
          if (auditivo[2].valor) {
            this.formTamizajeAuditivo.get("billirubina").setValue(auditivo[2].valor);
          }
          if (auditivo[3].valor) {
            this.formTamizajeAuditivo.get("perdidaAudicion").setValue(auditivo[3].valor);
          }
          if (auditivo[4].valor) {
            this.formTamizajeAuditivo.get("infeccionOido").setValue(auditivo[4].valor);
          }
          if (auditivo[5].valor) {
            this.formTamizajeAuditivo.get("meningitis").setValue(auditivo[5].valor);
          }
          if (auditivo[6].valor) {
            this.formTamizajeAuditivo.get("expuestoSonido").setValue(auditivo[6].valor);
          }
      });
  }
}
export interface Tamizaje{
  idTamizaje:string,
  fecha:string,
  edad:string
}
export interface Diagnostico{
    name:string,
    diagnostico:string
}
export interface sino{
    label:string,
    value:string

}

