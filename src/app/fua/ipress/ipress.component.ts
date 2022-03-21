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
  formDatosGenerales: FormGroup;
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
  attencionPlace: string;
  codOfertaFlexible: string;
  /**fin ngModels */
  dataIpress: IPRESS;
  dataAsegurado: Asegurado;
  dataFUA: DatosGeneralesFUA;
  constructor(private fuaService: FuaService) {
    this.twoOptions = [
      { name: "si", code: "si" },
      { name: "no", code: "no" },
    ];
    this.inicializarForm();
    this.idFUA = JSON.parse(localStorage.getItem("dataFUA")).idFUA;
    this.attencionPlace = "EXTRAMURAL";
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
    this.formDatosGenerales = new FormGroup({
      institucion: new FormControl(""),
      fecha: new FormControl(""),
      ipress: new FormControl(""),
    });
    this.formAsegurado = new FormGroup({
      tdi: new FormControl(""),
      nroDoc: new FormControl(""),
      diresa: new FormControl(""),
      nro1Diresa: new FormControl(""),
      nro2Diresa: new FormControl(""),
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
    console.log("data de lugar de atencion ", this.lugarAtencion);
  }
  ngmodelChange() {
    console.log("ngmodel ", this.personal);
    console.log("atencion ", this.attention);
  }
  getDataFUA(idFUA) {
    this.fuaService.getFUAxIdFUA(idFUA).subscribe((res: any) => {
      // console.log("data de fua ", res);
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
}
