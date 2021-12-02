import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {SesionesTempranas} from 'src/app/cred/models/plan-atencion-integral/plan-atencion-integral.model'
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-nueva-sesion',
  templateUrl: './nueva-sesion.component.html',
  styleUrls: ['./nueva-sesion.component.css']
})
export class NuevaSesionComponent implements OnInit {

  control: FormGroup;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
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
  guardar() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure that you want to proceed?',
    //     header: 'Confirmation',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
    //     },
    //     reject: (type) => {
    //         switch(type) {
    //             case ConfirmEventType.REJECT:
    //                 this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
    //             break;
    //             case ConfirmEventType.CANCEL:
    //                 this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
    //             break;
    //         }
    //     }
    // });
  }

  cancelar() {
    // this.confirmationService.confirm({
    //     message: 'Do you want to delete this record?',
    //     header: 'Delete Confirmation',
    //     icon: 'pi pi-info-circle',
    //     accept: () => {
    //         this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
    //     },
    //     reject: (type) => {
    //         switch(type) {
    //             case ConfirmEventType.REJECT:
    //                 this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
    //             break;
    //             case ConfirmEventType.CANCEL:
    //                 this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
    //             break;
    //         }
    //     }
    // });
  }
  onGuardarCambios(){
    this.validateAllFormFields(this.control);
    const value=this.control.value;
    const contra1=value.contraNueva1;
    const contra2=value.contraNueva2;
    // console.log("1",value.contraNueva1);
    // console.log("2",value.contraNueva2);
    // if(contra1==contra2){
    //   const change: changePass={
    //     id: this.usuario.id,
    //     passNuevo: contra2
    //   }
    //   // console.log("cambios", change);
    //   this.apiUser.updatePassword(change).subscribe(respuesta => {
    //     if (respuesta) {
    //       if (respuesta.respuesta === "Se modifico la contraseña satisfactoriamente") {
    //         this.notify.showExito("Se modificó correctamente la contraseña del usuario");
    //         // cerrar
    //         this.activeModal.dismiss('Cross click')
    //       } else {
    //         this.notify.showError("Error al modificar la contraseña del Usuario!");
    //         this.activeModal.dismiss('Cross click')
    //       }
    //     }
    //   });
    // } else {
    //   // console.log("las contraseñas no coinciden");
    //   this.notify.showError("Las contraseñas del usuario no coinciden!");
      
    // }
  }

}
