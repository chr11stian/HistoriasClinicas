import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {SesionesTempranas, respuestaSesionesTempranas} from 'src/app/cred/models/plan-atencion-integral/plan-atencion-integral.model'
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {SesionesAtencionTempranaService} from 'src/app/cred/services/plan-atencion-integral/sesiones-atencion-temprana/sesiones-atencion-temprana.service';
import {NotifyService} from 'src/app/shared/notify/notify.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-editar-sesion',
  templateUrl: './editar-sesion.component.html',
  styleUrls: ['./editar-sesion.component.css']
})
export class EditarSesionComponent implements OnInit {

  sesion: SesionesTempranas;
  dni: string;
  control: FormGroup;

  constructor(private servicio: SesionesAtencionTempranaService, 
              private fb: FormBuilder, 
              public notify: NotifyService,
              public ref: DynamicDialogRef, 
              public config: DynamicDialogConfig,
              private route: ActivatedRoute,
              private router: Router,  ) { }

  ngOnInit(){
    this.sesion= this.config.data.sesion;
    this.dni= this.config.data.dni;
    // console.log("recuperacion", this.sesion);
    this.control = this.fb.group({
      descripcion: [this.sesion.descripcion, Validators.required],
      fecha: [this.sesion.fecha, Validators.required]
    }); 
  }
  onGoToSesiones() {
    this.router.navigate(["../../", "plan-atencion-integral/sesiones-atencion-temprana"], {
      relativeTo: this.route
    });
  }
  onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    // console.log("sin formato", d);
    
    //  transformamos la fecha al formato :2021-11-30 16:00:42
    this.control.value.fecha = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 00:00:00`;
    console.log("fecha actualizada", this.control.value.fecha);
    
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
  guardar() {
    this.validateAllFormFields(this.control);
    if(this.control.valid){
      console.log("control validado");
      const sesionUpdate: SesionesTempranas = {
          descripcion: this.control.value.descripcion,
          fecha: this.control.value.fecha,
      };
      console.log("datos nuevos",this.dni,sesionUpdate);
      this.servicio.updateSesion(this.dni,[sesionUpdate])
        .toPromise().then(res => {
          console.log('respuesta',res);
          if(res){
            if (res.mensaje ==="200 OK"){
              this.notify.showExito("Se actualizo con éxito la sesion")
              this.onGoToSesiones()
            }
            else {
              this.notify.showError("Error al modificar la sesion!");
              this.onGoToSesiones();
            }

          }
          
        }
      )
    }
  }

  cancelar() {
    this.ref.close();
  }

}
