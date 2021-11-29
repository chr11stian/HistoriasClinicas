import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {DiagnosticoConsultaComponent} from "../../../../../../cred/citas/atencion-cred/consulta-principal/component/diagnostico-consulta/diagnostico-consulta.component";
import {DiagnosticosService} from "../../services/diagnosticos/diagnosticos.service";
import {ModalTratamientoComponent} from "./modal-tratamiento/modal-tratamiento.component";
import {PuerperioModalComponent} from "../../../plan-atencion-integral/component/puerperio/puerperio-modal/puerperio-modal.component";

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
  private dataTratamientoComun:any;
  /*campos para el tratamiento suplementario*/
  tratamientosSuplementarios:any[]=[];
  private dataTratamientoSuplementario:any;
  /*LISTA CIE 10*/
  intervaloList: any[];
  viaadministracionList: any[];
  formRIEP: FormGroup;
  formTratamientoSuplementario:FormGroup;
  // formTratamientoInmunizacion:FormGroup;

  recomendaciones: string;
  interconsulta: string;
  examenesAuxiliares: string;
  personalResponsable: string;


  constructor (private formBuilder: FormBuilder,
               private obstetriciaServie: ObstetriciaGeneralService,
               private dialog:DialogService,
               private dataConsulta: DiagnosticosService) {
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
    })
    // this.formTratamientoSuplementario = this.formBuilder.group({
    //   /*CAMPOS DE TRATAMIENTO*/
    //   medicamento : ['', [Validators.required]],
    //   cantidad:  ['', [Validators.required]],
    //   dosis: ['', [Validators.required]],
    //   intervalo: ['', [Validators.required]],
    //   viaAdministracion: ['', [Validators.required]],
    //   duracion:  ['', [Validators.required]],
    //
    // }),
    // this.formTratamientoInmunizacion = this.formBuilder.group({
    //   /*CAMPOS DE TRATAMIENTO*/
    //   medicamento : ['', [Validators.required]],
    //   cantidad:  ['', [Validators.required]],
    //   dosis: ['', [Validators.required]],
    //   intervalo: ['', [Validators.required]],
    //   viaAdministracion: ['', [Validators.required]],
    //   duracion:  ['', [Validators.required]],
    //
    // })


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
  guardarTodosDatos(){

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
