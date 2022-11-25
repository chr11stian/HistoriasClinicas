import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistrarTriajeComponent } from '../registrar-triaje/registrar-triaje.component';
import { CuposTriajeService } from '../services/cupos-triaje/cupos-triaje.service';
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
  dataCuposTriados: any;
  formCupos: FormGroup;
  datePipe = new DatePipe('en-US');
  fechaActual = new Date();

  Pacientes: any;
  ProximaCita: any;
  dataPaciente2: any;
  idIpress: string;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialog: DialogService,
    private cuposTriajeService: CuposTriajeService
  ) {
    this.options = [
      { name: "DNI", code: 1 },
      { name: "CARNET RN", code: 2 },
      { name: "C EXTRANJERIA", code: 3 },
      { name: "OTROS", code: 4 },
    ]
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log('id ipress token ', this.idIpress);
  }


  ngOnInit(): void {
    this.buildForm();
    this.listCupos();
    this.listCuposTriados();
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

  listCupos() {
    let fechaAux = { fechaAtencion: this.datePipe.transform(new Date(), 'yyyy-MM-dd') }
    this.cuposTriajeService.getListarCupos(this.idIpress, fechaAux).subscribe((res: any) => {
      console.log('data listar cupos ')
      this.dataCupos = res.object;
    });
  }

  listCuposTriados() {
    let fechaAux = { fechaAtencion: this.datePipe.transform(new Date(), 'yyyy-MM-dd') }
    console.log(fechaAux);
    this.cuposTriajeService.getListarCuposTriados(this.idIpress, fechaAux).subscribe((res: any) => {
      console.log('data listar cupos ya triados',res.object)
      this.dataCuposTriados = res.object;
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
    let dataAux = {
      data: data,
      option: 1
    }
    this.ref = this.dialog.open(RegistrarTriajeComponent, {
      header: " Registrar Triaje",
      width: '70%',
      data: dataAux
    });
    this.ref.onClose.subscribe((data: any) => {
      this.listCupos();
      this.listCuposTriados();
    });
  }

  openDialogVerTriaje(data) {
    let dataAux = {
      data: data,
      option: 2
    }
    this.ref = this.dialog.open(RegistrarTriajeComponent, {
      header: " Registrar Triaje",
      width: '60%',
      data: dataAux
    });
  }
}

interface data {
  name: string
  code: number
}
