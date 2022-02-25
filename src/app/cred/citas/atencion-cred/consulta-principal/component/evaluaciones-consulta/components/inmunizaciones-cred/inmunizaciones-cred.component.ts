import { Component, OnInit } from "@angular/core";
import { inmunizaciones } from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import { InmunizacionesService } from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { VacunaComponent } from "../vacuna/vacuna.component";

@Component({
  selector: "app-inmunizaciones-cred",
  templateUrl: "./inmunizaciones-cred.component.html",
  styleUrls: ["./inmunizaciones-cred.component.css"],
  providers: [DialogService],
})

export class InmunizacionesCredComponent implements OnInit {
  valor: string = "";
  tipoDNI: string;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: inmunizaciones[] = [ ];
  listaMeses:number[]=[1,2,3,4,5,6,12,18,24,48]
  inmunizacionesAgrupadas=[[],[],[],[]]
  nombreRealVacuna:any[]=[
    {abreviado:'BCG',completo:'BCG'},
    {abreviado:'HVB',completo:'HVB'},
    {abreviado:'IPV1',completo:'IPV 1'},
    {abreviado:'IPV2',completo:'IPV 2'},
    {abreviado:'APO3',completo:'APO 3'},
    {abreviado:'APO2R',completo:'APO 2do Refuerzo'},
    {abreviado:'Pentavalente1',completo:'PENTAVALENTE 1'},
    {abreviado:'Pentavalente2',completo:'PENTAVALENTE 2'},
    {abreviado:'Pentavalente3',completo:'PENTAVALENTE 3'},
    {abreviado:'Rotavirus1',completo:'ROTAVIRUS 1'},
    {abreviado:'Rotavirus2',completo:'ROTAVIRUS 2'},
    {abreviado:'Neumococo1',completo:'NEUMOCOCO 1'},
    {abreviado:'Neumococo2',completo:'NEUMOCOCO 2'},
    {abreviado:'APO1R',completo:'APO 1er Refuezo'},
    {abreviado:'Neumococo3',completo:'NEUMOCOCO'},
    {abreviado:'SPR1',completo:'SPR 1'},
    {abreviado:'SPR2',completo:'SPR 2'},
    {abreviado:'BCG',completo:'BCG'},
  ]
  agrupaciones:any[]=[
    {abreviado:'RN',completo:'Recien Nacido'},
    {abreviado:'Menor_1A',completo:'Menor de un Año'},
    {abreviado:'1A',completo:'Un Año'},
    {abreviado:'4A',completo:'Cuatro Años'},

  ]
  NombreVacunaExtendido(vacuna:string):string{
    const real=this.nombreRealVacuna.find((element)=>{
      return element.abreviado==vacuna;
    })
    return real.completo
  }
  nombreAgrupacionExtendido(vacuna:string):string{
    const real=this.agrupaciones.find((element)=>{
      return element.abreviado==vacuna;
    })
    return real.completo
  }

  constructor(
    private inmunizacionesService: InmunizacionesService,
    private messageService: MessageService,
    private rutaActiva: ActivatedRoute,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.nroDNI = "91759213";
    this.getListaInmunizaciones();
    // console.log('aaaaaaaaaaaa',this.inmunizacionesAgrupadas[0]);
    //  let arreglo=[[],[],[]];
    //   console.log('tipo of',typeof(arreglo[0]));
    //   console.log('elemento>>>',arreglo[0])
    //   arreglo[0].push('cualquier cosa')
    //   console.log('longitud>>>',arreglo[0])

  }
  toDate(){
   this.listaInmunizaciones.forEach((element)=>{
     element.fechaTentativa=new Date(element.fechaTentativa)
     // element.fechaTentativa=new Date(element.fechaTentativa)
   })
  }
  edadMes:string[]
  clasificamos(){
    this.edadMes=[]//['RN', 'Menor_1A', '1A', '4A']
    this.listaInmunizaciones.forEach((element)=>{
      let isInclude=this.edadMes.find((elemento)=>{
        return elemento==element.descripcionEdad
      })
      if(!isInclude){
        this.edadMes.push(element.descripcionEdad)
      }
    })
    // desglosamos/
    this.listaInmunizaciones.forEach((element,index)=>{
      let mes=element.descripcionEdad;
      let posicion=this.edadMes.indexOf(mes);
      this.inmunizacionesAgrupadas[posicion].push(element)
    });


  }
  getListaInmunizaciones() {
    this.inmunizacionesService.getListaInmunizaciones(this.nroDNI).subscribe((resp)=>{
      this.listaInmunizaciones=resp['object'];
      this.toDate();
      this.clasificamos();
    })

    // this.servicio;
    // // .getListaInmunizaciones(this.nroDNI)
    // this.servicio
    //   .getListaInmunizaciones("98745896")
    //   .toPromise()
    //   .then((result) => {
    //     this.listaInmunizaciones = result.object;
    //     console.log("lista de inmunizaciones", this.listaInmunizaciones);
    //     this.transform();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log("inmunizaciones");
  }
  transform() {
    //transformacion a un solo formato que se usará
    // this.listaInmunizaciones.forEach((i) => {
    //   if (i.fecha === null) {
    //     i.fecha = "";
    //   }
    //   if (i.fechaTentativa === null) {
    //     i.fechaTentativa = "";
    //   } else {
    //     i.fecha = i.fecha.split(" ")[0];
    //     i.fechaTentativa = i.fechaTentativa.split(" ")[0];
    //   }
    // });
    // this.separacion();
  }
  separacion() {
    // aqui la lista de inmunicaiones queda vacia
    // this.lista1 = this.listaInmunizaciones.splice(0, 8);
    // this.lista2 = this.listaInmunizaciones.splice(0, 8);
    // this.lista3 = this.listaInmunizaciones.splice(
    //   0,
    //   this.listaInmunizaciones.length
    // );
  }

  agregarVacuna(vacuna:inmunizaciones) {
    console.log(vacuna);
    const ref = this.dialogService.open(VacunaComponent, {
      data: vacuna,
      header: `Agregar Vacuna ${vacuna.nombre} Dosis numero ${vacuna.dosis} `,
      width: "45%",
    });
    // console.log(vacuna);
  }
}
