import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-tipo-personal-modal",
  templateUrl: "./tipo-personal-modal.component.html",
  styleUrls: ["./tipo-personal-modal.component.css"],
})
export class TipoPersonalModalComponent implements OnInit {
  constructor() {}
  tipoPersonalFG: FormGroup;
  buildForm() {
    this.tipoPersonalFG = new FormGroup({
      nombreTP: new FormControl("", Validators.required),
      esProfesional: new FormControl("", Validators.required),
      abreviatura: new FormControl("", Validators.required),
      especialidad: new FormControl(true),
      name: new FormControl("", Validators.required),
      numberPhone: new FormControl("", [Validators.required]),
      typeUser: new FormControl(null, Validators.required),
    });
  }
  save() {
    console.log("hola desde guardar");
  }

  ngOnInit(): void {}
}
