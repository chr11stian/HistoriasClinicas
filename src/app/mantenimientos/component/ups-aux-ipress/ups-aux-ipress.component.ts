import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UpsAuxIpressService} from "../../services/ups-aux-ipress/ups-aux-ipress.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ups-aux-ipress',
  templateUrl: './ups-aux-ipress.component.html',
  styleUrls: ['./ups-aux-ipress.component.css']
})
export class UpsAuxIpressComponent implements OnInit {
  idIpress:string="";
  formUpsAux: FormGroup;
  listaUpsAux:upsAux[]=[];
  UpsAuxDialog:boolean=false;
  constructor( private formBuilder: FormBuilder,
               private UpsAuxService:UpsAuxIpressService,
               private messageService: MessageService)
  {
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getUpsAuxBD();
  }
  buildForm() {
    this.formUpsAux = this.formBuilder.group({
      nombre:new FormControl(''),
    });
  }
  getUpsAuxBD(){
    this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe((r: any) => {
      if(r.object!=null){
          this.listaUpsAux=r.object;
        }
    })
  }

  openDialogUpsAux() {
    this.UpsAuxDialog=true;
  }

  cambiarEstado(listaUpsAux: any) {
    let estado = listaUpsAux.estado;
    const data = {
      nombre:listaUpsAux.nombre,
      estado:!estado
    }
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      icon: 'warning',
      title: 'Estas seguro de cambiar de estado?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.UpsAuxService.updateUpsAuxPorIpress(this.idIpress,data).subscribe(
        );
        Swal.fire({
          icon: 'success',
          title: 'Cambió de estado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUpsAuxBD();
      }
    })
  }

  saveUpsAux() {
    let data={
      nombre:this.formUpsAux.value.nombre
    };
    this.UpsAuxDialog=false;
    this.UpsAuxService.addUpsAuxPorIpress(this.idIpress,data).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Se guardo con éxito este registro',
            text: '',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUpsAuxBD();
        },error => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error, vuelva a intentarlo',
            text: '',
            showConfirmButton: false,
            timer: 1500
          })
        }
    );

  }

  deleteUpsAux(listaUpsAux){
    let nombre:string =listaUpsAux.nombre;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.UpsAuxService.deleteUpsAuxPorIpress(this.idIpress,nombre).subscribe(
        );
        Swal.fire({
          icon: 'success',
          title: 'Se elimino correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUpsAuxBD();
      }
    })

  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.UpsAuxDialog = false;
    this.formUpsAux.reset();
  }
}
export interface upsAux{
  nombre?:string,
  estado?:string
}
