import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../../plan-atencion-adulto-mayor/services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalTratamientoComponent} from "../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/component/tratamiento/modal-tratamiento/modal-tratamiento.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categorias-adulto-mayor',
  templateUrl: './categorias-adulto-mayor.component.html',
  styleUrls: ['./categorias-adulto-mayor.component.css'],
  providers:[DialogService]

})
export class CategoriasAdultoMayorComponent implements OnInit {
  formCategorias: FormGroup;
  formTratamientos:FormGroup;
  tratamientosComunes:any[]=[];
  ref: DynamicDialogRef;

  constructor(private formBuilder: FormBuilder,
              private filiacionService: AdultoMayorService,
              private dialog:DialogService,
              private messageService: MessageService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm(){
    this.formCategorias = this.formBuilder.group({
      categoria:new FormControl(''),
      examenAuxiliar:new FormControl(''),
      referencia:new FormControl(''),
      proxCita:new FormControl(''),
      observaciones:new FormControl(''),
      encargado:new FormControl(''),
      colegioProf:new FormControl(''),
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
      console.log(this.formTratamientos);
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

}
