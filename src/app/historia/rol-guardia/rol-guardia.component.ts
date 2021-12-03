import { Component, OnInit } from "@angular/core";
import { PersonalService } from "src/app/core/services/personal-services/personal.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { DynamicDialogRef } from "primeng/dynamicdialog";
@Component({
  selector: "app-rol-guardia",
  templateUrl: "./rol-guardia.component.html",
  styleUrls: ["./rol-guardia.component.css"],
})
export class RolGuardiaComponent implements OnInit {
  isMesPasado: boolean = false;
  idIpressZarzuela = "616de45e0273042236434b51";//la posta medica x defecto
  loading: boolean = true;
  loadingUps: boolean = true;
  listaTurno: any[] = [];
  listaUps: any[] = [];
  upsSeleccionada = "";
  listaPersonal: any[] = [];
  isUpdatePersonal: any[] = [];
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef
  ) {
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    // this.isModificable();

    this.getListaUps();
    this.getListaTurno();
  }
  ngOnInit(): void {}
  getListaTurno() {
    this.rolGuardiaService
      .getTurnosPorIpress(this.idIpressZarzuela)
      .subscribe((resp) => {
        resp["object"].forEach((turno) => {
          delete turno.horaInicio;
          delete turno.horaFin;
        });
        this.listaTurno = resp["object"];
        this.loadingUps = false;
      });
  }
  getListaUps() {
    this.rolGuardiaService
      .getServiciosPorIpress(this.idIpressZarzuela)
      .subscribe((resp) => {
        this.listaUps = resp["object"];
        this.loading = false;
      });
  }
  crearMatriz() {
    this.matriz = [];
    for (let i = 0; i < this.listaPersonal.length; i++) {
      let filaAux = [];
      for (let j = 0; j < this.nroDiasMes; j++) {
        let turnoDefecto = {
          dia: j + 1,
          nombre: "Libre",
          abreviatura: "L",
          nroHoras: 0,
        };
        filaAux.push(turnoDefecto);
      }
      this.matriz.push(filaAux);
    }

    // this.recuperarMes();
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
  crearMatriz2() {
    this.matriz = [];
    for (let i = 0; i < this.listaPersonal.length; i++) {
      let requestInput: any = {
        anio: this.fecha.getFullYear(),
        mes: this.fecha.getMonth() + 1,
        idIpress: this.idIpressZarzuela,
        servicio: this.upsSeleccionada["nombreUPS"],
        tipoDoc: this.listaPersonal[i]["tipoDoc"],
        nroDoc: this.listaPersonal[i]["nroDoc"],
      };
      this.rolGuardiaService.getRolGuardiaPorPersona(requestInput).subscribe(
        (resp) => {
          if (resp["cod"] == "2002") {
            this.matriz.push(resp["object"][0]["turnos"]);
          } else {
            let filaAux = [];
            for (let j = 0; j < this.nroDiasMes; j++) {
              filaAux.push(this.listaTurno[0]);
            }
            this.matriz.push(filaAux);
          }
          console.log(resp);
        },
        (error) => {
          console.log("error del servidor");
        }
      );
    }
  }

  // isModificable() {
  //   let isVisible: boolean;
  //   let fechaActual = new Date();
  //   if (
  //     this.fecha.getFullYear() > fechaActual.getFullYear() ||
  //     (this.fecha.getFullYear() == fechaActual.getFullYear() &&
  //       this.fecha.getMonth() >= fechaActual.getMonth())
  //   ) {
  //     isVisible = true;
  //   } else {
  //     isVisible = false;
  //   }
  //   this.isMesPasado = isVisible;
  //   //console.log("esModficable", isVisible);
  // }
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
    // this.isModificable();
  }
  IniciarHoras() {
    this.listaHoras = [];
    for (let i = 0; i < this.listaPersonal.length; i++) {
      this.listaHoras.push(0);
    }
  }

  changeUps(codUps) {
    let requestInput: any = {
      anio: this.fecha.getFullYear(),
      mes: this.fecha.getMonth() + 1,
      idIpress: this.idIpressZarzuela,
      servicio: this.upsSeleccionada["nombreUPS"],
    };
    this.rolGuardiaService.getRolGuardiaPorServicio(requestInput).subscribe(
      (resp: any) => {
        if (resp["cod"] === "2002") {
          this.listaPersonal = [];
          this.matriz = [];
          let lista = resp["object"];
          lista.forEach((element) => {
            this.listaPersonal.push(element.personal);
            this.matriz.push(element.turnos);
          });
          this.IniciarHoras();
          this.calcularNroHorasGeneral();
          this.confirmationService.confirm({
            message:
              "Ya existe una asignacion de guardia para este mes ,desea modificar? ",
            accept: () => {
              this.isEditable = true;
            },
            reject: () => {
              this.isEditable = false;
            },
            key: "positionDialog",
          });
        } else {
          this.messageService.add({
            severity: "info",
            summary: "Agregar",
            detail: "Ingrese rol para para el presente mes",
            key: "toast1",
          });
          let ipressUpsInput: any = {
            codUps: codUps.value.id,
            idIpress: this.idIpressZarzuela,
          };
          this.listaPersonal = [];
          this.personalService
            .getPorIpressUps(ipressUpsInput)
            .subscribe((resp: any) => {
              this.listaPersonal = resp["object"];
              this.crearMatriz();
              this.IniciarHoras();
              this.calcularNroHorasGeneral();
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );

    // let ipressUpsInput: any = {
    //   codUps: codUps.value.id,
    //   idIpress: this.idIpressZarzuela,
    // };
    // this.listaPersonal = [];
    // this.personalService.getPorIpressUps(ipressUpsInput).subscribe(
    //   (resp: any) => {
    //     this.listaPersonal = resp["object"];
    //     this.crearMatriz();
    //     this.IniciarHoras();
    //     this.calcularNroHorasGeneral();
    //     // this.loading = false;
    //   },
    //   (error) => {
    //     console.log("error al recuperar personal", error);
    //   }
    // );
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
    let isLast = false;
    for (let i = 0; i < this.matriz.length; i++) {
      let mesInput: any = {
        anio: this.fecha.getFullYear(),
        mes: this.fecha.getMonth() +   1,
        ambiente: "medicina01",
        ipress: {
          idIpress: "616de45e0273042236434b51",
          nombre: "la posta medica",
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
          if (i + 1 == this.matriz.length) {
            console.log(resp)
            this.messageService.add({
              severity: "success",
              summary: "Modificar",
              detail: "Se asigno rol para dicho mes",
              key: "toast2",
            });
          }
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
  close() {
    console.log(this.matriz);
    // this.ref.close("cerrado");
  }
}
