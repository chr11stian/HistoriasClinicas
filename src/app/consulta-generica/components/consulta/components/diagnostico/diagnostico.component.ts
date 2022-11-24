import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { CieService } from "../../../../../obstetricia-general/services/cie.service";
import { UpsAuxIpressService } from "../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { DiagnosticosService } from "../../../../services/diagnosticos/diagnosticos.service";
import { Diagnostic, DiagnosticFUA, DiagnosticHIS, DiagnosticSave, Prestation } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/FUAHIS';
import { Patient } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/consultaGeneral';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css'],
  providers: [DialogService]

})
export class DiagnosticoComponent implements OnInit {
  dxs: any[] = [];

  loading: boolean = true;
  // submitted: boolean = false;

  attributeLocalS = 'document';
  // attributeLocalS2 = 'consultaGeneral';
  idIpress: string = "";
  dataConsulta: any;
  idConsulta: string = "";
  itemEdit: number = -1;
  isUpdate: boolean = false;

  formDiagnostico: FormGroup;
  fuaForm: FormGroup;
  hisForm: FormGroup;
  diagnosticoDialog: boolean;
  diagnosticos: diagnosticoInterface[] = [];

  arrayUPS: UPS[] = [];
  arrayUPSAux: UPSaux[] = [];
  arrayFuaDiagnostic: Diagnostic[] = [];
  arrayDiagnosticFUA: DiagnosticFUA[] = [];
  arrayDiagnosticHIS: DiagnosticHIS[] = [];
  arrayDiagnosticSave: DiagnosticSave[] = [];
  isSaved: boolean = false;
  arrayPrestation: any;

  ListaPrestacion: any[] = [];
  listaDeCIEHIS: any[] = [];
  listaDeCIESIS: any[] = [];
  // listaDeProcedimientos:any[]=[];
  arrayDiagnosticType: Lista[] = [];
  listaUpsHis: any[] = [];
  listaUpsAuxHis: any[] = [];
  estadoEditar: boolean = false;
  checked: boolean = false;
  descripcionItem: string;
  constructor(
    private DiagnosticoService: DiagnosticosService,
    private PrestacionService: PrestacionService,
    private cieService: CieService,
  ) {
    this.buildForm();
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.dataConsulta = JSON.parse(localStorage.getItem('documento'));
    this.arrayDiagnosticType = [
      { label: 'DEFINITIVO', value: 'D' },
      { label: 'PRESUNTIVO', value: 'P' },
      { label: 'REPETITIVO', value: 'R' },
    ];
  }

  ngOnInit(): void {
    this.recuperarPrestaciones();
    this.getUpsPerIpress();
    this.recoverConsultationDiagnostic();
  }

  buildForm(): void {
    this.fuaForm = new FormGroup({
      prestacion: new FormControl("", Validators.required),
      tipoDiagnosticoFUA: new FormControl('', Validators.required),
      diagnosticoFUA: new FormControl(''),
      codCIE10SIS: new FormControl('', Validators.required),
      diagnosticoSIS: new FormControl('', Validators.required),
    });
    this.hisForm = new FormGroup({
      nombreUPS: new FormControl("", Validators.required),
      nombreUPSAux: new FormControl("", Validators.required),
      tipoDiagnosticoHIS: new FormControl("", Validators.required),
      lab: new FormControl(""),
      buscarPDxHIS: new FormControl(""),
      codProcedimientoHIS: new FormControl("", Validators.required),
      procedimientoHIS: new FormControl("", Validators.required),
    })
  }

  selectDxSIS(event): void {
    this.fuaForm.patchValue({
      diagnosticoSIS: event.value.diagnostico,
      diagnosticoFUA: "",
      codCIE10SIS: event.value
    });
  }

  selectedDxHIS(event: any, type: number) {
    this.hisForm.patchValue({
      codProcedimientoHIS: event,
      buscarPDxHIS: "",
      procedimientoHIS: event.descripcionItem
    });
  }

