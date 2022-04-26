import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
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
  listaHisGenerados:any[];
  data:any;
  attributeLocalS = 'hisDocument';
  idConsulta:any;
  estadoG:boolean[]=[];
  constructor(
      private location: Location,
      private router: Router,
      private route: ActivatedRoute,
      private hisService: HISService,
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    console.log("data extras",this.data);
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
            if(params['tipoConsulta']!='CRED' || params['tipoConsulta']!='CONSULTA GESTANTE'){
                if (params['idConsulta']) {
                    this.idConsulta = params['idConsulta']
                } else {
                    this.location.back();
                }
            }else{
                if(params['tipoConsulta']=='CRED'){
                    if (params['idConsulta']) {
                        this.idConsulta = params['idConsulta']
                    } else {
                        this.router.navigate(['/dashboard/cred/lista-consulta'])
                    }
                }
                else {
                    if (params['tipoConsulta']=='CONSULTA GESTANTE') {
                        this.idConsulta = params['idConsulta']
                    } else {
                        this.router.navigate(['/dashboard/obstetricia-general/citas/consulta'])
                    }
                }
            }


        })
      this.getListUpsAux();

  }

  ngOnInit(): void {

  }
  getListUpsAux() {
    this.hisService.getListaUpsAux(this.idConsulta).subscribe((res: any) => {
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
      else{
          this.listDataHIS = res.object;
          this.getListUpsAuxCreados();
          console.log(this.listDataHIS);
          Swal.fire({
              icon: 'success',
              title: 'Se creo HIS correctamente',
              showConfirmButton: false,
              timer: 2000
          });}
    })
  }

  getListUpsAuxCreados() {
    this.hisService.getListaHisGenerados(this.idConsulta).subscribe((res: any) => {
      this.listaHisGenerados = res.object;
        console.log(this.listaHisGenerados);
      this.encontrarEstado();
    })
  }

  encontrarEstado(){
      console.log(this.listDataHIS);
      console.log(this.listaHisGenerados);
      if(this.listaHisGenerados!=null)
      { for(let i = 0;i<this.listDataHIS.length;i++){
          this.estadoG[i] = this.listaHisGenerados.some(element =>
              element.upsAuxiliar == this.listDataHIS[i].nombreUPSaux
            )
         }
      }
      console.log(this.estadoG);
  }

  generarHis(rowData: any,rowIndex:any) {
    console.log(rowData);
    this.router.navigate(['dashboard/his/his'])
    let data: any =
        {
          nroDoc: rowData.nroDoc,
          nroHcl: rowData.nroHcl,
          tipoDoc:rowData.tipoDoc,
          nombreUPSaux:rowData.nombreUPSaux,
          idConsulta: rowData.idConsulta,
          estadoG:this.estadoG[rowIndex]
        }
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
  }

  verHis(rowData: any,rowIndex:any) {
    console.log(rowData);
    this.router.navigate(['dashboard/his/his'])
    let data: any =
        {
           idConsulta: rowData.idConsulta,
           nombreUPSaux:rowData.nombreUPSaux,
           idHis:rowData.id,
           estadoG:this.estadoG[rowIndex]
        }
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
  }
}
