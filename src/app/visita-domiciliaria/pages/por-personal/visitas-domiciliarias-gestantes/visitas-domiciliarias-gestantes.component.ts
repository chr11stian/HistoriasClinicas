import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl,AbstractControl,Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { VisitaDomiciliariaService } from "src/app/visita-domiciliaria/services/visita-domiciliaria.service";
import { DialogRespuestasComponent } from "../../../components/dialog-respuestas/dialog-respuestas.component";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-visitas-domiciliarias-gestantes",
  templateUrl: "./visitas-domiciliarias-gestantes.component.html",
  styleUrls: ["./visitas-domiciliarias-gestantes.component.css"],
  providers: [DialogService],
})
export class VisitasDomiciliariasGestantesComponent implements OnInit {
  ref: DynamicDialogRef;
  dataVisitas: any []  = [];
  dataVisitas1: any[] = [];
  options: any;
  overlays: any[];
  formListaVisitas: FormGroup;
  loading: boolean = true;
  selectedAnio:string="";
  selectedMes:string="";
  //parte de prueba
  listaVisitas1: any[] = [
    { latitud: -13.52507, longitud: -71.93089 },
    { latitud: -13.5307703, longitud: -71.9408312 },
    { latitud: -13.530774, longitud: -71.9408339 },
    { latitud: -13.58441, longitud: -71.91867 },
    { latitud: -13.5307587, longitud: -71.9408254 },
    { latitud: -13.53182, longitud: -71.93626 },
    { latitud: -13.5307528, longitud: -71.940821 },
    { latitud: -13.52591, longitud: -71.936 },
  ];
  formAntecedentes:FormGroup;
  meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value:2},
    { label: 'Marzo', value: 3},
    { label: 'Abril', value:4},
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value:6},
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value:8},
    { label: 'Septiembre', value: 9},
    { label: 'Octubre', value:10},
    { label: 'Noviembre', value:11},
    { label: 'Diciembre', value:12},
  ];
  anios = [
    {anio: '2022'},
    {anio: '2021'},
    {anio: '2020'},
    {anio: '2019'},
  ];

  constructor(
    public dialog: DialogService,
    private servicioVisitas: VisitaDomiciliariaService,
    private fb: FormBuilder,
    private messageService:MessageService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.listaVisitas();
  
  }

  datosVisitas() {
    let dni = "vp72753957";
    this.servicioVisitas.couch = true;
    this.servicioVisitas
      .getVisitasNiniosByProfesional(dni)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("visitas por profesional", data["rows"]);
      });
  }

  buildForm() {
    this.formListaVisitas = this.fb.group({
      busquedaAnio: new FormControl("",[Validators.required]),
      busquedaMes: new FormControl("",[Validators.required]),
    });
  }
  
  listaVisitas() {
    let dni = "vp72753957";
    this.servicioVisitas.couch = true;
    this.servicioVisitas
      .getVisitasNiniosByProfesional(dni)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("Lista visitas", this.dataVisitas);
      });
  }

  openDialogRespuestas(data: any[]) {
    this.ref = this.dialog.open(DialogRespuestasComponent, {
      header: "Preguntas > Respuestas de la visita domiciliaria ejecutada",
      width: "70%",
      // height: "800px",
      contentStyle: {
        "max-height": "92%",
        overflow: "auto",
      },
      data: data,
    });
  }

  recuperarValores(){
    let busquedaAnio:string = this.formListaVisitas.value.busquedaAnio;
    let busquedaMes:string = this.formListaVisitas.value.busquedaMes;
    console.log('Anio',busquedaAnio);
    console.log('Mes',busquedaMes);
  }

  buscarVisitaAnioXMes(){
    let busquedaAnio:string = this.formListaVisitas.value.busquedaAnio;
    let busquedaMes:string = this.formListaVisitas.value.busquedaMes;
    let fecha=`${busquedaAnio} ${busquedaMes}`;
    //console.log(fecha);
    this.servicioVisitas.couch=true;
    this.servicioVisitas.buscarVisitaNiniosXAnioMes(fecha).subscribe((data)=>{
    if(data['rows'].length>0){
      this.dataVisitas=data["rows"]
      console.log('Busqueda por fecha',this.dataVisitas);
      this.messageService.add({ key: 'myMessage1', severity: 'sucess', summary: 'Exitoso', detail: 'Visitas Actualizada' });
    }else{
      this.messageService.add({ key: 'myMessage2', severity: 'error', summary: 'Error', detail: 'Usted no tiene visitas' });
    }
    })
  }

  buscarVisitaXAnio(){
    let busquedaAnio:string = this.formListaVisitas.value.busquedaAnio;
    let fecha=busquedaAnio;
    this.servicioVisitas.couch=true;
    this.servicioVisitas.buscarVisitaNiniosXAnio(fecha).subscribe((data)=>{
      this.dataVisitas=data["rows"]
      console.log('Busqueda por fecha',this.dataVisitas);
    })
  }
}
