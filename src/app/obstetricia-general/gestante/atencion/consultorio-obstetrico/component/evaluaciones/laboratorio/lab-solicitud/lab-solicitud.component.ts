import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ServicesService } from "../services-lab/services.service";
import { number } from "echarts";
import { ConsultasService } from "../../../../services/consultas.service";
import { PrestacionService } from "../../../../../../../../mantenimientos/services/prestacion/prestacion.service";
import { CieService } from "../../../../../../../services/cie.service";
import { AddLaboratorio, Laboratorio, ExamenAuxiliar } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/examenesAuxiliares';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-solicitud',
  templateUrl: './lab-solicitud.component.html',
  styleUrls: ['./lab-solicitud.component.css']
})
export class LabSolicitudComponent implements OnInit {
  formSolicitudLab: FormGroup;
  listaSolicitud: any[] = [];
  listaSolicitud2: any[] = [];
  examGroup: Group[] = [];
  // examName: ExamLab[] = [];
  ListaLab: any;
  dataConsulta: any;
  idConsulta: string;
  prestacion2: any;


  PrestacionLaboratorio: any;
  procedimientos: any;

  Gestacion: any;
  nroAtencion: any;
  diagnosticosList: string;
  listaDeCIESIS: string;
  estadoEdicion: boolean;
  solicitudLaboratorio: Laboratorio

  subTipoLaboratorio: any;
  listaDeCIE: any;
  LugarExamen: any;
  examName: ExamLab[] = [];
  auxExamList: ExamenAuxiliar[] = [];
  listSolicitudes: ExamenAuxiliar[] = [];
  reqExamList: ExamenAuxiliar[] = [];

