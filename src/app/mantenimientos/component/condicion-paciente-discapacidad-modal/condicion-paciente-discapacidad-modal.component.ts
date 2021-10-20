import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { CondicionPacienteDiscapacidadService } from "../../services/condicion-paciente-discapacidad/condicion-paciente-discapacidad.service";

@Component({
  selector: "app-condicion-paciente-discapacidad-modal",
  templateUrl: "./condicion-paciente-discapacidad-modal.component.html",
  styleUrls: ["./condicion-paciente-discapacidad-modal.component.css"],
})
export class CondicionPacienteDiscapacidadModalComponent implements OnInit {
  cpdFG: FormGroup;
  idCPD: string = "";
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private condicionPacienteDiscapacidadService: CondicionPacienteDiscapacidadService
  ) {
    this.buildFG();
    this.idCPD = config.data.id;
  }

  ngOnInit(): void {
    if (this.idCPD != "") {
      this.condicionPacienteDiscapacidadService
        .getCPD(this.idCPD)
        .subscribe((resp: any) => {
          let res = resp.object;
          this.getFC("codCPD").setValue(res.idcpd);
          this.getFC("nombre").setValue(res.nombre);
        });
    }
  }
  save() {
    const cpdInput: any = {
      idcpd: this.getFC("codCPD").value,
      nombre: this.getFC("nombre").value,
    };
    if (this.idCPD != "") {
      cpdInput[""] = this.idCPD;
      this.actualizar(cpdInput);
    } else {
      this.agregar(cpdInput);
    }
  }
  actualizar(cpdInput) {
    this.condicionPacienteDiscapacidadService
      .updateCPD(this.idCPD, cpdInput)
      .subscribe((resp) => {
        this.ref.close("actualizado");
      });
  }
  agregar(cpdInput) {
    this.condicionPacienteDiscapacidadService
      .addCPD(cpdInput)
      .subscribe((resp) => {
        this.ref.close("agregado");
      });
  }
  isInvalid(control: string): boolean {
    const formC: AbstractControl = this.cpdFG.get(control);
    return formC.invalid && (formC.dirty || formC.touched);
  }
  getFC(control: string): AbstractControl {
    return this.cpdFG.get(control);
  }
  buildFG() {
    this.cpdFG = new FormGroup({
      codCPD: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
    });
  }
}
