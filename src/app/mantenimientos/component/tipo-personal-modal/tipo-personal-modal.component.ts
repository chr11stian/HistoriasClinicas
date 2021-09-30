import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TipoPersonal } from "src/app/core/models/mantenimiento.models";
import { TipoPersonalService } from "../../services/tipo-personal/tipo-personal.service";

@Component({
  selector: "app-tipo-personal-modal",
  templateUrl: "./tipo-personal-modal.component.html",
  styleUrls: ["./tipo-personal-modal.component.css"],
})
export class TipoPersonalModalComponent implements OnInit {
  tipoPersonalFG: FormGroup;
  idTipoPersonal = "";
  profesionalOptions = [
    { label: "SI", value: true },
    { label: "NO", value: false },
  ];
  estadoOptions = [
    { label: "Activo", value: true },
    { label: "Desactivo", value: false },
  ];
  constructor(
    public ref: DynamicDialogRef, //datos reenviados
    public config: DynamicDialogConfig, //datos enviados
    private tipoPersonalService: TipoPersonalService
  ) {
    this.buildForm();
  }
  isInvalid(control: string): boolean {
    const formC: AbstractControl = this.tipoPersonalFG.get(control);
    return formC.invalid && (formC.dirty || formC.touched);
  }
  buildForm() {
    this.tipoPersonalFG = new FormGroup({
      nombreTipoPersonal: new FormControl("", Validators.required),
      esProfesional: new FormControl("", Validators.required),
      abreviatura: new FormControl("", Validators.required),
      especialidad: new FormControl("", Validators.required),
      estado: new FormControl("", Validators.required),
    });
  }
  /** Get form controls*/
  getFC(control: string): AbstractControl {
    return this.tipoPersonalFG.get(control);
  }
  save() {
    const tipoPersonalInput: any = {
      nombre: this.getFC("nombreTipoPersonal").value,
      esProfesional: this.getFC("esProfesional").value,
      abreviatura: this.getFC("abreviatura").value,
      especialidad: this.getFC("especialidad").value,
      estado: this.getFC("estado").value,
    };
    if (this.idTipoPersonal) {
      tipoPersonalInput["id"] = this.idTipoPersonal;
      this.actualizar(tipoPersonalInput);
    } else {
      this.agregar(tipoPersonalInput);
    }
  }
  actualizar(tipoPersonalInput) {
    this.tipoPersonalService.updateTipoPersonal(tipoPersonalInput).subscribe(
      (resp) => {
        console.log(resp);
        this.ref.close("actualizado");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  agregar(tipoPersonalInput) {
    this.tipoPersonalService.addTipoPersonal(tipoPersonalInput).subscribe(
      (resp) => {
        // console.log(resp);
        this.ref.close("agregado");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    if (this.config.data.id != "") {
      this.idTipoPersonal = this.config.data.id;
      this.tipoPersonalService
        .getTipoPersonal(this.config.data.id)
        .subscribe((res: any) => {
          let resp = res.object;
          this.getFC("nombreTipoPersonal").setValue(resp.nombre);
          this.getFC("esProfesional").setValue(resp.esProfesional);
          this.getFC("abreviatura").setValue(resp.abreviatura);
          this.getFC("especialidad").setValue(resp.especialidad);
          this.getFC("estado").setValue(resp.estado);
        });
    }
  }
}
