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
  formProblemasCronicos:FormGroup;
  formProblemasAgudos:FormGroup;
  dialogProblemaCronico:boolean=false;
  dialogProblemaAgudo:boolean=false;
  dataProblemasCronicos:ProblemasCronicos[]=[];
  dataProblemasAgudos:ProblemasAgudos[]=[];
  isUpdate:boolean=false;
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
      fecha1ProblemasAgudos:new FormControl("",[Validators.required]),
      controladoAgudo1:new FormControl("",[Validators.required]),
      fecha2ProblemasAgudos:new FormControl("",[Validators.required]),
      controladoAgudo2:new FormControl("",[Validators.required]),
      fecha3ProblemasAgudos:new FormControl("",[Validators.required]),
      controladoAgudo3:new FormControl("",[Validators.required]),
      problemaAgudo:new FormControl("",[Validators.required]),
      observacionesAgudo:new FormControl("",[Validators.required])

    })
  }
  openNewCronico(){
    this.isUpdate = false;
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
    this.isUpdate = false;
    let problemaCronico:ProblemasCronicos = {
      fechaProblemasCronicos:this.formProblemasCronicos.value.fechaProblemasCronicos,
      controladoCronico:this.formProblemasCronicos.value.controladoCronico,
      problemaCronico:this.formProblemasCronicos.value.problemaCronico,
      observaciones:this.formProblemasCronicos.value.observaciones
    }
    this.dataProblemasCronicos.push(problemaCronico);
    this.dialogProblemaCronico = false;


  }
  saveAgudo(){
    this.isUpdate == false
    let problemaAgudo:ProblemasAgudos = {
      fecha1ProblemasAgudos:this.formProblemasAgudos.value.fecha1ProblemasAgudos,
      controladoAgudo1:this.formProblemasAgudos.value.controladoAgudo1,
      fecha2ProblemasAgudos:this.formProblemasAgudos.value.fecha2ProblemasAgudos,
      controladoAgudo2:this.formProblemasAgudos.value.controladoAgudo2,
      fecha3ProblemasAgudos:this.formProblemasAgudos.value.fecha3ProblemasAgudos,
      controladoAgudo3:this.formProblemasAgudos.value.controladoAgudo3,
      problemaAgudo:this.formProblemasAgudos.value.problemaAgudo,
      observacionesAgudo:this.formProblemasAgudos.value.observacionesAgudo
    }
    this.dataProblemasAgudos.push(problemaAgudo);
    this.dialogProblemaAgudo = false;
    // this.formProblemasAgudos.reset();
  }
  openDialogEditarProblemasCronicos(rowData,index) {
    this.isUpdate = true;
    this.formProblemasCronicos.get('fechaProblemasCronicos').setValue(rowData.fechaProblemasCronicos);
    this.formProblemasCronicos.get('controladoCronico').setValue(rowData.controladoCronico);
    this.formProblemasCronicos.get('problemaCronico').setValue(rowData.problemaCronico);
    this.formProblemasCronicos.get('observaciones').setValue(rowData.observaciones)
    this.dataProblemasCronicos.splice(index,1,rowData);
    this.dialogProblemaCronico = true;
  }
  eliminarProblemaCronico(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataProblemasCronicos.splice(index,1)
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  openDialogEditarProblemasAgudos(rowData, index) {
    this.formProblemasAgudos.get('fecha1ProblemasAgudos').setValue(rowData.fecha1ProblemasAgudos);
    this.formProblemasAgudos.get('controladoAgudo1').setValue(rowData.controladoAgudo1);
    this.formProblemasAgudos.get('fecha2ProblemasAgudos').setValue(rowData.fecha2ProblemasAgudos);
    this.formProblemasAgudos.get('controladoAgudo2').setValue(rowData.controladoAgudo2);
    this.formProblemasAgudos.get('fecha3ProblemasAgudos').setValue(rowData.fecha3ProblemasAgudos);
    this.formProblemasAgudos.get('controladoAgudo3').setValue(rowData.controladoAgudo3);
    this.formProblemasAgudos.get('problemaAgudo').setValue(rowData.problemaAgudo);
    this.formProblemasAgudos.get('observacionesAgudo').setValue(rowData.observacionesAgudo)
    this.dataProblemasAgudos.splice(index,1,rowData);
    this.dialogProblemaAgudo = true;
  }
  eliminarProblemaAgudo(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataProblemasAgudos.splice(index,1)
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
