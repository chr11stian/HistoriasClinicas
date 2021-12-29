import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {ReproCitasComponent} from "../../cred/citas/repro-citas/repro-citas.component";

export interface userCita {
  dni: string
  tipoDoc: string
  nroDoc: string
  apellidos: string
  nombres: string
  consultorio: string
  horario: string
  fecha: string
}

@Component({
  selector: 'app-citas-adulto-mayor',
  templateUrl: './citas-adulto-mayor.component.html',
  styleUrls: ['./citas-adulto-mayor.component.css'],
  providers: [DialogService]
})
export class CitasAdultoMayorComponent implements OnInit {
  options: data[]
  selectedOption: data
  citas: userCita[]


  ref: DynamicDialogRef

  constructor(public dialogService: DialogService,
              private router: Router) {
  }

  ngOnInit(): void {
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
        nroDoc: '89685519',
        apellidos: 'RAMOS PERAEZ',
        nombres: 'RAMON',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
      {
        dni: 'DNI', /** no debe haber */
        tipoDoc: 'DNI',
        nroDoc: '89685520',
        apellidos: 'OLAZABAL CALLER',
        nombres: 'LETICIA GIULIANA',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
    ]
  }

  openReprogramar() {
    let title = 'Reprogramar Cita'
    this.ref = this.dialogService.open(ReproCitasComponent, {
      header: title,
      width: '75%',
    })
  }

  atenderPlan(row: userCita): void {
    /** redirigir a atencion de usuario */
    this.router.navigate(['/dashboard/adulto-mayor/citas/plan'], {
      queryParams: {
        'tipoDoc': 'DNI',
        'nroDoc': row.nroDoc,
      }
    })
  }
  atenderConsulta(row: userCita): void {
    /** redirigir a consulta de usuario */
    this.router.navigate(['/dashboard/adulto-mayor/citas/consulta'], {
      queryParams: {
        'tipoDoc': 'DNI',
        'nroDoc': row.nroDoc,
      }
    })
  }
}

interface data {
  name: string
  code: number
}

