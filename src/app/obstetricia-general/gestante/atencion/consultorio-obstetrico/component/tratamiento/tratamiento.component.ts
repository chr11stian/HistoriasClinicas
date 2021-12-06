import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {ModalTratamientoComponent} from "./modal-tratamiento/modal-tratamiento.component";
import {ModalInmunizacionesComponent} from "./modal-inmunizaciones/modal-inmunizaciones.component";
import {ConsultasService} from "../../services/consultas.service";
import Swal from "sweetalert2";
import {ModalInterconsultaComponent} from "./modal-interconsulta/modal-interconsulta.component";
import {ModalRecomendacionesComponent} from "./modal-recomendaciones/modal-recomendaciones.component";
import {ModalExamenesAuxiliaresComponent} from "./modal-examenes-auxiliares/modal-examenes-auxiliares.component";

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
  providers:[DialogService]
})
export class TratamientoComponent implements OnInit {
  idObstetricia: string;

  /***campos para el tratamiento comun****/
  ref: DynamicDialogRef;
  tratamientosComunes:any[]=[];
  dataTratamientoComun:any;
  /***campos para el tratamiento suplementario***/
  tratamientosSuplementarios:any[]=[];
  suplementarios:any;
  /*campos de Evaluacion Nutricional*/
  evaluacionNutricional:any;
  /*campos para el tratamiento inmunizaciones*/
  tratamientoInmunizaciones:any[]=[];
  dataTratamientoInmunizaciones:any;
  /*INTERCONSULTAS*/
  interconsultas:any[]=[];
  recomendaciones:any[]=[];
  examenesAuxiliares:any[]=[];
  /*LISTA DE LOS DROPDOWNS*/
  intervaloList: any[];
  viaadministracionList: any[];
  /*Form de datos generales*/
  formRIEP: FormGroup;
  /*form de todos los arreglos dialogs*/
  formTratamientoInmunizacion:FormGroup;
  formTratamiento: FormGroup;
  formInterconsultas:FormGroup;
  formRecomendaciones:FormGroup;
  formExamenesAuxiliares:FormGroup;
  /*CAMPOS PARA RECUPERAR LA DATA PRINCIPAL*/
  dataConsulta:any;

