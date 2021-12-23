import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tratamiento-consulta-adolescente',
  templateUrl: './tratamiento-consulta-adolescente.component.html',
  styleUrls: ['./tratamiento-consulta-adolescente.component.css']
})
export class TratamientoConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formTratamiento: FormGroup;
  datosDiagnosticos: any;
  updateTratamiento: boolean = false;
  dialogTratamiento: boolean = false;
  listaTratamientos: tratamiento[] = [];

  listaIntervalos = [
    { name: 'CADA 1 HORA', code: '1' },
    { name: 'CADA 2 HORAS', code: '2' },
    { name: 'CADA 3 HORAS', code: '3' },
    { name: 'CADA 4 HORAS', code: '4' },
    { name: 'CADA 5 HORAS', code: '5' },
    { name: 'CADA 6 HORAS', code: '6' },
    { name: 'CADA 8 HORAS', code: '7' },
    { name: 'CADA 12 HORAS', code: '8' },
    { name: 'CADA 24 HORAS', code: '9' },
    { name: 'CONDICIONAL A FIEBRE', code: '10' },
    { name: 'DOSIS UNICA', code: '11' },
    { name: 'CADA 48 HORAS', code: '12' }
  ];
  listaViaAdministracion = [
    { name: 'ENDOVENOSA', code: "1" },
    { name: 'INHALADORA', code: "2" },
    { name: 'INTRADERMICO', code: "3" },
    { name: 'INTRAMUSCULAR', code: "4" },
    { name: 'NASAL', code: "5" },
    { name: 'OFTALMICO', code: "6" },
    { name: 'ORAL', code: "7" },
    { name: 'OPTICO', code: "8" },
    { name: 'RECTAL', code: "9" },
    { name: 'SUBCUTANEO', code: "10" },
    { name: 'SUBLINGUAL', code: "11" },
    { name: 'TOPICO', code: "12" },
    { name: 'VAGINAL', code: "13" },
  ];

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.form = this.fb.group({
      solicitudExam: new FormControl(""),
      compromisosObs: new FormControl(""),
    });
    this.formTratamiento = this.fb.group({
      tratamiento: new FormControl(""),
    });
    this.formTratamiento = this.fb.group({
      descripcion: new FormControl(""),
      numero: new FormControl(""),
      dosis: new FormControl(""),
      viaAdministracion: new FormControl(""),
      intervalo: new FormControl(""),
      duracion: new FormControl(""),
      observaciones: new FormControl(""),
    });
  }

  openDialogTratamiento() {
    this.dialogTratamiento = true;
  }

  aceptarDialogTratamiento() {
    let tratamiento: tratamiento = {
      descripcion: this.formTratamiento.value.descripcion,
      numero: this.formTratamiento.value.numero,
      dosis: this.formTratamiento.value.dosis,
      viaAdministracion: this.formTratamiento.value.viaAdministracion,
      intervalo: this.formTratamiento.value.intervalo,
      observaciones: this.formTratamiento.value.observaciones
    }
    this.listaTratamientos.push(tratamiento);
    this.dialogTratamiento = false;
    console.log('data to save inter ', tratamiento);
  }

  guardarEdicionTratamiento() {

  }

  closeDialogTratamiento() {

  }

}

export interface tratamiento {
  descripcion?: string,
  numero?: number,
  dosis?: string,
  viaAdministracion?: string,
  intervalo?: string,
  duracion?: string,
  observaciones?: string
}
