import { Component, OnInit } from "@angular/core";
import { LocaleSettings } from "primeng/calendar/calendar";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
import { TipoUpsService } from "../../services/tipo-ups.service";
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
  matriz: any = [];
  turno = [
    { name: "M", code: "MA" },
    { name: "T", code: "TA" },
    { name: "M/T", code: "M/T" },
    { name: "GD", code: "GD" },
    { name: "GN", code: "GN" },
  ];
  tipoPersonalServicio: any[];
  turnos: any[];
  personalServicioGeneral = [
    //medico turno
    {
      idUPS: "616602b6034d2c3598133293",
      apellidos: "apellido1",
      nombres: "nombre1",
      especialidad: "medico general",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "medico general",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "medico general",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "enfermeria",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "enfermeria",
    },
    {
      idUPS: "61660303034d2c3598133295",
      apellidos: "apellido3",
      nombres: "nombre3",
      especialidad: "enfermeria",
    },
    {
      idUPS: "61660303034d2c3598133295",
      apellidos: "apellido3",
      nombres: "nombre3",
      especialidad: "enfermeria",
    },
  ];
  fecha = new Date();
  nroDiasMes: number = 0;
  //personales seleccionados y mes actual seleccionado
  personalServicioSelected: any[] = [];
  cabeceraMes: any[] = [];

  constructor(
    private tipoUpsService: TipoUpsService,
    private tipoPersonalService: TipoPersonalService
  ) {
    this.getPersonal();
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
  }
  getPersonal() {
    this.tipoPersonalService.getTipoPersonales().subscribe((resp) => {
      let ups = [];
      ups = resp["object"];
      ups.forEach((elemento) => {
        console.log(elemento["nombre"]);
      });
    });
  }
  ngOnInit(): void {
    this.tipoUpsService.getTipoUPSs().subscribe((resp: any) => {
      this.tipoPersonalServicio = resp.object;
    });
  }

  crearMatriz() {
    this.matriz = [];
    for (let i = 0; i < this.personalServicioSelected.length; i++) {
      let filaAux = [];
      for (let j = 0; j < this.nroDiasMes; j++) {
        filaAux.push("TA");
      }
      this.matriz.push(filaAux);
    }
  }
  numeroDiasMes() {
    this.nroDiasMes = new Date(
      this.fecha.getFullYear(),
      this.fecha.getMonth() + 1,
      0
    ).getDate();
  }
  generarCabecera() {
    this.cabeceraMes = [];
    for (var i = 1; i <= this.nroDiasMes; i++) {
      let fecha1 = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), i);
      let dia = fecha1.getDay();

      if (dia == 0)
        this.cabeceraMes.push({ abreviatura: "don", label: "Domingo", dia: i });
      else if (dia == 1)
        this.cabeceraMes.push({ abreviatura: "Lun", label: "Lunes", dia: i });
      else if (dia == 2)
        this.cabeceraMes.push({ abreviatura: "Mar", label: "Martes", dia: i });
      else if (dia == 3)
        this.cabeceraMes.push({
          abreviatura: "Mie",
          label: "Miercoles",
          dia: i,
        });
      else if (dia == 4)
        this.cabeceraMes.push({ abreviatura: "Jue", label: "Jueves", dia: i });
      else if (dia == 5)
        this.cabeceraMes.push({ abreviatura: "vie", label: "Viernes", dia: i });
      else
        this.cabeceraMes.push({ abreviatura: "sab", label: "Sabado", dia: i });
    }
  }

  colorearCabecera() {
    let colorR = "background-color:#dfe6e9";
    let colorB = "background-color:white";
    let hasColor = true; //primera semana en pintar rojo
    this.cabeceraMes.forEach((day) => {
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
  cambiarFecha(fechaseleccionada: Date) {
    this.fecha = fechaseleccionada;
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    this.crearMatriz(); //si cambia fecha
  }
  changePersonalServicio(idRol, dd) {
    console.log(idRol.value);
    this.personalServicioSelected = [];
    this.personalServicioGeneral.forEach((elemento) => {
      if (elemento.idUPS === idRol.value) {
        this.personalServicioSelected.push(elemento);
      }
    });
    this.crearMatriz();
  }
  designar() {
    console.log(this.matriz);
  }
}
