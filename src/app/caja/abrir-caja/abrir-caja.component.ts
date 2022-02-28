import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abrir-caja',
  templateUrl: './abrir-caja.component.html',
  styleUrls: ['./abrir-caja.component.css']
})
export class AbrirCajaComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

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
