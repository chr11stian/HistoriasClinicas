import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogConsultaUniversalComponent } from "../../historia-consultas/dialog-consulta-universal/dialog-consulta-universal.component";
import { DialogConsultaComponent } from "./dialog-consulta/dialog-consulta.component";
import { ConsultaObstetriciaService } from "./services/consulta-obstetricia/consulta-obstetricia.service";


@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
  providers: [DialogService],
})
export class ConsultaComponent implements OnInit {
  listaDocumentos: any;
  formConsulta: FormGroup;
  consultas = [];
  ref: DynamicDialogRef;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private dialog: DialogService,
    private consultaObstetriciaService: ConsultaObstetriciaService
  ) {
    this.recuperarConsultas();
   }

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

  regresar() {
    this.location.back();
  }

  openDialogConsultaNuevo() {
    let dialog = this.dialog.open(DialogConsultaComponent, {
      header: "CONSULTA",
      width: "95%",
      contentStyle: {
        "max-height": "700px",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
      if(data!==undefined) this.recuperarConsultas();
    })
  }

  openDialogConsultaEditar(row, index) {
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(DialogConsultaComponent, {
      header: "CONSULTA",
      width: "95%",
      contentStyle: {
        "max-height": "800px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
      if(data!==undefined) {
        this.recuperarConsultas();
      };
    })
  }
  
  recuperarConsultas(){
    let data={
      "nroHcl":"10101013",
      "nroEmbarazo":1
     }
    this.consultaObstetriciaService.getDatosConsultasObstetricasListar(data).subscribe((res: any) => {
      console.log('trajo datos exito ', res)
      this.consultas=res.object?res.object:[];
    })
  }
  
  openDialogConsultaUniversal() {
    this.ref = this.dialog.open(DialogConsultaUniversalComponent, {
      header: "CONSULTA UNIVERSAL",
      width: "95%",
      contentStyle: {
        "max-height": "500px",
        overflow: "auto",
      },
      data: {
        texto: 'datossss'
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
    });
  }
}
