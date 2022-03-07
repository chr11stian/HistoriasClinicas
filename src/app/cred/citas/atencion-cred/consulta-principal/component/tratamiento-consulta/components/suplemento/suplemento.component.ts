import { Component, OnInit } from "@angular/core";
import { SuplementacionMicronutrientes } from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SuplementacionesMicronutrientesService } from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";

@Component({
  selector: "app-suplemento",
  templateUrl: "./suplemento.component.html",
  styleUrls: ["./suplemento.component.css"],
})
export class SuplementoComponent implements OnInit {
  suplemento: SuplementacionMicronutrientes;
  suplemetancionFG: FormGroup;
  repositorioSF: any[] = [
    {name:'Gotas',code:'Gotas'},
    {name:'Jarabe',code:'Jarabe'},
    {name:'Tabletas',code:'Tabletas'},

  ];
  repositorioMNM: any[] = [
    {name:'Sobre',code:'Sobre'}
  ];
  presentacionSF=[
    {name:'Sulfato Ferroso',code:'Gotas Sulfato Ferroso'},
    {name:'Complejo Polimaltosado Ferrico',code:'Gotas de Complejo Polimaltosado Ferrico'},
  ]
  presentacionMNM=[
    {name:'Micronutriente 1 gramo en Polvo',code:'Micronutriente 1 gramo en Polvo'},
  ]
  // dosis: string = " 2mg/kg/dia";
  consumoDiario: string = "Consumo diario";
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private SuplementacionService: SuplementacionesMicronutrientesService
  ) {
    this.build();
    this.suplemento = this.config.data;
    this.getSuplemtancion();
  }
  ngOnInit(): void {}
  build() {
    this.suplemetancionFG = new FormGroup({
      fechaTentativa: new FormControl("", Validators.required),
      fechaAplicacion: new FormControl("", Validators.required),
      tipo: new FormControl("", Validators.required),
      presentacion: new FormControl("", Validators.required),
    });
  }
  getFC(control: string): AbstractControl {
    return this.suplemetancionFG.get(control);
  }
  getSuplemtancion() {
    this.getFC("fechaTentativa").setValue(this.suplemento.fechaTentativa);
    this.getFC("fechaAplicacion").setValue(new Date());
  }
  save() {
    const requestInput = {
      suplementacionMes: {
        codPrestacion: "21312", //duro
        codSISMED: "123322", //duro
        nroDiagnostico: 0, //duro
        codProcedimientoHIS: "32323", //duro
        codUPS: "324231", //duro
        tipoSuplementacion: "Preventiva",
        nombre: this.suplemento.nombre,
        descripcion: this.suplemento.descripcion,
        dosisIndicacion: this.getFC('tipo').value,//para el tipo
        viaAdministracion: this.getFC('presentacion').value,//para la presentacion
        frecuencia: "cada dia",
        duracion: "1 mes",
        indicacion: "temor con citricos",
        dosis: this.suplemento.dosis,
        fecha: this.obtenerFecha(this.getFC("fechaAplicacion").value),
        estadoAdministrado: true,
        edadMes: this.suplemento.edadMes,
      },
    };
    this.SuplementacionService.PostSuplementacion(
      "6220faa7de66de66da819c08",
      requestInput
    ).subscribe(() => {
      this.ref.close("agregado");
    });
  }
  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split("T");
    const parte2 = parte1[1].split(".")[0];
    return `${parte1[0]}`;
  }
  cancel() {
    // this.getFC('')
    this.ref.close("cancelado");
  }
}
