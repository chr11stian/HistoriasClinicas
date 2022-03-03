import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-resumen-pagos',
  templateUrl: './resumen-pagos.component.html',
  styleUrls: ['./resumen-pagos.component.css']
})
export class ResumenPagosComponent implements OnInit {
  form: FormGroup;

  idIpress: String;
  nombreIpress: String;
  DataPagos: any[];
  datePipe = new DatePipe("en-US");
  constructor(
    private servicesService: ServicesService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.idIpress = "616de45e0273042236434b51";
    this.nombreIpress = "la posta medica";
    this.DataPagos = [];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltroInicio: [new Date()],
      fechaFiltroFin: [new Date()],
      nroDoc: [""],
    })
  }
  getListaPagosRealizados() {
    let data = {
      fechaInicio: this.datePipe.transform(this.form.value.fechaFiltroInicio, 'yyyy-MM-dd'),
      fechaFin: this.datePipe.transform(this.form.value.fechaFiltroFin, 'yyyy-MM-dd'),
    }

    console.log('DATA ', data);

    this.servicesService.listarPagosRealizados(this.idIpress,"01",data).subscribe((res: any) => {
      this.DataPagos = res.object;
      console.log('LISTA DE pagos de caja 01', this.DataPagos);
    })
  }
  ngOnInit(): void {
  }

}
