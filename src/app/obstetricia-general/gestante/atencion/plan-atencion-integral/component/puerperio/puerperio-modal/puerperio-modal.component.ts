import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-puerperio-modal',
  templateUrl: './puerperio-modal.component.html',
  styleUrls: ['./puerperio-modal.component.css']
})
export class PuerperioModalComponent implements OnInit {
  formPurperio: FormGroup;
  dataPuerperio: any[] = [];
  PuerperioDialog: boolean;
  estadoEditar:boolean=false;
  idObstetricia : string;
  isUpdate:boolean=false;
  idUpdate: string="";
  indicePuerperio:number=0;
  datePipe = new DatePipe('en-US');
  constructor(private form: FormBuilder,
              private ref: DynamicDialogRef,
              private obstetriciaGeneralService: ObstetriciaGeneralService,
              public config: DynamicDialogConfig
  ) {
    this.buildForm();
    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    console.log(config.data);
    if(config.data){
      this.llenarCamposPuerperio();
    }
  }
  buildForm() {
    this.formPurperio = this.form.group({
      fechaAtencion:new FormControl("", [Validators.required]),
      horasDias: new FormControl("", [Validators.required]),
      temperatura: new FormControl("", [Validators.required]),
      pulso: new FormControl("", [Validators.required]),
      presionArterial: new FormControl("", [Validators.required]),
      involucionUterina: new FormControl("", [Validators.required]),
      heridaOperacion: new FormControl("", [Validators.required]),
      caracteristicasLoquios: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required]),
    });
  }
  openNew(){
    this.formPurperio.reset();
    this.PuerperioDialog = true;
  }
  closeDialog(){
    this.ref.close();
  }
  enviarPuerperios(){
    var puerperioData = {
      fechaAtencion: this.datePipe.transform(this.formPurperio.value.fechaAtencion, 'yyyy-MM-dd'),
      horasDias:this.formPurperio.value.horasDias,
      temperatura:this.formPurperio.value.temperatura,
      pulso:this.formPurperio.value.pulso,
      presionArterial: this.formPurperio.value.presionArterial,
      involucionUterina:this.formPurperio.value.involucionUterina,
      heridaOperacion:this.formPurperio.value.heridaOperacion,
      caracteristicasLoquios:this.formPurperio.value.caracteristicasLoquios,
      observaciones:this.formPurperio.value.observaciones

    }
    console.log(puerperioData);
    this.dataPuerperio.push(puerperioData);
    this.PuerperioDialog = false;
  }
  canceledPuerperui() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.PuerperioDialog = false;
    this.estadoEditar = false;
  }
  llenarCamposPuerperio(){
    let configuracion=this.config.data.puerperioInmediato.row;
    this.formPurperio.get("fechaAtencion").setValue(configuracion.fechaAtencion);
    this.formPurperio.get("pulso").setValue(configuracion.pulso);
    this.formPurperio.get("horasDias").setValue(configuracion.horasDias);
    this.formPurperio.get("involucionUterina").setValue(configuracion.involucionUterina);
    this.formPurperio.get("heridaOperacion").setValue(configuracion.heridaOperacion);
    this.formPurperio.get("observaciones").setValue(configuracion.observaciones);
    this.formPurperio.get("temperatura").setValue(configuracion.temperatura);
    this.formPurperio.get("presionArterial").setValue(configuracion.presionArterial);
    this.formPurperio.get("caracteristicasLoquios").setValue(configuracion.caracteristicasLoquios);
  }
 openDialogPuerperio(rowData, rowIndex){
    this.estadoEditar =true;
    this.indicePuerperio = rowIndex;
    this.formPurperio.reset();
       this.formPurperio.get("fechaAtencion").setValue(rowData.fechaAtencion);
       this.formPurperio.get("pulso").setValue(rowData.pulso);
       this.formPurperio.get("horasDias").setValue(rowData.horasDias);
       this.formPurperio.get("involucionUterina").setValue(rowData.involucionUterina);
       this.formPurperio.get("heridaOperacion").setValue(rowData.heridaOperacion);
       this.formPurperio.get("observaciones").setValue(rowData.observaciones);
       this.formPurperio.get("temperatura").setValue(rowData.temperatura);
       this.formPurperio.get("presionArterial").setValue(rowData.presionArterial);
       this.formPurperio.get("caracteristicasLoquios").setValue(rowData.caracteristicasLoquios);
      this.PuerperioDialog = true;
  }
  closeDialogGuardar(){
    this.enviarPuerperios();
    this.ref.close(
        this.config.data?{
              index: this.config.data.puerperioInmediato.index,
              row: this.dataPuerperio[0]
            }:
            this.dataPuerperio[0]);
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })

  }
  ngOnInit(): void {

  }

}
