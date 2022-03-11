import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService, MessageService } from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestacionService } from '../../services/prestacion/prestacion.service';
interface Procedimiento {
  codigo: string,
  procedimiento: string,
  ind: string,
  eje: string,
  dx: string
  res: string
}

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {

  isDisabledFormDiagnostico: boolean = true;
  inputDisabled: boolean = true;
  isUpdate: boolean;
  codigo: string
  descripcion: string;
  data: Procedimiento[] = []
  procedimientoFC: FormGroup
  constructor(private prestacionService: PrestacionService
    , private ref: DynamicDialogRef
    , private config: DynamicDialogConfig
    , private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.isUpdate = false;
    this.buildForm();
    this.codigo = this.config.data.codigo
    this.descripcion = this.config.data.descripcion
  }
  getFC(control: string): AbstractControl {
    return this.procedimientoFC.get(control);
  }
  ngOnInit(): void {
    this.getProcedimiento();
  }
  buildForm() {
    this.procedimientoFC = new FormGroup({
      codigo: new FormControl('',Validators.required),
      procedimiento: new FormControl('', Validators.required),
      ind: new FormControl(''),
      eje: new FormControl(''),
      dx: new FormControl(''),
      res: new FormControl(''),
    })
  }
  getProcedimiento() {
    this.prestacionService.getProcedimientoPorCodigo(this.codigo).subscribe((resp) => {
      console.log(this.data)
      this.data = resp['object']['procedimientos'];
    })
  }
  procedimiento: Procedimiento
  botonActualizar(index) {
    this.isUpdate = true;
    this.procedimiento = this.data[index];
    this.getFC('codigo').setValue(this.procedimiento.codigo)
    this.getFC('procedimiento').setValue(this.procedimiento.procedimiento)
    this.getFC('ind').setValue(this.procedimiento.ind)
    this.getFC('eje').setValue(this.procedimiento.eje)
    this.getFC('dx').setValue(this.procedimiento.dx)
    this.getFC('res').setValue(this.procedimiento.res)
  }
  saveProcedimiento() {
    let inputRequest: Procedimiento = {
      codigo: this.getFC('codigo').value,
      procedimiento: this.getFC('procedimiento').value,
      ind: this.getFC('ind').value,
      eje: this.getFC('eje').value,
      dx: this.getFC('dx').value,
      res: this.getFC('res').value,
    }
    if (this.isUpdate) {
      this.prestacionService.putProcedimientoPorCodigo(this.codigo, this.procedimiento.codigo, inputRequest).subscribe(() => {
        this.messageService.add({ key: 'myKey2', severity: 'info', summary: 'Exitoso', detail: 'Registro Actualizado' });
        this.procedimientoFC.reset();
        this.isUpdate = false;
        this.getProcedimiento();
      })
    }
    else {
      this.prestacionService.postProcedimientoPorCodigo(this.codigo, inputRequest).subscribe((resp) => {
        this.messageService.add({ key: 'myKey2', severity: 'success', summary: 'Exitoso', detail: 'Registro agregado' });
        this.procedimientoFC.reset();
        this.getProcedimiento();
      })
    }


  }
  cancelar() {
    this.procedimientoFC.reset();
    this.isUpdate = false;
  }
}

