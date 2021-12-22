import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValoracionFuncional} from "../../models/plan-atencion-adulto-mayor.model";
import {AdultoMayorService} from "../../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-valoracion-funcional-adulto-mayor',
  templateUrl: './valoracion-funcional-adulto-mayor.component.html',
  styleUrls: ['./valoracion-funcional-adulto-mayor.component.css']
})
export class ValoracionFuncionalAdultoMayorComponent implements OnInit {
  idRecuperado = "61b23fa6308deb1ddd0b3704";
  formValoracionClinicaFuncional:FormGroup;
  valoracionesFuncional:any;
  isUpdate: boolean = false;
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;

  constructor(private formBuilder: FormBuilder,
              private valoracionService: AdultoMayorService,
              private messageService: MessageService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm() {
    this.formValoracionClinicaFuncional = this.formBuilder.group({
      lavarse: ['', [Validators.required]],
      vestirse: ['', [Validators.required]],
      usoservicioH: ['', [Validators.required]],
      movilizarse: ['', [Validators.required]],
      continencia: ['', [Validators.required]],
      alimentarse: ['', [Validators.required]],
    })
  }
  recuperarValoracionFuncional() {
    let valoracionFItem: ValoracionFuncional[] = [];
    let lavarse: boolean = this.formValoracionClinicaFuncional.value.lavarse;
    let usoservicioH: boolean = this.formValoracionClinicaFuncional.value.usoservicioH;
    let movilizarse: boolean = this.formValoracionClinicaFuncional.value.movilizarse;
    let continencia: boolean = this.formValoracionClinicaFuncional.value.continencia;
    let alimentarse: boolean = this.formValoracionClinicaFuncional.value.alimentarse;

    if (lavarse) {
      let aux = {nombreItem: 'LAVARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      valoracionFItem.push(aux);
    }else{
      let aux = {nombreItem: 'LAVARSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      valoracionFItem.push(aux);
    }

    if (usoservicioH==true) {
      let aux = {nombreItem: 'USO DE SERVICIO HIGIENICO', respuesta: 'DEPENDIENTE', puntaje: 1}
      valoracionFItem.push(aux);
    }
    else{
      let aux = {nombreItem: 'USO DE SERVICIO HIGIENICO', respuesta: 'INDEPENDIENTE', puntaje: 0}
      valoracionFItem.push(aux);
    }

    if (movilizarse==true) {
      let aux = {nombreItem: 'MOVILIZARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      valoracionFItem.push(aux);
    }
    if (continencia==false) {
      let aux = {nombreItem: 'CONTINENCIA', respuesta: 'INDEPENDIENTE', puntaje: 0}
      valoracionFItem.push(aux);
    }
    if (continencia==true) {
      let aux = {nombreItem: 'CONTINENCIA', respuesta: 'DEPENDIENTE', puntaje: 1}
      valoracionFItem.push(aux);
    }
    if (continencia==false) {
      let aux = {nombreItem: 'CONTINENCIA', respuesta: 'INDEPENDIENTE', puntaje: 0}
      valoracionFItem.push(aux);
    }
    if (alimentarse==true) {
      let aux = {nombreItem: 'ALIMENTARSE', respuesta: 'DEPENDIENTE', puntaje: 1}
      valoracionFItem.push(aux);
    }
    if (alimentarse==false) {
      let aux = {nombreItem: 'ALIMENTARSE', respuesta: 'INDEPENDIENTE', puntaje: 0}
      valoracionFItem.push(aux);
    }
    this.valoracionesFuncional = {
      valoracionFuncional: valoracionFItem
    }

  }
  guardarValoracionFuncional(){
    this.recuperarValoracionFuncional();
    console.log('valoracion a guardar:',this.valoracionesFuncional);
    this.valoracionService.postValoracionClinica(this.idRecuperado).subscribe((res: any) => {
      console.log('se guardo correctamente ', res.object);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }
}
