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
    { name: "DE LA IPRESS", value: "DELAIPRESS" },
    { name: "ITINERANTE", value: "ITINERANTE" },
    { name: "OFERTA FLEXIBLE", value: "OFERTAFLEXIBLE" },
  ];
  listAtencion = ["AMBULATORIA", "REFERENCIA", "EMERGENCIA"];
  /**ngModels */
  personal: string;
  lugarAtencion: string;
  renaes: string;
  attention: string;
  /**fin ngModels */
  constructor() {
    this.twoOptions = [
      { name: "si", code: "si" },
      { name: "no", code: "no" },
    ];
    this.inicializarForm();
  }

  ngOnInit(): void {}
  inicializarForm() {
    this.formDatosGenerales = new FormGroup({
      ipress: new FormControl(""),
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
