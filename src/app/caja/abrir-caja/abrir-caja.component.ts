import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-abrir-caja',
  templateUrl: './abrir-caja.component.html',
  styleUrls: ['./abrir-caja.component.css']
})
export class AbrirCajaComponent implements OnInit {

  formAbrirCaja: FormGroup;
  idIpress="616de45e0273042236434b51";
  listaAmbientes: any[];
  constructor(
    private router: Router,
    private cajaService: ServicesService,
    private fb: FormBuilder
  ) {
    this.buildForm();
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
  clickAbrirCaja(){
  //   let row: any = {
  //     editar: false,
  //     nroAtencion: 1,
  // }
  this.router.navigate(['/dashboard/caja/menu-caja'])
  }
  ngOnInit(): void {

  }


}
