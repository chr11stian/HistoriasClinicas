import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DocumentoIdentidadService
} from "../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import {CuposService} from "../../../core/services/cupos.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {dato} from "../../../cred/citas/models/data";
import Swal from 'sweetalert2';
import { Documento } from '../../interfaces/consulta-generica.interface';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit, OnChanges {
  datePipe = new DatePipe('en-US');
  formCitas: FormGroup;
  idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;

  tipoDocList:any[]
  cuposList:any[]
  constructor(private router: Router,
              private rutaActiva:ActivatedRoute,
              private documentoIdentidadService: DocumentoIdentidadService,
              private cuposService: CuposService,
              private messageService: MessageService,
              ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.buildForm();
  }
  ngOnInit(): void {
    this.getTriadosXservicio()
    this.getTipoDocList()
  }
  buildForm() {
    this.formCitas = new FormGroup({
      fechaBusqueda: new FormControl({value:new Date(),disabled:false},Validators.required),
      tipoDoc: new FormControl({value:'',disabled:false},Validators.required),
      nroDoc: new FormControl({value:'',disabled:false},Validators.required),
    })
  }
  get servicio(){
    return this.rutaActiva.snapshot.params.tipoConsulta
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges was called!');
    console.log(changes);
  }
 /*  ngDoCheck() {
    // this.doSomething(this.myFirstInputParameter);
    console.log('imprimimos algo',this.titulo)
    // this.getCuposXservicio()
  } */
  getTipoDocList() {
    this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
      this.tipoDocList = res.object;
      this.formCitas.get('tipoDoc').setValue(this.tipoDocList[0].abreviatura)
      // console.log({tipoDocList:this.tipoDocList});
    })
  }
  buscarCupoXdniFecha() {
    if( this.formCitas.get("nroDoc").value.length!=8){
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese nro Documento',
        text: '',
        showConfirmButton: false,
        timer: 3000
    })
      return
    }
    let data = {
      tipoDoc: this.formCitas.get("tipoDoc").value,
      nroDoc: this.formCitas.get("nroDoc").value,
      fecha: this.datePipe.transform(this.formCitas.get("fechaBusqueda").value, 'yyyy-MM-dd')
    }
    // console.log( {data})
    this.cuposService.buscarCupoPorDniFechaIpress(this.idIpress, data).then((resp:any) => {
      console.log({resp})
      this.cuposList=[]
      this.cuposList.push(resp.object)
    }).catch((error)=>{
      // console.log(error);
      
    });
  }
  getTriadosXservicio() {
    const inputRequest = {
      servicio:this.servicio,
      fecha: this.datePipe.transform(this.formCitas.get("fechaBusqueda").value, 'yyyy-MM-dd')
    } 
    this.cuposService.getTriadosServicioFecha1(inputRequest).subscribe((res: any) => {
      this.cuposList = res.object;
      //console.log({listaCupos:this.dataCupos});
    })
  }
 
  

  enviarData(rowDataCupos) {
    let data: Documento =
        {
          idCupo: rowDataCupos.id,
          idConsulta: '',
          tipoDoc: rowDataCupos.paciente.tipoDoc,
          nroDocumento: rowDataCupos.paciente.nroDoc,
          anio:rowDataCupos.paciente.edadAnio,
          mes:rowDataCupos.paciente.edadMes,
          dia:rowDataCupos.paciente.edadDia,
          sexo: rowDataCupos.paciente.sexo,
          ups:rowDataCupos.ipress.servicio,
          tipoConsulta: rowDataCupos.tipoConsulta,
          //servicio:rowDataCupos.servicio ,
          // fechaConsulta:rowDataCupos.fechaAtencion
        }
      
    localStorage.setItem('documento', JSON.stringify(data));
    console.log(data);
    
    
    this.router.navigate(['/dashboard/consulta-generica/lista-cita/lista-consulta'])
  }
}