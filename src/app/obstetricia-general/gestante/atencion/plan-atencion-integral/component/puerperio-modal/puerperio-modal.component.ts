import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PuerperioInmediatoService} from "../../services/puerperio-inmediato/puerperio-inmediato.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-puerperio-modal',
  templateUrl: './puerperio-modal.component.html',
  styleUrls: ['./puerperio-modal.component.css']
})
export class PuerperioModalComponent implements OnInit {
  formPurperio: FormGroup;
  dataPuerperio: any[] = [];
  isUpdate:boolean=false;
  idUpdate: string="";

  constructor(private form: FormBuilder, private puerperioService:PuerperioInmediatoService
  ) {
    this.buildForm();
  }
  buildForm() {
    this.formPurperio = this.form.group({
      fechaAtencion:new FormControl("", [Validators.required]),
      horasDias: new FormControl("", [Validators.required]),
      temperatura: new FormControl("", [Validators.required]),
      pulso: new FormControl("", [Validators.required]),
      presionArterial: new FormControl("", [Validators.required]),
      involucionUterina: new FormControl("", [Validators.required]),
      heridaOperacion: new FormControl("", [Validators.required]),
      caracteristicasLoquios: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required]),
    });
  }
  // getPuerperio(){
  //   let idPuerperio = "";
  //   this.puerperioService.getPuerperioService(idPuerperio).subscribe((res: any) => {
  //     this.dataPuerperio = res.object
  //     console.log('puerperio', this.dataPuerperio)
  //
  //   });
  //   }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })

  }
  ngOnInit(): void {
  }

}
