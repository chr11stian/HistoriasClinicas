import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-colegio-profesional-modal',
  templateUrl: './colegio-profesional-modal.component.html',
  styleUrls: ['./colegio-profesional-modal.component.css']
})
export class ColegioProfesionalModalComponent implements OnInit {

  constructor() { }
  colegioProfesionalFG: FormGroup;
  buildForm() {
    this.colegioProfesionalFG = new FormGroup({
      codigo: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
    });
  }
  save() {
    console.log("guardar");
  }
  ngOnInit(): void {
  }

}
