import { Component, OnInit } from '@angular/core';
import {AntecedentesPacienteService} from "../../services/antecedentes-paciente/antecedentes-paciente.service";
import Swal from "sweetalert2";
import {image} from "../../../../assets/images/image.const";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalAntecedentesComponent} from "./modal-antecedentes/modal-antecedentes.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-antecedentes-paciente',
  templateUrl: './antecedentes-paciente.component.html',
  styleUrls: ['./antecedentes-paciente.component.css'],
  providers:[DialogService]
})

export class AntecedentesPacienteComponent implements OnInit {
  antecedentesPersonales: antecedentesPer[]=[];
  antecedentesFamiliares: antecedentesFam[]=[];

  esPersonal:boolean=false;
  esFamiliar:boolean=false;
  existeAntecedentes:boolean=false;
  nroHcl:string;
  datePipe = new DatePipe('en-US');
  ref: DynamicDialogRef;
  imagePath: string = image;

  private dataPacientesReniec: any;
  formDatos: FormGroup;

  constructor( private antecedentesService: AntecedentesPacienteService,
               private fb: FormBuilder,
               private dialog:DialogService) { }

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

  openDialogAntecedentesPersonales(){
    this.esPersonal=true;
    this.ref = this.dialog.open(ModalAntecedentesComponent, {
      data:{
        esPersonal:true
      },
      header: "ANTECEDENTES PERSONALES",
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal antecedentes",data)
      if(data!==undefined)
      {
        console.log(data);
        let cadena = {
          nombre:data.row.nombre,
          fechaDiagnosticado:this.datePipe.transform(data.row.fechaDiagnosticado, 'yyyy-MM-dd'),
          edadAnio:data.row.edadAnio,
          edadMes:data.row.edadMes,
          edadDia:data.row.edadDia,

        }
        this.agregarAntecedentesPersonales(cadena);
      }
      console.log(this.antecedentesFamiliares);
    })
  }
  openDialogAntecedentesFamiliares(){
    this.esFamiliar=true;
    this.ref = this.dialog.open(ModalAntecedentesComponent, {
      data:{
        esFamiliar:true
      },
      header: "ANTECEDENTES FAMILIARES",
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal antecedentes",data)
      if(data!==undefined)
        console.log(data);
        let cadena = {
          nombre:data.row.nombre,
          fechaDiagnosticado:this.datePipe.transform(data.row.fechaDiagnosticado, 'yyyy-MM-dd'),
          edadAnio:data.row.edadAnio,
          edadMes:data.row.edadMes,
          edadDia:data.row.edadDia,
          pariente:data.row.pariente
        }
        this.agregarAntecedentesFamiliares(cadena);
        console.log(this.antecedentesFamiliares);
    })
  }
  async agregarAntecedentesFamiliares(cadena){
    if(this.existeAntecedentes){
      let aux= {
        nroHcl:this.nroHcl,
        antecedentesFamiliares:cadena
      }
      await this.antecedentesService.updateAntecedentesFamiliares(aux).subscribe((res: any) => {
        console.log(res)
        if(res.object!=null){

          this.antecedentesFamiliares.push(cadena);
          Swal.fire({
            icon: 'success',
            title: 'Antecedentes',
            text: 'Se agrego con éxito un Antecedente Familiar!',
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se agrego Antecedente Familiar!',
          })
        }
      });
    }
    else{
      let antecentes:any[]=[];
      antecentes.push(cadena);
      let aux= {
        tipoDoc:"DNI",
        nroDoc:this.nroHcl,
        nroHcl:this.nroHcl,
        antecedentesFamiliares:antecentes
      }
      console.log(aux);
      await this.antecedentesService.addAntecedentes(aux).subscribe((res: any) => {
        console.log(res)
        if(res.object!=null){
          this.existeAntecedentes=true;
          this.antecedentesFamiliares.push(cadena);
          this.existeAntecedentes=true;
          Swal.fire({
            icon: 'success',
            title: 'Antecedentes',
            text: 'Se agrego con éxito un Antecedente Familiar!',
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se agrego Antecedentes Familiar!',
          })
        }
      });

    }
  }
  async agregarAntecedentesPersonales(cadena){
    if(this.existeAntecedentes){
      let aux= {
        nroHcl:this.nroHcl,
        antecedentesPersonales:cadena
      }
      await this.antecedentesService.updateAntecedentesPersonales(aux).subscribe((res: any) => {
        console.log(res)
        if(res.object!=null){
          this.antecedentesPersonales.push(cadena);
          Swal.fire({
            icon: 'success',
            title: 'Antecedentes',
            text: 'Se agrego con éxito un Antecedente Personal!',
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se agrego Antecedente Personal!',
          })
        }
      });
    }
    else{
      let antecentes:any[]=[];
      antecentes.push(cadena);
      let aux = {
        tipoDoc:"DNI",
        nroDoc:this.nroHcl,
        nroHcl:this.nroHcl,
        antecedentesPersonales:antecentes
      }
      console.log(aux);
      await this.antecedentesService.addAntecedentes(aux).subscribe((res: any) => {
        console.log(res)
        if(res.object!=null){
          this.antecedentesPersonales.push(cadena);
          this.existeAntecedentes=true;
          Swal.fire({
            icon: 'success',
            title: 'Antecedentes',
            text: 'Se agrego con éxito un Antecedente Personal!',
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se agrego Antecedentes Personal!',
          })
        }
      });

    }
  }



  async buscarAntecedentePorHcl() {
      await this.antecedentesService.getAntecedentes(this.nroHcl).subscribe((res: any) => {
        console.log(res)
        this.traerDataReniec();
        if(res.object!=null){
          this.existeAntecedentes=true;
          this.antecedentesPersonales=res.object.antecedentesPersonales;
          this.antecedentesFamiliares=res.object.antecedentesFamiliares;
        }
        else{
          this.existeAntecedentes=false;
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
interface antecedentesPer{
  nombre?:string,
  fechaDiagnosticado?:string,
  edadAnio?:string,
  edadMes?:string,
  edadDia?:string,
}

interface antecedentesFam{
  nombre?:string,
  fechaDiagnosticado?:string,
  edadAnio?:string,
  edadMes?:string,
  edadDia?:string,
  pariente?:string
}
