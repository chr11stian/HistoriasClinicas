import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  TratamientosSuplementacionService
} from "../../../../../services/tratamientos/tratamientos-suplementacion.service";
import {IpressFarmaciaService} from "../../../../../../modulos/ipress-farmacia/services/ipress-farmacia.service";
import {
  ConsultasService
} from "../../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";

@Component({
  selector: 'app-tratamiento-suplementacion-modal',
  templateUrl: './tratamiento-suplementacion-modal.component.html',
  styleUrls: ['./tratamiento-suplementacion-modal.component.css']
})
export class TratamientoSuplementacionModalComponent implements OnInit {
  listaDeCIEHIS: any[]=[];
  ListaPrestacion:any[]=[];
  aux: any;
  dataConsulta:any
  idConsulta:string
  suplementacionFC:FormGroup
  renIpress:string
  idIpress:string
  listaUps:any[]
  tipoSuplementacionList:any[]=[
    {name:'Preventivo',code:'Preventivo'},
    {name:'Terapeutico',code:'Terapeutico'}
  ]
  constructor(private cieService: CieService,
              private prestacionService: PrestacionService,
              private tratamientosSuplementacionService:TratamientosSuplementacionService,
              private farmaciaService: IpressFarmaciaService,
              private tratamientoService:ConsultasService,
              public ref: DynamicDialogRef) {
    this.dataConsulta = <any>JSON.parse(localStorage.getItem('documento'))
    this.idConsulta=this.dataConsulta.idConsulta
    this.renIpress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.buildForm()
  }

