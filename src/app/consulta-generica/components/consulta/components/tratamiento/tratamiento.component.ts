import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {dato} from "../../../../../cred/citas/models/data";
import {TratamientoConsultaService} from "../../../../../cred/citas/atencion-cred/consulta-principal/services/tratamiento-consulta.service";
import {DiagnosticoConsultaService} from "../../../../../cred/citas/atencion-cred/consulta-principal/services/diagnostico-consulta.service";
import {IpressFarmaciaService} from "../../../../../modulos/ipress-farmacia/services/ipress-farmacia.service";
import {MedicamentosService} from "../../../../../mantenimientos/services/medicamentos/medicamentos.service";
import {IpressService} from "../../../../../core/services/ipress/ipress.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
  tratamientos: tratamiento[] = [];
  dialogTratamiento:boolean=false;
  formTratamiento:FormGroup;
  formIndicaciones:FormGroup;

  renipress: "";
  idIpress:string="";
  attributeLocalS = 'documento'
  data:dato;

  estadoEditar:boolean=false;
  estadoEditar2:boolean=false;

  idConsulta:string=null
  intervaloList: any[];
  medicamentosConDatos: any[]=[];
  listaMedicamentos:any;
  viaadministracionList:viaAdministracion[]=[];
  listaDiagnosticos:any[]=[];
  listaPrestaciones:any[]=[];

  hayDatos:boolean=false;
  tratamientoEditar:any;
  aux:any[]=[];
  dialogIndicaciones: boolean=false;
  dialogObservaciones: boolean=false;
  constructor(private tratamientoService: TratamientoConsultaService,
              private DiagnosticoService: DiagnosticoConsultaService,
              private farmaciaService: IpressFarmaciaService,
              private medicamentosService:MedicamentosService,
              private ipressServices: IpressService,
              private PrestacionService:PrestacionService,
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
    this.idConsulta = JSON.parse(localStorage.getItem('documento')).idConsulta;
    // this.estadoEditar2 = JSON.parse(localStorage.getItem('idConsultaGeneral')).estadoEditar;
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;

    this.listarTratamientos();
    this.buscarCodigoIpress();
    this.listarDiagnosticos();
  }
  buildForm() {
    this.formTratamiento = this.formBuilder.group({
      codPrestacion:new FormControl({value:'',disabled:false}),
      prestacion:new FormControl({value:'',disabled:false}),
      medicamento: new FormControl(''),
      id: new FormControl(''),
      codigoCIE: new FormControl({value:'',disabled:false}),
      codigo: new FormControl({value:'',disabled:false}),
      nombre: new FormControl({value:'',disabled:false}),
      nombreComercial: new FormControl({value:'',disabled:false}),
      ff: new FormControl({value:'',disabled:false}),
      stock:new FormControl({value:'',disabled:true}),
      concentracion: new FormControl({value:'',disabled:false}),
      viaAdministracion: new FormControl({value:'',disabled:false}),
      fechaVenc: new FormControl({value:'',disabled:false}),
      cantidad:new FormControl({value:'',disabled:false}),
      dosis:new FormControl({value:'',disabled:false}),
      intervalo:new FormControl({value:'',disabled:false}),
      duracion:new FormControl({value:'',disabled:false}),
      observaciones:new FormControl({value:'',disabled:false}),
      efectosMedicamento:new FormControl({value:'',disabled:false}),
      instrucciones:new FormControl({value:'',disabled:false}),
      advertencias:new FormControl({value:'',disabled:false}),
      otrasIndicaciones:new FormControl({value:'',disabled:false}),
      cie10SIS:new FormControl({value:'',disabled:false}),

    }),
        this.formIndicaciones = this.formBuilder.group({
          observaciones:new FormControl({value:'',disabled:true}),
          efectosMedicamento:new FormControl({value:'',disabled:true}),
          instrucciones:new FormControl({value:'',disabled:true}),
          advertencias:new FormControl({value:'',disabled:true}),
          otrasIndicaciones:new FormControl({value:'',disabled:true}),


        })

  }
  buscarCodigoIpress(){
    console.log('codigo renipress'+ this.renipress);//// ejecuta
    console.log('id Ipress:'+this.idIpress);
    this.ipressServices.getIpressID(this.idIpress).subscribe((res: any) => {
      this.renipress = res.object.renipress;
      console.log('codigo renipress'+ this.renipress);
      this.listarMedicamentosFarmacia();
    })
  }

  /*** funciones Procedimientos****/


  listarMedicamentosFarmacia(){
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renipress).subscribe((data:any)=>{
      if(data!=undefined){
        // console.log(data.object);
        this.listaMedicamentos=(data.object);
        let cadena
        for(let i= 0;i<this.listaMedicamentos.length;i++){
          cadena = {
            medicamento:{
              id:this.listaMedicamentos[i].medicamento.id,
              codigo:this.listaMedicamentos[i].medicamento.codigo,
              nombre:this.listaMedicamentos[i].medicamento.nombre,
              ff:this.listaMedicamentos[i].medicamento.ff,
              concentracion:this.listaMedicamentos[i].medicamento.concentracion,
              viaAdministracion:this.listaMedicamentos[i].medicamento.viaAdministracion,
              nombreComercial: this.listaMedicamentos[i].medicamento.nombreComercial
            },
            lote:this.listaMedicamentos[i].lote,
            fechaVenc:this.listaMedicamentos[i].fechaVenc,
            viaAdministracion:this.listaMedicamentos[i].viaAdministracion,
            stock:this.listaMedicamentos[i].stock,
            stringMedicamento:this.listaMedicamentos[i].medicamento.nombre + " " + this.listaMedicamentos[i].medicamento.ff +" "+  this.listaMedicamentos[i].medicamento.concentracion +" "+  this.listaMedicamentos[i].medicamento.viaAdministracion + " Fecha Venc. " +this.listaMedicamentos[i].fechaVenc+" stock: " +this.listaMedicamentos[i].stock
          }
          this.medicamentosConDatos.push(cadena);
          // console.log(this.medicamentosConDatos);
        }
      }
    })
  }

  listarDiagnosticos(){
    this.DiagnosticoService.getDiagnostico(this.idConsulta).subscribe((data:any)=>{
      if(data.object!=undefined || data.object!=null){
        console.log(data.object);
        this.listaDiagnosticos=data.object;
        // for(let i =0;i<data.object.length;i++){
        //   this.listaDiagnosticos.push(data.object[i].cie10SIS)
        // }
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

  private filterItems(event: any) {
    let filtered : any[] = [];
    let query = event.query;
    console.log(this.medicamentosConDatos);
    this.aux = this.medicamentosConDatos;
    for(let i = 0; i < this.aux.length; i++) {
      let item = this.aux[i];
      if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.aux = filtered;
    if(this.aux===[]){
      console.log('no encontrado');
      this.formTratamiento.patchValue({ medicamento: ""});
      this.aux = this.medicamentosConDatos;

    }

  }

  selectedMedicamento(event: any) {
    // console.log('lista de medicamentos ', this.medicamentosConDatos);
    // console.log(event);
    this.tratamientoEditar = event;
    this.formTratamiento.patchValue({ medicamento: ""});
    this.formTratamiento.patchValue({ nombre: event.medicamento.nombre });
    this.formTratamiento.patchValue({ codigo: event.medicamento.codigo });
    this.formTratamiento.patchValue({ concentracion: event.medicamento.concentracion });
    this.formTratamiento.patchValue({ viaAdministracion: event.medicamento.viaAdministracion });
    this.formTratamiento.patchValue({ ff: event.medicamento.ff });
    this.formTratamiento.patchValue({id:event.medicamento.id});
    this.formTratamiento.patchValue({nombreComercial:event.medicamento.nombreComercial});
    let date: Date = new Date(event.fechaVenc);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    console.log(date)
    this.formTratamiento.patchValue({fechaVenc:date});
    this.formTratamiento.patchValue({lote:event.lote});
    this.formTratamiento.patchValue({stock:event.stock});

  }

  listarTratamientos(){
    this.tratamientoService.getTratamiento(this.idConsulta).subscribe((data:any)=>{
      if(data!=undefined || data!=null){
        this.hayDatos=true;
        // console.log(data.object);
        this.tratamientos=(data.object);
      }
      else{
        this.tratamientos=[];
      }
    })
  }

  /*****************Imprimir Receta**************/
  imprimirReceta(){
    console.log("imprimiendo receta");
    this.tratamientoService.evento = false;
    this.tratamientoService.printReceta(this.idConsulta).subscribe((data:any)=>{
    })
  }

  openTratamiento() {
    this.formTratamiento.reset();
    this.buildForm();
    this.dialogTratamiento=true;
    this.estadoEditar=false;
  }

  closeDialogGuardar() {
    let cadena = {
      medicamento:{
        id:this.formTratamiento.value.id,
        codigo:this.formTratamiento.value.codigo,
        nombre:this.formTratamiento.value.nombre,
        ff:this.formTratamiento.value.ff,
        concentracion:this.formTratamiento.value.concentracion,
        viaAdministracion:this.formTratamiento.value.viaAdministracion,
        nombreComercial:this.formTratamiento.value.nombreComercial
      },
      codPrestacion:this.formTratamiento.value.codPrestacion,
      cie10SIS: this.formTratamiento.value.cie10SIS.cie10SIS,
      cantidad:this.formTratamiento.value.cantidad,
      dosis:this.formTratamiento.value.dosis,
      intervalo:this.formTratamiento.value.intervalo,
      duracion:this.formTratamiento.value.duracion,
      fechaVenc: this.formTratamiento.value.fechaVenc,
      observaciones:this.formTratamiento.value.observaciones,
      indicaciones:{
        efectosMedicamento:this.formTratamiento.value.efectosMedicamento,
        instrucciones:this.formTratamiento.value.instrucciones,
        advertencias:this.formTratamiento.value.advertencias,
        otrasIndicaciones:this.formTratamiento.value.otrasIndicaciones,
      }
    }
    console.log(this.tratamientos);
    var duplicado:boolean=this.tratamientos.some(element=>element.medicamento.id===cadena.medicamento.id)
    // var duplicado:boolean=this.tratamientos.includes(cadena)
    console.log(duplicado);
    console.log("cadena" , cadena)
    if(!duplicado){
      this.tratamientos.push(cadena)
      if(!this.hayDatos){
        this.tratamientoService.addTratamiento(this.idConsulta,this.tratamientos).subscribe((data:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Tratamientos',
            text: 'Se guardo un medicamento!',
          })
        },error => {
          Swal.fire({
            icon: 'error',
            title: 'Tratamientos',
            text: 'Ocurrio un error al ingresar, vuelva a intentarlo!',
          })
        })
      }
      else{
        this.tratamientoService.updateTratamiento(this.idConsulta,this.tratamientos).subscribe((data:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Tratamientos',
            text: 'Se guardo un medicamento!',
          })
        },error => {
          Swal.fire({
            icon: 'error',
            title: 'Tratamientos',
            text: 'Ocurrio un error al ingresar, vuelva a intentarlo!',
          })
        })
      }


    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Tratamientos',
        text: 'Ya ingreso este medicamento!',
      })
    }
    this.dialogTratamiento=false;
  }

  closeEditar() {
    console.log(this.tratamientoEditar);
    let cadena = {
      medicamento:{
        id:this.tratamientoEditar.medicamento.id,
        codigo:this.formTratamiento.value.codigo,
        nombre:this.formTratamiento.value.nombre,
        ff:this.formTratamiento.value.ff,
        concentracion:this.formTratamiento.value.concentracion,
        viaAdministracion:this.formTratamiento.value.viaAdministracion,
        nombreComercial:this.formTratamiento.value.nombreComercial,
      },
      cantidad:this.formTratamiento.value.cantidad,
      dosis:this.formTratamiento.value.dosis,
      intervalo:this.formTratamiento.value.intervalo,
      duracion:this.formTratamiento.value.duracion,
      fechaVenc: this.formTratamiento.value.fechaVenc,
      observaciones:this.formTratamiento.value.observaciones,
      indicaciones:{
        efectosMedicamento:this.formTratamiento.value.efectosMedicamento,
        instrucciones:this.formTratamiento.value.instrucciones,
        advertencias:this.formTratamiento.value.advertencias,
        otrasIndicaciones:this.formTratamiento.value.otrasIndicaciones,
      },
      cie10SIS: this.formTratamiento.value.codigoCIE,
      codPrestacion: this.formTratamiento.value.codPrestacion
    }
    var AuxItem = this.tratamientos.filter(element=>element!=this.tratamientoEditar);
    // console.log(AuxItem);
    this.tratamientos=AuxItem;
    // console.log("cadena" , cadena)
    this.tratamientos.push(cadena);
    this.tratamientoService.updateTratamiento(this.idConsulta,this.tratamientos).subscribe((data:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Tratamientos',
        text: 'Se edito un medicamento!',
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Tratamientos',
        text: 'Ocurrio un error al editar, vuelva a intentarlo!',
      })
    })
    this.dialogTratamiento=false;
  }

  editarTratamiento(rowData: any, rowIndex: any) {
    this.formTratamiento.reset();
    // console.log(rowData);
    this.estadoEditar=true;
    this.buildForm();
    this.dialogTratamiento=true;
    this.formTratamiento.get("nombre").setValue(rowData.medicamento.nombre);
    this.formTratamiento.get("nombreComercial").setValue(rowData.medicamento.nombreComercial);
    this.formTratamiento.get("codigo").setValue(rowData.medicamento.codigo);
    this.formTratamiento.get("concentracion").setValue(rowData.medicamento.concentracion);
    this.formTratamiento.get("viaAdministracion").setValue(rowData.medicamento.viaAdministracion);
    this.formTratamiento.get("ff").setValue(rowData.medicamento.ff);
    this.formTratamiento.get("stock").setValue(rowData.stock);
    this.formTratamiento.get("dosis").setValue(rowData.dosis);
    this.formTratamiento.get("intervalo").setValue(rowData.intervalo);
    this.formTratamiento.get("duracion").setValue(rowData.duracion);
    this.formTratamiento.get("cantidad").setValue(rowData.cantidad);
    this.formTratamiento.get("codigoCIE").setValue(rowData.cie10SIS);
    this.formTratamiento.get("codPrestacion").setValue(rowData.codPrestacion);
    this.formTratamiento.get("prestacion").setValue(rowData.prestacion);
    this.formTratamiento.get("observaciones").setValue(rowData.observaciones);
    this.formTratamiento.get("efectosMedicamento").setValue(rowData.indicaciones.efectosMedicamento);
    this.formTratamiento.get("advertencias").setValue(rowData.indicaciones.advertencias);
    this.formTratamiento.get("instrucciones").setValue(rowData.indicaciones.instrucciones);
    this.formTratamiento.get("otrasIndicaciones").setValue(rowData.indicaciones.otrasIndicaciones);
    let date: Date = new Date(rowData.fechaVenc);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    // console.log(date)
    this.formTratamiento.get("fechaVenc").setValue(date);
    this.tratamientoEditar=rowData;
  }

  eliminarTratamiento(rowIndex: any) {
    // console.log("entrando a editar medicamentos",rowIndex,rowIndex);
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientos.splice(rowIndex, 1)
        this.tratamientoService.updateTratamiento(this.idConsulta,this.tratamientos).subscribe((data:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    })
  }

  canceled() {
    this.dialogTratamiento = false;
    this.formTratamiento.reset();
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })

  }

  verIndicaciones(indicaciones: any) {
    this.dialogIndicaciones=true;
    this.formIndicaciones.get("efectosMedicamento").setValue(indicaciones.efectosMedicamento);
    this.formIndicaciones.get("advertencias").setValue(indicaciones.advertencias);
    this.formIndicaciones.get("instrucciones").setValue(indicaciones.instrucciones);
    this.formIndicaciones.get("otrasIndicaciones").setValue(indicaciones.otrasIndicaciones);
  }

  verObservaciones(observaciones: any) {
    this.dialogObservaciones=true;
    this.formIndicaciones.get("observaciones").setValue(observaciones);

  }

  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formTratamiento.value.cie10SIS.codPrestacion).subscribe((res: any) => {
      // console.log(res.object);
      this.listaPrestaciones = res.object;
      this.formTratamiento.patchValue({ prestacion: res.object.descripcion});
      this.formTratamiento.patchValue({ codPrestacion: res.object.codigo});
      this.formTratamiento.patchValue({ medicamento: "" });
    })
  }
}
interface viaAdministracion{
  label?:string,
  value?:string,
}
interface tratamiento{
  medicamento?:medicamento,
  cantidad?:string,
  dosis?:string,
  intervalo?:string,
  duracion?:string,
  fechaVenc?:string,
  observaciones?:string,
  cie10SIS?:string,
  codPrestacion?:string,

}
interface medicamento{
  id?:string,
  codigo?:string,
  nombre?:string,
  ff?:string,
  concentracion?:string,
  viaAdministracion?:string,
  nombreComercial?:string,
}
interface indicaciones{
  efectosMedicamento?:string,
  instrucciones?:string,
  advertencias?:string,
  otrasIndicaciones?:string,
}