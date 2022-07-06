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
  consultaFUA: string= 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/fuaid/anexo1.pdf?authorization='
  consultaID: string = 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/fuaconsulta/fua_por_consulta.pdf?authorization='
  listDataFUA: any;
  listaDatosFUA: any;
  linkPDF: string;
  idConsulta:string;
  // "6231104446af060328998d19"
  constructor(
    private location: Location,
    private router: Router,
    private fuaService: FuaService,
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    this.idConsulta = this.data.id;
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
    this.linkPDF = "http://192.168.5.3:8200/jasperserver/rest_v2/reports/Reports/FUA/anexo1.pdf?idFua="
  }

  ngOnInit(): void {
    this.consultaFUA = this.consultaFUA+JSON.parse(localStorage.getItem("token")).token+'&idFua='
    this.consultaID = this.consultaFUA+JSON.parse(localStorage.getItem("token")).token+'&idConsulta='
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
