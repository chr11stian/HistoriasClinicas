import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService } from "primeng/dynamicdialog";
import { DialogConsultaComponent } from "../../consultas-general/dialog-consulta/dialog-consulta.component";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
  providers:[DialogService],
})
export class ConsultaComponent implements OnInit {
  listaDocumentos: any;
  formConsulta: FormGroup;
  consultas = [
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
    {
      consulta: "consulta",
      fecha: "12-12-2021",
      personalSalud: "MOROCCO LAYME JONATHAN",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    console.log(this.consultas);
  }

  inicializarForm() {
    this.formConsulta = this.fb.group({
      tipoDoc: new FormControl(""),
      nroDoc: new FormControl(""),
    });
  }

  close() {

  }

  regresar(){
    this.location.back();
  }

  editar(){
    console.log("btn editar");
  }

  listDiagnosticos(){

  }

  openDialogConsulta() {
    let dialog = this.dialog.open(DialogConsultaComponent, {
        header: "CONSULTA",
        width: "95%",
        contentStyle: {
            "max-height": "500px",
            overflow: "auto",
        },
        footer:`hola mundo`,
        data:{
            texto:'datossss'
        }
    })

}
}
