import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TratamientoConsultaService} from "../../../../services/tratamiento-consulta.service";
import {IpressFarmaciaService} from "../../../../../../../../modulos/ipress-farmacia/services/ipress-farmacia.service";
import {IpressService} from "../../../../../../../../core/services/ipress/ipress.service";
import {dato} from "../../../../../../models/data";
import {MedicamentosService} from "../../../../../../../../mantenimientos/services/medicamentos/medicamentos.service";
import {DiagnosticoConsultaService} from "../../../../services/diagnostico-consulta.service";

@Component({
  selector: 'app-tratamiento-cred',
  templateUrl: './tratamiento-cred.component.html',
  styleUrls: ['./tratamiento-cred.component.css']
})
export class TratamientoCredComponent implements OnInit {


  tratamientos: any[] = [];
  dialogTratamiento:boolean=false;
  formTratamiento:FormGroup;
  formIndicaciones:FormGroup;

  renipress: "";
  idIpress:string="616de45e0273042236434b51";
  attributeLocalS = 'documento'
  data:dato;

  estadoEditar:boolean=false;

  intervaloList: any[];
  medicamentosConDatos: any[]=[];
  listaMedicamentos:any;
  viaadministracionList:viaAdministracion[]=[];
  listaDiagnosticos:any[]=[];

  tratamientoEditar:any;
  aux:any[]=[];
  dialogIndicaciones: boolean=false;

  constructor(private tratamientoService: TratamientoConsultaService,
              private DiagnosticoService: DiagnosticoConsultaService,
              private farmaciaService: IpressFarmaciaService,
              private medicamentosService:MedicamentosService,
              private ipressServices: IpressService,
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
    this.listarTratamientos();
    this.buscarCodigoIpress();
    this.listarDiagnosticos();
  }

  buildForm() {
    this.formTratamiento = this.formBuilder.group({
      medicamento: new FormControl(''),
      id: new FormControl(''),
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

  listarMedicamentosFarmacia(){
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renipress).subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
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
          console.log(this.medicamentosConDatos);
        }
      }
    })
  }

  listarDiagnosticos(){
    this.DiagnosticoService.getDiagnostico(this.data.idConsulta).subscribe((data:any)=>{
      if(data.object.diagnosticos!=undefined || data.object.diagnosticos!=null){
        console.log(data.object.diagnosticos);

        for(let i =0;i<data.object.diagnosticos.length;i++){
          this.listaDiagnosticos.push(data.object.diagnosticos[i].cie10SIS)
        }
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
    console.log('lista de medicamentos ', this.medicamentosConDatos);
    console.log(event);
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
    this.tratamientoService.getTratamiento(this.data.idConsulta).subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
        this.tratamientos=(data.object);
      }
    })
  }

  /*****************Imprimir Receta**************/
  imprimirReceta(){
    console.log("imprimiendo receta");
  }

  openTratamiento() {
    this.formTratamiento.reset();
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
       cie10SIS: this.formTratamiento.value.cie10SIS
     }
     var duplicado:boolean=this.tratamientos.some(element=>element.medicamento=cadena.medicamento)
     console.log(duplicado);
     console.log("cadena" , cadena)
    if(!duplicado){
      this.tratamientos.push(cadena);
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
      cie10SIS: this.formTratamiento.value.cie10SIS
    }
    var AuxItem = this.tratamientos.filter(element=>element!=this.tratamientoEditar);
    console.log(AuxItem);
    this.tratamientos=AuxItem;
    console.log("cadena" , cadena)
    this.tratamientos.push(cadena);
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

  editarTratamiento(rowData: any, rowIndex: any) {
    this.formTratamiento.reset();
    console.log(rowData);
    this.estadoEditar=true;
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
    this.formTratamiento.get("cie10SIS").setValue(rowData.cie10SIS);
    this.formTratamiento.get("observaciones").setValue(rowData.observaciones);
    this.formTratamiento.get("efectosMedicamento").setValue(rowData.indicaciones.efectosMedicamento);
    this.formTratamiento.get("advertencias").setValue(rowData.indicaciones.advertencias);
    this.formTratamiento.get("instrucciones").setValue(rowData.indicaciones.instrucciones);
    this.formTratamiento.get("otrasIndicaciones").setValue(rowData.indicaciones.otrasIndicaciones);

    let date: Date = new Date(rowData.fechaVenc);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    console.log(date)
    this.formTratamiento.get("fechaVenc").setValue(date);
    this.tratamientoEditar=rowData;
  }

  eliminarTratamiento(rowIndex: any) {
    console.log("entrando a editar medicamentos",rowIndex,rowIndex);
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
}

interface viaAdministracion{
  label?:string,
  value?:string,
}

