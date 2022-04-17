import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-abrir-caja',
  templateUrl: './abrir-caja.component.html',
  styleUrls: ['./abrir-caja.component.css']
})
export class AbrirCajaComponent implements OnInit {

  formAbrirCaja: FormGroup;
  idIpress="";
  nombreIpress="";
  renipress="";
  direccionIpress="";
  rucIpress="";
  nroDoc="";
  nombre="";
  personalTipoDoc="";
  listaAmbientes: any[];
  estadoCaja="";
  constructor(
    private router: Router,
    private cajaService: ServicesService,
    private fb: FormBuilder
  ) {
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.nombreIpress = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    this.renipress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    this.rucIpress = JSON.parse(localStorage.getItem('usuario')).ipress.ruc;
    this.direccionIpress = JSON.parse(localStorage.getItem('usuario')).ipress.ubicacion.direccion;
    this.personalTipoDoc = JSON.parse(localStorage.getItem('usuario')).tipoDocumento;
    this.nroDoc = JSON.parse(localStorage.getItem('usuario')).nroDocumento;
    this.nombre = JSON.parse(localStorage.getItem('usuario')).apellidos.split("-")[0]+" "+JSON.parse(localStorage.getItem('usuario')).apellidos.split("-")[1]+", "+JSON.parse(localStorage.getItem('usuario')).nombres.split("-")[0];
    this.buildForm();
    this.llenarCamposUsuario();
    this.traerAmbientesCajaxIpress();
  }

  traerAmbientesCajaxIpress(){
    let data={
      idIpress: this.idIpress,
      nombreUps: "CAJA"
    }
    this.cajaService.listarAmbientesCaja(data).subscribe((res: any) => {
      this.listaAmbientes = res.object;
      console.log('LISTA DE AMBIENTES CAJA', this.listaAmbientes);
    })
  }
  buildForm() {
    this.formAbrirCaja = this.fb.group({
      nroDoc: new FormControl(''),
      nombre: new FormControl(''),
      ambiente: new FormControl(''),
    })
  }
  llenarCamposUsuario(){
    this.formAbrirCaja.get("nroDoc").setValue(this.nroDoc);
    this.formAbrirCaja.get("nombre").setValue(this.nombre);
  }
  verificarCaja(){
    this.cajaService.ultimoEstadoCaja(this.idIpress,this.formAbrirCaja.value.ambiente).subscribe((res: any) => {
      console.log('ESTADO DE CAJA', res.object);
      this.estadoCaja=res.object.estado;
      localStorage.setItem("cajaActual", JSON.stringify(this.formAbrirCaja.value.ambiente));
    })
  }
  clickAbrirCaja() {
    let datos = {
      idIpress: this.idIpress,
      nombreIpress: this.nombreIpress,
      renipress: this.renipress,
      direccionIpress: this.direccionIpress,
      rucIpress: this.rucIpress,
      ambienteCaja: this.formAbrirCaja.value.ambiente,
      personalTipoDoc: this.personalTipoDoc,
      personalNroDoc: this.nroDoc,
      personalNombre: this.nombre
    }
    console.log(datos);
    this.cajaService.abrirCaja(datos).subscribe((res: any) => {
      console.log('ESTADO DE CAJA', res.object);
      Swal.fire({
        icon: 'success',
        title: 'Caja',
        text: "Caja abierta correctamente",
        showConfirmButton: false,
        timer: 1500,
      })
      this.router.navigate(['/dashboard/caja/menu-caja'])
    })
  }
  entrar(){
  this.router.navigate(['/dashboard/caja/menu-caja'])
  }
  ngOnInit(): void {

  }


}
