import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Diagnostico, KeyData, SegundaParteFUA } from "../models/fua";
import { FuaService } from "../services/fua.service";

@Component({
  selector: "app-atenion",
  templateUrl: "./atenion.component.html",
  styleUrls: ["./atenion.component.css"],
})
export class AtenionComponent implements OnInit {
  listReferido = [
    { name: "Emergencia", value: "EMERGENCIA" },
    { name: "Consulta Externa", value: "CONSULTA EXTERNA" },
    { name: "Apoyo al Diagnostico", value: "APOYO AL DIAGNOSTICO" },
  ];
  sino = [
    { label: "Si", value: "SI" },
    { label: "No", value: "NO" },
  ];
  listSepelio = [
    { name: "Natimuerto", value: "NATIMUERTO" },
    { name: "Obito", value: "OBITO" },
    { name: "Otro", value: "OTRO" }
  ];
  listDiagnosticoDXIngreso = [
    { label: "P", value: "P" },
    { label: "D", value: "D" },
    { label: "R", value: "R" },
  ];
  listDiagnosticoDXEgreso = [
    { label: "D", value: "D" },
    { label: "R", value: "R" },
  ];
  listFirma = [
    { name: "Asegurado", value: "ASEGURADO" },
    { name: "Apoderado", value: "APODERADO" },
  ];
  formdeLaAtencion: FormGroup;
  formAtencion: FormGroup;
  formPrestacional: FormGroup;
  formReferencia: FormGroup;
  formActiPreventivas: FormGroup;
  formRespAtencion: FormGroup;
  formApoderado: FormGroup;
  /**ngModels */
  atencionDirecta: boolean = false;
  alta: boolean;
  cita: boolean;
  hospitalizacion: boolean;
  referido: string;
  traslado: boolean = false;
  keyData: KeyData;
  sepelio: string;
  contraReferido: boolean;
  fallecido: boolean;
  corteAdministrado: boolean;
  tipeDXIn: string;
  ipeDXEg: string;
  firma: string;
  nameApoderado: string;
  nroDocApoderado: string;
  /**Fin ngModels */
  listDiagnostico: Diagnostico;

  idFUA: string;
  secondDataFUA: SegundaParteFUA;

  constructor(
    private form: FormBuilder,
    private fuaService: FuaService
  ) {
    this.idFUA = JSON.parse(localStorage.getItem("dataFUA")).idFUA;
    console.log('id de FUA ', this.idFUA);
    this.getDataFUA();
  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formAtencion = this.form.group({
      fechaAtencion: new FormControl(""),
      hora: new FormControl(""),
      ups: new FormControl(""),
      prestacionesAdicionales: new FormControl(""),
      codAutorizacion: new FormControl(""),
      nroFuaVincular: new FormControl(""),
      fechaIngreso: new FormControl(""),
      fechaAlta: new FormControl(""),
      fechaCorteAdministrativo: new FormControl("")

    });
    this.formPrestacional = new FormGroup({
      // nroAutorizacion: new FormControl(""),
      atencionDirecta: new FormControl(""),
      nroAutorizacion: new FormControl(""),
      monto: new FormControl(""),
      // traslado: new FormControl(""),
      sepelio: new FormControl("")
    });
    this.formReferencia = new FormGroup({
      codRenaes: new FormControl(""),
      nombreIpress: new FormControl(""),
      nroHojaReferencia: new FormControl(""),
    });
    this.formActiPreventivas = new FormGroup({
      peso: new FormControl(null),
      talla: new FormControl(null),
      pa: new FormControl(null),
      cpn: new FormControl(""),
      edadGesacional: new FormControl(null),
      alturaUterina: new FormControl(null),
      partoVertical: new FormControl(""),
      controlPerperio: new FormControl(""),
      edadGestacionalRN: new FormControl(null),
      apgar1ro: new FormControl(""),
      apgar5to: new FormControl(""),
      corteTardioCordon: new FormControl(""),
      nroCred: new FormControl(null),//first row
      rnPrematuro: new FormControl(""),
      bajoPesoNacer: new FormControl(""),
      enfermedadCongenitaAlNacer: new FormControl(""),
      nroFamiliaresGestante: new FormControl(null),
      pab: new FormControl(null),//second row
      tapEedpTepsi: new FormControl(""),
      consejeriaNutricional: new FormControl(""),
      consejeriaIntegral: new FormControl(""),
      imc: new FormControl(null),
      jovenAdultoEvaluacionIntegral: new FormControl(""),
      vacam: new FormControl(""),
      tamizajeSaludMental: new FormControl("")
    });
    this.formRespAtencion = new FormGroup({
      dniResponsable: new FormControl(""),
      nombreResponsable: new FormControl(""),
      nroColegiaturaResponsable: new FormControl(""),
      responsableAtencion: new FormControl(""),
      especialidad: new FormControl(""),
      nroRne: new FormControl(""),
      egresado: new FormControl("")
    });
    this.formApoderado = new FormGroup({
      aseguradoApoderado: new FormControl(""),
      firma: new FormControl(""),
      apoderado: new FormControl(""),
      nroDocCeApoderado: new FormControl(""),
      firmaSelloResponsableAtencion: new FormControl(""),
      huellaDigital: new FormControl(""),
      estado: new FormControl("")
    });
  }

