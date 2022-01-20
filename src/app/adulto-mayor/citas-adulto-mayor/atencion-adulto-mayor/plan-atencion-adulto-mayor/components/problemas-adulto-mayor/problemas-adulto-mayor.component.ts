import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ProblemasAgudos, ProblemasCronicos, problema} from "../models/plan-atencion-adulto-mayor.model";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {AdultoMayorService} from "../../services/adulto-mayor.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-problemas-adulto-mayor',
  templateUrl: './problemas-adulto-mayor.component.html',
  styleUrls: ['./problemas-adulto-mayor.component.css'],
  providers:[DialogService]
})
export class ProblemasAdultoMayorComponent implements OnInit {
  formProblemasAgudos: FormGroup;
  formAtencion: FormGroup;
  dialogAtencion: boolean=false;
  dialogProblemaAgudo:boolean=false;
  dataProblemasCronicos:any[]=[];
  dataProblemasAgudos:any[]=[];
  cronicoAgudo="";
  nombreProblemaAux:string;
  ref: DynamicDialogRef;
  isUpdate:boolean=false;
  tipoDoc: string = ''
  nroDoc:string=''
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];


  constructor(private messageService: MessageService,
              private form:FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private dialog:DialogService,
              private problemasService: AdultoMayorService) {
    this.builForm();

  }

  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDoc = params['tipoDoc']
            this.nroDoc = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/adulto-mayor/citas'])
          }
        })
    this.recuperarProblemasAgudos();
    this.recuperarProblemasCronicos();
  }

  builForm() {
    this.formProblemasAgudos = this.form.group({
      fecha:new FormControl("",[Validators.required]),
      nombreProblema:new FormControl("",[Validators.required]),
      observaciones:new FormControl("",[Validators.required]),
      controlado:new FormControl("",[Validators.required])
    }),
    this.formAtencion=this.form.group({
      fechaA:new FormControl("",[Validators.required]),
      observacionesA:new FormControl("",[Validators.required])
    })
  }
  openNewAgudo(){
    this.isUpdate = false;
    this.formProblemasAgudos.reset();
    this.dialogProblemaAgudo = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogProblemaAgudo = false;
    this.dialogAtencion = false;
  }
  saveAgudo(){
    this.isUpdate = false;
    let problemaCronico: any = {
      nombreProblema:this.formProblemasAgudos.value.nombreProblema,
      observacion:this.formProblemasAgudos.value.observaciones,
      fecha:this.formProblemasAgudos.value.fecha,
      controlado:this.formProblemasAgudos.value.controlado,

    }
    let problemaAgudo:problema = {
      nombreProblema:this.formProblemasAgudos.value.nombreProblema,
      observacion:this.formProblemasAgudos.value.observaciones,
      fecha:this.formProblemasAgudos.value.fecha,

    }
    if(this.cronicoAgudo=="agudo"){
    if(problemaAgudo!=null){
      this.problemasService.addProblemasAgudos(this.nroDoc, problemaAgudo).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });}
    }
    else{
      if(problemaCronico!=null){
        this.problemasService.addProblemasCronicos(this.nroDoc, problemaCronico).subscribe((res: any) => {
          console.log('se guardo correctamente ', res.object);
          this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
          });
        });}
    }

    /*****hacer refresh  a la pagina sin que se actualice*/
    this.dialogProblemaAgudo = false;
    location.reload();

  }
  recuperarProblemasCronicos(){
    this.problemasService.getProblemasCronicos(this.nroDoc).subscribe((res: any) => {
      console.log(res.object);
      let aux:any;
      for(let i=0;i<res.object.length;i++){
        aux= {
          nombreProblema: res.object[i].nombreProblema,
          fecha: res.object[i].fecha,
          observacion: res.object[i].observacion,
          controlado:res.object[i].controlado
        }

        this.dataProblemasCronicos.push(aux);
      }
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    })
  }
  recuperarProblemasAgudos(){
    this.problemasService.getProblemasAgudos(this.nroDoc).subscribe((res: any) => {
      console.log(res.object);
      let aux:any;
      if(res.object != []){
        for(let i=0;i<res.object.length;i++){
          aux= {
            nombreProblema: res.object[i].id,
            fecha: res.object[i].atencion[0].fecha,
            observacion: res.object[i].atencion[0].observacion
          }
          if(res.object[i].atencion.length>=3){
            console.log("atencion mayor a 1");
            aux= {
              nombreProblema: res.object[i].id,
              fecha1: res.object[i].atencion[0].fecha,
              observacion1: res.object[i].atencion[0].observacion,
              fecha2: res.object[i].atencion[1].fecha,
              observacion2: res.object[i].atencion[1].observacion,
              fecha3: res.object[i].atencion[2].fecha,
              observacion3: res.object[i].atencion[2].observacion
            }
          }
          if(res.object[i].atencion.length==2){
            console.log("atencion igual a 2");
            aux= {
              nombreProblema: res.object[i].id,
              fecha1: res.object[i].atencion[0].fecha,
              observacion1: res.object[i].atencion[0].observacion,
              fecha2: res.object[i].atencion[1].fecha,
              observacion2: res.object[i].atencion[1].observacion,
            }
          }
          if(res.object[i].atencion.length==1){
            console.log("atencion igual a 1");
            aux= {
              nombreProblema: res.object[i].id,
              fecha1: res.object[i].atencion[0].fecha,
              observacion1: res.object[i].atencion[0].observacion
            }
          }

          this.dataProblemasAgudos.push(aux);
        }
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      }
      else{
        this.messageService.add({
          severity: "warn",
          summary: "Error",
          detail: "No tiene problemas Agudos"
        });
      }

    })
  }
  openAgregarAtenciones(row,index){
      let aux={index:index, row:row}
      console.log(aux);
      console.log(aux.row.nombreProblema);
      if(aux.row.fecha3==undefined) {
        this.isUpdate = false;
        this.formAtencion.reset();
        this.dialogAtencion = true;
        this.nombreProblemaAux = aux.row.nombreProblema;
      }
      else{
        this.messageService.add({severity:'warn', summary:'error', detail:'No se puede agregar más atenciones'});
      }
  }
  saveAtencion() {
    let data = {};
    if(this.formAtencion.value.fechaA!=null){
      data = {
        nombreProblema:this.nombreProblemaAux,
        fecha:this.formAtencion.value.fechaA,
        observacion:this.formAtencion.value.observacionesA
      }

      if(this.dataProblemasAgudos!=null) {
        if (this.cronicoAgudo == "agudo") {
          this.problemasService.putProblemasAgudosItems(this.nroDoc, data).subscribe((res: any) => {
            console.log('se guardo correctamente ', res.object);
            this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: res.mensaje
            });
          });
        }
        else{
            this.problemasService.putProblemasCronicosItems(this.nroDoc, data).subscribe((res: any) => {
              console.log('se guardo correctamente ', res.object);
              this.messageService.add({
                severity: "success",
                summary: "Exito",
                detail: res.mensaje
              });
            });
        }
      }
    }
    else{
        this.messageService.add({severity:'warn', summary:'error', detail:'Datos ingresados incorrectos, vuelva a ingresar'});
    }

    this.dialogAtencion=false;
    window.location.reload();

  }
}
