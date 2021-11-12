import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AtencionesService} from "../../../services/atenciones/Atenciones.service";

import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-dialog-atencion',
  templateUrl: './dialog-atencion.component.html',
  styleUrls: ['./dialog-atencion.component.css']
})
export class DialogAtencionComponent implements OnInit {
  atencionFG: FormGroup;
  idNroAtencion = "";
  /* ---  listas ---*/
  situacionList: any[];
  presentacionList: any[];
  posicionList: any[];
  movFetalList: any[];
  protcualitList: any[];
  edemaList: any[];
  reflejoOsteotendinosoList: any[];
  interconsultaList: any[];
  planPartoList: any[];
  visitaDomiciliariaList: any[];
  situacionOptions = [{label: 'Longitudinal', value: '1'},
    {label: 'Transversa', value: '2'},
    {label: 'No Aplica', value: '3'}];
  presentacionOptions = [{label: 'Cefálica', value: '1'},
    {label: 'Pélvica', value: '2'},
    {label: 'No Aplica', value: '3'}];

  posicionOptions = [{label: 'Derecha', value: '1'},
    {label: 'Izquierda', value: '2'},
    {label: 'No Aplica', value: '3'}];

  movFetalOptions = [{label: '+', value: '1'},
    {label: '++', value: '2'},
    {label: '+++', value: '3'},
    {label: 'Sin Movimiento', value: '4'},
    {label: 'No Aplica', value: '5'}];

  protcualitOptions = [{label: '+', value: '1'},
    {label: '++', value: '2'},
    {label: '+++', value: '3'},
    {label: 'No se hizo', value: '4'}];

  edemaOptions = [{label: '+', value: '1'},
    {label: '++', value: '2'},
    {label: '+++', value: '3'},
    {label: 'Sin Edema', value: '4'}];

  reflejoOsteotendinosoOptions = [{label: '0', value: '1'},
    {label: '+', value: '2'},
    {label: '++', value: '3'},
    {label: '+++', value: '4'}];

  interconsultaOptions = [{label: 'Psicologia', value: '1'},
    {label: 'Nutricion', value: '2'},
    {label: 'Odontologia', value: '3'},
    {label: 'Medicina', value: '4'},

  ];
  planPartoOptions = [{label: 'Control', value: '1'},
    {label: 'Visita', value: '2'},
    {label: 'No se hizo', value: '3'},
    {label: 'No Aplica', value: '4'}];

  visitaDomiciliariaOptions = [{label: 'Si', value: '1'},
    {label: 'No', value: '2'},
    {label: 'No Aplica', value: '3'}];

  constructor(
      public ref: DynamicDialogRef, //datos reenviados
      public config: DynamicDialogConfig, //datos enviados
      private atencionService: AtencionesService
  ) {
    this.buildForm();
    /*LLENADO DE LISTAS- VALORES QUE PUEDEN TOMAR CIERTAS PROPIEDADES*/
    // this.situacionList = [{label: 'Longitudinal', value: '1'},
    //   {label: 'Transversa', value: '2'},
    //   {label: 'No Aplica', value: '3'}];
    //
    // this.presentacionList = [{label: 'Cefálica', value: '1'},
    //   {label: 'Pélvica', value: '2'},
    //   {label: 'No Aplica', value: '3'}];
    //
    // this.posicionList = [{label: 'Derecha', value: '1'},
    //   {label: 'Izquierda', value: '2'},
    //   {label: 'No Aplica', value: '3'}];
    //
    // this.movFetalList = [{label: '+', value: '1'},
    //   {label: '++', value: '2'},
    //   {label: '+++', value: '3'},
    //   {label: 'Sin Movimiento', value: '4'},
    //   {label: 'No Aplica', value: '5'}];
    //
    // this.protcualitList = [{label: '+', value: '1'},
    //   {label: '++', value: '2'},
    //   {label: '+++', value: '3'},
    //   {label: 'No se hizo', value: '4'}];
    //
    // this.edemaList = [{label: '+', value: '1'},
    //   {label: '++', value: '2'},
    //   {label: '+++', value: '3'},
    //   {label: 'Sin Edema', value: '4'}];
    //
    // this.reflejoOsteotendinosoList = [{label: '0', value: '1'},
    //   {label: '+', value: '2'},
    //   {label: '++', value: '3'},
    //   {label: '+++', value: '4'}];
    //
    // this.interconsultaList = [{label: 'Psicologia', value: '1'},
    //   {label: 'Nutricion', value: '2'},
    //   {label: 'Odontologia', value: '3'},
    //   {label: 'Medicina', value: '4'},
    //
    // ];
    //
    // this.planPartoList = [{label: 'Control', value: '1'},
    //   {label: 'Visita', value: '2'},
    //   {label: 'No se hizo', value: '3'},
    //   {label: 'No Aplica', value: '4'}];
    //
    // this.visitaDomiciliariaList = [{label: 'Si', value: '1'},
    //   {label: 'No', value: '2'},
    //   {label: 'No Aplica', value: '3'}];

  }

