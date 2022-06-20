import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { LaboratoriosService } from "../../services/laboratorios.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { LabHematologiaComponent } from "../lab-hematologia/lab-hematologia.component";
import { LabInmunologiaComponent } from "../lab-inmunologia/lab-inmunologia.component";
import { LabParasitologiaComponent } from "../lab-parasitologia/lab-parasitologia.component";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { LabOrinaComponent } from "../lab-orina/lab-orina.component";
import {LabBioquimicaComponent} from "../lab-bioquimica/lab-bioquimica.component";
import { LabMicrobiologicoComponent } from "../lab-microbiologico/lab-microbiologico.component";

registerLocaleData(localeFr, "fr");

@Component({
  selector: "app-lista-laboratorio",
  templateUrl: "./lista-laboratorio.component.html",
  styleUrls: ["./lista-laboratorio.component.css"],
  providers: [DialogService],
})
export class ListaLaboratorioComponent implements OnInit {
  formListaLabo: FormGroup;
  datePipe = new DatePipe("en-US");
  fechaActual = new Date();
  idIpres = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
  DataLisLab: any;

  loading: boolean = true;
  ref: DynamicDialogRef;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private laboratoriosService: LaboratoriosService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.formListaLabo.get("fechaBusqueda").setValue(this.fechaActual);
    this.listaLab();
  }

  buildForm() {
    this.formListaLabo = this.fb.group({
      fechaInicio: new FormControl(""),
      fechaBusqueda: new FormControl(""),
      tipoDoc: new FormControl(""),
      nroDoc: new FormControl(""),
    });
  }

  listaLab() {
    let data = {
      fecha: this.datePipe.transform(
        this.formListaLabo.value.fechaBusqueda,
        "yyyy-MM-dd"
      ),
    };
    console.log("DATA ", data);

    this.laboratoriosService
      .getSolicitudLaboratorio(this.idIpres, data)
      .subscribe((res: any) => {
        this.DataLisLab = res.object;
        this.loading = false;
        console.log("LISTA DE SOLICITUD ", this.DataLisLab);
      });
  }

  /**Abre el dialog dependiendo a los exemenes de laboratorio**/
  openDialogLab(data) {
    let dataAux = {
      data: data,
    };
    switch (data.datosLaboratorio.subTipo) {
      case "HEMATOLOGIA":
        {
          this.ref = this.dialog.open(LabHematologiaComponent, {
            header: "LABORATORIO CLINICO - HEMATOLOGIA",
            width: "90%",
            data: data,
          });
          console.log("DATAS", data);
          this.ref.onClose.subscribe((data: any) => {
            // this.buscarCuposPorPersonal();
          });
        }
        break;

      case "INMUNOLOGIA":
        {
          this.ref = this.dialog.open(LabInmunologiaComponent, {
            header: "LABORATORIO CLINICO - INMUNOLOGIA",
            width: "90%",
            data: data,
          });
          console.log("DATA", data);
          this.ref.onClose.subscribe((data: any) => {
            // this.buscarCuposPorPersonal();
          });
        }
        break;

      case "MICROBIOLOGICO":
      {
        this.ref = this.dialog.open(LabMicrobiologicoComponent, {
          header: "LABORATORIO CLINICO - MICROBIOLOGICO",
          width: "60%",
          data: data,
        });
        console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;

      case "BIOQUIMICA":
      {
        this.ref = this.dialog.open(LabBioquimicaComponent, {
          header: "LABORATORIO CLINICO - BIOQUIMICA",
          width: "90%",
          data: data,
        });
        console.log("DATA", data);
        this.ref.onClose.subscribe((data: any) => {
          // this.buscarCuposPorPersonal();
        });
      }
        break;
      case "PARASITOLOGIA":
        {
          this.ref = this.dialog.open(LabParasitologiaComponent, {
            header: "LABORATORIO CLINICO - Parasitologia",
            width: "70%",
            data: dataAux,
          });
          console.log("DATA", data);
          this.ref.onClose.subscribe((data: any) => {
            // this.buscarCuposPorPersonal();
          });
        }
        break;
        case "URUANALISIS":
        {
          this.ref = this.dialog.open(LabOrinaComponent, {
            header: "LABORATORIO CLINICO - URUANALISIS",
            width: "70%",
            data: dataAux,
          });
          console.log("DATA", data);
          this.ref.onClose.subscribe((data: any) => {
          });
        }
        break;
    }
  }
}
