import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AtencionesService} from "../../../services/atenciones/Atenciones.service"
import {AtencionesComponent} from "../../atenciones/atenciones.component"
import Swal from "sweetalert2";

@Component({
  selector: 'app-dialog-atencion',
  templateUrl: './dialog-atencion.component.html',
  styleUrls: ['./dialog-atencion.component.css']
})
export class DialogAtencionComponent implements OnInit {

  constructor(){}
      // public dialogRef: MatDialogRef<DialogAtencionComponent>,



  ngOnInit(): void {
  }

  openNew() {
    // this.isUpdate = false;
    // this.form.reset();
    // this.form.get('nroAtencion').setValue("1");
    // this.form.get('fechaAtencion').setValue("");
    // this.form.get('edadGestacional').setValue("0");
    // this.form.get('pesoMadre').setValue("0");
    // this.form.get('evalNutricional').setValue("");
    // this.form.get('temperatura').setValue("0");
    // this.form.get('presionArterial').setValue("");
    // this.form.get('pulsoMaterno').setValue("");
    // this.form.get('alturaUterinal').setValue("0");
    // this.form.get('situacion').setValue("");
    // this.form.get('presentacion').setValue("");
    // this.form.get('posicion').setValue("");
    // this.form.get('fcf').setValue("");
    // this.form.get('movFetal').setValue("");
    // this.form.get('proteinaCualitativa').setValue("");
    // this.form.get('edema').setValue("");
    // this.form.get('reflejoOsteotendinoso').setValue("");
    // this.form.get('fechaEcografia').setValue("");
    // this.form.get('consejeriaIntegral').setValue("");
    // this.form.get('indAcidoFolico').setValue("");
    // this.form.get('indFierro').setValue("");
    // this.form.get('indCalcio').setValue("");
    // this.form.get('interconsulta').setValue("");
    // this.form.get('proximaCita').setValue("");
    // this.form.get('visitaDomiciliaria').setValue("");
    // this.form.get('responsableAtencion').setValue("");
    // this.form.get('establecimientoAtencion').setValue("");
    //
    // this.atencionDialog = true;
  }
  save(form: any) {
    // this.isUpdate = false;
    // console.log("enviando datos...");
    // console.log(form);
    // console.log(form.value);
    // this
    //
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Agregado correctamente',
    //   text: '',
    //   showConfirmButton: false,
    //   timer: 1500,
    // })
    // this.atencionDialog = false;
  }

  private buildForm() {
    // this.form = this.formBuilder.group({
    //   nroAtencion: ['', [Validators.required]],
    //   fechaAtencion: ['', [Validators.required]],
    //   edadGestacional: ['', [Validators.required]],
    //   pesoMadre: ['', [Validators.required]],
    //   evalNutricional: ['', [Validators.required]],
    //   temperatura: ['', [Validators.required]],
    //   presionArterial: ['', [Validators.required]],
    //   pulsoMaterno: ['', [Validators.required]],
    //   alturaUterinal: ['', [Validators.required]],
    //   situacion: ['', [Validators.required]],
    //   presentacion: ['', [Validators.required]],
    //   posicion: ['', [Validators.required]],
    //   fcf: ['', [Validators.required]],
    //   movFetal: ['', [Validators.required]],
    //   proteinaCualitativa: ['', [Validators.required]],
    //   edema: ['', [Validators.required]],
    //   reflejoOsteotendinoso: ['', [Validators.required]],
    //   fechaEcografia: ['', [Validators.required]],
    //   consejeriaIntegral: ['', [Validators.required]],
    //   indAcidoFolico: ['', [Validators.required]],
    //   indFierro: ['', [Validators.required]],
    //   indCalcio: ['', [Validators.required]],
    //   interconsulta: ['', [Validators.required]],
    //   planParto: ['', [Validators.required]],
    //   visitaDomiciliaria: ['', [Validators.required]],
    //   proximaCita: ['', [Validators.required]],
    //   responsableAtencion: ['', [Validators.required]],
    //   establecimientoAtencion: ['', [Validators.required]],
    // });

  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    // this.atencionDialog = false;
  }
  titulo() {
    // if (this.isUpdate) return "EDITE ATENCION PRENATAL";
    // else return "NUEVA ATENCION PRENATAL";
  }

  // valorTipoSituacion(valor) {
  //   for (let i = 0; i < this.situacionList.length; i++) {
  //     if (valor === this.situacionList[i].value) return this.situacionList[i].label;
  //   }
  // }
  //
  // valorTipoPresentacion(valor) {
  //   for (let i = 0; i < this.presentacionList.length; i++) {
  //     if (valor === this.presentacionList[i].value) return this.presentacionList[i].label;
  //   }
  // }
  //
  // valorTipoPosicion(valor) {
  //   for (let i = 0; i < this.posicionList.length; i++) {
  //     if (valor === this.posicionList[i].value) return this.posicionList[i].label;
  //   }
  // }
  //
  // valorTipomovFetal(valor) {
  //   for (let i = 0; i < this.movFetalList.length; i++) {
  //     if (valor === this.movFetalList[i].value) return this.movFetalList[i].label;
  //   }
  // }
  //
  // valorproteiCualitativa(valor) {
  //   for (let i = 0; i < this.protcualitList.length; i++) {
  //     if (valor === this.protcualitList[i].value) return this.protcualitList[i].label;
  //   }
  // }
  //
  // valorEdema(valor) {
  //   for (let i = 0; i < this.edemaList.length; i++) {
  //     if (valor === this.edemaList[i].value) return this.edemaList[i].label;
  //   }
  // }
  //
  // valorReflejoO(valor) {
  //   for (let i = 0; i < this.reflejoOsteotendinosoList.length; i++) {
  //     if (valor === this.reflejoOsteotendinosoList[i].value) return this.reflejoOsteotendinosoList[i].label;
  //   }
  // }
  //
  // valorInterconsultas(valor) {
  //   for (let i = 0; i < this.interconsultaList.length; i++) {
  //     if (valor === this.interconsultaList[i].value) return this.interconsultaList[i].label;
  //   }
  // }
  //
  // valorPlanParto(valor) {
  //   for (let i = 0; i < this.planPartoList.length; i++) {
  //     if (valor === this.planPartoList[i].value) return this.planPartoList[i].label;
  //   }
  // }
  //
  // valorVisitaDomiciliaria(valor) {
  //   for (let i = 0; i < this.visitaDomiciliariaList.length; i++) {
  //     if (valor === this.visitaDomiciliariaList[i].value) return this.visitaDomiciliariaList[i].label;
  //   }
  // }

}

