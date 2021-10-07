import { Component, OnInit } from "@angular/core";
import { LocaleSettings } from "primeng/calendar/calendar";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
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
  //atributos
  personalServicio: any[];
  turnos: any[];
  selectedPersonalServicio: any;
  dataGeneral = [
    {
      id: "6155cb004ec7a67ba2c1550b",
      apellidos: "huaman rojas",
      nombres: "Ignacio",
      especialidad: "enfermeria",
    },
    {
      id: "6155cb004ec7a67ba2c1550b",
      apellidos: "vargas rojas",
      nombres: "fidel",
      especialidad: "enfermeria",
    },
    {
      id: "6155cb004ec7a67ba2c1550b",
      apellidos: "quispe palomino",
      nombres: "dany",
      especialidad: "enfermeria",
    },
    {
      id: "6155c11848263c7c7aaf22cb",
      apellidos: "huaman rimachi",
      nombres: "jefrey",
      especialidad: "enfermeria",
    },
    {
      id: "6155c11848263c7c7aaf22cb",
      apellidos: "mamani huaman",
      nombres: "juan",
      especialidad: "enfermeria",
    },
  ];
  data: any[] = [];
  fecha = new Date();
  nroDiasdelMes: number = 0;
  mesActual: any[] = [];

  constructor(private tipoPersonalService: TipoPersonalService) {
    // this.personalServicio = [
    //   { name: "Medicina", code: "ME" },
    //   { name: "Obstetricia", code: "OB" },
    //   { name: "Pediatria", code: "PE" },
    //   { name: "Enfermeria", code: "EN" },
    //   { name: "Administracion", code: "AD" },
    // ];
    // this.tipoPersonalService.getTipoPersonales().subscribe((resp: any) => {
    //   this.personalServicio = resp.object;
    // });

    this.turnos = [
      { name: "M", code: "M" },
      { name: "T", code: "T" },
      { name: "M/T", code: "M/t" },
      { name: "GD", code: "GD" },
      { name: "GN", code: "GN" },
    ];
    //calculamos nro dias del mes
    this.nroDiasdelMes = this.numeroDiasMes();
    this.generarMes();
    this.ColorearTabla();
  }
  numeroDiasMes() {
    return new Date(
      this.fecha.getFullYear(),
      this.fecha.getMonth() + 1,
      0
    ).getDate();
  }
  generarMes() {
    this.mesActual = [];
    for (var i = 1; i <= this.nroDiasdelMes; i++) {
      let fecha1 = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), i);
      let dia = fecha1.getDay();

      if (dia == 0)
        this.mesActual.push({ abreviatura: "don", label: "Domingo", dia: i });
      else if (dia == 1)
        this.mesActual.push({ abreviatura: "Lun", label: "Lunes", dia: i });
      else if (dia == 2)
        this.mesActual.push({ abreviatura: "Mar", label: "Martes", dia: i });
      else if (dia == 3)
        this.mesActual.push({ abreviatura: "Mie", label: "Miercoles", dia: i });
      else if (dia == 4)
        this.mesActual.push({ abreviatura: "Jue", label: "Jueves", dia: i });
      else if (dia == 5)
        this.mesActual.push({ abreviatura: "vie", label: "Viernes", dia: i });
      else this.mesActual.push({ abreviatura: "sab", label: "Sabado", dia: i });
    }
  }

  ColorearTabla() {
    let colorR = "background-color:#dfe6e9";
    let colorB = "background-color:white";
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
  }
  cambiar(fechaseleccionada: Date) {
    this.fecha = fechaseleccionada;
    this.nroDiasdelMes = this.numeroDiasMes();
    this.generarMes();
    this.ColorearTabla();
  }
  changeComponentRol(idRol, dd) {
    console.log(idRol.value);

    this.data = [];
    this.dataGeneral.forEach((elemento) => {
      if (elemento.id === idRol.value) {
        this.data.push(elemento);
      }
    });
  }
  ngOnInit(): void {
    this.tipoPersonalService.getTipoPersonales().subscribe((resp: any) => {
      this.personalServicio = resp.object;
    });
  }
}
