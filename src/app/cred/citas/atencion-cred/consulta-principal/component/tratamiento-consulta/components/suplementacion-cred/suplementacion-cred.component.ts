import { Component, OnInit } from '@angular/core';
import {SuplementacionMicronutrientes} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DatePipe} from "@angular/common";
import {SuplementacionesMicronutrientesService} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {MessageService} from "primeng/api";
import {SuplementoComponent} from "../suplemento/suplemento.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: 'app-suplementacion-cred',
  templateUrl: './suplementacion-cred.component.html',
  styleUrls: ['./suplementacion-cred.component.css'],
  providers: [DialogService],
})
export class SuplementacionCredComponent implements OnInit {

  stateOptions: any[];
  expandir: boolean = true;
  listaMicronutrientes: SuplementacionMicronutrientes[] = []
  SF: SuplementacionMicronutrientes[] = []
  MNM: SuplementacionMicronutrientes[] = []
  valueO: boolean = true;
  datePipe = new DatePipe('en-US');

  constructor(private servicio: SuplementacionesMicronutrientesService,
              private messageService: MessageService,
              public dialogService: DialogService) {
    this.stateOptions = [
      { label: 'SI', optionValue: true },
      { label: 'NO', optionValue: false }
    ];

  }

  ngOnInit(): void {
    this.getLista()

    console.log('data SF ', this.SF);
  }
  getLista() {
    this.servicio.getListaMicronutrientes('14141414')
      .toPromise().then((result) => {
      this.listaMicronutrientes = result.object
      this.transform()
    }).catch((err) => {
      console.log(err)
    })
  }
  transform() {
    //transformacion a un solo formato que se usará
    // console.log('data to transform ', this.listaMicronutrientes);
    // this.listaMicronutrientes.forEach(i => {
    //
    //   if (i.fecha === null) {
    //     i.fecha = '';
    //   }
    //   if (i.fechaTentativa === null) {
    //     i.fechaTentativa = '';
    //   }
    //   else {
    //     i.fecha = i.fecha.split(' ')[0];
    //     i.fechaTentativa = this.datePipe.transform(i.fechaTentativa, 'yyyy-MM-dd HH:mm:ss');
    //   }
    // })
    // console.log("lista conversa", this.listaMicronutrientes);

    this.listaMicronutrientes.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
    this.separacion()
  }
  separacion() {
    this.SF = this.listaMicronutrientes.filter(item => item.nombre === 'SF');
    console.log('lista SF', this.SF);
    this.MNM = this.listaMicronutrientes.filter(item => item.nombre === 'MNM')
    console.log('lista MMN', this.MNM);
  }

  agregarSuplementacion(inmunizacion:SuplementacionMicronutrientes) {
    const ref = this.dialogService.open(SuplementoComponent, {
      data: inmunizacion,
      header: `Agregar Suplementacion ${inmunizacion.descripcion} Dosis numero (${inmunizacion.dosis})`,
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
    });
    ref.onClose.subscribe((mensaje) => {
      if (mensaje == "agregado") {
        this.getLista();
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: "suplementacion Registrada satisfactoriamente",
        });
      } else {
        // this.messageService.add({severity:'error', summary: 'warn', detail:'NO SE registro ninguna inmunizacion'});
      }
    });
  }


}
