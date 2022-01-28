import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfertasService } from 'src/app/core/services/ofertas/ofertas.service';

@Component({
  selector: 'app-generar-ofertas',
  templateUrl: './generar-ofertas.component.html',
  styleUrls: ['./generar-ofertas.component.css']
})
export class GenerarOfertasComponent implements OnInit {

  form: FormGroup;
  data: any[];
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  constructor(
    private ofertasService: OfertasService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.data = [];
    this.form.get('fechaFiltro').setValue(this.fecha);
    this.getRolGuardiasDisponibles();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltro: [new Date()],
    })
  }
  getRolGuardiasDisponibles() {
    let data = {
      fechaOferta: this.form.value.fechaFiltro,
      nombreIpress: "la posta medica",
    }
    console.log('DATA ', data);

    this.ofertasService.getOfertasDisponibles(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA DE ROL DE GUARDIAS DISPONIBLES', this.data);
    })
  }
  ngOnInit(): void {
  }

}