  filterCIE10(event: any): void {
    let param: string = event.query.toUpperCase();
    // console.log('filtered param ', param);
    this.cieService.getCIEByDescripcion(param).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object;
      // console.log("CIEHIS", this.listaDeCIEHIS);
    });
  }

  getUpsPerIpress(): void {
    let data = {
      idIpress: this.idIpress,
      edad: this.dataConsulta.anio,
      sexo: this.dataConsulta.sexo
    }
    this.DiagnosticoService.listaUpsHis(data).then((res: any) => {
      this.arrayUPS = res.object;
    });
    this.DiagnosticoService.listaUpsAuxHisPerIpress(this.idIpress).then((res: any) => {
      this.arrayUPSAux = res.object
    })
  }

  async recuperarPrestaciones() {
    await this.PrestacionService.getPrestacion().subscribe((res: any) => {
      this.ListaPrestacion = res.object;
      this.verifyPrestationPerAge(this.ListaPrestacion, this.dataConsulta);
    });
  }

  verifyPrestationPerAge(arrayPrestaciones: Prestation[], paciente: Patient): void {
    let monthAge = 12 * paciente.anio + paciente.mes;
    let yearAge = paciente.anio;
    let auxPrestacion: Prestation[] = [];
    arrayPrestaciones.forEach(item => {
      switch (item.denominacion) {
        case 'ANIOS':
          if (item.edadMin <= yearAge && item.edadMax >= yearAge) {
            auxPrestacion.push(item);
          }
          break;
        case 'MESES':
          if (item.edadMin <= monthAge && item.edadMax >= monthAge) {
            auxPrestacion.push(item);
          }
          break
        default:
          // console.log('caso no evaluado');
          break;
      }
    })
    this.ListaPrestacion = auxPrestacion.filter(item => item.diagnostico != null)
    this.ListaPrestacion.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
  }

  onChangePrestacion(): void {
    const dataPrestacion: Prestation = this.fuaForm.value.prestacion;
    this.arrayFuaDiagnostic = dataPrestacion.diagnostico;
  }

  agregateDiagnosticFUA(): void {
    let isAdded: boolean = false;
    if (this.fuaForm.valid) {
      let FUAdiagnostic: DiagnosticFUA = {
        codPrestacion: this.fuaForm.value.prestacion.codigo,
        tipoDiagnostico: this.fuaForm.value.tipoDiagnosticoFUA,
        diagnostico: this.fuaForm.value.diagnosticoSIS,
        CIE10: this.fuaForm.value.codCIE10SIS.cie10
      }
      this.arrayDiagnosticFUA.forEach(item => {
        if (item.CIE10 === FUAdiagnostic.CIE10) {
          this.repeatDataMessage();
          isAdded = true;
        }
      })
      if (!isAdded) {
        this.arrayDiagnosticFUA.push(FUAdiagnostic);
        this.fuaForm.reset();
      }
    } else
      this.missDataMessage();
  }

  agregateDiagnosticHIS(): void {
    let isAdded: boolean = false;
    if (this.hisForm.valid) {
      let HISdiagnostic: DiagnosticHIS = {
        nombreUPS: this.hisForm.value.nombreUPS.nombreUPS,
        nombreUPSaux: this.hisForm.value.nombreUPSAux.nombre,
        tipoDiagnostico: this.hisForm.value.tipoDiagnosticoHIS,
        lab: this.hisForm.value.lab,
        diagnosticoHIS: this.hisForm.value.procedimientoHIS,
        CIE10: this.hisForm.value.codProcedimientoHIS.codigoItem,
      }
      this.arrayDiagnosticHIS.forEach(item => {
        if (item.CIE10 === HISdiagnostic.CIE10) {
          this.repeatDataMessage();
          isAdded = true;
        }
      });
      if (!isAdded) {
        this.arrayDiagnosticHIS.push(HISdiagnostic);
        this.hisForm.patchValue({
          tipoDiagnosticoHIS: '',
          lab: '',
          codProcedimientoHIS: '',
          procedimientoHIS: ''
        });
      }
    } else
      this.missDataMessage();
  }

  mergeArrayDiagnostic(diagnosticosSIS: DiagnosticFUA[], diagnosticosHIS: DiagnosticHIS[], diagnosticos: DiagnosticSave[]): void {
    diagnosticosSIS.forEach(item => {
      let auxDiagnostic: DiagnosticSave = {
        // nro: null,
        diagnosticoHIS: null,
        diagnosticoSIS: item.diagnostico,
        cie10SIS: item.CIE10,
        cie10HIS: null,
        tipo: item.tipoDiagnostico,
        codPrestacion: item.codPrestacion,
        nombreUPS: null,
        nombreUPSaux: null,
        lab: null,
      }
      diagnosticos.push(auxDiagnostic)
    });
    diagnosticosHIS.forEach(item => {
      let auxDiagnostic: DiagnosticSave = {
        // nro: null,
        diagnosticoHIS: item.diagnosticoHIS,
        diagnosticoSIS: null,
        cie10SIS: null,
        cie10HIS: item.CIE10,
        tipo: item.tipoDiagnostico,
        codPrestacion: null,
        nombreUPS: item.nombreUPS,
        nombreUPSaux: item.nombreUPSaux,
        lab: item.lab,
      }
      diagnosticos.push(auxDiagnostic)
    });
  }

  async saveDiagnostico(): Promise<void> {
    this.arrayDiagnosticSave = [];
    this.mergeArrayDiagnostic(this.arrayDiagnosticFUA, this.arrayDiagnosticHIS, this.arrayDiagnosticSave);
    if (this.arrayDiagnosticSave.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'No se agrego ningun procedimiento',
        text: '',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    // console.log('stringfy ', JSON.stringify(this.arrayDiagnosticSave));
    await this.DiagnosticoService.postPromiseDiagnostico(this.dataConsulta.idConsulta, this.arrayDiagnosticSave).then(res => {
      if (res.cod == '2126') {
        Swal.fire({
          icon: 'success',
          title: 'Se guardo exitosamente',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  recoverConsultationDiagnostic(): void {
    this.DiagnosticoService.getPromiseDiagnosticPerConsultation(this.dataConsulta.idConsulta).then(res => {

      let dataRes: DiagnosticSave[] = res.object;
      if (dataRes == null)
        return
      dataRes.forEach(item => {
        if (item.codPrestacion != null) {
          let diagnostic: DiagnosticFUA = {
            codPrestacion: item.codPrestacion,
            diagnostico: item.diagnosticoSIS,
            CIE10: item.cie10SIS,
            tipoDiagnostico: item.tipo
          }
          this.arrayDiagnosticFUA.push(diagnostic);
        } else {
          let diagnostic: DiagnosticHIS = {
            nombreUPS: item.nombreUPS,
            nombreUPSaux: item.nombreUPSaux,
            diagnosticoHIS: item.diagnosticoHIS,
            tipoDiagnostico: item.tipo,
            CIE10: item.cie10HIS,
            lab: item.lab
          }
          this.arrayDiagnosticHIS.push(diagnostic);
        }
      });
      this.isSaved = true;
    })
  }

  deleteItemOfArray(index: number, type: number): void {
    type == 0 ? this.arrayDiagnosticFUA.splice(index, 1) : this.arrayDiagnosticHIS.splice(index, 1);
  }

  confirmToSave(): void {
    Swal.fire({
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      icon: 'question',
      title: 'Guardar',
      text: '¿Esta seguro que desea guardar los diagnosticos?',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDiagnostico();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No se guardo',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  filterPrestation(event): void {
    this.cieService.getAuctocompleteByCodAndDescripcion(event.query).then((res: any) => {
      this.arrayPrestation = res.object;
    })
  }

  missDataMessage(): void {
    Swal.fire({
      icon: 'info',
      title: 'Falta llenar campos',
      text: '',
      showConfirmButton: false,
      timer: 2000
    });
  }

  repeatDataMessage(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Ya se agrego ese item',
      text: '',
      showConfirmButton: false,
      timer: 2000
    });
  }
}

interface diagnosticoInterface {
  nro?: number;
  diagnosticoHIS?: string;
  cie10HIS?: string;
  diagnosticoSIS?: string;
  cie10SIS?: string;
  tipo?: string;
  codPrestacion?: string;
  nombreUPS?: string;
  factorCondicional?: string;
  nombreUPSaux?: string;
  lab?: string;
}
interface resultados {
  nombre?: string;
  evaluacion?: string;
  resultado?: string;
  estado?: boolean;
}
interface Lista {
  label: string;
  value: string;
}
interface UPS {
  codUPS: string;
  nombreUPS: string;
}
interface UPSaux {
  estado: boolean;
  nombre: string;
}