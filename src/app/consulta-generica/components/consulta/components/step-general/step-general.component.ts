import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatosGeneralesComponent} from "../datos-generales/datos-generales.component";
import {MotivoConsultaComponent} from "../motivo-consulta/motivo-consulta.component";
import {
  DiagnosticoConsultaComponent
} from "../../../../../cred/citas/atencion-cred/consulta-principal/component/diagnostico-consulta/diagnostico-consulta.component";
import {AcuerdosComponent} from "../acuerdos/acuerdos.component";
import {DiagnosticoComponent} from "../diagnostico/diagnostico.component";
import {TratamientoComponent} from "../tratamiento/tratamiento.component";
import {ProcedimientoComponent} from "../procedimiento/procedimiento.component";
import {EvaluacionesComponent} from "../evaluaciones/evaluaciones.component";

@Component({
  selector: 'app-step-general',
  templateUrl: './step-general.component.html',
  styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit {
  data = <any>JSON.parse(localStorage.getItem('documento'))
  /* lo que reciben del paso anterior */
  tipoDoc: string = ''
  nroDoc: string = ''
  /** key de lo que se guarda en el local storage */
  attributeLocalS = 'idConsulta'
  /* 61ae372a42e4dc7ba7de654e */

  options: data[]
  selectedOption: data
  items: any[]
  j: number = 100
  indiceActivo: number = 0
  stepName = 'datos'
  listaTitulo=[
    {code:'NIÑO_NIÑA',display:'MEDICINA GENERAL NIÑO/NIÑA'},
    {code:'ADOLESCENTE',display:'MEDICINA GENERAL ADOLESCENTE'},
    {code:'JOVEN',display:'MEDICINA GENERAL JOVEN'},
    {code:'ADULTO',display:'MEDICINA GENERAL ADULTO'},
    {code:'ADULTO MAYOR',display:'MEDICINA GENERAL ADULTO MAYOR'},
    {code:'ODONTOLOGIA GENERAL',display:'ODONTOLOGIA'},
    {code:'PSICOLOGIA',display:'PSICOLOGIA'},
    {code:'NUTRICION',display:'NUTRICION'},
    {code:'CONSULTA GESTANTE EXTERNA',display:'CONSULTORIO OBSTETRICO'},
  ]
  buscarTipoConsulta(codigo){
    console.log('codigo',codigo);
    
    const aux=this.listaTitulo.find((element)=>{
      return element.code==codigo
    })
    return aux?.display||'SERVICIO NO DISPONIBLE'
  }
  // consulta: ApiConsulta

  @ViewChild(DatosGeneralesComponent) datosGeneralesConsulta: DatosGeneralesComponent;
  @ViewChild(MotivoConsultaComponent) motivoConsulta: MotivoConsultaComponent
  @ViewChild(EvaluacionesComponent) evaluacionesConsulta: EvaluacionesComponent
  @ViewChild(DiagnosticoComponent) diagnosticoConsulta: DiagnosticoComponent
  @ViewChild(AcuerdosComponent) AcuerdosComponent: AcuerdosComponent
  @ViewChild(ProcedimientoComponent) procedimientoConsulta: ProcedimientoComponent
  @ViewChild(TratamientoComponent) tratamientoConsulta: TratamientoComponent


  constructor(
      // private consultaGeneralService: ConsultaGeneralService,
              private route: ActivatedRoute,
              private router: Router) {
    this.options = [
      { name: 'DNI', code: 1 },
      { name: 'CARNET RN', code: 2 },
      { name: 'C EXTRANJERIA', code: 3 },
      { name: 'OTROS', code: 4 },
    ]
  }

  ngDoCheck() {
    this.saveStep()
  }

  async ngOnInit() {
    this.items = [
      { label: 'Datos Generales', styleClass: 'icon' },
      { label: 'Motivo de Consulta', styleClass: 'icon1' },
      { label: 'Exámenes Auxiliares', styleClass: 'icon2' },
      { label: 'Diagnóstico', styleClass: 'icon3' },
      // { label: 'Exámenes Auxiliares', styleClass: 'icon4' },
      { label: 'Tratamiento', styleClass: 'icon5' },
      { label: 'Procedimientos', styleClass: 'icon6' },
      { label: 'Interconsulta', styleClass: 'icon7' },
    ]
    await this.getQueryParams()
  }

  getQueryParams() {
    /*this.route.queryParams
        .subscribe(params => {
            if (params['nroDoc'] && !localStorage.getItem(this.attributeLocalS)) {
                this.tipoDoc = params['tipoDoc']
                this.nroDoc = params['nroDoc']
                console.log('1')
                this.getNuevaConsulta()

            } else if (localStorage.getItem(this.attributeLocalS)) {
                this.getConsulta(localStorage.getItem(this.attributeLocalS))
            } else {
                this.router.navigate(['/dashboard/cred/citas'])
            }
        })*/
  }

  getConsulta(idConsulta: string) {
    // this.consultaGeneralService.traerConsulta(idConsulta).subscribe(
    //     result => {
    //       console.log(result)
    //     }, err => {
    //       console.log(err)
    //     }
    // )
  }

  /*async getNuevaConsulta() {
      await this.consultaGeneralService.crearConsulta(
          {
              'tipoDoc': this.tipoDoc,
              'nroDoc': this.nroDoc,
              'tipoDocProfesional': 'DNI',
              'nroDocProfesional': '45678912'
          }
      ).toPromise().then((result) => {
          this.consulta = result
          console.log('result: ' + result)
          localStorage.setItem(this.attributeLocalS, this.consulta.object.id)
          console.log('2')

      }).catch((err) => {
          console.log(err)
      })
  }*/

  async getNuevaConsulta() {
    // await this.consultaGeneralService.crearConsulta({
    //   'tipoDoc': this.tipoDoc,
    //   'nroDoc': this.nroDoc,
    //   'tipoDocProfesional': 'DNI',
    //   'nroDocProfesional': '45678912'
    // }).subscribe((r) => {
    //   this.consulta = r
    //   console.log('result: ' + r)
    //   localStorage.setItem(this.attributeLocalS, this.consulta.object.id)
    //   this.datosGeneralesConsulta.recuperarData(this.consulta.object.id)
    //   console.log('2')
    // })
  }

  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 6:
        this.stepName = 'finalizar'
        break
      case 5:
        this.stepName = 'procedimiento'
        break
      case 4:
        this.stepName = 'tratamiento'
        break
      case 3:
        this.stepName = 'diagnostico'
        break
      case 2:
        this.stepName = 'evaluaciones'
        break
      case 1:
        this.stepName = 'motivo'
        break
      case 0:
        this.stepName = 'datos'
        break
    }
  }

  //--cambia step
  ChangeStep(event: number) {
    this.indiceActivo = event
    this.name()
  }

  // pasamos al siguiente step
  nextPage() {
    switch (this.stepName) {
      case 'datos':
        this.datosGeneralesConsulta.guardarActualizar()
        this.stepName = 'motivo';
        this.indiceActivo = 1;
        break;
      case 'motivo':
        this.motivoConsulta.save()
        this.stepName = 'evaluaciones';
        this.indiceActivo = 2;
        break;
      case 'evaluaciones':
        // this.motivoConsulta.save()
        this.stepName = 'diagnostico';
        this.indiceActivo = 3;
        break;
      case 'diagnostico':
        this.diagnosticoConsulta.SaveDiagnostico()
        this.stepName = 'tratamiento';
        this.indiceActivo = 4;
        break;

      case 'tratamiento':
        this.stepName = 'procedimiento';
        this.indiceActivo = 5;
        break;

      case 'procedimiento':
        this.procedimientoConsulta.saveProcedimiento();
        this.stepName = 'finalizar';
        this.indiceActivo = 6;
        break;

      case 'finalizar':
        this.AcuerdosComponent.save()
        // this.finalizarConsulta.save()
        break;
    }
  }

  // regresamos al anterior step
  prevPage() {
    switch (this.stepName) {
      case 'finalizar':
        console.log('fi ', this.stepName)
        this.stepName = 'procedimiento';
        this.indiceActivo = 5;
        break;
      case 'procedimiento':
        console.log('fi ', this.stepName)
        this.stepName = 'tratamiento';
        this.indiceActivo = 4;
        break;
      case 'tratamiento':
        this.stepName = 'diagnostico';
        this.indiceActivo = 3;
        break;
      case 'diagnostico':
        this.stepName = 'evaluaciones';
        this.indiceActivo = 2;
        break;
      case 'evaluaciones':
        this.stepName = 'motivo';
        this.indiceActivo = 1;
        break;
      case 'motivo':
        this.stepName = 'datos';
        this.indiceActivo = 0;
        break;
      // case 'datos':
      //   this.stepName = 'datos';
      //   this.indiceActivo = 0;
      //   break;
    }
  }

  saveStep() {
    if (this.indiceActivo !== this.j) {
      console.log('j ', this.indiceActivo, this.j)
      switch (this.j) {
        case 7:
          // this.finalizarConsulta.save()
          break
        case 6:
          // this.finalizarConsulta.save()
          break
        case 5:
          //this.tratamientoConsulta.save()
          break
        case 4:
          // this.diagnosticoConsulta.save()
          break
        case 3:
          break
        case 2:
          break
        case 1:
          // this.motivoConsulta.save()
          break
        case 0:
          // this.datosGeneralesConsulta.save()
          break
      }
      this.j = this.indiceActivo
    }
  }

}
interface data {
  name: string
  code: number
}
