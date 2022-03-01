import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {inmunizaciones} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {InmunizacionesService} from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import {dato} from "../../../../../../models/data";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {
  inmunizacionFC: FormGroup
  fechaTentativaDisabled: boolean = true;
  inmunizacion: inmunizaciones
  fechaTentativa = new Date();
  dataDocumento: dato
  attributeLocalS = 'documento'

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public inmunizacionesService: InmunizacionesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.dataDocumento = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.inmunizacion = this.config.data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getInmunizacion();
  }

  buildForm() {
    this.inmunizacionFC = new FormGroup({
      fechaTentativa: new FormControl('', Validators.required),
      fechaAplicacion: new FormControl('', Validators.required),
      lote: new FormControl(null, [Validators.required]),
      fechaVencimiento: new FormControl('', [Validators.required]),
    })
  }

  getFC(control: string): AbstractControl {
    return this.inmunizacionFC.get(control)
  }

  getInmunizacion() {
    this.getFC('fechaTentativa').setValue(this.inmunizacion.fechaTentativa)
    this.getFC('fechaAplicacion').setValue(new Date());//o seteamos con la fecha de consulta
  }

  cambioEstado(valor) {
    console.log('----------------')
    const recojido = valor.value;
    this.fechaTentativaDisabled = recojido === 'si' ? false : true
  }

  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split('T')
    const parte2 = parte1[1].split('.')[0]
    return `${parte1[0]}`
  }

  save() {
    const requestInput = {
      nombre: this.inmunizacion.nombre,
      dosis: this.inmunizacion.dosis,
      tipoDosis: this.inmunizacion.tipoDosis,
      codPrestacion: "099",
      codigoProcedimientoHIS: "16546",
      codigoProcedimientoSIS: "16546",
      idIpressSolicitante: "616de45e0273042236434b51",//defecto posta medica
      datosPaciente: {
        tipoDoc: this.dataDocumento.tipoDoc,
        nroDoc: this.dataDocumento.nroDocumento,
      },
      viaAdministracion: "intravenosa",
      cantidad: "0.5cc",
      lote: this.getFC('lote').value,
      fechaVencimiento: "2022-12-12",
      fechaAdministracion: this.obtenerFecha(this.getFC('fechaAplicacion').value),
      idConsulta:this.dataDocumento.idConsulta
      // idConsulta: "6219054257621e0c1d5671f7"
    }
    this.confirmationService.confirm({
      header: "Confirmación",
      message: "Esta Seguro que desea guardar inmunizacion",
      icon: "pi  pi-exclamation-triangle ",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.inmunizacionesService.postInmunizaciones(requestInput).subscribe(() => {
          this.ref.close('agregado')
        });
      },
      reject: () => {
        // console.log("no se borro");
      },
    });

  }

  cancelar() {
    this.ref.close("cancelado");
    // console.log('estado invalido',this.getFC('fechaTentativa').valid)
    // console.log('estado invalido',this.getFC('fechaAplicacion').valid)
    // console.log('estado invalido',this.getFC('lote').valid)
    // console.log('estado invalido',this.getFC('administracion').valid)

  }

}
