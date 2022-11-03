import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import * as echarts from 'echarts';
import { VisitaDomiciliariaService } from '../../services/visita-domiciliaria.service';
import { VisitaNinioService } from '../../services/visita-ninio.service';
import { VisitaGestanteService } from '../../services/visita-gestante.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-echarts-visita',
  templateUrl: './echarts-visita.component.html',
  styleUrls: ['./echarts-visita.component.css']
})
export class EchartsVisitaComponent implements OnInit {
  data:string;
  data_mayores:number []=[0,0,0,0,0,0,0,0,0,0,0,0];
  data_menores:number []=[0,0,0,0,0,0,0,0,0,0,0,0];
  data_gestantes:number []=[0,0,0,0,0,0,0,0,0,0,0,0];
  data_puerperas:number []=[0,0,0,0,0,0,0,0,0,0,0,0];
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private servicioVisitas: VisitaDomiciliariaService,
    private servicioVisitaProfesionalNinios:VisitaNinioService,
    private servicioVisitaProfesionalGestantes:VisitaGestanteService,
  ) {
    config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
    console.log("dni",this.data)
    
  }
  /**
   *   async recuperarVisitasNiniosMayores4MesesAnio(ipress,aux,anio) {
    console.log("arreglo ");
    this.servicioVisitas.couch = true;
    console.log("el aniooo",anio);
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_Meses(ipress,aux.value.responsable,anio)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =data_ninios["rows"];
        }
        console.log("Data ninios mayores",data_ninios);
      });
  }
  async recuperarVisitasNiniosMenores4MesesAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    console.log("el aniooo",anio);
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMenores_4_Meses(ipress,aux.value.responsable,anio)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =data_ninios["rows"];
        }
        console.log("dataaa menores",data_ninios);
      });
  }
  async recuperarGestantesAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    console.log("el aniooo",anio);
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesAnio(ipress, aux.value.responsable,anio)
      .then((data_gestantes) => {
        console.log("data gestantess",data_gestantes);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_gestantes=[];
        if (data_gestantes["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_gestantes=data_gestantes["rows"];
        }
      });
  }
  async recuperarPuerperasAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    console.log("el aniooo",anio);
    await this.servicioVisitaProfesionalGestantes.getVisitasPuerperasAnio(ipress, aux.value.responsable,anio)
      .then((data_puerperas) => {
        console.log("data puerperasss",data_puerperas);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_puerperas=[];
        if (data_puerperas["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_puerperas =data_puerperas["rows"];
        }
      });
  }
   */

  async getVisitasMayoresMeses(){
    let ipress = "00002303";
    let dni=`vp${this.data}`
    console.log("dni ",dni);
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_Meses(ipress,dni,this.servicioVisitas.getAnio())
      .then((data_ninios) => {
        console.log("Data ninios mayores",data_ninios['rows']);
        data_ninios['rows'].map((aux)=>{
          console.log(aux.value.mes);
          this.data_mayores[aux.value.mes-1]=this.data_mayores[aux.value.mes-1]+1;
        })
      });
      console.log('dataaa mayoressss',this.data_mayores);
  }
  async getVisitasMenoresMeses(){
    let ipress = "00002303";
    let dni=`vp${this.data}`
    console.log("dni ",dni);
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMenores_4_Meses(ipress,dni,this.servicioVisitas.getAnio())
      .then((data_ninios) => {
        console.log("Data ninios mayores",data_ninios['rows']);
        data_ninios['rows'].map((aux)=>{
          console.log(aux.value.mes);
          this.data_menores[aux.value.mes-1]=this.data_menores[aux.value.mes-1]+1;
        })
      });
      console.log('dataaa mayoressss',this.data_menores);
  }
  async getVisitasGestantesMeses(){
    let ipress = "00002303";
    let dni=`vp${this.data}`
    console.log("dni ",dni);
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesAnio(ipress,dni,this.servicioVisitas.getAnio())
      .then((data_gestantes) => {
        data_gestantes['rows'].map((aux)=>{
          console.log(aux.value.mes);
          this.data_gestantes[aux.value.mes-1]=this.data_gestantes[aux.value.mes-1]+1;
        })
      });
  }
  async getVisitasPuerperasMeses(){
    let ipress = "00002303";
    let dni=`vp${this.data}`
    console.log("dni ",dni);
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasPuerperasAnio(ipress,dni,this.servicioVisitas.getAnio())
      .then((data_puerperas) => {
        data_puerperas['rows'].map((aux)=>{
          console.log(aux.value.mes);
          this.data_puerperas[aux.value.mes-1]=this.data_puerperas[aux.value.mes-1]+1;
        })
      });
  }
  calcularVisitas(){
  var app = {};
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  var option;
    option = {
    legend: {},
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],

    series: [
      {
        name: 'Niños y niñas,0-4 meses',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data:this.data_menores,
      },
      {
        name: 'Niños y niñas,4-24 meses',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: this.data_mayores,
      },
      {
        name: 'Gestantes',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: this.data_gestantes,
      },
      {
        name: 'Puerperas',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: this.data_puerperas,
      },
    ]
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
  };
  option && myChart.setOption(option);
  }
  ngOnInit(): void {
  this.getVisitasMayoresMeses();
  this.getVisitasMenoresMeses();
  this.getVisitasGestantesMeses();
  this.getVisitasPuerperasMeses();
   setTimeout(() => {
    this.calcularVisitas();
    }, 500);
 
  console.log('iniciandodddd',this.data_mayores);
  console.log('iniciandodddd',this.data_menores);
  console.log('iniciandodddd',this.data_gestantes);
  console.log('iniciandodddd',this.data_puerperas);
 
}

}
