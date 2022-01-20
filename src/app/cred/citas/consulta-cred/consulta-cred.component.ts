import { Location } from "@angular/common"
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-consulta-cred",
  templateUrl: "./consulta-cred.component.html",
  styleUrls: ["./consulta-cred.component.css"],
})
export class ConsultaCredComponent implements OnInit {
  options: any
  citas: any[]
  selectedOption: data

  constructor(private location: Location) {
    ;(this.options = [
      { name: "DNI", code: 1 },
      { name: "CARNET RN", code: 2 },
      { name: "C EXTRANJERIA", code: 3 },
      { name: "OTROS", code: 4 },
    ]),
      (this.citas = [
        {
          consulta: "consulta",
          fecha: "16/11/2021",
          personal: "LETICIA GIULIANA",
        },
        {
          consulta: "consulta",
          fecha: "16/11/2021",
          personal: "LETICIA GIULIANA",
        },
        {
          consulta: "consulta",
          fecha: "16/11/2021",
          personal: "LETICIA GIULIANA",
        },
        {
          consulta: "consulta",
          fecha: "16/11/2021",
          personal: "LETICIA GIULIANA",
        },
      ])
  }
  consulta() {
    console.log("consulta principal")
  }
  ngOnInit(): void {}
  regresar() {
    this.location.back()
  }
}

interface data {
  name: string
  code: number
}
