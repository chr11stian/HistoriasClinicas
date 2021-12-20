import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TipoUpsService } from "../../services/tipo-ups.service";

@Component({
  selector: "app-tipo-ups-modal",
  templateUrl: "./tipo-ups-modal.component.html",
  styleUrls: ["./tipo-ups-modal.component.css"],
})
export class TipoUpsModalComponent implements OnInit {
  idTipoUPS: string = "";
  tipoUPSFG: FormGroup;
  messageService: any;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private tipoUpsService: TipoUpsService
  ) {
    this.buildForm();
    this.idTipoUPS = config.data.id;
  }

  ngOnInit(): void {
    if (this.idTipoUPS) {
      this.tipoUpsService.getTipoUPS(this.idTipoUPS).subscribe((resp: any) => {
        let res = resp.object;
        this.getFC("nombreTUPS").setValue(res.nombre);
        this.getFC("descripcionTUPS").setValue(res.descripcion);
      });
    }
  }
  buildForm() {
    this.tipoUPSFG = new FormGroup({
      nombreTUPS: new FormControl("", Validators.required),
      descripcionTUPS: new FormControl("", Validators.required),
    });
  }
  getFC(control: string): AbstractControl {
    return this.tipoUPSFG.get(control);
  }
  isInvalid(control: string): boolean {
    const formC: AbstractControl = this.tipoUPSFG.get(control);
    return formC.invalid && (formC.dirty || formC.touched);
  }
  save() {
    const tipoUPSInput = {
      nombre: this.getFC("nombreTUPS").value,
      descripcion: this.getFC("descripcionTUPS").value,
    };
    if (this.idTipoUPS) {
      tipoUPSInput["id"] = this.idTipoUPS;
      this.actualizar(tipoUPSInput);
    } else {
      this.agregar(tipoUPSInput);
    }
  }
  actualizar(tipoUPSInput) {
    this.tipoUpsService.updateTipoUPS(this.idTipoUPS, tipoUPSInput).subscribe(
      (resp) => {
        this.ref.close("actualizado");
      },
      (error) => {
        this.ref.close("duplicado");
      }
    );
  }
  agregar(tipoUPSInput) {
    this.tipoUpsService.addTipoUPS(tipoUPSInput).subscribe(
      (resp) => {
        this.ref.close("agregado");
      },
      (error) => {
        this.ref.close("duplicado");
      }
    );
  }
}
