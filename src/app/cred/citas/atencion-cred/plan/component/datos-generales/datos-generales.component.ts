import { Component, OnInit } from "@angular/core"
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms"

@Component({
  selector: "app-datos-generales",
  templateUrl: "./datos-generales.component.html",
  styleUrls: ["./datos-generales.component.css"],
})
export class DatosGeneralesComponent implements OnInit {
  form: FormGroup
  options: any[]
  stateOptions: any[]
  stateOptions1: any[]
  stateOptions2: any[]

  generalInfoFG: FormGroup
  apoderadoInfoFG: FormGroup

  /** Get one form control*/
  getGeneralInfoFC(control: string): AbstractControl {
    return this.generalInfoFG.get(control)
  }

  /** Get Value Form Control */
  valueGeneralInfoFC(control: string): any {
    return this.getGeneralInfoFC(control).value
  }

  /** Set Value Form Control */
  setValueGeneralInfoFC(formControl: string, value: any) {
    this.getGeneralInfoFC(formControl).setValue(value)
  }
  constructor() {
    this.buildForm()
    this.options = [
      { name: "DNI", code: 1 },
      { name: "CARNET RN", code: 2 },
      { name: "C EXTRANJERIA", code: 3 },
      { name: "OTROS", code: 4 },
    ]
    this.stateOptions = [
      { label: "F", value: 1 },
      { label: "M", value: 2 },
    ]
    this.stateOptions1 = [
      { label: "GS", value: 1 },
      { label: "NO", value: 2 },
    ]
    this.stateOptions2 = [
      { label: "RH", value: 1 },
      { label: "NO", value: 2 },
    ]
  }

  ngOnInit(): void {}
  buildForm(): void {

  this.generalInfoFG = new FormGroup({
    nombre: new FormControl({value: '', disabled: false}, [Validators.required]),
    apellidos: new FormControl({value: '', disabled: false}, [Validators.required]),
    sexo : new FormControl({value: null, disabled: false}),
    lugar: new FormControl({value: '', disabled: false}, [Validators.required]),
    fechaNacimiento: new FormControl({value: null, disabled: false}, [Validators.required]),
    domicilio: new FormControl({value: '', disabled: false}, [Validators.required]),
    dni: new FormControl({value: '', disabled: false}, [Validators.required]),
    GS : new FormControl({value: null, disabled: false}),
    RH : new FormControl({value: null, disabled: false})})

    this.apoderadoInfoFG = new FormGroup({
      centroMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      telefonoMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      nombreMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      edadMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      dniMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      codigoMadre : new FormControl({value: null, disabled: false}),
      codigoAfiliacionMadre: new FormControl({value: '', disabled: false}, [Validators.required]),

      centroPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      telefonoPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      nombrePadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      edadPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      dniPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
      codigoPadre : new FormControl({value: null, disabled: false}),
      codigoAfiliacionPadre: new FormControl({value: '', disabled: false}, [Validators.required])
    })   
  }
}
