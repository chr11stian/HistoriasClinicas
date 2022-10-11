import { Component, OnInit } from '@angular/core';
import { PnGestanteDialogComponent } from '../pn-gestante-dialog/pn-gestante-dialog.component';
import { PnGestanteService } from '../../services/pn-gestante.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PnGestanteDiaGestaComponent } from '../pn-gestante-dia-gesta/pn-gestante-dia-gesta.component';
import { PnGestanteDiaCambioComponent } from '../pn-gestante-dia-cambio/pn-gestante-dia-cambio.component';

@Component({
  selector: 'app-pn-gestante',
  templateUrl: './pn-gestante.component.html',
  styleUrls: ['./pn-gestante.component.css']
})
export class PnGestanteComponent implements OnInit {
  updated:boolean=false;
  listaGestantes:any []=[];
  listaGestantesPuerpera:any []=[];
  estado:any;
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
    this.pn_gestanteServicio.mostrarPadronGestantes('00002549').subscribe(
      (data)=>{
        this.listaGestantes=data['rows']
        this.listaGestantesPuerpera= this.listaGestantes.filter((aux) => {
          if (this.semanaGestacional(aux.value.fur)<38) return aux;
        });
        console.log('la data es :',data);
      
        //console.log('padron nominal gestantes',this.listaGestantes)
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
      height: "80%"
  });
  localStorage.removeItem('gestanteLocalStorage');
  this.ref.onClose.subscribe((data:any)=>{
    this.mostrarPadronNominalGestantes();
  })
  }

  openDialogNuevaGesta(){
    const ref = this.dialog.open(PnGestanteDiaGestaComponent, {
      header:'AGREGAR NUEVA GESTA',
      width: "80%",
      height: "80%"
  });
  }

  openDialogCambioEESS(){
    const ref = this.dialog.open(PnGestanteDiaCambioComponent, {
      header:'CAMBIO EESS DE GESTANTE',
      width: "70%",
      height: "50%"
  });
  }

  editar(event){
    localStorage.setItem('gestanteLocalStorage',JSON.stringify(event));
    this.ref = this.dialog.open(PnGestanteDialogComponent, {
      header: "EDITAR DATOS DE LA GESTANTE",
      width: "80%",
      height: "80%"
  });
  this.ref.onClose.subscribe((data:any)=>{
    this.mostrarPadronNominalGestantes();
  })
  }
  dateDiference = function (date1, date2) {
    date1 = Date.parse(date1);
    let diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  formatoFecha=function(fecha){
    var mydate =fecha.split('/')
    return `${mydate[2]}-${mydate[1]}-${mydate[0]}`;
  }

  semanaGestacional(date:string){
    let fechaActual = Date.now();
    let fur=this.formatoFecha(date);
    let diference =(this.dateDiference(fur, fechaActual)/7);
    let semanas=Math.floor(diference);
    let dias=Math.floor(diference%2)
    return semanas;
  }
}
