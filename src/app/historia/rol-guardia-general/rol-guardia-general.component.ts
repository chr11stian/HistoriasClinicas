import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { RolGuardiaComponent } from "../rol-guardia/rol-guardia.component";

@Component({
  selector: "app-rol-guardia-general",
  templateUrl: "./rol-guardia-general.component.html",
  styleUrls: ["./rol-guardia-general.component.css"],
})
export class RolGuardiaGeneralComponent implements OnInit {
  display:boolean=false;
  constructor() {}

  ngOnInit(): void {}
  openModal() {
    this.display=true;

    // const ref = this.dialogService.open(RolGuardiaComponent, {
    //   header: "ASIGNAR ROL DE GUARDIAS AL PERSONAL DE SALUD",
    //   width: "95%",
    //   contentStyle: {
    //     // "max-height": "500px",
    //     // 'overflow':'visible'
    //   },
    //   // baseZIndex: 10000,
    // });

    // ref.onClose.subscribe((car: Car) => {
    //     if (car) {
    //         this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
    //     }
    // });
  }
}
