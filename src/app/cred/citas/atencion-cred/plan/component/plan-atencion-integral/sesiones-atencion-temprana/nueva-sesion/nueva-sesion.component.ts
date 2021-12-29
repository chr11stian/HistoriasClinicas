import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import { AddSesionesTempranas, respuestaSesionesTempranas} from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {SesionesAtencionTempranaService} from '../../services/sesiones-atencion-temprana/sesiones-atencion-temprana.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-nueva-sesion',
  templateUrl: './nueva-sesion.component.html',
  styleUrls: ['./nueva-sesion.component.css'],
  providers: [MessageService]
})
export class NuevaSesionComponent implements OnInit {

  control: FormGroup;
  dni: string;

  constructor(private servicio: SesionesAtencionTempranaService,
              private fb: FormBuilder, 
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public messageService: MessageService) { }

  ngOnInit() {
    this.dni= this.config.data;
    console.log("dni nuevo", this.dni);
    
    this.control = this.fb.group({
      descripcion: ["", Validators.required],
      fecha: ["", Validators.required]
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }
  controlInvalido(tipoControl: string) {    
    return (
      this.control.get(tipoControl).hasError("required") &&
      this.control.get(tipoControl).touched 
    );
  }
  onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    // console.log("sin formato", d);
    
    //  transformamos la fecha al formato :2021-11-30 00:00:00
    this.control.value.fecha = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 00:00:00`;
    console.log("fecha actualizada", this.control.value.fecha);
  }
  guardar() {
    this.validateAllFormFields(this.control);
    if(this.control.valid){
      console.log("control validado");
      const sesionAdd: AddSesionesTempranas = {
          descripcion: this.control.value.descripcion,
          fecha: this.control.value.fecha,
      };
      console.log("sesion nueva", sesionAdd);
      this.servicio.addNuevaSesion(this.dni, sesionAdd)
      .toPromise().then(res => <respuestaSesionesTempranas> res)
      .then(codigo => { 
        if(codigo.cod_Http==="200 OK"){
          console.log("entre aqui");
          this.messageService.add({severity:'success', summary: 'Se agregó con éxito la sesion', detail: sesionAdd.descripcion});
          this.ref.close();
        }        
        else {
          this.messageService.add({severity:'error', summary: 'Error al agregar la sesion', detail: sesionAdd.descripcion});
          this.ref.close();
        }
      }
      )
    }
  }

  cancelar() {
    this.ref.close();
  }

}
