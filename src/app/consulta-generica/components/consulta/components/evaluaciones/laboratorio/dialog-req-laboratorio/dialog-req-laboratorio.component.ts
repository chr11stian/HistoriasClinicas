import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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


  constructor(
    private laboService: ExamenesAuxiliaresService,
    private ref: DynamicDialogRef,
    private examenAuxiliarService: ExamenesAuxiliaresService,
    private datosGralService: DatosGeneralesService
  ) {
    this.inicializarForm();

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
    // this.edadPaciente = documento.anio;
    // this.sexoPaciente = documento.sexo;
    // this.idConsulta = documento.idConsulta;
    // this.nroDocPaciente = documento.nroDocumento;
    // this.tipoDocPaciente = documento.tipoDoc;
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
      console.log('data de paciente ', res);
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
    for (let i = 0; i < listaExamenes.length; i++) {
      let auxData = {
        nombreGrupo: listaExamenes[i],
        listaExam: []
      }
      this.examGroup.push(auxData);
      for (let j = 0; j < rptaExam.length; j++) {
        if (listaExamenes[i] == rptaExam[j].subTipo) {
          let auxExam: ExamLab = {
            subTipo: rptaExam[j].subTipo,
            nombreExamen: rptaExam[j].nombreExamen
          }
          this.examGroup[i].listaExam.push(auxExam)
        }
      }
    }
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
    console.log('data to save ', this.solicitudLaboratorio);
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
      console.log('lista de solicitudes ', res);
    })
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
  subTipo: string,
  nombreExamen: string,
  codigoHIS?: string,
  codigoSIS?: string,
}
