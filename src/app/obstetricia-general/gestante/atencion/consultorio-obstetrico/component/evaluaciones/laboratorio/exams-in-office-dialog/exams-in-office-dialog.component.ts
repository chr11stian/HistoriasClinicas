import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { LaboratoriosService } from 'src/app/Laboratorio/services/laboratorios.service';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import Swal from 'sweetalert2';
import { DataExamSave, HemoExam, LaboratoryExam, OtherExam, Pregmant } from '../../models/laboratorio.interface';

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
  hemo: string[] = [];
  factor: string[] = [];
  firstGroupExams: OtherExam[] = [];
  secondGroupExams: OtherExam[] = [];
  thirdGroupExams: OtherExam[] = [];
  fourthGroupExams: OtherExam[] = [];
  examsToSave: DataExamSave[] = [];
  hemoForm = this.fb.group({
    hemoglobina: this.fb.array([])
  });
  otherExamForm: FormGroup;
  isHemoFormCreated: boolean = false;
  consultationId: string;
  savedItems: any[] = [];
  examsDoInConsultation: LaboratoryExam[] = [];
  firstArrayLocalExam: string[] = ['VDRL/RPR 1', 'VDRL/RPR 2', 'TPHA/VDRL (RPR REACTIVO)', 'VIH PRUEBA RAPIDA 1', 'VIH PRUEBA RAPIDA 2', 'PR HEPATITIS'];
  secondArrayLocalExam: string[] = ['GLICEMIA 1', 'GLICEMIA 2'];
  thirdArrayLocalExam: string[] = ['EX. COMP ORINA 1', 'EX. COMP ORINA 2', 'EX. COMP ORINA 3', 'BACTERIURIA'];
  consultationStatus$ = this.obstetriciaGeneralService.consultationStatus$;
  consultationFinished: boolean = false;
  actualConsultation: any;

  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoriosService,
    private auxExamService: ExamenesAuxiliaresService,
    private ref: DynamicDialogRef,
    private obstetriciaGeneralService: ObstetriciaGeneralService,
  ) {
    this.patientData = JSON.parse(localStorage.getItem('gestacion'));
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));
    this.actualConsultation = JSON.parse(localStorage.getItem('datosConsultaActual'));
    this.actualConsultation ? this.actualConsultation.estadoAtencion == 2 ? this.consultationFinished = true : this.consultationFinished = false : this.consultationFinished = false;
    this.recoverExamsOfConsultation();
    this.recoverExamsOfPregnancy();
  }

  ngOnInit(): void {
  }

  get hemoglobina() {
    return this.hemoForm.controls["hemoglobina"] as FormArray;
  }

  get otherExam() {
    return this.otherExamForm.controls["otherExam"] as FormArray;
  }

  loadHemoglobinFormArray(hemoArray: HemoExam[], laboExams: LaboratoryExam[]): void {
    let auxLab: any = laboExams.filter(item => item.nombreExamen == 'DOSAJE DE HEMOGLOBINA');
    // console.log('data de aux lab', auxLab);
    auxLab = auxLab.length == 0 ? '' : auxLab[0].lab;
    hemoArray.forEach(item => {
      let isDisabled: boolean;
      item.idConsulta == this.consultationId ? isDisabled = false : isDisabled = true;
      let auxFactorCorreccion = String(item.conFactorCorreccion);
      let auxHg = (item.hg);
      isDisabled ? this.isHemoFormCreated : this.isHemoFormCreated = true;
      const hemo = this.fb.group({
        hg: [{ value: auxHg, disabled: isDisabled }],
        conFactorCorreccion: [{ value: auxFactorCorreccion, disabled: isDisabled }],
        fecha: [{ value: item.fecha, disabled: isDisabled }],
        lab: [{ value: isDisabled ? '' : auxLab, disabled: isDisabled }]
      })
      this.hemoglobina.push(hemo);
    });
    this.addHemo();
  }

  addHemo(): void {
    const hemoForm = this.fb.group({
      hg: ['', Validators.required],
      conFactorCorreccion: ['', Validators.required],
      lab: [''],
      fecha: ['']
    });
    this.hemoglobina.push(hemoForm);
    this.isHemoFormCreated = true;
  }

  deleteHemoExam() {
    let index = this.hemoForm.value.hemoglobina.length;
    // console.log('index ', index);
    this.hemoglobina.removeAt(index - 1);
    this.isHemoFormCreated = false;
  }

  async recoverExamsOfPregnancy() {
    await this.laboratoryService.getLaboExamsOfPregnancy(this.patientData.id).then((res: any) => {
      this.arrayHemoExams = res.object.hemoglobina.filter(item => item.hg != 0);
      // console.log('array of hemo ', this.arrayHemoExams);
      this.arrayOtherExam = res.object.otrosExamenes;
      this.firstGroupExams = this.divideArray(this.arrayOtherExam, 0, 7, this.firstArrayLocalExam);
      this.secondGroupExams = this.divideArray(this.arrayOtherExam, 8, 10, this.secondArrayLocalExam);
      this.thirdGroupExams = this.divideArray(this.arrayOtherExam, 11, 21, this.thirdArrayLocalExam);
      setTimeout(() => {
        this.loadHemoglobinFormArray(this.arrayHemoExams, this.examsDoInConsultation);
        this.firstGroupExams = this.transformArrayOtherExams(this.firstGroupExams, 'NO REACTIVO', 'REACTIVO', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
        // this.loadOtherExams(this.firstGroupExams);
        this.secondGroupExams = this.transformArrayOtherExams(this.secondGroupExams, 'NORMAL', 'ANORMAL', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
        this.thirdGroupExams = this.transformArrayOtherExams(this.thirdGroupExams, 'NEGATIVO', 'POSITIVO', 'NO SE HIZO', 'NO APLICA', this.examsDoInConsultation);
      }, 400);
    })
  }

  async recoverExamsOfConsultation(): Promise<void> {
    await this.auxExamService.getListarPeticiones(this.consultationId).then(res => {
      if (res.object == null) {
        return;
      }
      this.examsDoInConsultation = res.object.examenesAuxiliares;
      this.examsDoInConsultation = this.examsDoInConsultation.filter(item => item.lugarExamen == "CONSULTORIO");
    });
  }

  divideArray(array: OtherExam[], initial: number, final: number, localExams: string[]): OtherExam[] {
    let auxArray: OtherExam[] = [];
    array.filter((item, index) => {
      if (index >= initial && index <= final)
        localExams.forEach(exam => {
          if (exam == item.nombre) {
            auxArray.push(item)
          }
        })
    });
    return auxArray;
  }

  transformArrayOtherExams(otherExams: OtherExam[], valor1: string, valor2: string, valor3: string, valor4: string, consultationExam: LaboratoryExam[]): OtherExam[] {
    otherExams.map((item, index) => {
      item.valor1 = valor1;
      item.valor2 = valor2;
      item.valor3 = valor3;
      item.valor4 = valor4;
      item.saved = false;
      if (item.valor.length > 0) {
        let auxNgModel: string[] = [];
        let val: string = item.nombre + '&' + item.valor
        auxNgModel.push(val)
        item.valor = auxNgModel;
        item.saved = true;
        consultationExam.forEach((exam) => {
          if (item.nombre === exam.nombreExamen) {
            item.saved = false;
            item.lab = exam.lab;
          }
        })
      }
    });
    return otherExams;
  }

  saveLaboExams(): void {
    let allDataExams: any[] = [].concat(this.firstGroupExams, this.secondGroupExams, this.thirdGroupExams);

    let allHemoExams = this.hemoForm.value.hemoglobina;
    // console.log('data de hemos ', allHemoExams);
    let isDuplicated: boolean = false;
    allDataExams = allDataExams.filter(item => {
      if (item.valor.length > 1) {
        Swal.fire({
          icon: 'info',
          title: 'Solo se debe seleccionar un elemento de la fila',
          showConfirmButton: false,
          timer: 2000,
        })
        isDuplicated = true;
        return;
      }
      if (!item.saved && item.valor.length == 1) {
        return item;
      }
    })
    if (!isDuplicated) {
      this.assignCIE10(allDataExams);
      this.examsToSave = this.buildArrayToSave(allDataExams, allHemoExams);
      // console.log('data to save', this.examsToSave);
      this.laboratoryService.postSaveLabExamInConsultation(this.consultationId, this.patientData.id, this.examsToSave).then((res: any) => {
        if (res.cod == "2126") {
          this.ref.close();
        }
      });
    }
  }

  assignCIE10(arrayExams: OtherExam[]): void {
    arrayExams.map(item => {
      if (item.nombre == 'VDRL/RPR 1' || item.nombre == 'VDRL/RPR 2' || item.nombre == 'TPHA/VDRL (RPR REACTIVO)') {
        item.cie10 = '86780'
      }
      if (item.nombre == 'VIH PRUEBA RAPIDA 1' || item.nombre == 'VIH PRUEBA RAPIDA 2') {
        item.cie10 = '86703'
      }
      if (item.nombre == 'PR HEPATITIS') {
        item.cie10 = '87342'
      }
      if (item.nombre == 'GLICEMIA 1' || item.nombre == 'GLICEMIA 2') {
        item.cie10 = '82948'
      }
      if (item.nombre == 'EX. COMP ORINA 1' || item.nombre == 'EX. COMP ORINA 2' || item.nombre == 'EX. COMP ORINA 3' || item.nombre == 'BACTERIURIA') {
        item.cie10 = '81002'
      }
    })
  }

  buildArrayToSave(arrayExam: OtherExam[], arrayHemo: HemoExam[]): DataExamSave[] {
    let auxData: DataExamSave[] = [];
    if (arrayHemo.length > 0) {
      arrayHemo.forEach(item => {
        if (String(item.hg) != '') {
          let auxExam: DataExamSave = {
            nombreExamen: 'DOSAJE DE HEMOGLOBINA',
            nombreExamenSIS: 'EXAMEN DE LABORATORIO',
            cie10SIS: 'Z01.7',
            nombreUPS: 'OBSTETRICIA',
            nombreUPSaux: 'MATERNO',
            codPrestacion: '071',
            codigoSIS: '',
            codigoHIS: '85018',
            tipoDx: 'D',
            lab: item.lab,
            valor: String(item.hg),
            factorCorreccion: Number(item.conFactorCorreccion)
          }
          auxData.push(auxExam);
        }
      });
    }

    if (arrayExam.length > 0) {
      arrayExam.forEach(item => {
        let auxValue = item.valor[0].split('&');
        let auxExam: DataExamSave = {
          nombreExamen: item.nombre,
          nombreExamenSIS: 'EXAMEN DE LABORATORIO',
          cie10SIS: 'Z01.7',
          nombreUPS: 'OBSTETRICIA',
          nombreUPSaux: 'MATERNO',
          codPrestacion: '071',
          codigoSIS: '',
          codigoHIS: item.cie10,
          tipoDx: 'D',
          lab: item.lab == undefined ? null : item.lab,
          valor: auxValue[1],
        }
        auxData.push(auxExam);
      });
    }
    return auxData;
  }

  addHemo1() {
    // console.log('valor de la hemoglobina ', this.hemoForm.value.hemoglobina);
  }
}