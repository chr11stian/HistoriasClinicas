import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { his } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/his';
import { FinalizarConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/finalizar-consulta.service';
import { TratamientoConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/tratamiento-consulta.service';
import Swal from 'sweetalert2';

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

  constructor(
    private tratamientoService: TratamientoConsultaService,
    private ref: DynamicDialogRef,
    private finalizeConsultationService: FinalizarConsultaService,
    public config: DynamicDialogConfig,
  ) {
    this.consultationId = JSON.parse(localStorage.getItem('IDConsulta'));

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
      motivo: null
    }
    this.finalizeConsultationService.putNextAppointment(this.consultationId, this.dataSave).then((res: any) => {
      console.log('codigoooooooo ', res.cod);
      // if (res.cod == ) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 2000,
        })
      // }
    })
  }

  confirmToSave(): void {
    this.concludeConsultation()
  }

}

interface NextAppointment {
  fecha: string,
  motivo?: string
}
