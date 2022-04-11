import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {
  DocumentoIdentidadService
} from "../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import {CuposService} from "../../../core/services/cupos.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {dato} from "../../../cred/citas/models/data";

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit, OnChanges {
  formCitas: FormGroup;
  attributeLocalS = 'consultaGeneral'
  idIpress = "616de45e0273042236434b51";
  listaDocumentosIdentidad:any[]
  options:any[]
  citas:any[]
  datePipe = new DatePipe('en-US');
  DataCuposPaciente:any[];
  DataCupos:any[]
  dataPaciente: any[];
  data: dato

  constructor(private router: Router,
              private rutaActiva:ActivatedRoute,
              private documentoIdentidadService: DocumentoIdentidadService,
              private cuposService: CuposService,
              private messageService: MessageService,
              ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.buildForm();
    console.log('hello desde el constructor---------------------------------')
  }
  ngOnInit(): void {
    this.options = [
      {name: 'DNI', code: 1},
      {name: 'CARNET RN', code: 2},
      {name: 'C EXTRANJERIA', code: 3},
      {name: 'OTROS', code: 4},
    ]
    this.citas = [
      {
        dni: 'DNI', /** no debe haber */
        tipoDoc: 'DNI',
        nroDoc: '76142532',
        apellidos: 'HUAMANI CAPCHA',
        nombres: 'SARELA',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
      {
        dni: 'DNI', /** no debe haber */
        tipoDoc: 'DNI',
        nroDoc: '73145986',
        apellidos: 'OLAZABAL CALLER',
        nombres: 'LETICIA GIULIANA',
        consultorio: 'OBS01',
        horario: '8:00AM',
        fecha: '16/11/2021'
      },
    ]
    // this.getTriadosXservicio()
    this.getTriadosXservicio()
  }
  get tipoConsulta(){
    return this.rutaActiva.snapshot.params.tipoConsulta
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges was called!');
    console.log(changes);
  }
  // ngDoCheck() {
  //   // this.doSomething(this.myFirstInputParameter);
  //   console.log('imprimimos algo',this.titulo)
  //   // this.getCuposXservicio()
  // }
  getDocumentosIdentidad() {
    this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
      this.listaDocumentosIdentidad = res.object;
      console.log('docs ', this.listaDocumentosIdentidad);
    })
  }
  async buscarCupoXdniFecha() {
    let data = {
      tipoDoc: this.formCitas.value.tipoDoc,
      nroDoc: this.formCitas.value.nroDoc,
      fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
    }
    console.log("DATA DNI", data)

    await this.cuposService.buscarCupoPorDniFechaIpress(this.idIpress, data)
        .then((result:any) => {
          this.DataCuposPaciente = result
          console.log('LISTA DE CUPO DEL PACIENTE', result)
          if (this.DataCuposPaciente == undefined) {
            // this.showInfo();
            // this.getPacientesXnroDocumento();
          } else {
            // this.showSuccess();
            // this.dataPaciente = null;
            // this.DataCupos = null;
            // this.DataCupos = [this.DataCuposPaciente.object];
          }
        });
  }

  // getCuposXservicio() {
  // getTriadosXservicio() {
  //   console.log('cupos x servicio-------------,','MEDICINA GENERAL')
  //   let data = {
  //     servicio: 'MEDICINA GENERAL',
  //     fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
  //   }
  //   console.log('DATA ', data);
  //
  //   this.cuposService.getCuposServicioFecha(this.idIpress, data).subscribe((res: any) => {
  //     this.DataCupos = res.object;
  //     console.log('LISTA DE CUPOS POR SERVICIO ', this.DataCupos);
  //   })
  // }
  getTriadosXservicio() {
    // console.log('cupos x servicio-------------,',this.titulo)
    let data = {
      fechaAtencion: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
    }
    // console.log('DATA ', data);

    this.cuposService.getTriadosServicioFecha(this.tipoConsulta,data).subscribe((res: any) => {
      this.DataCupos = res.object;
      console.log('LISTA DE CUPOS POR SERVICIO ', this.DataCupos);
    })
  }

  buildForm() {
    this.formCitas = new FormGroup({
      fechaInicio: new FormControl(''),
      fechaBusqueda: new FormControl(new Date()),
      tipoDoc: new FormControl(''),
      nroDoc: new FormControl(''),
    })
  }
  atender(row:any): void {
    console.log('datos de la consulta',row)
    /** redirigir a atencion de usuario */
    // this.router.navigate(['/dashboard/consulta-generica/citas/consulta-principal'], {
    //   queryParams: {
    //     'tipoDoc': 'DNI',
    //     'nroDoc': row.nroDoc,
    //   }
    // })
  }
  irConsulta(row){
    this.router.navigate(['/dashboard/adolescente/citas/consulta'], row)
  }
  /**Modulo para hacer cosultas no gestantes**/
  irConsultaNoControl(row) {
    // console.log('pasando data ', row);
    // this.obstetriciaService.data = row;
  }


  enviarData(dataPaciente) {

    // console.log("EVENTO", event);
    // this.obstetriciaGeneralService.tipoDoc = event.paciente.tipoDoc;
    // this.obstetriciaGeneralService.nroDoc = event.paciente.nroDoc;
    console.log('data Paciente',dataPaciente)
    let data: any =
        {
          tipoConsulta: this.tipoConsulta,
          nroDocumento: dataPaciente.paciente.nroDoc,
          tipoDoc: dataPaciente.paciente.tipoDoc,
          idConsulta: '',
          sexo: dataPaciente.paciente.sexo,
          anio:dataPaciente.paciente.edadAnio,
          servicio:dataPaciente.servicio
        }
    localStorage.setItem('documento', JSON.stringify(data));

    this.router.navigate(['/dashboard/consulta-generica/lista-cita/lista-consulta'])


  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Paciente',
      detail: 'Recuperado con exito'
    });
  }

  showInfoPaciente() {
    this.messageService.add({
      severity: 'info',
      summary: 'Paciente',
      detail: 'No existe en la Base de Datos'
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Paciente',
      detail: 'No tiene un registro de cupo'
    });
  }

}
