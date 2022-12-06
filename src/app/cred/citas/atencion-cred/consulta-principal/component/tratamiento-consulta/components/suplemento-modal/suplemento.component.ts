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
import {DatePipe} from '@angular/common';

@Component({
  selector: "app-suplemento",
  templateUrl: "./suplemento.component.html",
  styleUrls: ["./suplemento.component.css"],
})
export class SuplementoComponent implements OnInit {
  datePipe=new DatePipe('en-US')
  idConsulta:string
  dataDocumento:dato;
  suplemento: SuplementacionMicronutrientes;
  suplemetancionFG: FormGroup;
  medicamentoSeleccionado=null  

  // presentacionSFaTermino=[
  //   {name:'HIERRO POLIMALTOSADO-(SOL 50mg/ml 20ml)',code:'28551'},
  //   {name:'FERROSO SULFATO(SAL FERROSA)-(TAB 300MG)',code:'03552'},
  //   {name:'FERROSO SULFATO HEPTAHIDRATO-(FCO 15mg/5ml-180ml)',code:'03519'},
  // ]
  tipoSuplementacion=[
    {name:'Sulfato Ferroso',code:'SF',codigoHis:'99199.17'},
    {name:'Micronutrientes',code:'MNM',codigoHis:'99199.19'},
  ]
  tipoSuplementacion2=[
    {name:'Vitamina A',code:'VA',codigoHis:'99199.27'},
  ]
  
  presentacionSFaTermino=[
    {name:'Jarabe Sulfato Ferroso-(75mg/5mL)',codeSISMED:'28551',contenidoHierroElemental:'15mg/5ml de Hierro elemental',descripcion:'Sulfato Ferroso'},
    {name:'Ferrimax -(50mg/ml por 30ml)',codeSISMED:'28551',contenidoHierroElemental:'',descripcion:'Sulfato Ferroso'},
    {name:'Gotas Sulfato Ferroso-(125mg/ml)',codeSISMED:'03552',contenidoHierroElemental:'25mg/ml de Hierro elemental',descripcion:'Sulfato Ferroso'},
  ]
  presentacionMNM=[
    {name:'Micronutrientes:Sobre de 1 gramo en Polvo',codeSISMED:'sin codificacion',contenidoHierroElemental:'Hierro (12.5 mg de Hierro elemental)',descripcion:'Micronutrientes'},
  ]
  presentacionVitaminaA=[
    {name:'RETINOL VITAMINA A (CAP-100.000 UI (30mg))',codeSISMED:'08152',contenidoHierroElemental:'',descripcion:'Vitamina A'},
    {name:'RETINOL VITAMINA A (CAP-200.000 UI (30mg))',codeSISMED:'08153',contenidoHierroElemental:'',descripcion:'Vitamina A'},
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
  }
  ngOnInit(): void {
    this.idConsulta=this.dataDocumento.idConsulta;
    if(this.suplemento.nombre=='SF'||this.suplemento.nombre=='MNM'){
      this.medicamentoSeleccionado=this.tipoSuplementacion.find((item)=>item.code==this.suplemento.nombre)
    }
    else{
      this.medicamentoSeleccionado=this.tipoSuplementacion2.find((item)=>item.code==this.suplemento.nombre)
    }
    this.cambiarMedicamento()
  }
  build() {
    this.suplemetancionFG = new FormGroup({
      fechaTentativa: new FormControl({value:'',disabled:true}, Validators.required),
      fechaAplicacion: new FormControl({value:'',disabled:true}, Validators.required),
      medicamento: new FormControl("", Validators.required),
      dosis: new FormControl("", Validators.required),
      lab: new FormControl(""),
      
    });
  }
  medicacion=[]
  cambiarMedicamento(){
    switch(this.medicamentoSeleccionado.code){
      case 'SF':
        this.medicacion=this.presentacionSFaTermino
        break
      case 'MNM':
        this.medicacion=this.presentacionMNM
        break  
      case 'VA':
        this.medicacion=this.presentacionVitaminaA
        break  
    }
  }
  getFC(control: string): AbstractControl {
    return this.suplemetancionFG.get(control);
  }
  getSuplementancion() {
    this.getFC("fechaTentativa").setValue(this.suplemento.fechaTentativa);
    this.getFC("fechaAplicacion").setValue(new Date());
    this.getFC("lab").setValue(this.suplemento.dosis);    
  }
  save() {
    let requestInput:any= {
        tipoSuplementacion:'PREVENTIVO',
        codPrestacion: "007", //duro no existe codprodedimiento para sis pero si como diagnostico
        codSISMED: this.getFC('medicamento').value.codeSISMED,
        nroDiagnostico: 0, //deberia ir el codDiagnosticos sis incluido su sie(otras medidas profilacticas especificadas z29.8)
        /*  para HIS */
        codProcedimientoHIS: this.medicamentoSeleccionado.codigoHis,
        codUPS: "Enfermeria", //duro
        nombreUPS:"Enfermeria",
        nombreUPSaux: "CRED", //duro
        /* ATRIBUTOS EN COMUN */
        nombre: this.suplemento.nombre,//SF
        descripcion: this.medicamentoSeleccionado.name,//(mas conocido como el medicamento)aun por definir,//SF-SULFATO-FERROSO
        dosisIndicacion: this.getFC('dosis').value,//dosis campo abierto deberia se calculado 1/2cucharadita
        viaAdministracion: 'oral',//par
        duracion: "6 mes",
        indicacion: "temor con citricos",//?evaluar campo
        dosis: this.suplemento.dosis,//nro de la dosis
        fecha:this.datePipe.transform(this.getFC("fechaAplicacion").value,'yyyy-MM-dd'),
        estadoAdministrado: true,
        edadMes: this.suplemento.edadMes,
        fechaTentativa:this.datePipe.transform(this.getFC("fechaTentativa").value,'yyyy-MM-dd'),
        /* para HIS */
        lab:this.getFC('lab').value,
        tipo:'D'
      };
      
      if (this.suplemento.tipoSuplementacion=='TERAPEUTICO'){
        requestInput.tipoSuplementacion='TERAPEUTICO'
      } 
      this.confirmationService.confirm({
        header: "Confirmación",
        message: "Esta Seguro que desea guardar suplementacion",
        icon: "pi  pi-exclamation-triangle ",
        acceptLabel: "Si",
        rejectLabel: "No",
        key:'claveDialog',
        accept: () => {
          if (this.suplemento.tipoSuplementacion=='PREVENTIVO'){
            if (this.isSuplementacion){
              this.SuplementacionService.PostSuplementacion(this.idConsulta,requestInput
              ).subscribe((resp) => {
                if(resp.object!=null)
                  this.ref.close("agregado");
                else
                  this.ref.close('no agregado')
              });
            }
            else{
              this.SuplementacionService.PostVitaminaA(this.idConsulta,requestInput
              ).subscribe((resp) => {
                if(resp.object!=null)
                  this.ref.close("agregado");
                else
                  this.ref.close('no agregado')
              });
            }
          }
          else{
              this.SuplementacionService.PostSuplementacionXanemia(this.idConsulta,requestInput).subscribe((resp)=>{
                if(resp.object!=null)
                  this.ref.close("agregado");
                else
                  this.ref.close('no agregado')
              })
          }


        },
        reject: () => {
        },
      });
    }
  cancel() {
    // this.getFC('')
    this.ref.close("cancelado");
  }
}
