import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LaboratorioService } from 'src/app/mantenimientos/services/laboratorio/laboratorio.service';
import Swal from 'sweetalert2';

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
  dataLabo: any[] = [];
  listaExamenes: string[] = [];

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
    // console.log('input de examenes ', rptaExam);
    let table: any[] = [];

    rptaExam.filter((item, index) => {
      table.push(item.subTipo);
    })
    
    this.listaExamenes = table.filter((item, index) => {
      return table.indexOf(item) === index;
    })
    console.log('input de examenes ', this.listaExamenes);
    for (let i = 0; i < this.listaExamenes.length; i++) {
      let auxData = {
        nombreGrupo: this.listaExamenes[i],
        listaExam: []
      }
      this.examGroup.push(auxData);
      for (let j = 0; j < rptaExam.length; j++) {
        if (this.listaExamenes[i] == rptaExam[j].subTipo) {
          let auxExam: ExamLab = {
            tipoLaboratorio: rptaExam[j].tipoLaboratorio,
            subTipo: rptaExam[j].subTipo,
            nombreExamen: rptaExam[j].nombreExamen,
            estado: rptaExam[j].estado,
            id: rptaExam[j].id
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
      console.log('print todos ', auxExams);
      let table: any[] = [];
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
          estado: 'ACTIVADO',
          id: auxExams[i].id,
          precio: auxExams[i].precio
        }
        this.examName.push(auxData)
      }
      console.log('data de examens today ', this.examName);
    })
  }
  save() {
    this.recuperarData();
    console.log('data to save ', this.dataLabo);
    this.laboratorioService.putAddLaboratoryIpress(this.dataLabo).then(res => {
      // if (res.cod) {
        
      // }
      console.log('se guardo correctamente');
      this.examName = [];
      this.listarExamenesIpress();
      this.addExam = false;
      Swal.fire({
        title: 'Se guardo correctamente.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      
    })
  }

  openAddExamDialog() {
    this.formLaboIpress.reset();
    this.addExam = true;
  }
  changeTipe(event) {
    this.listExamsByTipe = [];
    console.log('change value ', event);
    this.examGroup.filter(item => {
      if (item.nombreGrupo == event)
        item.listaExam.map(item => {
          this.listExamsByTipe.push(item);
        })
    })
    console.log('lista de examenes ', this.listExamsByTipe);
  }
  recuperarData() {
    let auxData = {
      laboratorio_id: this.formLaboIpress.value.nombreExamen,
      precio: this.formLaboIpress.value.precio,
    }
    this.dataLabo.push(auxData)
  }
  saveEdit() {
    // this.laboratorioService.
  }
  eliminar() {

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
  id: string
}
