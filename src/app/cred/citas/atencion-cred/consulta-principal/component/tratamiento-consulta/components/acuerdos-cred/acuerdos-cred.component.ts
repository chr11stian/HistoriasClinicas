import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  dato,
  listaAcuerdosConMadre,
  acuerdosInterface,
  proxCita,
  ReferenciaInterface,
} from "../../../../../../models/data";
import { FinalizarConsultaService } from "../../../../services/finalizar-consulta.service";

@Component({
  selector: "app-acuerdos-cred",
  templateUrl: "./acuerdos-cred.component.html",
  styleUrls: ["./acuerdos-cred.component.css"],
})
export class AcuerdosCredComponent implements OnInit {
  FrmAcuerdo: FormGroup;
  acuerdos: listaAcuerdosConMadre[] = [];
  listAcuerdos: listaAcuerdosConMadre[] = [];
  acuerdosAux: listaAcuerdosConMadre[] = [];
  constructor(private acuerdosService: FinalizarConsultaService) {}

  ngOnInit(): void {
    this.buid();
    this.listaAcuerdos();
  }
  listaAcuerdos() {
    this.acuerdosService.getListaAcuerdos().subscribe((r: any) => {
      this.listAcuerdos = r.object;
      console.log("acuerdos", this.listAcuerdos);
    });
  }
  buid() {
    this.FrmAcuerdo = new FormGroup({
      acuerdo: new FormControl({ value: null, disabled: false }, []),
      observaciones: new FormControl("", []),
    });
  }
  Agregar() {
    console.log(this.FrmAcuerdo.value.acuerdo);
    let a: listaAcuerdosConMadre = {
      nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
    };
    let b: listaAcuerdosConMadre = {
      nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
      descripcion:
        this.listAcuerdos[this.FrmAcuerdo.value.acuerdo - 1].descripcion,
    };

    //console.log(this.acuerdos)
    //console.log(this.acuerdosAux)
    if (
      this.acuerdos.find(
        (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
      ) === undefined
    )
      this.acuerdos.push(a);
    if (
      this.acuerdosAux.find(
        (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
      ) === undefined
    )
      this.acuerdosAux.push(b);
  }
}
