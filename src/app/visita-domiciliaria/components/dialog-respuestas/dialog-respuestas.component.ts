import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-dialog-respuestas",
  templateUrl: "./dialog-respuestas.component.html",
  styleUrls: ["./dialog-respuestas.component.css"],
})
export class DialogRespuestasComponent implements OnInit {
  data:any []=[];
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
    console.log(this.data);
  }
  ngOnInit(): void {}
  
  obtenerFecha(){
    let fecha='2022-09-21T07:11:32.794141'
    let mydate = new Date(fecha);
    let dia=mydate.getDay();
    let mes = mydate.getMonth();
    let  anio=mydate.getFullYear();
    console.log('la fecha es',`${dia}/${mes}/${anio}`)
    //return `${dia}/${mes}/${anio}`
  }
}
