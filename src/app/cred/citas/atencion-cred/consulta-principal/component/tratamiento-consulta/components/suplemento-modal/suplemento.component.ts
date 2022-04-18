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
import {dato} from "../../../../../../models/data";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: "app-suplemento",
  templateUrl: "./suplemento.component.html",
  styleUrls: ["./suplemento.component.css"],
})
export class SuplementoComponent implements OnInit {
  idConsulta:string
  dataDocumento:dato;
  suplemento: SuplementacionMicronutrientes;
  suplemetancionFG: FormGroup;

  // presentacionSFaTermino=[
  //   {name:'HIERRO POLIMALTOSADO-(SOL 50mg/ml 20ml)',code:'28551'},
  //   {name:'FERROSO SULFATO(SAL FERROSA)-(TAB 300MG)',code:'03552'},
  //   {name:'FERROSO SULFATO HEPTAHIDRATO-(FCO 15mg/5ml-180ml)',code:'03519'},
  // ]
  presentacionSFaTermino=[
    {name:'Gotas Sulfato Ferroso-(SOL 50mg/ml 20ml)',codeSISMED:'28551',contenidoHierroElemental:'1 gota=1,25mg de Hierro elemental'},
    {name:'Gotas Complejo Polimaltosado-(TAB 300MG)',codeSISMED:'03552',contenidoHierroElemental:'1 gota=2,5mg de Hierro elemental'},
  ]
  presentacionMNM=[
    {name:'Micronutrientes:Sobre de 1 gramo en Polvo',codeSISMED:'sin codificacion',contenidoHierroElemental:'Hierro (12.5 mg de Hierro elemental)'},
  ]
  presentacionVitaminaA=[
    {name:'RETINOL VITAMINA A (CAP-100.000 UI (30mg))',codeSISMED:'08152',contenidoHierroElemental:''},
    {name:'RETINOL VITAMINA A (CAP-200.000 UI (30mg))',codeSISMED:'08153',contenidoHierroElemental:''},
  ]
  isSuplementacion:boolean
  consumoDiario: string = "Consumo diario";
  constructor(
    public confirmationService:ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private SuplementacionService: SuplementacionesMicronutrientesService) {
    this.dataDocumento=JSON.parse(localStorage.getItem('documento'))
    this.build();
    this.suplemento = this.config.data.suplementacion;
    this.isSuplementacion = this.config.data.isSuplementacion;
    this.getSuplementancion();
    console.log('la suplemtacion enviada',this.suplemento)
  }
  ngOnInit(): void {
    this.idConsulta=this.dataDocumento.idConsulta;
  }
  build() {
    this.suplemetancionFG = new FormGroup({
      fechaTentativa: new FormControl({value:'',disabled:true}, Validators.required),
      fechaAplicacion: new FormControl({value:'',disabled:true}, Validators.required),
      medicamento: new FormControl("", Validators.required),
      dosis: new FormControl("", Validators.required),
    });
  }
  getFC(control: string): AbstractControl {
    return this.suplemetancionFG.get(control);
  }
  getSuplementancion() {
    this.getFC("fechaTentativa").setValue(this.suplemento.fechaTentativa);
    this.getFC("fechaAplicacion").setValue(new Date());
  }
  save() {
    let requestInput:any= {
        codPrestacion: "007", //duro no existe codprodedimiento para sis pero si como diagnostico
        codSISMED: this.getFC('medicamento').value.code,
        nroDiagnostico: 0, //deberia ir el codDiagnosticos sis incluido su sie(otras medidas profilacticas especificadas z29.8)
        codProcedimientoHIS: "32323", //duro
        codUPS: "324231", //duro

        nombre: this.suplemento.nombre,//SF
        descripcion: this.getFC('medicamento').value.name,//(mas conocido como el medicamento)aun por definir,//SF-SULFATO-FERROSO
        dosisIndicacion: this.getFC('dosis').value,//dosis campo abierto deberia se calculado 1/2cucharadita
        viaAdministracion: 'oral',//par
        duracion: "6 mes",
        indicacion: "temor con citricos",//?evaluar campo
        dosis: this.suplemento.dosis,//nro de la dosis
        fecha: this.obtenerFecha(this.getFC("fechaAplicacion").value),
        estadoAdministrado: true,
        edadMes: this.suplemento.edadMes,
        fechaTentativa: "2021-10-25"
    };

    if (this.suplemento.tipoSuplementacion=='TERAPEUTICO'){
      requestInput.tipoSuplementacion='TERAPEUTICO'
    }
    // console.log('recivico',this.suplemento)
    // console.log('enviado',requestInput)
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "Esta Seguro que desea guardar suplementacion",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      key:'claveDialog',
      accept: () => {
        console.log('tipo suplementacion',this.suplemento.tipoSuplementacion)
        if (this.suplemento.tipoSuplementacion=='PREVENTIVO'){
          console.log('->>>>>>>>>>>>>>',this.isSuplementacion)
          if (this.isSuplementacion){
            this.SuplementacionService.PostSuplementacion(this.idConsulta,requestInput
            ).subscribe(() => {
              this.ref.close("agregado");
            });
          }
          else{
            this.SuplementacionService.PostVitaminaA(this.idConsulta,requestInput
            ).subscribe(() => {
              this.ref.close("agregado");
            });
          }
        }
        else{
            this.SuplementacionService.PostSuplementacionXanemia(this.idConsulta,requestInput).subscribe((resp)=>{
                this.ref.close('agregado')
            })
        }


      },
      reject: () => {
        // console.log("no se borro");
      },
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
