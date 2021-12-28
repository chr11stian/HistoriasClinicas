import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {datosGeneralesAdultoMayor} from "../models/plan-atencion-adulto-mayor.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-datos-generales-adulto-mayor',
  templateUrl: './datos-generales-adulto-mayor.component.html',
  styleUrls: ['./datos-generales-adulto-mayor.component.css']
})
export class DatosGeneralesAdultoMayorComponent implements OnInit {
  formDatosGeneralAdultoMayor: FormGroup;
  docRecuperado="10101013";
  tipoDocRecuperado="DNI";
  datosGeneralesAdultoMayor:datosGeneralesAdultoMayor;
  sino = [
    { label: 'F', value: 'FEMENINO' },
    { label: 'M', value: 'MASCULINO' }
  ];
  constructor(private formBuilder: FormBuilder,
              private filiacionService: AdultoMayorService,
              private messageService: MessageService) {
    this.builForm();
  }

  ngOnInit(): void {
    this.getPacienteByNroDoc();
  }
  builForm(){
    this.formDatosGeneralAdultoMayor = this.formBuilder.group({
      fecha:new FormControl(''),
      nroAtendido:new FormControl(''),
      apePaterno:new FormControl(''),
      apeMaterno:new FormControl(''),
      nombres:new FormControl(''),
      sexo:new FormControl(''),
      edad:new FormControl(''),
      lugarNacimiento:new FormControl(''),
      procedencia:new FormControl(''),
      fechaNacimiento:new FormControl(''),
      gradoInstruccion:new FormControl(''),
      estadoCivil:new FormControl(''),
      grupoSanguineo:new FormControl(''),
      rh:new FormControl(''),
      ocupacion:new FormControl(''),
      domicilio:new FormControl(''),
      telefono:new FormControl(''),
      edadFamiliarCuidador:new FormControl(''),
      dniFamiliarCuidador:new FormControl(''),
      familiarCuidadorResponsable:new FormControl('')
    })
  }
  getPacienteByNroDoc(){
    this.filiacionService.getDatosGeneralesAdultoMayor(this.tipoDocRecuperado, this.docRecuperado).subscribe((res: any) => {
      this.datosGeneralesAdultoMayor = res.object
      console.log('paciente por doc ', this.datosGeneralesAdultoMayor)
      this.formDatosGeneralAdultoMayor.get('fecha').setValue(this.datosGeneralesAdultoMayor.fecha);
      this.formDatosGeneralAdultoMayor.get('nroAtendido').setValue(this.datosGeneralesAdultoMayor.nroAtendido);
      this.formDatosGeneralAdultoMayor.get('apePaterno').setValue(this.datosGeneralesAdultoMayor.apePaterno);
      this.formDatosGeneralAdultoMayor.get('apeMaterno').setValue(this.datosGeneralesAdultoMayor.apeMaterno);
      this.formDatosGeneralAdultoMayor.get('nombres').setValue(this.datosGeneralesAdultoMayor.primerNombre + this.datosGeneralesAdultoMayor.otrosNombres);
      this.formDatosGeneralAdultoMayor.get('sexo').setValue(this.datosGeneralesAdultoMayor.sexo);
      this.formDatosGeneralAdultoMayor.get('edad').setValue(this.datosGeneralesAdultoMayor.edad);
      this.formDatosGeneralAdultoMayor.get('lugarNacimiento').setValue(this.datosGeneralesAdultoMayor.lugarNacimiento);
      this.formDatosGeneralAdultoMayor.get('procedencia').setValue(this.datosGeneralesAdultoMayor.procedencia);
      this.formDatosGeneralAdultoMayor.get('fechaNacimiento').setValue(this.datosGeneralesAdultoMayor.fechaNacimiento);
      this.formDatosGeneralAdultoMayor.get('gradoInstruccion').setValue(this.datosGeneralesAdultoMayor.gradoInstruccion);

      this.formDatosGeneralAdultoMayor.get('estadoCivil').setValue(this.datosGeneralesAdultoMayor.estadoCivil);
      this.formDatosGeneralAdultoMayor.get('grupoSanguineo').setValue(this.datosGeneralesAdultoMayor.grupoSanguineo);
      this.formDatosGeneralAdultoMayor.get('rh').setValue(this.datosGeneralesAdultoMayor.rh);
      this.formDatosGeneralAdultoMayor.get('ocupacion').setValue(this.datosGeneralesAdultoMayor.ocupacion);
      this.formDatosGeneralAdultoMayor.get('domicilio').setValue(this.datosGeneralesAdultoMayor.domicilio);
      this.formDatosGeneralAdultoMayor.get('telefono').setValue(this.datosGeneralesAdultoMayor.telefono);
      this.formDatosGeneralAdultoMayor.get('edadFamiliarCuidador').setValue(this.datosGeneralesAdultoMayor.edadFamiliarCuidador);
      this.formDatosGeneralAdultoMayor.get('dniFamiliarCuidador').setValue(this.datosGeneralesAdultoMayor.dniFamiliarCuidador);
      this.formDatosGeneralAdultoMayor.get('familiarCuidadorResponsable').setValue(this.datosGeneralesAdultoMayor.familiarCuidadorResponsable);
    });
 }
 agregarFiliacionDatosGenerales(){
   function obtenerfecha(fecha) {
    if(fecha!=null){
      let fechaApta = fecha.replace('T',' ');
      return fechaApta;
    }
   }

   const req = {
      nroHcl:this.docRecuperado,
      fecha:this.formDatosGeneralAdultoMayor.value.fecha,
      nroAtendido:this.formDatosGeneralAdultoMayor.value.nroAtendido,
      primerNombre:this.formDatosGeneralAdultoMayor.value.nombres,
      otrosNombres:'',
      apePaterno:this.formDatosGeneralAdultoMayor.value.apePaterno,
      apeMaterno:this.formDatosGeneralAdultoMayor.value.apeMaterno,
      sexo:this.formDatosGeneralAdultoMayor.value.sexo,
      edad:this.formDatosGeneralAdultoMayor.value.edad,
      fechaNacimiento:this.formDatosGeneralAdultoMayor.value.fechaNacimiento,
      procedencia:this.formDatosGeneralAdultoMayor.value.procedencia,
      gradoInstruccion:this.formDatosGeneralAdultoMayor.value.gradoInstruccion,
      estadoCivil:this.formDatosGeneralAdultoMayor.value.estadoCivil,
      grupoSanguineo:this.formDatosGeneralAdultoMayor.value.grupoSanguineo,
      rh:this.formDatosGeneralAdultoMayor.value.rh,
      ocupacion:this.formDatosGeneralAdultoMayor.value.ocupacion,
      domicilio:this.formDatosGeneralAdultoMayor.value.domicilio,
      telefono:this.formDatosGeneralAdultoMayor.value.telefono,
      familiarCuidadorResponsable:this.formDatosGeneralAdultoMayor.value.familiarCuidadorResponsable,
      edadFamiliarCuidador:this.formDatosGeneralAdultoMayor.value.edadFamiliarCuidador,
      dniFamiliarCuidador:this.formDatosGeneralAdultoMayor.value.dniFamiliarCuidador
    }
    console.log("data filiacion adulto mayor:" , req);
    this.filiacionService.postDatosGeneralesAdultoMayorByDoc(this.tipoDocRecuperado, this.docRecuperado, req).subscribe(
       result => {
         Swal.fire({
           icon: 'success',
           title: 'Guardo con exito',
           text: '',
           showConfirmButton: false,
           timer: 1500,
         })
       }
   )

  }

}
