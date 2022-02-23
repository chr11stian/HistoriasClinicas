import { Component, OnInit } from '@angular/core';
import { EedpService } from '../../services/eedp.service';

@Component({
  selector: 'app-tabla-eedp-desarrollo-psicomotor',
  templateUrl: './tabla-eedp-desarrollo-psicomotor.component.html',
  styleUrls: ['./tabla-eedp-desarrollo-psicomotor.component.css']
})
export class TablaEedpDesarrolloPsicomotorComponent implements OnInit {

  datosNinio: any;
  dataTabla: any;

  constructor(
    private eedpService: EedpService,
  ) { }

  ngOnInit(): void {
    this.eedpService.getDatosTablaEEDP().then(res => {
      this.dataTabla = res;
      console.log('data de tabla res eedp ', this.dataTabla);
    });
  }

  funcionLeerDatos(value){
    console.log('dato en posicion ', value)
  }
}
