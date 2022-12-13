import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";
import { VisitaNinioService } from "../../services/visita-ninio.service";
import * as echarts from "echarts";
@Component({
  selector: "app-echart-ninios",
  templateUrl: "./echart-ninios.component.html",
  styleUrls: ["./echart-ninios.component.css"],
})
export class EchartNiniosComponent implements OnInit {
  data: string;
  nro_anemia_mayores: number = 0;
  nro_anemia_menores: number = 0;
  nro_snanemia_mayores: number = 0;
  nro_snanemia_menores: number = 0;
  nro_sinValor_mayores: number = 0;
  nro_sinValor_menores: number = 0;

  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private servicioVisitas: VisitaDomiciliariaService,
    private servicioVisitaProfesionalNinios: VisitaNinioService
  ) {
    config.data.edit === undefined
      ? (this.data = config.data)
      : (this.data = config.data.data);
  }

  ngOnInit(): void {
    this.getVisitasMenoresMeses();
    this.getVisitasMayoresMeses();
    setTimeout(() => {
      this.estadistica();
    },5500);
  }
  async getVisitasMayoresMeses() {
    this.nro_sinValor_mayores = 0;
    this.nro_anemia_mayores = 0;
    this.nro_snanemia_mayores = 0;
    let ipress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.data}`;
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios
      .getVisitasNiniosXProfesionalMayores_4_Meses(
        ipress,
        dni,
        this.servicioVisitas.getAnio()
      )
      .then((data_ninios) => {
        data_ninios["rows"].map((aux) => {
          if (aux.value["hemoglobina"].toString() == "") {
            this.nro_sinValor_mayores++;
          } else {
            let number = parseFloat(aux.value.hemoglobina);
            if (number < 10) {
              this.nro_anemia_mayores++;
            } else if (number >= 10) {
              this.nro_snanemia_mayores++;
            }
          }
        });
      });
  }
  async getVisitasMenoresMeses() {
    this.nro_sinValor_menores = 0;
    this.nro_anemia_menores = 0;
    this.nro_snanemia_menores = 0;
    let ipress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.data}`;
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios
      .getVisitasNiniosXProfesionalMenores_4_Meses(
        ipress,
        dni,
        this.servicioVisitas.getAnio()
      )
      .then((data_ninios) => {
        data_ninios["rows"].map((aux) => {
          if (aux.value["hemoglobina"] == "") {
            this.nro_sinValor_menores++;
          } else {
            let number = parseFloat(aux.value.hemoglobina);
            if (number < 10) {
              this.nro_anemia_menores++;
            } else if (number >= 10) {
              this.nro_snanemia_menores++;
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
        value: this.nro_anemia_menores,
        name: "Con anemia",
      },
      {
        value: this.nro_snanemia_menores,
        name: "Sin anemia",
      },
      {
        value: this.nro_sinValor_menores,
        name: "No precisa",
      },
    ];

    const data2 = [
      {
        value: this.nro_anemia_mayores,
        name: "Con Anemia",
      },
      {
        value: this.nro_snanemia_mayores,
        name: "Sin Anemia",
      },
      {
        value: this.nro_sinValor_mayores,
        name: "No precisa",
      },
    ];
    option = {
      backgroundColor: "#f8f9fa",
      title: [
        {
          text: "VISITA DOMICILIARIA DE NIÑOS Y NIÑAS ",
          left: "center",
        },
        {
          subtext: "EDAD 0-4 MESES",
          left: "30%",
          top: "80%",
          textAlign: "center",
        },
        {
          subtext: "EDAD 4-24 MESES",
          left: "80%",
          top: "80%",
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
          name: "niñas y niños de 0-4 meses",
          type: "pie",
          radius: "50%",
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
          left: "0%",
          right: "50%",
          top: -150,
          bottom: 0,
        },
        {
          name: "niñas y niños de 4-24 meses",
          type: "pie",
          radius: "50%",
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
          data: data2,

          left: "50%",
          right: "0%",
          top: -150,
          bottom: 0,
        },
      ],
    };

    option && myChart.setOption(option);
  }
}
