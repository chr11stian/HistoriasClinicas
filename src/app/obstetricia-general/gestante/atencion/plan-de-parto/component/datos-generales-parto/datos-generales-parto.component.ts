import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { FiliancionService } from '../../../plan-atencion-integral/services/filiancion-atenciones/filiancion.service';
import { DatosGeneralesPartoService } from '../../services/datos-generales-parto/datos-generales-parto.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datos-generales-parto',
  templateUrl: './datos-generales-parto.component.html',
  styleUrls: ['./datos-generales-parto.component.css']
})
export class DatosGeneralesPartoComponent implements OnInit {
  form: FormGroup;
  idRecuperado: string = "";
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  dataPacientes: any;
  EESS: any[];
  red: any[];
  microRed: any[];
  datePipe = new DatePipe('en-US');
  constructor(
    private formBuilder: FormBuilder,
    private filiancionService: FiliancionService,
    private datosGeneralesPartoService: DatosGeneralesPartoService,
    private obstetriciaGeneralService: ObstetriciaGeneralService) {
    this.buildForm();
    this.idRecuperado = this.obstetriciaGeneralService.idGestacion;
    this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
    this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
    console.log("recuperado", this.idRecuperado);
    this.consultaExistePlanParto();
    this.EESS = [
      {
        name: "La posta"
      },
      {
        name: "Belempampa"
      },
      {
        name: "Tupac Amaru"
      }
    ]
    this.red = [
      {
        name: "Red Norte Cusco"
      },
      {
        name: "Red Sur Cusco"
      }
    ]
    this.microRed = [
      {
        name: "Urubamba"
      },
      {
        name: "Calca"
      },
      {
        name: "Anta"
      }
    ]
  }

  consultaExistePlanParto() {
    this.datosGeneralesPartoService.getConsultaExistePlanParto(this.idRecuperado).subscribe((res: any) => {
      if (res.mensaje === "Se encontro un registro.") {
        console.log(res.mensaje);
        this.getDatosGeneralesById();
      } else {
        this.getpacienteByNroDoc();
      };
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombreGestante: [''],
      edad: [''],
      nroHistoria: [''],
      grupoSanguineo: [''],
      fpp: [''],
      direccion: [''],
      direccionReferencia: [''],
      eess: [''],
      microRed: [''],
      red: [''],
      telefonoEess: [''],
      frecuenciaRadioEess: [''],
      telefonoComunidad: [''],
      nombrePromotor: [''],
      tiempoLlegarEess: [''],
    })
  }

  getpacienteByNroDoc() {
    this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
      this.dataPacientes = res.object
      console.log('paciente por doc ', this.dataPacientes);
      this.form.get('nombreGestante').setValue(this.dataPacientes.apePaterno + " " + this.dataPacientes.apeMaterno + ", " + this.dataPacientes.primerNombre + " " + this.dataPacientes.otrosNombres);
      this.form.get('nroHistoria').setValue(this.dataPacientes.nroHcl);
      this.form.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
      this.form.get('eess').setValue(this.dataPacientes.nombreEESS);
    });
    this.datosGeneralesPartoService.getDatosGeneralesById(this.idRecuperado).subscribe((res: any) => {
      console.log('datos traidos por el plan de parto', res.object);
      let myDate = res.object.fpp.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
      let newDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
      this.form.get('fpp').setValue(newDate);
      this.form.get('grupoSanguineo').setValue(res.object.grupoSanguineo);
      this.form.get('edad').setValue(res.object.edad);
    })
  }

  getDatosGeneralesById() {
    this.datosGeneralesPartoService.getDatosGeneralesById(this.idRecuperado).subscribe((res: any) => {
      console.log('datos traidos por el plan de parto', res.object);
      let gestante = res.object;
      this.form.get('nombreGestante').setValue(gestante.nombreGestante);
      this.form.get('nroHistoria').setValue(gestante.nroHcl);
      this.form.get('direccion').setValue(gestante.direccion);
      this.form.get('edad').setValue(gestante.edad);
      this.form.get('grupoSanguineo').setValue(gestante.grupoSanguineo);
      let myDate = gestante.fpp.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
      let newDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
      this.form.get('fpp').setValue(newDate);
      this.form.get('direccionReferencia').setValue(gestante.referenciaDireccion);
      this.form.get('eess').setValue(gestante.eess);
      this.form.get('microRed').setValue(gestante.microRed);
      this.form.get('red').setValue(gestante.nombreGestante);
      this.form.get('telefonoEess').setValue(gestante.telefonoEess);
      this.form.get('frecuenciaRadioEess').setValue(gestante.frecuenciaRadioEess);
      this.form.get('telefonoComunidad').setValue(gestante.telefonoComunidad);
      this.form.get('nombrePromotor').setValue(gestante.nombrePromotorSalud);
      this.form.get('tiempoLlegarEess').setValue(gestante.tiempoLlegarEess);
    })
  }

  guardarDatosGeneralesPlanParto() {
    var data = {
      nombreGestante: this.form.value.nombreGestante,
      edad: this.form.value.edad,
      nroHcl: this.form.value.nroHistoria,
      grupoSanguineo: this.form.value.grupoSanguineo,
      fpp: this.datePipe.transform(this.form.value.fpp, 'dd-MM-yyyy'),
      direccion: this.form.value.direccion,
      referenciaDireccion: this.form.value.direccionReferencia,
      eess: this.form.value.eess,
      microRed: this.form.value.microRed,
      red: this.form.value.red,
      telefonoEess: this.form.value.telefonoEess,
      frecuenciaRadioEess: this.form.value.frecuenciaRadioEess,
      telefonoComunidad: this.form.value.telefonoComunidad,
      nombrePromotorSalud: this.form.value.nombrePromotor,
      tiempoLlegarEess: this.form.value.tiempoLlegarEess,
    }
    this.datosGeneralesPartoService.postDatosGenerales(this.idRecuperado, data).subscribe((res: any) => {
      console.log("Guardado correctamente", res.object);
    })
  }
  ngOnInit(): void { }
}
