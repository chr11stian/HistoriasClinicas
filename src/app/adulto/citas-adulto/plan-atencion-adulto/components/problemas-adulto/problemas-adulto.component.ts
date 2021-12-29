import { Component, OnInit } from '@angular/core';
import {
  ProblemasAgudos,
  ProblemasCronicos
} from "../../../../../adulto-mayor/citas-adulto-mayor/plan-atencion-adulto-mayor/components/models/plan-atencion-adulto-mayor.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";

@Component({
  selector: 'app-problemas-adulto',
  templateUrl: './problemas-adulto.component.html',
  styleUrls: ['./problemas-adulto.component.css']
})
export class ProblemasAdultoComponent implements OnInit {
  problemasAgudos: ProblemasAgudos;
  formProblemasCronicos: FormGroup;
  formProblemasAgudos: FormGroup;
  problemasCronicos: ProblemasCronicos;
  dialogProblemaCronico: boolean = false;
  dialogProblemaAgudo: boolean = false;
  sino = [
    {label: 'SI', value: 'SI'},
    {label: 'NO', value: 'NO'}
  ];

  constructor(private messageService: MessageService,
              private form: FormBuilder,
  ) {
    this.builForm();
  }

  ngOnInit(): void {
  }

  builForm() {
    this.formProblemasCronicos = this.form.group({
      fechaProblemasCronicos: new FormControl("", [Validators.required]),
      controladoCronico: new FormControl("", [Validators.required]),
      problemaCronico: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required])

    }),
    this.formProblemasAgudos = this.form.group({
      fechaProblemasAgudos: new FormControl("", [Validators.required]),
      controladoAgudo: new FormControl("", [Validators.required]),
      problemaAgudo: new FormControl("", [Validators.required]),
      observacionesAgudo: new FormControl("", [Validators.required])

    })
  }

  openNewCronico() {
    this.formProblemasCronicos.reset();
    this.dialogProblemaCronico = true;
  }

  openNewAgudo() {
    this.formProblemasAgudos.reset();
    this.dialogProblemaAgudo = true;
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogProblemaCronico = false;
    this.dialogProblemaAgudo = false;

  }

  save() {
  }

  saveCronico() {

  }

  saveAgudo() {

  }

  openDialogEditarProblemasCronicos(rowData: any, rowIndex: any) {
  }

  eliminarProblemaCronico(rowIndex: any) {

  }
}
