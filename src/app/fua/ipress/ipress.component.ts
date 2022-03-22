import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Asegurado, DatosGeneralesFUA, IPRESS } from "../models/fua";
import { FuaService } from "../services/fua.service";

@Component({
  selector: "app-ipress",
  templateUrl: "./ipress.component.html",
  styleUrls: ["./ipress.component.css"],
})
export class IpressComponent implements OnInit {
  twoOptions: any[];
  formIpress: FormGroup;
  formAsegurado: FormGroup;
  listPersonalAte = [
    { name: "De la IPRESS", value: "DELAIPRESS" },
    { name: "Itinerante", value: "ITINERANTE" },
    { name: "Oferta Flexible", value: "OFERTAFLEXIBLE" },
  ];
  listAtencion = [
    { name: "Ambulatoria", value: "AMBULATORIA" },
    { name: "Referencia", value: "REFERENCIA" },
    { name: "Emergencia", value: "EMERGENCIA" },
  ];
  listSexo = [
    { name: "Masculino", value: "MASCULINO" },
    { name: "Femenino", value: "FEMENINO" },
  ];
  listSaludMaterna = [
    { name: "Gestante", value: "GESTANTE" },
    { name: "Puerpera", value: "PUERPERA" },
  ];
  listLugarAtencion = [
    { name: "Intramural", value: "INTRAMURAL" },
    { name: "Extramural", value: "EXTRAMURAL" },
  ];
  idFUA: string;
  /**ngModels */
  personal: string;
  lugarAtencion: string;
  renaes: string;
  attention: string;
  gender: string;
  maternalHealth: string;
  attentionPlace: string;
  codOfertaFlexible: string;
  /**fin ngModels */
  dataFUA: DatosGeneralesFUA;
  constructor(private fuaService: FuaService) {
    this.twoOptions = [
      { name: "si", code: "si" },
      { name: "no", code: "no" },
    ];
    this.inicializarForm();
    this.idFUA = JSON.parse(localStorage.getItem("dataFUA")).idFUA;
    // this.attentionPlace = "EXTRAMURAL";
    console.log("id de FUA ", this.idFUA);
    this.getDataFUA(this.idFUA);
  }

  ngOnInit(): void { }
  inicializarForm() {
    this.formIpress = new FormGroup({
      codRenaes: new FormControl(""),
      nombreIpress: new FormControl(""),
      codRenaesRef: new FormControl(""),
      ipressRef: new FormControl(""),
      nroHojaRef: new FormControl(""),
    });
    this.formAsegurado = new FormGroup({
      tdi: new FormControl(""),
      nroDoc: new FormControl(""),
      diresa: new FormControl(""),
      afiliacion: new FormControl(""),
      nro: new FormControl(""),
      institucion: new FormControl(""),
      codSeguro: new FormControl(""),
      apePaterno: new FormControl(""),
      apeMaterno: new FormControl(""),
      primerNombre: new FormControl(""),
      otrosNombres: new FormControl(""),
      fechaParto: new FormControl(""),
      fechaNacimiento: new FormControl(""),
      fechaFallecimiento: new FormControl(""),
      nroHistoriaClinica: new FormControl(""),
      etnia: new FormControl(""),
      cnv1: new FormControl(""),
      cnv2: new FormControl(""),
      cnv3: new FormControl(""),
    });
  }
  abrir() {
    this.recoverDataFUA();
    console.log("data de FUA ", this.dataFUA);
  }

  getDataFUA(idFUA) {
    this.fuaService.getFUAxIdFUA(idFUA).subscribe((res: any) => {
      this.dataFUA = res.object;
      console.log("data de fua con model ", this.dataFUA);
      this.setDataFUA();
    });
  }

