import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {CieService} from "../../../../../services/cie.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-giagnosticos',
  templateUrl: './giagnosticos.component.html',
  styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {
  selectedDiagnostico: any;
  form: FormGroup;
  formOtrosDatos:FormGroup;
  data: any[] = [];
  consultorio: any;
  motivo:any;
  codReanes:any;
  dataDiagnostico:any[] = [];
  isUpdate: boolean = false;
  opcionBusqueda:string;
  consejeriaDialog:boolean;
  diagnosticoDialog: boolean;
  /*LISTA CIE 10*/

  Cie10: any;

  displayModal: boolean;
  idObstetricia: string = "";
  termino:string ="";
  results: any[]=[];
  hayError: boolean=false;
  private form2: FormGroup;
  constructor (private formBuilder: FormBuilder,
               private obstetriciaService:ObstetriciaGeneralService,
               private cieService: CieService) {
    this.buildForm();
    this.idObstetricia = this.obstetriciaService.idGestacion;

  }

  showModalDialog() {
    this.displayModal = true;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      diagnostico: ['', [Validators.required]],
    })
    this.form2 =this.formBuilder.group({
      orientaciones:['',[Validators.required]]
    })
  }
  recuperarDatos(){
    console.log(this.idObstetricia);
  }
  save(form: any) {
    this.isUpdate = false;
    console.log("enviando datos...");
    console.log(form);
    console.log(form.value);
    this.data.push(form.value);

    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.diagnosticoDialog = false;
  }
  openDiagnostico() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('diagnostico').setValue("");
    // this.form.get('orientaciones').setValue("");
    this.diagnosticoDialog = true;
  }
  openOrientaciones() {
    this.isUpdate = false;
    this.form2.reset();
    // // this.form.get('diagnostico').setValue("");
    this.form2.get('orientaciones').setValue("");
    this.diagnosticoDialog = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.diagnosticoDialog = false;
  }
  filterDiagnostico(event) {
    console.log('event ', event.query);
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.Cie10 = res.object;
    })
  }
  selectedOption(event){
    console.log('seleccion de autocomplete ', event)
  }
  titulo() {
    if (this.isUpdate) return "EDITE DIAGNOSTICO";
    else return "INGRESAR UN DIAGNOSTICO";
  }
  editar(rowData: any) {
    console.log("modificando" + rowData)
  }
  eliminar(rowData: any) {
    console.log("eliminando" + rowData)
  }
  ngOnInit() {
    this.recuperarDatos();
  }
  guardarDatos(){

  }

}
