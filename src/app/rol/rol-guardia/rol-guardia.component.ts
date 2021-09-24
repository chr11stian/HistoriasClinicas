import { Component, OnInit } from "@angular/core";

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
      if (dia == 0) this.mesActual.push({ diaSemana: "Lun", dia: i });
      else if (dia == 1) this.mesActual.push({ diaSemana: "Mar", dia: i });
      else if (dia == 2) this.mesActual.push({ diaSemana: "Mie", dia: i });
      else if (dia == 3) this.mesActual.push({ diaSemana: "Jue", dia: i });
      else if (dia == 4) this.mesActual.push({ diaSemana: "vie", dia: i });
      else if (dia == 5) this.mesActual.push({ diaSemana: "sab", dia: i });
      else this.mesActual.push({ diaSemana: "don", dia: i });
    }
  }
  getStyleCSS(diaSemana: string, dia: number) {
    // let contadorSemana=1;
    // let estiloInpar='background-color:red'
    // let estiloPar='background-color:white'
    // for(let i=0;i<dia;dia++){
    //   if(idei)
    // }
  }

  ngOnInit(): void {}
}
