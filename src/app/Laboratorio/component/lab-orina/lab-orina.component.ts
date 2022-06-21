import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Orina } from "../../interfaces/parasitologia.interface";
import { ParasitologiaService } from "../../services/parasitologia.service";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-lab-orina",
  templateUrl: "./lab-orina.component.html",
  styleUrls: ["./lab-orina.component.css"],
})
export class LabOrinaComponent implements OnInit {
  idLaboratorio: string;
  constructor(
    private parasitologiaService: ParasitologiaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig){
    this.buildForm();
    }
  dataRecibida:any
  ngOnInit(): void {
    const aux = this.config.data;
    this.idLaboratorio = aux.data.id;
    this.dataRecibida = this.config.data;
    this.cargarDatos()
  
  }
  data: Orina[] = [
    {
      volumen: "",
      color: "",
      aspecto: "",
      ph: "",
      densidad: "",
      proteinas: "",
      glucosa: "",
      urobilinogeno: "",
      bilirrubinas: "",
      acidoAscorbico: "",
      sangreHb: "",
      nitritos: "",
      cuerposCetonicos: "",
      celulasEpiteliales: "",
      leucocitos: "",
      piocitos: "",
      hematies: "",
      cilindros: "",
      bacterias: "",
      levaduras: "",
      cristales: "",
      otros: "",
    },
  ];
  cancelar() {}
  guardar() {
    console.log(this.data[0]);
    const inputRequest = {
      nroMuestra: "una cipcion",
      resultado: {
        clave: " resultados",
        valor: " resultados",
        resultado: " resultados",
      },
      observacionesLab: "aaa",
      resultadoExamen: "aaaa",
      volumen: this.data[0].volumen,
      color: this.data[0].color,
      aspecto: this.data[0].aspecto,
      ph: this.data[0].ph,
      densidad: this.data[0].densidad,
      proteinas: this.data[0].proteinas,
      proteinuriaCualitativa: "laboratorio uroanalisis",
      glucosa: this.data[0].glucosa,
      urobilinogeno: this.data[0].urobilinogeno,
      bilirubinas: this.data[0].bilirrubinas,
      acidoAscorbico: this.data[0].acidoAscorbico,
      sangreHb: this.data[0].sangreHb,
      nitritos: this.data[0].nitritos,
      cuerposCetonicos: this.data[0].cuerposCetonicos,
      celulasEpiteliales: this.data[0].celulasEpiteliales,
      leucocitos: this.data[0].leucocitos,
      piocitos: this.data[0].piocitos,
      hematies: this.data[0].hematies,
      cilindros: this.data[0].cilindros,
      bacterias: this.data[0].bacterias,
      levaduras: this.data[0].levaduras,
      cristales: this.data[0].cristales,
      otros: this.data[0].otros,
    };
    this.parasitologiaService
      .PostOrina(this.idLaboratorio, inputRequest)
      .subscribe(() => {
        console.log("afirmattivo");
      });
  }
  orinaFG: FormGroup;
  buildForm() {
    this.orinaFG = new FormGroup({
      apellidosNombres: new FormControl("", Validators.required),
      nroHCL: new FormControl("", Validators.required),
      edad: new FormControl("", Validators.required),
      nroSIS: new FormControl("", Validators.required),
      solicitante: new FormControl("", Validators.required),
      hour: new FormControl("", Validators.required),
      nroMuestra: new FormControl("", Validators.required),
      nroCama: new FormControl("", Validators.required),
    });
  }
  cargarDatos(){
    let dataPaciente=this.dataRecibida.data.datosPaciente
    let dataSolicitante=this.dataRecibida.data.profesionalAcargo
    console.log(dataSolicitante);
    
    this.getFC('apellidosNombres').setValue(`${dataPaciente.apePaterno} ${dataPaciente.apeMaterno},${dataPaciente.primerNombre} ${dataPaciente.otrosNombres}`)
    this.getFC('edad').setValue(dataPaciente.edad)
    this.getFC('nroHCL').setValue(dataPaciente.nroHcl)
     this.getFC('solicitante').setValue(`${dataSolicitante.apePaterno} ${dataSolicitante.apeMaterno},${dataSolicitante.primerNombre} ${dataSolicitante.otrosNombres}`)
    
    

  }
  getFC(control: string): AbstractControl {
    return this.orinaFG.get(control);
  }
}
