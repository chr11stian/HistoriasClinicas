import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PrestacionService} from "../../services/prestacion/prestacion.service";
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {MessageService} from "primeng/api";
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
  constructor(private prestacionService:PrestacionService
              ,private ref: DynamicDialogRef
              ,private config: DynamicDialogConfig
              ,private messageService:MessageService) {
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
      estado:new FormControl('',Validators.required),
    })
  }
  getDiagnostico(){
    this.prestacionService.getDiagnosticoPorCodigo(this.codigo).subscribe((resp)=>{
      this.data=resp['object']['diagnostico'];
    })
  }
  diagnostico:diagnostico
  botonActualizar(index){
    this.diagnostico=this.data[index];
    this.getFC('grupo').setValue(this.diagnostico.grupo)
    this.getFC('diagnostico').setValue(this.diagnostico.diagnostico)
    this.getFC('cie10').setValue(this.diagnostico.cie10)
    this.getFC('criterio').setValue(this.diagnostico.criterio)
    this.getFC('estado').setValue(this.diagnostico.estado)
  }
  saveDiagnostico(rowData?){
    let inputRequest:any={
      grupo:this.getFC('grupo').value,
      diagnostico:this.getFC('diagnostico').value,
      cie10:this.getFC('cie10').value,
      criterio:this.getFC('criterio').value,
      estado:this.getFC('estado').value,
    }
    if (this.isUpdate){
      // inputRequest={
      //   grupo:this.getFC('grupo').value,
      //   diagnostico:this.getFC('diagnostico').value,
      //   cie10:this.getFC('cie10').value,
      // }
      //   this.prestacionService.putDiagnosticoPorCodigo(this.codigo,this.diagnostico.cie10,inputRequest).subscribe(()=>{
      //     this.getDiagnostico();
      //   })
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
  }

}
interface diagnostico{
  grupo:string,
  diagnostico:string,
  cie10:string,
  criterio:string,
  estado:string
}
