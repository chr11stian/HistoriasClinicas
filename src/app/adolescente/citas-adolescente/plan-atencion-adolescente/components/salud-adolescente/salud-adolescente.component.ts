import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {SaludSexualReproductivaService} from "../../services/adolescentePAI/salud-sexual-reproductiva.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-salud-adolescente',
  templateUrl: './salud-adolescente.component.html',
  styleUrls: ['./salud-adolescente.component.css']
})
export class SaludAdolescenteComponent implements OnInit {
  siNo = [{name: 'Si', code: 'si'},
    {name: 'No', code: 'no'}]
  saludFG: FormGroup
  tipoDNI: string;
  nroDNI: string;

  constructor(private saludSexualReproductivaService: SaludSexualReproductivaService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute) {
  }

  buildForm() {
    this.saludFG = new FormGroup({
      menarquiaEspermarquia: new FormControl('', Validators.required),
      menarquiaEspermarquiaEdad: new FormControl('', Validators.required),
      inicioRelacionSexual: new FormControl('', Validators.required),
      inicioRelacionSexualEdad: new FormControl('', Validators.required),
      abusoSexual: new FormControl('', Validators.required),
      abusoSexualNro: new FormControl('', Validators.required),
      enbarazo: new FormControl('', Validators.required),
      enbarazoNro: new FormControl('', Validators.required),
      hijos: new FormControl('', Validators.required),
      hijosNro: new FormControl('', Validators.required),
      aborto: new FormControl('', Validators.required),
      abortoNro: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      usaMetodoAnticonceptivo: new FormControl('', Validators.required),
      usaMetodoAnticonceptivoEspecifique: new FormControl('', Validators.required),
      sabePrevenirEmbarazoNoDeseado: new FormControl('', Validators.required),
      sabePrevenirEmbarazoNoDeseadoEspecifique: new FormControl('', Validators.required),
      sabePrevenirITSVIH: new FormControl('', Validators.required),
      sabePrevenirITSVIHEspecifique: new FormControl('', Validators.required),


    })
  }

  ngOnInit(): void {
    this.tipoDNI = this.rutaActiva.snapshot.queryParams.tipoDoc
    this.nroDNI = this.rutaActiva.snapshot.queryParams.nroDoc
    this.buildForm()
    this.getSaludSexualResproductiva()
  }

  getFC(control: string): AbstractControl {
    return this.saludFG.get(control);
  }

  getSaludSexualResproductiva() {
    this.saludSexualReproductivaService.getSalud(this.tipoDNI, this.nroDNI).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Registro recuperado',
        detail: 'Registro recuperado'
      });
      const data = resp['object']
      this.getFC('menarquiaEspermarquia').setValue(data.menarquiaEspermarquia ? 'si' : 'no')
      this.getFC('menarquiaEspermarquiaEdad').setValue(data.menarquiaEspermarquia)
      this.getFC('inicioRelacionSexual').setValue(data.edadInicioRelacionSexual != 0 ? 'si' : 'no')
      this.getFC('inicioRelacionSexualEdad').setValue(data.edadInicioRelacionSexual)
      this.getFC('abusoSexual').setValue(data.antecedentes[0] ? 'si' : 'no')
      this.getFC('abusoSexualNro').setValue(data.antecedentes[0].nro)
      this.getFC('enbarazo').setValue(data.antecedentes[1] ? 'si' : 'no')
      this.getFC('enbarazoNro').setValue(data.antecedentes[1].nro)
      this.getFC('hijos').setValue(data.antecedentes[2] ? 'si' : 'no')
      this.getFC('hijosNro').setValue(data.antecedentes[2].nro)
      this.getFC('aborto').setValue(data.antecedentes[3] ? 'si' : 'no')
      this.getFC('abortoNro').setValue(data.antecedentes[3].nro)
      this.getFC('observaciones').setValue(data.observaciones[0])
      this.getFC('usaMetodoAnticonceptivo').setValue(data.prevencion[0].nombre)
      this.getFC('usaMetodoAnticonceptivoEspecifique').setValue(data.prevencion[0].especificar)
      this.getFC('sabePrevenirEmbarazoNoDeseado').setValue(data.prevencion[1].nombre)
      this.getFC('sabePrevenirEmbarazoNoDeseadoEspecifique').setValue(data.prevencion[1].especificar)
      this.getFC('sabePrevenirITSVIH').setValue(data.prevencion[2].nombre)
      this.getFC('sabePrevenirITSVIHEspecifique').setValue(data.prevencion[2].especificar)
    })
  }

  save() {
    const inputRequest = {
      "menarquiaEspermarquia": "wdw",
      "edadInicioRelacionSexual": "3",
      "antecedentes": [
        {
          "nombre": "si",
          "nro": "2"
        }, {
          "nombre": "no",
          "nro": "1"
        },
        {
          "nombre": "si",
          "nro": "2"
        },
        {
          "nombre": "si",
          "nro": "2"
        }
      ],
      "prevencion": [
        {
          "nombre": "si",
          "especificar": "cualquier cosa"
        },
        {
          "nombre": "no",
          "especificar": "cualquier cosa1"
        },
        {
          "nombre": "si",
          "especificar": "cualquier cosa2"
        }
      ],
      "observaciones": ["algun observacion"]

    }
    console.log(inputRequest)


  }


}
