import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interrogatorio',
  templateUrl: './interrogatorio.component.html',
  styleUrls: ['./interrogatorio.component.css']
})
export class InterrogatorioComponent implements OnInit {

  form: FormGroup;
  listaSituacion = [
    { name: 'Lontitudinal', code: '1' },
    { name: 'Transversal', code: '2' },
    { name: 'No Aplica', code: '3' }
  ];
  listaPresentacion = [
    { name: 'Cefalica', code: '1' },
    { name: 'Pelvica', code: '2' },
    { name: 'No Aplica', code: '3' }
  ];
  listaPosicion = [
    { name: 'Derecha', code: '1' },
    { name: 'Izquierda', code: '2' },
    { name: 'No Aplica', code: '3' }
  ];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      temperatura: new FormControl(''),
      motivoConsulta: new FormControl(''),
      interrogatorioOtro: new FormControl(''),
      selectSitiacion: new FormControl(''),
      clinico: new FormControl(''),
    });
  }

}
