import { Component, OnInit, PipeTransform } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TratamientoConsultaService} from "../../../../services/tratamiento-consulta.service";
import {IpressFarmaciaService} from "../../../../../../../../modulos/ipress-farmacia/services/ipress-farmacia.service";
import {IpressService} from "../../../../../../../../core/services/ipress/ipress.service";
import {dato} from "../../../../../../models/data";
import {MedicamentosService} from "../../../../../../../../mantenimientos/services/medicamentos/medicamentos.service";
import {DiagnosticoConsultaService} from "../../../../services/diagnostico-consulta.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Validator } from '../../../../../../../../visita-domiciliaria/interfaces/visita_profesional_gestantes';
import { LoginComponent } from '../../../../../../../../login/login.component';

@Component({
  selector: 'app-tratamiento-cred',
  templateUrl: './tratamiento-cred.component.html',
  styleUrls: ['./tratamiento-cred.component.css']
})
export class TratamientoCredComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  tratamientos: tratamiento[] = [];
  dialogTratamiento:boolean=false;
  formTratamiento:FormGroup;
  formIndicaciones:FormGroup;

  renipress: "";
  idIpress:string="";
  attributeLocalS = 'documento'
  data:dato;


  estadoEditar:boolean=false;

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
  urlReporte

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

    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;

    this.listarTratamientos();
    this.buscarCodigoIpress();
    this.listarDiagnosticos();
    this.urlReporte=environment.base_urlTx+"/jasperserver/rest_v2/reports/Reports/RECETA/recetas.pdf?"
  }

  buildForm() {
    this.formTratamiento = this.formBuilder.group({
      codPrestacion:new FormControl({value:'',disabled:true}),
      prestacion:new FormControl({value:'',disabled:true}),
      medicamento: new FormControl(''),
      codigoCIE: new FormControl({value:'',disabled:false}),
      id: new FormControl({value:'',disable:false}),

      stock:new FormControl({value:'',disabled:true}),
      codigo: new FormControl({value:'',disabled:true}),
      nombre: new FormControl({value:'',disabled:true}),
      ff: new FormControl({value:'',disabled:true}), /* presentacion */
      concentracion: new FormControl({value:'',disabled:true},Validators.required),
      viaAdministracion: new FormControl({value:'',disabled:true},Validators.required),
      fechaVenc: new FormControl({value:'',disabled:true},Validators.required),
      nombreComercial: new FormControl({value:'',disabled:true},Validators.required),

      cantidad:new FormControl({value:'',disabled:false}),
      dosis:new FormControl({value:'',disabled:false}),
      intervalo:new FormControl({value:'',disabled:false}),
      duracion:new FormControl({value:'',disabled:false}),
      
      efectosMedicamento:new FormControl({value:'',disabled:false}),
      instrucciones:new FormControl({value:'',disabled:false}),
      advertencias:new FormControl({value:'',disabled:false}),
      otrasIndicaciones:new FormControl({value:'',disabled:false}),
      observaciones:new FormControl({value:'',disabled:false}),
      
      cie10SIS:new FormControl({value:'',disabled:false}),
    }),
    this.formIndicaciones = this.formBuilder.group({
      efectosMedicamento:new FormControl({value:'',disabled:true}),
      instrucciones:new FormControl({value:'',disabled:true}),
      advertencias:new FormControl({value:'',disabled:true}),
      otrasIndicaciones:new FormControl({value:'',disabled:true}),
      observaciones:new FormControl({value:'',disabled:true}),


    })

  }
  buscarCodigoIpress(){
    this.ipressServices.getIpressID(this.idIpress).subscribe((res: any) => {
      this.renipress = res.object.renipress;
      this.listarMedicamentosFarmacia();
    })
  }

  /*** funciones Procedimientos****/


  listarMedicamentosFarmacia(){
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renipress).subscribe((data:any)=>{
      if(data!=undefined){
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
        }
      }
    })
  }

  listarDiagnosticos(){
    this.DiagnosticoService.getDiagnostico(this.data.idConsulta).subscribe((data:any)=>{
      if(data.object!=undefined || data.object!=null){
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
    this.aux = this.medicamentosConDatos;
    for(let i = 0; i < this.aux.length; i++) {
      let item = this.aux[i];
      if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.aux = filtered;
    if(this.aux.length==0){
      this.formTratamiento.patchValue({ medicamento: ""});
      this.aux = this.medicamentosConDatos;

    }

  }

  selectedMedicamento(event: any) {
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
    this.formTratamiento.patchValue({fechaVenc:date});
    this.formTratamiento.patchValue({lote:event.lote});
    this.formTratamiento.patchValue({stock:event.stock});

  }

  listarTratamientos(){
    this.tratamientoService.getTratamiento(this.data.idConsulta).subscribe((resp:any)=>{
      if(resp.object!=null){
        this.hayDatos=true;
        this.tratamientos=resp.object
      }
    })
  }

  /*****************Imprimir Receta**************/
  imprimirReceta(){
    this.tratamientoService.evento = false;
    this.tratamientoService.printReceta(this.data.idConsulta).subscribe((data:any)=>{
    })
  }

  openTratamiento() {
    this.formTratamiento.reset();
    this.buildForm();
    this.dialogTratamiento=true;
    this.estadoEditar=false;
  }

  closeDialogGuardar() {
     const inputRequest = {
       medicamento:{
         id:this.formTratamiento.get("id").value,
         codigo:this.formTratamiento.get("codigo").value,
         nombre:this.formTratamiento.get("nombre").value,
         ff:this.formTratamiento.get("ff").value,
         concentracion:this.formTratamiento.get("concentracion").value,
         viaAdministracion:this.formTratamiento.get("viaAdministracion").value,
         nombreComercial:this.formTratamiento.get("nombreComercial").value
       },
       codPrestacion:this.formTratamiento.get("codPrestacion").value,
       cie10SIS: this.formTratamiento.value.cie10SIS.cie10SIS,
       cantidad:this.formTratamiento.value.cantidad,
       dosis:this.formTratamiento.value.dosis,
       intervalo:this.formTratamiento.value.intervalo,
       duracion:this.formTratamiento.value.duracion,
       fechaVenc: this.datePipe.transform(this.formTratamiento.get('fechaVenc').value,'yyyy-MM-dd'),
       observaciones:this.formTratamiento.value.observaciones,
       indicaciones:{
         efectosMedicamento:this.formTratamiento.value.efectosMedicamento,
         instrucciones:this.formTratamiento.value.instrucciones,
         advertencias:this.formTratamiento.value.advertencias,
         otrasIndicaciones:this.formTratamiento.value.otrasIndicaciones,
       }
     }
     var duplicado:boolean=this.tratamientos.some(element=>element.medicamento.id===inputRequest.medicamento.id)
    // var duplicado:boolean=this.tratamientos.includes(cadena)
      if(!duplicado){
        this.tratamientos.push(inputRequest)
        if(!this.hayDatos){
          this.tratamientoService.addTratamiento(this.data.idConsulta,this.tratamientos).subscribe((data:any)=>{
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
          this.tratamientoService.updateTratamiento(this.data.idConsulta,this.tratamientos).subscribe((data:any)=>{
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
    let inputRequest = {
      medicamento:{
        id:this.formTratamiento.get('id').value,
        codigo:this.formTratamiento.get('codigo').value,
        nombre:this.formTratamiento.get('nombre').value,
        ff:this.formTratamiento.get('ff').value,
        concentracion:this.formTratamiento.get('concentracion').value,
        viaAdministracion:this.formTratamiento.get('viaAdministracion').value,
        nombreComercial:this.formTratamiento.get('nombreComercial').value,
      },
      codPrestacion: this.formTratamiento.get("codPrestacion").value,
      cie10SIS: this.formTratamiento.value.codigoCIE,
      cantidad:this.formTratamiento.value.cantidad,
      dosis:this.formTratamiento.value.dosis,
      intervalo:this.formTratamiento.value.intervalo,
      duracion:this.formTratamiento.value.duracion,
      fechaVenc: this.datePipe.transform(this.formTratamiento.get('fechaVenc').value,'yyyy-MM-dd'),
      observaciones:this.formTratamiento.value.observaciones,
      indicaciones:{
        efectosMedicamento:this.formTratamiento.value.efectosMedicamento,
        instrucciones:this.formTratamiento.value.instrucciones,
        advertencias:this.formTratamiento.value.advertencias,
        otrasIndicaciones:this.formTratamiento.value.otrasIndicaciones,
      },
    }
    var AuxItem = this.tratamientos.filter(element=>element!=this.tratamientoEditar);
    this.tratamientos=AuxItem;
    this.tratamientos.push(inputRequest);
    
    this.tratamientoService.updateTratamiento(this.data.idConsulta,this.tratamientos).subscribe((data:any)=>{
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
  codMedicamento:string=''
  editarTratamiento(rowData: any, rowIndex: any) {
    this.formTratamiento.reset();
    this.estadoEditar=true;
    this.buildForm();
    this.dialogTratamiento=true;
    this.formTratamiento.get("id").setValue(rowData.medicamento.id);
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
    this.formTratamiento.get("fechaVenc").setValue(date);
    this.tratamientoEditar=rowData;
  }

  eliminarTratamiento(rowIndex: any) {
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
        this.tratamientoService.updateTratamiento(this.data.idConsulta,this.tratamientos).subscribe((data:any)=>{
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
