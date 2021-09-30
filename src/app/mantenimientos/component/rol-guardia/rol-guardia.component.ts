import { Component, OnInit } from "@angular/core";
export interface dayType {
  label: string;
  numberDay: number;
  abre: string;
  bg?: string;
}

@Component({
  selector: "app-rol-guardia",
  templateUrl: "./rol-guardia.component.html",
  styleUrls: ["./rol-guardia.component.css"],
})
export class RolGuardiaComponent implements OnInit {
  data = [
    {
      apellidos: "huaman rojas",
      nombres: "Ignacio",
      especialidad: "obstetricia",
    },
    {
      apellidos: "vargas rojas",
      nombres: "fidel",
      especialidad: "obstetricia",
    },
    {
      apellidos: "quispe palomino",
      nombres: "dany",
      especialidad: "obstetricia",
    },
    {
      apellidos: "huaman rimachi",
      nombres: "jefrey",
      especialidad: "obstetricia",
    },
    {
      apellidos: "mamani huaman",
      nombres: "juan",
      especialidad: "obstetricia",
    },
  ];
  // fechaHoy = new Date(2021, 10, 2);
  fechaHoy = new Date(2021, 10, 2);
  mes: number = 0;
  mesActual: any[] = [];
  constructor() {
    //calculamos nro dias del mes
    this.mes = this.numeroDiasMes();
    this.generarMes();
    this.ColorearTabla();
    console.log(this.fechaHoy);
  }
  numeroDiasMes() {
    return new Date(
      this.fechaHoy.getFullYear(),
      this.fechaHoy.getMonth() + 1,
      0
    ).getDate();
  }
  generarMes() {
    for (var i = 1; i <= this.mes; i++) {
      let fecha1 = new Date(
        this.fechaHoy.getFullYear(),
        this.fechaHoy.getMonth(),
        i
      );
      let dia = fecha1.getDay();
      if (dia == 0)
        this.mesActual.push({ abreviatura: "Lun", label: "Lunes", dia: i });
      else if (dia == 1)
        this.mesActual.push({ abreviatura: "Mar", label: "Martes", dia: i });
      else if (dia == 2)
        this.mesActual.push({ abreviatura: "Mie", label: "Miercoles", dia: i });
      else if (dia == 3)
        this.mesActual.push({ abreviatura: "Jue", label: "Jueves", dia: i });
      else if (dia == 4)
        this.mesActual.push({ abreviatura: "vie", label: "Viernes", dia: i });
      else if (dia == 5)
        this.mesActual.push({ abreviatura: "sab", label: "Sabado", dia: i });
      else
        this.mesActual.push({ abreviatura: "don", label: "Domingo", dia: i });
    }
  }

  ColorearTabla() {
    // let colorR = '#ef6b55'
    // let colorB = '#ffffff'
    let colorR = "background-color:red";
    let colorB = "background-color:yellow";
    let hasColor = true; //primera semana en pintar rojo
    this.mesActual.forEach((day) => {
      if (hasColor) {
        day.bg = colorR;
        if (day.abreviatura === "sab") {
          hasColor = !hasColor;
        }
      } else {
        day.bg = colorB;
        if (day.abreviatura === "sab") {
          hasColor = !hasColor;
        }
      }
    });

    // this.mesActual.forEach((day) => {
    //   if (day.abreviatuta === "sab" && hasColor) {
    //     day.bg = colorR;
    //     hasColor = false;
    //   } else if (day.abre === "sab" && !hasColor) {
    //     day.bg = colorB;
    //     hasColor = true;
    //   } else {
    //     if (hasColor) {
    //       day.bg = colorR; // pinta de rojo
    //     } else {
    //       day.bg = colorB; //pinta color blanco
    //     }
    //   }
    // });
  }

  ngOnInit(): void {}
}
