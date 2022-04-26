import { Component, OnInit } from '@angular/core';
import { KeyData, Tratamiento } from '../models/fua';
import { FuaService } from '../services/fua.service';

@Component({
  selector: 'app-concepto-prestacional',
  templateUrl: './concepto-prestacional.component.html',
  styleUrls: ['./concepto-prestacional.component.css']
})
export class ConceptoPrestacionalComponent implements OnInit {
  twoOptions: any[];
  listProductosFarm: Tratamiento[] = [];
  listProcedimientosDiagnosticos: any[] = [];
  keyData: KeyData

  constructor(
    private fuaService: FuaService
  ) {
    this.twoOptions = [{ code: "Si", name: "Si" }, {
      code: "No", name: "No"
    }]
    this.keyData = JSON.parse(localStorage.getItem("dataFUA"));
    console.log('data key proc ', this.keyData);
    this.getData();
  }

  ngOnInit(): void {

  }
  getData() {
    this.fuaService.getListaTratamientos(this.keyData.idConsulta).subscribe((res: any) => {
      this.listProductosFarm = res.object;
      console.log('list prod ', this.listProductosFarm);
    });
    this.fuaService.getListaProcedimientosDiag(this.keyData.idConsulta, this.keyData.codPrestacion).subscribe((res: any) => {
      this.listProcedimientosDiagnosticos = res.object.laboratorios
      console.log('list proce ', this.listProcedimientosDiagnosticos);
    });
  }
  changeNgModel() {
    this.listProductosFarm.forEach(item => {
      console.log('item of products ', item);
    })
  }
  deleteProdFarm(index: number, tipe: number) {
    switch (tipe) {
      case 1:
        this.listProductosFarm.splice(index, 1);
        this.listProcedimientosDiagnosticos = [...this.listProcedimientosDiagnosticos];
        break;
      case 2:
        console.log('eliminar2');
        break
      case 3:
        console.log('eliminar3');
        break
      case 4:
        console.log('eliminar4 ');
        break
      default:
        break;
    }
  }
}
