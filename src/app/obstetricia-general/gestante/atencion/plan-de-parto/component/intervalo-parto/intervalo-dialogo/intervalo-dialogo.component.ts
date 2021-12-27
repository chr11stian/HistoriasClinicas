import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { IntervaloPartoService } from '../../../services/intervalo-parto/intervalo-parto.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-intervalo-dialogo',
  templateUrl: './intervalo-dialogo.component.html',
  styleUrls: ['./intervalo-dialogo.component.css']
})
export class IntervaloDialogoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];
  idObstetricia: string;
  datePipe = new DatePipe('en-US');
  estadoEdicion: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public obstetriciaIntervalos: IntervaloPartoService,
    private ref: DynamicDialogRef,
    private obstetriciaGeneralService: ObstetriciaGeneralService,
    public config: DynamicDialogConfig
  ) {
    this.idObstetricia = this.obstetriciaGeneralService.idGestacion;
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
    this.estadoEdicion = false;
    if (config.data) {
      this.llenarCamposEdicionIntervalo();
      this.estadoEdicion = true;
    }
  }
  buildForm() {
    this.form = this.formBuilder.group({
      fecha: ['', [Validators.required]],
      edadGestacional: [''],
      dondeParto: [''],
      quienAtenderaParto: [''],
      posicionParto: [''],
      transporteParto: [''],
      quienAcompaniaraEess: [''],
      vomitosFrecuentes: [''],
      palidez: [''],
      calentura: [''],
      dolorCabeza: [''],
      hinchazon: [''],
      dolores: [''],
      movimientoBebe: [''],
      malAcomodado: [''],
      perdidaLiquidos: [''],
      otras: [''],
      quienCuidaraHijos: [''],
      aceptariaCasaMaterna: [''],
      cuandoIrCasaMaterna: [''],
      firmaGestante: [''],
    })
  }

  closeDialogGuardar() {
    var atencion = {
      fecha: this.datePipe.transform(this.form.value.fecha, 'dd-MM-yyyy'),
      items: [{
        nombre: "edad gestacional",
        valor: this.form.value.edadGestacional
      },
      {
        nombre: "donde se atendera su parto",
        valor: this.form.value.dondeParto
      },
      {
        nombre: "quien desea que le atienda su parto",
        valor: this.form.value.quienAtenderaParto
      },
      {
        nombre: "en que posicion prefiere dar su parto",
        valor: this.form.value.posicionParto
      },
      {
        nombre: "como se va transportar en el momento del parto o en caso de emergencia",
        valor: this.form.value.transporteParto
      },
      {
        nombre: "quien le acompaniara o avisara al establecimiento de salud",
        valor: this.form.value.quienAcompaniaraEess
      },
      {
        nombre: "si tienes vomitos frecuentes",
        valor: this.form.value.vomitosFrecuentes
      },
      {
        nombre: "si hay palidez de la cara y cansancio",
        valor: this.form.value.palidez
      },
      {
        nombre: "si tienes calentura",
        valor: this.form.value.calentura
      },
      {
        nombre: "si tienes dolor de cabeza",
        valor: this.form.value.dolorCabeza
      },
      {
        nombre: "si tienes hinchazon de pies, manos o cara",
        valor: this.form.value.hinchazon
      },
      {
        nombre: "si tienes dolores antes de la fecha de parto y endurecimiento de vientre",
        valor: this.form.value.dolores
      },
      {
        nombre: "si tienes poco o falta de movimiento del bebe",
        valor: this.form.value.movimientoBebe
      },
      {
        nombre: "si el bebe esta mal acomodado",
        valor: this.form.value.malAcomodado
      },
      {
        nombre: "si tienes perdida de sangre, liquidos o infecciones",
        valor: this.form.value.perdidaLiquidos
      },
      {
        nombre: "otras infecciones",
        valor: this.form.value.otras
      },
      {
        nombre: "quien cuidara sus hijos, su casa y animales durante su ausencia",
        valor: this.form.value.quienCuidaraHijos
      },
      {
        nombre: "aceptaria ir a la casa materna u otro cerca del eess",
        valor: this.form.value.aceptariaCasaMaterna
      },
      {
        nombre: "sabe cuando debe ir a la casa materna",
        valor: this.form.value.cuandoIrCasaMaterna
      },
      ]
    }
    console.log('data to save ', atencion);
    if (!this.estadoEdicion) {
      this.obstetriciaIntervalos.postIntervalosParto(this.idObstetricia, atencion).subscribe((res: any) => {
        console.log('se guardo con exito ', res)
        this.ref.close(res);
      })
    }
    else {
      this.obstetriciaIntervalos.editarIntervalosParto(this.idObstetricia, atencion).subscribe((res: any) => {
        console.log('se guardo con exito ', res)
        this.ref.close(res);
      })
    }
    this.estadoEdicion = false;
  }
  closeDialog() {
    this.ref.close();
    this.estadoEdicion = false;
  }
  llenarCamposEdicionIntervalo() {
    let configuracion = this.config.data.row;
    let myDate = configuracion.fecha.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    let newDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    this.form.get('fecha').setValue(newDate);
    this.form.get('edadGestacional').setValue(configuracion.items[0].valor);
    this.form.get('dondeParto').setValue(configuracion.items[1].valor);
    this.form.get('quienAtenderaParto').setValue(configuracion.items[2].valor);
    this.form.get('posicionParto').setValue(configuracion.items[3].valor);
    this.form.get('transporteParto').setValue(configuracion.items[4].valor);
    this.form.get('quienAcompaniaraEess').setValue(configuracion.items[5].valor);
    this.form.get('vomitosFrecuentes').setValue(configuracion.items[6].valor);
    this.form.get('palidez').setValue(configuracion.items[7].valor);
    this.form.get('calentura').setValue(configuracion.items[8].valor);
    this.form.get('dolorCabeza').setValue(configuracion.items[9].valor);
    this.form.get('hinchazon').setValue(configuracion.items[10].valor);
    this.form.get('dolores').setValue(configuracion.items[11].valor);
    this.form.get('movimientoBebe').setValue(configuracion.items[12].valor);
    this.form.get('malAcomodado').setValue(configuracion.items[13].valor);
    this.form.get('perdidaLiquidos').setValue(configuracion.items[14].valor);
    this.form.get('otras').setValue(configuracion.items[15].valor);
    this.form.get('quienCuidaraHijos').setValue(configuracion.items[16].valor);
    this.form.get('aceptariaCasaMaterna').setValue(configuracion.items[17].valor);
    this.form.get('cuandoIrCasaMaterna').setValue(configuracion.items[18].valor);
  }
  ngOnInit(): void {
  }

}
