import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TratamientoConsultaService} from "../../../../services/tratamiento-consulta.service";
import {CieService} from "../../../../../../../../obstetricia-general/services/cie.service";
// import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";

@Component({
  selector: 'app-tratamiento-cred',
  templateUrl: './tratamiento-cred.component.html',
  styleUrls: ['./tratamiento-cred.component.css']
})
export class TratamientoCredComponent implements OnInit {

  data: any[] = [];
  tratamientos: any[] = [];
  dialogTratamiento:boolean=false;
  formTratamiento:FormGroup;

  attributeLocalS = 'idConsulta'
  id:string=""

  intervaloList: any[];
  viaadministracionList: any[];

  constructor(private tratamientoService: TratamientoConsultaService,
              private cieService: CieService,
              private formBuilder: FormBuilder) {
    this.buildForm();
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.intervaloList = [
      {label: 'CADA 4 HORAS', value: 'CADA 4 HORAS'},
      {label: 'CADA 5 HORAS', value: 'CADA 5 HORAS'},
      {label: 'CADA 6 HORAS', value: 'CADA 6 HORAS'},
      {label: 'CADA 8 HORAS', value: 'CADA 8 HORAS'},
      {label: 'CADA 12 HORAS', value: 'CADA 12 HORAS'},
      {label: 'CADA 24 HORAS', value: 'CADA 24 HORAS'},
      {label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE'},
      {label: 'DOSIS UNICA', value: 'DOSIS UNICA'},
      {label: 'CADA 48 HORAS', value: 'CADA 48 HORAS'}
    ];

    this.viaadministracionList = [{label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
      {label: 'INHALADORA', value: 'INHALADORA'},
      {label: 'INTRADERMICO', value: 'INTRADERMICO'},
      {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
      {label: 'NASAL', value: 'NASAL'},
      {label: 'OFTALMICO', value: 'OFTALMICO'},
      {label: 'ORAL', value: 'ORAL'},
      {label: 'OPTICO', value: 'OPTICO'},
      {label: 'RECTAL', value: 'RECTAL'},
      {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
      {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
      {label: 'TOPICO', value: 'TOPICO'},
      {label: 'VAGINAL', value: 'VAGINAL'},
    ];
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.id = localStorage.getItem(this.attributeLocalS);

  }

  cancelTratamiento() {
    this.dialogTratamiento = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })

  }


  /*****************Imprimir Receta**************/
  imprimirReceta(){
    console.log("imprimiendo rececta");
  }

  saveTratamiento() {

  }

  editarTratamiento(rowData: any, rowIndex: any) {

  }

  eliminarTratamiento(rowIndex: any) {

  }

  openTratamiento() {

  }
}


