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

  renipress: any;
  idIpress:string="616de45e0273042236434b51";
  nombreRenipress:string;

  medicamento:any;
  items:itemMedicamentos[]=[];
  medicamentosConDatos:cadenaMedicamentos[]=[];
  aux:cadenaMedicamentos[]=[];
  selectedCustomer1: itemMedicamentos;
  estadoEditar:boolean=false;
  datePipe = new DatePipe('en-US');


  dialogFarmaciaAdd: boolean=false;
  listaMedicamentos: any;
  hayMedicamento:boolean=false;
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
      this.recuperarMedicamentosFarmacia();
    })

  }

  recuperarMedicamentosFarmacia(){
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renipress).subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
        this.items=(data.object);
        this.hayMedicamento=true;
      }
      else{
        this.hayMedicamento=false;
      }
    },error => {
      this.hayMedicamento=false;
    })
  }

  llenarListaMedicamentos() {
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.medicamentosServices.getMedicamentosAll().subscribe((data:any)=>{
      if(data!=undefined){
        console.log(data.object);
        this.listaMedicamentos=(data.object);
        let cadena
        for(let i = 0;i<this.listaMedicamentos.length;i++){
          cadena = {
            cadena: this.listaMedicamentos[i].nombre +" "+
                    this.listaMedicamentos[i].ff +" "+
                    this.listaMedicamentos[i].concentracion +" "+
                    this.listaMedicamentos[i].viaAdministracion,

            medicamento:{
                id                :this.listaMedicamentos[i].id,
                nombre            : this.listaMedicamentos[i].nombre,
                ff                : this.listaMedicamentos[i].ff,
                concentracion     :this.listaMedicamentos[i].concentracion,
                codigo            :this.listaMedicamentos[i].codigo,
                viaAdministracion :this.listaMedicamentos[i].viaAdministracion
            }
          }
          this.medicamentosConDatos.push(cadena);
        }
      }
    })
    console.log(this.medicamentosConDatos);
  }

  OpenFarmacia() {
    this.formDatos.reset();
    this.estadoEditar=false;
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

  async closeDialogGuardar() {

      let cadena:any = {
        items:[{
          created_at:null,
          created_by:null,
          deleted: false,
          modified_at:null,
          modified_by:null,
          medicamento:    {
            id: this.medicamento.id,
            codigo: this.medicamento.codigo,
            nombre: this.medicamento.nombre,
            ff: this.medicamento.ff,
            concentracion: this.medicamento.concentracion,
            viaAdministracion: this.medicamento.viaAdministracion,
          },
          stock           :this.formDatos.value.stock,
          fechaVenc       :this.formDatos.value.fechaVenc,
          lote            :this.formDatos.value.lote
        }]
      }

      this.items.push(cadena.items[0]);
      console.log(this.items);
      if(this.hayMedicamento==true){
      await this.farmaciaService.updateMedicamentoFarmaciaXIpress(this.renipress,cadena).subscribe((data:any)=>{
        this.recuperarMedicamentosFarmacia();
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
    }
    else{

      await this.farmaciaService.addMedicamentoFarmaciaXIpress(this.renipress,cadena).subscribe((data:any)=>{
        this.recuperarMedicamentosFarmacia();
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
    }

    this.dialogFarmaciaAdd=false;
    this.medicamento={};
  }

  filterItems(event: any) {
    let filtered : any[]=[];
    let query = event.query;
    console.log(query);
    this.aux = this.medicamentosConDatos;
    console.log(this.aux);
      for(let i = 0; i < this.aux.length; i++) {
          let item = this.aux[i];
          console.log(item)
          if (item.cadena.toLowerCase().indexOf(query.toLowerCase()) == 0) {
             filtered.push(item);
          }
      }

      this.aux = filtered;
      if(this.aux===[]){
        console.log('no encontrado');
        this.formDatos.patchValue({ medicamento: ""});
        this.aux = this.medicamentosConDatos;

      }
  }

  selectedMedicamento(event: any) {
    console.log('lista de medicamentos ', this.medicamentosConDatos);
    console.log(event);
    this.medicamento = event.medicamento;
    this.formDatos.patchValue({ medicamento: ""});
    this.formDatos.patchValue({ nombre: event.medicamento.nombre });
    this.formDatos.patchValue({ codigo: event.medicamento.codigo });
    this.formDatos.patchValue({ concentracion: event.medicamento.concentracion });
    this.formDatos.patchValue({ viaAdministracion: event.medicamento.viaAdministracion });
    this.formDatos.patchValue({ ff: event.medicamento.ff });
    this.formDatos.patchValue({id:event.medicamento.id});
  }

  editar(farmaciaMedicamento: any,rowIndex) {
    this.estadoEditar=true;
    console.log("entrando a editar medicamentos",farmaciaMedicamento,rowIndex);
    this.formDatos.reset();
    this.dialogFarmaciaAdd=true;
    this.llenarDatosForm(farmaciaMedicamento);
    console.log(farmaciaMedicamento);
    this.medicamento=farmaciaMedicamento;
  }

  closeEditar(){
    let cadena:any = {
      medicamento: this.medicamento.medicamento,
      stock: this.formDatos.value.stock,
      fechaVenc:this.formDatos.value.fechaVenc,
      lote: this.formDatos.value.lote
    }
    console.log(this.medicamento);
    var AuxItem = this.items.filter(element=>element!=this.medicamento);
    console.log(AuxItem);
    this.items=AuxItem;
    this.items.push(cadena);
    let items = {items:this.items}
    this.farmaciaService.addMedicamentoFarmaciaXIpress(this.renipress,items).subscribe((data:any)=>{

      Swal.fire({
        icon: 'success',
        title: 'Medicamentos a Farmacia',
        text: 'Se edito un medicamento!',
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Medicamentos a Farmacia',
        text: 'Ocurrio un error al ingresar, vuelva a intentarlo!',
      })
    })
    this.dialogFarmaciaAdd=false;
    this.medicamento={};
  }

  llenarDatosForm(rowData){
    console.log(rowData);
    this.formDatos.get("nombre").setValue(rowData.medicamento.nombre);
    this.formDatos.get("codigo").setValue(rowData.medicamento.codigo);
    this.formDatos.get("concentracion").setValue(rowData.medicamento.concentracion);
    this.formDatos.get("viaAdministracion").setValue(rowData.medicamento.viaAdministracion);
    this.formDatos.get("ff").setValue(rowData.medicamento.ff);
    this.formDatos.get("stock").setValue(rowData.stock);
    this.formDatos.get("lote").setValue(rowData.lote);
    let date: Date = new Date(rowData.fechaVenc);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    console.log(date)
    this.formDatos.get("fechaVenc").setValue(date);
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
        var AuxItem = this.items.filter(element=>element!=farmaciaMedicamento);
        console.log(AuxItem);
        // this.items.splice(rowIndex, 1)
        let items = {items:AuxItem}
        this.items=AuxItem;
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
  id?:string,
  codigo?:string,
  nombre?:string,
  ff?:string,
  concentracion?:string,
  viaAdministracion?:string
}

interface itemMedicamentos{
  medicamento?:medicamento,
  stock?:number,
  fechaVenc?:string,
  lote?:string
}
interface cadenaMedicamentos{
  id?:string,
  medicamento?:string,
  cadena?:string
}