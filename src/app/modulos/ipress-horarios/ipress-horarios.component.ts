import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ipress-horarios',
  templateUrl: './ipress-horarios.component.html',
  styleUrls: ['./ipress-horarios.component.css']
})
export class IpressHorariosComponent implements OnInit {
  formHorario: FormGroup;
  isUpdateHorario: boolean = false;
  horarios: any[];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm() {
    this.formHorario = this.formBuilder.group({
      lunesInicioManiana: ['', [Validators.required]],
      lunesFinManiana: ['', [Validators.required]],
      lunesInicioTarde: ['', [Validators.required]],
      lunesFinTarde: ['', [Validators.required]],
      martesInicioManiana: ['', [Validators.required]],
      martesFinManiana: ['', [Validators.required]],
      martesInicioTarde: ['', [Validators.required]],
      martesFinTarde: ['', [Validators.required]],
      miercolesInicioManiana: ['', [Validators.required]],
      miercolesFinManiana: ['', [Validators.required]],
      miercolesInicioTarde: ['', [Validators.required]],
      miercolesFinTarde: ['', [Validators.required]],
      juevesInicioManiana: ['', [Validators.required]],
      juevesFinManiana: ['', [Validators.required]],
      juevesInicioTarde: ['', [Validators.required]],
      juevesFinTarde: ['', [Validators.required]],
      viernesInicioManiana: ['', [Validators.required]],
      viernesFinManiana: ['', [Validators.required]],
      viernesInicioTarde: ['', [Validators.required]],
      viernesFinTarde: ['', [Validators.required]],
      sabadoInicioManiana: ['', [Validators.required]],
      sabadoFinManiana: ['', [Validators.required]],
      sabadoInicioTarde: ['', [Validators.required]],
      sabadoFinTarde: ['', [Validators.required]],
      domingoInicioManiana: ['', [Validators.required]],
      domingoFinManiana: ['', [Validators.required]],
      domingoInicioTarde: ['', [Validators.required]],
      domingoFinTarde: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
  }

}
