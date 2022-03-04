import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {IpressFarmaciaService} from "../services/ipress-farmacia.service";
import {MedicamentosService} from "../../../mantenimientos/services/medicamentos/medicamentos.service";
import {IpressService} from "../../../core/services/ipress/ipress.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";


@Component({
  selector: 'app-ipress-farmacia',
  templateUrl: './ipress-farmacia.component.html',
  styleUrls: ['./ipress-farmacia.component.css']
})
export class IpressFarmaciaComponent implements OnInit {
  formDatos: FormGroup;

  renipress: "123456";
  idIpress:string="616de45e0273042236434b51";
  nombreRenipress:string;

  medicamento:medicamento;
  itemsFarmacia:items[]=[];
  items:itemMedicamentos[]=[];
  medicamentosConDatos:any[]=[];
  selectedCustomer1: items;

  datePipe = new DatePipe('en-US');

  dialogFarmaciaAdd: boolean=false;
  dialogMedicamentosAdd: boolean=false;
  listaMedicamentos: any;

  constructor(private ipressServices:IpressService,
              private medicamentosServices:MedicamentosService,
              private farmaciaService:IpressFarmaciaService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.buscarCodigoIpress();
    this.llenarListaMedicamentos();

  }
  buildForm() {
    this.formDatos = this.fb.group({
      medicamento: new FormControl(''),
      id: new FormControl(''),
      codigo: new FormControl({value:'',disabled:true}),
      nombre: new FormControl({value:'',disabled:true}),
      ff: new FormControl({value:'',disabled:true}),
      concentracion: new FormControl({value:'',disabled:true}),
      viaAdministracion: new FormControl({value:'',disabled:true}),
      stock: new FormControl({value:'',disabled:false}),
      fechaVenc: new FormControl({value:'',disabled:false}),
      lote: new FormControl({value:'',disabled:false}),
    })
  }
  buscarCodigoIpress(){
    console.log('codigo renipress'+ this.renipress);//// ejecuta
    console.log('id Ipress:'+this.idIpress);
    this.ipressServices.getIpressID(this.idIpress).subscribe((res: any) => {
      this.renipress = res.object.renipress;
      this.nombreRenipress=res.object.nombreEESS;
      console.log('codigo renipress'+ this.renipress);
      this.listarMedicamentosFarmacia();
    })

  }
  listarMedicamentosFarmacia(){
    //
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renipress).subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
        this.itemsFarmacia=(data.object);
        for(let i = 0; i<this.itemsFarmacia.length;i++){
          let cadena={
            medicamento:this.itemsFarmacia[i].medicamento,
            stock:this.itemsFarmacia[i].stock,
            fechaVenc:this.itemsFarmacia[i].fechaVenc,
            lote:this.itemsFarmacia[i].lote
          }
          this.items.push(cadena);
        }
        console.log(this.itemsFarmacia);
      }
    })
  }

  OpenFarmacia() {
    this.formDatos.reset();
    this.dialogFarmaciaAdd=true;
  }

  canceled() {
    this.dialogFarmaciaAdd = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: 'No se guardo ningún registro',
      showConfirmButton: false,
      timer: 1000
    })
  }

  closeDialogGuardar() {
    console.log(this.medicamento);
    let cadena:any = {
      medicamento: {
        id: this.formDatos.value.id,
        codigo: this.medicamento.codigo,
        nombre: this.medicamento.nombre,
        ff: this.medicamento.ff,
        concentracion: this.medicamento.concentracion,
        viaAdministracion: this.medicamento.viaAdministracion,
      },
      stock: this.formDatos.value.stock,
      fechaVenc: this.datePipe.transform(this.formDatos.value.fechaVenc, 'yyyy-MM-dd'),
      lote: this.formDatos.value.lote
    }

    console.log(cadena);
    this.items.push(cadena);
    let items = {items:this.items}
    this.farmaciaService.addMedicamentoFarmaciaXIpress(this.renipress,items).subscribe((data:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Medicamentos a Farmacia',
        text: 'Se agrego con éxito un medicamento!',
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Medicamentos a Farmacia',
        text: 'Ocurrio un error al ingresar, vuelva a intentarlo!',
      })
    })
    this.dialogFarmaciaAdd=false;
  }

  filterItems(event: any) {
    let filtered : any[] = [];
    let query = event.query;
    console.log(this.medicamentosConDatos);
      for(let i = 0; i < this.medicamentosConDatos.length; i++) {
        let item = this.medicamentosConDatos[i];
        if (item.medicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {

          filtered.push(item);
        }
      }

    this.medicamentosConDatos = filtered;
      if(filtered!=null){
        console.log(filtered[0])
        this.AutoCompleteDatos(filtered[0].id);
      }

  }
  private AutoCompleteDatos(id){
    console.log(id);
    this.medicamentosServices.getMedicamentosPorId(id).subscribe((data:any)=>{
     console.log(data);
      this.medicamento = data.object;
      console.log(this.medicamento);
      this.formDatos.get("id").setValue(data.object.id);
      this.formDatos.get("nombre").setValue(data.object.nombre);
      this.formDatos.get("codigo").setValue(data.object.codigo);
      this.formDatos.get("concentracion").setValue(data.object.concentracion);
      this.formDatos.get("viaAdministracion").setValue(data.object.viaAdministracion);
      this.formDatos.get("ff").setValue(data.object.ff);
    })
    console.log(id);

  }

  private llenarListaMedicamentos() {
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.medicamentosServices.getMedicamentosAll().subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
        this.listaMedicamentos=(data.object);
        let cadena
        for(let i = 0;i<this.listaMedicamentos.length;i++){
          cadena = {
            id:this.listaMedicamentos[i].id,
            medicamento:this.listaMedicamentos[i].nombre +" "+ this.listaMedicamentos[i].ff +" "+  this.listaMedicamentos[i].concentracion +" "+  this.listaMedicamentos[i].viaAdministracion
          }
          this.medicamentosConDatos.push(cadena);
        }
      }
    })
    console.log(this.medicamentosConDatos);
  }

  editar(farmaciaMedicamento: any,rowIndex) {
    console.log("entrando a editar medicamentos",farmaciaMedicamento,rowIndex);
    this.formDatos.reset();
    this.dialogFarmaciaAdd=true;
    this.llenarDatosForm(farmaciaMedicamento);
    this.items.splice(rowIndex, 1)
    let cadena:any = {
      medicamento: {
        id: this.formDatos.value.id,
        codigo: this.medicamento.codigo,
        nombre: this.medicamento.nombre,
        ff: this.medicamento.ff,
        concentracion: this.medicamento.concentracion,
        viaAdministracion: this.medicamento.viaAdministracion,
      },
      stock: this.formDatos.value.stock,
      fechaVenc: this.datePipe.transform(this.formDatos.value.fechaVenc, 'yyyy-MM-dd'),
      lote: this.formDatos.value.lote
    }

    console.log(cadena);
    this.items.push(cadena);
    let items = {items:this.items}
    this.farmaciaService.updateMedicamentoFarmaciaXIpress(this.renipress,items).subscribe((data:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Eliminado correctamente',
        text: '',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  llenarDatosForm(rowData){
    // this.formDatos.get("id").setValue(rowData.id);
    this.formDatos.get("nombre").setValue(rowData.nombre);
    this.formDatos.get("codigo").setValue(rowData.codigo);
    this.formDatos.get("concentracion").setValue(rowData.concentracion);
    this.formDatos.get("viaAdministracion").setValue(rowData.viaAdministracion);
    this.formDatos.get("ff").setValue(rowData.ff);
    this.formDatos.get("fechaVenc").setValue(rowData.fechaVenc);
    this.formDatos.get("stock").setValue(rowData.stock);
    this.formDatos.get("lote").setValue(rowData.lote);

  }
  eliminar(farmaciaMedicamento: any,rowIndex) {
    console.log("entrando a editar medicamentos",farmaciaMedicamento,rowIndex);
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.items.splice(rowIndex, 1)
        let items = {items:this.items}
        this.farmaciaService.addMedicamentoFarmaciaXIpress(this.renipress,items).subscribe((data:any)=>{
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
}

interface medicamento{
  created_at?:string,
  created_by?:string,
  modified_at?:string,
  modified_by?:string,
  deleted?:boolean,
  id?:string,
  codigo?:string,
  nombre?:string,
  ff?:string,
  concentracion?:string,
  viaAdministracion?:string
}

interface items{
  created_at?:string,
  created_by?:string,
  deleted?:boolean,
  medicamento?:medicamento,
  stock?:number,
  fechaVenc?:string,
  lote?:string
}
interface itemMedicamentos{
  medicamento?:medicamento,
  stock?:number,
  fechaVenc?:string,
  lote?:string
}