import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
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
  formNroFormato: FormGroup;
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
  renaes: string;
  attention: string;
  gender: string;
  maternalHealth: string;
  attentionPlace: string;
  codOfertaFlexible: string;
  /**fin ngModels */
  dataFUA: DatosGeneralesFUA;
  disabl: boolean = true;
  constructor(
    private fuaService: FuaService,
    private router: Router
  ) {
    this.twoOptions = [
      { name: "si", code: "si" },
      { name: "no", code: "no" },
    ];
    this.inicializarForm();
    this.idFUA = JSON.parse(localStorage.getItem("dataFUA")).idFUA;
    console.log("id de FUA ", this.idFUA);
    this.getDataFUA(this.idFUA);
  }

  ngOnInit(): void { }
  inicializarForm() {
    this.formNroFormato = new FormGroup({
      anio: new FormControl({ value: "" }),
      codEESS: new FormControl({ value: "" }),
      correlativo: new FormControl({ value: "" }),
    })
    this.formIpress = new FormGroup({
      codRenaes: new FormControl(""),
      nombreIpress: new FormControl({ value: "", }),
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
    this.formNroFormato.patchValue({ anio: this.dataFUA.deLaIpress.nroFormato.anio });
    this.formNroFormato.patchValue({ codEESS: this.dataFUA.deLaIpress.nroFormato.codEESS });
    this.formNroFormato.patchValue({ correlativo: this.dataFUA.deLaIpress.nroFormato.correlativo });
    /**de la ipress */
    if (this.dataFUA.deLaIpress.eessInformacion != null) {
      this.formIpress.patchValue({ codRenaes: this.dataFUA.deLaIpress.eessInformacion.codRenaes });
      this.formIpress.patchValue({ nombreIpress: this.dataFUA.deLaIpress.eessInformacion.nombreEESS });
      this.personal = this.dataFUA.deLaIpress.eessInformacion.personalQueAtiende;
      this.codOfertaFlexible = this.dataFUA.deLaIpress.eessInformacion.codOfertaFlexible;
      this.attentionPlace = this.dataFUA.deLaIpress.eessInformacion.lugarDeAtencion;
      this.attention = this.dataFUA.deLaIpress.eessInformacion.atencion;
      if (this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor != null) {
        this.formIpress.patchValue({ codRenaesRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor.codRenaes });
        this.formIpress.patchValue({ ipressRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor.nombreIpress });
        this.formIpress.patchValue({ nroHojaRef: this.dataFUA.deLaIpress.eessInformacion.referenciaRealizadaPor.nroHojaReferencia });
      }
    }
    /**del asegurado */
    if (this.dataFUA.delAsegurado != null) {
      this.formAsegurado.patchValue({ tdi: this.dataFUA.delAsegurado.tdi });
      this.formAsegurado.patchValue({ nroDoc: this.dataFUA.delAsegurado.nroDoc });
      if (this.dataFUA.delAsegurado.codAseguradoSis != null) {
        this.formAsegurado.patchValue({ diresa: this.dataFUA.delAsegurado.codAseguradoSis.diresaOtros });
        this.formAsegurado.patchValue({ afiliacion: this.dataFUA.delAsegurado.codAseguradoSis.afiliacion });
        this.formAsegurado.patchValue({ nro: this.dataFUA.delAsegurado.codAseguradoSis.nro });
      }
      if (this.dataFUA.delAsegurado.aseguradoDeOtrasIAFAS != null) {
        this.formAsegurado.patchValue({ institucion: this.dataFUA.delAsegurado.aseguradoDeOtrasIAFAS.institucion });
        this.formAsegurado.patchValue({ codSeguro: this.dataFUA.delAsegurado.aseguradoDeOtrasIAFAS.codSeguro });
      }

      this.formAsegurado.patchValue({ apePaterno: this.dataFUA.delAsegurado.apellidoPaterno });
      this.formAsegurado.patchValue({ apeMaterno: this.dataFUA.delAsegurado.apellidoMaterno });
      this.formAsegurado.patchValue({ primerNombre: this.dataFUA.delAsegurado.primerNombre });
      this.formAsegurado.patchValue({ otrosNombres: this.dataFUA.delAsegurado.otrosNombres });
      this.gender = this.dataFUA.delAsegurado.sexo;
      this.maternalHealth = this.dataFUA.delAsegurado.saludMaterna;
      if (this.dataFUA.delAsegurado.fecha != null) {
        this.formAsegurado.patchValue({ fechaParto: this.dataFUA.delAsegurado.fecha.fechaParto });
        this.formAsegurado.patchValue({ fechaNacimiento: this.dataFUA.delAsegurado.fecha.fechaNacimiento });
        this.formAsegurado.patchValue({ fechaFallecimiento: this.dataFUA.delAsegurado.fecha.fechaFallecimiento });
      }
      this.formAsegurado.patchValue({ nroHistoriaClinica: this.dataFUA.delAsegurado.nroHistoriaClinica });
      this.formAsegurado.patchValue({ etnia: this.dataFUA.delAsegurado.etnia });
      this.formAsegurado.patchValue({ cnv1: this.dataFUA.delAsegurado.rn01 });
      this.formAsegurado.patchValue({ cnv2: this.dataFUA.delAsegurado.nr02 });
      this.formAsegurado.patchValue({ cnv3: this.dataFUA.delAsegurado.nr03 });
    }
  }

  recoverDataFUA() {
    this.dataFUA = null;
    this.dataFUA = {
      deLaIpress: {
        nroFormato: {
          codEESS: this.formNroFormato.value.codEESS,
          anio: this.formNroFormato.value.anio,
          correlativo: this.formNroFormato.value.correlativo
        },
        eessInformacion: {
          codRenaes: this.formIpress.value.codRenaes,
          nombreEESS: this.formIpress.value.nombreIpress,
          codOfertaFlexible: this.codOfertaFlexible,
          personalQueAtiende: this.personal,
          lugarDeAtencion: this.attentionPlace,
          atencion: this.attention,
          referenciaRealizadaPor: {
            codRenaes: this.formIpress.value.codRenaesRef,
            nombreIpress: this.formIpress.value.ipressRef,
            nroHojaReferencia: this.formIpress.value.nroHojaRef
          }
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
          codSeguro: this.formAsegurado.value.codSeguro
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
  save() {
    this.recoverDataFUA();
    console.log('data to save ', this.dataFUA);
    this.fuaService.postDatosIpressAsegurado(this.idFUA, this.dataFUA).subscribe((res: any) => {
      console.log('se guardo la data correctamente ', res);
      Swal.fire({
        icon: "success",
        title: "Se Guardo Correctamente FUA",
        showConfirmButton: false,
        timer: 2000,
      });
      // this.router.navigate(['/dashboard/fua/listar-fua'])
    });
  }
}
