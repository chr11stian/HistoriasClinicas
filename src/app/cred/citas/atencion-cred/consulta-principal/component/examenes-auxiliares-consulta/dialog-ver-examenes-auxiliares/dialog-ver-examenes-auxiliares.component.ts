import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Hematologia, Parasitologia } from '../../../models/examenesAuxiliares';

@Component({
  selector: 'app-dialog-ver-examenes-auxiliares',
  templateUrl: './dialog-ver-examenes-auxiliares.component.html',
  styleUrls: ['./dialog-ver-examenes-auxiliares.component.css']
})
export class DialogVerExamenesAuxiliaresComponent implements OnInit {
  dataAuxliarsExams: any;
  examType: number;
  dataHematologia: Hematologia;
  dataParasitologia: Parasitologia;

  constructor(
    public config: DynamicDialogConfig
  ) {
    this.dataAuxliarsExams = this.config.data;
    if (this.dataAuxliarsExams.datosLaboratorio.subTipo == 'HEMATOLOGIA') {
      this.examType = 1;
    }
    if (this.dataAuxliarsExams.datosLaboratorio.subTipo == 'PARASITOLOGIA') {
      this.examType = 2;
    }
    // if (this.dataAuxliarsExams.datosLaboratorio.nombreExamen == 'PARASITO SERIADO') {
    //   this.examType = 3;
    // }
    this.reagroupDataLabo();
    console.log('data hematologia ', this.dataHematologia);
    console.log('data parasitologia ', this.dataHematologia);
    // let objectArray = Object.values(this.dataHematologia);
    // console.log('data array de hematologia ', objectArray);
  }

  ngOnInit(): void {

  }

  async reagroupDataLabo() {
    if (this.examType == 1) {
      this.dataHematologia = {
        hemoglobina: this.dataAuxliarsExams.hemoglobina,
        hematocrito: this.dataAuxliarsExams.hematocrito,
        grupoSanguineo: this.dataAuxliarsExams.grupoSanguineo,
        factorRH: this.dataAuxliarsExams.factorRH,
        tiempoSangria: this.dataAuxliarsExams.tiempoSangria,
        tiempoCoagulacion: this.dataAuxliarsExams.tiempoCoagulacion,
        tiempoProtrombina: this.dataAuxliarsExams.tiempoProtrombina,
        tiempoTromboplastina: this.dataAuxliarsExams.tiempoTromboplastina,
        reticulocitos: this.dataAuxliarsExams.reticulocitos,
        compatibilidadSanguinea: this.dataAuxliarsExams.compatibilidadSanguinea,
        rctoGlobulosRojos: this.dataAuxliarsExams.rctoGlobulosRojos,
        rctoPlaquetas: this.dataAuxliarsExams.rctoPlaquetas,
        rctoGlobulosBlancos: this.dataAuxliarsExams.rctoGlobulosBlancos,
        blastos: this.dataAuxliarsExams.blastos,
        juveniles: this.dataAuxliarsExams.juveniles,
        neutrofilos: this.dataAuxliarsExams.neutrofilos,
        nAbastonados: this.dataAuxliarsExams.nAbastonados,
        nSegmentados: this.dataAuxliarsExams.nSegmentados,
        linfocitos: this.dataAuxliarsExams.linfocitos,
        monocitos: this.dataAuxliarsExams.monocitos,
        eosinofilos: this.dataAuxliarsExams.eosinofilos,
        basofilos: this.dataAuxliarsExams.basofilos,
        vsg1hora: this.dataAuxliarsExams.vsg1hora,
        vsg2hora: this.dataAuxliarsExams.vsg2hora,
        vcm: this.dataAuxliarsExams.vcm,
        vrVcm: this.dataAuxliarsExams.vrVcm,
        chcm: this.dataAuxliarsExams.chcm,
        vrChcm: this.dataAuxliarsExams.vrChcm,
        hcm: this.dataAuxliarsExams.hcm,
        vrHcm: this.dataAuxliarsExams.vrHcm // 30
      }
    }
    if (this.examType == 2) {
      this.dataParasitologia = {
        examenMacroscopico: this.dataAuxliarsExams.examenMacroscopico,
        examenMicroscopico: this.dataAuxliarsExams.examenMicroscopico,
        sangreOcultaHeces: this.dataAuxliarsExams.sangreOcultaHeces,
        gotaGruesa: this.dataAuxliarsExams.gotaGruesa,
        frotisLesion: this.dataAuxliarsExams.frotisLesion
      }
    }
  }

}
