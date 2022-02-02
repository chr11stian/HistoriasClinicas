import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from "primeng/api";
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { ConsultaAdolescenteService } from '../../services/consulta-adolescente.service';

@Component({
  selector: 'app-step-general-consulta-adolescente',
  templateUrl: './step-general-consulta-adolescente.component.html',
  styleUrls: ['./step-general-consulta-adolescente.component.css']
})
export class StepGeneralConsultaAdolescenteComponent implements OnInit {

  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "datos"
  data: any;
  paciente: any;
  genere: string;
  datePipe = new DatePipe('en-US');

  constructor(
    private router: Router,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private pacienteService: PacienteService,
    private location: Location
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    if (this.data.replaceUrl) {
      this.location.back();
    }
    this.consultaAdolescenteService.tipoDoc = this.data.tipoDoc;
    this.consultaAdolescenteService.nroDoc = this.data.nroDoc;
    // this.pacienteService.getNroHclByDocYTipoDocumento(dataPaciente).subscribe((res: any) => {
    //   console.log('datos de paciente ', res.object);
    //   this.consultaAdolescenteService.tipoDoc = res.object.tipoDoc;
    //   this.consultaAdolescenteService.nroDoc = res.object.nroDoc;
    //   this.consultaAdolescenteService.nroHcl = res.object.nroHcl;
    // });
    console.log('data de listar ', this.data);
    let auxDoc = {
      tipoDoc: this.data.tipoDoc,
      nroDoc: this.data.nroDoc
    }
    this.pacienteService.getPacienteByNroDoc(auxDoc).subscribe((res: any) => {

      this.paciente = res.object
      console.log('data de paciente ', this.paciente);
      this.paciente.sexo == 'FEMENINO' ? this.genere = 'F' : this.genere = 'M';
      this.edadActual();
    })

  }


  ngOnInit(): void {
    this.items = [
      { label: "Datos Generales", styleClass: 'icon1' },
      { label: "Examenes", styleClass: 'icon2' },
      { label: "Diagnosticos", styleClass: 'icon3' },
      { label: "Tratamientos", styleClass: 'icon3' },
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 3:
        this.stepName = "tratamiento"
        break
      case 2:
        this.stepName = "diagnostico"
        break
      case 1:
        this.stepName = "examen"
        break
      case 0:
        this.stepName = "datos"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number) {
    this.indiceActivo = event;
    this.name()
  }
  //calcular edad
  edadActual() {
    let today = new Date().getTime();
    let birdDate = new Date(this.paciente.nacimiento.fechaNacimiento).getTime();
    // birdDate = birdDate + 0;
    // console.log('birdDate ', birdDate, 'today ', today);
    let actualAge: any = today - birdDate;
    actualAge = new Date(actualAge)
    actualAge = Math.ceil((actualAge / (1000 * 3600 * 24)) / 365);
    // this.edadGestacional = actualAge / (1000 * 60 * 60 * 24);
    // let semanasGestacional = Math.trunc(this.edadGestacional / 7);
    // let alturaMetros = (this.form.value.talla) / 100;
    // let diasGestacional = Math.trunc(this.edadGestacional % 7);
    console.log('edad actual ms', actualAge);
  }
}
interface DatosPersonales {
  apellidos: string,
  consultorio: string,
  dni: string,
  fecha: string,
  horario: string,
  nombres: string,
  nroDoc: string,
  tipoDoc: string
}
