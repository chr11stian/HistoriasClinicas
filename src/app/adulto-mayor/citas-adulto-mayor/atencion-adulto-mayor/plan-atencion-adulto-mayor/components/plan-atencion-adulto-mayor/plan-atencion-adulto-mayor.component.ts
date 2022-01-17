import { Component, OnInit } from '@angular/core';
import {PlanEvaluacionAdulto} from "../models/plan-atencion-adulto-mayor.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {ModalPlanAtencionAdultoMayorComponent} from "./modal-plan-atencion/modal-plan-atencion-adulto-mayor.component";
import Swal from "sweetalert2";
import {AdultoMayorService} from "../../services/adulto-mayor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalAtencionPlanComponent} from "./modal-atencion-plan/modal-atencion-plan.component";

@Component({
  selector: 'app-plan-atencion-adulto-mayor',
  templateUrl: './plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./plan-atencion-adulto-mayor.component.css'],
  providers:[DialogService]
})
export class PlanAtencionAdultoMayorComponent implements OnInit {
    evaluacionGeneral: any[]=[];             /****item 1*****/
    inmunizaciones: any[]=[];                /****item 2*****/
    evalucionBucal: any[]=[];                /****item 3*****/
    intervencionesPreventivas: any[]=[];     /****item 4*****/
    administracionMicronutrientes: any[]=[]; /****item 5*****/
    consejeriaIntegral: any[]=[];            /****item 6*****/
    visitaDomiciliaria: any[]=[];            /****item 7*****/
    temasEducativos: any[]=[];               /****item 8*****/
    atencionPrioridades: any[]=[];           /****item 9*****/
    ref: DynamicDialogRef;
    formPlan:FormGroup;
    tipoDoc="";
    nroDoc:"";
  constructor(private formBuilder: FormBuilder,
              private dialog:DialogService,
              private messageService: MessageService,
              private planService:AdultoMayorService,
              private route: ActivatedRoute,
              private router: Router) { }

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
      this.recuperarPlanEvaluacion();
      this.recuperarInmunizaciones();
      this.recuperarevalucionBucal();
      this.recuperarintervencionesPreventivas();
      this.recuperaradministracionMicronutrientes();
      this.recuperartemasEducativos();
      this.recuperaratencionPrioridades();
      this.recuperarconsejeriaIntegral();
      this.recuperarvisitaDomiciliaria();
  }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN EVALUACION GENERAL*******************/
  openDialogPlan(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "EVALUACION GENERAL, FUNCIONAL, MENTAL, SOCIAL Y FISICO",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if((data.descripcion!==undefined || data.descripcion!=null || data.descripcion!='') && (data.fecha!==undefined || data.fecha!=null || data.fecha!=''))
          {this.evaluacionGeneral.push(data);
              this.planService.addPlanGeneralFuncional(this.nroDoc, data).subscribe((res: any) => {
                  console.log('se guardo correctamente ', res.object);
                  this.messageService.add({
                      severity: "success",
                      summary: "Exito",
                      detail: res.mensaje
                  });
              });
          }

          else{
              this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
          }
          console.log(this.formPlan);

      })
  }
  openDialogAgregarPlanEvaluacionItems(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
      this.ref = this.dialog.open(ModalAtencionPlanComponent, {
          header: "EVALUACION GENERAL, FUNCIONAL, MENTAL, SOCIAL Y FISICO",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal atencion para editar",data)
          // console.log(data.fecha);
          if(data!=undefined && data!=null && data!='')
          {
              let auxAtencion = {
                  descripcion :  aux.row.descripcion,
                  lugar:data.lugar,
                  observacion:data.observacion,
                  fecha:data.fecha
              }
              let dataArrayPrincipal = {
                  lugar2:data.lugar,
                  observacion2:data.observacion,
                  fecha2:data.fecha
              }
              // this.evaluacionGeneral.push(dataArrayPrincipal);
              this.planService.addItemsPlanGeneralFuncional(this.nroDoc, auxAtencion).subscribe((res: any) => {
                  console.log('se guardo correctamente ', res.object);
                  this.messageService.add({
                                  severity: "success",
                                  summary: "Exito",
                                  detail: res.mensaje
                              });
              });
          }

          else{
              this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
          }
      })

    }
  openDialogEditarPlanEvaluacionItems(row,index,indice) {
      let aux={
          index: index,
          row: row
      }
      let dataAux={};
      if(indice == 1) {
          // console.log("aux",aux);
          dataAux = {
              lugar: aux.row.lugar,
              observacion: aux.row.observacion,
              fecha: aux.row.fecha
          }
      }
      if(indice == 2) {
          // console.log("aux",aux);
          dataAux = {
              lugar: aux.row.lugar2,
              observacion: aux.row.observacion2,
              fecha: aux.row.fecha2
          }
      }
      if(indice==3){
          dataAux = {
              lugar: aux.row.lugar3,
              observacion: aux.row.observacion3,
              fecha: aux.row.fecha3
          }
      }

      console.log("aux data",dataAux);
      this.ref = this.dialog.open(ModalAtencionPlanComponent, {
          header: "EVALUACION GENERAL, FUNCIONAL, MENTAL, SOCIAL Y FISICO",
          style:{
              width:"60%"
          },
          contentStyle: {
              overflow: "auto",

          },
         data:dataAux
      })
      this.ref.onClose.subscribe((data: any) => {
          console.log('data de modal atenciones ', data)
          let auxAtencion={}
          let auxiliar1={}
          if(data!=null && data!=undefined) {
              if (indice == 1) {
                  auxAtencion = {
                      descripcion: aux.row.descripcion,
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha
                  }
                  auxiliar1 = {
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha
                  }
              }
              if (indice == 2) {
                  auxAtencion = {
                      descripcion: aux.row.descripcion,
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha2
                  }
                  auxiliar1 = {
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha2
                  }
              }
              if (indice == 3) {
                  auxAtencion = {
                      descripcion: aux.row.descripcion,
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha3
                  }
                  auxiliar1={
                      lugar: data.row.lugar,
                      observacion: data.row.observacion,
                      fecha: aux.row.fecha3
                  }
              }
              console.log("data Aux:", dataAux);
              console.log("auxiliar 1 " , auxiliar1);
              if(JSON.stringify(dataAux)!=JSON.stringify(auxiliar1)) {
                  console.log("entrando a modificar");
                  this.planService.updateItemsPlanGeneralFuncional(this.nroDoc, auxAtencion).subscribe((res: any) => {
                      // console.log('se guardo correctamente ', res.object);

                      this.messageService.add({
                          severity: "success",
                          summary: "Exito",
                          detail: res.mensaje
                      });
                  });
              }
              else{
                  console.log("entrnado a no modificar");
                  this.messageService.add({
                      severity: 'warn',
                      summary: 'error',
                      detail: 'No se puede modifico ningún dato'
                  });

              }

          }
          else{this.messageService.add({
              severity: 'warn',
              summary: 'error',
              detail: 'No se puede modifico ningún dato'
          });

          }
      })

  }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN INMUNIZACIONES***********************/
  openDialogPlanInmunizaciones(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "INMUNIZACIONES",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.inmunizaciones.push(data);
          console.log(this.formPlan);
      })

  }
  openDialogEditarPlanInmunizaciones(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "INMUNIZACIONES",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.inmunizaciones.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanInmunizaciones(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.inmunizaciones.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN EVALUACION BUCAL*********************/
  openDialogPlanEvaluacionBucal(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "EVALUACIÓN BUCAL",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.evalucionBucal.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanEvaluacionBucal(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "EVALUACION BUCAL",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.evalucionBucal.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanEvaluacionBucal(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.evaluacionGeneral.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN INTERVENCIONES PREVENTIVAS***********/
  openDialogPlanIntervenciones(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "INTERVENCIONES PREVENTIVAS",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.intervencionesPreventivas.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanIntervenciones(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "INTERVENCIONES PREVENTIVAS",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.intervencionesPreventivas.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanIntervenciones(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.intervencionesPreventivas.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN ADMINISTRACION DE MICRONUTRIENTES****/
  openDialogPlanMicronutrientes(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "ADMINISTRACIÓN DE MICRONUTRIENTES",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.administracionMicronutrientes.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanMicronutrientes(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "ADMINISTRACIÓN DE MICRONUTRIENTES",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.administracionMicronutrientes.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanMicronutrientes(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.administracionMicronutrientes.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN CONSEJERIA INTEGRAL******************/
  openDialogPlanConsejeria(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "CONSEJERÍA INTEGRAL",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.consejeriaIntegral.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanConsejeria(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "CONSEJERÍA INTEGRAL",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.consejeriaIntegral.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanConsejeria(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.consejeriaIntegral.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN VISITA DOMICILIARIA******************/
  openDialogPlanVisita(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "VISITA DOMICILIARIA",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.visitaDomiciliaria.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanVisita(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "VISITA DOMICILIARIA",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.visitaDomiciliaria.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanVisita(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.visitaDomiciliaria.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN TEMAS EDUCATIVOS*********************/
  openDialogPlanEducativos(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "TEMAS EDUCATIVOS",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.temasEducativos.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanEducativos(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "TEMAS EDUCATIVOS",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.temasEducativos.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanEducativos(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.temasEducativos.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /********DATOS RECIBIDOS DE LOS MODALES PLAN ATENCION DE PRIORIDADES SANITARIAS***/
  openDialogPlanPrioridades(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "ATENCIÓN DE PRIORIDADES SANITARIAS",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal tratamiento",data)
          if(data!==undefined)
              this.atencionPrioridades.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanPrioridades(row,index) {
        let aux={
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
            header: "ATENCIÓN DE PRIORIDADES SANITARIAS",
            style:{
                width:"60%"
            },
            contentStyle: {
                overflow: "auto",

            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal tratamiento ', data)
            if(data!==undefined) {
                this.atencionPrioridades.splice(data.index, 1,data.row);
            };
        })
    }
  eliminarPlanPrioridades(index){
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.atencionPrioridades.splice(index,1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
  /***********RECUPERAR DATOS **/
  recuperarPlanEvaluacion(){
      this.planService.getPlanGeneralFuncional(this.nroDoc).subscribe((res: any) => {
          let aux:any;
          console.log(res.object);
          for(let i=0;i<res.object.length;i++){
              aux= {
                  descripcion: res.object[i].id,
                  fecha: res.object[i].atencion[0].fecha,
                  observacion: res.object[i].atencion[0].observacion,
                  lugar:res.object[i].atencion[0].lugar
              }
              if(res.object[i].atencion.length>=3){
                  console.log("atencion mayor a 1");
                  aux= {
                      descripcion: res.object[i].id,
                      fecha: res.object[i].atencion[0].fecha,
                      observacion: res.object[i].atencion[0].observacion,
                      lugar: res.object[i].atencion[0].lugar,
                      fecha2: res.object[i].atencion[1].fecha,
                      observacion2: res.object[i].atencion[1].observacion,
                      lugar2: res.object[i].atencion[1].lugar,
                      fecha3: res.object[i].atencion[2].fecha,
                      observacion3: res.object[i].atencion[2].observacion,
                      lugar3: res.object[i].atencion[2].lugar,
                  }
              }
              if(res.object[i].atencion.length==2){
                  console.log("atencion igual a 2");
                  aux= {
                      descripcion: res.object[i].id,
                      fecha: res.object[i].atencion[0].fecha,
                      observacion: res.object[i].atencion[0].observacion,
                      lugar: res.object[i].atencion[0].lugar,
                      fecha2: res.object[i].atencion[1].fecha,
                      observacion2: res.object[i].atencion[1].observacion,
                      lugar2: res.object[i].atencion[1].lugar,
                  }
              }
              if(res.object[i].atencion.length==1){
                  console.log("atencion igual a 1");
                  aux= {
                      descripcion: res.object[i].id,
                      fecha: res.object[i].atencion[0].fecha,
                      observacion: res.object[i].atencion[0].observacion,
                      lugar:res.object[i].atencion[0].lugar
                  }
              }

              this.evaluacionGeneral.push(aux);
          }
          this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: res.mensaje
          });
      })
  }
  recuperarInmunizaciones(){
        this.planService.getPlanInmunizaciones(this.nroDoc).subscribe((res: any) => {
            let aux:any;
            console.log(res.object);
            for(let i=0;i<res.object.length;i++){
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
                if(res.object[i].atencion.length>=3){
                    console.log("atencion mayor a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                        fecha3: res.object[i].atencion[2].fecha,
                        observacion3: res.object[i].atencion[2].observacion,
                        lugar3: res.object[i].atencion[2].lugar,
                    }
                }
                if(res.object[i].atencion.length==2){
                    console.log("atencion igual a 2");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                    }
                }
                if(res.object[i].atencion.length==1){
                    console.log("atencion igual a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar:res.object[i].atencion[0].lugar
                    }
                }

                this.inmunizaciones.push(aux);
            }
            this.messageService.add({
                severity: "success",
                summary: "Exito",
                detail: res.mensaje
            });
        })
    }
  recuperarevalucionBucal(){
        this.planService.getEvaluacionBucal(this.nroDoc).subscribe((res: any) => {
            let aux:any;
            console.log(res.object);
            for(let i=0;i<res.object.length;i++){
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
                if(res.object[i].atencion.length>=3){
                    console.log("atencion mayor a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                        fecha3: res.object[i].atencion[2].fecha,
                        observacion3: res.object[i].atencion[2].observacion,
                        lugar3: res.object[i].atencion[2].lugar,
                    }
                }
                if(res.object[i].atencion.length==2){
                    console.log("atencion igual a 2");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                    }
                }
                if(res.object[i].atencion.length==1){
                    console.log("atencion igual a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar:res.object[i].atencion[0].lugar
                    }
                }

                this.evalucionBucal.push(aux);
            }
            this.messageService.add({
                severity: "success",
                summary: "Exito",
                detail: res.mensaje
            });
        })
    }
  recuperarintervencionesPreventivas(){
        this.planService.getEvaluacionBucal(this.nroDoc).subscribe((res: any) => {
            let aux:any;
            console.log(res.object);
            for(let i=0;i<res.object.length;i++){
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
                if(res.object[i].atencion.length>=3){
                    console.log("atencion mayor a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                        fecha3: res.object[i].atencion[2].fecha,
                        observacion3: res.object[i].atencion[2].observacion,
                        lugar3: res.object[i].atencion[2].lugar,
                    }
                }
                if(res.object[i].atencion.length==2){
                    console.log("atencion igual a 2");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                    }
                }
                if(res.object[i].atencion.length==1){
                    console.log("atencion igual a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar:res.object[i].atencion[0].lugar
                    }
                }

                this.evalucionBucal.push(aux);
            }
            this.messageService.add({
                severity: "success",
                summary: "Exito",
                detail: res.mensaje
            });
        })
    }
  recuperaradministracionMicronutrientes(){
    this.planService.getMicronutrientes(this.nroDoc).subscribe((res: any) => {
        let aux:any;
        console.log(res.object);
        for(let i=0;i<res.object.length;i++){
            aux= {
                descripcion: res.object[i].id,
                fecha: res.object[i].atencion[0].fecha,
                observacion: res.object[i].atencion[0].observacion,
                lugar:res.object[i].atencion[0].lugar
            }
            if(res.object[i].atencion.length>=3){
                console.log("atencion mayor a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                    fecha3: res.object[i].atencion[2].fecha,
                    observacion3: res.object[i].atencion[2].observacion,
                    lugar3: res.object[i].atencion[2].lugar,
                }
            }
            if(res.object[i].atencion.length==2){
                console.log("atencion igual a 2");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                }
            }
            if(res.object[i].atencion.length==1){
                console.log("atencion igual a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
            }

            this.administracionMicronutrientes.push(aux);
        }
        this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
        });
    })
}
  recuperarconsejeriaIntegral(){
    this.planService.getConsejeriaIntegral(this.nroDoc).subscribe((res: any) => {
        let aux:any;
        console.log(res.object);
        for(let i=0;i<res.object.length;i++){
            aux= {
                descripcion: res.object[i].id,
                fecha: res.object[i].atencion[0].fecha,
                observacion: res.object[i].atencion[0].observacion,
                lugar:res.object[i].atencion[0].lugar
            }
            if(res.object[i].atencion.length>=3){
                console.log("atencion mayor a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                    fecha3: res.object[i].atencion[2].fecha,
                    observacion3: res.object[i].atencion[2].observacion,
                    lugar3: res.object[i].atencion[2].lugar,
                }
            }
            if(res.object[i].atencion.length==2){
                console.log("atencion igual a 2");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                }
            }
            if(res.object[i].atencion.length==1){
                console.log("atencion igual a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
            }

            this.consejeriaIntegral.push(aux);
        }
        this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
        });
    })
}
  recuperarvisitaDomiciliaria(){
    this.planService.getVisitaDomiciliaria(this.nroDoc).subscribe((res: any) => {
        let aux:any;
        console.log(res.object);
        for(let i=0;i<res.object.length;i++){
            aux= {
                descripcion: res.object[i].id,
                fecha: res.object[i].atencion[0].fecha,
                observacion: res.object[i].atencion[0].observacion,
                lugar:res.object[i].atencion[0].lugar
            }
            if(res.object[i].atencion.length>=3){
                console.log("atencion mayor a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                    fecha3: res.object[i].atencion[2].fecha,
                    observacion3: res.object[i].atencion[2].observacion,
                    lugar3: res.object[i].atencion[2].lugar,
                }
            }
            if(res.object[i].atencion.length==2){
                console.log("atencion igual a 2");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                }
            }
            if(res.object[i].atencion.length==1){
                console.log("atencion igual a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
            }

            this.visitaDomiciliaria.push(aux);
        }
        this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
        });
    })
}
  recuperartemasEducativos(){
    this.planService.getTemasEducativos(this.nroDoc).subscribe((res: any) => {
        let aux:any;
        console.log(res.object);
        for(let i=0;i<res.object.length;i++){
            aux= {
                descripcion: res.object[i].id,
                fecha: res.object[i].atencion[0].fecha,
                observacion: res.object[i].atencion[0].observacion,
                lugar:res.object[i].atencion[0].lugar
            }
            if(res.object[i].atencion.length>=3){
                console.log("atencion mayor a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                    fecha3: res.object[i].atencion[2].fecha,
                    observacion3: res.object[i].atencion[2].observacion,
                    lugar3: res.object[i].atencion[2].lugar,
                }
            }
            if(res.object[i].atencion.length==2){
                console.log("atencion igual a 2");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar: res.object[i].atencion[0].lugar,
                    fecha2: res.object[i].atencion[1].fecha,
                    observacion2: res.object[i].atencion[1].observacion,
                    lugar2: res.object[i].atencion[1].lugar,
                }
            }
            if(res.object[i].atencion.length==1){
                console.log("atencion igual a 1");
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
            }

            this.temasEducativos.push(aux);
        }
        this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
        });
    })
}
  recuperaratencionPrioridades(){
        this.planService.getPrioridadesSanitarias(this.nroDoc).subscribe((res: any) => {
            let aux:any;
            console.log(res.object);
            for(let i=0;i<res.object.length;i++){
                aux= {
                    descripcion: res.object[i].id,
                    fecha: res.object[i].atencion[0].fecha,
                    observacion: res.object[i].atencion[0].observacion,
                    lugar:res.object[i].atencion[0].lugar
                }
                if(res.object[i].atencion.length>=3){
                    console.log("atencion mayor a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                        fecha3: res.object[i].atencion[2].fecha,
                        observacion3: res.object[i].atencion[2].observacion,
                        lugar3: res.object[i].atencion[2].lugar,
                    }
                }
                if(res.object[i].atencion.length==2){
                    console.log("atencion igual a 2");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar: res.object[i].atencion[0].lugar,
                        fecha2: res.object[i].atencion[1].fecha,
                        observacion2: res.object[i].atencion[1].observacion,
                        lugar2: res.object[i].atencion[1].lugar,
                    }
                }
                if(res.object[i].atencion.length==1){
                    console.log("atencion igual a 1");
                    aux= {
                        descripcion: res.object[i].id,
                        fecha: res.object[i].atencion[0].fecha,
                        observacion: res.object[i].atencion[0].observacion,
                        lugar:res.object[i].atencion[0].lugar
                    }
                }

                this.atencionPrioridades.push(aux);
            }
            this.messageService.add({
                severity: "success",
                summary: "Exito",
                detail: res.mensaje
            });
        })
    }
}