  setDataFUA() {
    /**de la ipress */
    this.formIpress.patchValue({ codRenaes: this.dataFUA.deLaIpress.eessInformacion.codRenaes });
    this.formIpress.patchValue({ nombreIpress: this.dataFUA.deLaIpress.eessInformacion.nombreEESS });
    this.personal = this.dataFUA.deLaIpress.eessInformacion.personalQueAtiende;
    this.codOfertaFlexible = this.dataFUA.deLaIpress.eessInformacion.codOfertaFlexible;
    this.lugarAtencion = this.dataFUA.deLaIpress.eessInformacion.codRenaes;
    this.attention = this.dataFUA.deLaIpress.eessInformacion.atencion;
    this.formIpress.patchValue({ codRenaesRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor });
    this.formIpress.patchValue({ ipressRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor });
    this.formIpress.patchValue({ nroHojaRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor });
    /**del asegurado */
    this.formAsegurado.patchValue({ tdi: this.dataFUA.delAsegurado.tdi });
    this.formAsegurado.patchValue({ nroDoc: this.dataFUA.delAsegurado.nroDoc });
    this.formAsegurado.patchValue({ diresa: this.dataFUA.delAsegurado.codAseguradoSis.diresaOtros });
    this.formAsegurado.patchValue({ nro1Diresa: this.dataFUA.delAsegurado.codAseguradoSis.afiliacion });
    this.formAsegurado.patchValue({ nro2Diresa: this.dataFUA.delAsegurado.codAseguradoSis.nro });
    this.formAsegurado.patchValue({ institucion: this.dataFUA.delAsegurado.aseguradoDeOtrasIAFAS.institucion });
    this.formAsegurado.patchValue({ codSeguro: this.dataFUA.delAsegurado.aseguradoDeOtrasIAFAS.codAsegurado });
    this.formAsegurado.patchValue({ apePaterno: this.dataFUA.delAsegurado.apellidoPaterno });
    this.formAsegurado.patchValue({ apeMaterno: this.dataFUA.delAsegurado.apellidoMaterno });
    this.formAsegurado.patchValue({ primerNombre: this.dataFUA.delAsegurado.primerNombre });
    this.formAsegurado.patchValue({ otrosNombres: this.dataFUA.delAsegurado.otrosNombres });
    this.gender = this.dataFUA.delAsegurado.sexo;
    this.maternalHealth = this.dataFUA.delAsegurado.saludMaterna;
    this.formAsegurado.patchValue({ fechaParto: this.dataFUA.delAsegurado.fecha.fechaParto });
    this.formAsegurado.patchValue({ fechaNacimiento: this.dataFUA.delAsegurado.fecha.fechaNacimiento });
    this.formAsegurado.patchValue({ fechaFallecimiento: this.dataFUA.delAsegurado.fecha.fechaFallecimiento });
    this.formAsegurado.patchValue({ nroHistoriaClinica: this.dataFUA.delAsegurado.nroHistoriaClinica });
    this.formAsegurado.patchValue({ etnia: this.dataFUA.delAsegurado.etnia });
    this.formAsegurado.patchValue({ cnv1: this.dataFUA.delAsegurado.rn01 });
    this.formAsegurado.patchValue({ cnv2: this.dataFUA.delAsegurado.nr02 });
    this.formAsegurado.patchValue({ cnv3: this.dataFUA.delAsegurado.nr03 });
  }

  recoverDataFUA() {
    this.dataFUA = {
      deLaIpress: {
        nroFormato: {
          codEESS: '',
          anio: '',
          correlativo: 0
        },
        eessInformacion: {
          codRenaes: this.formIpress.value.codRenaes,
          nombreEESS: this.formIpress.value.nombreIpress,
          codOfertaFlexible: this.codOfertaFlexible,
          personalQueAtiende: this.personal,
          lugarAtencion: this.attentionPlace,
          atencion: this.attention,
          referenciaRealizadaPor: this.formIpress.value.ipressRef
        }
      },
      delAsegurado: {
        tdi: this.formAsegurado.value.tdi,
        nroDoc: this.formAsegurado.value.nroDoc,
        codAseguradoSis: {
          diresaOtros: this.formAsegurado.value.diresa,
          afiliacion: this.formAsegurado.value.afiliacion,
          nro: this.formAsegurado.value.nro
        },
        aseguradoDeOtrasIAFAS: {
          institucion: this.formAsegurado.value.institucion,
          codAsegurado: this.formAsegurado.value.codSeguro
        },
        apellidoPaterno: this.formAsegurado.value.apePaterno,
        apellidoMaterno: this.formAsegurado.value.apeMaterno,
        primerNombre: this.formAsegurado.value.primerNombre,
        otrosNombres: this.formAsegurado.value.otrosNombres,
        sexo: this.gender,
        saludMaterna: this.maternalHealth,
        fecha: {
          fechaParto: this.formAsegurado.value.fechaParto,
          fechaNacimiento: this.formAsegurado.value.fechaNacimiento,
          fechaFallecimiento: this.formAsegurado.value.fechaFallecimiento
        },
        nroHistoriaClinica: this.formAsegurado.value.nroHistoriaClinica,
        etnia: this.formAsegurado.value.etnia,
        rn01: this.formAsegurado.value.cnv1,
        nr02: this.formAsegurado.value.cnv2,
        nr03: this.formAsegurado.value.cnv3,
      }
    }
  }
}
