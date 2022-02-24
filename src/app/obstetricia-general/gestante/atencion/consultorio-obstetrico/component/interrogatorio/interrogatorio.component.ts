import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "src/app/obstetricia-general/services/obstetricia-general.service";
import { ConsultasService } from "../../services/consultas.service";

@Component({
  selector: "app-interrogatorio",
  templateUrl: "./interrogatorio.component.html",
  styleUrls: ["./interrogatorio.component.css"],
  providers: [DialogService]
})
export class InterrogatorioComponent implements OnInit {
  form: FormGroup;
  formExamenFetal: FormGroup;
  formExamFisico: FormGroup;
  listaSituacion = [
    { name: "Longitudinal", code: "Longitudinal" },
    { name: "Transversal", code: "Transversal" },
    { name: "Oblicuo", code: "Oblicuo" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaPresentacion = [
    { name: "Cefalico", code: "Cefalico" },
    { name: "Pelvico/Podalico", code: "Pelvico/Podalico" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaPosicion = [
    { name: "Derecha", code: "Derecha" },
    { name: "Izquierda", code: "Izquierda" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaEdema = [
    { name: "+" },
    { name: "++" },
    { name: "+++" },
    { name: "SE" }
  ]
  listaMovimientoFetal = [
    { name: "+" },
    { name: "++" },
    { name: "+++" },
    { name: "No aplica" }
  ];
  listaFuncionesBiologicas=[
    { name:"Conservado"},
    { name:"Alterado"}
  ];
  interrogatorioData: any;
  ref: DynamicDialogRef;
  fetalesExamDialog: boolean = false;
  examenesFetales: any;
  listaExamenesFetos: any[] = [];
  listaOtrosPruebasFisicas: any[] = [];
  examenesFisicosDialog: boolean = false;
  indexEdit: number = 0;
  update: boolean = false;
  idConsulta: string;
  ultimaConsulta: ultimaConsulta;
  edadGestacional: number;

  constructor(
    private fb: FormBuilder,
    public dialog: DialogService,
    private consultaObstetricaService: ConsultasService,
    private messageService: MessageService,
    private obstetriciaService: ObstetriciaGeneralService,
    private router: Router,
  ) {
    this.inicializarForm();
    this.idConsulta = this.obstetriciaService.idGestacion;
    console.log('consulta ', this.obstetriciaService);
    this.getUltimaConsulta();
    // if (this.idConsulta == '') {
    //   this.router.navigate(['dashboard/obstetricia-general/citas'])
    // }
  }

  ngOnInit(): void {
    this.loadData();
  }

  async getUltimaConsulta() {
    let idData = {
      id: this.idConsulta
      // nroHcl: this
    }

    console.log('object data ', idData);
    const response: any = await this.consultaObstetricaService.getLastConsulById(idData);
    this.ultimaConsulta = response.object;
    console.log('ultima consulta', this.ultimaConsulta);
    this.form.get("imc").setValue(this.ultimaConsulta.imc);
  }

  inicializarForm() {
    this.form = this.fb.group({
      temperatura: new FormControl(""),
      presionSisto: new FormControl(""),
      presionDisto: new FormControl(""),
      fc: new FormControl(""),
      fr: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      imc: new FormControl(""),

      apetito: new FormControl(""),
      sed: new FormControl(""),
      suenos: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      apetitoDetalle: new FormControl(""),
      sedDetalle: new FormControl(""),
      suenosDetalle: new FormControl(""),
      estadoAnimoDetalle: new FormControl(""),
      orinaDetalle: new FormControl(""),
      deposicionesDetalle: new FormControl(""),

      motivoConsulta: new FormControl(""),
      anamnesis: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      formaInicio: new FormControl(""),
      curso: new FormControl(""),
      observacion: new FormControl(""),

      piel: new FormControl(""),
      mucosas: new FormControl(""),
      cabeza: new FormControl(""),
      cuello: new FormControl(""),
      cardioVasc: new FormControl(""),
      pulmones: new FormControl(""),
      mamas: new FormControl(""),
      pezones: new FormControl(""),
      abdomen: new FormControl(""),
      pielDetalle: new FormControl(""),
      mucosasDetalle: new FormControl(""),
      cabezaDetalle: new FormControl(""),
      cuelloDetalle: new FormControl(""),
      cardioVascDetalle: new FormControl(""),
      pulmonesDetalle: new FormControl(""),
      mamasDetalle: new FormControl(""),
      pezonesDetalle: new FormControl(""),
      abdomenDetalle: new FormControl(""),
      examenFisicoOtro: new FormControl(""),

      alturaUterina: new FormControl(""),
      selectSituacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      listaPosicion: new FormControl(""),
      fetal: new FormControl(""),
      edema: new FormControl(""),
      clinico: new FormControl(""),
      movimientoFetal: new FormControl(""),
      latidosCardiacosFetales: new FormControl(""),
      miembrosInferiores: new FormControl(""),
      osteotendinoso: new FormControl(""),
      genitalesExter: new FormControl(""),
      vagina: new FormControl(""),
      cuelloUterino: new FormControl(""),
      semanas: new FormControl(""),
      dias: new FormControl(""),
      obsExamFisico: new FormControl(""),
    });

    this.formExamenFetal = this.fb.group({
      movimientoFetal: new FormControl(""),
      selectSituacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      selectPosicion: new FormControl(""),
      latidosCardiacos: new FormControl(""),
    })

    this.formExamFisico = this.fb.group({
      examName: new FormControl(""),
      examResult: new FormControl(""),
      examDetalle: new FormControl(""),
    })
  }

  recuperarDatos() {
    //RECUPERAR DATOS
    console.log('ultima consulta prom ', this.ultimaConsulta);
    let auxPhysicalExam: any[] = [
      { nombreExamen: 'piel', valor: this.form.value.piel, detalle: this.form.value.pielDetalle },
      { nombreExamen: 'mucosas', valor: this.form.value.mucosas, detalle: this.form.value.mucosasDetalle },
      { nombreExamen: 'cabeza', valor: this.form.value.cabeza, detalle: this.form.value.cabezaDetalle },
      { nombreExamen: 'cuello', valor: this.form.value.cuello, detalle: this.form.value.cuelloDetalle },
      { nombreExamen: 'cardioVasc', valor: this.form.value.cardioVasc, detalle: this.form.value.cardioVascDetalle },
      { nombreExamen: 'pulmones', valor: this.form.value.pulmones, detalle: this.form.value.pulmonesDetalle },
      { nombreExamen: 'mamas', valor: this.form.value.mamas, detalle: this.form.value.mamasDetalle },
      { nombreExamen: 'pezones', valor: this.form.value.pezones, detalle: this.form.value.pezonesDetalle },
      { nombreExamen: 'abdomen', valor: this.form.value.abdomen, detalle: this.form.value.abdomenDetalle },
    ]

    for (let i = 0; i < this.listaOtrosPruebasFisicas.length; i++) {
      auxPhysicalExam.push(this.listaOtrosPruebasFisicas[i]);
    }

    this.interrogatorioData = {
      nroHcl: this.ultimaConsulta.nroHcl,
      nroAtencion: 1,
      nroControlSis: this.ultimaConsulta.nroMayorControlSis,
      nroEmbarazo: this.ultimaConsulta.nroEmbarazo,
      tipoDoc: this.ultimaConsulta.tipoDoc,
      nroDoc: this.ultimaConsulta.nroDoc,
      signosVitales: {
        temperatura: this.form.value.temperatura,
        presionSistolica: this.form.value.presionSisto,
        fc: this.form.value.fc,
        fr: this.form.value.fr,
        peso: this.form.value.peso,
        talla: this.form.value.talla,
        imc: this.form.value.imc,
        presionDiastolica: this.form.value.presionDisto,
        perimetroCefalico: null,
      },
      funcionesBiologicas: [
        { funcion: 'Apetito', valor: this.form.value.apetito, detalle: this.form.value.apetitoDetalle },
        { funcion: 'Sed', valor: this.form.value.sed, detalle: this.form.value.sedDetalle},
        { funcion: 'Sueños', valor: this.form.value.suenos, detalle: this.form.value.suenosDetalle},
        { funcion: 'Estado Animo', valor: this.form.value.estadoAnimo, detalle: this.form.value.estadoAnimoDetalle},
        { funcion: 'Orina', valor: this.form.value.orina, detalle: this.form.value.orinaDetalle },
        { funcion: 'Deposiciones', valor: this.form.value.deposiciones, detalle: this.form.value.deposicionesDetalle},
      ],
      anamnesis: this.form.value.anamnesis,
      motivoConsulta: this.form.value.motivoConsulta,
      interMedicinaGeneral:
      {
        tiempoEnfermedad: this.form.value.tiempoEnfermedad,
        formaInicio: this.form.value.formaInicio,
        curso:this.form.value.curso,
        observacion: this.form.value.observacion
      },
      examenesFisicos: auxPhysicalExam,
      obsExamenFisico: this.form.value.obsExamFisico,
      examenesObstetricos: {
        alturaUterina: this.form.value.alturaUterina,
        miembrosInferiores: this.form.value.miembrosInferiores,
        reflejoOsteotendinoso: this.form.value.osteotendinoso,
        genitalesExternos: this.form.value.genitalesExter,
        vagina: this.form.value.vagina,
        cuelloUterino: this.form.value.cuelloUterino,
        edema: this.form.value.edema,
        semanas: this.form.value.semanas,
        dias: this.form.value.dias,
      },
      examenesFetos: this.listaExamenesFetos,
      
    }

    // FIN RECUPERAR DATOS
  }

  guardarDatos() {
    this.recuperarDatos();
    let auxNroFetos = this.interrogatorioData.examenesFetos.length;
    this.consultaObstetricaService.updateConsultas(auxNroFetos, this.interrogatorioData).subscribe((res: any) => {
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }

  openDialogExamenesFeto() {
    this.update = false;
    this.formExamenFetal.reset();
    this.fetalesExamDialog = true;
  }

  recuperarDatosExamFet() {
    this.examenesFetales = {
      movimientosFetales: this.formExamenFetal.value.movimientoFetal,
      situacion: this.formExamenFetal.value.selectSituacion,
      presentacion: this.formExamenFetal.value.selectPresentacion,
      posicion: this.formExamenFetal.value.selectPosicion,
      fcf: this.formExamenFetal.value.latidosCardiacos
    }
  }

  btnGuardarExamFetal() {
    console.log('form ', this.formExamenFetal.value.selectSituacion)
    this.recuperarDatosExamFet();
    this.fetalesExamDialog = false;
    this.listaExamenesFetos.push(this.examenesFetales)
  }

  btnCancelarExamFetal() {
    this.fetalesExamDialog = false;
  }
  openDialogExamenesFinal() {
    this.formExamFisico.reset();
    this.examenesFisicosDialog = true;
  }

  btnGuardarExamFis() {
    let auxExamFis = {
      codigoExamen: null,
      nombreExamen: this.formExamFisico.value.examName,
      valor: this.formExamFisico.value.examResult,
      detalle: this.formExamFisico.value.examDetalle,
    }
    this.listaOtrosPruebasFisicas.push(auxExamFis);
    this.examenesFisicosDialog = false;
  }

  btnCancelarExamFis() {
    this.examenesFisicosDialog = false;
  }

  loadData() {
    let auxData = {
      // id: this.idConsulta,
      nroHcl: this.obstetriciaService.nroHcl,
      nroEmbarazo: this.obstetriciaService.nroEmbarazo,
      nroAtencion: 1
    }
    let Rpta;
    console.log('to recuperar ', auxData);
    this.consultaObstetricaService.getInterrogatorioByEmbarazo(auxData).subscribe((res: any) => {
      Rpta = res.object[0];
      console.log("desde interrogatorio ",Rpta);
      if (Rpta.signosVitales == null) {
        return
      }
      //signos vitales
      this.form.patchValue({ temperatura: Rpta.signosVitales.temperatura });
      this.form.patchValue({ presionSisto: Rpta.signosVitales.presionSistolica });
      this.form.patchValue({ presionDisto: Rpta.signosVitales.presionDiastolica });
      this.form.patchValue({ fc: Rpta.signosVitales.fc });
      this.form.patchValue({ fr: Rpta.signosVitales.fr });
      this.form.patchValue({ peso: Rpta.signosVitales.peso });
      this.form.patchValue({ talla: Rpta.signosVitales.talla });
      //funciones biologicas
      this.form.patchValue({ apetito: Rpta.funcionesBiologicas[0].valor });
      this.form.patchValue({ sed: Rpta.funcionesBiologicas[1].valor });
      this.form.patchValue({ suenos: Rpta.funcionesBiologicas[2].valor });
      this.form.patchValue({ estadoAnimo: Rpta.funcionesBiologicas[3].valor });
      this.form.patchValue({ orina: Rpta.funcionesBiologicas[4].valor });
      this.form.patchValue({ deposiciones: Rpta.funcionesBiologicas[5].valor });

      this.form.patchValue({ apetitoDetalle: Rpta.funcionesBiologicas[0].detalle });
      this.form.patchValue({ sedDetalle: Rpta.funcionesBiologicas[1].detalle });
      this.form.patchValue({ suenosDetalle: Rpta.funcionesBiologicas[2].detalle });
      this.form.patchValue({ estadoAnimoDetalle: Rpta.funcionesBiologicas[3].detalle });
      this.form.patchValue({ orinaDetalle: Rpta.funcionesBiologicas[4].detalle });
      this.form.patchValue({ deposicionesDetalle: Rpta.funcionesBiologicas[5].detalle });
      //consulta datos
      this.form.patchValue({ motivoConsulta: Rpta.motivoConsulta });
      this.form.patchValue({ anamnesis: Rpta.anamnesis });
      this.form.patchValue({ tiempoEnfermedad: Rpta.interMedicinaGeneral.tiempoEnfermedad });
      this.form.patchValue({ formaInicio: Rpta.interMedicinaGeneral.formaInicio });
      this.form.patchValue({ curso: Rpta.interMedicinaGeneral.curso });
      this.form.patchValue({ observacion: Rpta.interMedicinaGeneral.observacion });
      //examenes fisicos
      this.form.patchValue({ piel: Rpta.examenesFisicos[0].valor });
      this.form.patchValue({ mucosas: Rpta.examenesFisicos[1].valor });
      this.form.patchValue({ cabeza: Rpta.examenesFisicos[2].valor });
      this.form.patchValue({ cuello: Rpta.examenesFisicos[3].valor });
      this.form.patchValue({ cardioVasc: Rpta.examenesFisicos[4].valor });
      this.form.patchValue({ pulmones: Rpta.examenesFisicos[5].valor });
      this.form.patchValue({ mamas: Rpta.examenesFisicos[6].valor });
      this.form.patchValue({ pezones: Rpta.examenesFisicos[7].valor });
      this.form.patchValue({ abdomen: Rpta.examenesFisicos[8].valor });

      this.form.patchValue({ pielDetalle: Rpta.examenesFisicos[0].detalle });
      this.form.patchValue({ mucosasDetalle: Rpta.examenesFisicos[1].detalle });
      this.form.patchValue({ cabezaDetalle: Rpta.examenesFisicos[2].detalle });
      this.form.patchValue({ cuelloDetalle: Rpta.examenesFisicos[3].detalle });
      this.form.patchValue({ cardioVascDetalle: Rpta.examenesFisicos[4].detalle });
      this.form.patchValue({ pulmonesDetalle: Rpta.examenesFisicos[5].detalle });
      this.form.patchValue({ mamasDetalle: Rpta.examenesFisicos[6].detalle });
      this.form.patchValue({ pezonesDetalle: Rpta.examenesFisicos[7].detalle });
      this.form.patchValue({ abdomenDetalle: Rpta.examenesFisicos[8].detalle });
      if (Rpta.examenesFisicos.length > 9) {
        this.form.patchValue({ examenFisicoOtro: Rpta.examenesFisicos[9].valor });
      }
      this.form.patchValue({ obsExamFisico: Rpta.obsExamenFisico });
      //examene obstetricos
      console.log("exam",Rpta.examenesObstetricos);
      this.form.patchValue({ miembrosInferiores: Rpta.examenesObstetricos.miembrosInferiores });
      this.form.patchValue({ alturaUterina: Rpta.examenesObstetricos.alturaUterina });
      this.form.patchValue({ edema: Rpta.examenesObstetricos.edema });
      this.form.patchValue({ genitalesExter: Rpta.examenesObstetricos.genitalesExternos });
      this.form.patchValue({ vagina: Rpta.examenesObstetricos.vagina });
      this.form.patchValue({ cuelloUterino: Rpta.examenesObstetricos.cuelloUterino });
      this.form.patchValue({ osteotendinoso: Rpta.examenesObstetricos.reflejoOsteotendinoso });
      this.form.patchValue({ semanas: Rpta.examenesObstetricos.semanas });
      this.form.patchValue({ dias: Rpta.examenesObstetricos.dias });
      //
      this.listaExamenesFetos = Rpta.examenesFetos;
      for (let i = 9; i < Rpta.examenesFisicos.length; i++) {
        this.listaOtrosPruebasFisicas.push(Rpta.examenesFisicos[i]);
      }
    });
  }

  editarExamenFetos(row, index) {
    this.update = true;
    this.indexEdit = index;
    this.fetalesExamDialog = true;
    this.formExamenFetal.patchValue({ selectSituacion: row.situacion });
    this.formExamenFetal.patchValue({ selectPosicion: row.posicion });
    this.formExamenFetal.patchValue({ selectPresentacion: row.presentacion });
    this.formExamenFetal.patchValue({ movimientoFetal: row.movimientosFetales });
    this.formExamenFetal.patchValue({ latidosCardiacos: row.fcf });
    // this.listaExamenesFetos.splice(index,1,)
  }

  btnEditarExamenFetal() {
    this.recuperarDatosExamFet();
    this.listaExamenesFetos.splice(this.indexEdit, 1, this.examenesFetales);
    this.fetalesExamDialog = false;
  }

  eliminar(index) {
    this.listaExamenesFetos.splice(index, 1);
  }

  eliminarExamFisicos(index) {
    this.listaOtrosPruebasFisicas.splice(index, 1);
  }

  calcularEdadGestacional() {
    // let auxFUM: any = new DatePipe('en-CO').transform(this.form.value.dateFUM, 'yyyy/MM/dd')   + (3600000 * 5)
    let pesoActual = this.form.value.pesoHabitual;
    let altura = this.form.value.talla;

    let today = new Date().getTime();
    let auxFUM = new Date(this.form.value.dateFUM).getTime();
    auxFUM = auxFUM + 0;
    console.log('auxFUM ', auxFUM, 'today ', today);
    let auxWeek = today - auxFUM;
    console.log('fecha actual ', auxWeek);
    if (auxWeek < 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Alerta",
        detail: 'La fecha de FUM es incorrecta'
      });
      this.form.patchValue({ dateFUM: '' });
      return;
    }

    this.edadGestacional = auxWeek / (1000 * 60 * 60 * 24);
    let semanasGetacional = Math.trunc(this.edadGestacional / 7);
    let diasGestacional = Math.trunc(this.edadGestacional % 7);
  }
}

export interface ultimaConsulta {
  nroEmbarazo?: number,
  estado?: number,
  direccion?: string,
  edad?: number,
  nroUltimaAtencion?: number,
  nroMayorControlSis?: number,
  nroDoc?: string,
  tipoDoc?: string,
  nroHcl?: string,
  pesoHabitual?: number,
  fum?: string,
  imc?: string
}