import { Component, OnInit } from "@angular/core";
import { LocaleSettings } from "primeng/calendar/calendar";
import { delayWhen } from "rxjs/operators";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
import { RolGuardiaService } from "../../services/rol-guardia/rol-guardia.service";
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
  isEditable: boolean;
  turno = [
    {
      nombre: "M",
      abreviatura: "M",
    },
    {
      nombre: "T",
      abreviatura: "T",
    },
    {
      nombre: "M/T",
      abreviatura: "M/T",
    },
    {
      nombre: "GD",
      abreviatura: "GD",
    },
    {
      nombre: "GN",
      abreviatura: "GN",
    },
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
      dni: "11111111",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "medico general",
      dni: "73145986",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "medico general",
      dni: "23232323",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "enfermeria",
      dni: "24242424",
    },
    {
      idUPS: "616602e0034d2c3598133294",
      apellidos: "apellido2",
      nombres: "nombre2",
      especialidad: "enfermeria",
      dni: "12121212",
    },
    {
      idUPS: "61660303034d2c3598133295",
      apellidos: "apellido3",
      nombres: "laura jimena",
      especialidad: "enfermeria",
      dni: "121334412",
    },
    {
      idUPS: "61660303034d2c3598133295",
      apellidos: "apellido3",
      nombres: "juan carlos",
      especialidad: "enfermeria",
      dni: "12121212",
    },
  ];
  fecha = new Date();
  nroDiasMes: number = 0;
  //personales seleccionados y mes actual seleccionado
  personalServicioSelected: any[] = [];
  cabeceraMes: any[] = [];

  constructor(
    private tipoUpsService: TipoUpsService,
    private tipoPersonalService: TipoPersonalService,
    private rolGuardiaService: RolGuardiaService
  ) {
    this.getPersonal();
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    this.isModificable();
  }
  getPersonal() {
    this.tipoPersonalService.getTipoPersonales().subscribe((resp) => {
      let ups = [];
      ups = resp["object"];
      ups.forEach((elemento) => {
        // console.log(elemento["nombre"]);
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
        filaAux.push(
          //primer turno por defecto
          this.turno[0]
        );
      }
      this.matriz.push(filaAux);
    }
  }
  numeroDiasMes() {
    //creamos un nuevo objeto dandole x defecto el ultimo dial del mes
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
  isModificable() {
    let isVisible: boolean;
    let fechaActual = new Date();
    if (
      this.fecha.getFullYear() > fechaActual.getFullYear() ||
      (this.fecha.getFullYear() == fechaActual.getFullYear() &&
        this.fecha.getMonth() >= fechaActual.getMonth())
    ) {
      isVisible = true;
    } else {
      isVisible = false;
    }
    this.isEditable = isVisible;
    console.log("esModficable", isVisible);
  }
  cambiarFecha(fechaseleccionada: Date) {
    this.fecha = fechaseleccionada;
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    this.crearMatriz(); //si cambia fecha
    this.isModificable();
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
  changeTurno(i, j) {
    let diaInput: any = {
      anio: this.fecha.getFullYear(),
      mes: this.fecha.getMonth() + 1,
      dia: j + 1,
      idIpress: "615b30b37194ce03d782561c",
      servicio: "ANESTESIOLOGIA",
      tipoDoc: "DNI",
      nroDoc: this.personalServicioSelected[i]["dni"],
      ambiente: "ACUP 01",
      abreviatura: this.matriz[i][j]["abreviatura"],
    };
    this.rolGuardiaService.AddUpdateRolGuardia(diaInput).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  designar() {
    console.log("corroborar si se asigno para todo el mes");
    // let matrizAux = [];
    // for (let i = 0; i < this.matriz.length; i++) {
    //   let filaAux = [];
    //   for (let j = 0; j < this.matriz[0].length; j++) {
    //     let elemento = this.matriz[i][j];
    //     let elementoAux = {
    //       abreviatura: elemento["abreviatura"],
    //       dia: j + 1,
    //       nroDoc: this.personalServicioSelected[i]["dni"],
    //     };
    //     filaAux.push(elementoAux);
    //   }
    //   matrizAux.push(filaAux);
    // }
  }
  // console.log(matrizAux);

  //insertamos registro por registros
  // for (let x = 0; x < matrizAux.length; x++) {
  //   for (let y = 0; y < matrizAux[0].length; y++) {
  //     let mesInput: any = {
  //       anio: this.fecha.getFullYear(),
  //       mes: this.fecha.getMonth() + 1,
  //       dia: matrizAux[x][y]["dia"],
  //       idIpress: "615b30b37194ce03d782561c",
  //       servicio: "MEDICINA GENERAL",
  //       tipoDoc: "DNI",
  //       nroDoc: matrizAux[x][y]["nroDoc"],
  //       ambiente: "ACUP 01",
  //       abreviatura: matrizAux[x][y]["abreviatura"],
  //     };

  //     // console.log(mesInput);
  //     this.rolGuardiaService.AddUpdateRolGuardia(mesInput).subscribe(
  //       (resp) => {
  //         console.log(resp);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
}
