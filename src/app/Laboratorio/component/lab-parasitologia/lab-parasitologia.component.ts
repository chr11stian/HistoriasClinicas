import { Component, OnInit } from "@angular/core";
import { Parasitologia } from "../../interfaces/parasitologia.interface";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ParasitologiaService } from "../../services/parasitologia.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import Swal from "sweetalert2";
import { LoginComponent } from "../../../login/login.component";
registerLocaleData(localeFr, "fr");
@Component({
  selector: "app-lab-parasitologia",
  templateUrl: "./lab-parasitologia.component.html",
  styleUrls: ["./lab-parasitologia.component.css"],
})
export class LabParasitologiaComponent implements OnInit {
  idLaboratorio: string = "";
  idConsulta: string;
  dataRecibida: any;
  isPruebaTomada: boolean;
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
  constructor(
    private parasitologiaService: ParasitologiaService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    const aux = this.config.data;
    this.idLaboratorio = aux.dataEnviada.id;
    this.isPruebaTomada = aux.isPruebaTomada;
    this.dataRecibida = aux.dataEnviada;
    this.builform();
    this.cargarCabecera();
  }
  ngOnInit(): void {
    this.cargarPrueba();
  }
  parasitologiaFG: FormGroup;
  builform() {
    this.parasitologiaFG = new FormGroup({
      apellidosNombres: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      edad: new FormControl({ value: "", disabled: true }, Validators.required),
      nroHistoria: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      nroSis: new FormControl( { value: "", disabled: this.isPruebaTomada }, Validators.required),
      solicitante: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      hour: new FormControl({ value: "", disabled:this.isPruebaTomada }, Validators.required),
      nroMuestra: new FormControl( { value: "", disabled:this.isPruebaTomada }, Validators.required),
      nroCama: new FormControl({ value: "", disabled:this.isPruebaTomada }, Validators.required),

      // resultados:new FormControl('',Validators.required),
      // servicio:new FormControl('',Validators.required),
      // LugarExamen:new FormControl('',Validators.required),
      // tipoMuestra:new FormControl('',Validators.required),
    });
  }
  getFC(control: string): AbstractControl {
    return this.parasitologiaFG.get(control);
  }
  cargarCabecera() {
    let dataPaciente = this.dataRecibida.datosPaciente;
    let dataSolicitante = this.dataRecibida.profesionalAcargo;
    console.log(dataSolicitante);

    this.getFC("apellidosNombres").setValue(
      `${dataPaciente.apePaterno} ${dataPaciente.apeMaterno},${dataPaciente.primerNombre} ${dataPaciente.otrosNombres}`
    );
    this.getFC("edad").setValue(dataPaciente.edad);
    this.getFC("nroHistoria").setValue(dataPaciente.nroHcl);
    this.getFC("solicitante").setValue(
      `${dataSolicitante.apePaterno} ${dataSolicitante.apeMaterno},${dataSolicitante.primerNombre} ${dataSolicitante.otrosNombres}`
    );
  }
  // aux: any;
  cargarPrueba() {
    this.parasitologiaService
      .getOrina(this.idLaboratorio)
      .subscribe((resp: any) => {
        let aux = resp.object;
        // this.aux = aux;
        if (aux.estado === "CONCLUIDO") {
          // this.data[0].resultadosAnalisis = aux;
          // this.data[0].resultadosTipoMuestra = "";
          this.data[0].color = aux.examenMacroscopico.color;
          this.data[0].consistencia = aux.examenMacroscopico.consistencia;
          this.data[0].ph = aux.examenMacroscopico.ph;
          this.data[0].reaccion = aux.examenMacroscopico.reaccion;
          this.data[0].mucus = aux.examenMacroscopico.mucus;
          this.data[0].sangre = aux.examenMacroscopico.sangre;
          this.data[0].restosAlimenticios =
            aux.examenMacroscopico.restosAlimenticios;
          this.data[0].filamentosMucoides =
            aux.examenMicroscopico.filamentosMucoides;
          this.data[0].leucocitos = aux.examenMicroscopico.leucocitos;
          this.data[0].hematies = aux.examenMicroscopico.hematies;
          this.data[0].cuerposGrasos = aux.examenMicroscopico.cuerposGrasos;
          this.data[0].levaduras = aux.examenMicroscopico.levaduras;
          this.data[0].bacterias = aux.examenMicroscopico.bacterias;
          this.data[0].huevosDe = aux.examenMicroscopico.huevosDe[0];
          this.data[0].quistesDe = aux.examenMicroscopico.quistesDe[0];
          this.data[0].trofozoitosDe = aux.examenMicroscopico.trofozoitosDe[0];
          this.data[0].larvasDe = aux.examenMicroscopico.larvasDe[0];
          this.data[0].sangreOcultaHeces = aux.sangreOcultaHeces;
          this.data[0].gotaGruesaDxMalaria = aux.gotaGruesa;
          this.data[0].frotisLesionDLeishmaniosis = aux.frotisLesion;
        }
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
            this.ref.close("confirmado"); //confirmado o cancelado
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
  // cancelar() {
  //   this.ref.close("cancelado");
  // }
}
