import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {CieService} from "../../../../../services/cie.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConsultasService} from "../../services/consultas.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-giagnosticos',
  templateUrl: './giagnosticos.component.html',
  styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {
  selectedDiagnostico: any;
  form: FormGroup
  data: any[] = []; // data dx
  data2: any[] = []; // data orientaciones
  isUpdate: boolean = false;
  opcionBusqueda: string;
  consejeriaDialog: boolean;
  diagnosticoDialog: boolean;
  /* campos orientaciones*/
  orientacionesDialog: boolean;
  /*LISTA CIE 10*/
  Cie10: any;
  displayModal: boolean;
  hayError: boolean = false;
  form2: FormGroup; /*FORM DE ORIENTACIONES*/
  planPartoList: any[];
  visitaDomiciliariaList:any[];
  formOtrosDatos: FormGroup;
    referencia: any;
    proxCita: any;
  orientaciones: any[]=[];
  diagnosticos: any[]=[];

  dataAux: any;
  datePipe = new DatePipe('en-US');

  cies: any[]=[];
  visitaDomiciliaria: any;
  private planPartoReenfocada: any;
  constructor(private formBuilder: FormBuilder,
              private obstetriciaService: ObstetriciaGeneralService,
              private cieService: CieService,
              private DxService: ConsultasService) {
    this.buildForm();
    this.planPartoList = [{label: 'CONTROL', value: 'CONTROL'},
      {label: 'VISITA', value: 'VISITA'},
      {label: 'NO SE HIZO', value: 'NO SE HIZO'},
      {label: 'NO APLICA', value: 'NO APLICA'}
    ];
    this.visitaDomiciliariaList = [
      {label: 'SI', value: 'SI'},
      {label: 'NO', value: 'NO'},
      {label: 'NO APLICA', value: 'NO APLICA'}
    ];
  }

  showModalDialog() {
    this.displayModal = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      diagnostico: ['', [Validators.required]],
    }),
        this.form2 = this.formBuilder.group({
          orientaciones: ['', [Validators.required]],
        }),
        this.formOtrosDatos = this.formBuilder.group({
          consultorio: ['', [Validators.required]],
          motivo: ['', [Validators.required]],
          codRENAES: ['', [Validators.required]],
          proxCita: ['', [Validators.required]],
          planPartoReenfocada: ['', [Validators.required]],
          visita: ['', [Validators.required]],
          fechaVisita: ['', [Validators.required]]
        })
  }
   /*guardar datos de diagnosticos*/
  save1(form: any) {
    this.isUpdate = false;
    this.data.push(form.value);
    console.log(this.data);
    this.diagnosticos.push({
      diagnostico: this.data[0]['diagnostico']['descripcionItem'],
      cie10:this.data[0]['diagnostico']['codigoItem']});
    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.diagnosticoDialog = false;
  }

  /*guardar datos de orientaciones*/
  save2(form: any) {
    this.isUpdate = false;
    this.data2.push(form.value);
    console.log(this.data2);
    this.orientaciones.push({
      consejeria: this.data2[0]['orientaciones']['descripcionItem'],
       cie10:this.data2[0]['orientaciones']['codigoItem']});
    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.orientacionesDialog = false;
  }


  /*ABRIR DIALOGS*/
  openDiagnostico() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('diagnostico').setValue("");
    this.diagnosticoDialog = true;
  }
  openOrientaciones() {
    this.isUpdate = false;
    this.form.reset();
    this.form2.reset();
    this.form2.get('orientaciones').setValue("");
    this.orientacionesDialog = true;
  }
  canceled1() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.diagnosticoDialog = false;
  }

  canceled2() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.orientacionesDialog = false;
  }

  /*EVENTO PARA BUSQUEDA SEGUN FILTRO*/
  filterDiagnostico(event) {
    console.log('event ', event.query);
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.Cie10 = res.object;
    })
  }

  selectedOption(event) {
    console.log('seleccion de autocomplete ', event)
  }

  /*FIN PARA BUSQUEDA SEGUN FILTRO*/
  titulo() {
    if (this.isUpdate) return "EDITE DIAGNOSTICO";
    else return "INGRESAR UN DIAGNOSTICO";
  }

  editar(rowData: any) {
    console.log("modificando" + rowData)
  }

  ngOnInit() {
    this.recuperarDatosGuardados();
  }

  /*ELIMINAR DATOS DE LAS TABLAS*/
  eliminarDx(index) {
    this.diagnosticos.splice(index, 1)
  }

  eliminarOrientaciones(index) {
    this.orientaciones.splice(index, 1)
  }

  enviarDatosRefProxCita() {
    this.referencia = {
      consultorio: this.formOtrosDatos.value.consultorio,
      motivo: this.formOtrosDatos.value.motivo,
      codRENAES: this.formOtrosDatos.value.codRENAES
    },
    this.proxCita = this.datePipe.transform(this.formOtrosDatos.value.proxCita, 'yyyy-MM-dd HH:mm:ss')
    this.visitaDomiciliaria = {
      estado: this.formOtrosDatos.value.visita,
      fecha:  this.datePipe.transform(this.formOtrosDatos.value.fechaVisita, 'yyyy-MM-dd HH:mm:ss')

    }
    this.planPartoReenfocada = this.formOtrosDatos.value.planPartoReenfocada
  }

  guardarTodosDatos() {
    this.enviarDatosRefProxCita();
    const req = {
      nroHcl:"24015415",
      nroEmbarazo:1,
      nroAtencion:1,
      nroControlSis: 1,
      tipoDoc: "DNI",
      nroDoc: "24015415",
      referencia: this.referencia,
      proxCita: this.proxCita,
      visitaDomiciliaria:this.visitaDomiciliaria,
      planPartoReenfocada:this.planPartoReenfocada,
      orientaciones:this.orientaciones,
      diagnosticos:this.diagnosticos

    }
    this.DxService.updateConsultas(req).subscribe(
        (resp) => {
          console.log(resp);
          console.log(req);

          Swal.fire({
            icon: 'success',
            title: 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })

        }
    )
  }
  recuperarDatosGuardados(){
    let aux ={
      "nroHcl":"24015415",
      "nroEmbarazo":1,
      "nroAtencion":1
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataAux = res.object;
      console.log(this.dataAux);
      this.formOtrosDatos.patchValue({'consultorio':this.dataAux.referencia.consultorio});
      this.formOtrosDatos.patchValue({'motivo':this.dataAux.referencia.motivo});
      this.formOtrosDatos.patchValue({'codRENAES':this.dataAux.referencia.codRENAES});
      this.formOtrosDatos.patchValue({'proxCita':this.dataAux.proxCita});
      this.formOtrosDatos.patchValue({'visita':this.dataAux.visitaDomiciliaria.estado});
      this.formOtrosDatos.patchValue({'fechaVisita':this.dataAux.visitaDomiciliaria.fecha});
      this.formOtrosDatos.patchValue({'planPartoReenfocada':this.dataAux.planPartoReenfocada});

      if(this.dataAux.orientaciones.length === null || this.dataAux.orientaciones.length === 0 ){
        console.log("NO INGRESO NINGUN DIAGNOSTICO AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataAux.orientaciones.length){
          // console.log("interconsultas nro: " ,i);
          console.log("orientaciones consta de: ", this.dataAux.orientaciones[i]);
          this.orientaciones.push(this.dataAux.orientaciones[i]);
          i++;
        }
      }
      if(this.dataAux.diagnosticos.length === null || this.dataAux.diagnosticos.length === 0 ){
        console.log("NO INGRESO NINGUN DIAGNOSTICO AUN, POR FAVOR INGRESE AL MENOS UNO");
      }
      else{
        let i: number = 0;
        while(i<this.dataAux.diagnosticos.length){
          // console.log("interconsultas nro: " ,i);
          console.log("diagnosticos consta de: ", this.dataAux.diagnosticos[i]);
          this.diagnosticos.push(this.dataAux.diagnosticos[i]);
          i++;
        }
      }

    });
  }
}
