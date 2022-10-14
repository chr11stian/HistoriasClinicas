import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {inmunizaciones} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {dato} from "../../../../../../models/data";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  InmunizacionesService
} from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import {ConfirmationService, MessageService} from "primeng/api";
import { NombreComercialUPS } from '../../../../../../../../core/models/mantenimiento.models';

@Component({
  selector: 'app-tratamiento-inmunizacion-modal',
  templateUrl: './tratamiento-inmunizacion-modal.component.html',
  styleUrls: ['./tratamiento-inmunizacion-modal.component.css']
})
export class TratamientoInmunizacionModalComponent implements OnInit {

  inmunizacionFC: FormGroup
  fechaAplicacionDisabled: boolean = true;
  inmunizacion: inmunizaciones
  fechaTentativa = new Date();
  dataDocumento: dato
  dataUsuario:any;
  idIpress:string
  viaAdministracionList=[
      {name:'Intradermica',code:'INTRADERMICA' },
      {name:'Intramuscular',code:'INTRAMUSCULAR' },
      {name:'Via Oral',code:'VIA ORAL' },
      {name:'Via Subcutanea',code:'VIA SUBCUTANEA' }
  ]
  dosisList=[
    {name:'0.1 CC',code:'0.1 CC'},
    {name:'0.25 CC',code:'0.25 CC'},
    {name:'0.5 CC',code:'0.5 CC'},
    {name:'1 CC',code:'1 CC'},
    {name:'2 gotas',code:'0.1 CC'},
  ]
  // attributeLocalS = 'documento'
  otraFecha:boolean=false
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public inmunizacionesService: InmunizacionesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.dataDocumento = <dato>JSON.parse(localStorage.getItem('documento'));
    this.dataUsuario = <dato>JSON.parse(localStorage.getItem('usuario'));
    this.idIpress=this.dataUsuario.ipress.idIpress;



    this.inmunizacion = this.config.data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getInmunizacion();
  }
  buildForm() {
    this.inmunizacionFC = new FormGroup({
      fechaTentativa:new FormControl({value:'',disabled:true},Validators.required),
      fechaAplicacion:new FormControl({value:'',disabled:true},Validators.required),
      viaAdministracion:new FormControl('INTRAMUSCULAR',Validators.required),
      cantidad:new FormControl('0.1 CC',Validators.required),
      lote: new FormControl(null, [Validators.required]),
      fechaVencimiento: new FormControl('', [Validators.required]),
      lab: new FormControl(''),
    })
  }
  getFC(control: string): AbstractControl {
    return this.inmunizacionFC.get(control)
  }
  getInmunizacion() {
    this.getFC('fechaTentativa').setValue(this.inmunizacion.fechaTentativa)
    this.getFC('fechaAplicacion').setValue(new Date());//o seteamos con la fecha de consulta
    this.getFC('lab').setValue(this.inmunizacion.dosis);//o seteamos con la fecha de consulta
  }

  cambioEstado(valor) {
    this.fechaAplicacionDisabled=!this.fechaAplicacionDisabled
    if(this.fechaAplicacionDisabled){
      this.getFC('fechaAplicacion').setValue(new Date())
    }

    console.log('cambio',valor)
  }

  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split('T')
    const parte2 = parte1[1].split('.')[0]
    return `${parte1[0]}`
  }

  save() {
    const requestInput = {
      nombre: (this.inmunizacion.nombre),
      nombreComercial:this.inmunizacion.descripcion,
      dosis: this.inmunizacion.dosis,/* numero de dosis 1,2,3 */
      tipoDosis: this.getFC('lab').value,/* lab */
      tipoDx:'D',
      nombreUPS:'Enfermeria',
      nombreUPSAux:'Inmunizaciones',     
      codPrestacion: "001",//todo
      codProcedimientoHIS: this.inmunizacion.codigoSis,//todo ??no hay info
      codProcedimientoSIS: "",
      idIpressSolicitante: this.idIpress,//ya es dinamico recuperamos del usuario en le localStorage
      viaAdministracion: this.getFC('viaAdministracion').value,
      cantidad: this.getFC('cantidad').value,
      lote: this.getFC('lote').value,
      fechaVencimiento: this.obtenerFecha(this.getFC('fechaVencimiento').value),
      fechaAdministracion: this.obtenerFecha(this.getFC('fechaAplicacion').value),
      idConsulta:this.dataDocumento.idConsulta,
      pertenecePAICRED : true
    }
    console.log('request->>>',requestInput)
    // return
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "Esta Seguro que desea guardar inmunizacion",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      key:'claveDialog',
      accept: () => {
        this.inmunizacionesService.postInmunizaciones(requestInput).subscribe(() => {
          this.ref.close('agregado')
        });
      },
      reject: () => {
        // console.log("no se borro");
      },
    });

  }

  cancelar() {
    this.ref.close("cancelado");
    // console.log('estado invalido',this.getFC('fechaTentativa').valid)
    // console.log('estado invalido',this.getFC('fechaAplicacion').valid)
    // console.log('estado invalido',this.getFC('lote').valid)
    // console.log('estado invalido',this.getFC('administracion').valid)

  }


}
