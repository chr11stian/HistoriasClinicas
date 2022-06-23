import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Orina } from "../../interfaces/parasitologia.interface";
import { ParasitologiaService } from "../../services/parasitologia.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: "app-lab-orina",
  templateUrl: "./lab-orina.component.html",
  styleUrls: ["./lab-orina.component.css"],
})
export class LabOrinaComponent implements OnInit {
  orinaFG: FormGroup;
  orinaFG2: FormGroup;
  idLaboratorio: string;
  dataRecibida: any;
  isPrubaTomada: boolean;
  constructor(
    private parasitologiaService: ParasitologiaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    const aux = this.config.data;
    this.idLaboratorio = aux.dataEnviada.id;
    this.isPrubaTomada = aux.isPruebaTomada;
    this.dataRecibida = aux.dataEnviada;
    this.buildForm();
    this.buildForm2();
    this.cargarDatosCabecera();
  }
  ngOnInit(): void {
    this.cargarDatosPruebaTomada();
  }
  // aux: any;
  cargarDatosPruebaTomada() {
     Swal.fire({
       title:'<strong>Cargando Datos</strong>',
       html: '<div style=font-family:Spartan; >' + 'Espere un momento' + '</div>' + '</br>' +
         '<i class="pi pi-spin pi-spinner" style="font-size: 2rem;height:2rem;width:2rem"></i>',
       showCancelButton: false,
       showConfirmButton: false,
       position: 'top',
       backdrop: `rgba(0,0,0,0.85) left top no-repeat`,
       allowOutsideClick: false
     })
    this.parasitologiaService.getOrina(this.idLaboratorio).subscribe((resp: any) => {
        setTimeout(() => {Swal.close()}, 500)
        let respuesta = resp.object;
        if (respuesta.estado === "CONCLUIDO") {
          this.getFC('nroMuestra').setValue(respuesta.nroMuestra)
          this.getFC("volumen").setValue(respuesta.volumen);
          this.getFC("color").setValue(respuesta.color);
          this.getFC("aspecto").setValue(respuesta.aspecto);
          this.getFC2("ph").setValue(respuesta.ph);
          this.getFC2("densidad").setValue(respuesta.densidad);
          this.getFC2("proteinas").setValue(respuesta.proteinas);
          this.getFC2("glucosa").setValue(respuesta.glucosa);
          this.getFC2("urobilinogeno").setValue(respuesta.urobilinogeno);
          this.getFC2("bilirrubinas").setValue(respuesta.bilirubinas);
          this.getFC2("acidoAscorbico").setValue(respuesta.acidoAscorbico);
          this.getFC2("sangre").setValue(respuesta.sangreHb);
          this.getFC2("nitritos").setValue(respuesta.nitritos);
          this.getFC2("cuerposCetonicos").setValue(respuesta.cuerposCetonicos);
          this.getFC2("celulasEpiteliales").setValue(
            respuesta.celulasEpiteliales
          );
          this.getFC2("leucocitos").setValue(respuesta.leucocitos);
          this.getFC2("piocitos").setValue(respuesta.piocitos);
          this.getFC2("hematies").setValue(respuesta.hematies);
          this.getFC2("cilindros").setValue(respuesta.cilindros);
          this.getFC2("bacterias").setValue(respuesta.bacterias);
          this.getFC2("levaduras").setValue(respuesta.levaduras);
          this.getFC2("cristales").setValue(respuesta.cristales);
          this.getFC2("otros").setValue(respuesta.otros);
        }
      });
  }

  guardar() {
    const inputRequest = {
      nroMuestra: this.getFC('nroMuestra').value,
      resultado: {
        clave: " resultados",
        valor: " resultados",
        resultado: " resultados",
      },
      observacionesLab: "aaa",
      resultadoExamen: "aaaa",
      volumen: this.getFC("volumen").value,
      color: this.getFC("color").value,
      aspecto: this.getFC("aspecto").value,
      ph: this.getFC2("ph").value,
      densidad: this.getFC2("densidad").value,
      proteinas: this.getFC2("proteinas").value,
      // proteinuriaCualitativa: this.getFC2('protenuariasCualitativa').value,
      glucosa: this.getFC2("glucosa").value,
      urobilinogeno: this.getFC2("urobilinogeno").value,
      bilirubinas: this.getFC2("bilirrubinas").value,
      acidoAscorbico: this.getFC2("acidoAscorbico").value,
      sangreHb: this.getFC2("sangre").value,
      nitritos: this.getFC2("nitritos").value,
      cuerposCetonicos: this.getFC2("cuerposCetonicos").value,
      celulasEpiteliales: this.getFC2("celulasEpiteliales").value,
      leucocitos: this.getFC2("leucocitos").value,
      piocitos: this.getFC2("piocitos").value,
      hematies: this.getFC2("hematies").value,
      cilindros: this.getFC2("cilindros").value,
      bacterias: this.getFC2("bacterias").value,
      levaduras: this.getFC2("levaduras").value,
      cristales: this.getFC2("cristales").value,
      otros: this.getFC2("otros").value,
    };
    Swal.fire({
      title: "Estas Seguro de Guardar el Laboratorio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#D32F2F",
      confirmButtonColor: "#0c3866",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.parasitologiaService.PostOrina(this.idLaboratorio, inputRequest).subscribe((resp) => {
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
  buildForm() {
    this.orinaFG = new FormGroup({
      apellidosNombres: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      nroHCL: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      edad: new FormControl({ value: "", disabled: true }, Validators.required),
      nroSIS: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      solicitante: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      hour: new FormControl(
        { value: new Date(), disabled: this.isPrubaTomada },
        Validators.required
      ),
      nroMuestra: new FormControl(
        { value: 1, disabled: this.isPrubaTomada },
        Validators.required
      ),
      nroCama: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      // tres mas
      volumen: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      color: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      aspecto: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
    });
  }
  buildForm2() {
    this.orinaFG2 = new FormGroup({
      ph: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      densidad: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      proteinas: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      glucosa: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      urobilinogeno: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      bilirrubinas: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      acidoAscorbico: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      sangre: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      nitritos: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      cuerposCetonicos: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      celulasEpiteliales: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      leucocitos: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      piocitos: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      hematies: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      cilindros: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      bacterias: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      levaduras: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      cristales: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
      otros: new FormControl(
        { value: "", disabled: this.isPrubaTomada },
        Validators.required
      ),
    });
  }
  cargarDatosCabecera() {
    let dataPaciente = this.dataRecibida.datosPaciente;
    let dataSolicitante = this.dataRecibida.profesionalAcargo;
    this.getFC("apellidosNombres").setValue(
      `${dataPaciente.apePaterno} ${dataPaciente.apeMaterno},${dataPaciente.primerNombre} ${dataPaciente.otrosNombres}`
    );
    this.getFC("edad").setValue(dataPaciente.edad);
    this.getFC("nroHCL").setValue(dataPaciente.nroHcl);
    this.getFC("solicitante").setValue(
      `${dataSolicitante.apePaterno} ${dataSolicitante.apeMaterno},${dataSolicitante.primerNombre} ${dataSolicitante.otrosNombres}`
    );
  }
  getFC(control: string): AbstractControl {
    return this.orinaFG.get(control);
  }
  getFC2(control: string): AbstractControl {
    return this.orinaFG2.get(control);
  }
}
