import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuaService } from '../services/fua.service';

@Component({
  selector: 'app-listar-fua',
  templateUrl: './listar-fua.component.html',
  styleUrls: ['./listar-fua.component.css']
})
export class ListarFuaComponent implements OnInit {

  data: any;
  listDataFUA: any;
  listaDatosFUA: any;
  // "6231104446af060328998d19"
  constructor(
    private location: Location,
    private router: Router,
    private fuaService: FuaService,
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    console.log('data del otro componente ', this.data);
    this.fuaService.getCrearRecuperarFUAxIdConsulta(this.data.id).subscribe((res: any) => {
      if (res.cod == "2004") {
        this.location.back();
        Swal.fire({
          icon: 'warning',
          title: 'No es Posible crear FUA ya que no posee diagnosticos',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }
      this.listDataFUA = res.object;
      if (this.data.estadoConsulta == 1) {
        Swal.fire({
          icon: 'success',
          title: 'Se creo FUA correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  ngOnInit(): void {
  }

  openFUA(rowData) {
    console.log('data de la lista ', rowData);
    this.router.navigate(['dashboard/fua/fua']);
    let dataFUA = {
      idConsulta: rowData.idConsulta,
      idFUA: rowData.id,
      codPrestacion: rowData.codPrestacion,
    }
    localStorage.setItem('dataFUA', JSON.stringify(dataFUA));
  }
  imprimirFUA(data) {
    console.log('data del listar ', data);
    this.fuaService.getReportFUA(data.id).subscribe((res: any) => {

    });
  }
  consolg(){
    this.listDataFUA.forEach(item => {
      console.log('data to set ', item)
    });
  }
}
