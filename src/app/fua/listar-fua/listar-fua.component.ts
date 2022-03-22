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
    let auxIdConsulta = "621cf4e20dd932074024a099"
    this.data = this.router.getCurrentNavigation().extras;
    console.log('data del otro componente ', this.data);
    this.fuaService.getCrearRecuperarFUAxIdConsulta(auxIdConsulta).subscribe((res: any) => {
      this.listDataFUA = res.object;
      console.log('lista de FUAs', this.listDataFUA);
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

}
