import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-antecedentes',
  templateUrl: './modal-antecedentes.component.html',
  styleUrls: ['./modal-antecedentes.component.css']
})
export class ModalAntecedentesComponent implements OnInit {
  formAntecedentes: FormGroup;
  dialogAntecedente:boolean=false;
  esPersonal:boolean=false;
  esFamiliar:boolean=false;
  dataAntecedentes:antecedentesFam[]=[];
  listaAntecedentes:any[]=[];
  listaPariente:any[]=[];
  dataPipe = new DatePipe('en-US');

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig) {
    console.log(config.data);
    this.listaPariente=[
      {codigo:'PADRE',value:'PADRE'},
      {codigo:'MADRE',value:'MADRE'},
      {codigo:'ABUELO(A)',value:'ABUELO(A)'},
      {codigo:'HERMANO(A)',value:'HERMANO(A)'},
      {codigo:'TIO(A)',value:'TIO(A)'},
      {codigo:'OTROS',value:'OTROS'},

    ]
    this.listaAntecedentes=[{codigo:'ALERGIAS',value:'ALERGIAS'},
      {codigo:'EPILEPSIA',value:'EPILEPSIA'},
      {codigo:'DIABETES',value:'DIABETES'},
      {codigo:'ENFERMEDADES CONGÉNITAS',value:'ENFERMEDADES CONGÉNITAS'},
      {codigo:'EMBARAZO MÚLTIPLE',value:'EMBARAZO MÚLTIPLE'},
      {codigo:'MALARIA',value:'MALARIA'},
      {codigo:'HIPERTENSION ARTERIAL',value:'HIPERTENSION ARTERIAL'},
      {codigo:'HIPOTIROIDISMO',value:'HIPOTIROIDISMO'},
      {codigo:'NEOPLÁSICA',value:'NEOPLÁSICA'},
      {codigo:'TBC PULMONAR',value:'TBC PULMONAR'},
      {codigo:'SOBA/ASMA BRONQUIAL',value:'SOBA/ASMA BRONQUIAL'},
      {codigo:'ANEMIA',value:'ANEMIA'},
      {codigo:'ARTRITIS',value:'ARTRITIS'},
      {codigo:'CÁNCER',value:'CÁNCER'},
      {codigo:'CARDIOPATÍAS',value:'CARDIOPATÍAS'},
      {codigo:'ARTERIOESCLEROSIS',value:'ARTERIOESCLEROSIS'},
      {codigo:'SIFILIS',value:'SIFILIS'},
      {codigo:'BLENORRAGIA',value:'BLENORRAGIA'},
      {codigo:'VIH/SIDA',value:'VIH/SIDA'},
      {codigo:'REUMATISMO',value:'REUMATISMO'},
      {codigo:'DISLIPIDEMIAS',value:'DISLIPIDEMIAS'},
      {codigo:'ALCOHOLISMO',value:'ALCOHOLISMO'},
      {codigo:'ABORTO HABITUAL/RECURRENTE',value:'ABORTO HABITUAL/RECURRENTE'},
      {codigo:'VIOLENCIA',value:'VIOLENCIA'},
      {codigo:'CIRUGÍA PÉLVICA UTERINA',value:'CIRUGÍA PÉLVICA UTERINA'},
      {codigo:'ECLAMPSIA',value:'ECLAMPSIA'},
      {codigo:'PRE ECLAMPSIA',value:'PRE ECLAMPSIA'},
      {codigo:'HEMORRAGIA POSTPARTO',value:'HEMORRAGIA POSTPARTO'},
      {codigo:'ALERGIA A MEDICAMENTOS',value:'ALERGIA A MEDICAMENTOS'},
      {codigo:'ENFERMEDADES CONGÉNITAS',value:'ENFERMEDADES CONGÉNITAS'},
      {codigo:'ENFERMEDADES INFECCIOSAS',value:'ENFERMEDADES INFECCIOSAS'},
      {codigo:'CONSUMO DE HOJA DE COCA',value:'CONSUMO DE HOJA DE COCA'},
      {codigo:'CONSUMO DE DROGAS',value:'CONSUMO DE DROGAS'},
      {codigo:'CONSUMO DE TABACO',value:'CONSUMO DE TABACO'},
      {codigo:'INFERTILIDAD',value:'INFERTILIDAD'},
      {codigo:'PARTO PROLONGADO',value:'PARTO PROLONGADO'},
      {codigo:'PREMATURIDAD',value:'PREMATURIDAD'},
      {codigo:'RETENCION DE PLACENTA',value:'RETENCION DE PLACENTA'},
      {codigo:'TRANSTORNOS MENTALES',value:'TRANSTORNOS MENTALES'},
      {codigo:'HOSPITALIZACIONES',value:'HOSPITALIZACIONES'},
      {codigo:'TRANSFUSIONES SANGUINEAS',value:'TRANSFUSIONES SANGUINEAS'},
      {codigo:'OTRAS CIRUGIAS',value:'OTRAS CIRUGIAS'},
      {codigo:'CIRUGÍA PÉLVICA UTERINA',value:'CIRUGÍA PÉLVICA UTERINA'},
      {codigo:'HEPATITIS B',value:'HEPATITIS B'},
    ]
    this.buildForm();
    if(config.data){
      this.esFamiliar=this.config.data.esFamiliar;
      this.esPersonal=this.config.data.esPersonal;
      this.llenarCamposAntecedentes();
    }
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formAntecedentes = this.form.group({
      nombre: new FormControl("", [Validators.required]),
      fechaDiagnosticado: new FormControl("", [Validators.required]),
      edadAnio: new FormControl("", [Validators.required]),
      edadMes: new FormControl("", [Validators.required]),
      edadDia: new FormControl("", [Validators.required]),
      pariente: new FormControl("", [Validators.required]),

    })
  }

  openNew(){
    this.formAntecedentes.reset();
    this.dialogAntecedente = true;
  }

  canceled() {
    this.ref.close();
    this.dialogAntecedente = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: 'No se guardo ningún registro',
      showConfirmButton: false,
      timer: 1000
    })
  }
  enviarAntecedentes(){
    let antecedentes={}
    console.log(this.formAntecedentes.value.nombre.value);
      antecedentes = {
        nombre:this.formAntecedentes.value.nombre.value,
        fechaDiagnosticado:this.formAntecedentes.value.fechaDiagnosticado,
        edadAnio:this.formAntecedentes.value.edadAnio,
        edadMes:this.formAntecedentes.value.edadMes,
        edadDia:this.formAntecedentes.value.edadDia,
        pariente:this.formAntecedentes.value.pariente,
      }
      this.dataAntecedentes.push(antecedentes);
    this.dialogAntecedente=false;
  }

  llenarCamposAntecedentes() {
    let configuracion = this.config.data;
    this.formAntecedentes.get("nombre").setValue(configuracion.nombre);
    this.formAntecedentes.get("fechaDiagnosticado").setValue(configuracion.fechaDiagnosticado);
    this.formAntecedentes.get("edadAnio").setValue(configuracion.edadAnio);
    this.formAntecedentes.get("edadMes").setValue(configuracion.edadMes);
    this.formAntecedentes.get("edadDia").setValue(configuracion.edadDia);
    this.formAntecedentes.get("pariente").setValue(configuracion.pariente);
  }

  closeDialogGuardar() {
    this.enviarAntecedentes();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataAntecedentes[0]
            }:
            this.dataAntecedentes[0]);
  }
  closeDialog() {
    this.ref.close();
  }

  filterItems(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.listaAntecedentes.length; i++) {
      let item = this.listaAntecedentes[i];
      if (item.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.listaAntecedentes = filtered;
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
