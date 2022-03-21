import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../models/data";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-procedimientos-consulta',
  templateUrl: './procedimientos-consulta.component.html',
  styleUrls: ['./procedimientos-consulta.component.css']
})
export class ProcedimientosConsultaComponent implements OnInit {
  tablaResumenDx:resultados[]=[];
  attributeLocalS = 'documento';
  dataConsulta:dato;
  id: string = "";

  formProcedimiento:FormGroup;
  procedimientoDialog:boolean;
  procedimientos:procedimiento[]=[];

  contador:number = 0;
  hayDatos:boolean=false;

  ListaPrestacion:any[]=[];
  listaDeCIEHIS: any[]=[];
  listaDeCIESIS: any[]=[];
  listaDeProcedimientos:any[]=[];
  listaDiagnosticos:any[]=[];

  constructor(private PrestacionService: PrestacionService,
              private DiagnosticoService: DiagnosticoConsultaService,
              private formBuilder: FormBuilder,
              private cieService: CieService,
              private messageService: MessageService) {
    this.buildForm();
    this.dataConsulta = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.recuperarResumenDxBDLaboratorio();
    this.recuperarResumenDxBDInmunizaciones();
    this.recuperarResumenDxBDTamizajes();
    this.recuperarResumenDxBDEvaluaciones();
  }

  ngOnInit(): void {

    this.recuperarPrestaciones();
    this.recuperarDxBD();
    this.listarDiagnosticos();
  }


  buildForm() {

    this.formProcedimiento = this.formBuilder.group({
        buscarPDxSIS:  new FormControl({value:'',disabled:false}),
        buscarPDxHIS:  new FormControl({value:'',disabled:false}),
        diagnostico: new FormControl({value:'',disabled:false}),
        prestacion: new FormControl({value:'',disabled:false}),
        procedimientoSIS:  new FormControl({value:'',disabled:false}),
        procedimientoHIS: new FormControl({value:'',disabled:false}),
        codProcedimientoSIS: new FormControl({value:'',disabled:false}),
        codProcedimientoHIS: new FormControl({value:'',disabled:false}),
        codPrestacion: ['', [Validators.required]],
        cie10SIS: new FormControl({value:'',disabled:false}),

    });

  }

  recuperarDxBD(){
    this.DiagnosticoService.getProcedimiento(this.dataConsulta.idConsulta).subscribe((res: any) => {
          if(res.object!=null){
            console.log(res.object);
            this.hayDatos=true;
              this.procedimientos = res.object;
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
    this.DiagnosticoService.getDiagnostico(this.dataConsulta.idConsulta).subscribe((data:any)=>{
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
  /** Servicios para recuperar Resumen DX ***/
  recuperarResumenDxBDLaboratorio(){
    this.DiagnosticoService.getLaboratorioResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
      //-- recupera laboratorios resumen
      if(r.object!=null || r.object!=[]){
        for(let i =0 ;i<r.object.length;i++){
          if(r.object[i].hemoglobina) {
            let aux = {
              nombre:'LABORATORIO',
              evaluacion: 'HEMOGLOBINA',
              resultado:r.object[i].hemoglobina
            }
            this.tablaResumenDx.push(aux);
          }
        }
      }

    })
  }

  recuperarResumenDxBDInmunizaciones(){
    this.DiagnosticoService.getInmunizacionesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
      //-- recupera laboratorios resumen
      if(r.object!=null || r.object!=[]){
        for(let i =0 ;i<r.object.length;i++){
          let aux = {
            nombre:'INMUNIZACIONES',
            evaluacion: r.object[i].nombre + "- Dosis:"+r.object[i].dosis + "- Tipo Dosis:"+ r.object[i].tipoDosis,
            resultado:" "
          }
          this.tablaResumenDx.push(aux);

        }
      }
    })
  }

  recuperarResumenDxBDTamizajes(){
    this.DiagnosticoService.getTamizajesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
      //-- recupera laboratorios resumen
      if(r.object!=null || r.object!=[]){
        for(let i =0 ;i<r.object.length;i++){
          let aux = {
            nombre:'TAMIZAJES',
            evaluacion:'TAMIZAJE AUDITIVO',
            resultado:  r.object[i].resultadoAuditivo.valor
          }
          this.tablaResumenDx.push(aux);
          let aux1 = {
            nombre:'TAMIZAJES',
            evaluacion:'TAMIZAJE VIF',
            resultado:  r.object[i].resultadoVIF.valor
          }
          this.tablaResumenDx.push(aux1);
          let aux2 = {
            nombre:'TAMIZAJES',
            evaluacion: 'TAMIZAJE VISUAL',
            resultado:  r.object[i].resultadoVisual.valor
          }
          this.tablaResumenDx.push(aux2);
        }
      }
    })
  }

