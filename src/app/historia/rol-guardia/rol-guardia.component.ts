import {Component, OnInit} from "@angular/core";
import {PersonalService} from "src/app/core/services/personal-services/personal.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RolGuardiaService} from "src/app/core/services/rol-guardia/rol-guardia.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: "app-rol-guardia",
  templateUrl: "./rol-guardia.component.html",
  styleUrls: ["./rol-guardia.component.css"],
})
export class RolGuardiaComponent implements OnInit {
  meses = [
    {mesNro: 1, mes: 'ENERO'},
    {mesNro: 2, mes: 'FEBRERO'},
    {mesNro: 3, mes: 'MARZO'},
    {mesNro: 4, mes: 'ABRIL'},
    {mesNro: 5, mes: 'MAYO'},
    {mesNro: 6, mes: 'JUNIO'},
    {mesNro: 7, mes: 'JULIO'},
    {mesNro: 8, mes: 'AGOSTO'},
    {mesNro: 9, mes: 'SETIEMBRE'},
    {mesNro: 10, mes: 'OCTUBRE'},
    {mesNro: 11, mes: 'NOVIEMBRE'},
    {mesNro: 12, mes: 'DICIEMBRE'}
  ]
  // buscarSSAlarma(lista,nombre){
  //   const found = lista.find(element => element.nombre  == nombre);
  //   return found.valor;
  // }
  mesLetras() {
    const a = this.fecha.getMonth() + 1;
    const aux = this.meses.find(fila => fila.mesNro === a)
    return aux.mes;
  }

  isMesPasado: boolean = false;
  idIpressZarzuela = "616de45e0273042236434b51";//la posta medica x defecto
  loading: boolean = true;
  loadingUps: boolean = true;
  listaTurno: any[] = [];
  listaAmbiente:any[]=[];
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

