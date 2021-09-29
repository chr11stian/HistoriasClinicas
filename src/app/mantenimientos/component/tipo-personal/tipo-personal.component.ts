import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { TipoPersonal } from "../../../core/models/mantenimiento.models";
import { PersonalService } from "../../../core/services/personal-services/personal.service";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";
import { TipoPersonalModalComponent } from "../tipo-personal-modal/tipo-personal-modal.component";

@Component({
  selector: "app-tipo-personal",
  templateUrl: "./tipo-personal.component.html",
  styleUrls: ["./tipo-personal.component.css"],
  providers: [DialogService],
})
export class TipoPersonalComponent implements OnInit {
  data: any[] = [];
  isUpdate: boolean = false;

  constructor(
    private tipoPersonalService: TipoPersonalService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.getTipoPersonal();
  }

  getTipoPersonal() {
    this.tipoPersonalService.getTipoPersonal().subscribe((resp: any) => {
      this.data = resp.object;
    });
  }

  agregar() {
    const ref = this.dialogService.open(TipoPersonalModalComponent, {
      header: "Ingrese Tipo de personal",
      width: "60%",
    });
    ref.onClose.subscribe(() => {
      this.messageService.add({ severity: "info", summary: "Car Selected" });
    });
  }

  ngOnInit(): void {}
}
