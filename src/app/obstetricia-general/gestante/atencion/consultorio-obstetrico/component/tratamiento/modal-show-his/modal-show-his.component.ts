import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(
    private tratamientoService: TratamientoConsultaService,
    private ref: DynamicDialogRef,
    private finalizeConsultationService: FinalizarConsultaService,
    public config: DynamicDialogConfig,
    private treatmentService: ConsultasService,
  ) {
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));
    this.dataPatient = JSON.parse(localStorage.getItem('gestacion'));
  }

  ngOnInit(): void {
    this.cargarHis();
  }

  cargarHis(): void {
    this.tratamientoService
      .getHIS(this.consultationId)
      .subscribe((r: any) => {
        this.listHIS = r.object;
        console.log("his", this.listHIS);
      });
  }

  concludeConsultation(): void {
    this.dataSave = {
      fecha: this.nextDateModel,
      motivo: 'PRÓXIMA CONSULTA OBSTETRICIA'
    }
    this.treatmentService.putNextAppointment(this.consultationId, this.dataPatient.id, this.dataSave).then((res: any) => {
      console.log('codigo de guardado ', res.cod);
      if (res.cod == '2126') {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        })
      }

    })
    // this.finalizeConsultationService.putNextAppointment(this.consultationId, this.dataSave).then((res: any) => {
    //   console.log('codigoooooooo ', res.cod);
    //   // if (res.cod == ) {

    //   // }
    // })
  }

  confirmToSave(): void {
    this.concludeConsultation()
  }

}

interface NextAppointment {
  fecha: string,
  motivo?: string
}
