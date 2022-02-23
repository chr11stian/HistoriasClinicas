import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {DiagnosticoComponent} from "../diagnostico/diagnostico.component";
import {PrestacionService} from "../../services/prestacion/prestacion.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-prestacion',
  templateUrl: './prestacion.component.html',
  styleUrls: ['./prestacion.component.css'],
  providers: [DialogService]
})
export class PrestacionComponent implements OnInit {
  prestacionFC:FormGroup
  openDialog:boolean=false;
  data:prestacion[]=[];
  sexo:any[]=[
    {name:'Masculino',code:'VARON'},
    {name:'Femenino',code:'MUJER'},
    {name:'Ambos',code:'AMBOS'}
  ]
  denominacion:any[]=[
    {name:'Meses',code:'MESES'},
    {name:'Años',code:'ANIOS'},
  ]

  isUpdate:boolean;

  constructor(public dialogService: DialogService,
              public prestacionService:PrestacionService,
              public messageService: MessageService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getPrestacion()
  }
  getPrestacion(){
    this.prestacionService.getPrestacion().subscribe((resp)=>{
      this.data=resp['object']
    })
  }

  buildForm(){
    this.prestacionFC=new FormGroup({
      codigo : new FormControl("",Validators.required),
      descripcion : new FormControl("",Validators.required),
      sexo : new FormControl("MASCULINO",Validators.required),
      edadMax : new FormControl("",Validators.required),
      edadMin : new FormControl("",Validators.required),
      denominacion : new FormControl("MESES",Validators.required),

    })
  }
  getFC(control: string): AbstractControl {
    return this.prestacionFC.get(control);
  }
  prestacion:prestacion
  agregarActualizar(index?){
    this.openDialog=true;
    this.prestacionFC.reset();
    if(index){
    this.prestacion=this.data[index]
      console.log('la prestacion',this.prestacion)
      this.getFC('codigo').setValue(this.prestacion.codigo)
      this.getFC('descripcion').setValue(this.prestacion.descripcion)
      this.getFC('sexo').setValue(this.prestacion.sexo)
      this.getFC('edadMax').setValue(this.prestacion.edadMax)
      this.getFC('edadMin').setValue(this.prestacion.edadMin)
      this.getFC('denominacion').setValue(this.prestacion.denominacion)
    }
  }
  save(){
    const inputRequest={
      codigo:this.getFC('codigo').value,
      descripcion:this.getFC('descripcion').value,
      sexo:this.getFC('sexo').value,
      edadMax:this.getFC('edadMax').value,
      edadMin:this.getFC('edadMin').value,
      denominacion:this.getFC('denominacion').value
    }
    if (!this.isUpdate){
      this.prestacionService.postPrestacion(inputRequest).subscribe((resp)=>{
        this.messageService.add({severity:'success', summary:'Exitoso', detail:'Registro Agregado'});
        this.getPrestacion();
        this.openDialog=false;
        this.prestacionFC.reset();
      })
    }
    else{
      this.prestacionService.putPrestacion(this.prestacion.codigo,inputRequest).subscribe((resp)=>{
        this.messageService.add({severity:'success', summary:'Exitoso', detail:'Registro Actualizado'});
        this.getPrestacion();
        this.openDialog=false;
        this.prestacionFC.reset();
      })

    }



  }
  cancelar(){
    this.openDialog=false;
    this.prestacionFC.reset();
  }
  abrirComponenteDiagnostico(rowData){
    // console.log(codigo)
    const ref = this.dialogService.open(DiagnosticoComponent, {
      data:{codigo:rowData.codigo,descripcion:rowData.descripcion},
      header: 'Agregar Diagnostico',
      width: '70%',
    });
  }

}
interface prestacion {
  codigo:       string;
  descripcion:  string;
  sexo:         string;
  edadMax:   number;
  edadMin:   number;
  denominacion: string;
}

