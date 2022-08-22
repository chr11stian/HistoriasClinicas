import { CuposService } from "./../../../core/services/cupos.service";
import { interconsulta } from "./../models/model";
import { InterconsultaService } from "./../services/interconsulta.service";
import { Component, OnInit } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { ModalCuposComponent } from "../cupos/modal-cupos/modal-cupos.component";

@Component({
  selector: "app-interconsulta",
  templateUrl: "./interconsulta.component.html",
  styleUrls: ["./interconsulta.component.css"],
  providers: [DialogService, DynamicDialogConfig],
})
export class InterconsultaComponent implements OnInit {
  ref: DynamicDialogRef;
  listInterconsulta: interconsulta[] = [];
  constructor(
    private dialog: DialogService,
    private serviceInterconsulta: InterconsultaService,
    private serviceCupos: CuposService
  ) {}

  ngOnInit(): void {
    this.serviceInterconsulta.listInterconsulta().subscribe((r: any) => {
      this.listInterconsulta = r.object;
      console.log(this.listInterconsulta);
    });
  }

  openCupos(data: interconsulta): void {
    this.serviceCupos.data = data;
    this.serviceCupos.modal1 = this.dialog.open(ModalCuposComponent, {
      header: "CUPOS",
      width: "1200px",
      modal: true,
      height: "750px",
      contentStyle: { "max-height": "500", overflow: "auto" },
      baseZIndex: 10000
    });
  }
}
