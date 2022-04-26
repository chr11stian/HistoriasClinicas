import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-tabs-caja',
  templateUrl: './tabs-caja.component.html',
  styleUrls: ['./tabs-caja.component.css']
})
export class TabsCajaComponent implements OnInit {

  nroCaja: String = "";
  idIpress: String = "";
  constructor(
    private router: Router,
    private cajaService: ServicesService,
  ) {
    this.nroCaja = JSON.parse(localStorage.getItem('cajaActual'));
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
  }

  clickCerrarCaja() {
    console.log("asdasdasddddddddddddddaasd");
    let datos = {
      idIpress: this.idIpress,
      ambienteCaja: this.nroCaja,
    }
    console.log(datos);
    this.cajaService.cerrarCajaDiario(datos).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Caja',
        text: "Caja cerrada correctamente",
        showConfirmButton: false,
        timer: 1500,
      })
      this.router.navigate(['/dashboard/caja/abrir-caja'])
    })
  }
  ngOnInit(): void {
  }

}
