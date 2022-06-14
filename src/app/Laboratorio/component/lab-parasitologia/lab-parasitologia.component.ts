import { Component, OnInit } from '@angular/core';
import { Parasitologia } from '../../interfaces/parasitologia.interface';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ParasitologiaService } from '../../services/parasitologia.service';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-lab-parasitologia',
  templateUrl: './lab-parasitologia.component.html',
  styleUrls: ['./lab-parasitologia.component.css']
})
export class LabParasitologiaComponent implements OnInit {

  constructor(private parasitologiaService:ParasitologiaService) { }
   data :Parasitologia[] = [{
    resultadosAnalisis:"",
    resultadosTipoMuestra:"",
    color:"",
    consistencia:"",
    ph:"",
    reaccion:"",
    mucus:"",
    sangre:"",
    restosAlimenticios:"",
    filamentosMucoides:"",
    leucocitos:0,
    hematies:0,
    cuerposGrasos:"",
    levaduras:"",
    bacterias:"",
    huevosDe:"",
    quistesDe:"",
    trofozoitosDe:"",
    larvasDe:"",
    sangreOcultaHeces:"",
    gotaGruesaDxMalaria:"",
    frotisLesionDLeishmaniosis:""
  }]
  ngOnInit(): void {
  } 
  guardar(){
    console.log('resultado:',this.data[0]);
    const request={
        "nroMuestra":"una cipcion",
        "resultado":{
          "clave":" resultados",
          "valor":" resultados",
          "resultado":" resultados"
        },
        "observacionesLab":"aaa",
        "resultadoExamen":"aaaa",
      
        "examenMacroscopico":{
          "color":"examen Macroscopico",
          "consistencia":"examen Macroscopico",
          "pH":"examen Macroscopico",
          "reaccion":"examen Macroscopico",
          "mucus":"examen Macroscopico",
          "sangre":"examen Macroscopico",
          "restosAlimenticios":"examen Macroscopico"
        },
        "examenMicroscopico":{
          "reaccionInflamatorio":"examen Microscopico",
          "filamentosMucoides":"examen Microscopico",
          "leucocitos":"examen Microscopico",
          "hematies":"examen Microscopico",
          "cuerposGrasos":"examen Microscopico",	
          "levaduras":"examen Microscopico",
          "bacterias":"examen Microscopico",
          "cocosBacilos":"examen Microscopico",
          "formasParasitarias":"examen Microscopico",
          "huevosDe":["examen Microscopico"],       
          "quistesDe":["examen Microscopico"],
          "trofozoitosDe":["examen Microscopico"],
          "larvasDe":["examen Microscopico"]
        },	
        "sangreOcultaHeces":"laboratorio parasitologia",
        "gotaGruesa":"laboratorio parasitologia",
        "frotisLesion":"laboratorio parasitologia",
    }
    this.parasitologiaService.PostParasitologia('asdw',request).subscribe((resp)=>{
      console.log(resp);
      
    })
    
  }
  cancelar(){
  }

}
