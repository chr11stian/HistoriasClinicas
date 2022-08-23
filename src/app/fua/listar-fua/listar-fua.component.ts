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

  data: Paciente = {
    estadoAtencion:0,
    fechaAtencion: '',
    id:'',
    nroDocumento:'',
    tipoConsulta:''
  };
  consultaFUA: string = 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/fuaid/anexo1.pdf?authorization='
  consultaID: string = 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/fuaconsulta/fua_por_consulta.pdf?authorization='
  listDataFUA: FUA[] = [];
  listaDatosFUA: any;
  linkPDF: string;
  idConsulta: string;
  // "6231104446af060328998d19"
  constructor(
    private location: Location,
    private router: Router,
    private fuaService: FuaService,
  ) {
    let auxData: any = this.router.getCurrentNavigation();
    auxData == null ? this.data.estadoAtencion = 2 : this.data.estadoAtencion = auxData.extras.estadoConsulta;
    this.idConsulta = JSON.parse(localStorage.getItem("dataFUA")).idConsulta;
    this.fuaService.getCrearRecuperarFUAxIdConsulta(this.idConsulta).subscribe((res: any) => {
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
      if (this.data.estadoAtencion == 1) {
        Swal.fire({
          icon: 'success',
          title: 'Se creo FUA correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
    // this.linkPDF = "http://192.168.5.3:8200/jasperserver/rest_v2/reports/Reports/FUA/anexo1.pdf?idFua="
  }

  ngOnInit(): void {
    this.consultaFUA = this.consultaFUA + JSON.parse(localStorage.getItem("token")).token + '&idFua='
    this.consultaID = this.consultaFUA + JSON.parse(localStorage.getItem("token")).token + '&idConsulta='
  }

  openFUA(rowData) {
    // console.log('data de la lista ', rowData);
    this.router.navigate(['dashboard/fua/fua']);
    let dataFUA = {
      idConsulta: rowData.idConsulta,
      idFUA: rowData.id,
      codPrestacion: rowData.codPrestacion,
    }
    localStorage.setItem('dataFUA', JSON.stringify(dataFUA));
  }
  imprimirFUA(data) {
    // console.log('data del listar ', data);
    // this.fuaService.getReportFUA(data.id).subscribe((res: any) => {

    // });
  }
}

interface Paciente {
  estadoAtencion: number;
  fechaAtencion: string;
  id: string;
  nroDocumento: string;
  tipoConsulta: string;
}
interface FUA {
  codPrestacion: string;
}