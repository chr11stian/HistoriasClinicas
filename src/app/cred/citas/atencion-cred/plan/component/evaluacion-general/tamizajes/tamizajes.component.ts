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
      prematuro:new FormControl({value:"", disabled: true}),
      uci:new FormControl({value:"", disabled: true}),
      billirubina: new FormControl({value:"", disabled: true}),
      perdidaAudicion:new FormControl({value:"", disabled: true}),
      infeccionOido:new FormControl({value:"", disabled: true}),
      meningitis:new FormControl({value:"", disabled: true}),
      expuestoSonido:new FormControl({value:"", disabled: true}),
      diagnosticoAuditivo:new FormControl({value:"", disabled: true}),
      tamizajeAuditivo:new FormControl({value:"", disabled: true})
    });
    this.formTamizajeVIF=this.formBuilder.group({
      /***otras preguntas***/
      hayViolencia: new FormControl({value:"", disabled: true}),
      alguienInsulta:new FormControl({value:"", disabled: true}),
      alguienGolpea:new FormControl({value:"", disabled: true}),
      alguienChantajea:new FormControl({value:"", disabled: true}),
      obligaRS:new FormControl({value:"", disabled: true}),
      quienObligaRS:new FormControl({value:"", disabled: true}),
      hijoFacil:new FormControl({value:"", disabled: true}),
      pierdeControl: new FormControl({value:"", disabled: true}),
      pega: new FormControl({value:"", disabled: true}),
      grita: new FormControl({value:"", disabled: true}),
      encierra: new FormControl({value:"", disabled: true}),
      empuja: new FormControl({value:"", disabled: true}),
      esDesobediente:new FormControl({value:"", disabled: true}),
      /******fisico*****/
      tieneHematomas: new FormControl({value:"", disabled: true}),
      tieneCicatrices: new FormControl({value:"", disabled: true}),
      tieneFacturas: new FormControl({value:"", disabled: true}),
      tieneMarcas: new FormControl({value:"", disabled: true}),
      tieneLesiones: new FormControl({value:"", disabled: true}),
      tieneLaceraciones: new FormControl({value:"", disabled: true}),
      tieneQuejasCronicas: new FormControl({value:"", disabled: true}),
      tieneProblemasApetito: new FormControl({value:"", disabled: true}),
      tieneEnuresis: new FormControl({value:"", disabled: true}),
      /***psicologico***/
      tieneFalta: new FormControl({value:"", disabled: true}),
      tieneTristeza: new FormControl({value:"", disabled: true}),
      tieneRetraimiento: new FormControl({value:"", disabled: true}),
      tieneLlanto: new FormControl({value:"", disabled: true}),
      tieneNecesidad: new FormControl({value:"", disabled: true}),
      tieneDemanda: new FormControl({value:"", disabled: true}),
      tieneAgresividad: new FormControl({value:"", disabled: true}),
      tieneTartamudeo: new FormControl({value:"", disabled: true}),
      tieneTemor: new FormControl({value:"", disabled: true}),
      Roba: new FormControl({value:"", disabled: true}),
      tieneAutismo: new FormControl({value:"", disabled: true}),
      llegaTarde: new FormControl({value:"", disabled: true}),
      bajoRendimiento: new FormControl({value:"", disabled: true}),
      seAisla: new FormControl({value:"", disabled: true}),
      intentaSuicidio: new FormControl({value:"", disabled: true}),
      /***negligencia***/
      faltaPeso: new FormControl({value:"", disabled: true}),
      noVacunado: new FormControl({value:"", disabled: true}),
      tieneAccidentes: new FormControl({value:"", disabled: true}),
      esDescuidado: new FormControl({value:"", disabled: true}),
      faltaEstimulacion: new FormControl({value:"", disabled: true}),
      tieneFatiga:new FormControl({value:"", disabled: true}),

      /****sexuales*****/
      conductaInapropiada: new FormControl({value:"", disabled: true}),
      tieneIrritacion: new FormControl({value:"", disabled: true}),
      tieneEnfermedad: new FormControl({value:"", disabled: true}),
      /**diagnostico vif**/
      diagnosticoVIF:new FormControl({value:"", disabled: true}),
      tamizajeMental: new FormControl({value:"", disabled: true}),
    });
    this.formTamizajeVisual=this.formBuilder.group({
      ojoDerecho: new FormControl({value:0, disabled: true}),
      ojoIzquierdo: new FormControl({value:0, disabled: true}),
      descripcionTamizajeOcular: new FormControl({value:"", disabled: true}),
      diagnosticoVisual:new FormControl({value:"", disabled: true})
    })
  }
  async recuperarTamizajeBD(){
    this.tamizajeService.getTamizajePlan(this.data.nroDocumento).subscribe((res: any) => {
      if(res.object!=null){
        res.object.fichasTamizaje.forEach(element=>this.listaTamizajes.push(element));
      }
    });
  }
  openTamizajes(id) {
      this.formTamizajeVisual.reset();
      this.formTamizajeVIF.reset();
      this.formTamizajeAuditivo.reset();
      this.formTamizajeVIF.disable();
      this.formTamizajeVisual.disable();
      this.formTamizajeAuditivo.disable();
      this.displayMaximizable=true;
      this.tamizajeService.searchTamizaje(id).subscribe((res: any) => {
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

