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
  selectedCountry: any;
  form: FormGroup;
  data: any[] = [];
  dataDiagnostico:any[] = [];
  isUpdate: boolean = false;
  datafecha: any;
  diagnosticoDialog: boolean;
  /*LISTA CIE 10*/
  filtroDiag: any[];
  Cie10: any;
  filteredDxDescripcion: any[];
  displayModal: boolean;
  idObstetricia: string = "";
  termino:string ="";
  results: any[]=[];
  hayError: boolean=false;
  debouncer: Subject<string> = new Subject();
  dataCIE: any[]=[];
  onEnter: EventEmitter<string> = new EventEmitter();
  onDebounce: EventEmitter<string> = new EventEmitter();
  placeholder: string ='';


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
      CIE10: ['', [Validators.required]],

    });
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

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('diagnostico').setValue("");
    this.form.get('CIE10').setValue("");
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

  buscarDiag(termino:string){
      this.hayError = false;
      this.termino = termino;
      this.cieService.getCIEByDescripcion(this.termino).subscribe((resp:any)=> {
        this.results = resp.object;
      },(err) => {
            this.hayError = true;
            this.results =[];
          }
      );
  }
  sugerencias(termino:string){
    this.hayError = false;
    // TODO crear sugerencias
  }
  // buscarCIE(termino:string){
  //   // let item = this.obtenerItem();
  //   this.cieService.getCIEByDescripcion(termino).subscribe(
  //       (resp:any) => {this.results = resp.object;
  //         console.log(resp);
  //         // this.dataDiagnostico.push(this.results);
  //         // console.log(this.dataDiagnostico);
  //         let i: number = 0;
  //         while(i<this.results.length){
  //           this.dataDiagnostico.push(this.results[i].descripcionItem);
  //           console.log(this.dataDiagnostico);
  //           i++;
  //         }
  //       }, (err) => {
  //           this.hayError = true;
  //       }
  //   )
  // }
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


  }
  buscar(event){

    this.buscarDiag(this.termino);
    console.log(this.results);
      let filtro:any[]=[];
      let query = event.query;
      for(let i = 0;i<this.results.length;i++){
         let filtroDes = this.results[i];
         if(filtroDes.descripcionItem.toLowerCase().indexOf(query.toLowerCase())== 0)
         {
            filtro.push(filtroDes);
         }
      }
      this.filteredDxDescripcion = filtro;
  }

}
