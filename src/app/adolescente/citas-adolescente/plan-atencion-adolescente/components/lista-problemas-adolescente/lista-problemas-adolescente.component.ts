import { Component, OnInit } from '@angular/core';
import {AdolecenteService} from "../../services/adolecente.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lista-problemas-adolescente',
  templateUrl: './lista-problemas-adolescente.component.html',
  styleUrls: ['./lista-problemas-adolescente.component.css']
})
export class ListaProblemasAdolescenteComponent implements OnInit {
  twoOptions=[{label:'Si',value:'si'},{label:'NO',value:'no'}]
  listaProblemas=[]
  listaProblemasAgudo=[];
  isUpdate=false;
  display=false;
  problemasFG:FormGroup;
  cronicoAgudo='';
  nroDNI:string
  constructor(private adolecenteService:AdolecenteService
              ,private messageService: MessageService,
              private rutaActiva: ActivatedRoute) { }
  buildFG(){
    this.problemasFG=new FormGroup({
      fecha:new FormControl('',Validators.required),
      controlado:new FormControl('',Validators.required),
      problemaCronico:new FormControl('',Validators.required),
      observaciones:new FormControl('',Validators.required),
    })
  }

  getProblemas(){
    this.adolecenteService.getProblemas(this.nroDNI).subscribe((resp)=>{
        this.listaProblemas=resp['object'];
    });
  }
  getProblemasAgudos(){
    this.adolecenteService.getProblemasAgudo(this.nroDNI).subscribe((resp)=>{
      this.listaProblemasAgudo=resp['object']
    })
  }
  ngOnInit(): void {
    this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc
    this.buildFG()
    this.getProblemas();
    this.getProblemasAgudos();
  }
  getFC(control: string): AbstractControl {
    return this.problemasFG.get(control);
  }
  getFechaHora(date:Date){
    if(date.toString()!==''){
      let hora=date.toLocaleTimeString();
      // return fecha+' '+hora;
      let dd = date.getDate();
      let dd1;
      if(dd<10){
        dd1='0'+dd;
        dd=dd1
      }
      let mm = date.getMonth() + 1; //January is 0!
      let yyyy = date.getFullYear();
      return yyyy+'-'+mm+'-'+dd
    }
    else{
      return '';
    }
  }
  agregar(){
    this.display=true;
    this.problemasFG.reset();
  }
  save(){
    // console.log(this.problemasFG.value)
    const requestInput={
      fecha:this.getFechaHora(this.getFC('fecha').value),
      // fecha:'2021-12-12',
      controlado:this.getFC('controlado').value,
      nombreProblema:this.getFC('problemaCronico').value,
      observacion:this.getFC('observaciones').value,
    }
    // console.log(requestInput)

    if(this.cronicoAgudo=="cronico"){
      this.adolecenteService.addProblema(this.nroDNI,requestInput).subscribe((resp)=>{
            if(resp['cod']=='2003') {
              this.display=false
              this.getProblemas();
              this.messageService.add({key: 'myKey1',severity:'success', summary:'Satisfactorio', detail:'Se registro problema Crónico'});
            }
          },(error)=>{
            if(true){
              this.messageService.add({key: 'myKey1',severity:'warn', summary:'error', detail:'Ya existe Problema Crónico'});
            }
          }
      )
    }
    else{
      this.adolecenteService.addProblemaAgudo(this.nroDNI,requestInput).subscribe((resp)=>{
            if(resp['cod']=='2003') {
              this.display=false
              this.getProblemasAgudos();
              this.messageService.add({key: 'myKey1',severity:'success', summary:'Satisfactorio', detail:'Se registro problema Agudo'});
            }
          },(error)=>{
            if(true){
              this.messageService.add({key: 'myKey1',severity:'warn', summary:'error', detail:'Ya existe Problema Agudo'});
            }
          }
      )

    }
  }
  cancel(){
    this.display=false;
  }


}
