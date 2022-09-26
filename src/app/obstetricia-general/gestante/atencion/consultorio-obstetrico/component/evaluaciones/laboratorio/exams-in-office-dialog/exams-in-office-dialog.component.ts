import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LaboratoriosService } from 'src/app/Laboratorio/services/laboratorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams-in-office-dialog',
  templateUrl: './exams-in-office-dialog.component.html',
  styleUrls: ['./exams-in-office-dialog.component.css']
})
export class ExamsInOfficeDialogComponent implements OnInit {

  arrayHemoExams: HemoExam[] = [];
  arrayOtherExam: OtherExam[] = [];
  hemoExamResult: HemoExam[] = [];
  otherExamResult: OtherExam[] = [];
  patientData: Pregmant;
  examForm: FormGroup;
  examName: string[] = [];
  hemo: string[] = [];
  factor: string[] = [];
  firstGroupExams: OtherExam[] = [];
  secondGroupExams: OtherExam[] = [];
  thirdGroupExams: OtherExam[] = [];
  fourthGroupExams: OtherExam[] = [];
  examsToSave: DataSave[] = [];
  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoriosService,
  ) {
    this.patientData = JSON.parse(localStorage.getItem('gestacion'));
    this.recoverExamsOfPregnancy();

  }

  ngOnInit(): void {
  }

  buildFrom() {
    // this.
  }

  async recoverExamsOfPregnancy() {
    await this.laboratoryService.getLaboExamsOfPregnancy(this.patientData.id).then((res: any) => {
      console.log('respuestaaaaaaaaaaaaaaa ', res);
      this.arrayHemoExams = res.object.hemoglobina;
      this.arrayOtherExam = res.object.otrosExamenes;
      this.firstGroupExams = this.divideArray(this.arrayOtherExam, 0, 7);
      this.secondGroupExams = this.divideArray(this.arrayOtherExam, 8, 10);
      this.thirdGroupExams = this.divideArray(this.arrayOtherExam, 11, 21);
      this.fourthGroupExams = this.divideArray(this.arrayOtherExam, 21, 26);
      // this.thirdGroupExams = this.arra
      this.firstGroupExams = this.transformArrayOtherExams(this.firstGroupExams, 'No reactivo', 'Reactivo', 'No se hizo', 'No aplica');
      this.secondGroupExams = this.transformArrayOtherExams(this.secondGroupExams, 'Normal', 'Anormal', 'No se hizo', 'No aplica');
      this.thirdGroupExams = this.transformArrayOtherExams(this.thirdGroupExams, 'Negativo', 'Positivo', 'No se hizo', 'No aplica');
      this.fourthGroupExams = this.transformArrayOtherExams(this.fourthGroupExams, 'Normal', 'Anormal', 'No se hizo', 'No aplica');
    })
  }

  add() {
    this.examsToSave = [];
    let aux: any[] = [];

    this.examName.map(item => {
      let a = item.split('&')

      let auxData: DataSave;
      auxData = {
        nombre: a[0],
        valor: a[1]
      }
      this.examsToSave.push(auxData);
      // aux.push(a);
    });
    let isDuplicated: boolean = false;
    let duplex = new Set(this.examsToSave.map(item => item.nombre))
    duplex.size == this.examsToSave.length ? isDuplicated = false : isDuplicated = true;
    if (isDuplicated) {
      Swal.fire({
        icon: 'info',
        title: 'Solo se selecciona un elemento de la fila',
        text: '',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  divideArray(array: OtherExam[], initial: number, final: number): OtherExam[] {
    let auxArray: OtherExam[] = [];
    array.filter((item, index) => {
      if (index >= initial && index <= final)
        auxArray.push(item)
    });
    return auxArray
  }

  transformArrayOtherExams(otherExams: OtherExam[], valor1: string, valor2: string, valor3: string, valor4: string): OtherExam[] {
    otherExams.map(item => {
      item.valor1 = valor1;
      item.valor2 = valor2;
      item.valor3 = valor3;
      item.valor4 = valor4;
      // if(item.valor="")
    })
    return otherExams;
  }
}

interface HemoExam {
  descripcion: string,
  hg: string,
  conFactorCorrecion: string,
  fecha: string
}
interface OtherExam {
  nombre: string,
  valor: string,
  fecha: string,
  valor1?: string,
  valor2?: string,
  valor3?: string,
  valor4?: string,
}
interface Pregmant {
  estado: string,
  id: string,
  nroConsultas: number,
  nroDoc: string,
  nroEmbarazo: number,
  nroHcl: string,
  tipoDoc: string
}
interface HemoResult {
  hg: string,
  factorCorrec: string
}
interface DataSave {
  nombre: string,
  valor: string,
  cie10?: string
}