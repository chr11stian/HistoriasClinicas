import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LaboratorioService } from 'src/app/mantenimientos/services/laboratorio/laboratorio.service';

@Component({
  selector: 'app-ipress-laboratorio',
  templateUrl: './ipress-laboratorio.component.html',
  styleUrls: ['./ipress-laboratorio.component.css']
})
export class IpressLaboratorioComponent implements OnInit {

  examGroup: Group[] = [];
  examName: ExamLab[] = [];
  addExam: boolean = false;
  listSubTipos: string[] = []
  formLaboIpress: FormGroup;
  listExamsByTipe: any[] = [];

  constructor(
    private laboratorioService: LaboratorioService
  ) {
    this.listarExamenesIpress();
    this.listarExamenesGeresa();
    this.inicializarForm()
  }

  ngOnInit(): void {
  }
  inicializarForm() {
    this.formLaboIpress = new FormGroup({
      subTipo: new FormControl(''),
      nombreExamen: new FormControl(''),
      precio: new FormControl('')
    })
  }

  makeObjExam(rptaExam) {
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
  }

  async listarExamenesGeresa() {
    await this.laboratorioService.getLaboratorioList().then(res => {
      this.makeObjExam(res.object);
    })
  }
  async listarExamenesIpress() {
    await this.laboratorioService.getIpressExamListLaboratory().then(res => {
      let auxExams = res.object;
      let table: any[] = [];
      console.log('lista de examenes de la ipress', auxExams);
      auxExams.filter(item => {
        table.push(item.subTipo)
      })
      this.listSubTipos = table.filter((item, index) => {
        return table.indexOf(item) === index;
      })
      console.log('lista de subtipos ', this.listSubTipos);
      for (let i = 0; i < auxExams.length; i++) {
        let auxData = {
          tipoLaboratorio: auxExams[i].tipoLaboratorio,
          subTipo: auxExams[i].subTipo,
          nombreExamen: auxExams[i].nombreExamen,
          estado: 'ACTIVADO'
        }
        this.examName.push(auxData)
      }
      console.log('data de examens today ', this.examName);
    })
  }
  save() {
    console.log('examenes ', this.examName);
  }

  openAddExamDialog() {
    this.addExam = true;
  }
  changeTipe(event) {
    this.listExamsByTipe = [];
    console.log('change value ', event.value);
    this.examGroup.filter(item => {
      if (item.nombreGrupo == event.value)
        item.listaExam.map(item => {
          this.listExamsByTipe.push(item)
        })
    })
    console.log('lista de examenes ', this.listExamsByTipe);
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
