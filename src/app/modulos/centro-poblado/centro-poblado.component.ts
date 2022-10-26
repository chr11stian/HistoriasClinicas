import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';
import { Validator } from '../../visita-domiciliaria/interfaces/visita_profesional_gestantes';

@Component({
  selector: 'app-centro-poblado',
  templateUrl: './centro-poblado.component.html',
  styleUrls: ['./centro-poblado.component.css']
})
export class CentroPobladoComponent implements OnInit {
  centroPobladoFG:FormGroup
  cpAgregarFG:FormGroup
  departamentoList:any[]
  provinciaList:any[]
  distritoList:any[]
  centroPobladoList:any[]=[]
  agregarCPDialog=false
  isUpdate=false
  constructor(private ubicacionService: UbicacionService) { }

  ngOnInit(): void {
    this.buildForm()
    this.getDepartamentos()
  }
  get ubigeo2(){    
    return `${this.getFC('departamento').value.iddd}${this.getFC('provincia').value.idpp}${this.getFC('distrito').value.iddis}`
  }
  buildForm(){
    this.centroPobladoFG=new FormGroup({
      // ubigeo:new FormControl({value:'',disabled:false},Validators.required),
      departamento:new FormControl({value:'',disabled:false},Validators.required),
      provincia:new FormControl({value:'',disabled:false},Validators.required),
      distrito:new FormControl({value:'',disabled:false},Validators.required)
    })
    this.cpAgregarFG=new FormGroup({
      idCP:new FormControl({value:'',disabled:false}),
      // idCP:new FormControl({value:'',disabled:false},Validators.required),
      nombreCP:new FormControl({value:'',disabled:false},Validators.required),
      latitude:new FormControl({value:null,disabled:false},Validators.required),
      longitude:new FormControl({value:null,disabled:false},Validators.required),
      poblacion:new FormControl({value:null,disabled:false},Validators.required),
      altura:new FormControl({value:null,disabled:false},Validators.required),
    })
  }
  getFC(control:string):AbstractControl{
    return this.centroPobladoFG.get(control)
  }
  getAgregarFC(control:string):AbstractControl{
    return this.cpAgregarFG.get(control)
  }
  getDepartamentos() {
    this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
      this.departamentoList = resp.object;
    });
  }
  selectedDepartamento() {
    const inputRequest = {
      iddd: this.getFC('departamento').value.iddd,
    }
    this.ubicacionService.getProvincias(inputRequest).subscribe((res: any) => {
      this.provinciaList = res.object;
      this.distritoList=[]
      this.centroPobladoList=[]
      this.getFC('provincia').setValue('')
    })
  }
  selectedProvincia() {
    const inputRequest = {
      iddd:this.getFC('departamento').value.iddd,
      idpp:this.getFC('provincia').value.idpp,
    };
    this.ubicacionService.getDistritos(inputRequest).subscribe((res: any) => {
      this.distritoList = res.object;
      this.centroPobladoList=[]
      this.getFC('distrito').setValue('')
    })
  }
  selectedDistrito() {
    const inputRequest = {
      iddd: this.getFC('departamento').value.iddd,
      idpp: this.getFC('provincia').value.idpp,
      iddis: this.getFC('distrito').value.iddis,
    };

    this.ubicacionService.getCCPPCompleto(inputRequest.iddd,inputRequest.idpp,inputRequest.iddis).subscribe((res: any) => {
      this.centroPobladoList = res.object;
    })
  }
  centroPobladoSelected:any
  addCentroPoblado(rowData?){
    this.centroPobladoSelected=rowData
    this.cpAgregarFG.reset()
    this.agregarCPDialog=true
    if(rowData){
      this.getAgregarFC('idCP').setValue(rowData.idccpp),
      this.getAgregarFC('nombreCP').setValue(rowData.ccpp),
      this.getAgregarFC('latitude').setValue(rowData.latitude),
      this.getAgregarFC('longitude').setValue(rowData.longitude),
      this.getAgregarFC('poblacion').setValue(rowData.poblacion),
      this.getAgregarFC('altura').setValue(rowData.altura)
    }
  }
  isInvalid(control: string): boolean {
    const formControl: AbstractControl = this.getAgregarFC(control);
    return (
        formControl.invalid && (formControl.touched || formControl.dirty)
    );
  }
  isInvalido2=[true,true,true,true]
  isInvalido=true
  validarNro(evento,index){
    this.isInvalido2[index]=evento.value==null?true:false
  }
  isInvalidNumerico(control:string,index):boolean{
    const formC:AbstractControl=this.getAgregarFC(control)
    return this.isInvalido2[index] && (formC.touched || formC.dirty)
  }
  saveCentroPoblado(){
    if(this.cpAgregarFG.invalid){
      this.cpAgregarFG.markAllAsTouched();
      return
    } 
    const inputRequest={
      ubigeo:this.ubigeo2,
      iddd:this.getFC('departamento').value.iddd,
      departamento:this.getFC('departamento').value.departamento, 
      idpp:this.getFC('provincia').value.idpp,
      provincia:this.getFC('provincia').value.provincia,
      iddis:this.getFC('distrito').value.iddis,
      distrito:this.getFC('distrito').value.distrito,
      
      idccpp:this.getAgregarFC('idCP').value,
      ccpp:this.getAgregarFC('nombreCP').value,
      latitude:this.getAgregarFC('latitude').value,
      longitude:this.getAgregarFC('longitude').value,
      poblacion:this.getAgregarFC('poblacion').value,
      altura:this.getAgregarFC('altura').value
    }
    if(this.isUpdate){
      inputRequest['id']=this.centroPobladoSelected.id,
       this.ubicacionService.editarCCPP(this.centroPobladoSelected.id,inputRequest).subscribe((resp:any)=>{
         Swal.fire({
           icon: "success",
           title: "Exito!",
           text: "Se actualizo el centro poblado ",
           showConfirmButton: false,
           timer: 2000,
         });
         this.selectedDistrito()
         this.cpAgregarFG.reset()
         this.agregarCPDialog=false
       })
    }
    else{
      this.ubicacionService.saveCCPP(inputRequest).toPromise().then((resp:any)=>{
        if(resp.cod=="2223"){
          Swal.fire({
            icon: "success",
            title: "Exito!",
            text: "Se guardo el centro poblado",
            showConfirmButton: false,
            timer: 2000,
          });
          this.selectedDistrito()
          this.cpAgregarFG.reset()
          this.agregarCPDialog=false
        }    
       }).catch((error)=>{
        if(true){
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Ya exite un centro poblado con el mismo nombre",
            // text: error,
            showConfirmButton: false,
            timer: 2000,
          });
        }

       })  
    }
  }

}
