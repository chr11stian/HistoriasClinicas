import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {

  options:any[]
  citas:any[]

  constructor(private router: Router,
              private rutaActiva:ActivatedRoute) { }
  get titulo(){
    return this.rutaActiva.snapshot.params.tipoConsulta
  }

  ngOnInit(): void {
    // this.titulo= this.rutaActiva.snapshot.params.tipoConsulta,
    this.options = [
      {name: 'DNI', code: 1},
      {name: 'CARNET RN', code: 2},
      {name: 'C EXTRANJERIA', code: 3},
      {name: 'OTROS', code: 4},
    ]
    this.citas = [
      {
        dni: 'DNI', /** no debe haber */
        tipoDoc: 'DNI',
        nroDoc: '76142532',
        apellidos: 'HUAMANI CAPCHA',
        nombres: 'SARELA',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
      {
        dni: 'DNI', /** no debe haber */
        tipoDoc: 'DNI',
        nroDoc: '73145986',
        apellidos: 'OLAZABAL CALLER',
        nombres: 'LETICIA GIULIANA',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
    ]
  }
  atender(row:any): void {
    /** redirigir a atencion de usuario */
    this.router.navigate(['/dashboard/consulta-generica/citas/consulta-principal'], {
      queryParams: {
        'tipoDoc': 'DNI',
        'nroDoc': row.nroDoc,
      }
    })
  }
  irConsulta(row){
    this.router.navigate(['/dashboard/adolescente/citas/consulta'], row)
  }

}
