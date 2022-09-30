import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AtencionesService } from '../../../h-clinica-materno-perinatal/services/atenciones/Atenciones.service';
import { LoginRolComponent } from '../../../../../../login/login-rol/login-rol.component';

@Component({
  selector: 'app-atenciones-prenatales-modal',
  templateUrl: './atenciones-prenatales-modal.component.html',
  styleUrls: ['./atenciones-prenatales-modal.component.css']
})
export class AtencionesPrenatalesModalComponent implements OnInit {
  idFiliacion:any
  listaAtenciones:any[]
  constructor(private atencionesService: AtencionesService) {
    this.idFiliacion = JSON.parse(localStorage.getItem('gestacion'));
   }

  ngOnInit(): void {
    this.getAtencionesDeFiliacion()
  }
  getAtencionesDeFiliacion() {
    this.atencionesService.getAtencionService(this.idFiliacion.id).toPromise().then((res: any) => {
        if(res.object !=null){
            this.listaAtenciones = res.object;
            console.log(this.listaAtenciones[1]);
            
        }
    })
    .catch(error=>{console.log(error);
     })
}

}
