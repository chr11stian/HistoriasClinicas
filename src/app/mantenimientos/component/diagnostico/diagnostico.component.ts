import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PrestacionService} from "../../services/prestacion/prestacion.service";
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from "primeng/api";
@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  isDisabledFormDiagnostico:boolean=true;
  inputDisabled:boolean=true;
  isUpdate:boolean;
  codigo:string
  descripcion:string;
  data:diagnostico[]=[]
  diagnosticoFC:FormGroup
  estado:any[]=[
    {name:"Activado",code:"activado"},
    {name:"Desactivo",code:"desactivado"},
  ]
  grupo2=[
    {name:"GRUPO A",code:'GRUPO A'},
    {name:"GRUPO B",code:'GRUPO B'},
    {name:"GRUPO C",code:'GRUPO C'}
  ]
  constructor(private prestacionService:PrestacionService
              ,private ref: DynamicDialogRef
              ,private config: DynamicDialogConfig
              ,private messageService:MessageService,
  private confirmationService: ConfirmationService) {
    this.isUpdate=false;
    this.buildForm();
    this.codigo=this.config.data.codigo
    this.descripcion=this.config.data.descripcion
  }
  getFC(control:string):AbstractControl{
    return this.diagnosticoFC.get(control);
  }
  ngOnInit(): void {
    this.getDiagnostico();
  }
  buildForm(){
    this.diagnosticoFC=new FormGroup({
      grupo:new FormControl('',Validators.required),
      diagnostico:new FormControl('',Validators.required),
      cie10:new FormControl('',Validators.required),
      criterio:new FormControl('',Validators.required),
    })
  }
  getDiagnostico(){
    this.prestacionService.getDiagnosticoPorCodigo(this.codigo).subscribe((resp)=>{
      this.data=resp['object']['diagnostico'];
    })
  }
  diagnostico:diagnostico
  botonActualizar(index){
    this.isUpdate=true;
    this.diagnostico=this.data[index];
    this.getFC('grupo').setValue(this.diagnostico.grupo)
    this.getFC('diagnostico').setValue(this.diagnostico.diagnostico)
    this.getFC('criterio').setValue(this.diagnostico.criterio)
    this.getFC('cie10').setValue(this.diagnostico.cie10)
  }
  saveDiagnostico(){
    let inputRequest:any={
      grupo:this.getFC('grupo').value,
      diagnostico:this.getFC('diagnostico').value,
      cie10:this.getFC('cie10').value,
      criterio:this.getFC('criterio').value,
    }
    if (this.isUpdate){
        this.prestacionService.putDiagnosticoPorCodigo(this.codigo,this.diagnostico.cie10,inputRequest).subscribe(()=>{
          this.messageService.add({key:'myKey2',severity:'info', summary:'Exitoso', detail:'Registro Actualizado'});
          this.diagnosticoFC.reset();
          this.isUpdate=false;
          this.getDiagnostico();
        })
    }
    else{
      this.prestacionService.postDiagnosticoPorCodigo(this.codigo,inputRequest).subscribe((resp)=>{
        this.messageService.add({key:'myKey2',severity:'success', summary:'Exitoso', detail:'Registro agregado'});
        this.diagnosticoFC.reset();
        this.getDiagnostico();
      })
    }


  }
  cancelar(){
    this.diagnosticoFC.reset();
    this.isUpdate=false;
  }
  activarDiagnostico(rowIndex){
    const diagnostico1:diagnostico=this.data[rowIndex]
    this.confirmationService.confirm({
      header: "Confirmación",
      message: `Esta seguro que desea ACTIVAR el diagnostico con cie10: ${diagnostico1.cie10}`,
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      key:"siNoDesactivar",
      accept: () => {
        this.prestacionService.activarDiagnostico(this.codigo,diagnostico1.cie10).subscribe((resp) => {
            this.getDiagnostico();
            this.messageService.add({
              key:"myKey1",
              severity: "success",
              summary: "Exito",
              detail: "Se ha Activado dicho diagnostico",
            });
          },
          (error) => {
            this.messageService.add({
              key:"myKey1",
              severity: "success",
              summary: "Exito",
              detail: "errorrrrrrd",
            });

          }
        );
      },
      reject: () => {
        // console.log("no se borro");
      },
    });
  }
  desactivarDiagnostico(rowIndex){
    const diagnostico1:diagnostico=this.data[rowIndex]
    this.confirmationService.confirm({
      header: "Confirmación",
      message: `Esta seguro que desea DESACTIVAR el diagnostico con cie10: ${diagnostico1.cie10}`,
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      key:"siNoDesactivar",
      accept: () => {
        this.prestacionService.desactivarDiagnostico(this.codigo,diagnostico1.cie10).subscribe((resp) => {
          this.getDiagnostico();
            this.messageService.add({
              key:"myKey1",
              severity: "success",
              summary: "Exito",
              detail: "Se ha Desactivado dichod diagnostico",
            });
          },
          (error) => {
            this.messageService.add({
              key:"myKey1",
              severity: "success",
              summary: "Exito",
              detail: "errorrrrrrd",
            });

          }
        );
      },
      reject: () => {
        // console.log("no se borro");
      },
    });
  }
}
interface diagnostico{
  grupo:string,
  diagnostico:string,
  cie10:string,
  criterio:string,
  estado:string
}
