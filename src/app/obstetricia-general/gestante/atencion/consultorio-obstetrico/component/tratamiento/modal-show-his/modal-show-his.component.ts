import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { his } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/his';
import { FinalizarConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/finalizar-consulta.service';
import { TratamientoConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/tratamiento-consulta.service';
import Swal from 'sweetalert2';
import { ConsultasService } from '../../../services/consultas.service';
import { Pregmant } from '../../evaluaciones/models/laboratorio.interface';

@Component({
  selector: 'app-modal-show-his',
  templateUrl: './modal-show-his.component.html',
  styleUrls: ['./modal-show-his.component.css']
})
export class ModalShowHisComponent implements OnInit {

  listHIS: his[] = [];
  consultationId: string;
  nextDateModel: string;
  dataSave: NextAppointment;
  dataPatient: Pregmant;
  existData: boolean = false;
  arrayFua: FUA[];
  personalData: PersonalInfo;
  existDataFUA: boolean = false;
  patientData: any;
  filiationId: string;

  constructor(
    private tratamientoService: TratamientoConsultaService,
    private ref: DynamicDialogRef,
    private finalizeConsultationService: FinalizarConsultaService,
    public config: DynamicDialogConfig,
    private treatmentService: ConsultasService,
    public router: Router
  ) {
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));
    this.dataPatient = JSON.parse(localStorage.getItem('gestacion'));
    this.filiationId = this.dataPatient ? this.dataPatient.id : JSON.parse(localStorage.getItem('idGestacionRegistro'));
  }

  ngOnInit(): void {
    this.cargarHis();
    this.loadFUAinfo();
  }

  cargarHis(): void {
    this.tratamientoService
      .getHIS(this.consultationId)
      .subscribe((r: any) => {
        if (r.cod == "2015") {
          Swal.fire({
            icon: 'info',
            title: 'Ya se cerro la consulta',
            text: '',
            showConfirmButton: false,
            timer: 2000,
          });
          this.ref.close();
          return;
        }
        this.listHIS = r.object;
        this.listHIS == null ? this.existData = false : this.existData = true;
      });
  }

  concludeConsultation(): void {
    this.dataSave = {
      fecha: this.nextDateModel,
      motivo: 'PRÓXIMA CONSULTA OBSTETRICIA'
    }
    // console.log('data to save ', this.filiationId);
    this.treatmentService.putNextAppointment(this.consultationId, this.filiationId, this.dataSave).then((res: any) => {
      if (res.cod == '2126') {
        this.router.navigate(['/dashboard/obstetricia-general/citas/consulta']);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        })
        this.ref.close();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    });
  }

  confirmToSave(): void {
    Swal.fire({
      title: '¿Desea cerrar la consulta?',
      text: "Ya no podra modificar nada en la consulta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.concludeConsultation();
      }
    });
  }

  loadFUAinfo(): void {
    this.finalizeConsultationService.getShowFuaData(this.consultationId).then((res: any) => {
      // if (res.cod == "2004") {
      //   console.log('no trajo data de fua');
      // }
      res.object == null ? this.existDataFUA = false : this.existDataFUA = true;
      if (!this.existDataFUA)
        return
      this.arrayFua = res.object;
      this.arrayFua.sort((a, b) => a.codPrestacion.localeCompare(b.codPrestacion));
      if (this.arrayFua != null) {
        this.personalData = {
          nombre: this.arrayFua[0].nombre + ' ' + this.arrayFua[0].apePaterno + ' ' + this.arrayFua[0].apeMaterno,
          tipoDoc: this.arrayFua[0].tipoDoc,
          nroDoc: this.arrayFua[0].nroDoc
        }
      }
    });
  }
}

interface NextAppointment {
  fecha: string,
  motivo?: string
}
interface FUA {
  nroDoc: string;
  tipoDoc: string;
  nombre: string;
  apePaterno: string;
  apeMaterno: string;
  codPrestacion?: string;
  inmunizaciones?: Inmunizaciones[];
  diagnosticos?: Diagnosticos[];
}
interface Diagnosticos {
  cie_10: string;
  diagnostico: string;
  lab?: string;
  tipoDx: string;
}
interface Inmunizaciones {
  nombre: string;
  codPrestacion: string;
  nombreComercial: string;
}
interface PersonalInfo {
  nombre: string;
  tipoDoc: string;
  nroDoc: string;
}