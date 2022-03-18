import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ipress",
  templateUrl: "./ipress.component.html",
  styleUrls: ["./ipress.component.css"],
})
export class IpressComponent implements OnInit {
  twoOptions: any[];
  formDatosGenerales: FormGroup;
  listPersonalAte = [
    { name: "De la IPRESS", value: "DELAIPRESS" },
    { name: "Itinerante", value: "ITINERANTE" },
    { name: "Oferta Flexible", value: "OFERTAFLEXIBLE" },
  ];
  listAtencion = [{name:"Ambulatoria",value:"AMBULATORIA"}, {name:"Referencia",value:"REFERENCIA"}, "EMERGENCIA"];
  listSexo = ["MASCULINO", "FEMENINO"];
  listSaludMaterna = ["GESTANTE", "PUERPERA"];
  listLugarAtencion = [
    { name: "Intramural", value: "INTRAMURAL" },
    { name: "Extramural", value: "EXTRAMURAL" },
  ];
  lista;
  /**ngModels */
  personal: string;
  lugarAtencion: string;
  renaes: string;
  attention: string;
  gender: string;
  maternalHealth: string;
  attencionPlace: string;
  /**fin ngModels */
  constructor() {
    this.twoOptions = [
      { name: "si", code: "si" },
      { name: "no", code: "no" },
    ];
    this.inicializarForm();
    this.attencionPlace = "EXTRAMURAL";
  }

  ngOnInit(): void {}
  inicializarForm() {
    this.formDatosGenerales = new FormGroup({
      ipress: new FormControl({ value: "" }),
      fecha: new FormControl({ value: "" }),
    });
  }
  abrir() {
    console.log("data de lugar de atencion ", this.lugarAtencion);
  }
  ngmodelChange() {
    console.log("ngmodel ", this.personal);
    console.log("atencion ", this.attention);
  }
}
