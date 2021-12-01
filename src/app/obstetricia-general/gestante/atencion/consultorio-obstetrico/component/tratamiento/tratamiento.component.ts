import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {ModalTratamientoComponent} from "./modal-tratamiento/modal-tratamiento.component";
import {PuerperioModalComponent} from "../../../plan-atencion-integral/component/puerperio/puerperio-modal/puerperio-modal.component";
import {ModalInmunizacionesComponent} from "./modal-inmunizaciones/modal-inmunizaciones.component";
import {ConsultasService} from "../../services/consultas.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
  providers:[DialogService]
})
export class TratamientoComponent implements OnInit {

  formTratamiento: FormGroup;
  /*campos para el tratamiento comun*/
  ref: DynamicDialogRef;
  tratamientosComunes:any[]=[];
  idObstetricia: string;
  dataTratamientoComun:any;
  /*campos para el tratamiento suplementario*/
  tratamientosSuplementarios:any[]=[];
  dataTratamientoSuplementario:any
  /*campos para el tratamiento inmunizaciones*/
  tratamientoInmunizaciones:any[]=[];
  dataTratamientoInmunizaciones:any;
  /*LISTA CIE 10*/
  intervaloList: any[];
  viaadministracionList: any[];
  formRIEP: FormGroup;
  formTratamientoSuplementario:FormGroup;
  formTratamientoInmunizacion:FormGroup;
  suplementarios:any;
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
      recomendaciones: ['', [Validators.required]],
      interconsulta:  ['', [Validators.required]],
      examenesAuxiliares:  ['', [Validators.required]],
      personalResponsable:  ['', [Validators.required]],
      descripcionc: ['', [Validators.required]],
      dosisc: ['', [Validators.required]],
      numeroc: ['', [Validators.required]],
      intervaloc: ['', [Validators.required]],
      viaAdministracionc: ['', [Validators.required]],
      duracionc: ['', [Validators.required]],
      descripciona: ['', [Validators.required]],
      dosisa: ['', [Validators.required]],
      numeroa: ['', [Validators.required]],
      intervaloa: ['', [Validators.required]],
      viaAdministraciona: ['', [Validators.required]],
      duraciona: ['', [Validators.required]],
      descripcionf: ['', [Validators.required]],
      dosisf: ['', [Validators.required]],
      numerof: ['', [Validators.required]],
      intervalof: ['', [Validators.required]],
      viaAdministracionf: ['', [Validators.required]],
      duracionf: ['', [Validators.required]]
    })
  }
  ngOnInit(): void
  {
  }
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
  openDialogTratamientoSuplementario(){
    this.ref = this.dialog.open(ModalTratamientoComponent, {
      header: "TRATAMIENTOS",
      contentStyle:{
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal tratamiento",data)
      if(data!==undefined)
        this.tratamientosSuplementarios.push(data);
      console.log(this.formTratamientoSuplementario);
    })
  }
  openDialogEditarTratamientoSuplementario(row,index){
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
        this.tratamientosSuplementarios.splice(data.index, 1,data.row);
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
        overflow: "auto",
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

  recuperarDatosForm(){
   this.suplementarios = {
     tratamientoFolico: {
       descripcion: this.formRIEP.value.descripciona,
       dosis: this.formRIEP.value.dosisa,
       numero: this.formRIEP.value.numeroa,
       intervalo: this.formRIEP.value.intervaloa,
       viaAdministracion: this.formRIEP.value.viaAdministraciona,
       duracion: this.formRIEP.value.duraciona
     },
     tratamientoHierro: {
       descripcion: this.formRIEP.value.descripcionf,
       dosis: this.formRIEP.value.dosisf,
       numero: this.formRIEP.value.numerof,
       intervalo: this.formRIEP.value.intervalof,
       viaAdministracion: this.formRIEP.value.viaAdministracionf,
       duracion: this.formRIEP.value.duracionf
     },
     tratamientoCalcio: {
       descripcion: this.formRIEP.value.descripcionc,
       dosis: this.formRIEP.value.dosisc,
       numero: this.formRIEP.value.numeroc,
       intervalo: this.formRIEP.value.intervaloc,
       viaAdministracion: this.formRIEP.value.viaAdministracionc,
       duracion: this.formRIEP.value.duracionc
     }
   }


  }
  guardarTodosDatos(){
    this.recuperarDatosForm();
    const req={
      nroHcl: "10101013",
      nroAtencion: 1,
      nroControlSis: 1,
      nroEmbarazo: 1,
      tipoDoc: "DNI",
      nroDoc: "10101013",
      inmunizaciones: this.tratamientoInmunizaciones,
      tratamientos:this.tratamientosComunes,
      tratamientosSuplementos:this.suplementarios

      // tratamientosSuplementos:this.tratamientosSuplementarios,
    }
    console.log('data a guardar INMUNIZACION:',this.tratamientoInmunizaciones);
    console.log('data a guardar TRATAMIENTO COMUN:', this.tratamientosComunes);
    console.log('data a guardar SUPLEMENTARIO:', this.tratamientosSuplementarios);
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
  recuperarDatos(){

  }
  eliminarTratamientoComun(){
  }

  editar(rowData: any) {
    console.log("modificando" + rowData)
  }
  eliminar(rowData: any) {
    console.log("eliminando" + rowData)
  }
}
