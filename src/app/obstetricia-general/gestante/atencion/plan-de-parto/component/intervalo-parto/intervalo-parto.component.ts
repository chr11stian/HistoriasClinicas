import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IntervaloPartoService } from '../../services/intervalo-parto/intervalo-parto.service';
import { IntervaloDialogoComponent } from './intervalo-dialogo/intervalo-dialogo.component';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
@Component({
  selector: 'app-intervalo-parto',
  templateUrl: './intervalo-parto.component.html',
  styleUrls: ['./intervalo-parto.component.css'],
  providers: [DialogService]
})
export class IntervaloPartoComponent implements OnInit {
  todasAtenciones: any[] =[];
  ref: DynamicDialogRef;
  idObstetricia: string;

  constructor(
    public dialog: DialogService,
    public obstetriciaIntervalos: IntervaloPartoService,
    private obstetriciaGeneralService: ObstetriciaGeneralService
  ) {
    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    this.recuperarIntervalos();
    
  }

  openDialogIntervaloNuevo() {
    this.ref = this.dialog.open(IntervaloDialogoComponent, {
      header: "INTERVALOS DEL PLAN DE PARTO",
      width: "95%",
      contentStyle: {
        "max-height": "800px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
      if(data!==undefined) this.recuperarIntervalos();
    })
  }
  openDialogIntervaloEditar(row, index) {
    console.log(typeof(row.fecha));
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(IntervaloDialogoComponent, {
      header: "INTERVALOS DEL PLAN DE PARTO",
      width: "95%",
      contentStyle: {
        "max-height": "800px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de otro dialog ', data)
      if(data!==undefined) {
        this.recuperarIntervalos();
      };
    })
  }
  
  recuperarIntervalos(){
    console.log('data to save ', this.todasAtenciones);
    this.obstetriciaIntervalos.getIntervalosPartoById(this.idObstetricia).subscribe((res: any) => {
      console.log('trajo datos exito ', res)
      this.todasAtenciones=res.object?res.object:[];
    })
  }

  ngOnInit(): void {}

}
