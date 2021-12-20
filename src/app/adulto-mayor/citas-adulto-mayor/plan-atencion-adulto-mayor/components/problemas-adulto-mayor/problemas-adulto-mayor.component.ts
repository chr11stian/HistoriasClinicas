import { Component, OnInit } from '@angular/core';
// import {ModalProblemasAdultoMayorComponent} from "./modal-problemas-adulto-mayor/modal-problemas-adulto-mayor.component";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProblemasAgudos, ProblemasCronicos} from "../models/plan-atencion-adulto-mayor.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-problemas-adulto-mayor',
  templateUrl: './problemas-adulto-mayor.component.html',
  styleUrls: ['./problemas-adulto-mayor.component.css']
})
export class ProblemasAdultoMayorComponent implements OnInit {
  problemasAgudos: ProblemasAgudos;
  formProblemasCronicos:FormGroup;
  formProblemasAgudos:FormGroup;
  problemasCronicos:ProblemasCronicos;
  dialogProblemaCronico:boolean=false;
  dialogProblemaAgudo:boolean=false;
  dataProblemasCronicos:ProblemasCronicos[]=[];
  dataProblemasAgudos:ProblemasAgudos[]=[];
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];

  constructor(private messageService: MessageService,
              private form:FormBuilder,
  ) {
    this.builForm();
  }

  ngOnInit(): void {
  }
  builForm() {
    this.formProblemasCronicos = this.form.group({
      fechaProblemasCronicos:new FormControl("",[Validators.required]),
      controladoCronico:new FormControl("",[Validators.required]),
      problemaCronico:new FormControl("",[Validators.required]),
      observaciones:new FormControl("",[Validators.required])

    }),
    this.formProblemasAgudos = this.form.group({
      fechaProblemasAgudos:new FormControl("",[Validators.required]),
      controladoAgudo:new FormControl("",[Validators.required]),
      problemaAgudo:new FormControl("",[Validators.required]),
      observacionesAgudo:new FormControl("",[Validators.required])

    })
  }
  openNewCronico(){
    this.formProblemasCronicos.reset();
    this.dialogProblemaCronico = true;
  }
  openNewAgudo(){
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
  save(){}
  saveCronico(){

  }
  saveAgudo(){

  }
  openDialogEditarProblemasCronicos(rowData: any, rowIndex: any) {
  }
  eliminarProblemaCronico(rowIndex: any) {
    
  }

}
