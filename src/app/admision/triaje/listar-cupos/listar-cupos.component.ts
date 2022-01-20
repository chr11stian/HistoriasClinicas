import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CitasService } from 'src/app/obstetricia-general/services/citas.service';
import { MessageService } from 'primeng/api';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistrarTriajeComponent } from '../registrar-triaje/registrar-triaje.component';
@Component({
  selector: 'app-listar-cupos',
  templateUrl: './listar-cupos.component.html',
  styleUrls: ['./listar-cupos.component.css'],
  providers: [DialogService],
})
export class ListarCuposComponent implements OnInit {

  options: data[]
  selectedOption: data
  cupos: any[]
  ref: DynamicDialogRef


  dataCupos: any;
  formCupos: FormGroup;
  datePipe = new DatePipe('en-US');
  fechaActual = new Date();

  Pacientes: any;
  ProximaCita: any;
  dataPaciente2: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialog: DialogService,
  ) {
    this.options = [
      { name: "DNI", code: 1 },
      { name: "CARNET RN", code: 2 },
      { name: "C EXTRANJERIA", code: 3 },
      { name: "OTROS", code: 4 },
    ]
    this.dataCupos = [
      {
        nroDoc: "10101013",
        datosPaciente: {
          apeMaterno: "ABARCA",
          apePaterno: "MELGAREJO",
          primerNombre: "KATHERIN",
          celular: "9567834",
        },
        proxCita: {
          fecha: "20/11/2021",
        },
      },
      {
        nroDoc: "10101014",
        datosPaciente: {
          apeMaterno: "CALLER",
          apePaterno: "OLAZABAL",
          primerNombre: "LETICIA GIULIANA",
          celular: "990909067",
        },
        proxCita: {
          fecha: "20/11/2021",
        },
      },
    ]

  }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formCupos = this.fb.group({
      fechaInicio: new FormControl(''),
      fechaFinal: new FormControl(''),
      nroDoc: new FormControl(''),
    })
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Paciente',
      detail: 'Recuperado con exito'
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Paciente',
      detail: 'No existe en la Base de Datos'
    });
  }

  openDialogTriaje(data) {
    this.ref = this.dialog.open(RegistrarTriajeComponent, {
      header: " Registrar Triaje",
      width: '60%',
      data: data
    });
    this.ref.onClose.subscribe((data: any) => {
      console.log('res data ', data);
    });
  }
}

interface data {
  name: string
  code: number
}
