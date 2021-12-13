import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultaObstetriciaService } from '../gestante/consulta/services/consulta-obstetricia/consulta-obstetricia.service';
import { ObstetriciaGeneralService } from '../services/obstetricia-general.service';
import { DialogConsultaUniversalComponent } from './dialog-consulta-universal/dialog-consulta-universal.component';

@Component({
  selector: 'app-consultas-no-control',
  templateUrl: './consultas-no-control.component.html',
  styleUrls: ['./consultas-no-control.component.css'],
  providers: [DialogService],
})
export class ConsultasNoControlComponent implements OnInit {
  listaDocumentos: any;
  formConsulta: FormGroup;
  consultas = [];
  ref: DynamicDialogRef;

  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  nroEmbarazo: string;
  nroHcl: string;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private dialog: DialogService,
    private consultaObstetriciaService: ConsultaObstetriciaService,
    private obstetriciaGeneralService: ObstetriciaGeneralService
  ) {
    this.inicializarForm();
    this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
    this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
    this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
    this.nroHcl = this.obstetriciaGeneralService.nroHcl;
    this.recuperarConsultas();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formConsulta = this.fb.group({
      tipoDoc: new FormControl(""),
      nroDoc: new FormControl(""),
    });
  }

  recuperarConsultas() {
    let data = {
      "nroHcl": this.obstetriciaGeneralService.nroHcl,
      "nroEmbarazo": this.obstetriciaGeneralService.nroEmbarazo
    }
    this.consultaObstetriciaService.getDatosConsultasObstetricasListar(data).subscribe((res: any) => {
      console.log('trajo datos exito ', res)
      this.consultas = res.object ? res.object : [];
    })
  }

  openDialogConsultaNuevo() {
    this.ref = this.dialog.open(DialogConsultaUniversalComponent, {
      header: "CONSULTA GENERAL",
      width: "90%",
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data ', data);
    })
  }


}
