import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddLaboratorio, Laboratorio } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/examenesAuxiliares';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { ServicesService } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/component/evaluaciones/laboratorio/services-lab/services.service';
import { ConsultasService } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
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
  listSubTipoLabo: any = [
    {
      nombre: "HEMATOLOGIA"
    },
    {
      nombre: "INMUNOLOGIA"
    },
    {
      nombre: "BIOQUIMICA"
    },
    {
      nombre: "UROANALISIS"
    },
    {
      nombre: "PARASITOLOGIA"
    },
    {
      nombre: "MICROBIOLOGIA"
    },
    {
      nombre: "OTROS EXAMENES"
    },

  ];
  listPrestaciones: any;
  idConsulta: string;
  LugarExamen: any = [
    { nombre: "CONSULTORIO" },
    { nombre: "LABORATORIO" },
  ];
  tipoList = [
    { label: 'DEFINITIVO', value: 'D' },
    { label: 'PRESUNTIVO', value: 'P' },
    { label: 'REPETITIVO', value: 'R' },
  ];
  listNombreUPS: any;
  dataLabo: AddLaboratorio;
  PrestacionLaboratorio: any;
  listaUps: any;
  listaUpsHis: any;
  idIpress: any;
  edadPaciente: string;
  sexoPaciente: string;
  listExamsName: any[] = [];
  listAllExamns: any;


  constructor(
    private prestacionService: PrestacionService,
    private cieService: CieService,
    private laboService: ExamenesAuxiliaresService,
    private DxService: ConsultasService,
    private ref: DynamicDialogRef,
  ) {
    this.inicializarForm();

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    let documento = JSON.parse(localStorage.getItem('documento'))
    this.edadPaciente = documento.anio;
    this.sexoPaciente = documento.sexo;
    this.idConsulta = documento.idConsulta;
    this.laboService.getListaServiciosLaboratorio().subscribe((res: any) => {
      this.listAllExamns = res.examenes;
      console.log('all exam ', this.listAllExamns);
    });
  }

  ngOnInit(): void {
    this.getPrestacion();
    this.recuperarUPS();
    this.recuperarUpsHis();
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
      nombreUPS: new FormControl(''),
      nombreUPSAux: new FormControl(''),
      nombreExamen: new FormControl(''),

      /**EXAMENES**/
      HEMATOLOGIA: new FormControl(''),
      INMUNOLOGIA: new FormControl(''),
      BIOQUIMICA: new FormControl(''),
      UROANALISIS: new FormControl(''),
      PARASITOLOGIA: new FormControl(''),
      MICRIBIOLOGIA: new FormControl(''),
      OTROSEXAMENES: new FormControl(''),

      examen: new FormControl(''),
      diagnostico: new FormControl(''),
      prestacion: new FormControl(''),
      codPrestacion: new FormControl(''),

      autocompleteSIS: new FormControl(''),
      SISCIE: new FormControl(''),
      diagnosticoSIS: new FormControl(''),
      subTipo: new FormControl(''),
      HISCIE: new FormControl(''),
      diagnosticoHIS: new FormControl(''),
      autocompleteHIS: new FormControl(''),

      lugarExamen: new FormControl(''),

    })
  }
  getPrestacion() {
    this.prestacionService.getPrestacion().subscribe((res: any) => {
      this.listPrestaciones = res.object;
      console.log('data de prestaciones ', this.listPrestaciones);
    })
  }
  getSubTipoLaboratorio() {

  }
  add() {

  }
  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formReqLabo.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formReqLabo.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }
  selectedOptionNameCIE(event, cieType) {
    if (cieType == 0) {
      this.formReqLabo.patchValue({ diagnosticoSIS: event.value.procedimiento });
      this.formReqLabo.patchValue({ autocompleteSIS: "" });
      this.formReqLabo.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formReqLabo.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formReqLabo.patchValue({ autocompleteHIS: "" });
      this.formReqLabo.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }
  filterCIE10(event) {
    this.cieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }
  onChangeDiagnostico(event) {
    console.log("Evento", event.value)
    this.procedimientos = event.value.procedimientos;
    this.PrestacionLaboratorio = event.value;
    this.formReqLabo.get('codPrestacion').setValue(event.value.codigo);

    console.log("procedimiento", this.procedimientos)
  }

  recuperarUPS() {
    this.DxService.listaUps(this.idIpress).then((res: any) => this.listaUps = res.object);
    console.log("DATA PARA UPS", this.listaUps)
  }

  recuperarUpsHis() {
    let Data = {
      idIpress: this.idIpress,
      edad: this.edadPaciente,
      sexo: this.sexoPaciente
    }
    console.log("DATA PARA UPS HIS", Data)
    this.DxService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
  }

  recoverDataReqLabo() {
    this.dataLabo = {
      servicio: '',
      nroCama: this.formReqLabo.value.camaNro,
      examenAuxiliar: {
        tipoLaboratorio: 'EXAMEN_LABORATORIO',
        subTipo: this.formReqLabo.value.subTipo.nombre,
        nombreExamen: this.formReqLabo.value.nombreExamen.nombreExamen,
        nombreExamenSIS: '',
        cie10SIS: this.formReqLabo.value.SISCIE.codigo,
        nombreUPS: this.formReqLabo.value.nombreUPS.nombreUPS,
        nombreUPSAux: this.formReqLabo.value.nombreUPSAux.nombreUPS,
        codigoSIS: this.formReqLabo.value.SISCIE.codigo,
        codigoHIS: this.formReqLabo.value.HISCIE.codigoItem,
        lugarExamen: this.formReqLabo.value.lugarExamen.nombre,
        labExterno: 'false',
        tipoDx: this.formReqLabo.value.DxPresuntivo,
        codPrestacion: this.formReqLabo.value.codPrestacion
      },

    }
  }

  save() {
    console.log('exam ', this.formReqLabo.value.HISCIE);
    this.recoverDataReqLabo();
    console.log(this.dataLabo);
    this.laboService.postAddExamenesAuxiliares(this.idConsulta, this.dataLabo).subscribe((res: any) => {
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

  onChangeExamType(event) {
    this.listExamsName = [];
    console.log('event ', event.value.nombre);
    this.listAllExamns.find(item => {
      item.subTipo === event.value.nombre ? this.listExamsName.push(item) : '';
    })
    console.log('event ', event.value.nombre, this.listExamsName);
  }
}
