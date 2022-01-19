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
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
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
  openDialogInmunizaciones(){
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
          console.log("data de modal inmunizaciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)!=JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)==JSON.stringify(dataValidated))
          {this.inmunizaciones.push(data);
              this.planService.addPlanInmunizaciones(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarInmunizaciones(row,index,indice){
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
              this.planService.addItemsImnunizaciones(this.nroDoc, auxAtencion).subscribe((res: any) => {
                  console.log('se guardo correctamente ', res.object);
                  this.messageService.add({
                      severity: "success",
                      summary: "Exito",
                      detail: res.mensaje
                  });
              });
              /****refrescar la pagina*/
          }

          else{
              this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
          }
      })

  }
  openDialogEditarPlanInmunizaciones(row,index,indice) {
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
                  this.planService.updateItemsImnunizaciones(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
  /********DATOS RECIBIDOS DE LOS MODALES PLAN EVALUACION BUCAL*********************/
  openDialogPlanEvaluacionBucal(){
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
          console.log("data de modal inmunizaciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.evalucionBucal.push(data);
              this.planService.addEvaluacionBucal(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarPlanEvaluacionBucal(row,index,indice) {
      let aux={
          index: index,
          row: row
      }
      console.log("indice"+indice);
      this.ref = this.dialog.open(ModalAtencionPlanComponent, {
          header: "EVALUACION BUCAL",
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
              this.planService.addItemsEvaluacionBucal(this.nroDoc, auxAtencion).subscribe((res: any) => {
                  console.log('se guardo correctamente ', res.object);
                  this.messageService.add({
                      severity: "success",
                      summary: "Exito",
                      detail: res.mensaje
                  });
              });
              /****refrescar la pagina*/
          }

          else{
              this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
          }
      })

  }
  openDialogEditarPlanEvaluacionBucal(row,index,indice) {
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
          header: "EVALUACION BUCAL",
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
                  this.planService.updateItemsEvaluacionBucal(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
          console.log("data de modal intervenciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.intervencionesPreventivas.push(data);
              this.planService.addEvaluacionIntervenciones(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarPlanIntervenciones(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "INTERVENCIONES PREVENTIVAS ",
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
                this.planService.addItemsIntervenciones(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarPlanIntervenciones(row,index,indice) {
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
            header: "INTERVENCIONES PREVENTIVAS",
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
                    this.planService.updateItemsIntervenciones(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
  /********DATOS RECIBIDOS DE LOS MODALES PLAN ADMINISTRACION DE MICRONUTRIENTES****/
  openDialogPlanMicronutrientes(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "ADMINISTRACION MICRONUTRIENTES",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal intervenciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.administracionMicronutrientes.push(data);
              this.planService.addMicronutrientes(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregaItemsAdministracionMacronutrientes(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "ADMINISTRACION MACRONUTRIENTES ",
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
                this.planService.addItemsMicronutrientes(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarItemsAdministracionMacronutrientes(row,index,indice) {
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
            header: "ADMINISTRACION MACRONUTRIENTES",
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
                    this.planService.updateItemsMicronutrientes(this.nroDoc, auxAtencion).subscribe((res: any) => {
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

  /********DATOS RECIBIDOS DE LOS MODALES PLAN CONSEJERIA INTEGRAL******************/
  openDialogPlanConsejeria(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "CONSEJERIA INTEGRAL",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal intervenciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)!=JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.consejeriaIntegral.push(data);
              this.planService.addConsejeriaIntegral(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarItemsConsejeriaIntegral(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "CONSEJERIA INTEGRAL",
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
                this.planService.addItemsConsejeria(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarItemsConsejeriaIntegral(row,index,indice) {
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
            header: "CONSEJERIA INTEGRAL",
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
                    this.planService.updateItemsConsejeria(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
          console.log("data de modal intervenciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.visitaDomiciliaria.push(data);
              this.planService.addVisitaDomiciliaria(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarItemsVisitaDomiciliaria(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "CONSEJERIA INTEGRAL",
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
                this.planService.addItemsVisitaDomiciliaria(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarItemsVisitaDomiciliaria(row,index,indice) {
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
            header: "VISITA DOMICILIARIA",
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
                    this.planService.updateItemsVisitaDomiciliaria(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
          console.log("data de modal intervenciones",data)
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.temasEducativos.push(data);
              this.planService.addTemasEducativos(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarItemsTemasEducativos(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "TEMAS EDUCATIVOS",
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
                this.planService.addItemsTemasEducativos(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarItemsTemasEducativos(row,index,indice) {
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
            header: "TEMAS EDUCATIVOS",
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
                    this.planService.updateItemsTemasEducativos(this.nroDoc, auxAtencion).subscribe((res: any) => {
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

  /********DATOS RECIBIDOS DE LOS MODALES PLAN ATENCION DE PRIORIDADES SANITARIAS***/
  openDialogPlanPrioridades(){
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "PRIORIDADES SANITARIAS",
          style:{
              width:"60%"
          },
          contentStyle:{
              overflow:"auto",

          },
      })
      this.ref.onClose.subscribe((data:any)=>{
          console.log("data de modal prioridades",data);
          let dataValidated={descripcion: '', fecha: '', observacion: '', lugar: ''}
          console.log(dataValidated);
          // if(JSON.stringify(data)==JSON.stringify(dataValidated)){console.log("si son iguales");}else{console.log("no son iguales")}
          if(JSON.stringify(data)!=JSON.stringify(dataValidated))
          {this.atencionPrioridades.push(data);
              this.planService.addPrioridadesSanitarias(this.nroDoc, data).subscribe((res: any) => {
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
  openDialogAgregarItemsPrioridades(row,index,indice) {
        let aux={
            index: index,
            row: row
        }
        console.log("indice"+indice);
        this.ref = this.dialog.open(ModalAtencionPlanComponent, {
            header: "PRIORIDADES SANITARIAS",
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
                this.planService.addItemsPrioridadesSanitarias(this.nroDoc, auxAtencion).subscribe((res: any) => {
                    console.log('se guardo correctamente ', res.object);
                    this.messageService.add({
                        severity: "success",
                        summary: "Exito",
                        detail: res.mensaje
                    });
                });
                /****refrescar la pagina*/
            }

            else{
                this.messageService.add({severity:'warn', summary:'error', detail:'No se puede guardar campos vacios'});
            }
        })

    }
  openDialogEditarItemsPrioridades(row,index,indice) {
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
            header: "PRIORIDADES SANITARIAS",
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
                    this.planService.updateItemsPrioridadesSanitarias(this.nroDoc, auxAtencion).subscribe((res: any) => {
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
                  console.log("atencion mayor a 3");
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
              console.log("evaluacion:", this.evalucionBucal);
          }
          this.messageService.add({
              severity: "success",
              summary: "Exito",
              detail: res.mensaje
          });
      })
    }
  recuperarintervencionesPreventivas(){
        this.planService.getEvaluacionIntervenciones(this.nroDoc).subscribe((res: any) => {
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

                this.intervencionesPreventivas.push(aux);
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
