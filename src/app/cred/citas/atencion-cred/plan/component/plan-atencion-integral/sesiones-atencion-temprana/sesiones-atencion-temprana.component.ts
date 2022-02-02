import { Component, OnInit } from '@angular/core';
import {SesionesAtencionTempranaService} from '../services/sesiones-atencion-temprana/sesiones-atencion-temprana.service';
import {SesionesTempranas, respuestaSesionesTempranas} from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {NuevaSesionComponent} from './nueva-sesion/nueva-sesion.component'
import {EditarSesionComponent} from './editar-sesion/editar-sesion.component'
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sesiones-atencion-temprana',
  templateUrl: './sesiones-atencion-temprana.component.html',
  styleUrls: ['./sesiones-atencion-temprana.component.css'],
  providers: [DialogService, MessageService]
})
export class SesionesAtencionTempranaComponent implements OnInit {

  listaControles: SesionesTempranas[] = []
  sesiones:any[]=[];
  ref: DynamicDialogRef;

  constructor(private servicio: SesionesAtencionTempranaService, public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.getLista()
  }
  getLista() {
    this.servicio.getListaSesiones('10101099')
        .toPromise().then((result) => {
        this.listaControles = result.object
    }).catch((err) => {
        console.log(err)
    })
  }
  nuevaSesion(){
    console.log("hola sesion");
    let title='Nueva Sesión de Atención Temprana'
    this.ref= this.dialogService.open(NuevaSesionComponent, {
      data: "47825757",
      header: title,
      width: "40%",
    });
  }
  editarSesion(rowData,rowIndex){
    console.log("editar sesion");
    let title='Editar '+row.descripcion
    this.ref= this.dialogService.open(EditarSesionComponent, {
      data: {
        sesion: row,
        dni: "47825757"
      },
      header: title,
      width: "40%",
    });
  }
  eliminarSesion(rowIndex){

  }

}
