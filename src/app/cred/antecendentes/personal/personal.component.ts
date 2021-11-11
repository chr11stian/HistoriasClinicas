import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';

export interface AntecedentesPersonales {
  dni?: string;
  embarazo: AEmbarazo;
  parto: AParto;
  nacimiento: ANacimiento;
  alimentacion: AAlimentacion;
  patologicos: APatologicos;
}

export interface AEmbarazo {
  patologias1:string;
  patologias2:string;
  normal:boolean;
  complicado:boolean;
  nro1:string;
  nro2:string;
  atencionPrenatal:boolean;
  lugarApn:string;
}

export interface AParto {
  patologias:string;
  pEptopico:boolean;
  complicado:boolean;
  eess:boolean;
  domicilio:boolean;
  consulParticular:boolean;
  profSalud:boolean;
  tecnico:boolean;
  acs:boolean;
  familiar:boolean;
  otro:boolean;
  detalleOtro:string;
}

export interface ANacimiento {
  edadNacer:string;
  pesoNacer:string;
  tallaNacer:string;
  perimetroCefelico:string;
  perimetroTorax:string;
  inmediato:boolean;
  apgar:string;
  reanimacion:boolean;
  patologiaNeonatal:boolean;
  detallePatologia:string;
  hospitalizacion:boolean;
  tiempoHospital:string;
}

export interface AAlimentacion {
  lme:boolean;
  mixta:boolean;
  artificial:boolean;
  iniAlimentacionCompl:string;
  suplementoFe:boolean;
}

export interface APatologicos {
  tbc:boolean;
  asma:boolean;
  epilepsia:boolean;
  infecciones:boolean;
  hospitalizacion:boolean;
  transfuSang:boolean;
  cirugia:boolean;
  alergiaMedicamentos:boolean;
  detalleAlergia:string;
  otrosAnt:boolean;
  detalleOtro:string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  @Output() personalEmit: EventEmitter<AntecedentesPersonales> = new EventEmitter<AntecedentesPersonales>();
  
  stateOptions: any[];
  stateOptions1: any[];
  
