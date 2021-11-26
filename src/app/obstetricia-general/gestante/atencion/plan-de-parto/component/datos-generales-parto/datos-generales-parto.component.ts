import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { FiliancionService } from '../../../plan-atencion-integral/services/filiancion-atenciones/filiancion.service';
import { DatosGeneralesPartoService } from '../../services/datos-generales-parto/datos-generales-parto.service';
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
  fechaConvertido: string;
  fechanacimiento: string;
  dataPacientes: any;
  edad: any;
  dataIDdatosgenerales: any;
  constructor(
    private formBuilder: FormBuilder,
    private filiancionService: FiliancionService,
    private datosGeneralesParto: DatosGeneralesPartoService,
    private obstetriciaGeneralService: ObstetriciaGeneralService) {
    this.buildForm();
    this.idRecuperado = this.obstetriciaGeneralService.idGestacion;
    console.log("recuperado", this.idRecuperado);
    if (this.idRecuperado == null) {
      this.getpacienteByNroDoc();
    } else this.getDatosGeneralesById();
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

  esNumero(strNumber) {
    if (strNumber == null) return false;
    if (strNumber == undefined) return false;
    if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
    if (strNumber == "") return false;
    if (strNumber === "") return false;
    let psInt, psFloat;
    psInt = parseInt(strNumber);
    psFloat = parseFloat(strNumber);
    return !isNaN(strNumber) && !isNaN(psFloat);
  }

  calcularEdad2(fecha) {
    // Si la fecha es correcta, calculamos la edad
    if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
      fecha = fecha.formatDate(fecha, "yyyy-MM-dd");
    }

    //separamos lod dias meses y año
    let values = fecha.split("-");
    let dia = values[2];
    let mes = values[1];
    let anio = values[0];

    // cogemos los valores actuales
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth() + 1;
    let diaActual = fechaActual.getDate();


    // realizamos el calculo de la edad en años
    var edad = (anioActual) - anio;
    if (mesActual < mes) {
      edad--;
    }
    if ((mes == mesActual) && (diaActual < dia)) {
      edad--;
    }
    if (edad > anioActual) {
      edad -= anioActual;
    }

    // calculamos los meses
    let meses = 0;

    if (mesActual > mes && dia > diaActual)
      meses = mesActual - mes - 1;
    else if (mesActual > mes)
      meses = mesActual - mes
    if (mesActual < mes && dia < diaActual)
      meses = 12 - (mes - mesActual);
    else if (mesActual < mes)
      meses = 12 - (mes - mesActual + 1);
    if (mesActual == mes && dia > diaActual)
      meses = 11;

    // calculamos los dias
    let dias = 0;
    if (diaActual > dia)
      dias = diaActual - dia;
    if (diaActual < dia) {
      let ultimoDiaMes = new Date(anioActual, mesActual - 1, 0);
      dias = ultimoDiaMes.getDate() - (dia - diaActual);
    }
    console.log("edad", edad + " años, " + meses + " meses y " + dias + " días");

    this.edad = edad;
    return edad + " años, " + meses + " meses y " + dias + " días";
  }

  convertiFecha() {
    let values = this.fechanacimiento.split('/');
    let dia = values[2];
    let mes = values[1];
    let anio = values[0];

    this.fechaConvertido = dia + '-' + mes + '-' + anio;
    console.log("fecha Convertido", this.fechaConvertido);
  }
  getpacienteByNroDoc() {
    this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
      this.dataPacientes = res.object
      console.log('paciente por doc ', this.dataPacientes)
      this.form.get('apePaterno').setValue(this.dataPacientes.apePaterno);
      this.form.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
      this.fechanacimiento = this.dataPacientes.nacimiento.fechaNacimiento;
      this.convertiFecha();
      this.form.get('fechaNacimiento').setValue(this.fechaConvertido);
      this.calcularEdad2(this.fechaConvertido);
      this.form.get('edad').setValue(this.edad);
    });
  }
  getDatosGeneralesById() {
    this.datosGeneralesParto.getDatosGeneralesById(this.idRecuperado).subscribe((res:any)=>{
      console.log('datos traidos por el plan de parto',res.object)
    })
  }

  ngOnInit(): void {}
}