    //public ref: DynamicDialogRef
  ) {
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();
    // this.isModificable();

    this.getListaUps();
    this.getListaTurno();
    this.getListaAmbiente()
  }

  ngOnInit(): void {
  }

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
  getListaAmbiente() {
   this.listaAmbiente=[
     {codigo:'001',nombreAmbiente:'medicina01'},
     {codigo:'002',nombreAmbiente:'medicina02'},
     {codigo:'003',nombreAmbiente:'acupuntura01'},
     {codigo:'cod123',nombreAmbiente:'ambiente123'},
     {codigo:'005',nombreAmbiente:'OBSTETRICIA2'},
   ]
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
    // for (let i = 0; i < this.listaPersonal.length; i++) {
    this.listaPersonal.forEach((item)=>{
      let filaAux = [];
      for (let j = 0; j < this.nroDiasMes; j++) {
        let turnoDefecto = {
          dia: j + 1,
          nombre: "LIBRE",
          abreviatura: "L",
          nroHoras: 0,
        };
        filaAux.push(turnoDefecto);
      }
      this.matriz.push(filaAux);
    })
    console.log('change ups evento:', this.matriz)
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
        this.cabeceraMes.push({abreviatura: "D", label: "Domingo", dia: i});
      else if (dia == 1)
        this.cabeceraMes.push({abreviatura: "L", label: "Lunes", dia: i});
      else if (dia == 2)
        this.cabeceraMes.push({abreviatura: "M", label: "Martes", dia: i});
      else if (dia == 3)
        this.cabeceraMes.push({abreviatura: "M", label: "Miercoles", dia: i,});
      else if (dia == 4)
        this.cabeceraMes.push({abreviatura: "J", label: "Jueves", dia: i});
      else if (dia == 5)
        this.cabeceraMes.push({abreviatura: "V", label: "Viernes", dia: i});
      else
        this.cabeceraMes.push({abreviatura: "S", label: "Sabado", dia: i});
    }
  }

  colorearCabecera() {
    let colorR = "color:#BF0D21";
    let colorB = "color:#757476";
    let hasColor = true; //primera semana en pintar rojo
    this.cabeceraMes.forEach((day) => {
      if (hasColor) {
        day.bg = colorR;
        if (day.abreviatura === "S") {
          hasColor = !hasColor;
        }
      } else {
        day.bg = colorB;
        if (day.abreviatura === "S") {
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
  fechaAA=new Date()
  fechaAdelante(){
    console.log(this.fechaAA)

  }
  fechaAtras(){

  }
  isAdelante:boolean
  cambiarFecha() {
    //agregando
    if(this.isAdelante){
      console.log(this.fecha)
      this.fecha=new Date(this.fecha.setMonth(this.fecha.getMonth()+1))
      console.log(this.fecha)
    }
    else{
      this.fecha=new Date(this.fecha.setMonth(this.fecha.getMonth()-1))
    }
    //agregando
    this.upsSeleccionada = "";
    // this.fecha = fechaseleccionada;
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

  // changeUps1(codUps) {
  //   let requestInput: any = {
  //     anio: this.fecha.getFullYear(),
  //     mes: this.fecha.getMonth() + 1,
  //     idIpress: this.idIpressZarzuela,
  //     servicio: this.upsSeleccionada["nombreUPS"],
  //   };
  //   let listaPersonalAR=[];
  //   let listaPersonal=[]
  //   this.rolGuardiaService.getRolGuardiaPorServicio(requestInput).subscribe((resp1: any) => {
  //
  //     if(resp1["cod"] === "2002") {
  //       const listaAux=resp1['object']
  //       listaAux.forEach((element) => {
  //         let persona =element.personal
  //         listaPersonalAR.push({
  //           nroDoc:persona.nroDoc,
  //           tipoDoc:persona.tipoDoc,
  //           nombreCompleto:persona.nombre
  //         });
  //       });
  //     }
  //     let ipressUpsInput: any = {
  //       codUps: codUps.value.id,
  //       idIpress: this.idIpressZarzuela,
  //     };
  //     this.personalService.getPorIpressUps(ipressUpsInput).subscribe((resp: any) => {
  //       console.log(resp)
  //       if(resp["cod"] === "2401") {
  //         const listaAux2=resp['object']
  //         listaAux2.forEach((elemento)=>{
  //           listaPersonal.push({
  //             nroDoc:elemento.nroDoc,
  //             tipoDoc:elemento.tipoDoc,
  //             nombreCompleto:`${elemento.apePaterno} ${elemento.apeMaterno} ${elemento.primerNombre}`
  //             })
  //           });
  //       }
  //       });
  //     //hacemos la intersepcion
  //     // let arrayC = [...listaPersonalAR,...listaPersonal];
  //     // console.log('listaARol------>',listaPersonalAR)
  //     // console.log('listaPersonal------>',listaPersonal)
  //     let arrayC=this.union(listaPersonalAR,listaPersonal);
  //     console.log('UNi',arrayC)
  //     }
  //   );
  // }
  union(arr1, arr2) {
    let arrRespuesta = arr1
    console.log('arreglo respuesta parcial', arrRespuesta)
    arr2.forEach((elemento) => {
      const found = arr1.find(element => element.nroDoc == elemento.nroDoc);
      if (!found) {
        arrRespuesta.push(found)
      }
    });
    return arrRespuesta
  }

  changeUps1(codUps) {
    let ipressUpsInput: any = {
      codUps: codUps.value.id,
      idIpress: this.idIpressZarzuela,
    };
    this.isSelected=false;
    this.listaPersonal = [];
    this.listaHoras=[];
    this.personalService.getPorIpressUps(ipressUpsInput).subscribe((resp: any) => {
      let requestInput: any = {
        anio: this.fecha.getFullYear(),
        mes: this.fecha.getMonth() + 1,
        idIpress: this.idIpressZarzuela,
        servicio: this.upsSeleccionada["nombreUPS"],
      };
      this.rolGuardiaService.getRolGuardiaPorServicio(requestInput).subscribe((resp1) => {
        if (resp["cod"] === "2401") {
          const listaAux2 = resp['object']
          listaAux2.forEach((elemento) => {
            this.listaPersonal.push({
              nroDoc: elemento.nroDoc,
              tipoDoc: elemento.tipoDoc,
              nombreCompleto: `${elemento.apePaterno} ${elemento.apeMaterno} ${elemento.primerNombre}`
            })
          });
        }
        let listaRol=[]
        if (resp1["cod"] === "2002") {
          const listaAux = resp1['object']
          listaAux.forEach((element) => {
            let rolNecesario = element.personal
            listaRol.push({
              nroDoc: rolNecesario.nroDoc,
              tipoDoc: rolNecesario.tipoDoc,
              nombreCompleto: rolNecesario.nombre,
              rol:element.turnos
            });
          });
        }
        //toda la logica
        this.crearMatriz()
        //reescribimos lo necesario
        this.listaPersonal.forEach((personal,index)=>{
          // console.log(element)
           listaRol.forEach((personalWithRol)=>{
             if(personal.nroDoc==personalWithRol.nroDoc){
               this.matriz[index]=personalWithRol['rol']
             }
           })
        })
        this.calcularNroHorasGeneral();
        console.log('exito')
        // console.log('todo1 el personal',this.listaPersonal)
        // console.log('solo personal con rol',listaRol)
        //toda la logica
      });

    });


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
    console.log('mostramos matriz',this.matriz)
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

  designar1() {
    // validaciones
    console.log('-->',this.validarHoras(),this.listaHoras)
    if (this.validarHoras()) {
      let isLast = false;
      for (let i = 0; i < this.matriz.length; i++) {
        let mesInput: any = {
          anio: this.fecha.getFullYear(),
          mes: this.fecha.getMonth() + 1,
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
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "denegado",
        detail: "El personal de salud no cumple con el minimo de las 150 horas",
      });
    }

  }
  designar() {


    this.confirmationService.confirm({
      header: "Confirmación",
      message: `Estas seguro que deseas asignar rol para el personal ${this.listaPersonal[this.indexSelected]['nombreCompleto']},con un total de ${this.listaHoras[this.indexSelected]} horas `,
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      key:"positionDialog",
      accept: () => {
        if (this.validarHoras()) {
          let mesInput: any = {
            anio: this.fecha.getFullYear(),
            mes: this.fecha.getMonth() + 1,
            ambiente: "medicina01",
            ipress: {
              idIpress: "616de45e0273042236434b51",
              nombre: "la posta medica",
              servicio: this.upsSeleccionada["nombreUPS"],
            },
            personal: {
              tipoDoc: this.listaPersonal[this.indexSelected]["tipoDoc"],
              nroDoc: this.listaPersonal[this.indexSelected]["nroDoc"],
            },
            turnos: this.construirFilaDelDia(this.indexSelected),
          };
          this.rolGuardiaService.AddRolGuardia(mesInput).subscribe(
            (resp) => {
              this.messageService.add({
                severity: "success",
                summary: "Modificar",
                detail: `Se asigno rol 
                para el personal ${this.listaPersonal[this.indexSelected]['nombreCompleto']} `,
                key: "toast2",
              });

            },
            (error) => {
              console.log(error);
            }
          );

        } else {
          this.messageService.add({
            severity: "warn",
            summary: "denegado",
            detail: `el personal ${this.listaPersonal[this.indexSelected]['nombreCompleto']} no cumple con las 150 horas requeridas`
          });
        }

      },
      reject: () => {
        this.messageService.add({
          severity: "warn",
          summary: "denegado",
          detail: `no se asigno rol a dicho personal`
        });
      },
    });





  }

  validarHoras1() {
    let isValid = true;
    for (let i = 0; i < this.listaHoras.length; i++) {
      if (this.listaHoras[i] <= 150) {
        isValid = false;
      }
    }
    return isValid;
  }
  validarHoras() {
      if (this.listaHoras[this.indexSelected] < 150) {
        return false;
      }
      else
        return true
  }

  close() {
    console.log(this.matriz);
    // this.ref.close("cerrado");
    // this.changeUps1('300101')
  }
  isSelected:boolean=false;
  indexSelected:number;
  modal(rowData,index){
    this.isSelected=true;
    this.indexSelected=index

  }

}
