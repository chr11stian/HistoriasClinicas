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
import {MessageService} from "primeng/api";

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
  /**Recupera el Id del Consultorio Obstetrico**/
  idConsultoriObstetrico: string;
  /****** Data recuperada********/
  private planPartoReenfocada: any;
  private tipoDocRecuperado: any;
  private nroDocRecuperado: any;
  private nroEmbarazo:any;
  private nroHclRecuperado:any;
  /*****datos recuperados para actualizar consultorio**/
  private nroFetos:number = 0;
  private idConsulta :any;
  /********datos para poder calcular EVAL. nutricional valor e indicador*************/
  private talla:number;
  private imc:number;
  private pesoHabitual:number;
  private pesoActual: number;
  private indicador:'';
  /*****/
  constructor (private formBuilder: FormBuilder,
               private obstetriciaService: ObstetriciaGeneralService,
               private dialog:DialogService,
               private messageService: MessageService,
               private tratamientoService:ConsultasService) {
    this.buildForm();

    /*********RECUPERAR DATOS*********/
    this.tipoDocRecuperado = this.obstetriciaService.tipoDoc;
    this.nroDocRecuperado = this.obstetriciaService.nroDoc;
    this.nroEmbarazo = this.obstetriciaService.nroEmbarazo;
    this.idConsultoriObstetrico = this.obstetriciaService.idConsultoriObstetrico;
    this.nroHclRecuperado = this.obstetriciaService.nroHcl;
    this.idConsulta = this.obstetriciaService.idGestacion;
    /***************DATOS DE LOS DROPDOWNS*******************/
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
    this.recuperarNroFetos();
    this.recuperarDatos();

  }
  private buildForm() {
    this.formRIEP=this.formBuilder.group({
      valor: new FormControl({value: '', disabled: true},[Validators.required]),
      indicador:  new FormControl({value: '', disabled: true},[Validators.required]),
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
      observacionesf: ['', [Validators.required]],
      encargado: ['', [Validators.required]]
    })

  }
  ngOnInit(): void
  {

  }
  recuperarNroFetos(){
    let idData = {
      id: this.idConsulta
    }
    this.tratamientoService.getUltimaConsultaById(idData).subscribe((res: any) => {
      this.nroFetos = res.object.nroFetos;
      this.pesoHabitual = parseFloat(res.object.pesoHabitual);
      this.talla = parseFloat(res.object.talla);
      this.imc = parseFloat(res.object.imc);
    })
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
        valor: this.pesoActual - this.pesoHabitual,
        indicador:this.indicador
    }

  }
  guardarTodosDatos(){
    this.recuperarDatoSuplementarios();
    this.recuperarDatosEvaluacion();
    console.log(this.evaluacionNutricional.valor);
    console.log(this.examenesAuxiliares);
    this.recuperarDatoSuplementarios();
    const req={
      id:this.idConsultoriObstetrico,
      nroHcl:this.nroHclRecuperado,
      nroEmbarazo:this.nroEmbarazo,
      nroAtencion:1,
      // nroControlSis: 1,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      inmunizaciones: this.tratamientoInmunizaciones,
      tratamientos:this.tratamientosComunes,
      tratamientosSuplementos:this.suplementarios,
      interconsultas:this.interconsultas,
      examenesAuxiliares:this.examenesAuxiliares,
      evaluacionNutricional:this.evaluacionNutricional,
      recomendaciones:this.recomendaciones,
    }
    this.tratamientoService.updateConsultas(this.nroFetos,req).subscribe(

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
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientosComunes.splice(index,1)
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
  eliminarInmunizaciones(index){
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoInmunizaciones.splice(index,1)
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
  eliminarRecomendaciones(index){
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recomendaciones.splice(index,1);
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
  eliminarInterconsulta(index){
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.interconsultas.splice(index,1)
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
  eliminarExamenesAuxiliares(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenesAuxiliares.splice(index,1);
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
  recuperarDatos(){
    let aux ={
      "id" : this.idConsultoriObstetrico,
      "nroHcl":this.nroHclRecuperado,
      "nroEmbarazo":this.nroEmbarazo,
      "nroAtencion":1
    }

    this.tratamientoService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataConsulta = res.object;
      console.log("data consulta:" +this.dataConsulta);
      /*recuperar peso actual*/

      this.pesoActual = parseFloat(this.dataConsulta.funcionesVitales.peso)
      /*recuperar tratamientos comunes*/
      if(res['cod']='2401') {
        // console.log(this.dataConsulta.tratamientos);
         if((res.object.tratamientos!=null && res.object.interconsultas!=null && res.object.inmunizaciones!=null && res.object.recomendaciones!=null && res.object.examenesAuxiliares != null))
         {
           let i: number = 0;
           while (i < this.dataConsulta.tratamientos.length) {
             this.tratamientosComunes.push(this.dataConsulta.tratamientos[i]);
             i++;
           }
           /*recuperar inmunizaciones*/
           let a: number = 0;
           while (a < this.dataConsulta.inmunizaciones.length) {
             this.tratamientoInmunizaciones.push(this.dataConsulta.inmunizaciones[a]);
             a++;
           }

           /*reuperar datos: tratamientos suplementarios - evaluacion suplmentaria - exam auxiliares*/
           /* recuperar suplementario acido folico*/
           this.formRIEP.patchValue({'descripciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion});
           this.formRIEP.patchValue({'numeroa': this.dataConsulta.tratamientosSuplementos.acidoFolico.numero});
           this.formRIEP.patchValue({'dosisa': this.dataConsulta.tratamientosSuplementos.acidoFolico.dosis});
           this.formRIEP.patchValue({'viaAdministraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.viaAdministracion});
           this.formRIEP.patchValue({'intervaloa': this.dataConsulta.tratamientosSuplementos.acidoFolico.intervalo});
           this.formRIEP.patchValue({'duraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.duracion});
           this.formRIEP.patchValue({'observacionesa': this.dataConsulta.tratamientosSuplementos.acidoFolico.observaciones});
           /* recuperar suplementario hierroYAcidoFolico*/
           /*descripcion*/
           this.formRIEP.patchValue({'descripcionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion});
           this.formRIEP.patchValue({'numerof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.numero});
           this.formRIEP.patchValue({'dosisf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosis});
           this.formRIEP.patchValue({'viaAdministracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion});
           this.formRIEP.patchValue({'intervalof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.intervalo});
           this.formRIEP.patchValue({'duracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.duracion});
           this.formRIEP.patchValue({'observacionesf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.observaciones});
           /* recuperar suplementario calcio*/
           /*descripcion*/
           this.formRIEP.patchValue({'descripcionc': this.dataConsulta.tratamientosSuplementos.calcio.descripcion});
           this.formRIEP.patchValue({'numeroc': this.dataConsulta.tratamientosSuplementos.calcio.numero});
           this.formRIEP.patchValue({'dosisc': this.dataConsulta.tratamientosSuplementos.calcio.dosis});
           this.formRIEP.patchValue({'viaAdministracionc': this.dataConsulta.tratamientosSuplementos.calcio.viaAdministracion});
           this.formRIEP.patchValue({'intervaloc': this.dataConsulta.tratamientosSuplementos.calcio.intervalo});
           this.formRIEP.patchValue({'duracionc': this.dataConsulta.tratamientosSuplementos.calcio.duracion});
           this.formRIEP.patchValue({'observacionesc': this.dataConsulta.tratamientosSuplementos.calcio.observaciones});
           /*recuperar examenes auxiliares*/
           this.formRIEP.patchValue({'examenesAuxiliares': this.dataConsulta.examenesAuxiliares});
           /*recuperar evaluacion Nutricional*/
           // this.formRIEP.patchValue({ 'valor': this.dataConsulta.funcionesVitales.peso - this.pesoHabitual });
           console.log("peso actual " + this.pesoActual);
           console.log("peso habituañ " + this.pesoHabitual);
           this.formRIEP.patchValue({'valor': parseFloat(this.dataConsulta.funcionesVitales.peso) - this.pesoHabitual});
           //  this.formRIEP.patchValue({'valor': this.dataConsulta.evaluacionNutricional.valor});
           this.formRIEP.patchValue({'indicador': this.dataConsulta.evaluacionNutricional.indicador});
           /**Recuperar responsable de la atencion**/
           this.formRIEP.patchValue({'encargado': this.dataConsulta.encargado.tipoDoc + " " + this.dataConsulta.encargado.nroDoc});
           /* recuperar interconsultas*/
           console.log(this.dataConsulta.interconsultas)

           let y: number = 0;
           while (y < this.dataConsulta.interconsultas.length) {
             // console.log("interconsultas nro: " ,i);
             // console.log("interconsultas consta de: ", this.dataConsulta.interconsultas[i]);
             this.interconsultas.push(this.dataConsulta.interconsultas[y]);
             y++;
           }

           /* recuperar recomendaciones*/
           let w: number = 0;
           while (w < this.dataConsulta.recomendaciones.length) {
             // console.log("interconsultas nro: " ,i);
             // console.log("interconsultas consta de: ", this.dataConsulta.recomendaciones[i]);
             this.recomendaciones.push(this.dataConsulta.recomendaciones[w]);
             w++;
           }
           /* recuperar EXAMENES AUXILIARES*/
           let z: number = 0;
           while (z < this.dataConsulta.examenesAuxiliares.length) {
             // console.log("interconsultas nro: " ,i);
             // console.log("interconsultas consta de: ", this.dataConsulta.examenesAuxiliares[i]);
             this.examenesAuxiliares.push(this.dataConsulta.examenesAuxiliares[z]);
             z++;

           }
         }else{this.messageService.add({severity: 'success', summary: 'Ingresar', detail: 'Registro vacio'});}

      }
    });
  }
}
