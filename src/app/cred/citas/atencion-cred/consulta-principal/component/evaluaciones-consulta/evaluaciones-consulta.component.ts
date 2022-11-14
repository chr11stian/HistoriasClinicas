import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { MotivosConsultaService } from "../../services/motivos-consulta.service";
import {
  dato,
  motivoConsultaInterface,
  proxCita,
} from "../../../../models/data";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { MenuItem, MessageService } from "primeng/api";
@Component({
  selector: "app-evaluaciones-consulta",
  templateUrl: "./evaluaciones-consulta.component.html",
  styleUrls: ["./evaluaciones-consulta.component.css"],
})
export class EvaluacionesConsultaComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }

 
}