  constructor (private formBuilder: FormBuilder,
               private obstetriciaServie: ObstetriciaGeneralService,
               private dialog:DialogService,
               private tratamientoService:ConsultasService) {
    this.buildForm();
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.intervaloList = [{label: 'CADA 1 HORA', value: '1'},
      {label: 'CADA 2 HORAS', value: 'CADA 2 HORAS'},
      {label: 'CADA 3 HORAS', value: 'CADA 3 HORAS'},
      {label: 'CADA 4 HORAS', value: 'CADA 4 HORAS'},
      {label: 'CADA 5 HORAS', value: 'CADA 5 HORAS'},
      {label: 'CADA 6 HORAS', value: 'CADA 6 HORAS'},
      {label: 'CADA 8 HORAS', value: 'CADA 8 HORAS'},
      {label: 'CADA 12 HORAS', value: 'CADA 12 HORAS'},
      {label: 'CADA 24 HORAS', value: 'CADA 24 HORAS'},
      {label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE'},
      {label: 'DOSIS UNICA', value: 'DOSIS UNICA'},
      {label: 'CADA 48 HORAS', value: 'CADA 48 HORAS'}
    ];

    this.viaadministracionList = [{label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
      {label: 'INHALADORA', value: 'INHALADORA'},
      {label: 'INTRADERMICO', value: 'INTRADERMICO'},
      {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
      {label: 'NASAL', value: 'NASAL'},
      {label: 'OFTALMICO', value: 'OFTALMICO'},
      {label: 'ORAL', value: 'ORAL'},
      {label: 'OPTICO', value: 'OPTICO'},
      {label: 'RECTAL', value: 'RECTAL'},
      {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
      {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
      {label: 'TOPICO', value: 'TOPICO'},
      {label: 'VAGINAL', value: 'VAGINAL'},
    ];

  }
  private buildForm() {
    this.formRIEP=this.formBuilder.group({
      valor: ['', [Validators.required]],
      indicador:  ['', [Validators.required]],
      descripcionc: ['', [Validators.required]],
      dosisc: ['', [Validators.required]],
      numeroc: ['', [Validators.required]],
      intervaloc: ['', [Validators.required]],
      viaAdministracionc: ['', [Validators.required]],
      duracionc: ['', [Validators.required]],
      observacionesc:['', [Validators.required]],
      descripciona: ['', [Validators.required]],
      dosisa: ['', [Validators.required]],
      numeroa: ['', [Validators.required]],
      intervaloa: ['', [Validators.required]],
      viaAdministraciona: ['', [Validators.required]],
      duraciona: ['', [Validators.required]],
      observacionesa:['', [Validators.required]],
      descripcionf: ['', [Validators.required]],
      dosisf: ['', [Validators.required]],
      numerof: ['', [Validators.required]],
      intervalof: ['', [Validators.required]],
      viaAdministracionf: ['', [Validators.required]],
      duracionf: ['', [Validators.required]],
      observacionesf: ['', [Validators.required]]
    })
  }
  ngOnInit(): void
  {
    this.recuperarDatos();
  }
  /*DATOS RECIBIDOS DE LOS MODALES*/
  openDialogTratamientoComun(){
    this.ref = this.dialog.open(ModalTratamientoComponent, {
        header: "TRATAMIENTOS",
      contentStyle:{
          overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal tratamiento",data)
      if(data!==undefined)
        this.tratamientosComunes.push(data);
        console.log(this.formTratamiento);
    })
  }
  openDialogEditarTratamientoComun(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalTratamientoComponent, {
      header: "TRATAMIENTO",
      contentStyle: {
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal tratamiento ', data)
      if(data!==undefined) {
        this.tratamientosComunes.splice(data.index, 1,data.row);
      };
    })
  }
  openDialogInterconsultas(){
    this.ref = this.dialog.open(ModalInterconsultaComponent, {
      header: "INTERCONSULTA",
      contentStyle:{
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal interconsultas",data)
      if(data!==undefined)
        this.interconsultas.push(data);
      console.log(this.formInterconsultas);
    })
  }
  openDialogEditarinterconsultas(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalInterconsultaComponent, {
      header: "INTERCONSULTA",
      contentStyle: {
        overflow:"auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal interconsulta ', data)
      if(data!==undefined) {
        this.interconsultas.splice(data.index, 1,data.row);
      };
    })
  }
  openDialogTratamientoInmunizaciones(){
    this.ref = this.dialog.open(ModalInmunizacionesComponent, {
      header: "INMUNIZACIONES",
      contentStyle:{
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal tratamiento",data)
      if(data!==undefined)
        this.tratamientoInmunizaciones.push(data);
        console.log(this.formTratamientoInmunizacion);
    })
  }
  openDialogEditarTratamientoInmunizaciones(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalInmunizacionesComponent, {
      header: "INMUNIZACIONES",
      contentStyle: {
        heigth: "300px",
        width:"350px",
        overflow:"auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal inmunizaciones ', data)
      if(data!==undefined) {
        this.tratamientoInmunizaciones.splice(data.index, 1,data.row);
      };
    })
  }
  openDialogRecomendaciones(){
    this.ref = this.dialog.open(ModalRecomendacionesComponent, {
      header: "RECOMENDACIONES",
      contentStyle:{
        width:"500px",
        heigth:"500px",
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal recomendaciones",data)
      if(data!==undefined)
        this.recomendaciones.push(data);
      console.log(this.formRecomendaciones);
    })
  }
  openDialogEditarRecomendaciones(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalRecomendacionesComponent, {
      header: "RECOMENDACIONES",
      contentStyle: {
        width:"500px",
        heigth:"500px",
        overflow:"auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal Recomendaciones ', data)
      if(data!==undefined) {
        this.recomendaciones.splice(data.index, 1,data.row);
      };
    })
  }
  openDialogExamenesAuxiliares(){
    this.ref = this.dialog.open(ModalExamenesAuxiliaresComponent, {
      header: "EXAMENES AUXILIARES",
      contentStyle:{
        width:"500px",
        heigth:"500px",
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal examenes Aux",data)
      if(data!==undefined)
        this.examenesAuxiliares.push(data);
      console.log(this.formExamenesAuxiliares);
    })
  }
  openDialogEditarAuxiliares(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalExamenesAuxiliaresComponent, {
      header: "EXAMENES AUXILIARES",
      contentStyle: {
        width:"500px",
        heigth:"500px",
        overflow:"auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal Exa. Aux. ', data)
      if(data!==undefined) {
        this.examenesAuxiliares.splice(data.index, 1,data.row);
      };
    })
  }
  recuperarDatoSuplementarios(){
   this.suplementarios = {
     acidoFolico: {
       descripcion: this.formRIEP.value.descripciona,
       dosis: this.formRIEP.value.dosisa,
       numero: this.formRIEP.value.numeroa,
       intervalo: this.formRIEP.value.intervaloa,
       viaAdministracion: this.formRIEP.value.viaAdministraciona,
       duracion: this.formRIEP.value.duraciona,
       observaciones: this.formRIEP.value.observacionesa
     },
     hierroYAcidoFolico: {
       descripcion: this.formRIEP.value.descripcionf,
       dosis: this.formRIEP.value.dosisf,
       numero: this.formRIEP.value.numerof,
       intervalo: this.formRIEP.value.intervalof,
       viaAdministracion: this.formRIEP.value.viaAdministracionf,
       duracion: this.formRIEP.value.duracionf,
       observaciones:this.formRIEP.value.observacionesf
     },
     calcio: {
       descripcion: this.formRIEP.value.descripcionc,
       dosis: this.formRIEP.value.dosisc,
       numero: this.formRIEP.value.numeroc,
       intervalo: this.formRIEP.value.intervaloc,
       viaAdministracion: this.formRIEP.value.viaAdministracionc,
       duracion: this.formRIEP.value.duracionc,
       observaciones:this.formRIEP.value.observacionesc
     }
   }
  }
  recuperarDatosEvaluacion(){
    this.evaluacionNutricional={
        valor:this.formRIEP.value.valor,
        indicador:this.formRIEP.value.indicador
    }
  }
  guardarTodosDatos(){
    this.recuperarDatoSuplementarios();
    this.recuperarDatosEvaluacion();
    console.log(this.examenesAuxiliares);
    this.recuperarDatoSuplementarios();
    const req={
      nroHcl: "10101013",
      nroAtencion: 1,
      nroControlSis: 1,
      nroEmbarazo: 1,
      tipoDoc: "DNI",
      nroDoc: "10101013",
      inmunizaciones: this.tratamientoInmunizaciones,
      tratamientos:this.tratamientosComunes,
      tratamientosSuplementos:this.suplementarios,
      interconsultas:this.interconsultas,
      examenesAuxiliares:this.examenesAuxiliares,
      evaluacionNutricional:this.evaluacionNutricional,
      recomendaciones:this.recomendaciones,

    }
    console.log('data a guardar INMUNIZACION:',this.tratamientoInmunizaciones);
    console.log('data a guardar TRATAMIENTO COMUN:', this.tratamientosComunes);
    console.log('data a guardar SUPLEMENTARIO:', this.tratamientosSuplementarios);
    console.log('data a guardar EVALUACION NUTRICIONAL:', this.evaluacionNutricional);
    console.log('data a guardar de interconsultas: ', this.interconsultas);
    console.log('data a guardar de recomendaciones: ', this.recomendaciones);

    this.tratamientoService.updateConsultas(req).subscribe(
        (resp) => {
          console.log(resp);
          console.log(req);

          Swal.fire({
            icon: 'success',
            title: 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })

        }
    )
  }
  /* ELIMINAR ITEMS DE CADA TABLA */
  eliminarTratamientoComun(index){
      this.tratamientosComunes.splice(index,1)
  }
  eliminarInmunizaciones(index){
      this.tratamientoInmunizaciones.splice(index,1)
  }
  eliminarRecomendaciones(index){
    this.recomendaciones.splice(index,1);
  }
  eliminarInterconsulta(index){
    this.interconsultas.splice(index,1)
  }
  // eliminar(rowData: any) {
  //   console.log("eliminando" + rowData)
  // }
  eliminarExamenesAuxiliares(index) {
    this.examenesAuxiliares.splice(index,1);
  }
  recuperarDatos(){
    let aux ={
      "nroHcl":"10101013",
      "nroEmbarazo":1,
      "nroAtencion":1
    }

    this.tratamientoService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataConsulta = res.object;
      console.log(this.dataConsulta);
      /*recuperar tratamientos comunes*/
      // console.log(this.dataConsulta.tratamientos);
      if(this.dataConsulta.tratamientos.length === null || this.dataConsulta.tratamientos.length === 0 ){
        console.log("NO INGRESO NINGUN TRATAMIENTO AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataConsulta.tratamientos.length){
          // console.log("tratamiento nro: " ,i);
          // console.log("tratamiento consta de: ", this.dataConsulta.tratamientos[i]);
          this.tratamientosComunes.push(this.dataConsulta.tratamientos[i]);
          i++;
        }
      }
      /*recuperar inmunizaciones*/
      console.log(this.dataConsulta.inmunizaciones);
      if(this.dataConsulta.inmunizaciones.length === null || this.dataConsulta.inmunizaciones.length === 0 ){
        console.log("NO INGRESO NINGUN TRATAMIENTO INMUNIZACIONES AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataConsulta.inmunizaciones.length){
          // console.log("tratamiento INMUNIZACION nro: " ,i);
          // console.log("tratamiento consta de: ", this.dataConsulta.inmunizaciones[i]);
          this.tratamientoInmunizaciones.push(this.dataConsulta.inmunizaciones[i]);
          i++;
        }
      }
      /*reuperar datos: tratamientos suplementarios - evaluacion suplmentaria - exam auxiliares*/
      /* recuperar suplementario acido folico*/
      this.formRIEP.patchValue({ 'descripciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion });
      this.formRIEP.patchValue({ 'numeroa': this.dataConsulta.tratamientosSuplementos.acidoFolico.numero });
      this.formRIEP.patchValue({ 'dosisa': this.dataConsulta.tratamientosSuplementos.acidoFolico.dosis });
      this.formRIEP.patchValue({ 'viaAdministraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.viaAdministracion });
      this.formRIEP.patchValue({ 'intervaloa': this.dataConsulta.tratamientosSuplementos.acidoFolico.intervalo });
      this.formRIEP.patchValue({ 'duraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.duracion });
      this.formRIEP.patchValue({ 'observacionesa': this.dataConsulta.tratamientosSuplementos.acidoFolico.observaciones });
      /* recuperar suplementario hierroYAcidoFolico*/
      /*descripcion*/
      this.formRIEP.patchValue({ 'descripcionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion });
      this.formRIEP.patchValue({ 'numerof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.numero });
      this.formRIEP.patchValue({ 'dosisf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosis });
      this.formRIEP.patchValue({ 'viaAdministracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion });
      this.formRIEP.patchValue({ 'intervalof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.intervalo });
      this.formRIEP.patchValue({ 'duracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.duracion });
      this.formRIEP.patchValue({ 'observacionesf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.observaciones });
      /* recuperar suplementario calcio*/
      /*descripcion*/
      this.formRIEP.patchValue({ 'descripcionc': this.dataConsulta.tratamientosSuplementos.calcio.descripcion });
      this.formRIEP.patchValue({ 'numeroc': this.dataConsulta.tratamientosSuplementos.calcio.numero });
      this.formRIEP.patchValue({ 'dosisc': this.dataConsulta.tratamientosSuplementos.calcio.dosis });
      this.formRIEP.patchValue({ 'viaAdministracionc': this.dataConsulta.tratamientosSuplementos.calcio.viaAdministracion });
      this.formRIEP.patchValue({ 'intervaloc': this.dataConsulta.tratamientosSuplementos.calcio.intervalo });
      this.formRIEP.patchValue({ 'duracionc': this.dataConsulta.tratamientosSuplementos.calcio.duracion });
      this.formRIEP.patchValue({ 'observacionesc': this.dataConsulta.tratamientosSuplementos.calcio.observaciones });
      /*recuperar examenes auxiliares*/
      this.formRIEP.patchValue({ 'examenesAuxiliares': this.dataConsulta.examenesAuxiliares });
      /*recuperar evaluacion Nutricional*/
      this.formRIEP.patchValue({ 'valor': this.dataConsulta.evaluacionNutricional.valor });
      this.formRIEP.patchValue({ 'indicador': this.dataConsulta.evaluacionNutricional.indicador });
      /* recuperar interconsultas*/
      console.log(this.dataConsulta.interconsultas)
      if(this.dataConsulta.interconsultas.length === null || this.dataConsulta.interconsultas.length === 0 ){
        console.log("NO INGRESO NINGUNA INTERCONSULTA AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataConsulta.interconsultas.length){
          // console.log("interconsultas nro: " ,i);
          // console.log("interconsultas consta de: ", this.dataConsulta.interconsultas[i]);
          this.interconsultas.push(this.dataConsulta.interconsultas[i]);
          i++;
        }
      }
      /* recuperar recomendaciones*/
      console.log(this.dataConsulta.recomendaciones);
      if(this.dataConsulta.recomendaciones.length === null || this.dataConsulta.recomendaciones.length === 0 ){
        console.log("NO INGRESO NINGUNA INTERCONSULTA AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataConsulta.recomendaciones.length){
          // console.log("interconsultas nro: " ,i);
          // console.log("interconsultas consta de: ", this.dataConsulta.recomendaciones[i]);
          this.recomendaciones.push(this.dataConsulta.recomendaciones[i]);
          i++;
        }
      }
      /* recuperar EXAMENES AUXILIARES*/
      console.log(this.dataConsulta.examenesAuxiliares);
      if(this.dataConsulta.examenesAuxiliares.length === null || this.dataConsulta.examenesAuxiliares.length === 0 ){
        console.log("NO INGRESO NINGUNA INTERCONSULTA AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataConsulta.examenesAuxiliares.length){
          // console.log("interconsultas nro: " ,i);
          // console.log("interconsultas consta de: ", this.dataConsulta.examenesAuxiliares[i]);
          this.examenesAuxiliares.push(this.dataConsulta.examenesAuxiliares[i]);
          i++;
        }
      }

    });
  }
}