  ngOnInit(): void {
    this.listarMedicamentosFarmacia()
    this.recuperarUPS();
    this.recuperarPrestaciones();
  }
  // recuperarUpsHis() {
  //   let Data = {
  //     idIpress: this.idIpress,
  //     edad: this.edadPaciente,
  //     sexo: this.sexoPaciente
  //   }
  //   this.tratamientoService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
  //   //console.log("DATA PARA UPS HIS", this.listaUpsHis)
  // }
  recuperarUPS() {
    this.tratamientoService.listaUps(this.idIpress).then((res: any) => {
      this.listaUps = res.object
      // //console.log(res.object)
    });

  }
  selectedDxHIS(event: any) {
    //console.log('lista de cie ', this.listaDeCIEHIS);
    //console.log('evento desde diagnos ', event);
    this.getFC('procedimientoHIS').setValue(event.descripcionItem);
    this.getFC('codProcedimientoHIS').setValue('');
    this.getFC('codProcedimientoHISinput').setValue(event.codigoItem);

    // this.formProcedimiento.patchValue({ buscarPDxHIS: ""})
    // this.formProcedimiento.patchValue({ codProcedimientoHIS: event});
    //
  }
  recuperarPrestaciones() {
    this.prestacionService.getPrestacion().subscribe((res: any) => {
      this.ListaPrestacion = res.object;
      //console.log("prestaciones:", this.ListaPrestacion);
    })
  }
  onChangePrestacion(){
    //console.log(this.getFC('prestacion').value)

  }
  filterCIE10(event: any) {
    //console.log('event->>>>>>>>>',event)
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      //console.log(res)
      this.listaDeCIEHIS = res.object
    })
  }
  buildForm(){
    this.suplementacionFC=new FormGroup({
      tipoSuplementacion:new FormControl('',Validators.required),
      codPrestacion:new FormControl('',Validators.required) ,

      codSISMED:new FormControl('',Validators.required) ,


      nroDiagnostico:new FormControl('',Validators.required) ,
      codProcedimientoHIS:new FormControl('',Validators.required) ,
      codProcedimientoHISinput:new FormControl('',Validators.required) ,
      codUPS:new FormControl('',Validators.required) ,


      nombre:new FormControl('',Validators.required) ,
      descripcion:new FormControl('',Validators.required) ,
      dosisIndicacion:new FormControl('',Validators.required) ,
      viaAdministracion:new FormControl('',Validators.required) ,
      frecuencia:new FormControl('',Validators.required) ,
      duracion:new FormControl('',Validators.required) ,
      indicacion:new FormControl('',Validators.required) ,
      dosis:new FormControl('',Validators.required) ,
      fecha:new FormControl(new Date(),Validators.required) ,
      prestacion:new FormControl('',Validators.required) ,
      procedimientoHIS:new FormControl('',Validators.required) ,
    })

  }
  getFC(control: string): AbstractControl {
    return this.suplementacionFC.get(control)
  }
  save(){
    const inputRequest={
      tipoSuplementacion: this.getFC('tipoSuplementacion').value,
      codPrestacion: this.getFC('prestacion').value,
      codSISMED:this.getFC('codSISMED').value,
      nroDiagnostico: 0,
      codProcedimientoHIS: this.getFC('codProcedimientoHISinput').value,
      codUPS: this.getFC('codUPS').value,
      nombre: this.getFC('nombre').value,
      descripcion: this.getFC('descripcion').value,

      dosisIndicacion: this.getFC('dosisIndicacion').value,
      viaAdministracion: this.getFC('viaAdministracion').value,
      frecuencia: this.getFC('frecuencia').value,
      duracion: this.getFC('duracion').value,
      indicacion: this.getFC('indicacion').value,
      dosis: this.getFC('dosis').value,
      fecha: this.obtenerFecha(this.getFC('fecha').value),
      estadoAdministrado: true
    }
    //console.log('input request',inputRequest)
    this.tratamientosSuplementacionService.PostSuplementacion(this.idConsulta,inputRequest).subscribe((resp)=>{
      //console.log('respuesta del servidor',resp)
      this.ref.close('agregado')
    })
  }
  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split('T')
    const parte2 = parte1[1].split('.')[0]
    return `${parte1[0]}`
  }
  //FARMACIA MEDICAMENTOS
  codSISMED:string
  selectedOptionNameMedicamento(event, n) {
    //console.log('lista de medicamentos ', this.medicamentosConDatos);
    //console.log('seleccionado', event);
    if (n == 1) {
      this.getFC('codSISMED').setValue(event.medicamento.codigo);
      this.getFC('nombre').setValue(event.medicamento.nombre);
      this.getFC('descripcion').setValue(event.medicamento.nombreComercial);

      // this.codSISMED = event.medicamento.codigo;
      // this.formRIEP.patchValue({ acidoFolicoDescripcion: event.medicamento.nombreComercial });
      // this.formRIEP.patchValue({ acidoFolicoNombre: event.medicamento.nombre });
      // this.formRIEP.patchValue({ acidoFolicoFechaVenc: event.fechaVenc });
      // this.formRIEP.patchValue({ acidoFolicoViaAdministracion: event.medicamento.viaAdministracion });
      // this.formRIEP.patchValue({ stock: event.stock });
    }
    // if (n == 2) {
    //   //console.log(event);
    //   this.codMedicamento2 = event.medicamento.codigo;
    //   this.formRIEP.patchValue({ calcioDescripcion: event.medicamento.nombreComercial });
    //   this.formRIEP.patchValue({ calcioNombre: event.medicamento.nombre });
    //   this.formRIEP.patchValue({ calcioFechaVenc: event.fechaVenc });
    //   this.formRIEP.patchValue({ calcioViaAdministracion: event.medicamento.viaAdministracion });
    //   this.formRIEP.patchValue({ stock2: event.stock });
    // }
    //console.log(this.codSISMED)
  }
  filterItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    //console.log(this.medicamentosConDatos);
    this.aux = this.medicamentosConDatos;
    for (let i = 0; i < this.aux.length; i++) {
      let item = this.aux[i];
      if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.aux = filtered;
    if (this.aux === []) {
      //console.log('no encontrado');
      this.aux = this.medicamentosConDatos;

    }
  }
  filterItemsMed(str) {
    // let filtered: any[] = [];
    // let query = str;
    // //console.log(this.medicamentosConDatos);
    // this.aux = this.medicamentosConDatos;
    // for (let i = 0; i < this.aux.length; i++) {
    //   let item = this.aux[i];
    //   if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //     filtered.push(item);
    //   }
    // }
    // this.aux = filtered;
    // if (this.aux === []) {
    //   //console.log('no encontrado');
    //   this.aux = this.medicamentosConDatos;
    //
    // }
  }
  listaMedicamentos:any[]=[]
  medicamentosConDatos:any[]=[]

  listarMedicamentosFarmacia() {
    //console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renIpress).subscribe((data: any) => {
      //console.log('lista medicamentos',data)
      if (data != undefined) {
        this.listaMedicamentos = (data.object);
        let cadena
        for (let i = 0; i < this.listaMedicamentos.length; i++) {
          cadena = {
            medicamento: {
              id: this.listaMedicamentos[i].medicamento.id,
              codigo: this.listaMedicamentos[i].medicamento.codigo,
              nombre: this.listaMedicamentos[i].medicamento.nombre,
              ff: this.listaMedicamentos[i].medicamento.ff,
              concentracion: this.listaMedicamentos[i].medicamento.concentracion,
              viaAdministracion: this.listaMedicamentos[i].medicamento.viaAdministracion,
              nombreComercial: this.listaMedicamentos[i].medicamento.nombreComercial,
            },
            lote: this.listaMedicamentos[i].lote,
            fechaVenc: this.listaMedicamentos[i].fechaVenc,
            stock: this.listaMedicamentos[i].stock,
            stringMedicamento: this.listaMedicamentos[i].medicamento.nombre + " " + this.listaMedicamentos[i].medicamento.ff + " " + this.listaMedicamentos[i].medicamento.concentracion + " " + this.listaMedicamentos[i].medicamento.viaAdministracion + " Fecha Venc. " + this.listaMedicamentos[i].fechaVenc + " stock: " + this.listaMedicamentos[i].stock
          }
          this.medicamentosConDatos.push(cadena);
        }
      }
    })
  }
  cancelar(){
    this.ref.close("cancelado");

  }

}
