import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatosGeneralesService } from 'src/app/consulta-generica/services/datos-generales/datos-generales.service';
import { AddLaboratorio, ExamenAuxiliar, Laboratorio } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/examenesAuxiliares';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-req-laboratorio',
  templateUrl: './dialog-req-laboratorio.component.html',
  styleUrls: ['./dialog-req-laboratorio.component.css']
})
export class DialogReqLaboratorioComponent implements OnInit {

  formReqLabo: FormGroup;

  listaDeCIE: any;
  procedimientos: any;
  listPrestaciones: any;
  idConsulta: string;
  LugarExamen: any = [
    { nombre: "CONSULTORIO" },
    { nombre: "LABORATORIO" },
  ];
  listNombreUPS: any;
  dataLabo: AddLaboratorio;
  PrestacionLaboratorio: any;
  listaUps: any;
  listaUpsHis: any;
  idIpress: any;
  edadPaciente: string;
  sexoPaciente: string;
  nroDocPaciente: string;
  tipoDocPaciente: string;
  listExamsName: any[] = [];
  listAllExamns: any;
  dataPaciente: any;

  examGroup: Group[] = [];
  examName: ExamLab[] = [];
  auxExamList: ExamenAuxiliar[] = [];
  solicitudLaboratorio: Laboratorio
  toEdit: boolean = false;
  dataDialog: any;
  reqLabo: ExamName[] = [];

  constructor(
    private laboService: ExamenesAuxiliaresService,
    private ref: DynamicDialogRef,
    private examenAuxiliarService: ExamenesAuxiliaresService,
    private datosGralService: DatosGeneralesService,
    public config: DynamicDialogConfig,
  ) {
    this.inicializarForm();
    this.dataDialog = this.config.data.auxExams;
    // console.log('dialog data ', this.config.data.auxExams);
    //console.log('dialog data ', this.dataDialog);
    this.toEdit = this.dataDialog ? false : true;
    //console.log('to edit ', this.toEdit);
    // this.dataDialog.length == 0 ? this.toEdit = false : this.toEdit = true;
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
    this.toEdit = this.dataDialog ? true : false;
  }

  ngOnInit(): void {
    this.listarExamenes();
    this.getPacienteByDoc();
    this.listarSolicitudes();
  }
  inicializarForm() {
    this.formReqLabo = new FormGroup({
      apellidosNombres: new FormControl(''),
      edad: new FormControl(''),
      HCL: new FormControl(''),
      servicio: new FormControl(''),
      camaNro: new FormControl(''),
      DxPresuntivo: new FormControl(''),
      observaciones: new FormControl(''),
    })
  }

  getPacienteByDoc() {
    let paciente = {
      tipoDoc: this.dataPaciente.tipoDoc,
      nroDoc: this.dataPaciente.nroDocumento
    }
    this.datosGralService.getPromisePacienteByDoc(paciente).then(res => {
      // //console.log('data de paciente ', res);
      this.formReqLabo.get('edad').setValue(this.dataPaciente.anio);
      this.formReqLabo.get('HCL').setValue(res.object.nroHcl);
      this.formReqLabo.get('servicio').setValue(this.dataPaciente.ups);
      this.formReqLabo.get('apellidosNombres').setValue(res.object.apePaterno + ' ' + res.object.apeMaterno + ' ' + res.object.primerNombre + ' ' + res.object.otrosNombres);
    });
  }

