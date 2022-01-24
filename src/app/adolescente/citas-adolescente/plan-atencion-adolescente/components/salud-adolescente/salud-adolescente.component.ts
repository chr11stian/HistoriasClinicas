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
  isUpdate=false;
  siNo = [{name: 'Si', code: 'si'},
    {name: 'No', code: 'no'}]
  saludFG: FormGroup
  tipoDNI: string;
  nroDNI: string;

  menarquiaEspermarquia:boolean=true;
  inicioRelacionSexual:boolean=true;
  abuso:boolean=true
  embarazo:boolean=true
  hijos:boolean=true
  aborto:boolean=true

  constructor(private saludSexualReproductivaService: SaludSexualReproductivaService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute) {
  }

  buildForm() {
    this.saludFG = new FormGroup({
      menarquiaEspermarquia: new FormControl('', Validators.required),
      menarquiaEspermarquiaEdad: new FormControl(null, Validators.required),
      inicioRelacionSexual: new FormControl('', Validators.required),
      inicioRelacionSexualEdad: new FormControl(null, Validators.required),
      abusoSexual: new FormControl('', Validators.required),
      abusoSexualNro: new FormControl(null, Validators.required),
      embarazo: new FormControl('', Validators.required),
      embarazoNro: new FormControl(null, Validators.required),
      hijos: new FormControl('', Validators.required),
      hijosNro: new FormControl(null, Validators.required),
      aborto: new FormControl('', Validators.required),
      abortoNro: new FormControl(null, Validators.required),
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
    // this.tipoDNI='DNI';
    // this.nroDNI='10101010';
    this.buildForm()
    this.getSaludSexualResproductiva()
  }

  getFC(control: string): AbstractControl {
    return this.saludFG.get(control);
  }

  getSaludSexualResproductiva() {
    this.saludSexualReproductivaService.getSalud(this.tipoDNI, this.nroDNI).subscribe((resp:any) => {
      if(resp.cod=='2005'){
        this.isUpdate=true;
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Registro recuperado',
        //   detail: 'Registro recuperado'
        // });
        const data = resp['object']
        this.getFC('menarquiaEspermarquia').setValue(data.menarquiaEspermarquia )
        // this.getFC('menarquiaEspermarquia').value=='si'?this.menarquiaEspermarquia=false:this.menarquiaEspermarquia=true;
        this.getFC('menarquiaEspermarquiaEdad').setValue(data.menarquiaEspermarquiaEdad)
        this.getFC('inicioRelacionSexual').setValue(data.inicioRelacionSexual)
        // this.getFC('inicioRelacionSexual').value=='si'?this.inicioRelacionSexual=false:this.inicioRelacionSexual  =true;
        this.getFC('inicioRelacionSexualEdad').setValue(data.edadInicioRelacionSexual)

        this.getFC('abusoSexual').setValue(data.antecedentes[0].valor)
        // this.getFC('abusoSexual').value=='si'?this.abuso=false:this.abuso=true;
        this.getFC('abusoSexualNro').setValue(data.antecedentes[0].nro)
        this.getFC('embarazo').setValue(data.antecedentes[1].valor)
        // this.getFC('embarazo').value=='si'?this.embarazo=false:this.embarazo=true;
        this.getFC('embarazoNro').setValue(data.antecedentes[1].nro)
        this.getFC('hijos').setValue(data.antecedentes[2].valor)
        // this.getFC('hijos').value=='si'?this.hijos=false:this.hijos=true;
        this.getFC('hijosNro').setValue(data.antecedentes[2].nro)
        this.getFC('aborto').setValue(data.antecedentes[3].valor)
        // this.getFC('aborto').value=='si'?this.aborto=false:this.aborto=true;
        this.getFC('abortoNro').setValue(data.antecedentes[3].nro)

        this.getFC('observaciones').setValue(data.observaciones[0])

        this.getFC('usaMetodoAnticonceptivo').setValue(data.prevencion[0].valor)
        this.getFC('usaMetodoAnticonceptivoEspecifique').setValue(data.prevencion[0].especificar)
        this.getFC('sabePrevenirEmbarazoNoDeseado').setValue(data.prevencion[1].valor)
        this.getFC('sabePrevenirEmbarazoNoDeseadoEspecifique').setValue(data.prevencion[1].especificar)
        this.getFC('sabePrevenirITSVIH').setValue(data.prevencion[2].valor)
        this.getFC('sabePrevenirITSVIHEspecifique').setValue(data.prevencion[2].especificar)
      }
      else{
        // this.messageService.add({
        //   severity: 'danger',
        //   summary: 'Ingrese registro',
        //   detail: 'Ingrese nuevo registro'
        // });
      }
    })
  }


  save() {
    const inputRequest = {
      "menarquiaEspermarquia": this.getFC('menarquiaEspermarquia').value,
      "menarquiaEspermarquiaEdad": this.getFC('menarquiaEspermarquiaEdad').value,
      "inicioRelacionSexual": this.getFC('inicioRelacionSexual').value,
      "edadInicioRelacionSexual": this.getFC('inicioRelacionSexualEdad').value,
      "antecedentes": [
        {
          "nombre":"sexual",
          "valor": this.getFC('abusoSexual').value,
          "nro":this.getFC('abusoSexualNro').value
        }, {
          "nombre":"embarazo",
          "valor": this.getFC('embarazo').value,
          "nro":this.getFC('embarazoNro').value
        },
        {
          "nombre":"hijos",
          "valor": this.getFC('hijos').value,
          "nro":this.getFC('hijosNro').value
        },
        {
          "nombre":"aborto",
          "valor": this.getFC('aborto').value,
          "nro": this.getFC('abortoNro').value
        }
      ],
      "prevencion": [
        {
          "nombre":'usaMetodo',
          "valor": this.getFC('usaMetodoAnticonceptivo').value,
          "especificar": this.getFC('usaMetodoAnticonceptivoEspecifique').value,
        },
        {
          "nombre":'sabePrevenir',
          "valor": this.getFC('sabePrevenirEmbarazoNoDeseado').value,
          "especificar": this.getFC('sabePrevenirEmbarazoNoDeseadoEspecifique').value,
        },
        {
          "nombre":'sabePrevenirITS',
          "valor": this.getFC('sabePrevenirITSVIH').value,
          "especificar": this.getFC('sabePrevenirITSVIHEspecifique').value,
        }
      ],
      "observaciones": [ this.getFC('observaciones').value]

    }
    this.saludSexualReproductivaService.saveSalud(this.tipoDNI,this.nroDNI,inputRequest).subscribe((resp)=>{
      let mensaje='Registro Agregado'
      if(this.isUpdate){
        mensaje='Registro Actualizado'
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Satisfactorio',
        detail: mensaje
      });
    })
  }
}
