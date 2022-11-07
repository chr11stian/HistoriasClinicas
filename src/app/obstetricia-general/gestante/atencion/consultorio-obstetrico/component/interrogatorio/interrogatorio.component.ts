import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ImcService } from "src/app/obstetricia-general/services/imc.service";
import { ObstetriciaGeneralService } from "src/app/obstetricia-general/services/obstetricia-general.service";
import Swal from "sweetalert2";
import { IntervaloPartoService } from "../../../plan-parto/services/intervalo-parto/intervalo-parto.service";
import { ConsultasService } from "../../services/consultas.service";
import { ModalPlanPartoComponent } from "../modal-plan-parto/modal-plan-parto.component";

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
  listaFuncionesBiologicas = [
    { name: "Conservado" },
    { name: "Alterado" }
  ];
  listaIndicadores = [
    { name: "GANANCIA INADECUADA DE PESO", code: "GIP" },
    { name: "GANANCIA ADECUADA DE PESO", code: "GAP" },
    { name: "GANANCIA ELEVADA DE PESO", code: "GEP" },
  ];
  interrogatorioData: any;
  ref: DynamicDialogRef;
  refPlanParto: DynamicDialogRef
  fetalesExamDialog: boolean = false;
  examenesFetales: any;
  listaExamenesFetos: any[] = [];
  listaOtrosPruebasFisicas: any[] = [];
  examenesFisicosDialog: boolean = false;
  indexEdit: number = 0;
  update: boolean = false;
  ultimaConsulta: ultimaConsulta;
  edadGestacional: number;

  idConsulta: string;
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  nroEmbarazo: string;
  nroHcl: string;

  Gestacion: any;
  dataPaciente2: any;
  estadoEdicion: Boolean;

  nroAtencion: any;
  nroFetos: any;
  chkLatidos: boolean = false;

  estadoEditar: boolean;
  consultationId: string;
  constructor(
    private fb: FormBuilder,
    public dialog: DialogService,
    private consultaObstetricaService: ConsultasService,
    private messageService: MessageService,
    private obstetriciaService: ObstetriciaGeneralService,
    private router: Router,
    private imcService: ImcService,
    private intervaloPartoService: IntervaloPartoService
  ) {
    this.inicializarForm();
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
    let dataconsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
    this.nroDeConsulta = dataconsulta == null ? this.Gestacion.nroConsultas + 1 : dataconsulta.nroAtencion;
    console.log('nro de consultas ', this.nroAtencion);

    //estado para saber que estado usar en consultas
    this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));
    console.log('estado edicion ', this.estadoEdicion);
    if (this.Gestacion == null) {
      this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
      this.nroDocRecuperado = this.dataPaciente2.nroDoc;
      this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
      this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
      this.nroHcl = this.dataPaciente2.nroHcl;
    } else {
      this.tipoDocRecuperado = this.Gestacion.tipoDoc;
      this.nroDocRecuperado = this.Gestacion.nroDoc;
      this.idConsulta = this.Gestacion.id;
      this.nroEmbarazo = this.Gestacion.nroEmbarazo;
      this.nroHcl = this.Gestacion.nroHcl;
    }
    this.estadoEditar = JSON.parse(localStorage.getItem('consultaEditarEstado'));
    if (!this.estadoEdicion) {
      //guardar en el ls el nroAtencion
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
      this.nroAtencion = nroAtencion;
      let triaje = JSON.parse(localStorage.getItem('datacupos'));
      this.form.get("temperatura").setValue(triaje.funcionesVitales.temperatura);
      this.form.get("presionSisto").setValue(triaje.funcionesVitales.presionSistolica);
      this.form.get("presionDisto").setValue(triaje.funcionesVitales.presionDiastolica);
      this.form.get("fc").setValue(triaje.funcionesVitales.fc);
      this.form.get("fr").setValue(triaje.funcionesVitales.fr);
      this.form.get("peso").setValue(triaje.funcionesVitales.peso);
      this.form.get("talla").setValue(triaje.funcionesVitales.talla);
      // this.form.get("imc").setValue(Math.round(triaje.funcionesVitales.imc * 100) / 100);
    }
    else {
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
      this.nroAtencion = nroAtencion;

    }
    this.getUltimaConsulta();
  }

  ngOnInit(): void {
    this.loadData();
    this.getPlanParto()
  }

  async getUltimaConsulta() {
    let idData = {
      id: this.idConsulta
      // nroHcl: this
    }
    const response: any = await this.consultaObstetricaService.getLastConsulById(idData);
    this.ultimaConsulta = response.object;
    this.nroFetos = this.ultimaConsulta.nroFetos;
    console.log('ultima consultarrrrrr', this.ultimaConsulta);
    console.log("nnro fetos", this.ultimaConsulta.nroFetos)
    this.form.get("imc").setValue(this.ultimaConsulta.imc);
    this.form.get("pesoHabitual").setValue(this.ultimaConsulta.pesoHabitual);
    this.form.patchValue({ nroFetos: this.nroFetos });
    this.calcularEdadGestacional(this.ultimaConsulta.fum);
    if (this.estadoEditar) {
      this.loadData();
    }
  }

  calcularEdadGestacional(fum) {
    if (fum) {
      let today = new Date().getTime();
      let auxFUM = new Date(fum).getTime();
      auxFUM = auxFUM + 0;
      let auxWeek = today - auxFUM;
      let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));

      this.form.get("semanas").setValue(Math.trunc(edadGestacional / 7));
      this.form.get("dias").setValue(edadGestacional % 7);
      console.log('edad gestacional ', edadGestacional);
    }
  }
  calcularGanancia() {

    let gananciaPeso = Math.round(((this.form.value.peso - this.form.value.pesoHabitual) + Number.EPSILON) * 100) / 100;
    console.log("ganancia de peso", gananciaPeso);
    let imc = this.form.value.imc;
    let indicador = "";
    let semanas = this.form.value.semanas;
    this.form.get("evalNutricionalValor").setValue(gananciaPeso);
    if (parseFloat(imc) < 18.5) {//bajo peso
      this.imcService.getGananciaBajoPeso(semanas).subscribe((res: any) => {
        console.log('datos ', res.object.recomendacionGestanteBajoPeso[0]);
        let auxiliar = res.object.recomendacionGestanteBajoPeso[0]

        if (parseFloat(this.form.value.talla) < 157) {
          if (gananciaPeso < auxiliar.min) {
            indicador = "GIP"
          }
          else {
            (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
          }
        }
        else {
          if (gananciaPeso < auxiliar.med) {
            indicador = "GIP"
          }
          else {
            (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
          }
        }
        this.form.get("evalNutricionalIndicador").setValue(indicador);
      });
    }
    else {
      if (parseFloat(imc) < 25) {//normal
        this.imcService.getGananciaPesoRegular(semanas).subscribe((res: any) => {
          let auxiliar = res.object.recomendacionGananciaPesoRegular[0];
          console.log('datos ', auxiliar);
          if (this.form.value.nroFetos < 2) {
            if (parseFloat(this.form.value.talla) < 157) {
              if (gananciaPeso < auxiliar.min) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
              }
            }
            else {
              if (gananciaPeso < auxiliar.med) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
              }
            }
          }
          else {
            if (parseFloat(this.form.value.talla) < 157) {
              if (gananciaPeso < auxiliar.minMult) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.minMult && gananciaPeso < auxiliar.medMult) ? indicador = "GAP" : indicador = "GEP"
              }
            }
            else {
              if (gananciaPeso < auxiliar.medMult) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.medMult && gananciaPeso < auxiliar.maxMult) ? indicador = "GAP" : indicador = "GEP"
              }
            }
          }
          this.form.get("evalNutricionalIndicador").setValue(indicador);
        });
      }
      else {
        if (parseFloat(imc) < 30) {//sobrepeso
          this.imcService.getGananciaSobrePeso(semanas).subscribe((res: any) => {
            let auxiliar = res.object.recomencacionGananciaSobrePeso[0];
            console.log('datos ', res.object);
            if (parseFloat(this.form.value.talla) < 157) {
              if (gananciaPeso < auxiliar.min) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
              }
            }
            else {
              if (gananciaPeso < auxiliar.med) {
                indicador = "GIP"
              }
              else {
                (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
              }
            }
            this.form.get("evalNutricionalIndicador").setValue(indicador);
          });
        }
        else {//obesidad
          this.imcService.getGananciaObesa(semanas).subscribe((res: any) => {
            console.log('datos ', res.object);
            let auxiliar = res.object.recomendacionGananciaObesa[0];
            if (this.form.value.nroFetos < 2) {
              if (parseFloat(this.form.value.talla) < 157) {
                if (gananciaPeso < auxiliar.min) {
                  indicador = "GIP"
                }
                else {
                  (gananciaPeso > auxiliar.min && gananciaPeso < auxiliar.med) ? indicador = "GAP" : indicador = "GEP"
                }
              }
              else {
                if (gananciaPeso < auxiliar.med) {
                  indicador = "GIP"
                }
                else {
                  (gananciaPeso > auxiliar.med && gananciaPeso < auxiliar.max) ? indicador = "GAP" : indicador = "GEP"
                }
              }
            }
            else {
              if (parseFloat(this.form.value.talla) < 157) {
                if (gananciaPeso < auxiliar.minMult) {
                  indicador = "GIP"
                }
                else {
                  (gananciaPeso > auxiliar.minMult && gananciaPeso < auxiliar.medMult) ? indicador = "GAP" : indicador = "GEP"
                }
              }
              else {
                if (gananciaPeso < auxiliar.medMult) {
                  indicador = "GIP"
                }
                else {
                  (gananciaPeso > auxiliar.medMult && gananciaPeso < auxiliar.maxMult) ? indicador = "GAP" : indicador = "GEP"
                }
              }
            }
            this.form.get("evalNutricionalIndicador").setValue(indicador);
          });
        }
      }
    }
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

      evalNutricionalValor: new FormControl(""),
      evalNutricionalIndicador: new FormControl(""),
      pesoHabitual: new FormControl(""),

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

      nroFetos: new FormControl(""),
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
      isChecked: new FormControl(""),
    })

    this.formExamFisico = this.fb.group({
      examName: new FormControl(""),
      examResult: new FormControl(""),
      examDetalle: new FormControl(""),
    })
  }

  recuperarDatos() {
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
      nroHcl: this.nroHcl,
      nroAtencion: this.nroAtencion,
      nroControlSis: this.nroAtencion,
      nroEmbarazo: this.nroEmbarazo,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
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
        { funcion: 'APETITO', valor: this.form.value.apetito, detalle: this.form.value.apetitoDetalle },
        { funcion: 'SED', valor: this.form.value.sed, detalle: this.form.value.sedDetalle },
        { funcion: 'SUEÑOS', valor: this.form.value.suenos, detalle: this.form.value.suenosDetalle },
        { funcion: 'ESTADO ANIMO', valor: this.form.value.estadoAnimo, detalle: this.form.value.estadoAnimoDetalle },
        { funcion: 'ORINA', valor: this.form.value.orina, detalle: this.form.value.orinaDetalle },
        { funcion: 'DEPOSICIONES', valor: this.form.value.deposiciones, detalle: this.form.value.deposicionesDetalle },
      ],
      anamnesis: this.form.value.anamnesis,
      motivoConsulta: this.form.value.motivoConsulta,
      interMedicinaGeneral:
      {
        tiempoEnfermedad: this.form.value.tiempoEnfermedad,
        formaInicio: this.form.value.formaInicio,
        curso: this.form.value.curso,
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
      evaluacionNutricional: {
        valor: this.form.value.evalNutricionalValor,
        indicador: this.form.value.evalNutricionalIndicador
      },
    }
  }

  guardarDatos() {
    this.recuperarDatos();
    this.consultaObstetricaService.updateConsultas(this.form.value.nroFetos, this.Gestacion.id, this.interrogatorioData).subscribe((res: any) => {
      if ([res.code == '2401']) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizo con exito',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo actualizar.',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  openDialogExamenesFeto() {
    this.update = false;
    this.formExamenFetal.reset();
    this.fetalesExamDialog = true;
    this.chkLatidos = false;
  }

  recuperarDatosExamFet() {
    this.examenesFetales = {
      movimientosFetales: this.formExamenFetal.value.movimientoFetal,
      situacion: this.formExamenFetal.value.selectSituacion,
      presentacion: this.formExamenFetal.value.selectPresentacion,
      posicion: this.formExamenFetal.value.selectPosicion,
      fcf: this.formExamenFetal.value.latidosCardiacos == 0 ? 'NA' : this.formExamenFetal.value.latidosCardiacos
    }
  }

  btnGuardarExamFetal() {
    console.log('form ', this.formExamenFetal.value.selectSituacion)
    this.recuperarDatosExamFet();
    this.fetalesExamDialog = false;
    this.listaExamenesFetos.push(this.examenesFetales);
    console.log('examenes fetales ', this.examenesFetales);
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
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    let Rpta;
    console.log('to recuperar ', auxData);
    this.consultaObstetricaService.getInterrogatorioByEmbarazo(this.Gestacion.id, this.consultationId).then((res: any) => {
      Rpta = res.object[0];
      console.log("desde interrogatorio ", Rpta);
      if (Rpta.signosVitales == null) {
        return;
      }
      //signos vitales
      this.form.patchValue({ temperatura: Rpta.signosVitales.temperatura });
      this.form.patchValue({ presionSisto: Rpta.signosVitales.presionSistolica });
      this.form.patchValue({ presionDisto: Rpta.signosVitales.presionDiastolica });
      this.form.patchValue({ fc: Rpta.signosVitales.fc });
      this.form.patchValue({ fr: Rpta.signosVitales.fr });
      this.form.patchValue({ peso: Rpta.signosVitales.peso });
      this.form.patchValue({ talla: Rpta.signosVitales.talla });
      this.form.patchValue({ imc: Rpta.signosVitales.imc });

      this.form.patchValue({ evalNutricionalValor: Rpta.evaluacionNutricional.valor });
      this.form.patchValue({ evalNutricionalIndicador: Rpta.evaluacionNutricional.indicador });

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
      console.log("exam", Rpta.examenesObstetricos);
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

  latidosNA(event) {
    this.chkLatidos = event.checked;
    console.log('chked ', this.chkLatidos);
    this.chkLatidos! ? this.formExamenFetal.patchValue({ latidosCardiacos: null }) : '';
  }
  //plan parto
  listaPlanParto: any[] = []
  dataEnviarPlanParto = {}
  nroDeConsulta: number = 0;
  getPlanParto() {
    this.intervaloPartoService.getPlanbyIdFiliacion(this.Gestacion.id).subscribe((resp: any) => {
      if (resp.cod == '2040') {
        const objeto = {
          fechaAtencion: resp.object.planItems[0].fecha,
          edadGestacional: resp.object.planItems[0].items[0].valor
        }
        this.listaPlanParto.push(objeto)
      }
      this.dataEnviarPlanParto = {
        edadGestacional: this.form.get("semanas").value,
        tienePlan: resp.cod == '2040' ? true : false,
        idFiliacion: this.Gestacion.id,
        respuestaGetPlanParto: resp.object
      }
    })
  }
  openModal() {
    this.refPlanParto = this.dialog.open(ModalPlanPartoComponent, {
      data: this.dataEnviarPlanParto,
      header: 'Agregar plan de Parto',
      width: '80%'
    });
    this.refPlanParto.onClose.subscribe((mensaje) => {
      if (mensaje == 'agregado') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de Parto agregado',
          text: 'Su registro fue creado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.listaPlanParto = []
        this.getPlanParto()
      }
    })
  }

  calculateIMC(): void {
    let gestationalWeek: number = this.form.value.semanas;
    let patientHeight: number = (this.form.value.talla / 100);
    let patientWeigth: number = this.form.value.peso;
    let clasification: NutritionalClassification;
    let gainWeight: GainWeight;
    if (gestationalWeek < 13) {
      this.imcService.getClasificacionEstadoNutricionalByTalla(patientHeight).subscribe((res: any) => {
        clasification = res.object.clasificaionEstadoNutricionalIMCPG[0];
        if (patientWeigth <= clasification.bajoPeso) {
          this.imcService.getGananciaBajoPeso(gestationalWeek).subscribe((res: any) => {
            gainWeight = res.object.recomendacionGestanteBajoPeso[0];
            this.assignUsualWieghtAndIMC(patientHeight, patientWeigth, gainWeight.min, gainWeight.med, gainWeight.max);
          })
        }
        if (patientWeigth >= clasification.normal18 && patientWeigth <= clasification.normal25) {
          this.imcService.getGananciaPesoRegular(gestationalWeek).subscribe((res: any) => {
            gainWeight = res.object.recomendacionGananciaPesoRegular[0];
            this.assignUsualWieghtAndIMC(patientHeight, patientWeigth, gainWeight.min, gainWeight.med, gainWeight.max);
          })
        }
        if (patientWeigth >= clasification.sobrePeso25 && patientWeigth <= clasification.sobrePeso30) {
          this.imcService.getGananciaSobrePeso(gestationalWeek).subscribe((res: any) => {
            gainWeight = res.object.recomencacionGananciaSobrePeso[0];
            this.assignUsualWieghtAndIMC(patientHeight, patientWeigth, gainWeight.min, gainWeight.med, gainWeight.max);
          })
        }
        if (patientWeigth >= clasification.obesidad) {
          this.imcService.getGananciaObesa(gestationalWeek).subscribe((res: any) => {
            gainWeight = res.object.recomendacionGananciaObesa[0];
            this.assignUsualWieghtAndIMC(patientHeight, patientWeigth, gainWeight.min, gainWeight.med, gainWeight.max);
          })
        }
      });
    }
  }

  assignUsualWieghtAndIMC(height: number, weight: number, min: number, med: number, max: number): void {
    let usualWeight: number;
    let imc: number;
    let weightGain: number;
    height < 1.57 ? usualWeight = weight - min : usualWeight = weight - med
    imc = (usualWeight / Math.pow((height), 2));
    this.form.patchValue({
      imc: imc.toFixed(2),
      pesoHabitual: usualWeight
    });
  }

  // assingWeightGain(imc: number, min: number, med: number, max: number, weightGain: number): void {
  //   if (imc< 18.5) {
      
  //   }
  // }
}


export interface ultimaConsulta {
  nroEmbarazo?: number,
  estado?: number,
  direccion?: string,
  edad?: number;
  nroUltimaAtencion?: number,
  nroMayorControlSis?: number,
  nroDoc?: string,
  tipoDoc?: string,
  nroHcl?: string,
  pesoHabitual?: number,
  fum?: string,
  imc?: string,
  nroFetos?: string,
  funcionesBiologicas?: any[],
  examenesFisicos?: any[],
}
interface NutritionalClassification {
  bajoPeso: number;
  normal18: number;
  normal25: number;
  obesidad: number;
  sobrePeso25: number;
  sobrePeso30: number;
  talla: number;
}
interface GainWeight {
  max: number;
  med: number;
  min: number;
  semanaGestacion: number;
  trimestre: number;
}