  listarExamenes() {
    this.examenAuxiliarService.getExamListLaboratory().then(res => {
      if (res) {
        this.makeObjExam(res);
      }
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
    // console.log('lista de examenes ', listaExamenes);
    for (let i = 0; i < listaExamenes.length; i++) {
      let auxData = {
        nombreGrupo: listaExamenes[i],
        listaExam: []
      }
      this.examGroup.push(auxData);
      for (let j = 0; j < rptaExam.length; j++) {
        let isSaved: boolean = false;
        if (listaExamenes[i] == rptaExam[j].subTipo) {
          // console.log('respuesta ', rptaExam[j]);
          this.dataDialog.forEach(exam => {
            isSaved = rptaExam[j].nombreExamen == exam.nombreExamen ? true : false;
          });
          let auxExam: ExamLab = {
            subTipo: rptaExam[j].subTipo,
            saved: isSaved,
            nombreExamen: rptaExam[j].nombreExamen
          }
          this.examGroup[i].listaExam.push(auxExam)
        }
      }
    }
    // console.log('grupo de examenes ', this.examGroup);
  }

  performedExams(exam): void {

  }

  save() {
    for (let i = 0; i < this.examName.length; i++) {
      let auxExam: ExamenAuxiliar = {
        tipoLaboratorio: 'EXAMEN_LABORATORIO',
        subTipo: this.examName[i].subTipo,
        nombreExamen: this.examName[i].nombreExamen,
        codPrestacion: '',
        codigoSIS: '',
        codigoHIS: '',
        lugarExamen: 'LABORATORIO',
        labExterno: ''
      }
      this.auxExamList.push(auxExam);
    }
    this.solicitudLaboratorio = {
      servicio: '',
      nroCama: '',
      examenesAuxiliares: this.auxExamList
    }
    // //console.log('data to save ', this.solicitudLaboratorio);
    this.examenAuxiliarService.postPromiseAddServiciosLaboratorio(this.dataPaciente.idConsulta, this.solicitudLaboratorio).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Solicitud de laboratorio guardada correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      this.ref.close();
    })
  }
  async addReq() {
    Swal.fire({
      title: '¿Esta seguro que desea guardar?',
      html: 'Se guardaran las solicitudes de laboratorio',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.toEdit)
          this.addAuxiliarExam();
        else
          this.save();
      } else {
        Swal.fire({
          title: 'Cancelado.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
  listarSolicitudes() {
    this.examenAuxiliarService.getListarPeticiones(this.idConsulta).then(res => {
      // //console.log('lista de solicitudes ', res);
    })
  }

  modelarData(data: any[]): void {
    data.forEach(item => {
      let auxExam: ExamName = {
        examName: item.nombreExamen,
        subTipo: item.subTipo,
        saved: true
      }
      this.reqLabo.push(auxExam);
    })
  }

  reworkDialog(examList: Examen[], requiredExam: ExamName[]): void {
    for (let i = 0; i < examList.length; i++) {
      // examList[i].listaExamName.forEach(exam => {
      for (let j = 0; j < requiredExam.length; j++) {
        examList[i].listaExamName.map(item => {
          if (item.examName == requiredExam[j].examName) return item.saved = true;
          else return item
        })
      }
    }
  }

  async addAuxiliarExam(): Promise<void> {
    for (let i = 0; i < this.examName.length; i++) {
      let auxExam: AddLaboratorio = {
        servicio: '',
        nroCama: '',
        examenAuxiliar: {
          tipoLaboratorio: 'EXAMEN_LABORATORIO',
          subTipo: this.examName[i].subTipo,
          nombreExamen: this.examName[i].nombreExamen,
          codPrestacion: '',
          codigoSIS: '',
          codigoHIS: '',
          lugarExamen: 'LABORATORIO',
          labExterno: ''
        }
      }
      await this.examenAuxiliarService.putAgregarExamenesConsulta(this.dataPaciente.idConsulta, auxExam).then(res => {

      })
    }
    this.closeDialog();
  }
  closeDialog(): void {
    this.ref.close();
  }
}
interface Laboratory {
  subTipe: string,
  examen: string
}
interface Group {
  nombreGrupo: string,
  listaExam: ExamLab[]
}
interface ExamLab {
  subTipo: string;
  nombreExamen: string;
  saved?: boolean;
  codigoHIS?: string;
  codigoSIS?: string;
}
interface Examen {
  groupName: string;
  listaExamName: ExamName[];
}
interface ExamName {
  subTipo: string,
  examName: string
  saved: boolean
}
