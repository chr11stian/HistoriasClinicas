import { Component, OnInit } from "@angular/core";
import { Parasitologia } from "../../interfaces/parasitologia.interface";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ParasitologiaService } from "../../services/parasitologia.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { LoginComponent } from "../../../login/login.component";
registerLocaleData(localeFr, "fr");
@Component({
  selector: "app-lab-parasitologia",
  templateUrl: "./lab-parasitologia.component.html",
  styleUrls: ["./lab-parasitologia.component.css"],
})
export class LabParasitologiaComponent implements OnInit {
  constructor(
    private parasitologiaService: ParasitologiaService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}
  idLaboratorio: string = "";
  data: Parasitologia[] = [
    {
      resultadosAnalisis: "",
      resultadosTipoMuestra: "",
      color: "",
      consistencia: "",
      ph: "",
      reaccion: "",
      mucus: "",
      sangre: "",
      restosAlimenticios: "",
      filamentosMucoides: "",
      leucocitos: 0,
      hematies: 0,
      cuerposGrasos: "",
      levaduras: "",
      bacterias: "",
      huevosDe: "",
      quistesDe: "",
      trofozoitosDe: "",
      larvasDe: "",
      sangreOcultaHeces: "",
      gotaGruesaDxMalaria: "",
      frotisLesionDLeishmaniosis: "",
    },
  ];
  idConsulta: string;
  ngOnInit(): void {
    const aux = this.config.data;
    this.idConsulta = aux.data.id;
    this.builform();
  }
  parasitologiaFC: FormGroup;
  builform() {
    this.parasitologiaFC = new FormGroup({
      apellidosNombres: new FormControl("", Validators.required),
      edad: new FormControl("", Validators.required),
      nroHistoria: new FormControl("", Validators.required),
      nroSis: new FormControl("", Validators.required),
      solicitante: new FormControl("", Validators.required),
      hour: new FormControl("", Validators.required),
      nroMuestra: new FormControl("", Validators.required),
      nroCama: new FormControl("", Validators.required),

      // resultados:new FormControl('',Validators.required),
      // servicio:new FormControl('',Validators.required),
      // LugarExamen:new FormControl('',Validators.required),
      // tipoMuestra:new FormControl('',Validators.required),
    });
  }
  guardar() {
    const inputRequest = {
      nroMuestra: "una cipcion",
      resultado: {
        clave: " resultados",
        valor: " resultados",
        resultado: " resultados",
      },
      observacionesLab: "aaa",
      resultadoExamen: "aaaa",

      examenMacroscopico: {
        color: this.data[0].color,
        consistencia: this.data[0].consistencia,
        pH: this.data[0].ph,
        reaccion: this.data[0].reaccion,
        mucus: this.data[0].mucus,
        sangre: this.data[0].sangre,
        restosAlimenticios: this.data[0].restosAlimenticios,
      },
      examenMicroscopico: {
        reaccionInflamatorio: "examen Microscopico",
        filamentosMucoides: this.data[0].filamentosMucoides,
        leucocitos: this.data[0].leucocitos,
        hematies: this.data[0].hematies,
        cuerposGrasos: this.data[0].cuerposGrasos,
        levaduras: this.data[0].levaduras,
        bacterias: this.data[0].bacterias,
        cocosBacilos: "examen Microscopico",
        formasParasitarias: "examen Microscopico",
        huevosDe: [this.data[0].huevosDe],
        quistesDe: [this.data[0].quistesDe],
        trofozoitosDe: [this.data[0].trofozoitosDe],
        larvasDe: [this.data[0].larvasDe],
      },
      sangreOcultaHeces: this.data[0].sangreOcultaHeces,
      gotaGruesa: this.data[0].gotaGruesaDxMalaria,
      frotisLesion: this.data[0].frotisLesionDLeishmaniosis,
    };
    Swal.fire({
      title: "Estas Seguro de Guardar el Laboratorio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#D32F2F",
      confirmButtonColor: "#0c3866",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
         this.parasitologiaService
           .PostParasitologia(this.idConsulta, inputRequest)
           .subscribe((resp) => {
            this.ref.close('confirmado')//confirmado o cancelado
            Swal.fire({
              icon: "success",
              title: "Exito!",
              text: "Se guardo el laboratorio",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  }
  cancelar() {
    this.ref.close('cancelado');
  }
}
