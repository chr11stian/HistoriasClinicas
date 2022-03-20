import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-atenion",
  templateUrl: "./atenion.component.html",
  styleUrls: ["./atenion.component.css"],
})
export class AtenionComponent implements OnInit {
  formDeLaAtencion: FormGroup;
  formAtencion: FormGroup;
  formPrestacional: FormGroup;
  data: any[] = [];
  /**ngModels */
  atencionDirecta: string;
  alta: boolean;
  cita: boolean;
  hospitalizacion: boolean;
  referido: string;
  /**Fin ngModels */
  listReferido = [
    { name: "Emergencia", value: "EMERGENCIA" },
    { name: "Consulta Externa", value: "CONSULTA_EXTERNA" },
    { name: "Apoyo al Diagnostico", value: "APOYO_AL_DIAGNOSTICO" },
  ];

  constructor(private form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formDeLaAtencion = this.form.group({
      apPaterno: new FormControl(""),
      fecha: new FormControl(""),
      // // ApMaterno: new FormControl(''),
      // // nombres: new FormControl(''),
      // aplica: new FormControl(''),
      // referencia: new FormControl(''),
    });
    this.formAtencion = new FormGroup({
      fechaAtencion: new FormControl(""),
      fecha: new FormControl(""),
    });
    this.formPrestacional = new FormGroup({
      nroAutorizacion: new FormControl(""),
    });
  }
}