  async getDataFUA() {
    await this.fuaService.getPromiseIpressAseguradoxidFUA(this.idFUA).then((data) => {
      this.keyData = data;
    });
    await this.fuaService.getPromiseSegundaParteFUA(this.keyData.idConsulta, this.keyData.id, this.keyData.codPrestacion).then((data) => {
      this.secondDataFUA = data;
      console.log('second fua data ', this.secondDataFUA);

    });
    this.setDataFUA(this.secondDataFUA);
    this.listDiagnostico = this.secondDataFUA.diagnostico;
    console.log('diagnosticos ', this.listDiagnostico);
  }
  setDataFUA(data: SegundaParteFUA) {
    /**de la atencion */
    // console.log('data in set ', this.secondDataFUA.deLaAtencion);
    if (data.deLaAtencion != null) {
      this.formAtencion.patchValue({ fechaAtencion: data.deLaAtencion.fechaAtencion });
      this.formAtencion.patchValue({ hora: data.deLaAtencion.hora });
      this.formAtencion.patchValue({ ups: data.deLaAtencion.ups });
      this.formAtencion.patchValue({ prestacionesAdicionales: data.deLaAtencion.prestacionesAdicionales });
      this.formAtencion.patchValue({ codAutorizacion: data.deLaAtencion.codAutorizacion });
      this.formAtencion.patchValue({ nroFuaVincular: data.deLaAtencion.nroFuaVincular });
    }
    if (data.deLaAtencion.hospitalizacion != null) {
      this.formAtencion.patchValue({ fechaIngreso: data.deLaAtencion.hospitalizacion.fechaIngreso });
      this.formAtencion.patchValue({ fechaAlta: data.deLaAtencion.hospitalizacion.fechaAlta });
      this.formAtencion.patchValue({ fechaCorteAdministrativo: data.deLaAtencion.hospitalizacion.fechaCorteAdministrativo });
    }
    /**concepto prestacional */
    if (data.conceptoPrestacional != null) {
      this.atencionDirecta = data.conceptoPrestacional.atencionDirecta == 'TRUE' ? true : false;
      this.formPrestacional.patchValue({ nroAutorizacion: data.conceptoPrestacional.cobExtraOrdinario.nroAutorizacion });
      this.formPrestacional.patchValue({ monto: data.conceptoPrestacional.cobExtraOrdinario.monto });
      this.traslado = data.conceptoPrestacional.traslado == 'TRUE' ? true : false;
      this.sepelio = data.conceptoPrestacional.sepelio;
    }
    /**del destino del asegurado/usuario */
    if (data.destinoAsegurado != null) {
      this.alta = data.destinoAsegurado.alta == 'TRUE' ? true : false;
      this.cita = data.destinoAsegurado.cita == 'TRUE' ? true : false;
      this.hospitalizacion = data.destinoAsegurado.hospitalizacion == 'TRUE' ? true : false;
      this.referido = data.destinoAsegurado.referido
      this.contraReferido = data.destinoAsegurado.contraReferido == 'TRUE' ? true : false;
      this.fallecido = data.destinoAsegurado.fallecido == 'TRUE' ? true : false;
      this.corteAdministrado = data.destinoAsegurado.corteAdministrado == 'TRUE' ? true : false;
    }
    /**se refiere/contrarefiere */
    if (data.refiereContrarefiere != null) {
      this.formReferencia.patchValue({ codRenaes: data.refiereContrarefiere.codigoRenaesIpress });
      this.formReferencia.patchValue({ nombreIpress: data.refiereContrarefiere.nombreIpress });
      this.formReferencia.patchValue({ nroHojaReferencia: data.refiereContrarefiere.nroHojaReferenciaContrareferencia });
    }
    /**actividades preventivas */
    if (data.actividadesPreventivas != null) {
      this.formActiPreventivas.patchValue({ peso: data.actividadesPreventivas.peso });
      this.formActiPreventivas.patchValue({ talla: data.actividadesPreventivas.talla });
      this.formActiPreventivas.patchValue({ pa: data.actividadesPreventivas.pa });
      //de la gestante
      this.formActiPreventivas.patchValue({ cpn: data.actividadesPreventivas.deLaGestante.cpn });
      this.formActiPreventivas.patchValue({ edadGesacional: data.actividadesPreventivas.deLaGestante.edadGesacional });
      this.formActiPreventivas.patchValue({ alturaUterina: data.actividadesPreventivas.deLaGestante.alturaUterina });
      this.formActiPreventivas.patchValue({ partoVertical: data.actividadesPreventivas.deLaGestante.partoVertical });
      this.formActiPreventivas.patchValue({ controlPerperio: data.actividadesPreventivas.deLaGestante.controlPerperio });
      //recien nacido
      this.formActiPreventivas.patchValue({ edadGestacionalRN: data.actividadesPreventivas.delRecienNacido.edadGestacionalRN });
      this.formActiPreventivas.patchValue({ apgar1ro: data.actividadesPreventivas.delRecienNacido.apgar1ro });
      this.formActiPreventivas.patchValue({ apgar5to: data.actividadesPreventivas.delRecienNacido.apgar5to });
      this.formActiPreventivas.patchValue({ corteTardioCordon: data.actividadesPreventivas.delRecienNacido.corteTardioCordon });
      //gestante
      this.formActiPreventivas.patchValue({ nroCred: data.actividadesPreventivas.etapaDeVida.nroCred });
      this.formActiPreventivas.patchValue({ rnPrematuro: data.actividadesPreventivas.etapaDeVida.rnPrematuro });
      this.formActiPreventivas.patchValue({ bajoPesoNacer: data.actividadesPreventivas.etapaDeVida.bajoPesoNacer });
      this.formActiPreventivas.patchValue({ enfermedadCongenitaAlNacer: data.actividadesPreventivas.etapaDeVida.enfermedadCongenitaAlNacer });
      this.formActiPreventivas.patchValue({ nroFamiliaresGestante: data.actividadesPreventivas.etapaDeVida.nroFamiliaresGestante });
      this.formActiPreventivas.patchValue({ pab: data.actividadesPreventivas.etapaDeVida.pab });
      this.formActiPreventivas.patchValue({ tapEedpTepsi: data.actividadesPreventivas.etapaDeVida.tapEedpTepsi });
      this.formActiPreventivas.patchValue({ consejeriaNutricional: data.actividadesPreventivas.etapaDeVida.consejeriaNutricional });
      this.formActiPreventivas.patchValue({ consejeriaIntegral: data.actividadesPreventivas.etapaDeVida.consejeriaIntegral });
      this.formActiPreventivas.patchValue({ imc: data.actividadesPreventivas.etapaDeVida.imc });
      this.formActiPreventivas.patchValue({ jovenAdultoEvaluacionIntegral: data.actividadesPreventivas.jovenAdultoEvaluacionIntegral });
      this.formActiPreventivas.patchValue({ vacam: data.actividadesPreventivas.adultoMayor.vacam });
      this.formActiPreventivas.patchValue({ tamizajeSaludMental: data.actividadesPreventivas.adultoMayor.tamizajeSaludMental });
    }
    /**vacunacion */
    /**diagnostico */
    /**responsable de la atencion*/
    this.formRespAtencion.patchValue({ dniResponsable: data.responsableAtencion.nroDoc });
    this.formRespAtencion.patchValue({ nombreResponsable: data.responsableAtencion.nombreResponsableAtencion });
    this.formRespAtencion.patchValue({ nroColegiaturaResponsable: data.responsableAtencion.nroColegiatura });
    this.formRespAtencion.patchValue({ responsableAtencion: data.responsableAtencion.responsableAtencion });
    this.formRespAtencion.patchValue({ nroRne: data.responsableAtencion.nroRNE });
    this.formRespAtencion.patchValue({ egresado: data.responsableAtencion.egresado });
    /**apoderado */
    this.firma = data.firma;
    this.nameApoderado = data.apoderado;
    this.nroDocApoderado = data.nroDocCeApoderado;

  }
  recoverData() {
    this.secondDataFUA = {
      deLaAtencion: {
        fechaAtencion: this.formAtencion.value.fechaAtencion,
        hora: this.formAtencion.value.hora,
        ups: this.formAtencion.value.ups,
        prestacionesAdicionales: this.formAtencion.value.prestacionesAdicionales,
        codAutorizacion: this.formAtencion.value.codAutorizacion,
        nroFuaVincular: this.formAtencion.value.nroFuaVincular,
        hospitalizacion: {
          fechaIngreso: this.formAtencion.value.fechaIngreso,
          fechaAlta: this.formAtencion.value.fechaAlta,
          fechaCorteAdministrativo: this.formAtencion.value.fechaCorteAdministrativo
        }
      },
      conceptoPrestacional: {
        atencionDirecta: this.atencionDirecta == true ? 'ATENCION DIRECTA' : '',
        cobExtraOrdinario: {
          nroAutorizacion: this.formPrestacional.value.nroAutorizacion,
          monto: this.formPrestacional.value.monto
        },
        traslado: this.traslado == true ? 'TRASLADO' : '',
        sepelio: this.sepelio
      },
      destinoAsegurado: {
        alta: this.alta == true ? 'ALTA' : '',
        cita: this.cita == true ? 'CITA' : '',
        hospitalizacion: this.hospitalizacion == true ? 'HOSPITALIZACION' : '',
        referido: this.referido,
        contraReferido: this.contraReferido == true ? 'CONTRARREFERIDO' : '',
        fallecido: this.fallecido == true ? 'FALLECIDO' : '',
        corteAdministrado: this.corteAdministrado == true ? 'CORTE ADMINISTRATICO' : '',
      },
      refiereContrarefiere: {
        codigoRenaesIpress: this.formReferencia.value.codRenaes,
        nombreIpress: this.formReferencia.value.nombreIpress,
        nroHojaReferenciaContrareferencia: this.formReferencia.value.nroHojaReferencia
      },
      actividadesPreventivas: {
        peso: this.formActiPreventivas.value.peso,
        talla: this.formActiPreventivas.value.talla,
        pa: this.formActiPreventivas.value.pa,
        deLaGestante: {
          cpn: this.formActiPreventivas.value.cpn,
          edadGesacional: this.formActiPreventivas.value.edadGesacional,
          alturaUterina: this.formActiPreventivas.value.alturaUterina,
          partoVertical: this.formActiPreventivas.value.partoVertical,
          controlPerperio: this.formActiPreventivas.value.controlPerperio,
        },
        delRecienNacido: {
          edadGestacionalRN: this.formActiPreventivas.value.edadGestacionalRN,
          apgar1ro: this.formActiPreventivas.value.apgar1ro,
          apgar5to: this.formActiPreventivas.value.apgar5to,
          corteTardioCordon: this.formActiPreventivas.value.corteTardioCordon
        },
        etapaDeVida: {
          nroCred: this.formActiPreventivas.value.nroCred,
          pab: this.formActiPreventivas.value.pab,
          rnPrematuro: this.formActiPreventivas.value.rnPrematuro == "SI" ? "RN PREMATURO" : '',
          tapEedpTepsi: this.formActiPreventivas.value.tapEedpTepsi,
          bajoPesoNacer: this.formActiPreventivas.value.bajoPesoNacer == "SI" ? "BAJO PESO NACER" : '',
          consejeriaNutricional: this.formActiPreventivas.value.consejeriaNutricional == "SI" ? "CONSEJERIA  NUTRICIONAL" : '',
          enfermedadCongenitaAlNacer: this.formActiPreventivas.value.enfermedadCongenitaAlNacer == "SI" ? "ENFERMEDAD CONGENITA AL NACER" : '',
          consejeriaIntegral: this.formActiPreventivas.value.consejeriaIntegral == "SI" ? "CONSEJERIA INTEGRAL" : '',
          nroFamiliaresGestante: this.formActiPreventivas.value.nroFamiliaresGestante,
          imc: this.formActiPreventivas.value.imc
        },
        jovenAdultoEvaluacionIntegral: this.formActiPreventivas.value.jovenAdultoEvaluacionIntegral == "SI" ? "EVALUACION INTEGRAL" : '',
        adultoMayor: {
          vacam: this.formActiPreventivas.value.vacam == "SI" ? "VACAM" : '',
          tamizajeSaludMental: this.formActiPreventivas.value.tamizajeSaludMental == "SI" ? "TAMIZAJE" : ''
        }
      },
      /**vacunas */
      diagnostico: this.listDiagnostico,
      responsableAtencion: {
        nroDoc: this.formRespAtencion.value.dniResponsable,
        nombreResponsableAtencion: this.formRespAtencion.value.nombreResponsable,
        nroColegiatura: this.formRespAtencion.value.nroColegiaturaResponsable,
        responsableAtencion: this.formRespAtencion.value.responsableAtencion,
        especialidad: this.formRespAtencion.value.especialidad,
        nroRNE: this.formRespAtencion.value.nroRne,
        egresado: this.formRespAtencion.value.egresado
      },
      /**apoderado */
      firma: this.firma,
      apoderado: this.nameApoderado,
      nroDocCeApoderado: this.nroDocApoderado,
    }
  }
  save() {
    this.recoverData();
    console.log('second data to save ', this.secondDataFUA);
  }
  changeNgModel(rowData: Diagnostico, index: number) {
    let auxDx: Diagnostico = {
      nro: rowData.nro,
      diagnosticoHIS: rowData.diagnosticoHIS,
      cie10HIS: rowData.cie10HIS,
      diagnosticoSIS: rowData.diagnosticoSIS,
      cie10SIS: rowData.cie10SIS,
      tipo: this.tipeDXIn,
      codPrestacion: rowData.codPrestacion,
      nombreUPS: rowData.nombreUPS,
      factorCondicional: rowData.factorCondicional,
      lab: rowData.lab,
      nombreUPSaux: rowData.nombreUPSaux,
      patologiaMaterna: rowData.patologiaMaterna
    }
    this.listDiagnostico[index] = auxDx;
  }
}
