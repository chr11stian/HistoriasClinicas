import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {datosGeneralesAdultoMayor} from "../models/plan-atencion-adulto-mayor.model";

@Component({
  selector: 'app-datos-generales-adulto-mayor',
  templateUrl: './datos-generales-adulto-mayor.component.html',
  styleUrls: ['./datos-generales-adulto-mayor.component.css']
})
export class DatosGeneralesAdultoMayorComponent implements OnInit {
  formDatosGeneralAdultoMayor: FormGroup;
  docRecuperado="DNI";
  tipoDocRecuperado="10101013";
  datosGeneralesAdultoMayor:datosGeneralesAdultoMayor;
  sino = [
    { label: 'F', value: 'F' },
    { label: 'M', value: 'M' }
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
      grupoSangre:new FormControl(''),
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
      this.formDatosGeneralAdultoMayor.get('nombres').setValue(this.datosGeneralesAdultoMayor.primerNombre + this.datosGeneralesAdultoMayor.otrosNombres);
      this.formDatosGeneralAdultoMayor.get('sexo').setValue(this.datosGeneralesAdultoMayor.sexo);
      this.formDatosGeneralAdultoMayor.get('edad').setValue(this.datosGeneralesAdultoMayor.edad);
      this.formDatosGeneralAdultoMayor.get('lugarNacimiento').setValue(this.datosGeneralesAdultoMayor.lugarNacimiento);
      this.formDatosGeneralAdultoMayor.get('procedencia').setValue(this.datosGeneralesAdultoMayor.procedencia);
      this.formDatosGeneralAdultoMayor.get('fechaNacimiento').setValue(this.datosGeneralesAdultoMayor.fechaNacimiento);
      this.formDatosGeneralAdultoMayor.get('gradoInstruccion').setValue(this.datosGeneralesAdultoMayor.gradoInstruccion);

      this.formDatosGeneralAdultoMayor.get('estadoCivil').setValue(this.datosGeneralesAdultoMayor.estadoCivil);
      this.formDatosGeneralAdultoMayor.get('grupoSangre').setValue(this.datosGeneralesAdultoMayor.grupoSanguinio);
      this.formDatosGeneralAdultoMayor.get('rh').setValue(this.datosGeneralesAdultoMayor.rh);
      this.formDatosGeneralAdultoMayor.get('ocupacion').setValue(this.datosGeneralesAdultoMayor.ocupacion);
      this.formDatosGeneralAdultoMayor.get('domicilio').setValue(this.datosGeneralesAdultoMayor.domicilio);
      this.formDatosGeneralAdultoMayor.get('telefono').setValue(this.datosGeneralesAdultoMayor.telefono);
      this.formDatosGeneralAdultoMayor.get('edadFamiliarCuidador').setValue(this.datosGeneralesAdultoMayor.edadFamiliarCuidador);
      this.formDatosGeneralAdultoMayor.get('dniFamiliarCuidador').setValue(this.datosGeneralesAdultoMayor.dniFamiliarCuidador);
      this.formDatosGeneralAdultoMayor.get('familiarCuidadorResponsable').setValue(this.datosGeneralesAdultoMayor.familiarCuidadorResponsable);

      // this.fechanacimiento = this.dataPacientes.nacimiento.fechaNacimiento;
      // this.convertiFecha();
      // this.formDatos_Generales.get('fechaNacimiento').setValue(this.fechaConvertido);
      // this.ageCalculator();

      // this.calcularEdad2("1990-09-21");
      // this.formDatosGeneralAdultoMayor.get('edad').setValue(this.edad);

    });
 }

}
