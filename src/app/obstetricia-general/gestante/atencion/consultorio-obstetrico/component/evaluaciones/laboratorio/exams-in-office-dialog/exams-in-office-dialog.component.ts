import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { LaboratoriosService } from 'src/app/Laboratorio/services/laboratorios.service';
import Swal from 'sweetalert2';
import { DataSave, HemoExam, LaboratoryExam, OtherExam, Pregmant } from '../../models/laboratorio.interface';

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
  consultationId: string;
  savedItems: any[] = [];
  examsDoInConsultation: LaboratoryExam[] = [];
  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoriosService,
    private auxExamService: ExamenesAuxiliaresService
  ) {
    this.patientData = JSON.parse(localStorage.getItem('gestacion'));
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));
    this.recoverExamsOfConsultation();
    this.recoverExamsOfPregnancy();
  }

  ngOnInit(): void {

  }

  get hemoglobina() {
    return this.hemoForm.controls["hemoglobina"] as FormArray;
  }

  loadHemoglobinFormArray(hemoArray: HemoExam[]): void {
    console.log('arreglos de hemo ', hemoArray);
    hemoArray.forEach(item => {
      let auxFactorCorreccion = parseFloat(item.conFactorCorreccion);
      let auxHg = parseFloat(item.hg);
      const hemo = this.fb.group({
        hg: [auxHg],
        factorCorreccion: [auxFactorCorreccion],
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

  deleteHemoExam() {
    let index = this.hemoForm.value.hemoglobina.length - 1;
    // console.log('index ', this.);
    this.hemoglobina.removeAt(index);
    this.isHemoFormCreated = false;
  }

  async recoverExamsOfPregnancy() {
    await this.laboratoryService.getLaboExamsOfPregnancy(this.patientData.id).then((res: any) => {
      this.arrayHemoExams = res.object.hemoglobina;
      this.arrayOtherExam = res.object.otrosExamenes;
      console.log('data de los otros examenes ', this.arrayOtherExam);
      this.firstGroupExams = this.divideArray(this.arrayOtherExam, 0, 7);
      this.secondGroupExams = this.divideArray(this.arrayOtherExam, 8, 10);
      this.thirdGroupExams = this.divideArray(this.arrayOtherExam, 11, 21);
      this.fourthGroupExams = this.divideArray(this.arrayOtherExam, 21, 26);
      // this.thirdGroupExams = this.arra
      this.loadHemoglobinFormArray(this.arrayHemoExams);
      this.firstGroupExams = this.transformArrayOtherExams(this.firstGroupExams, 'NO REACTIVO', 'REACTIVO', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
      this.secondGroupExams = this.transformArrayOtherExams(this.secondGroupExams, 'NORMAL', 'ANORMAL', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
      this.thirdGroupExams = this.transformArrayOtherExams(this.thirdGroupExams, 'NEGATIVO', 'POSITIVO', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
      this.fourthGroupExams = this.transformArrayOtherExams(this.fourthGroupExams, 'NORMAL', 'ANORMAL', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
      // this.selectSavedItems(this.arrayOtherExam);
    })
  }

  async recoverExamsOfConsultation(): Promise<void> {
    await this.auxExamService.getListarPeticiones(this.consultationId).then(res => {
      this.examsDoInConsultation = res.object.examenesAuxiliares;
      this.examsDoInConsultation = this.examsDoInConsultation.filter(item => item.lugarExamen == "CONSULTORIO");
      console.log('examenes de la consulta ', this.examsDoInConsultation);
    })
  }

  // selectSavedItems(otherExams: OtherExam[]): void {
  //   this.savedItems = otherExams.filter(item => item.valor != '')
  //   // console.log('datos filtrados de otros examenes ', this.savedItems);
  //   this.savedItems.forEach(item => {
  //     let auxNgModel = item.nombre + '&' + item.valor;
  //     this.examName.push(auxNgModel);
  //   });
  // }

  add(): void {
    this.examsToSave = [];
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
    console.log('data to save ', this.examsToSave, 'ng model ', this.examName);
  }

  divideArray(array: OtherExam[], initial: number, final: number): OtherExam[] {
    let auxArray: OtherExam[] = [];
    array.filter((item, index) => {
      if (index >= initial && index <= final)
        auxArray.push(item)
    });
    return auxArray
  }

  transformArrayOtherExams(otherExams: OtherExam[], valor1: string, valor2: string, valor3: string, valor4: string, consultationExam: LaboratoryExam[]): OtherExam[] {
    otherExams.map(item => {
      item.valor1 = valor1;
      item.valor2 = valor2;
      item.valor3 = valor3;
      item.valor4 = valor4;
      item.saved = false;
      if (item.valor != "") {
        let auxNgModel = item.nombre + '&' + item.valor;
        this.examName.push(auxNgModel);
        item.saved = true;
        consultationExam.forEach((exam) => {
          console.log('iguales ', exam.nombreExamen, );
        })
      }
    })
    return otherExams;
  }

  addHemo1() {
    console.log('valor de la hemoglobina ', this.hemoForm.value.hemoglobina.length);
  }
}