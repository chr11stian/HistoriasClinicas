import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators, FormGroup } from "@angular/forms"

@Component({
  selector: "app-datos-generales",
  templateUrl: "./datos-generales.component.html",
  styleUrls: ["./datos-generales.component.css"],
})
export class DatosGeneralesComponent implements OnInit {
  form: FormGroup
  stateOptions: any[]
  stateOptions1: any[]
  stateOptions2: any[]

  constructor() {
    this.stateOptions = [
      { label: "F", value: 1 },
      { label: "M", value: 2 },
    ]
    this.stateOptions1 = [
      { label: "G.S", value: 1 },
      { label: "NO", value: 2 },
    ]
    this.stateOptions2 = [
      { label: "RH", value: 1 },
      { label: "NO", value: 2 },
    ]
  }

  ngOnInit(): void {}
}
