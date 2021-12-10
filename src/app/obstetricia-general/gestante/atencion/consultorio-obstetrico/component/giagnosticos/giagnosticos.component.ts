import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {CieService} from "../../../../../services/cie.service";
import {ConsultasService} from "../../services/consultas.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-giagnosticos',
  templateUrl: './giagnosticos.component.html',
  styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {

  diagnosticos2: any[]=[];
  formDiagnostico: FormGroup;

  selectedDiagnostico: any;
  opcionBusqueda: string;
  /**Recupera el Id del Consultorio Obstetrico**/
  idConsultoriObstetrico: string;
  form: FormGroup
  /*****PROPIEDADES del diagnositico**********/
  data: any[] = []; // data dx
  diagnosticoDialog: boolean;
  diagnosticos: any[]=[];
  /******** PROPIEDADES de orientaciones******/
  data2: any[] = []; // data orientaciones
  isUpdate: boolean = false;
  // orientacionesDialog: boolean;
  /****LISTA CIE 10*****/
  Cie10: any;
  displayModal: boolean;
  /******PROPIEDADES DE DATOS ADICIONALES**********/
  form2: FormGroup; /*FORM DE ORIENTACIONES*/
  planPartoList: any[];
  visitaDomiciliariaList:any[];
  formOtrosDatos: FormGroup;
  referencia: any;
  proxCita: any;
  orientaciones: any[]=[];
  /*******DATA AUX PARA RECUPERAR DE LA BD*******/
  dataAux: any;
  datePipe = new DatePipe('en-US');
  visitaDomiciliaria: any;
  /****** Data recuperada********/
  private planPartoReenfocada: any;
  private tipoDocRecuperado: any;
  private nroDocRecuperado: any;
  private  nroEmbarazo:any;
  private nroHclRecuperado:any;
  /********Lista tipo Dx*****/
  private tipoList:any[]= [];

  constructor(private formBuilder: FormBuilder,
              private obstetriciaService: ObstetriciaGeneralService,
              private cieService: CieService,
              // private dialog:DialogService,
              private messageService: MessageService,
              private DxService: ConsultasService) {
    this.buildForm();
    /*********RECUPERAR DATOS*********/
    this.tipoDocRecuperado = this.obstetriciaService.tipoDoc;
    this.nroDocRecuperado = this.obstetriciaService.nroDoc;
    this.nroEmbarazo = this.obstetriciaService.nroEmbarazo;
    this.idConsultoriObstetrico = this.obstetriciaService.idConsultoriObstetrico;
    this.nroHclRecuperado = this.obstetriciaService.nroHcl;
    /***************DATOS DE LOS DROPDOWNS*******************/
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.tipoList = [{label: 'D', value: 'D'},
      {label: 'P', value: 'P'},
      {label: 'R', value: 'R'},

    ];
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
  ngOnInit() {
    this.recuperarDatosGuardados();
    console.log("TipoDocRecuperado", this.tipoDocRecuperado);
    console.log("NroDocRecuparado", this.nroDocRecuperado);
    console.log("Nro de embarazo", this.nroEmbarazo);
    console.log("Id Consultorio Obstetrico", this.idConsultoriObstetrico);
  }
  showModalDialog() {
    this.displayModal = true;
  }
  /*****************DATOS RECIBIDOS DEL MODAL DX*************************/
  // openDialogDiagnostico(){
  //    this.ref = this.dialog.open(DiagnosticoModalComponent, {
  //     header: "TRATAMIENTOS",
  //     contentStyle:{
  //       overflow:"auto",
  //     },
  //   })
  //   this.ref.onClose.subscribe((data:any)=>{
  //     console.log("data de modal tratamiento",data)
  //     if(data!==undefined)
  //       this.diagnosticos2.push(data);
  //     console.log(this.formDiagnostico);
  //   })
  // }
  // openDialogEditarDiagnostico(row,index){
  //   let aux={
  //     index: index,
  //     row: row
  //   }
  //   this.ref = this.dialog.open(DiagnosticoModalComponent, {
  //     header: "DIAGNOSTICOS",
  //     contentStyle: {
  //       overflow: "auto",
  //     },
  //     data: aux
  //   })
  //   this.ref.onClose.subscribe((data: any) => {
  //     console.log('data de modal tratamiento ', data)
  //     if(data!==undefined) {
  //       this.diagnosticos2.splice(data.index, 1,data.row);
  //     };
  //   })
  // }
  /***************************FIN MODAL DX*********************/
  buildForm() {
    this.form = this.formBuilder.group({
      diagnostico: ['', [Validators.required]],
      // tipo:['', [Validators.required]],
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
      cie10:this.data[0]['diagnostico']['codigoItem']}),
        // tipo:this.form.value.tipo;
      // tipo:this.form.value.tipo;
    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.diagnosticoDialog = false;
  }
  /******ABRIR DIALOGS DX****/
  openDiagnostico() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('diagnostico').setValue("");
    this.diagnosticoDialog = true;
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
   /******EVENTO PARA BUSQUEDA SEGUN FILTRO*****/
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
  /*ELIMINAR DATOS DE LAS TABLAS*/
  eliminarDx(index) {
    this.diagnosticos.splice(index, 1)
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
      id:this.idConsultoriObstetrico,
      nroHcl:this.nroHclRecuperado,
      nroEmbarazo:this.nroEmbarazo,
      nroAtencion:1,
      // nroControlSis: 1,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      referencia: this.referencia,
      proxCita: this.proxCita,
      visitaDomiciliaria:this.visitaDomiciliaria,
      planPartoReenfocada:this.planPartoReenfocada,
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
      "id" : this.idConsultoriObstetrico,
      "nroHcl":this.nroHclRecuperado,
      "nroEmbarazo":this.nroEmbarazo,
      "nroAtencion":1
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataAux = res.object;
      console.log(this.dataAux);
      /************************RECUPERAR DATOS EXTRA**************************/
      this.formOtrosDatos.patchValue({'consultorio':this.dataAux.referencia.consultorio});
      this.formOtrosDatos.patchValue({'motivo':this.dataAux.referencia.motivo});
      this.formOtrosDatos.patchValue({'codRENAES':this.dataAux.referencia.codRENAES});
      this.formOtrosDatos.patchValue({'proxCita':this.dataAux.proxCita});
      this.formOtrosDatos.patchValue({'visita':this.dataAux.visitaDomiciliaria.estado});
      this.formOtrosDatos.patchValue({'fechaVisita':this.dataAux.visitaDomiciliaria.fecha});
      this.formOtrosDatos.patchValue({'planPartoReenfocada':this.dataAux.planPartoReenfocada});
      /**********************RECUPERAR DATOS DE ORIENTACIONES********/
      if(this.dataAux.orientaciones.length === null || this.dataAux.orientaciones.length === 0 ){
        this.messageService.add({severity:'info', summary:'Recuperado', detail:'no existe ninguna orientación ingresada'});
      }
      else{
        let i: number = 0;
        console.log(this.dataAux.orientaciones);
        // this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro de orientaciones recuperado satisfactoriamente'});
        while(i<this.dataAux.orientaciones.length){
          console.log("orientaciones consta de: ", this.dataAux.orientaciones[i]);
          if(this.dataAux.orientaciones[i].valor === true) {
            this.orientaciones.push(this.dataAux.orientaciones[i]);
          }
          i++;
        }
      }
      /************************RECUPERAR DATOS DE DIAGNOSTICOS***************/
      if(this.dataAux.diagnosticos.length === null || this.dataAux.diagnosticos.length === 0 ){
        console.log("NO INGRESO NINGUN DIAGNOSTICO AUN, POR FAVOR INGRESE AL MENOS UNO");
        this.messageService.add({severity:'info', summary:'Recuperado', detail:'no existe ninguna diagnostico ingresado'});
      }
      else{
        let i: number = 0;
        this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro de diagnosstico recuperado satisfactoriamente'});
        while(i<this.dataAux.diagnosticos.length){
          // console.log("interconsultas nro: " ,i);
          console.log("diagnosticos consta de: ", this.dataAux.diagnosticos[i]);
          this.diagnosticos.push(this.dataAux.diagnosticos[i]);
          i++;
        }
      }

    });
  }

  openDialogDiagnostico() {
    console.log("ingresando al otro modal");
  }
}
