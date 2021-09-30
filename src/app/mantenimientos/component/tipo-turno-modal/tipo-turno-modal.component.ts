import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TipoTurnoService } from "../../services/tipo-turno.service";

@Component({
  selector: "app-tipo-turno-modal",
  templateUrl: "./tipo-turno-modal.component.html",
  styleUrls: ["./tipo-turno-modal.component.css"],
})
export class TipoTurnoModalComponent implements OnInit {
  idTipoTurno: string = "";
  tipoTurnoFG: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private tipoTurnoService: TipoTurnoService
  ) {
    this.buildForm();
    this.idTipoTurno = config.data.id;
  }
  ngOnInit(): void {
    if (this.idTipoTurno != "") {
      console.log("entramos a Actualizar");
      this.tipoTurnoService
        .getTipoTurno(this.idTipoTurno)
        .subscribe((res: any) => {
          let resp = res.object;
          console.log(resp);
          this.getFC("nombre").setValue(resp.nombre);
          this.getFC("horasInicio").setValue(resp.horasInicio);
          this.getFC("horasFin").setValue(resp.horasFin);
          this.getFC("nroHoras").setValue(resp.nroHoras);
          this.getFC("abreviatura").setValue(resp.abreviatura);
        });
    }
  }
  isInvalid(control: string): boolean {
    const formC: AbstractControl = this.tipoTurnoFG.get(control);
    return formC.invalid && (formC.dirty || formC.touched);
  }
  getFC(control: string): AbstractControl {
    return this.tipoTurnoFG.get(control);
  }
  buildForm() {
    this.tipoTurnoFG = new FormGroup({
      nombre: new FormControl("", Validators.required),
      horasInicio: new FormControl("", Validators.required),
      horasFin: new FormControl("", Validators.required),
      nroHoras: new FormControl("", Validators.required),
      abreviatura: new FormControl("", Validators.required),
    });
  }
  save() {
    const tipoTurnoInput: any = {
      nombre: this.getFC("nombre").value,
      horasInicio: this.getFC("horasInicio").value,
      horasFin: this.getFC("horasFin").value,
      nroHoras: this.getFC("nroHoras").value,
      abreviatura: this.getFC("abreviatura").value,
    };
    if (this.idTipoTurno) {
      tipoTurnoInput["id"] = this.idTipoTurno;
      this.actualizar(tipoTurnoInput);
    } else {
      this.agregar(tipoTurnoInput);
    }
  }
  actualizar(tipoPersonalInput) {
    console.log(tipoPersonalInput);
    this.tipoTurnoService.updateTipoTurno(tipoPersonalInput).subscribe(
      (resp) => {
        //  console.log(resp);
        this.ref.close("actualizado");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  agregar(tipoPersonalInput) {
    this.tipoTurnoService.addTipoTurno(tipoPersonalInput).subscribe(
      (resp) => {
        // console.log(resp);
        this.ref.close("agregado");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
