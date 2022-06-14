import { Component, OnInit } from '@angular/core';
import { Parasitologia } from '../../interfaces/parasitologia.interface';

@Component({
  selector: 'app-lab-parasitologia',
  templateUrl: './lab-parasitologia.component.html',
  styleUrls: ['./lab-parasitologia.component.css']
})
export class LabParasitologiaComponent implements OnInit {

  constructor() { }
   data :Parasitologia[] = [{
    resultadosAnalisis:"a",
    resultadosTipoMuestra:"b",
    color:"c",
    consistencia:"d",
    ph:"e",
    reaccion:"f",
    mucus:"g",
    sangre:"h",
    restosAlimenticios:"i",
    filamentosMucoides:"j",
    leucocitos:"k",
    hematies:"l",
    cuerposGrasos:"m",
    levaduras:"n",
    bacterias:"ñ",
    huevosDe:"o",
    quistesDe:"p",
    trofozoitosDe:"q",
    larvasDe:"r",
    sangreOcultaHeces:"s",
    gotaGruesaDxMalaria:"t",
    frotisLesionDLeishmaniosis:"u"
  }]
  ngOnInit(): void {
  } 

}