  personalFG: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];

    this.stateOptions1 = [{label: '1 m', value: 1},
                          {label: '5 m', value: 5}];
    
   }
  
   getFC(control: string): AbstractControl {
    return this.personalFG.get(control)
  }

  buildForm(): void {
    this.personalFG = this.formBuilder.group({
      patologiasE1: [''],
      patologiasE2: [''],
      normalE: [true],
      complicadoE: [true],
      nroE1: [''],
      atencionPrenaE: [true],
      nroE2: [''],
      lugarApn: [''],
      patologiasP: [''],
      partoE: [true],
      complicadoP: [true],
      eessP: [true],
      domicilioP: [true],
      consultaPP: [true],
      profSaludP: [true],
      tecnicoP: [true],
      acsP: [true],
      familiarP: [true],
      otroP: [true],
      otroDetalleP: [''],
      edadN: [''],
      pesoN: [''],
      tallaN: [''],
      perimetroCefaN: [''],
      perimetroTorN: [''],
      inmediatoN: [true],
      apgarN: [null],
      reanimacionN: [true],
      patologiaNeoN: [true],
      detallePatologiaN: [''],
      hospitalizacionN: [true],
      tiempoHospN: [''],
      lmeA: [true],
      mixtaA: [true],
      ArtificialA: [true],
      iniAlimentacionC: [''],
      suplementoFe: [true],
      tbcP: [true],
      asmaP: [true],
      epilepsiaP: [true],
      infeccionesP: [true],
      hospitalizPato: [true],
      transSangp: [true],
      cirugiaP: [true],
      alergiaMediP: [true],
      detalleAlergiaMed: [''],
      otrosAntP: [true],
      detalleOtrosAntP: [''],
      
    })
  }

  rellenarForm(tabla: AntecedentesPersonales): void {

    this.getFC('patologiasE1').setValue(tabla.embarazo.patologias1)
    this.getFC('patologiasE2').setValue(tabla.embarazo.patologias2)
    this.getFC('normalE').setValue(tabla.embarazo.normal)
    this.getFC('complicadoE').setValue(tabla.embarazo.complicado)
    this.getFC('nroE1').setValue(tabla.embarazo.nro1)
    this.getFC('atencionPrenaE').setValue(tabla.embarazo.atencionPrenatal)
    this.getFC('nroE2').setValue(tabla.embarazo.nro2)
    this.getFC('lugarApn').setValue(tabla.embarazo.lugarApn)
    this.getFC('patologiasP').setValue(tabla.parto.patologias)
    this.getFC('partoE').setValue(tabla.parto.pEptopico)
    this.getFC('complicadoP').setValue(tabla.parto.complicado)
    this.getFC('eessP').setValue(tabla.parto.eess)
    this.getFC('domicilioP').setValue(tabla.parto.domicilio)
    this.getFC('consultaPP').setValue(tabla.parto.consulParticular)
    this.getFC('profSaludP').setValue(tabla.parto.profSalud)
    this.getFC('tecnicoP').setValue(tabla.parto.tecnico)
    this.getFC('acsP').setValue(tabla.parto.acs)
    this.getFC('familiarP').setValue(tabla.parto.familiar)
    this.getFC('otroP').setValue(tabla.parto.otro)
    this.getFC('otroDetalleP').setValue(tabla.parto.detalleOtro)
    this.getFC('edadN').setValue(tabla.nacimiento.edadNacer)
    this.getFC('pesoN').setValue(tabla.nacimiento.pesoNacer)
    this.getFC('tallaN').setValue(tabla.nacimiento.tallaNacer)
    this.getFC('perimetroCefaN').setValue(tabla.nacimiento.perimetroCefelico)
    this.getFC('perimetroTorN').setValue(tabla.nacimiento.perimetroTorax)
    this.getFC('inmediatoN').setValue(tabla.nacimiento.inmediato)
    this.getFC('apgarN').setValue(tabla.nacimiento.apgar)
    this.getFC('reanimacionN').setValue(tabla.nacimiento.reanimacion)
    this.getFC('patologiaNeoN').setValue(tabla.nacimiento.patologiaNeonatal)
    this.getFC('detallePatologiaN').setValue(tabla.nacimiento.detallePatologia)
    this.getFC('hospitalizacionN').setValue(tabla.nacimiento.hospitalizacion)
    this.getFC('tiempoHospN').setValue(tabla.nacimiento.tiempoHospital)
    this.getFC('lmeA').setValue(tabla.alimentacion.lme)
    this.getFC('mixtaA').setValue(tabla.alimentacion.mixta)
    this.getFC('ArtificialA').setValue(tabla.alimentacion.artificial)
    this.getFC('iniAlimentacionC').setValue(tabla.alimentacion.iniAlimentacionCompl)
    this.getFC('suplementoFe').setValue(tabla.alimentacion.suplementoFe)
    this.getFC('tbcP').setValue(tabla.patologicos.tbc)
    this.getFC('asmaP').setValue(tabla.patologicos.asma)
    this.getFC('epilepsiaP').setValue(tabla.patologicos.epilepsia)
    this.getFC('infeccionesP').setValue(tabla.patologicos.infecciones)
    this.getFC('hospitalizPato').setValue(tabla.patologicos.hospitalizacion)
    this.getFC('transSangp').setValue(tabla.patologicos.transfuSang)
    this.getFC('cirugiaP').setValue(tabla.patologicos.cirugia)
    this.getFC('alergiaMediP').setValue(tabla.patologicos.alergiaMedicamentos)
    this.getFC('detalleAlergiaMed').setValue(tabla.patologicos.detalleAlergia)
    this.getFC('otrosAntP').setValue(tabla.patologicos.otrosAnt)
    this.getFC('detalleOtrosAntP').setValue(tabla.patologicos.detalleOtro)
  }


  ngOnInit(): void {
    
    console.log(this.personalFG);
    
  }

  save(){
    this.personalEmit.emit({
      embarazo: {
        patologias1: this.getFC('patologiasE1').value,
        patologias2: this.getFC('patologiasE2').value,
        normal: this.getFC('normalE').value,
        complicado: this.getFC('complicadoE').value,
        nro1: this.getFC('nroE1').value,
        nro2: this.getFC('atencionPrenaE').value,
        atencionPrenatal: this.getFC('nroE2').value,
        lugarApn: this.getFC('lugarApn').value,
      },
      parto: {
        patologias: this.getFC('patologiasP').value,
        pEptopico: this.getFC('partoE').value,
        complicado: this.getFC('complicadoP').value,
        eess: this.getFC('eessP').value,
        domicilio: this.getFC('domicilioP').value,
        consulParticular: this.getFC('consultaPP').value,
        profSalud: this.getFC('profSaludP').value,
        tecnico: this.getFC('tecnicoP').value,
        acs: this.getFC('acsP').value,
        familiar: this.getFC('familiarP').value,
        otro: this.getFC('otroP').value,
        detalleOtro: this.getFC('otroDetalleP').value,
      },
      nacimiento: {
        edadNacer: this.getFC('edadN').value,
        pesoNacer: this.getFC('pesoN').value,
        tallaNacer: this.getFC('tallaN').value,
        perimetroCefelico: this.getFC('perimetroCefaN').value,
        perimetroTorax: this.getFC('perimetroTorN').value,
        inmediato: this.getFC('inmediatoN').value,
        apgar: this.getFC('apgarN').value,
        reanimacion: this.getFC('reanimacionN').value,
        patologiaNeonatal: this.getFC('patologiaNeoN').value,
        detallePatologia: this.getFC('detallePatologiaN').value,
        hospitalizacion: this.getFC('hospitalizacionN').value,
        tiempoHospital: this.getFC('tiempoHospN').value,
      },
      alimentacion: {
        lme: this.getFC('lmeA').value,
        mixta: this.getFC('mixtaA').value,
        artificial: this.getFC('ArtificialA').value,
        iniAlimentacionCompl: this.getFC('iniAlimentacionC').value,
        suplementoFe: this.getFC('suplementoFe').value,
      },
      patologicos:{
        tbc: this.getFC('tbcP').value,
        asma: this.getFC('asmaP').value,
        epilepsia: this.getFC('epilepsiaP').value,
        infecciones: this.getFC('infeccionesP').value,
        hospitalizacion: this.getFC('hospitalizPato').value,
        transfuSang: this.getFC('transSangp').value,
        cirugia: this.getFC('cirugiaP').value,
        alergiaMedicamentos: this.getFC('alergiaMediP').value,
        detalleAlergia: this.getFC('detalleAlergiaMed').value,
        otrosAnt: this.getFC('otrosAntP').value,
        detalleOtro: this.getFC('detalleOtrosAntP').value,
      }
    })
    console.log(this.personalEmit);
    console.log(this.personalFG.value);
    
    
  }

  limpiar() {
    this.personalFG.reset();
  }

}
