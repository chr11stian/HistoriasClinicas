import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { RolGuardiaComponent } from "../rol-guardia/rol-guardia.component";

@Component({
  selector: "app-rol-guardia-general",
  templateUrl: "./rol-guardia-general.component.html",
  styleUrls: ["./rol-guardia-general.component.css"],
  providers: [DialogService],
})
export class RolGuardiaGeneralComponent implements OnInit {
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}
  openModal() {
    const ref = this.dialogService.open(RolGuardiaComponent, {
      header: "ASIGNAR ROL DE GUARDIAS AL PERSONAL DE SALUD",
      width: "95%",
      contentStyle: {
        "max-height": "500px",
        overflow: "auto",
      },
      baseZIndex: 10000,
    });

    // ref.onClose.subscribe((car: Car) => {
    //     if (car) {
    //         this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
    //     }
    // });
  }
}
