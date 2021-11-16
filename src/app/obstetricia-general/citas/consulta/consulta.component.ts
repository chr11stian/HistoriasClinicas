import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent implements OnInit {
  listaDocumentos: any;
  formConsulta: FormGroup;
  consultas = [
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    console.log(this.consultas);
  }

  inicializarForm() {
    this.formConsulta = this.fb.group({
      tipoDoc: new FormControl(""),
      nroDoc: new FormControl(""),
    });
  }

  close() {

  }

  regresar(){
    this.location.back();
  }
}
