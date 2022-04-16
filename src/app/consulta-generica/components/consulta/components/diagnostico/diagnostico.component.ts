import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CieService} from "../../../../../obstetricia-general/services/cie.service";
import {UpsAuxIpressService} from "../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import {DiagnosticosService} from "../../../../services/diagnosticos/diagnosticos.service";

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css'],
  providers: [DialogService]

})
export class DiagnosticoComponent implements OnInit {
  dxs:any[]=[];

  loading: boolean = true;
  // submitted: boolean = false;

  attributeLocalS = 'document';
  // attributeLocalS2 = 'consultaGeneral';
  idIpress:string="";
  dataConsulta:any;
  idConsulta: string = "";
  itemEdit:number=-1;
  isUpdate:boolean=false;

  formDiagnostico: FormGroup;
  diagnosticoDialog: boolean;
  diagnosticos: diagnosticoInterface[]=[];

  ListaPrestacion:any[]=[];
  listaDeCIEHIS: any[]=[];
  listaDeCIESIS: any[]=[];
  // listaDeProcedimientos:any[]=[];
  tipoList:lista[]=[];
  listaUpsHis:any[]=[];
  listaUpsAuxHis:any[]=[];
  estadoEditar:boolean=false;
  checked: boolean=false;
  descripcionItem: string;
  private hayDatos:boolean=false;
  constructor(private DiagnosticoService: DiagnosticosService,
              private PrestacionService: PrestacionService,
              private cieService: CieService,
              private formBuilder: FormBuilder,
              private UpsAuxService:UpsAuxIpressService,
              private messageService: MessageService) {
    this.buildForm();
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.dataConsulta = JSON.parse(localStorage.getItem('documento'));
    this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
      { label: 'PRESUNTIVO', value: 'P' },
      { label: 'REPETITIVO', value: 'R' },
    ];
  }

  ngOnInit(): void {
    this.recuperarUpsHis();
    this.recuperarUpsAuxHis();
    this.recuperarPrestaciones();
    this.recuperarDxBD();

  }
  buildForm() {
    this.formDiagnostico = this.formBuilder.group({
      nro:new FormControl(''),
      buscarDxSIS:  new FormControl({value:'',disabled:false}),
      buscarDxHIS:  new FormControl({value:'',disabled:false}),
      tipoDiagnostico:  new FormControl({value:'',disabled:false}),
      prestacion: new FormControl({value:'',disabled:false}),
      nombreUPS: new FormControl({value:'',disabled:false}),
      nombreUPSaux:['', [Validators.required]],
      diagnosticoSIS: new FormControl({value:'',disabled:false}),
      cie10SIS: new FormControl({value:'',disabled:false}),
      diagnosticoHIS: new FormControl({value:'',disabled:false},[Validators.required]),
      cie10HIS:  new FormControl({value:'',disabled:false},[Validators.required]),
      factorCondicional:  new FormControl({value:'',disabled:false}),
      lab:  new FormControl({value:'',disabled:false})
    });

  }

  recuperarUpsHis() {
    console.log(this.dataConsulta)
    let data = {
      idIpress: this.idIpress,
      edad: this.dataConsulta.anio,
      sexo: this.dataConsulta.sexo
    }
    this.DiagnosticoService.listaUpsHis(data).then((res: any) => this.listaUpsHis = res.object);
  }
  /** Servicios para recuperar lista de ups Aux por ipress***/
  recuperarUpsAuxHis() {
    this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe((r: any) => {
      if(r.object!=null){
        this.listaUpsAuxHis=r.object.filter(element => element.estado == true);
      }
      console.log("lista ups aux ",this.listaUpsAuxHis);
    })
  }

  /*** Servicio para recuperar Prestaciones ***/
  recuperarPrestaciones() {
    this.PrestacionService.getPrestacion().subscribe((res: any) => {
      this.ListaPrestacion = res.object;
      console.log("prestaciones:", this.ListaPrestacion);
    })
  }

  /****funciones para recuperar Dx y Procedimientos**/
  recuperarDxBD(){
    this.DiagnosticoService.getDiagnostico(this.dataConsulta.idConsulta).subscribe((res: any) => {
          console.log(res.cod);
          if(res.object!=null){
            console.log(res.object);
            this.hayDatos=true;
            this.diagnosticos = res.object;
          }
          else{
            this.diagnosticos = [];
            Swal.fire({
              icon: 'info',
              title: 'INFORMACION',
              text: 'Aún no hay registros guardados en Diagnósticos',
              showConfirmButton: false,
              timer: 1500,
            })
          }

        },error => {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Ocurrio un error al recuperar datos registrados anteriormente en esta consulta.',
            showConfirmButton: false,
            timer: 1500,
          })
        }
    );
  }
  /**Funciones de Diagnostico*/

  openDiagnostico() {
    // this.diagnosticoDialog = true;
    this.isUpdate = false;
    this.checked=false;
    this.formDiagnostico.reset();
    this.formDiagnostico.get('nombreUPS').setValue("");
    this.formDiagnostico.get('cie10HIS').setValue("");
    this.listaDeCIESIS=[];
    this.diagnosticoDialog = true;
  }

  cancelDiagnostico() {
    this.diagnosticoDialog = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
  }


  save() {
    Swal.fire({
      icon: 'success',
      title: 'DIAGNOSTICOS...',
      text: 'GUARDADO',
      showConfirmButton: false,
      timer: 1000
    })
  }

  /*** funciones Procedimientos****/
  onChangePrestacion() {
    let codigoPrestacion:any;
    codigoPrestacion=this.formDiagnostico.value.prestacion.codigo;
    this.formDiagnostico.patchValue({ diagnosticoSIS: ""})
    this.formDiagnostico.patchValue({ cie10SIS: ""})
    this.PrestacionService.getDiagnosticoPorCodigo(codigoPrestacion).subscribe((res: any) => {
      // this.listaDeCIE = res.object.diagnostico;
      console.log(res.object);
      if(res.object.denominacion=='ANIOS')
      {
        if(this.dataConsulta.anio>=res.object.edadMin && this.dataConsulta.anio<=res.object.edadMax){
          this.listaDeCIESIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
        }
        else{
          this.messageService.add({severity:'error', summary: 'CUIDADO', detail:'No hay diagnosticos disponibles para la edad del paciente.'});
        }
      }
      if(res.object.denominacion=='MESES')
      {
        let meses = this.dataConsulta.anio*12 + this.dataConsulta.mes + this.dataConsulta.dia/30;
        if(meses>=res.object.edadMin && meses <=res.object.edadMax){
          this.listaDeCIESIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
        }
        else{
          this.messageService.add({severity:'error', summary: 'CUIDADO', detail:'No hay diagnosticos disponibles para la edad del paciente en esta Prestación.'});
        }

      }
      if(res.object.denominacion=='DIAS')
      {
        if(this.dataConsulta.anio==0 && this.dataConsulta.mes==0){
          if(this.dataConsulta.dia>=res.object.edadMin && this.dataConsulta.dia<=res.object.edadMax){
            this.listaDeCIESIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
          }
          else{
            this.messageService.add({severity:'error', summary: 'CUIDADO', detail:'No hay diagnosticos disponibles para la edad del paciente en esta Prestación.'});
          }
        }
        else{
          this.messageService.add({severity:'error', summary: 'CUIDADO', detail:'No hay diagnosticos disponibles para la edad del paciente en esta Prestación.'});
        }
      }

    })
  }

  selectDxSIS(event) {
    console.log(this.formDiagnostico.value.buscarDxSIS);
    console.log(event);
    this.formDiagnostico.patchValue({ diagnosticoSIS: event.value.diagnostico});
    this.formDiagnostico.patchValue({ buscarDxSIS: "" });
    this.formDiagnostico.patchValue({ cie10SIS: event.value},{emitEvent:false});
    // this.formDiagnostico.patchValue({ cie10SIS: this.formDiagnostico.value.buscarDxSIS.cie10});

  }

  selectedDxHIS(event: any) {
    console.log('lista de cie ', this.listaDeCIEHIS);
    console.log('evento desde diagnos ', event);
    console.log('evento desde diagnos ', this.formDiagnostico.value.buscarDxHIS);
    this.formDiagnostico.patchValue({ diagnosticoHIS: event.descripcionItem});
    this.formDiagnostico.patchValue({ buscarDxHIS: ""})
    this.formDiagnostico.patchValue({ cie10HIS: event});

  }

  filterCIE10(event: any) {
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object
      console.log('CIEHIS',this.listaDeCIEHIS)
    })
  }

  /*ELIMINAR DATOS DE LAS TABLAS*/
  eliminarDiagnostico(rowData:any,rowIndex: any) {
    console.log("entrando a editar diagnosticos",rowIndex);
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.diagnosticos.splice(rowIndex, 1)
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }


  /***funciones para guardar datos****/
  getDatatoSaveDx(){
    console.log(this.formDiagnostico.value.nombreUPS)
    console.log(this.formDiagnostico.value.cie10SIS)
    let aux = {
      diagnosticoHIS:this.formDiagnostico.value.diagnosticoHIS,
      cie10HIS:this.formDiagnostico.value.cie10HIS.codigoItem,
      diagnosticoSIS:this.formDiagnostico.value.diagnosticoSIS,
      cie10SIS:this.formDiagnostico.getRawValue().cie10SIS.cie10,
      tipo:this.formDiagnostico.value.tipoDiagnostico,
      codPrestacion:this.formDiagnostico.getRawValue().prestacion.codigo,
      nombreUPS: this.formDiagnostico.value.nombreUPS,
      factorCondicional: this.formDiagnostico.value.factorCondicional,
      nombreUPSaux:this.formDiagnostico.getRawValue().nombreUPSaux.nombre,
      lab:this.formDiagnostico.value.lab,
      patologiaMaterna:null
    }
    var duplicado :boolean = this.diagnosticos.some(element=>element.diagnosticoHIS==aux.diagnosticoHIS)
    console.log(duplicado)
    this.diagnosticoDialog = false;
    if(!duplicado){
      this.diagnosticos.push(aux);
    }
    else{
      this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'Ya ingreso este diagnóstico, vuelva a intentar.'});
    }

  }

  getDatatoEditDx() {
    this.isUpdate = false;
    this.checked=false;
    console.log(this.formDiagnostico.value.nombreUPS)
    console.log(this.formDiagnostico.value.cie10SIS)
    console.log(this.itemEdit);
    this.diagnosticos.splice(this.itemEdit, 1)
    let aux = {
      diagnosticoHIS: this.formDiagnostico.value.diagnosticoHIS,
      cie10HIS: this.formDiagnostico.value.cie10HIS.codigoItem,
      diagnosticoSIS: this.formDiagnostico.value.diagnosticoSIS,
      cie10SIS: this.formDiagnostico.getRawValue().cie10SIS.cie10,
      tipo: this.formDiagnostico.value.tipoDiagnostico,
      codPrestacion: this.formDiagnostico.getRawValue().prestacion.codigo,
      nombreUPS: this.formDiagnostico.getRawValue().nombreUPS,
      factorCondicional: this.formDiagnostico.value.factorCondicional,
      nombreUPSaux: this.formDiagnostico.value.nombreUPSaux.nombre,
      lab: this.formDiagnostico.value.lab,
      patologiaMaterna: null
    }
    this.diagnosticos.push(aux);
    this.diagnosticoDialog=false;
  }

  editarDx(rowData,rowindex) {
    this.isUpdate = true;
    this.itemEdit=rowindex;
    this.formDiagnostico.reset();
    this.diagnosticoDialog = true;
    console.log(this.listaUpsHis);
    console.log(this.listaUpsAuxHis);
    this.formDiagnostico.get('prestacion').setValue(this.ListaPrestacion.find(element => element.codigo == rowData.codPrestacion));
    this.formDiagnostico.get('tipoDiagnostico').setValue(rowData.tipo);
    this.formDiagnostico.get('nombreUPS').setValue(rowData.nombreUPS);
    this.formDiagnostico.get('nombreUPSaux').setValue(this.listaUpsAuxHis.find(element=>element.nombre == rowData.nombreUPSaux));
    this.formDiagnostico.get('diagnosticoSIS').setValue(rowData.diagnosticoSIS);
    this.formDiagnostico.get('diagnosticoHIS').setValue(rowData.diagnosticoHIS);
    this.formDiagnostico.get('lab').setValue(rowData.lab);
    this.formDiagnostico.get('factorCondicional').setValue(rowData.factorCondicional);
    this.PrestacionService.getDiagnosticoPorCodigo(rowData.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.diagnostico;
      console.log(this.listaDeCIESIS)
      this.formDiagnostico.patchValue({ cie10SIS: this.listaDeCIESIS.find(elemento => elemento.cie10 == rowData.cie10SIS) });
    })
    this.cieService.getCIEByDescripcion(rowData.cie10HIS).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object;
      this.formDiagnostico.patchValue({ cie10HIS: this.listaDeCIEHIS.find(elemento => elemento.codigoItem == rowData.cie10HIS) });
    })
    this.formDiagnostico.get('nro').setValue(rowData.nro);
    // this.diagnosticoDialog = true;
    console.log("modificando", rowData);
    // this.diagnosticoDialog=false;
  }
  SaveDiagnostico() {
    let data = {
      id:this.dataConsulta.idConsulta,
      diagnosticos:this.diagnosticos
    }
    if(!this.hayDatos){
      this.DiagnosticoService.updateConsultaDatosGenerales(data).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: 'success',
              title: 'DIAGNOSTICOS...',
              text: 'Guardado correctamente',
              showConfirmButton: false,
              timer: 1000
            })
          },error => {
            Swal.fire({
              icon: 'error',
              title: 'DIAGNOSTICOS...',
              text: 'Hubo un error, vuelva a intentarlo',
              showConfirmButton: false,
              timer: 1000
            })
          })
    }
    else{
      this.DiagnosticoService.updateConsultaDatosGenerales(data).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: 'success',
              title: 'DIAGNOSTICOS...',
              text: 'Actualizado correctamente',
              showConfirmButton: false,
              timer: 1000
            })
          },error => {
            Swal.fire({
              icon: 'error',
              title: 'DIAGNOSTICOS...',
              text: 'Hubo un error, vuelva a intentarlo',
              showConfirmButton: false,
              timer: 1000
            })
          })
    }
  }
  selectedOption(event: any) {
    this.formDiagnostico.patchValue({ diagnosticoSIS: event.value.diagnostico });
  }
}

interface diagnosticoInterface {
  nro?:number,
  diagnosticoHIS?:string,
  cie10HIS?:string,
  diagnosticoSIS?:string,
  cie10SIS?:string,
  tipo?:string,
  codPrestacion?:string,
  nombreUPS?:string,
  factorCondicional?:string,
  nombreUPSaux?:string,
  lab?:string
}

interface resultados{
  nombre?:string,
  evaluacion?:string,
  resultado?:string,
  estado?:boolean
}
interface lista{
  label?:string,
  value?:string,

}