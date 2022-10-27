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
  menor4meses:string []=[
  "INFORMACIÓN GENERAL",
  "LACTANCIA MATERNA EXCLUSIVA",
  "SUPLEMENTACIÓN"
  ]

  mayor4meses:string []=[
  "INFORMACIÓN GENERAL",
  "LACTANCIA MATERNA EXCLUSIVA O CONTINUACIÓN DE LA LACTANCIA",
  "ALIMENTACIÓN COMPLEMENTARIA",
  "SUPLEMENTACIÓN/TRATAMIENTO",
  "OTROS COMPROMISOS"
  ]
  obtenerFecha(){
    let fecha='2022-09-21T07:11:32.794141'
    let mydate = new Date(fecha);
    let dia=mydate.getDay();
    let mes = mydate.getMonth();
    let  anio=mydate.getFullYear();
    console.log('la fecha es',`${dia}/${mes+1}/${anio}`)
    //return `${dia}/${mes}/${anio}`
  }
}
