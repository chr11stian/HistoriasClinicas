import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AntecedentesService} from "../../services/adolescentePAI/antecedentes.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-antecedentes-adolescente',
  templateUrl: './antecedentes-adolescente.component.html',
  styleUrls: ['./antecedentes-adolescente.component.css']
})
export class AntecedentesAdolescenteComponent implements OnInit {
    tipoDNI:string='DNI';
    nroDNI:string='10101010'
    vacunasCheckModel:boolean[]=[false,false,false,false,false,false,false,false,false,false,false,false]
    vacunasFechaDisabled:boolean[]=[true,true,true,true,true,true,true,true,true,true,true,true]
    // dt:boolean[]=[true,true,true]
    // sr:boolean[]=[true,true,true]
    // hvb:boolean[]=[true,true,true]
    // fa:boolean[]=[true,true,true]
    // dtDosis:boolean[]=[false,false,false]
    // srDosis:boolean[]=[false,false,false]
    // hvbDosis:boolean[]=[false,false,false]
    // faDosis:boolean[]=[false,false,false]

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
          desarrollo:new FormControl('',Validators.required),
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
          dt1DosisFecha:new FormControl('',Validators.required),
          dt2DosisFecha:new FormControl('',Validators.required),
          dt3DosisFecha:new FormControl('',Validators.required),
          sr1DosisFecha:new FormControl('',Validators.required),
          sr2DosisFecha:new FormControl('',Validators.required),
          sr3DosisFecha:new FormControl('',Validators.required),
          hvb1DosisFecha:new FormControl('',Validators.required),
          hvb2DosisFecha:new FormControl('',Validators.required),
          hvb3DosisFecha:new FormControl('',Validators.required),
          fa1DosisFecha:new FormControl('',Validators.required),
          fa2DosisFecha:new FormControl('',Validators.required),
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
          television:new FormControl('',Validators.required),
          televisionFrecuencia:new FormControl('',Validators.required),
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
  constructor(private antecedentesService:AntecedentesService,
              private messageService: MessageService) { }
  ngOnInit(): void {
      this.buildForm()
      this.getAntecedentePersonal();
  }
  getFC(control: string): AbstractControl {
        return this.antecendentesPersonalesFG.get(control);
  }
  getFCFamiliar(control: string): AbstractControl {
        return this.antecendentesFamiliaresFG.get(control);
  }
  getFCPsicosocial(control: string): AbstractControl {
      return this.antecendentesPsicosocialesFG.get(control);
  }
  getTrueFalse(controlador){
      let check=this.getFC(controlador).value.length==1?true:false
      return check
  }
  settearFecha(controlador:string,fecha,nroVacuna:number){
      if(fecha!=null){
          this.getFC(controlador).setValue(new Date(fecha))
          this.vacunasCheckModel[nroVacuna]=true
          this.vacunasFechaDisabled[nroVacuna]=false
      }
      else{
          this.getFC(controlador).setValue('')
          this.vacunasCheckModel[nroVacuna]=false
          this.vacunasFechaDisabled[nroVacuna]=true
      }
  }
  getAntecedentePersonal(){
      this.antecedentesService.getAntecedentes(this.tipoDNI,this.nroDNI).subscribe((resp)=>{
          const data=resp['object']['antecedentePersonal'];
          this.getFC('perinatales').setValue(data.perinatales)
          this.getFC('crecimiento').setValue(data.crecimiento)
          this.getFC('desarrollo').setValue(data.desarrollo)
          this.getFC('tuberculosis').setValue(data.antecedentes[0].valor)
          this.getFC('sobaAsma').setValue(data.antecedentes[1].valor)
          this.getFC('transfusionesSanguineas').setValue(data.antecedentes[2].valor)
          this.getFC('usoMedicinas').setValue(data.antecedentes[3].valor)
          this.getFC('consumoDrogas').setValue(data.antecedentes[4].valor)
          this.getFC('intervencionesQuirurgicas').setValue(data.antecedentes[5].valor)
          this.getFC('alergias').setValue(data.antecedentes[6].valor)
          this.getFC('accidentes').setValue(data.antecedentes[7].valor)
          this.getFC('trastornosPsicologicos').setValue(data.antecedentes[8].valor)
          this.getFC('enfermedadesAnorexiaBulimia').setValue(data.antecedentes[9].valor)
          this.getFC('violenciaIntrafamiliar').setValue(data.antecedentes[10].valor)
          this.getFC('hospitalizacion').setValue(data.antecedentes[11].valor)
          //vacunas
          this.settearFecha('dt1DosisFecha',data.vacunas[0].fechaAplicacion,0)
          this.settearFecha('dt2DosisFecha',data.vacunas[1].fechaAplicacion,1)
          this.settearFecha('dt3DosisFecha',data.vacunas[2].fechaAplicacion,2)
          this.settearFecha('sr1DosisFecha',data.vacunas[3].fechaAplicacion,3)
          this.settearFecha('sr2DosisFecha',data.vacunas[4].fechaAplicacion,4)
          this.settearFecha('sr3DosisFecha',data.vacunas[5].fechaAplicacion,5)
          this.settearFecha('hvb1DosisFecha',data.vacunas[6].fechaAplicacion,6)
          this.settearFecha('hvb2DosisFecha',data.vacunas[7].fechaAplicacion,7)
          this.settearFecha('hvb3DosisFecha',data.vacunas[8].fechaAplicacion,8)
          this.settearFecha('fa1DosisFecha',data.vacunas[9].fechaAplicacion,9)
          this.settearFecha('fa2DosisFecha',data.vacunas[10].fechaAplicacion,10)
          this.settearFecha('fa3DosisFecha',data.vacunas[11].fechaAplicacion,11)
          //antecedentes familiares
          const dataFamiliar=resp['object']['antecedenteFamiliar'];
          this.getFCFamiliar('tuberculosis').setValue(dataFamiliar.antecedente[0].valor)
          this.getFCFamiliar('obesidad').setValue(dataFamiliar.antecedente[1].valor)
          this.getFCFamiliar('vihSIDA').setValue(dataFamiliar.antecedente[2].valor)
          this.getFCFamiliar('hipertencionArterial').setValue(dataFamiliar.antecedente[3].valor)
          this.getFCFamiliar('diabetes').setValue(dataFamiliar.antecedente[4].valor)
          this.getFCFamiliar('hiperlipidemia').setValue(dataFamiliar.antecedente[5].valor)
          this.getFCFamiliar('infarto').setValue(dataFamiliar.antecedente[6].valor)
          this.getFCFamiliar('transtornoPsicologico').setValue(dataFamiliar.antecedente[7].valor)
          this.getFCFamiliar('drogas').setValue(dataFamiliar.antecedente[8].valor)
          this.getFCFamiliar('violenciaFamiliar').setValue(dataFamiliar.antecedente[9].valor)
          this.getFCFamiliar('madreAdolescente').setValue(dataFamiliar.antecedente[10].valor)
          this.getFCFamiliar('maltratos').setValue(dataFamiliar.antecedente[11].valor)
          this.getFCFamiliar('otrosEnfermedades').setValue(dataFamiliar.antecedente[12].valor)
          this.getFCFamiliar('madreInstruccion').setValue(dataFamiliar.intrucionMadre)
          this.getFCFamiliar('padreInstruccion').setValue(dataFamiliar.intrucionPadre)
          this.getFCFamiliar('otroInstruccion').setValue(dataFamiliar.intrucionOtro)
      });

  }
  saveAntecedentePersonal(){
      // console.log(this.getFC('dt1Dosis').value)
      // let check1=this.getFC('dt1Dosis').value.length==1?true:false
      // console.log(check1)
      const inputRequest={
          "antecedentePersonal": {
              perinatales: this.getFC('perinatales').value,
              crecimiento: this.getFC('crecimiento').value,
              desarrollo: this.getFC('desarrollo').value,
              antecedentes: [
                  {
                      nombre: "tuberculosis",
                      valor: this.getFC('tuberculosis').value
                  },
                  {
                      nombre: "sobaAsma",
                      valor: this.getFC('sobaAsma').value
                  },
                  {
                      nombre: "transfusionesSanguineas",
                      valor: this.getFC('transfusionesSanguineas').value
                  },
                  {
                      nombre: "usoMedicinas",
                      valor: this.getFC('usoMedicinas').value
                  },
                  {
                      nombre: "consumoDrogas",
                      valor: this.getFC('consumoDrogas').value
                  },
                  {
                      nombre: "intervencionQuirurgica",
                      valor: this.getFC('intervencionesQuirurgicas').value
                  },
                  {
                      nombre: "alergias",
                      valor: this.getFC('alergias').value
                  },
                  {
                      nombre: "accidentes",
                      valor: this.getFC('accidentes').value
                  },
                  {
                      nombre: "transtornosPsicologicos",
                      valor: this.getFC('trastornosPsicologicos').value
                  },
                  {
                      nombre: "variasEnfermedades",
                      valor: this.getFC('enfermedadesAnorexiaBulimia').value
                  },
                  {
                      nombre: "violenciaIntrafamiliar",
                      valor: this.getFC('violenciaIntrafamiliar').value
                  },
                  {
                      nombre: "hospitalizacion",
                      valor: this.getFC('hospitalizacion').value
                  },

              ],
              "vacunas": [
                  {
                      nombreVacuna: "DT",
                      nroDosis: 1,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('dt1DosisFecha').value))
                  },
                  {
                      nombreVacuna: "DT",
                      nroDosis: 2,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('dt2DosisFecha').value))
                  },
                  {
                      nombreVacuna: "DT",
                      nroDosis: 3,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('dt3DosisFecha').value))
                  },
                  {
                      nombreVacuna: "SR",
                      nroDosis: 1,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('sr1DosisFecha').value))
                  },
                  {
                      nombreVacuna: "SR",
                      nroDosis: 2,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('sr2DosisFecha').value))
                  },
                  {
                      nombreVacuna: "SR",
                      nroDosis: 3,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('sr3DosisFecha').value))
                  },
                  {
                      nombreVacuna: "HVB",
                      nroDosis: 1,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('hvb1DosisFecha').value))
                 },
                  {
                      nombreVacuna: "HVB",
                      nroDosis: 2,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('hvb2DosisFecha').value))
                  },
                  {
                      nombreVacuna: "HVB",
                      nroDosis: 3,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('hvb3DosisFecha').value))
                  },
                  {
                      nombreVacuna: "FA",
                      nroDosis: 1,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('fa1DosisFecha').value))
                  },
                  {
                      nombreVacuna: "FA",
                      nroDosis: 2,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('fa2DosisFecha').value))
                  },
                  {
                      nombreVacuna: "FA",
                      nroDosis: 3,
                      fechaAplicacion: this.getFecha( new Date(this.getFC('fa3DosisFecha').value))
                  },

              ],
              discapacidad: [
                  "DIFICULTAD",
                  "SIN BRAZOS"
              ]
          },
          antecedenteFamiliar: {
              antecedente: [
                  {
                      nombre: "tuberculosis",
                      valor:this.getFCFamiliar('tuberculosis').value
                  },
                  {
                      nombre: "obesidad",
                      valor: this.getFCFamiliar('obesidad').value
                  },
                  {
                      nombre: "vihSIDA",
                      valor:this.getFCFamiliar('vihSIDA').value
                  },
                  {
                      nombre: "hipertencionArterial",
                      valor: this.getFCFamiliar('hipertencionArterial').value
                  },
                  {
                      nombre: "diabetes",
                      valor: this.getFCFamiliar('diabetes').value
                  },
                  {
                      nombre: "hiperlipidemia",
                      valor: this.getFCFamiliar('hiperlipidemia').value
                  },
                  {
                      nombre: "infarto",
                      valor: this.getFCFamiliar('infarto').value
                  },
                  {
                      nombre: "transtornoPsicologico",
                      valor: this.getFCFamiliar('transtornoPsicologico').value
                  },
                  {
                      nombre: "drogas",
                      valor: this.getFCFamiliar('drogas').value
                  },
                  {
                      nombre: "violenciaFamiliar",
                      valor: this.getFCFamiliar('violenciaFamiliar').value
                  },
                  {
                      nombre: "madreAdolescente",
                      valor: this.getFCFamiliar('madreAdolescente').value
                  },
                  {
                      nombre: "maltratos",
                      valor: this.getFCFamiliar('maltratos').value
                  },
                  {
                      nombre: "otrosEnfermedades",
                      valor: this.getFCFamiliar('otrosEnfermedades').value
                  },
              ],
              viveCon: [
                  "papa",
                  "mama"
              ],
              referenteAdulto: 'sin',
              intrucionPadre: this.getFCFamiliar('padreInstruccion').value,
              intrucionMadre: this.getFCFamiliar('madreInstruccion').value,
              intrucionOtro: this.getFCFamiliar('otroInstruccion').value,
          },
          antecedentePsicosocial: {
              educativos: {
                  estudia:this.getFCPsicosocial('estudia').value,
                  deAcuerdoAlaEdad: this.getFCPsicosocial('acuerdoEdad').value,
                  nivel: this.getFCPsicosocial('nivel').value,
                  bajoRendimiento: this.getFCPsicosocial('bajoRendimiento').value,
                  desercion: this.getFCPsicosocial('desercion').value,
                  repitencia: this.getFCPsicosocial('estudia').value
              },
              laborales: [
                  {
                      nombre: "trabajas",
                      valor: this.getFCPsicosocial('trabajas').value
                  },
                  {
                      nombre: "remunerado",
                      valor: this.getFCPsicosocial('remunerado').value
                  },
                  {
                      nombre: "estable",
                      valor: this.getFCPsicosocial('estable').value
                  },
                  {
                      nombre: "tiempoCompleto",
                      valor: this.getFCPsicosocial('tiempoCompleto').value
                  },
                  {
                      nombre: "edadInicio",
                      valor: this.getFCPsicosocial('edadInicio').value
                  },
                  {
                      nombre: "tiempoTrabajo",
                      valor: this.getFCPsicosocial('tiempoTrabajo').value
                  },
                  {
                      nombre: "tipoTrabajo",
                      valor: this.getFCPsicosocial('tipoTrabajo').value
                  }
              ],
              vidaSocial: [
                  "vida social"
              ],
              habitos: [
                  {
                      nombre: "valor",
                      frecuencia: "todos los dias"
                  }
              ]
          }

      }
      console.log('->:',inputRequest)
      this.antecedentesService.addAntecendentes(this.tipoDNI,this.nroDNI,inputRequest).subscribe((resp)=>{
          console.log(resp);
          this.messageService.add({severity:'info', summary:'Exitoso', detail:'agregado'});
      });

  }
    getFecha(date:Date){
        if(date.toString()!=='Invalid Date' ){
            let hora=date.toLocaleTimeString();
            // return fecha+' '+hora;
            let dd = date.getDate();
            let dd1=dd.toString();
            if(dd<10){
                dd1='0'+dd1;
            }
            let mm = date.getMonth() + 1; //January is 0!
            let mm1:string=mm.toString()
            if(mm<10){
                mm1='0'+mm1;
            }
            let yyyy = date.getFullYear();
            return yyyy+'-'+mm1+'-'+dd1
        }
        else{
            return '';
        }
    }

}
