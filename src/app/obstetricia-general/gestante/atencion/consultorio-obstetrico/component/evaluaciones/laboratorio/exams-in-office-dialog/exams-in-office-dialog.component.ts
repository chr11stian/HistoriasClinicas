import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  hemoForm = this.fb.group({
    hemoglobina: this.fb.array([])
  });
  isHemoFormCreated: boolean = false;
  dataHemoExam = [{ hg: '1', factorCorreccion: '1', fecha: '2022-09-08' }]
  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoriosService,
  ) {
    this.patientData = JSON.parse(localStorage.getItem('gestacion'));
    this.recoverExamsOfPregnancy();

  }

  ngOnInit(): void {
    // this.hemoForm.get('hemoglobina').setValue(this.dataHemoExam);
    // this.hemoForm.patchValue({ hemoglobina: this.dataHemoExam });
    // this.hemoForm.patchValue(this.dataHemoExam)
    this.loadFormArray();
  }

  get hemoglobina() {
    return this.hemoForm.controls["hemoglobina"] as FormArray;
  }

  loadFormArray() {
    this.dataHemoExam.forEach(item => {
      const hemo = this.fb.group({
        hg: [item.hg],
        factorCorreccion: [item.factorCorreccion],
        fecha: [item.fecha]
      })
      this.hemoglobina.push(hemo)
    })
  }

  addHemo(): void {
    const hemoForm = this.fb.group({
      hg: ['', Validators.required],
      factorCorreccion: ['', Validators.required],
      fecha: ['']
    });
    this.hemoglobina.push(hemoForm);
    this.isHemoFormCreated = true;
  }

  deleteHemoExam(index: number) {
    this.hemoglobina.removeAt(index);
    this.isHemoFormCreated = false;
  }

  async recoverExamsOfPregnancy() {
    await this.laboratoryService.getLaboExamsOfPregnancy(this.patientData.id).then((res: any) => {
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



  addHemo1() {
    console.log('valor de la hemoglobina ', this.hemoForm.value.hemoglobina);
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