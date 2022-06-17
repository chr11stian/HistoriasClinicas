import { Component, OnInit } from '@angular/core';
import { LaboratorioService } from 'src/app/mantenimientos/services/laboratorio/laboratorio.service';

@Component({
  selector: 'app-ipress-laboratorio',
  templateUrl: './ipress-laboratorio.component.html',
  styleUrls: ['./ipress-laboratorio.component.css']
})
export class IpressLaboratorioComponent implements OnInit {

  examGroup: Group[] = [];
  examName

  constructor(
    private laboratorioService: LaboratorioService
  ) {
    this.listarExamenesGeresa();
  }

  ngOnInit(): void {
  }

  listarExamenesGeresa() {
    this.laboratorioService.getLaboratorioList().then(res => {
      let rptaExam = res.object
      let table: any[] = [];

      rptaExam.filter((item, index) => {
        table.push(item.subTipo);
      })
      let listaExamenes = table.filter((item, index) => {
        return table.indexOf(item) === index;
      })
      for (let i = 0; i < listaExamenes.length; i++) {
        let auxData = {
          nombreGrupo: listaExamenes[i],
          listaExam: []
        }
        this.examGroup.push(auxData);
        for (let j = 0; j < rptaExam.length; j++) {
          if (listaExamenes[i] == rptaExam[j].subTipo) {
            let auxExam: ExamLab = {
              tipoLaboratorio: rptaExam[j].tipoLaboratorio,
              subTipo: rptaExam[j].subTipo,
              nombreExamen: rptaExam[j].nombreExamen,
              estado: rptaExam[j].estado
            }
            this.examGroup[i].listaExam.push(auxExam)
          }
        }
      }
      console.log('lista de examenes ', this.examGroup);
    })
  }
}

interface Group {
  nombreGrupo: string,
  listaExam: ExamLab[]
}
interface ExamLab {
  tipoLaboratorio: string,
  subTipo: string,
  nombreExamen: string,
  codigoHIS?: string,
  codigoSIS?: string,
  estado: string,
}
