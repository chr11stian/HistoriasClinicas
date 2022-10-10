import { Component, OnInit } from '@angular/core';
import { PnGestanteDialogComponent } from '../pn-gestante-dialog/pn-gestante-dialog.component';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pn-gestante',
  templateUrl: './pn-gestante.component.html',
  styleUrls: ['./pn-gestante.component.css']
})
export class PnGestanteComponent implements OnInit {

  updated:boolean=false;
  listaGestantes:any []=[];
  ref:DynamicDialogRef;

  constructor(private fb:FormBuilder,
              private dialog:DialogService,
              private pn_gestanteServicio:PnGestanteService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.mostrarPadronNominalGestantes();
  }

  mostrarPadronNominalGestantes(){
    this.pn_gestanteServicio.couch=true;
    this.pn_gestanteServicio.mostrarPadronGestantes('00002384').subscribe(
      (data)=>{
        console.log('la data es :',data);
        this.listaGestantes=data['rows']
        console.log('padron nominal gestantes',this.listaGestantes)
      },(err)=>{
        this.listaGestantes=[];
        console.log('Ups algo salio mal',this.listaGestantes)
      }
    );
  }

  openDialog(){
    const ref = this.dialog.open(PnGestanteDialogComponent, {
      header:'AGREGAR NUEVA GESTANTE',
      width: "80%",
      height: "100%"
  });
  localStorage.removeItem('gestanteLocalStorage');
  this.ref.onClose.subscribe((data:any)=>{
    this.mostrarPadronNominalGestantes();
  })
  }

  editar(event){
    localStorage.setItem('gestanteLocalStorage',JSON.stringify(event));
    this.ref = this.dialog.open(PnGestanteDialogComponent, {
      header: "EDITAR DATOS DE LA GESTANTE",
      width: "80%",
      height: "100%"
  });
  this.ref.onClose.subscribe((data:any)=>{
    this.mostrarPadronNominalGestantes();
  })
  }
}
