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
    // this.validateFUA();
    // let auxIdConsulta = "6230d335695e9313b233de63"
    // let auxIdConsulta = "621e909a96750255eedf01d4"
    // let auxIdConsulta = JSON.parse(localStorage.getItem("documento")).idConsulta;
    this.data = this.router.getCurrentNavigation().extras;
    console.log('data del otro componente ', this.data);
    this.fuaService.getCrearRecuperarFUAxIdConsulta(this.data.id).subscribe((res: any) => {
      console.log('cod error ', res.cod);
      if (res.cod == "2004") {
        this.location.back();
        Swal.fire({
          icon: 'warning',
          title: 'No es Posible crear FUA ya que no posee diagnosticos',
          showConfirmButton: false,
          timer: 2000
        });
        return
      }
      this.listDataFUA = res.object;
      Swal.fire({
        icon: 'success',
        title: 'Se creo FUA correctamente',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  ngOnInit(): void {
  }
  openFUA(rowData) {
    console.log('data de la lista ', rowData);
    this.router.navigate(['dashboard/fua/fua'])
    let dataFUA = {
      idFUA: rowData.id
    }
    localStorage.setItem('dataFUA', JSON.stringify(dataFUA));
  }
  dataDos() {

  }
}
