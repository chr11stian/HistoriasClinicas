import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../models/data";
import {TamizajesService} from "../service/tamizajes/tamizajes.service";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  listaTamizajes:Tamizaje[]=[];
  attributeLocalS = 'documento';
  data:dato;
  constructor(private tamizajeService:TamizajesService) {
    // this.listaTamizajes = [
    //   {
    //     idTamizaje:'',
    //     fecha: "16/11/2021",
    //     edad: '15 meses',
    //   },
    //   {
    //     idTamizaje:'',
    //     fecha: "18/11/2021",
    //     edad: '18',
    //   },
    //   {
    //     idTamizaje:'',
    //     fecha: "21/11/2021",
    //     edad: '21',
    //   },
    // ]
  }
  ngOnInit(): void {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.recuperarTamizajeBD();
  }
  async recuperarTamizajeBD(){
    this.tamizajeService.getTamizajePlan(this.data.nroDocumento).subscribe((res: any) => {
      if(res.object!=null){
        res.object.fichasTamizaje.forEach(element=>this.listaTamizajes.push(element));
        console.log(this.listaTamizajes)
      }
    });

  }
  openTamizajes(id) {
    this.tamizajeService.searchTamizaje(id).subscribe((res: any) => {
     console.log(res.object);
    });
  }
}
export interface Tamizaje{
  idTamizaje:string,
  fecha:string,
  edad:string
}


