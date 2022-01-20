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

  constructor(
    private router: Router,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private pacienteService: PacienteService,
  ) {
    this.data = this.router.getCurrentNavigation().extras;
    // let dataPaciente = {
    //   tipoDoc: this.data.tipoDoc,
    //   nroDoc: '10101013',
    // }
    this.consultaAdolescenteService.tipoDoc = this.data.tipoDoc;
    this.consultaAdolescenteService.nroDoc = this.data.nroDoc;
    // this.pacienteService.getNroHclByDocYTipoDocumento(dataPaciente).subscribe((res: any) => {
    //   console.log('datos de paciente ', res.object);
    //   this.consultaAdolescenteService.tipoDoc = res.object.tipoDoc;
    //   this.consultaAdolescenteService.nroDoc = res.object.nroDoc;
    //   this.consultaAdolescenteService.nroHcl = res.object.nroHcl;
    // });
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
}
