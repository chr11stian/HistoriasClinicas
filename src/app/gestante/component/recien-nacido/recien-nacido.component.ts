import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-recien-nacido',
  templateUrl: './recien-nacido.component.html',
  styleUrls: ['./recien-nacido.component.css']
})
export class RecienNacidoComponent implements OnInit {
  form: FormGroup;
  formEgresoRN: FormGroup;
  stateOptions: any[];
  todosEgresosDelRN: any[];
  egresoRNDialog: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
    this.todosEgresosDelRN = [{
      fecha: "12-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de alerta",
      fechaIngreso: "13-05-2021"
    },
    {
      fecha: "16-05-2021",
      reIngreso: "No",
      diagnostico: "Presenta sintomas leves",
      fechaIngreso: "17-05-2021"
    },
    {
      fecha: "19-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de peligro",
      fechaIngreso: "20-05-2021"
    },
    {
      fecha: "16-05-2021",
      reIngreso: "No",
      diagnostico: "Presenta sintomas leves",
      fechaIngreso: "17-05-2021"
    },
    {
      fecha: "19-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de peligro",
      fechaIngreso: "20-05-2021"
    }
    ]
  }

  buildForm() {
    this.form = this.formBuilder.group({
      sexo: ['', [Validators.required]],
      pesoRN: ['', [Validators.required]],
      semanasRN: ['', [Validators.required]],
      pesoEdadGes: ['', [Validators.required]],
      reanimacion: ['', [Validators.required]],
      exaFisico: ['', [Validators.required]],
      VIH: ['', [Validators.required]],
      hospitalizacion: ['', [Validators.required]],
      necropsia: ['', [Validators.required]],
      luetica: ['', [Validators.required]],
      alojamiento: ['', [Validators.required]],
      contactoPiel: ['', [Validators.required]],
      LME: ['', [Validators.required]],
      deposiciones: ['', [Validators.required]],
      egresoRN: ['', [Validators.required]],
      dxFallecimiento: [''],
      dxTraslado: [''],
      dxEstable: [''],
      alimentoAlta: ['', [Validators.required]],
      egresoMaterno: ['', [Validators.required]],
      dxMaternoFallecimiento: [''],
      dxMaternoTraslado: [''],
      dxMaternoEstable: [''],
      grupoSangre: ['', [Validators.required]],
      rhSangre: ['', [Validators.required]],
      anticonceptivoMaterno: ['', [Validators.required]],
      selected_1: [''],
      selected_5: [''],
      sinPatologias: [''],
      selectedSexo: [''],
      selectedMedicacion: [''],
    })
    this.formEgresoRN= this.formBuilder.group({
      egresoRN: ['', [Validators.required]],
      dxFallecimiento: [''],
      dxTraslado: [''],
      dxEstable: [''],
      alimentoAlta: ['', [Validators.required]],
      selectedMedicacion: [''],
    })
    
  }
  tituloEgresoRN() {
    // if (this.isUpdate) return "Edite Especialidad";
    // else 
    return "Ingrese Nueva Especialidad";
  }
  openNew() {
    //this.isUpdate = false;
    this.formEgresoRN.reset();
    this.egresoRNDialog = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.egresoRNDialog = false;
  }
  ngOnInit(): void {
  }

}
