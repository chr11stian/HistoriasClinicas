import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-consulta',
  templateUrl: './dialog-consulta.component.html',
  styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

  form: FormGroup;
  prueba: any[];
  isUpdate: boolean = false;
  listaSituacion = [
    { name: "Longitudinal", code: "1" },
    { name: "Transversal", code: "2" },
    { name: "No Aplica", code: "3" },
  ];
  listaPresentacion = [
    { name: "Cefalica", code: "1" },
    { name: "Pelvica", code: "2" },
    { name: "No Aplica", code: "3" },
  ];
  listaPosicion = [
    { name: "Derecha", code: "1" },
    { name: "Izquierda", code: "2" },
    { name: "No Aplica", code: "3" },
  ];
  constructor(
    private fb: FormBuilder,
    // private 
  ) { this.prueba = [{
    tratamientos: "Tomar paracetamol 500mg",
    diagnostico: "Presenta sintomas de alerta",
},
{
    tratamientos: "Mantener Reposo",
    diagnostico: "Presenta sintomas leves",
},
{
    tratamientos: "Tomar paracetamol 500mg",
    diagnostico: "Presenta sintomas de peligro",
},
{
    tratamientos: "Tomar paracetamol 500mg",
    diagnostico: "Presenta sintomas leves",
}] }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      temperatura: new FormControl(""),
      presion: new FormControl(""),
      fc: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      imc: new FormControl(""),
      apetito: new FormControl(""),
      sed: new FormControl(""),
      suenos: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      motivoConsulta: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      interrogatorioOtro: new FormControl(""),
      piel: new FormControl(""),
      mucosas: new FormControl(""),
      cabeza: new FormControl(""),
      cuello: new FormControl(""),
      cardioBase: new FormControl(""),
      pulmones: new FormControl(""),
      mamas: new FormControl(""),
      pezones: new FormControl(""),
      abdomen: new FormControl(""),
      examenFisicoOtro: new FormControl(""),
      alturaUterina: new FormControl(""),
      selectSitiacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      listaPosicion: new FormControl(""),
      fetal: new FormControl(""),
      clinico: new FormControl(""),
      movimientoFetal: new FormControl(""),
      latidosCardiacosFetales: new FormControl(""),
      miembrosInferiores: new FormControl(""),
      osteotendinoso: new FormControl(""),
      genitalesExter: new FormControl(""),
      vagina: new FormControl(""),
      cuelloUterino: new FormControl(""),
    });
  }
}
