import { Component, OnInit } from '@angular/core';
import {PlanEvaluacionAdulto} from "../models/plan-atencion-adulto-mayor.model";
import {ModalTratamientoComponent} from "../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/component/tratamiento/modal-tratamiento/modal-tratamiento.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {ModalPlanAtencionAdultoMayorComponent} from "./modal-plan-atencion-adulto-mayor/modal-plan-atencion-adulto-mayor.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-plan-atencion-adulto-mayor',
  templateUrl: './plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./plan-atencion-adulto-mayor.component.css'],
  providers:[DialogService]
})
export class PlanAtencionAdultoMayorComponent implements OnInit {
    evaluacionGeneral: PlanEvaluacionAdulto[]=[];             /****item 1*****/
    inmunizaciones: PlanEvaluacionAdulto[]=[];                /****item 2*****/
    evalucionBucal: PlanEvaluacionAdulto[]=[];                /****item 3*****/
    intervencionesPreventivas: PlanEvaluacionAdulto[]=[];     /****item 4*****/
    administracionMicronutrientes: PlanEvaluacionAdulto[]=[]; /****item 5*****/
    consejeriaIntegral: PlanEvaluacionAdulto[]=[];            /****item 6*****/
    visitaDomiciliaria: PlanEvaluacionAdulto[]=[];            /****item 7*****/
    temasEducativos: PlanEvaluacionAdulto[]=[];               /****item 8*****/
    atencionPrioridades: PlanEvaluacionAdulto[]=[];           /****item 9*****/
    ref: DynamicDialogRef;
    formPlan:FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialog:DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
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
          if(data!==undefined)
              this.evaluacionGeneral.push(data);
          console.log(this.formPlan);
      })
  }
  openDialogEditarPlanEvaluacion(row,index) {
      let aux={
          index: index,
          row: row
      }
      this.ref = this.dialog.open(ModalPlanAtencionAdultoMayorComponent, {
          header: "EVALUACION GENERAL, FUNCIONAL, MENTAL, SOCIAL Y FISICO",
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
              this.evaluacionGeneral.splice(data.index, 1,data.row);
          };
      })
  }
  eliminarPlanEvaluacion(index){
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


}
