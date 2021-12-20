import { Component, OnInit } from '@angular/core';
import {ModalProblemasAdultoMayorComponent} from "./modal-problemas-adulto-mayor/modal-problemas-adulto-mayor.component";
import {ModalTratamientoComponent} from "../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/component/tratamiento/modal-tratamiento/modal-tratamiento.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-problemas-adulto-mayor',
  templateUrl: './problemas-adulto-mayor.component.html',
  styleUrls: ['./problemas-adulto-mayor.component.css']
})
export class ProblemasAdultoMayorComponent implements OnInit {
  ref: DynamicDialogRef;
  problemasCronicos: any;
  problemasAgudos: any;
  problemasCronicos1:any[]=[];
  formProblemasCronicos: FormGroup;

  constructor(
              private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  // openDialogProblemasCronicos(){
  //   this.ref = this.dialog.open(ModalProblemasAdultoMayorComponent, {
  //     header: "PROBLEMAS CRONICOS",
  //     contentStyle:{
  //       overflow:"auto",
  //     },
  //   })
  //   this.ref.onClose.subscribe((data:any)=>{
  //     console.log("data de modal tratamiento",data)
  //     if(data!==undefined)
  //       this.problemasCronicos1.push(data);
  //     console.log(this.formProblemasCronicos);
  //   })
  // }
  openDialogEditarProblemasCronicos(rowData: any, rowIndex: any) {
    
  }

  eliminarProblemaCronico(rowIndex: any) {
    
  }
}
