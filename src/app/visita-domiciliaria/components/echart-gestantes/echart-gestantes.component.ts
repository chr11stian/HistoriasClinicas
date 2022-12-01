import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";
import { VisitaGestanteService } from "../../services/visita-gestante.service";
import * as echarts from "echarts";

@Component({
  selector: "app-echart-gestantes",
  templateUrl: "./echart-gestantes.component.html",
  styleUrls: ["./echart-gestantes.component.css"],
})
export class EchartGestantesComponent implements OnInit {
  data: string;
  nro_gestantes_anemia = 0;
  nro_gestantes_snanemia = 0;
  nro_gestantes_snValor = 0;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private servicioVisitas: VisitaDomiciliariaService,
    private servicioVisitaProfesionalGestantes: VisitaGestanteService
  ) {
    config.data.edit === undefined
      ? (this.data = config.data)
      : (this.data = config.data.data);
  }

  ngOnInit(): void {
    this.getVisitasGestantesMeses();
    setTimeout(() => {
      this.estadistica();
    }, 500);
  }

  async getVisitasGestantesMeses() {
    this.nro_gestantes_anemia = 0;
    this.nro_gestantes_snanemia = 0;
    this.nro_gestantes_snValor = 0;
    let ipress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.data}`;
    console.log("dni ", dni);
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes
      .getVisitasGestantesAnio(ipress, dni, this.servicioVisitas.getAnio())
      .then((data_gestantes) => {
        data_gestantes["rows"].map((aux) => {
          console.log(aux.value.mes);
          console.log(aux.value["hemoglobina"]);
          if (aux.value["hemoglobina"] == "") {
            this.nro_gestantes_snValor++;
          } else {
            let number = parseFloat(aux.value["hemoglobina"]);
            if (number < 11) {
              this.nro_gestantes_anemia++;
            } else if (number >= 11) {
              this.nro_gestantes_snanemia++;
            }
          }
        });
      });
  }

  estadistica() {
    var app = {};
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;
    const data1 = [
      {
        value: this.nro_gestantes_anemia,
        name: " Anemia",
      },
      {
        value: this.nro_gestantes_snanemia,
        name: "Sin Anemia",
      },
      {
        value: this.nro_gestantes_snValor,
        name: "No precisa",
      },
    ];

    option = {
      backgroundColor: "#f8f9fa",
      title: [
        {
          text: "VISITAS DOMICILIARIAS DE GESTANTES",
          left: "center",
        },
        {
          subtext: "GESTANTES",
          left: "50%",
          top: "85%",
          textAlign: "center",
        },
      ],
      legend: {
        bottom: 10,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Gestantes",
          type: "pie",
          radius: "70%",
          center: ["50%", "50%"],
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            label: {
              show: true,
            },
          },
          data: data1,
          left: 0,
          right: 0,
          top: -30,
          bottom: 0,
        },
      ],
    };

    option && myChart.setOption(option);
  }
}
