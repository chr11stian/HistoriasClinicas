import { Component, OnInit } from '@angular/core';
import { SuplementacionesMicronutrientesService } from '../services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service'
import { SuplementacionMicronutrientes } from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import {dato} from "../../../../../models/data";

@Component({
  selector: 'app-suplementaciones-micronutrientes',
  templateUrl: './suplementaciones-micronutrientes.component.html',
  styleUrls: ['./suplementaciones-micronutrientes.component.css']
})
export class SuplementacionesMicronutrientesComponent implements OnInit {
  stateOptions: any[];
  expandir: boolean = true;
  listaMicronutrientes: SuplementacionMicronutrientes[] = []
  SF: SuplementacionMicronutrientes[] = []
  MNM: SuplementacionMicronutrientes[] = []
  VA: SuplementacionMicronutrientes[] = []

  valueO: boolean = true;
  datePipe = new DatePipe('en-US');
  dataDocumento:dato
  nroDni:string;
  constructor(private servicio: SuplementacionesMicronutrientesService,
    private messageService: MessageService,) {
    this.dataDocumento=JSON.parse(localStorage.getItem('documento'))
    this.nroDni=this.dataDocumento.nroDocumento;
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
    // console.log('-->',
    //     this.servicio.getListaMicronutrientesPro(this.nroDni)
    // )

    this.servicio.getListaMicronutrientes(this.nroDni)
      .toPromise().then((result) => {
        this.listaMicronutrientes = result.object
        this.transform()
      }).catch((err) => {
        console.log(err)
      })
    this.servicio.getVitaminaA(this.nroDni).toPromise().then((result)=>{
      this.VA=result.object;
      console.log(this.VA)
      this.transformVitaA()
    })
  }
  transformVitaA() {
    this.VA.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
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

  // saveData() {
  //   console.log('info before ', this.SF, this.MNM)
  //   this.SF.forEach(i => {
  //     i.fecha === null ? i.fecha = '' : i.fecha = this.datePipe.transform(i.fecha, 'yyyy-MM-dd HH:mm:ss');
  //
  //   })
  //   this.MNM.forEach(i => {
  //     i.fecha === null ? i.fecha = '' : i.fecha = this.datePipe.transform(i.fecha, 'yyyy-MM-dd HH:mm:ss');
  //   })
  //   let dataArray = this.SF.concat(this.MNM);
  //   console.log('data to save ', dataArray);
  //   this.servicio.putSuplementacionMicronutrientes('47825757', dataArray).subscribe((res: any) => {
  //     console.log('se guardo');
  //     this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
  //   });
  // }
}