  isInvalid(control:string):boolean{
      const formC: AbstractControl = this.atencionFG.get(control);
      return formC.invalid && (formC.dirty || formC.touched);
  }
  buildForm() {
    this.atencionFG = new FormGroup({
      nroAtencion: new FormControl("", Validators.required),
      fechaAtencion: new FormControl("", Validators.required),
      edadGestacional: new FormControl("", Validators.required),
      pesoMadre: new FormControl("", Validators.required),
      evalNutricional:new FormControl("", Validators.required),
      temperatura: new FormControl("", Validators.required),
      presionArterial:new FormControl("", Validators.required),
      pulsoMaterno: new FormControl("", Validators.required),
      alturaUterinal: new FormControl("", Validators.required),
      situacion: new FormControl("", Validators.required),
      presentacion: new FormControl("", Validators.required),
      posicion: new FormControl("", Validators.required),
      fcf: new FormControl("", Validators.required),
      movFetal: new FormControl("", Validators.required),
      proteinaCualitativa:new FormControl("", Validators.required),
      edema: new FormControl("", Validators.required),
      reflejoOsteotendinoso:new FormControl("", Validators.required),
      fechaEcografia: new FormControl("", Validators.required),
      consejeriaIntegral: new FormControl("", Validators.required),
      indAcidoFolico: new FormControl("", Validators.required),
      indFierro: new FormControl("", Validators.required),
      indCalcio: new FormControl("", Validators.required),
      interconsulta: new FormControl("", Validators.required),
      planParto: new FormControl("", Validators.required),
      visitaDomiciliaria: new FormControl("", Validators.required),
      proximaCita: new FormControl("", Validators.required),
      responsableAtencion: new FormControl("", Validators.required),
      establecimientoAtencion: new FormControl("", Validators.required),
    });
  }
  /*Get form controls*/
  getFC(control: string): AbstractControl{
    return this.atencionFG.get(control);
  }

  save() {
    const atencionInput: any = {
      nroAtencion: this.getFC("nroAtencion").value,
      fechaAtencion: this.getFC("fechaAtencion").value,
      edadGestacional: this.getFC("edadGestacional").value,
      pesoMadre: this.getFC("pesoMadre").value,
      evalNutricional:this.getFC("evalNutricional").value,
      temperatura: this.getFC("temperatura").value,
      presionArterial:this.getFC("presionArterial").value,
      pulsoMaterno: this.getFC("pulsoMaterno").value,
      alturaUterinal:this.getFC("alturaUterinal").value,
      situacion:this.getFC("situacion").value,
      presentacion: this.getFC("presentacion").value,
      posicion: this.getFC("posicion").value,
      fcf:this.getFC("fcf").value,
      movFetal: this.getFC("movFetal").value,
      proteinaCualitativa:this.getFC("proteinaCualitativa").value,
      edema: this.getFC("edema").value,
      reflejoOsteotendinoso: this.getFC(" reflejoOsteotendinoso").value,
      fechaEcografia: this.getFC("fechaEcografia").value,
      consejeriaIntegral: this.getFC("consejeriaIntegral").value,
      indAcidoFolico: this.getFC("indAcidoFolico").value,
      indFierro: this.getFC("indFierron").value,
      indCalcio: this.getFC("indCalcio").value,
      interconsulta: this.getFC("interconsulta").value,
      planParto: this.getFC("planParto").value,
      visitaDomiciliaria: this.getFC("visitaDomiciliaria").value,
      proximaCita: this.getFC("proximaCita").value,
      responsableAtencion: this.getFC("responsableAtencion").value,
      establecimientoAtencion: this.getFC("establecimientoAtencion").value,
    };
    if (this.idNroAtencion) {
      atencionInput["nroAtencion"] = this.idNroAtencion;
      this.actualizar(atencionInput);
    } else {
      this.agregar(atencionInput);
    }
  }
  actualizar(atencionInput) {

  }
  agregar(atencionInput) {
    console.log("enviando datos...");
    this.atencionService.agregarAtencion(atencionInput);

    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.ref.close("agregado");
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    // this.atencionDialog = false;
  }
  titulo() {

  }

  ngOnInit(): void {
    if (this.config.data.id != "") {
      this.idNroAtencion = this.config.data.id;

    }
  }

}

