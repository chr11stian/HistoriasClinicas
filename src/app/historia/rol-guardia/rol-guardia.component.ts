import {Component, OnInit} from "@angular/core";
import {PersonalService} from "src/app/core/services/personal-services/personal.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RolGuardiaService} from "src/app/core/services/rol-guardia/rol-guardia.service";
@Component({
  selector: "app-rol-guardia",
  templateUrl: "./rol-guardia.component.html",
  styleUrls: ["./rol-guardia.component.css"],
})
export class RolGuardiaComponent implements OnInit {
  listaPersonalEstado:personalEstado[]=[
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:true},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:false},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:false},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:false},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:false},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:false},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:true},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:true},
    {nroDni:'2564585',apellidos:'huaman vargas',nombres:'jose',servicio:'medicina general',estado:true},
  ]
  //para el modal
  displayAsignado:boolean=false
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
  openModal(){
    this.displayAsignado=true;
  }
  fecha = new Date();
    idIpressZarzuela = "616de45e0273042236434b51";//la posta medica x defecto
  loading: boolean = true;
  loadingUps: boolean = true;
  listaTurno: any[] = [];
  listaAmbiente:any[]=[];
  listaAmbienteXipres:any[]=[]
  listaUps: any[] = [];
  upsSeleccionada = "";
  listaPersonal: any[] = [];
  listaHoras: any[] = [];
  matriz: any = [];
  isEditable: boolean;
  turnos: any[];
  nroDiasMes: number = 0;
  //personales seleccionados y mes actual seleccionado
  cabeceraMes: any[] = [];
  fecha1=new Date()
  isAdelante:boolean
  isAdelante1:boolean
  constructor(
    private rolGuardiaService: RolGuardiaService,
    private personalService: PersonalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){
    this.numeroDiasMes();
    this.generarCabecera();
    this.colorearCabecera();

    this.getListaUpsXipress();
    this.getListaTurnoXipress();
    this.getListaAmbienteXipress()
  }
  ngOnInit(): void {
  }
  mesLetras() {
    const a = this.fecha.getMonth() + 1;
    const aux = this.meses.find(fila => fila.mesNro === a)
    return aux.mes;
  }
  mesLetras1() {
    const a = this.fecha1.getMonth() + 1;
    const aux = this.meses.find(fila => fila.mesNro === a)
    return aux.mes;
  }
  getPrimeraPantalla(){
    const inputRequest={
      anio:this.fecha1.getFullYear(),
      mes:this.fecha1.getMonth()+1,
    }
    this.rolGuardiaService.getListaPrimeraPantalla(this.idIpressZarzuela,inputRequest).subscribe((resp)=>{
      this.listaPersonalEstado=resp['object']
    })
  }
  getListaTurnoXipress() {
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
  getListaAmbienteXipress() {
    const inputRequest={
      idIpress:this.idIpressZarzuela
    }
    this.rolGuardiaService.getAmbientesPorIpres(inputRequest).subscribe((resp)=>{
      console.log('lista de ambientes',resp['object'])
      this.listaAmbienteXipres=resp['object']
      this.loadingUps = false;
    })
  }
  getListaUpsXipress() {
    this.rolGuardiaService
      .getServiciosPorIpress(this.idIpressZarzuela)
      .subscribe((resp) => {
        this.listaUps = resp["object"];
        this.loading = false;
      });
  }
  crearMatriz() {
    this.matriz = [];
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
  cambiarFecha1() {
    if(this.isAdelante1){
      console.log(this.fecha)
      this.fecha1=new Date(this.fecha1.setMonth(this.fecha1.getMonth()+1))
      console.log(this.fecha)
    }
    else{
      this.fecha1=new Date(this.fecha1.setMonth(this.fecha1.getMonth()-1))
    }
  }
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
  changeUps1(codUps) {
    let ipressUpsInput: any = {
      codUps: codUps.value.id,
      idIpress: this.idIpressZarzuela,
    };
    this.isSelected=false;
    this.listaPersonal = [];
    this.listaAmbiente=[];
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
            });
            this.listaAmbiente.push('ambiente123')//->ambiente x defecto
          });
        }
        let listaRol=[]
        let listaAmbienteAux=[]
        if (resp1["cod"] === "2002") {
          const listaAux = resp1['object']
          listaAux.forEach((element) => {
            let rolNecesario = element.personal
            let ambienteNecesario=element.ambiente
            listaRol.push({
              nroDoc: rolNecesario.nroDoc,
              tipoDoc: rolNecesario.tipoDoc,
              nombreCompleto: rolNecesario.nombre,
              rol:element.turnos,
              ambiente:element.ambiente
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
               this.listaAmbiente[index]=personalWithRol['ambiente']
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
            ambiente: this.listaAmbiente[this.indexSelected],
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
  validarHoras() {
      if (this.listaHoras[this.indexSelected] < 150) {
        return false;
      }
      else
        return true
  }

  close() {
    this.displayAsignado=false;
  }
  isSelected:boolean=false;
  indexSelected:number;
  modal(rowData,index){
    this.isSelected=true;
    this.indexSelected=index
  }
}
interface personalEstado{
  nroDni:string,
  apellidos:string,
  nombres:string,
  servicio:string,
  estado:boolean
}
