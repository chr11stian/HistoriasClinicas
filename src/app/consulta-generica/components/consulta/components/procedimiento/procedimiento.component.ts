import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../cred/citas/models/data";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CieService} from "../../../../../obstetricia-general/services/cie.service";
import {UpsAuxIpressService} from "../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";
import {DiagnosticosService} from "../../../../services/diagnosticos/diagnosticos.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import {DatosGeneralesService} from "../../../../services/datos-generales/datos-generales.service";

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {
  selectedProducts: resultados[];
  tablaResumenDx:resultados[]=[];
  attributeLocalS = 'documento';
  dataConsulta:dato;
  id: string = "";
  itemEdit:number=-1;
  isUpdate:boolean=false;

  loading: boolean = true;
  idIpress:string="";

  formProcedimiento:FormGroup;
  procedimientoDialog:boolean;
  procedimientos:procedimiento[]=[];

  contador:number = 0;
  hayDatos:boolean=false;
  checked: boolean=false;

  ListaPrestacion:any[]=[];
  listaDeCIEHIS: any[]=[];
  listaDeCIESIS: any[]=[];
  listaDeProcedimientos:any[]=[];
  listaUpsHis:any[]=[];
  listaUpsAuxHis:any[]=[];
  listaDiagnosticos:any[]=[];
  tipoList: any[]=[];
  constructor(private PrestacionService: PrestacionService,
              private ConsultaService:DatosGeneralesService,
              private formBuilder: FormBuilder,
              private cieService: CieService,
              private UpsAuxService:UpsAuxIpressService,
              private messageService: MessageService,
              private procedimientosServices:DiagnosticosService) {
    this.buildForm();
    this.dataConsulta = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
      { label: 'PRESUNTIVO', value: 'P' },
      { label: 'REPETITIVO', value: 'R' },
    ];
  }

  ngOnInit(): void {
    this.recuperarUpsHis();
    this.recuperarUpsAuxHis();
    this.recuperarPrestaciones();
    this.recuperarProcedimientosBD();
    this.listarDiagnosticos();
  }
  buildForm() {
    this.formProcedimiento = this.formBuilder.group({
      nro:new FormControl(''),
      buscarPDxSIS:  [''],
      buscarPDxHIS:  [''],
      diagnostico: new FormControl("", [Validators.required]),
      prestacion: new FormControl("", [Validators.required]),
      procedimientoSIS:  new FormControl("", [Validators.required]),
      procedimientoHIS: new FormControl("", [Validators.required]),
      codProcedimientoSIS: new FormControl("", [Validators.required]),
      codProcedimientoHIS: new FormControl("", [Validators.required]),
      codPrestacion: new FormControl("", [Validators.required]),
      nombreUPS: new FormControl("", [Validators.required]),
      nombreUPSaux:new FormControl("", [Validators.required]),
      lab:  new FormControl("", [Validators.required]),
      tipoDiagnostico:  new FormControl("", [Validators.required]),
      cie10SIS:new FormControl("", [Validators.required]),
      resultadoFUA:new FormControl("", [Validators.required]),
    });
  }
  /** Servicios para recuperar lista de ups Aux por ipress***/
  recuperarUpsHis() {
    let data = {
      idIpress: this.idIpress,
      edad: this.dataConsulta.anio,
      sexo: this.dataConsulta.sexo
    }
    this.procedimientosServices.listaUpsHis(data).then((res: any) => this.listaUpsHis = res.object);
  }
  /** Servicios para recuperar lista de ups Aux por ipress***/
  recuperarUpsAuxHis() {
    this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe((r: any) => {
      if(r.object!=null){
        this.listaUpsAuxHis=r.object.filter(element => element.estado == true);
      }
    })
  }

  recuperarProcedimientosBD(){
    console.log("recuperar bd pro:")
    this.ConsultaService.searchConsultaDatosGenerales(this.dataConsulta.idConsulta).subscribe((res: any) => {
          if(res.object!=null){
            console.log("procedimientos",res.object);
            this.hayDatos=true;
            this.procedimientos = res.object.procedimientos;
          }
          else{
            this.procedimientos=[];
            Swal.fire({
              icon: 'info',
              title: 'INFORMACION',
              text: 'Aún no hay registros guardados en Procedimientos',
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

  /********lista dx********/
  listarDiagnosticos(){
    this.procedimientosServices.getDiagnostico(this.dataConsulta.idConsulta).subscribe((data:any)=>{
      if(data.object!=undefined || data.object!=null){
        console.log(data.object);
        this.listaDiagnosticos =data.object;
      }
      else{
        Swal.fire({
          icon: 'info',
          title: 'DIAGNOSTICOS',
          text: 'No tiene Diagnosticos registrados!',
        })
      }
    })
  }

  /*** Servicio para recuperar Prestaciones ***/
  recuperarPrestaciones() {
    this.PrestacionService.getPrestacion().subscribe((res: any) => {
      this.ListaPrestacion = res.object;
      console.log("prestaciones:", this.ListaPrestacion);
    })
  }

  /**funciones para procedimientos***/
  openProcedimiento() {
    this.formProcedimiento.reset();
    this.checked = false;
    this.isUpdate=false;
    this.formProcedimiento.get('prestacion').enable();
    this.formProcedimiento.get('nombreUPS').setValue("ENFERMERIA");
    this.listaDeCIESIS=[];
    this.formProcedimiento.get('procedimientoSIS').setValue("");
    this.formProcedimiento.get('codProcedimientoSIS').setValue("");

    this.procedimientoDialog = true;
  }

  filterCIE10(event: any) {
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object
    })
  }

  selectedDxHIS(event: any) {
    console.log('lista de cie ', this.listaDeCIEHIS);
    console.log('evento desde diagnos ', event);
    this.formProcedimiento.patchValue({ procedimientoHIS: event.descripcionItem});
    this.formProcedimiento.patchValue({ buscarPDxHIS: ""})
    this.formProcedimiento.patchValue({ codProcedimientoHIS: event});
    //
  }

  cancelProcedimiento() {
    this.procedimientoDialog = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
  }

  getDatatoSavePx() {
    console.log(this.formProcedimiento.value.codProcedimientoHIS)
    let aux = {
      procedimientoSIS:this.formProcedimiento.getRawValue().procedimientoSIS,
      procedimientoHIS:this.formProcedimiento.getRawValue().procedimientoHIS,
      codProcedimientoSIS:this.formProcedimiento.getRawValue().codProcedimientoSIS.codigo,
      codProcedimientoHIS:this.formProcedimiento.getRawValue().codProcedimientoHIS.codigoItem,
      codPrestacion:this.formProcedimiento.getRawValue().prestacion.codigo,
      cie10SIS:this.formProcedimiento.getRawValue().diagnostico.cie10SIS,
      nombreUPS:this.formProcedimiento.getRawValue().nombreUPS,
      nombreUPSaux:this.formProcedimiento.getRawValue().nombreUPSaux.nombre,
      lab:this.formProcedimiento.getRawValue().lab,
      tipo:this.formProcedimiento.value.tipoDiagnostico,
      resultadoFua:this.formProcedimiento.value.resultadoFUA

    }
    console.log("aux",aux)

    var duplicado:boolean;
    duplicado=this.procedimientos.some(element=>element.procedimientoHIS==aux.procedimientoHIS);
    console.log(duplicado)
    this.procedimientoDialog = false;
    if(!duplicado){
      this.procedimientos.push(aux);
      if(this.selectedProducts) {
        this.tablaResumenDx = this.tablaResumenDx.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        console.log(this.tablaResumenDx);

        if (this.tablaResumenDx.length == 0) {
          console.log(this.tablaResumenDx);
          this.messageService.add({
            severity: 'success',
            summary: 'Exito!',
            detail: 'No hay Procedimientos pendientes'
          });
        } else {
          console.log(this.tablaResumenDx);
          this.messageService.add({
            severity: 'warn',
            summary: 'Cuidado!',
            detail: 'Aún tiene evaluaciones realizadas sin ingresar a procedimientos'
          });
        }
      }
    }
    else{
      this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'Ya ingreso este procedimiento, vuelva a intentar.'});
    }

  }

  getDatatoEditPx() {
    this.isUpdate = false;
    console.log(this.formProcedimiento.value.nombreUPS)
    console.log(this.formProcedimiento.value.cie10SIS)
    console.log(this.itemEdit);
    this.procedimientos.splice(this.itemEdit, 1)
    let aux = {
      procedimientoSIS:this.formProcedimiento.getRawValue().procedimientoSIS,
      procedimientoHIS:this.formProcedimiento.getRawValue().procedimientoHIS,
      codProcedimientoSIS:this.formProcedimiento.getRawValue().codProcedimientoSIS.codigo,
      codProcedimientoHIS:this.formProcedimiento.getRawValue().codProcedimientoHIS.codigoItem,
      codPrestacion:this.formProcedimiento.getRawValue().prestacion.codigo,
      cie10SIS:this.formProcedimiento.getRawValue().diagnostico.cie10SIS,
      nombreUPS:this.formProcedimiento.getRawValue().nombreUPS,
      nombreUPSaux:this.formProcedimiento.getRawValue().nombreUPSaux.nombre,
      lab:this.formProcedimiento.getRawValue().lab,
      tipo:this.formProcedimiento.getRawValue().tipoDiagnostico,
      resultadoFua:this.formProcedimiento.value.resultadoFUA
    }
    this.procedimientos.push(aux);
    this.procedimientoDialog=false;
  }
  editarDx(rowData,rowindex) {
    this.isUpdate = true;
    this.checked=false;
    this.itemEdit=rowindex;
    this.formProcedimiento.reset();
    console.log(rowData);
    console.log("lista ups aux",this.listaUpsAuxHis);
    console.log("lista ups",this.listaUpsHis);
    this.formProcedimiento.get('prestacion').setValue(this.ListaPrestacion.find(element => element.codigo == rowData.codPrestacion));
    this.formProcedimiento.get('tipoDiagnostico').setValue(rowData.tipo);
    this.formProcedimiento.get('nombreUPS').setValue(rowData.nombreUPS);
    this.formProcedimiento.get('nombreUPSaux').setValue(this.listaUpsAuxHis.find(element=>element.nombre == rowData.nombreUPSaux));
    this.formProcedimiento.get('procedimientoSIS').setValue(rowData.procedimientoSIS);
    this.formProcedimiento.get('procedimientoHIS').setValue(rowData.procedimientoHIS);
    this.formProcedimiento.get('lab').setValue(rowData.lab);
    this.formProcedimiento.get('resultadoFUA').setValue(rowData.resultadoFua);
    this.formProcedimiento.get('diagnostico').setValue(this.listaDiagnosticos.find(element=>element.cie10SIS==rowData.cie10SIS));
    this.PrestacionService.getProcedimientoPorCodigo(this.formProcedimiento.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      console.log('LISTA DE PROCEDIMIENTOS',this.listaDeCIESIS);
      // this.formProcedimiento.patchValue({prestacion:res.object.descripcion});
      this.formProcedimiento.patchValue({codProcedimientoSIS:this.listaDeCIESIS.find(elemento => elemento.codigo == rowData.codProcedimientoSIS)});
      // this.formProcedimiento.patchValue({ cie10SIS: this.listaDeCIESIS.find(elemento => elemento.codigo == rowData.codProcedimientoSIS) });
      // this.formProcedimiento.patchValue({ buscarPDxSIS: "" });

    })
    this.cieService.getCIEByDescripcion(rowData.codProcedimientoHIS).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object;
      this.formProcedimiento.patchValue({ codProcedimientoHIS: this.listaDeCIEHIS.find(elemento => elemento.codigoItem == rowData.codProcedimientoHIS) });
      // this.formProcedimiento.get("codProcedimientoHIS").setValue(rowData.codProcedimientoHIS);

    })
    console.log('lista de diagnosticos',this.listaDiagnosticos);
    this.formProcedimiento.get('nro').setValue(rowData.nro);
    this.formProcedimiento.get('prestacion').disable();
    // this.formProcedimiento.get('buscarPDxSIS').disable();
    // this.formProcedimiento.get('codProcedimientoSIS').disable();
    this.procedimientoDialog = true;
    console.log("modificando", rowData);
  }

  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formProcedimiento.value.diagnostico.codPrestacion).subscribe((res: any) => {
      console.log(res.object);
      this.listaDeCIESIS = res.object.procedimientos;
      this.formProcedimiento.patchValue({ prestacion: res.object});
      this.formProcedimiento.patchValue({ diagnosticoSIS: "" });
      this.formProcedimiento.patchValue({ cie10SIS: "" });
    })
  }

  onChangePrestacion() {
    let codigoPrestacion:any;
    codigoPrestacion=this.formProcedimiento.value.prestacion.codigo;
    this.formProcedimiento.patchValue({ procedimientoSIS: ""})
    this.formProcedimiento.patchValue({ codigoSIS: ""})
    this.PrestacionService.getDiagnosticoPorCodigo(codigoPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;

      console.log(res.object);
      if(res.object.denominacion=='ANIOS')
      {
        if(this.dataConsulta.anio>=res.object.edadMin && this.dataConsulta.anio<=res.object.edadMax){
          this.listaDeCIESIS = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }
      }
      if(res.object.denominacion=='MESES')
      {
        let meses = this.dataConsulta.anio*12 + this.dataConsulta.mes + this.dataConsulta.dia/30;
        if(meses>=res.object.edadMin && meses <=res.object.edadMax){
          this.listaDeCIESIS = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }

      }
      if(res.object.denominacion=='DIAS')
      {
        if(this.dataConsulta.anio==0 && this.dataConsulta.mes==0){
          if(this.dataConsulta.dia>=res.object.edadMin && this.dataConsulta.dia<=res.object.edadMax){
            this.listaDeCIESIS = res.object.procedimientos;
          }
          else{
            this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
          }
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }
      }

    })
  }

  selectDxSIS(event) {
    console.log(this.formProcedimiento.value.buscarPDxSIS);
    this.formProcedimiento.patchValue({ procedimientoSIS: event.value.procedimiento})
    this.formProcedimiento.patchValue({ codProcedimientoSIS: event.value},{emitEvent:false});
    this.formProcedimiento.patchValue({ buscarPDxSIS: ""})
  }

  saveProcedimiento(){
    let data = {
      id:this.dataConsulta.idConsulta,
      procedimientos:this.procedimientos
    }
    this.procedimientosServices.updateConsultaDatosGenerales(data).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: 'success',
              title: 'PROCEDIMIENTOS...',
              text: 'Guardado correctamente',
              showConfirmButton: false,
              timer: 1000
            })
          },error => {
            Swal.fire({
              icon: 'error',
              title: 'PROCEDIMIENTOS...',
              text: 'Hubo un error, vuelva a intentarlo',
              showConfirmButton: false,
              timer: 1000
            })
          })
  }


  elimininarProcedimiento(rowIndex: any) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.procedimientos.splice(rowIndex, 1)
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

  selectedOption(event: any) {
    this.formProcedimiento.patchValue({ procedimientoSIS: event.value.procedimiento });

  }
}
interface resultados{
  nombre?:string,
  evaluacion?:string,
  resultado?:string
}
interface procedimiento {
  procedimientoHIS?: string,
  codProcedimientoHIS?: string,
  codProcedimientoSIS?: string,
  procedimientoSIS?: string,
  cie10SIS?: string,
  codPrestacion?: string
  resultadoFua?: string,
  lab?: string
}
