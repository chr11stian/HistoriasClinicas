import { Component, OnInit } from "@angular/core";
import { PnGestanteDialogComponent } from "../pn-gestante-dialog/pn-gestante-dialog.component";
import { PnGestanteService } from "../../services/pn-gestante.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { FormBuilder } from "@angular/forms";
import { PnGestanteDiaGestaComponent } from "../pn-gestante-dia-gesta/pn-gestante-dia-gesta.component";
import { PnGestanteDiaCambioComponent } from "../pn-gestante-dia-cambio/pn-gestante-dia-cambio.component";
import { PnDialogGestaComponent } from '../pn-dialog-gesta/pn-dialog-gesta.component';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-pn-gestante",
  templateUrl: "./pn-gestante.component.html",
  styleUrls: ["./pn-gestante.component.css"],
})
export class PnGestanteComponent implements OnInit {
  updated: boolean = false;
  listaGestantes: any[] = [];
  listaGestantesPuerpera: any[] = [];
  estado: any;
  ref: DynamicDialogRef;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private pn_gestanteServicio: PnGestanteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.mostrarPadronNominalGestantes();
  }

  mostrarPadronNominalGestantes() {
    this.pn_gestanteServicio.couch = true;
    this.pn_gestanteServicio.mostrarPadronGestantes(this.pn_gestanteServicio.getauxCodeessActual()).subscribe(
      (data:any) => {
        this.listaGestantes = data['rows'];
        console.log("gestantessss",this.listaGestantes);
        this.listaGestantesPuerpera = this.listaGestantes.filter((aux) => {
          if (this.semanaGestacional(this.formatoFecha(aux.value.fur))<44 && aux.value.aborto==false) return aux;
        });
      },
      (err) => {
        this.listaGestantes = [];
      }
    );
  }

  openDialog() {
    const ref = this.dialog.open(PnGestanteDialogComponent, {
      header: "AGREGAR NUEVA GESTANTE",
      width: "80%",
      height: "65%",
    });
    localStorage.removeItem("gestanteLocalStorage");
    this.ref.onClose.subscribe((data: any) => {
      this.mostrarPadronNominalGestantes();
    });
  }

  openDialogNuevaGesta() {
    const ref = this.dialog.open(PnGestanteDiaGestaComponent, {
      header: "AGREGAR NUEVA GESTA",
      width: "80%",
      height: "65%",
    });
    localStorage.removeItem("gestanteLocalStorage");
    this.ref.onClose.subscribe((data: any) => {
    this.mostrarPadronNominalGestantes();
    });
  }

  openDialogCambioEESS() {
    const ref = this.dialog.open(PnGestanteDiaCambioComponent, {
      header: "CAMBIO DE EESS DE LA GESTANTE",
      width: "70%",
      height: "50%",
    });
    localStorage.removeItem("gestanteLocalStorage");
    this.ref.onClose.subscribe((data: any) => {
    this.mostrarPadronNominalGestantes();
    });
  }

  editar(event) {
    localStorage.setItem("gestanteLocalStorage", JSON.stringify(event['value']));
    this.ref = this.dialog.open(PnGestanteDialogComponent, {
      header: "MODIFICAR LOS DATOS DE LA GESTANTE",
      width: "80%",
      height: "70%",
    });
    this.ref.onClose.subscribe((data: any) => {
    this.mostrarPadronNominalGestantes();
    });
  }
  
  semanaGestacional(date: string) {
    let today = new Date().getTime();
    let auxFUR = new Date(date).getTime();
    auxFUR = auxFUR + 0;
    let auxWeek = today - auxFUR;
    let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
    let semanas=Math.trunc(edadGestacional / 7);
    return semanas;
  }

mostrar(data:any []){
    this.ref = this.dialog.open(PnDialogGestaComponent, {
      header: "HISTORIAL DE GESTAS",
      width: "80%",
      height: "70%",
      // contentStyle: {
      //   "max-height": "93%",
      //   overflow: "auto",
      // },
      data:data,
    });
}

formatoFecha(date:string){
  let fum: any =date.split("/");
  let newDay: any = fum[0];
  let newMonth: any =fum[1];
  let newYear: any = fum[2];

  let auxBirth = newYear + '/' + newMonth + '/' + newDay ;
  return auxBirth;
  // this.formGestante.get('fpp').setValue(this.datePipe.transform(auxBirth,'yyyy-MM-dd'));
}
}
