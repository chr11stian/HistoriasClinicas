import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HISService} from "../services/services.service";
import Swal from "sweetalert2";
import {dato} from "../../cred/citas/models/data";

@Component({
  selector: 'app-listar-his',
  templateUrl: './listar-his.component.html',
  styleUrls: ['./listar-his.component.css']
})
export class ListarHisComponent implements OnInit {
  listDataHIS: any;
  data:any;
  attributeLocalS = 'hisDocument';
  constructor(
      private location: Location,
      private router: Router,
      private hisService: HISService,
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    console.log(this.data);
    this.getListUpsAux();

  }

  ngOnInit(): void {
  }
  getListUpsAux() {
    this.hisService.getListaUpsAux(this.data.id).subscribe((res: any) => {
      console.log('cod', res.cod);
      if (res.object == null) {
        this.location.back();
        Swal.fire({
          icon: 'warning',
          title: 'No es Posible crear HIS ya que no posee diagnosticos',
          showConfirmButton: false,
          timer: 2000
        });
        return
      }
      this.listDataHIS = res.object;
      Swal.fire({
        icon: 'success',
        title: 'Se creo HIS correctamente',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  generarHis(rowData: any) {
    console.log(rowData);
    this.router.navigate(['dashboard/his/his'])
    let data: any =
        {
          nroDoc: rowData.nroDoc,
          nroHcl: rowData.nroHcl,
          tipoDoc:rowData.tipoDoc,
          nombreUPSaux:rowData.nombreUPSaux,
          idConsulta: rowData.idConsulta
        }
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));

  }
}
