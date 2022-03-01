import { Component, OnInit } from '@angular/core';
import {ColegioProfesionalService} from "../../services/colegio-profesional/colegio-profesional.service";
import {AntecedentesPacienteService} from "../../services/antecedentes-paciente/antecedentes-paciente.service";
import Swal from "sweetalert2";
import {image} from "../../../../assets/images/image.const";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-antecedentes-paciente',
  templateUrl: './antecedentes-paciente.component.html',
  styleUrls: ['./antecedentes-paciente.component.css']
})
export class AntecedentesPacienteComponent implements OnInit {
  antecedentesPersonales: any[]=[];
  antecedentesFamiliares: any[]=[];
  nroHcl:string;
  apellidosNombres: any;
  nroDoc: any;
  tipoDoc: any;
  imagePath: string = image;
  private dataPacientesReniec: any;
  formDatos: FormGroup;

  constructor( private antecedentesService: AntecedentesPacienteService,
               private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formDatos = this.fb.group({
      hcl: new FormControl(''),
      apePaterno: new FormControl(''),
      apeMaterno: new FormControl(''),
      nombres: new FormControl(''),
      docIndentidad: new FormControl(''),

    })
  }
  openNew() {
    
  }
  recuperarAntecedentesBD(){

  }
  editarAntecedenteP(rowData: any) {
    
  }

  eliminarAntecedenteP(rowData: any) {
    
  }

  editarAntecedenteF(rowData: any) {
    
  }

  eliminarAntecedenteF(rowData: any) {
    
  }

  async buscarAntecedentePorHcl() {
      await this.antecedentesService.getAntecedentes(this.nroHcl).subscribe((res: any) => {
        console.log(res)
        this.traerDataReniec();
        if(res.object!=null){
          this.antecedentesPersonales=res.object.antecedentesPersonales;
          this.antecedentesFamiliares=res.object.antecedentesFamiliares;
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen registros de Antecedentes para este paciente!',
          })
        }
      });
  }
  traerDataReniec() {
    this.antecedentesService.getDatosReniec(this.nroHcl).subscribe((res: any) => {
      this.dataPacientesReniec = res;
      console.log(res);
      this.imagePath = res.foto;
      this.formDatos.get('docIndentidad').setValue(res.nroDocumento);
      this.formDatos.get('hcl').setValue(res.nroDocumento);
      this.formDatos.get('apePaterno').setValue(res.apePaterno);
      this.formDatos.get('apeMaterno').setValue(res.apeMaterno);
      this.formDatos.get('nombres').setValue(res.nombres);
    });
  }
}
