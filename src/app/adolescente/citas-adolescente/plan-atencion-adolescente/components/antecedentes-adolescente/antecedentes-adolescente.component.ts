import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup ,Validators} from "@angular/forms";

@Component({
  selector: 'app-antecedentes-adolescente',
  templateUrl: './antecedentes-adolescente.component.html',
  styleUrls: ['./antecedentes-adolescente.component.css']
})
export class AntecedentesAdolescenteComponent implements OnInit {
  threeOptions=[
      {name:'Si',code:'si'},
      {name:'No sé',code:'no se'},
      {name:'No',code:'no'}
  ]
    thwoOptions=[
        {name:'Si',code:'si'},
        {name:'No',code:'no'}
    ]
    nivelEducacion=[
        {name:'No escolarizado',code:'no escolarizado'},
        {name:'Primaria',code:'primaria'},
        {name:'Secundaria',code:'secundaria'},
        {name:'Superior',code:'superior'},
    ]
    antecendentesPersonalesFG:FormGroup;
    antecendentesFamiliaresFG:FormGroup;
    antecendentesPsicosocialesFG:FormGroup;

  buildForm(){
      this.antecendentesPersonalesFG=new FormGroup({
          perinatales:new FormControl('',Validators.required),
          crecimiento:new FormControl('',Validators.required),
          Desarrollo:new FormControl('',Validators.required),
          algunaDiscapacidad:new FormControl('',Validators.required),
          especifique:new FormControl('',Validators.required),
          tuberculosis:new FormControl('',Validators.required),
          sobaAsma:new FormControl('',Validators.required),
          transfusionesSanguineas:new FormControl('',Validators.required),
          usoMedicinas:new FormControl('',Validators.required),
          consumoDrogas:new FormControl('',Validators.required),
          intervencionesQuirurgicas:new FormControl('',Validators.required),
          alergias:new FormControl('',Validators.required),
          accidentes:new FormControl('',Validators.required),
          trastornosPsicologicos:new FormControl('',Validators.required),
          enfermedadesAnorexiaBulimia:new FormControl('',Validators.required),
          violenciaIntrafamiliar:new FormControl('',Validators.required),
          hospitalizacion:new FormControl('',Validators.required),
          dt1Dosis:new FormControl('',Validators.required),
          dt1DosisFecha:new FormControl('',Validators.required),
          dt2Dosis:new FormControl('',Validators.required),
          dt2DosisFecha:new FormControl('',Validators.required),
          dt3Dosis:new FormControl('',Validators.required),
          dt3DosisFecha:new FormControl('',Validators.required),
          sr1Dosis:new FormControl('',Validators.required),
          sr1DosisFecha:new FormControl('',Validators.required),
          sr2Dosis:new FormControl('',Validators.required),
          sr2DosisFecha:new FormControl('',Validators.required),
          sr3Dosis:new FormControl('',Validators.required),
          sr3DosisFecha:new FormControl('',Validators.required),
          hvb1Dosis:new FormControl('',Validators.required),
          hvb1DosisFecha:new FormControl('',Validators.required),
          hvb2Dosis:new FormControl('',Validators.required),
          hvb2DosisFecha:new FormControl('',Validators.required),
          hvb3Dosis:new FormControl('',Validators.required),
          hvb3DosisFecha:new FormControl('',Validators.required),
          fa1Dosis:new FormControl('',Validators.required),
          fa1DosisFecha:new FormControl('',Validators.required),
          fa2Dosis:new FormControl('',Validators.required),
          fa2DosisFecha:new FormControl('',Validators.required),
          fa3Dosis:new FormControl('',Validators.required),
          fa3DosisFecha:new FormControl('',Validators.required),
      })
      this.antecendentesFamiliaresFG=new FormGroup({
          madre:new FormControl('',Validators.required),
          padre:new FormControl('',Validators.required),
          hermanos:new FormControl('',Validators.required),
          hijos:new FormControl('',Validators.required),
          parejas:new FormControl('',Validators.required),
          otros:new FormControl('',Validators.required),
          referenteAdulto:new FormControl('',Validators.required),
          tuberculosis:new FormControl('',Validators.required),
          obesidad:new FormControl('',Validators.required),
          vihSIDA:new FormControl('',Validators.required),
          hipertencionArterial:new FormControl('',Validators.required),
          diabetes:new FormControl('',Validators.required),
          hiperlipidemia:new FormControl('',Validators.required),
          infarto:new FormControl('',Validators.required),
          transtornoPsicologico:new FormControl('',Validators.required),
          drogas:new FormControl('',Validators.required),
          violenciaFamiliar:new FormControl('',Validators.required),
          madreAdolescente:new FormControl('',Validators.required),
          maltratos:new FormControl('',Validators.required),
          otrosEnfermedades:new FormControl('',Validators.required),
          madreInstruccion:new FormControl('',Validators.required),
          padreInstruccion:new FormControl('',Validators.required),
          otroInstruccion:new FormControl('',Validators.required),
      })
      this.antecendentesPsicosocialesFG=new FormGroup({
          estudia:new FormControl('',Validators.required),
          acuerdoEdad:new FormControl('',Validators.required),
          nivel:new FormControl('',Validators.required),
          bajoRendimiento:new FormControl('',Validators.required),
          desercion:new FormControl('',Validators.required),
          repitencia:new FormControl('',Validators.required),

          trabajas:new FormControl('',Validators.required),
          remunerado:new FormControl('',Validators.required),
          estable:new FormControl('',Validators.required),
          tiempoCompleto:new FormControl('',Validators.required),
          edadInicio:new FormControl('',Validators.required),
          tiempoTrabajo:new FormControl('',Validators.required),
          tipoTrabajo:new FormControl('',Validators.required),

          eresAceptado:new FormControl('',Validators.required),
          eresIgnorado:new FormControl('',Validators.required),
          tienesAmigos:new FormControl('',Validators.required),
          tienesPareja:new FormControl('',Validators.required),
          hacesDeporte:new FormControl('',Validators.required),
          organizacionesJuveniles:new FormControl('',Validators.required),
          parroquias:new FormControl('',Validators.required),
          otrosVidaSocial:new FormControl('',Validators.required),

          ejercicios:new FormControl('',Validators.required),
          ejerciciosFrecuencias:new FormControl('',Validators.required),
          tabaco:new FormControl('',Validators.required),
          tabacoFrecuencia:new FormControl('',Validators.required),
          alcohol:new FormControl('',Validators.required),
          alcoholFrecuencia:new FormControl('',Validators.required),
          drogas:new FormControl('',Validators.required),
          drogasFrecuencia:new FormControl('',Validators.required),
          conduceVehiculos:new FormControl('',Validators.required),
          conduceVehiculoFrecuencias:new FormControl('',Validators.required),
          relevision:new FormControl('',Validators.required),
          relevisionFrecuencia:new FormControl('',Validators.required),
          videoJuegos:new FormControl('',Validators.required),
          videoJuegosFrecuencia:new FormControl('',Validators.required),
          internet:new FormControl('',Validators.required),
          internetFrecuencia:new FormControl('',Validators.required),
          higiene:new FormControl('',Validators.required),
          higieneFrecuencia:new FormControl('',Validators.required),
          alimentos:new FormControl('',Validators.required),
          alimentosFrecuencia:new FormControl('',Validators.required),

      })


  }
  constructor() { }


  ngOnInit(): void {
      this.buildForm()
  }

}