  recuperarResumenDxBDEvaluaciones(){
    this.DiagnosticoService.getEvaluacionesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
      //-- recupera laboratorios resumen
      if(r.object!=null || r.object!=[]){
        for(let i =0 ;i<r.object.length;i++){
          if(r.object[i].evaluacioAlimentacion){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'EVALUACION DE ALIMENTACION',
              resultado: r.object[i].evaluacioAlimentacion
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].testPeruano){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'TEST PERUANO',
              resultado: r.object[i].testPeruano
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].testEEDP){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'TEST EDDP',
              resultado: r.object[i].testEEDP
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].testTepsi){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'TEST TEPSI',
              resultado: r.object[i].testTepsi
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].testPautaBreve){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'TEST PAUTA BREVE',
              resultado: r.object[i].testPautaBreve
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].resultadoControlPE){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'CONTROL PESO - EDAD',
              resultado: r.object[i].resultadoControlPE
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].resultadoControlTE){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'CONTROL TALLA - EDAD',
              resultado: r.object[i].resultadoControlTE
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].resultadoControlPT){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'CONTROL PESO - TALLA',
              resultado: r.object[i].resultadoControlPT
            }
            this.tablaResumenDx.push(aux);
          }
          if(r.object[i].resultadoControlPC){
            let aux = {
              nombre:'EVALUACIONES O TEST',
              evaluacion: 'CONTROL PERIMETRO CEFÁLICO',
              resultado: r.object[i].resultadoControlPC
            }
            this.tablaResumenDx.push(aux);
          }

        }
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
      // this.formProcedimiento.get('nombreUPS').setValue("CRED");
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
            procedimientoSIS:this.formProcedimiento.value.procedimientoSIS,
            procedimientoHIS:this.formProcedimiento.value.procedimientoHIS,
            codProcedimientoSIS:this.formProcedimiento.value.codProcedimientoSIS,
            codProcedimientoHIS:this.formProcedimiento.value.codProcedimientoHIS.codigoItem,
            codPrestacion:this.formProcedimiento.value.prestacion.codigo,
            cie10SIS:this.formProcedimiento.value.diagnostico.cie10SIS,

        }
        console.log("aux",aux)

        var duplicado:boolean;
        duplicado=this.procedimientos.some(element=>element.procedimientoHIS==aux.procedimientoHIS);
        console.log(duplicado)
        this.procedimientoDialog = false;
        if(!duplicado){
          this.procedimientos.push(aux);
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'Ya ingreso este procedimiento, vuelva a intentar.'});
        }
  }

  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formProcedimiento.value.diagnostico.codPrestacion).subscribe((res: any) => {
      console.log(res.object);
      this.listaDeProcedimientos = res.object.procedimientos;
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
      this.listaDeProcedimientos = res.object.procedimientos;

      console.log(res.object);
      if(res.object.denominacion=='ANIOS')
      {
        if(this.dataConsulta.anio>=res.object.edadMin && this.dataConsulta.anio<=res.object.edadMax){
          this.listaDeProcedimientos = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }
      }
      if(res.object.denominacion=='MESES')
      {
        let meses = this.dataConsulta.anio*12 + this.dataConsulta.mes + this.dataConsulta.dia/30;
        if(meses>=res.object.edadMin && meses <=res.object.edadMax){
          this.listaDeProcedimientos = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }

      }
      if(res.object.denominacion=='DIAS')
      {
        if(this.dataConsulta.anio==0 && this.dataConsulta.mes==0){
          if(this.dataConsulta.dia>=res.object.edadMin && this.dataConsulta.dia<=res.object.edadMax){
            this.listaDeProcedimientos = res.object.procedimientos;
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

  selectDxSIS() {
    console.log(this.formProcedimiento.value.buscarPDxSIS);
    this.formProcedimiento.patchValue({ procedimientoSIS: this.formProcedimiento.value.buscarPDxSIS.procedimiento})
    this.formProcedimiento.patchValue({ codProcedimientoSIS: this.formProcedimiento.value.buscarPDxSIS.codigo});
    this.formProcedimiento.patchValue({ buscarPDxSIS: ""})
  }

  async saveProcedimiento(){
    if(!this.hayDatos){
     await this.DiagnosticoService.addProcedimiento(this.dataConsulta.idConsulta, this.procedimientos).subscribe(
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
    else{

      this.DiagnosticoService.updateProcedimiento(this.dataConsulta.idConsulta, this.procedimientos).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: 'success',
              title: 'PROCEDIMIENTOS...',
              text: 'Actualizado correctamente',
              showConfirmButton: false,
              timer: 1000
            })
          },error => {
            console.log(error);
            if(error.status==406){
              Swal.fire({
                icon: 'warning',
                title: 'PROCEDIMIENTOS...',
                text: "No hubo ningun cambio",
                showConfirmButton: false,
                timer: 1000
              })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'PROCEDIMIENTOS...',
                text: 'Hubo un error, vuelva a intentarlo',
                showConfirmButton: false,
                timer: 1000
              })
            }

          })
    }
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
}
interface resultados{
  nombre?:string,
  evaluacion?:string,
  resultado?:string
}
interface procedimiento {
  procedimientoHIS?:string,
  codProcedimientoHIS?:string,
  codProcedimientoSIS?:string,
  procedimientoSIS?:string,
  cie10SIS?:string,
  codPrestacion?:string

}