  constructor(private ref: DynamicDialogRef,
    private DxService: ConsultasService,
    public config: DynamicDialogConfig,
    private servicesService: ServicesService,
    private prestacionService: PrestacionService,
    private CieService: CieService,
    private form: FormBuilder,
    private examenAuxiliarService: ExamenesAuxiliaresService) {

    /**Usando localStorage **/
    this.dataConsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));
    if (!this.estadoEdicion) {
      //guardar en el ls el nroAtencion
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
      this.nroAtencion = nroAtencion;
      // console.log("entre a nueva consulta", this.nroAtencion)
    } else {
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
      this.nroAtencion = nroAtencion;
      // console.log("entre a edicion consulta", this.nroAtencion)
    }
    // console.log('data de id ', this.dataConsulta);
    this.idConsulta = JSON.parse(localStorage.getItem('IDConsulta'));
    this.listarExamenesDisponibles();
    // this.listarSolicitudes()
  }

  ngOnInit(): void {
    this.buildForm();
    this.getPrestacion();
    this.recuperaDataPaciente();
    this.traerDiagnosticosDeConsulta();
    this.listarSolicitudes()
  }

  getPrestacion() {
    this.prestacionService.getPrestacion().subscribe((resp) => {
      this.prestacion2 = resp['object']
      console.log("PRestacion", this.prestacion2[2].descripcion);
    })
  }

  filterCIE10(event) {
    this.CieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }

  recuperaDataPaciente() {
    this.formSolicitudLab.get('edad').setValue(this.dataConsulta.anioEdad);
    this.formSolicitudLab.get('HCL').setValue(this.dataConsulta.nroHcl);
    this.formSolicitudLab.get('servicio').setValue(this.dataConsulta.servicio);
    this.formSolicitudLab.get('apellidosNombres').setValue(this.dataConsulta.datosPaciente.apePaterno + ' ' + this.dataConsulta.datosPaciente.apeMaterno + ' ' + this.dataConsulta.datosPaciente.primerNombre + ' ' + this.dataConsulta.datosPaciente.otrosNombres);
  }

  buildForm() {
    this.formSolicitudLab = this.form.group({
      lista: new FormControl(''),

      apellidosNombres: new FormControl(''),
      edad: new FormControl(''),
      HCL: new FormControl(''),
      servicio: new FormControl(''),
      camaNro: new FormControl(''),
      DxPresuntivo: new FormControl(''),
      observaciones: new FormControl(''),

      /**EXAMENES**/
      HEMATOLOGIA: new FormControl({ value: '', disabled: false }),
      INMUNOLOGIA: new FormControl({ value: '', disabled: false }),
      BIOQUIMICA: new FormControl({ value: '', disabled: false }),
      UROANALISIS: new FormControl({ value: '', disabled: false }),
      PARASITOLOGIA: new FormControl({ value: '', disabled: false }),
      MICRIBIOLOGIA: new FormControl({ value: '', disabled: false }),
      OTROSEXAMENES: new FormControl({ value: '', disabled: false }),

      examen: new FormControl({ value: '', disabled: false }),
      diagnostico: new FormControl({ value: '', disabled: false }),
      prestacion: new FormControl({ value: '', disabled: false }),
      codPrestacion: new FormControl({ value: '', disabled: true }),

      autocompleteSIS: new FormControl({ value: '', disabled: false }),
      SISCIE: new FormControl({ value: '', disabled: false }),
      diagnosticoSIS: new FormControl({ value: '', disabled: false }),
      subTipe: new FormControl({ value: '', disabled: false }),
      HISCIE: new FormControl({ value: '', disabled: false }),
      diagnosticoHIS: new FormControl({ value: '', disabled: false }),
      autocompleteHIS: new FormControl({ value: '', disabled: false }),

      // NOMBRES DE EXAMENES


    })
  }

  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.Gestacion.nroHcl, this.Gestacion.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diag nosticos:", this.diagnosticosList);
    })
  }

  onChangeDiagnostico(event) {
    console.log("Evento", event.value)
    this.procedimientos = event.value.procedimientos;
    this.PrestacionLaboratorio = event.value;
    this.formSolicitudLab.get('codPrestacion').setValue(event.value.codigo);

    console.log("procedimiento", this.procedimientos)
  }

  selectedOptionNameCIE(event, cieType) {
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formSolicitudLab.patchValue({ diagnosticoSIS: event.value.procedimiento });
      this.formSolicitudLab.patchValue({ autocompleteSIS: "" });
      this.formSolicitudLab.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formSolicitudLab.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formSolicitudLab.patchValue({ autocompleteHIS: "" });
      this.formSolicitudLab.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }

  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formSolicitudLab.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formSolicitudLab.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }

  async add() {
    Swal.fire({
      title: '¿Esta seguro que desea guardar?',
      html: 'No se podra eliminar las solicitudes despues',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.savePeticiones()
      }
      else {
        Swal.fire({
          title: 'Cancelado.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  closeDialog() {
    this.ref.close();
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
            nombreExamen: rptaExam[j].nombreExamen,
            saved: false,
            grupo: rptaExam[j].subTipo
          }
          this.examGroup[i].listaExam.push(auxExam)
        }
      }
    }
  }
  async listarExamenesDisponibles() {
    await this.examenAuxiliarService.getExamListLaboratory().then(res => {
      console.log('examenes disponibles ', res);
      this.makeObjExam(res);
    })
  }
  savePeticiones() {
    console.log('data to save ', this.listSolicitudes)
    if (this.listSolicitudes == null) {
      console.log('req to print ');
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
      this.examenAuxiliarService.postPromiseAddServiciosLaboratorio(this.idConsulta, this.solicitudLaboratorio).then(res => {
        this.closeDialog();
      });
    } else {
      this.addAuxExam();
      // console.log('req to update ', this.examName);
      // for (let i = 0; i < this.examName.length; i++) {
      //   // let auxExam: AddLaboratorio = {
      //   //     servicio:'',
      //   //     nroCama:'',
      //   //     observaciones: '',
      //   //     dxPresuntivo:'',
      //   //     examenAuxiliar:{
      //   //         tipoLaboratorio:'EXAMEN_LABORATORIO',
      //   //         subTipo: this.
      //   //     }

      //   // examenAuxiliar:{
      //   //     tipoLaboratorio:'EXAMEN_LABORATORIO',
      //   //     subTipo: this.examName
      //   // }
      // }

    }
    // this.examenAuxiliarService.putAgregarExamenesConsulta(this.idConsulta).then(res => {

    // })
  }

  async listarSolicitudes() {
    await this.examenAuxiliarService.getListarPeticiones(this.idConsulta).then(res => {
      this.listSolicitudes = res.object.examenesAuxiliares;
      // console.log('lista de examens solicitados ', this.listSolicitudes);
      // this.reqExamList = this.listSolicitudes.
      this.listSolicitudes.forEach(item => {
        let auxExam: ExamLab = {
          nombreExamen: item.nombreExamen,
          subTipo: item.subTipo,
          saved: true,
          grupo: item.subTipo
        }

        this.examName.push(auxExam)
      });
      // console.log('ng model exam name', this.examName);
      for (let i = 0; i < this.examGroup.length; i++) {
        for (let j = 0; j < this.examName.length; j++) {
          if (this.examName[j].grupo == this.examGroup[i].nombreGrupo) {
            this.examGroup[i].listaExam.map(item => {
              if (item.nombreExamen == this.examName[j].nombreExamen) {
                console.log('data de nombre ');
                return item.saved = true;
              } else
                return item;
            })
          }
        }
      }

      console.log('lista de examenes DISPONIBLES ', this.examGroup);
      console.log('ng model de exam name ', this.examName);
    });
  }
  async addAuxExam() {
    for (let i = 0; i < this.examName.length; i++) {
      if (!this.examName[i].saved) {
        let addExam: AddLaboratorio = {
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
        await this.examenAuxiliarService.putAgregarExamenesConsulta(this.idConsulta, addExam)
          .then(res => {
            console.log('agrego un examen');
          })
      }
    }
    console.log('cerrar dialog');
    this.closeDialog();
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
  saved: boolean;
  grupo: string;
}