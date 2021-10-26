import { Component, OnInit } from "@angular/core";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
import { RolGuardiaService } from "../../services/rol-guardia/rol-guardia.service";
import { TipoUpsService } from "../../services/tipo-ups.service";
import { PersonalService } from "src/app/core/services/personal-services/personal.service";
import { ConfirmationService, MessageService } from "primeng/api";
@Component({
  selector: "app-rol-guardia",
  templateUrl: "./rol-guardia.component.html",
  styleUrls: ["./rol-guardia.component.css"],
})
export class RolGuardiaComponent implements OnInit {
  idIpressZarzuela = "615b30b37194ce03d782561c";

  listaTurno: any[] = [];
  listaUps: any[] = [];
  upsSeleccionada = "";
  listaPersonal: any[] = [];
  listaIsUpdate: any[] = [];
  listaHoras: any[] = [];

  matriz: any = [];
  isEditable: boolean;
  turnos: any[];
  fecha = new Date();
  nroDiasMes: number = 0;
  //personales seleccionados y mes actual seleccionado
  cabeceraMes: any[] = [];
  constructor(
    private rolGuardiaService: RolGuardiaService,
    private personalService: PersonalService,
    private messageService: MessageService
  ) {
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    this.isModificable();

    this.getListaUps();
    this.getListaTurno();
  }
  ngOnInit(): void {}
  getListaTurno() {
    this.listaTurno = [
      {
        nombre: "mañana",
        abreviatura: "M",
        nroHoras: 6,
        horaInicio: "06:00:00",
        horaFin: "12:00:00",
      },
      {
        nombre: "Tarde",
        abreviatura: "T",
        nroHoras: 6,
        horaInicio: "06:00:00",
        horaFin: "12:00:00",
      },
      {
        nombre: "Guardia Diurna",
        abreviatura: "GD",
        nroHoras: 12,
        horaInicio: "06:00:00",
        horaFin: "06:00:00",
      },
      {
        nombre: "Onomastico",
        abreviatura: "O",
        nroHoras: 6,
        horaInicio: "07:00:00",
        horaFin: "13:00:00",
      },
      {
        nombre: "Feriado",
        abreviatura: "F",
        nroHoras: 6,
        horaInicio: "07:00:00",
        horaFin: "13:00:00",
      },
      {
        nombre: "Guardia Nocturna",
        abreviatura: "GN",
        nroHoras: 12,
        horaInicio: "19:00:00",
        horaFin: "07:00:00",
      },
      {
        nombre: "Noche",
        abreviatura: "N",
        nroHoras: 6,
        horaInicio: "19:00:00",
        horaFin: "00:00:00",
      },
      {
        nombre: "libre",
        abreviatura: "L",
        nroHoras: 6,
        horaInicio: "07:00:00",
        horaFin: "13:00:00",
      },
    ];
  }
  getListaUps() {
    this.listaUps = [
      {
        idUPS: "614df97ec154c61d18f7e1cf",
        nombreUPS: "ACUPUNTURA Y AAAAAAFINES",
        codUps: "206908",
      },
      {
        idUPS: "616db2ba411be85a72efb63a",
        nombreUPS: "MEDICINA GENERAL",
        codUps: "302303",
      },
      {
        idUPS: "61702630ee9d444b4994ac3c",
        nombreUPS: "ANESTESIOLOGIA",
        codUps: "300101",
      },
    ];
  }
  crearMatriz() {
    this.matriz = [];
    for (let i = 0; i < this.listaPersonal.length; i++) {
      let filaAux = [];
      for (let j = 0; j < this.nroDiasMes; j++) {
        filaAux.push(
          //turno libre x defecto
          this.listaTurno[7]
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
  // recuperarMes() {
  //   let matrizAux = [];
  //   for (let i = 0; i < this.listaPersonal.length; i++) {
  //     let requestInput: any = {
  //       anio: this.fecha.getFullYear(),
  //       mes: this.fecha.getMonth() + 1,
  //       idIpress: "615b30b37194ce03d782561c",
  //       servicio: this.upsSeleccionada["nombreUPS"],
  //       nroDoc: this.listaPersonal[i]["nroDoc"],
  //     };
  //     let filaAux = [];
  //     this.personalService.getPorPersonal(requestInput).suscribe((resp) => {
  //       filaAux = resp["object"];
  //       matrizAux.push(filaAux),
  //         (error) => {
  //           let filaAux = [];
  //           for (let j = 0; j < this.nroDiasMes; j++) {
  //             filaAux.push(this.listaTurno[7]);
  //           }
  //         };
  //     });
  //   }
  // }

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
    //console.log("esModficable", isVisible);
  }
  cambiarFecha(fechaseleccionada: Date) {
    this.upsSeleccionada = "";
    this.fecha = fechaseleccionada;
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    this.listaPersonal = [];
    this.matriz = [];
    //this.crearMatriz(); //si cambia fecha
    //this.IniciarHoras();
    this.isModificable();
  }
  IniciarHoras() {
    this.listaHoras = [];
    for (let i = 0; i < this.listaPersonal.length; i++) {
      this.listaHoras.push(0);
    }
  }

  changeUps(codUps, dd) {
    //console.log(codUps);

    let ipressUpsInput: any = {
      codUps: codUps.value.codUps,
      idIpress: this.idIpressZarzuela,
    };
    this.listaPersonal = [];
    this.personalService.getPorIpressUps(ipressUpsInput).subscribe(
      (resp: any) => {
        this.listaPersonal = resp["object"];
        this.IniciarHoras();
        this.crearMatriz();
        this.calcularNroHorasGeneral();
      },
      (error) => {
        console.log("negativa", error);
      }
    );
  }
  calcularNroHorasGeneral() {
    for (let i = 0; i < this.matriz.length; i++) {
      let contadorAuxiliar = 0;
      for (let j = 0; j < this.matriz[0].length; j++) {
        contadorAuxiliar += this.matriz[i][j]["nroHoras"];
        this.listaHoras[i] = contadorAuxiliar;
      }
    }
  }
  recalcularxFila(nroFila: number) {
    let nroHoras = 0;
    for (let j = 0; j < this.matriz[0].length; j++) {
      nroHoras = nroHoras + this.matriz[nroFila][j]["nroHoras"];
    }
    this.listaHoras[nroFila] = nroHoras;
  }
  changeTurno(i, j) {
    this.recalcularxFila(i);
    // let diaInput: any = {
    //   anio: this.fecha.getFullYear(),
    //   mes: this.fecha.getMonth() + 1,
    //   dia: j + 1,
    //   idIpress: "615b30b37194ce03d782561c",
    //   servicio: this.upsSeleccionada["nombreUPS"],
    //   tipoDoc: "DNI",
    //   nroDoc: this.listaPersonal[i]["nroDoc"],
    //   ambiente: "MEDICINA 1xx",
    //   abreviatura: this.matriz[i][j]["abreviatura"],
    // };
    //sumamos las horas
    // this.listaHoras[i] = this.listaHoras[i] + this.matriz[i][j]["nroHoras"];
    //console.log(diaInput);
    // this.rolGuardiaService.AddUpdateRolGuardia(diaInput).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //this.matriz[i][j]["selected"] = true;
    //this.listaHoras[i] = this.calcularNroHoras(i);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  construirFilaDelDia(fila) {
    let listaTurno = [];
    for (let j = 0; j < this.matriz[0].length; j++) {
      let dia = {
        dia: j + 1,
        abreviatura: this.matriz[fila][j]["abreviatura"],
      };
      listaTurno.push(dia);
    }
    return listaTurno;
  }

  designar() {
    //validaciones
    // if (this.validarHoras()) {
    // } else {
    //   this.messageService.add({
    //     severity: "warn",
    //     summary: "denegado",
    //     detail: "los n no se agregaron ",
    //   });
    // }
    for (let i = 0; i < this.matriz.length; i++) {
      let mesInput: any = {
        anio: this.fecha.getFullYear(),
        mes: this.fecha.getMonth() + 1,
        ambiente: "MEDICINA 2",
        ipress: {
          idIpress: "615b30b37194ce03d782561c",
          nombre: "Zarzuela Baja",
          servicio: this.upsSeleccionada["nombreUPS"],
        },
        personal: {
          tipoDoc: this.listaPersonal[i]["tipoDoc"],
          nroDoc: this.listaPersonal[i]["nroDoc"],
        },
        turnos: this.construirFilaDelDia(i),
      };
      //console.log(mesInput);
      this.rolGuardiaService.AddRolGuardia(mesInput).subscribe(
        (resp) => {
          console.log("se agrego satisfactoriamente");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  validarHoras() {
    let isValid = true;
    for (let i = 0; i < this.listaHoras.length; i++) {
      if (this.listaHoras[i] != 252) {
        isValid = false;
      }
    }
    return isValid;
  }
}
