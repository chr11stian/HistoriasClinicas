import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IntervaloPartoService } from '../../../plan-parto/services/intervalo-parto/intervalo-parto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-plan-parto',
  templateUrl: './modal-plan-parto.component.html',
  styleUrls: ['./modal-plan-parto.component.css']
})
export class ModalPlanPartoComponent implements OnInit {
  formPlanParto: FormGroup
  form: FormGroup
  casaMaterna: any[] = []
  dataRecivida: any
  idFiliacion: string = ''
  tienePlan: boolean = false
  edadGestacional: number = 0
  datePipe = new DatePipe('en-US');
  respuestaGetPlanParto: any
  fecha: Date
  constructor(private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private intervaloPartoService: IntervaloPartoService) {
    this.casaMaterna = [{ name: 'Si', code: 'Si' }
      , { name: 'No', code: 'No' }];
    this.buildForm()
    this.buildForm2()
    this.fecha = JSON.parse(localStorage.getItem("datosConsultaActual")) ? JSON.parse(localStorage.getItem("datosConsultaActual")).fecha : this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  }
  ngOnInit(): void {
    this.dataRecivida = this.config.data
    this.edadGestacional = this.dataRecivida.edadGestacional
    this.idFiliacion = this.dataRecivida.idFiliacion
    this.respuestaGetPlanParto = this.dataRecivida.respuestaGetPlanParto
    this.getPlanParto()
  }
  buildForm() {
    this.formPlanParto = new FormGroup({
      nombresApellidos: new FormControl({ value: '', disabled: true }),
      edad: new FormControl({ value: '', disabled: true }),
      HCL: new FormControl({ value: '', disabled: true }),
      GrupoSanguineo: new FormControl(''),
      FPP: new FormControl({ value: '', disabled: true }),
      direccionAnexo: new FormControl({ value: '', disabled: true }),
      direccionReferencia: new FormControl(''),
      EESS: new FormControl({ value: '', disabled: true }),
      MicroRed: new FormControl(''),
      Red: new FormControl(''),
      TelfEESS: new FormControl(''),
      FrecuenciaRadio: new FormControl(''),
      TelfComunidad: new FormControl(''),
      nombrePromotorSalud: new FormControl(''),
      tiempoLlegarEESS: new FormControl(''),
    })
  }
  buildForm2() {
    this.form = new FormGroup({
      fecha: new FormControl({ value: new Date(), disabled: false }, Validators.required),
      edadGestacional: new FormControl({ value: '', disabled: false }, Validators.required),
      dondeParto: new FormControl({ value: '', disabled: false }),
      quienAtenderaParto: new FormControl({ value: '', disabled: false }),
      posicionParto: new FormControl({ value: '', disabled: false }),
      transporteParto: new FormControl({ value: '', disabled: false }),
      quienAcompaniaraEess: new FormControl({ value: '', disabled: false }),

      vomitosFrecuentes: new FormControl({ value: '', disabled: false }),
      palidez: new FormControl({ value: '', disabled: false }),
      calentura: new FormControl({ value: '', disabled: false }),
      dolorCabeza: new FormControl({ value: '', disabled: false }),
      hinchazon: new FormControl({ value: '', disabled: false }),
      dolores: new FormControl({ value: '', disabled: false }),
      movimientoBebe: new FormControl({ value: '', disabled: false }),
      malAcomodado: new FormControl({ value: '', disabled: false }),
      perdidaLiquidos: new FormControl({ value: '', disabled: false }),
      otras: new FormControl({ value: '', disabled: false }),
      quienCuidaraHijos: new FormControl({ value: '', disabled: false }),
      aceptariaCasaMaterna: new FormControl({ value: '', disabled: false }),
      cuandoIrCasaMaterna: new FormControl({ value: '', disabled: false }),
      // firmaGestante:new FormControl({value:'',disabled:false}),
    })
  }
  getFC(control: string): AbstractControl {
    return this.formPlanParto.get(control);
  }
  getFC2(control: string): AbstractControl {
    return this.form.get(control);
  }
  getPlanParto() {
    // this.intervaloPartoService.getPlanbyIdFiliacion(this.idFiliacion).subscribe((resp:any)=>{

    const datosPersonales = this.respuestaGetPlanParto

    this.getFC('nombresApellidos').setValue(datosPersonales.nombreGestante)
    this.getFC('edad').setValue(datosPersonales.edad)
    this.getFC('HCL').setValue(datosPersonales.nroHcl)
    this.getFC('GrupoSanguineo').setValue(datosPersonales.grupoSanguineo)
    this.getFC('FPP').setValue(datosPersonales.fpp)
    this.getFC('direccionAnexo').setValue(datosPersonales.direccion)
    this.getFC('direccionReferencia').setValue(datosPersonales.referenciaDireccion != null ? datosPersonales.referenciaDireccion : '')
    this.getFC('EESS').setValue(datosPersonales.eess)
    this.getFC('MicroRed').setValue(datosPersonales.microRed)
    this.getFC('Red').setValue(datosPersonales.red)
    this.getFC('TelfEESS').setValue(datosPersonales.telefonoEess)
    this.getFC('FrecuenciaRadio').setValue(datosPersonales.frecuenciaRadioEess != null ? datosPersonales.frecuenciaRadioEess : '')
    this.getFC('TelfComunidad').setValue(datosPersonales.telefonoComunidad != null ? datosPersonales.telefonoComunidad : '')
    this.getFC('nombrePromotorSalud').setValue(datosPersonales.nombrePromotorSalud != null ? datosPersonales.nombrePromotorSalud : '')
    this.getFC('tiempoLlegarEESS').setValue(datosPersonales.tiempoLlegarEess != null ? datosPersonales.tiempoLlegarEess : '')

    this.getFC2('edadGestacional').setValue(this.dataRecivida.edadGestacional)
    this.getFC2('fecha').setValue(new Date(this.fecha))
    if (this.dataRecivida.tienePlan) {
      this.tienePlan = true
    }
    else {
      return
    }
    const planItems = this.respuestaGetPlanParto.planItems[0]
    this.getFC2('fecha').setValue(new Date(planItems.fecha + ' 00:00:00'))
    this.getFC2('edadGestacional').setValue(planItems.items[0].valor)
    this.getFC2('dondeParto').setValue(planItems.items[1].valor)
    this.getFC2('quienAtenderaParto').setValue(planItems.items[2].valor)
    this.getFC2('posicionParto').setValue(planItems.items[3].valor)
    this.getFC2('transporteParto').setValue(planItems.items[4].valor)
    this.getFC2('quienAcompaniaraEess').setValue(planItems.items[5].valor)
    this.getFC2('vomitosFrecuentes').setValue(planItems.items[6].valor === "true" ? ["true"] : [])
    this.getFC2('palidez').setValue(planItems.items[7].valor === "true" ? ["true"] : [])
    this.getFC2('calentura').setValue(planItems.items[8].valor === "true" ? ["true"] : [])
    this.getFC2('dolorCabeza').setValue(planItems.items[9].valor === "true" ? ["true"] : [])
    this.getFC2('hinchazon').setValue(planItems.items[10].valor === "true" ? ["true"] : [])
    this.getFC2('dolores').setValue(planItems.items[11].valor === "true" ? ["true"] : [])
    this.getFC2('movimientoBebe').setValue(planItems.items[12].valor === "true" ? ["true"] : [])
    this.getFC2('malAcomodado').setValue(planItems.items[13].valor === "true" ? ["true"] : [])
    this.getFC2('perdidaLiquidos').setValue(planItems.items[14].valor === "true" ? ["true"] : [])
    this.getFC2('otras').setValue(planItems.items[15].valor)
    this.getFC2('quienCuidaraHijos').setValue(planItems.items[16].valor)
    this.getFC2('aceptariaCasaMaterna').setValue(planItems.items[17].valor)
    this.getFC2('cuandoIrCasaMaterna').setValue(planItems.items[18].valor)
    // })

  }
  guardar() {
    const inputRequest = {
      nombreGestante: this.getFC('nombresApellidos').value,
      edad: this.getFC('edad').value,
      nroHcl: this.getFC('HCL').value,
      grupoSanguineo: this.getFC('GrupoSanguineo').value,
      fpp: this.getFC('FPP').value,
      direccion: this.getFC('direccionAnexo').value,
      referenciaDireccion: this.getFC('direccionReferencia').value,
      eess: this.getFC('EESS').value,
      microRed: this.getFC('MicroRed').value,
      red: this.getFC('Red').value,
      telefonoEess: this.getFC('TelfEESS').value,
      frecuenciaRadioEess: this.getFC('FrecuenciaRadio').value,
      telefonoComunidad: this.getFC('TelfComunidad').value,
      nombrePromotorSalud: this.getFC('nombrePromotorSalud').value,
      tiempoLlegarEess: this.getFC('tiempoLlegarEESS').value,
      planItems: [
        {
          fecha: this.datePipe.transform(this.getFC2('fecha').value, 'yyyy-MM-dd'),
          items: [
            {
              nombre: "edad gestacional",
              valor: this.getFC2('edadGestacional').value
            },
            {
              nombre: "donde se atendera su parto",
              valor: this.getFC2('dondeParto').value
            },
            {
              nombre: "quien desea que le atienda su parto",
              valor: this.getFC2('quienAtenderaParto').value
            },
            {
              nombre: "en que posicion prefiere dar su parto",
              valor: this.getFC2('posicionParto').value
            },
            {
              nombre: "como se va a transportar en el momento del parto o en caso de emergencia",
              valor: this.getFC2('transporteParto').value
            },
            {
              nombre: "quien le acompañara o avisara al establecimiento de salud...",
              valor: this.getFC2('quienAcompaniaraEess').value
            },
            {
              nombre: "si tiene vomitos frecuentes",
              valor: (this.getFC2('vomitosFrecuentes').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si hay palides de la cara y cansancio",
              valor: (this.getFC2('palidez').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes calentura(fiebre)",
              valor: (this.getFC2('calentura').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes dolor de cabeza vision borrosa(si ves lucesitas) zumbido de oidos",
              valor: (this.getFC2('dolorCabeza').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes hinchazon de pies,manos o cara",
              valor: (this.getFC2('hinchazon').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes dolores antes de la fecha de parto y endurecimiento del vientre",
              valor: (this.getFC2('dolores').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes poco o falta de movimiento del bebe",
              valor: (this.getFC2('movimientoBebe').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si el bebe esta mal acomodado",
              valor: (this.getFC2('malAcomodado').value)[0] == 'true' ? true : false
            },
            {
              nombre: "si tienes perdida de sangre o de liquido por la vagina",
              valor: (this.getFC2('perdidaLiquidos').value)[0] == 'true' ? true : false
            },
            {
              nombre: "otras infecciones",
              valor: this.getFC2('otras').value
            },
            {
              nombre: "quien cuidara sus hijos y su casa y animales durante su ausencia",
              valor: this.getFC2('quienCuidaraHijos').value
            },
            {
              nombre: "aceptaria ir a la casa materna u otro cerca del establecimiento",
              valor: this.getFC2('aceptariaCasaMaterna').value
            },
            {
              nombre: "sabe cuando debe ir a la casa materna",
              valor: this.getFC2('cuandoIrCasaMaterna').value
            }



          ]
        }
      ],
      necesitoParaMiBebe: ["roponcito", "pañales"],
      necesitoParaMama: ["toalla", "mantita"],
      documentos: ["copia de dni"],
      senialesPeligroDespuesPartoMadre: ["dolor de cabeza"],
      senialesPeligroNinio: ["bebe morado"]
    }

    this.intervaloPartoService.postPlanPartoByIdFiliacion(this.idFiliacion, inputRequest).subscribe((resp) => {
      this.ref.close('agregado')
    })
  }
  closeDialog() {
    this.ref.close();
  }

}
