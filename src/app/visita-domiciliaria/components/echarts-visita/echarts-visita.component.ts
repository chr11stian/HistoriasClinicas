import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts-visita',
  templateUrl: './echarts-visita.component.html',
  styleUrls: ['./echarts-visita.component.css']
})
export class EchartsVisitaComponent implements OnInit {
  data:any []=[];
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig  
  ) { }

  ngOnInit(): void {
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
        data: [120, 132, 101, 134, 90, 230, 210,101, 134, 90, 230, 210]
      },
      {
        name: 'Niños y niñas,4-24 meses',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
      },
      {
        name: 'Gestantes',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
      },
      {
        name: 'Puerperas',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
      },
    ]
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
  };
  option && myChart.setOption(option);
}

}
