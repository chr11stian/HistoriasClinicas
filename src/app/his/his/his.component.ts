import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HISService} from "../services/services.service";
import Swal from "sweetalert2";
import {Location} from "@angular/common";

@Component({
  selector: 'app-his',
  templateUrl: './his.component.html',
  styleUrls: ['./his.component.css']
})
export class HisComponent implements OnInit {
  formDatos:FormGroup;
  datos:any;
  dataHis:any;
  data:any;
  options:  any[];
  turnos:any[];
  sexo:any[];
  actividad:any[];
  diagnosticos:any[];
  listaConIng:any[];
  isUpdate:boolean=false;

  constructor(  private form: FormBuilder,
                private router: Router,
                private hisService:HISService,
                private location: Location)
  {

    this.options = [
      {name: 'A', value: 'AÑOS'},
      {name: 'D', value: 'DIAS'},
      {name: 'M', value: 'MESES'}
    ];
    this.listaConIng= [
      {name: 'N', value: 'N'},
      {name: 'C', value: 'C'},
      {name: 'R', value: 'R'}
    ];
    this.actividad = [
      {name: 'I', value: 'INTRAMURAL'},
      {name: 'E', value: 'EXTRAMURAL'},
    ];
    this.turnos = [
      {name: 'M', value: 'MAÑANA'},
      {name: 'T', value: 'TARDE'},
      {name: 'N', value: 'NOCHE'}
    ];
    this.sexo = [
      {name: 'F', value: 'FEMENINO'},
      {name: 'M', value: 'MASCULINO'},
    ];
    this.datos = JSON.parse(localStorage.getItem("hisDocument"));

  }

  ngOnInit(): void {
    this.buildForm();
    if(this.datos.idHis!=null){
      this.isUpdate=false;
      this.getGenerateHisUpsAux();
    }
    else {
      this.isUpdate=true;
      this.recuperarHisUpsAuxPorId();
    }



  }
  recuperarHisUpsAuxPorId(){
    this.hisService.getListaHisGeneradosPorId(this.dataHis.idHis).subscribe((res: any) => {
      if(res.object!=null){
        console.log(res.object);
        this.data = res.object;
        this.diagnosticos=res.object.diagnosticos;
        this.showFromBDData();
        Swal.fire({
          icon: 'success',
          title: 'DATOS HIS',
          text: 'Recuperado con éxito',
          showConfirmButton: false,
          timer: 1500,
        })

      }
    })
  }
  getGenerateHisUpsAux(){
    this.hisService.generarHisPorUpsAux(this.datos.nombreUPSaux,this.datos.idConsulta).subscribe((res: any) => {
      if(res.object!=null){
        console.log(res.object);
        this.data = res.object;
        this.diagnosticos=res.object.diagnosticos;
        this.showFromBDData();
      }
      else{
        this.location.back();
        Swal.fire({
          icon: 'error',
          title: 'INFORMACION',
          text: 'No hay Diagnósticos',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })

  }
  buildForm() {
    this.formDatos = this.form.group({
      apePaterno: new FormControl(""),
      apeMaterno: new FormControl(""),
      nombres: new FormControl(""),
      fechaNacimiento: new FormControl(""),
      fechaUltimaRegla: new FormControl(""),
      etnia: new FormControl(""),
      nroDoc: new FormControl(""),
      tipoDoc:new FormControl(""),
      nroHcl:new FormControl(""),
      sexo:new FormControl(""),
      financiamiento: new FormControl(""),
      ccpp: new FormControl(""),
      distrito: new FormControl(""),
      sector: new FormControl(""),
      denominacionEdad: new FormControl(""),
      edad: new FormControl(""),
      año: new FormControl(""),
      mes: new FormControl(""),
      dia: new FormControl(""),
      lote: new FormControl(""),
      pagina: new FormControl(""),
      ipress:new FormControl(""),
      fechaProceso:new FormControl(""),
      digitador: new FormControl(""),
      codigoDigitador: new FormControl(""),
      establecimiento: new FormControl(""),
      ups: new FormControl(""),
      nombreProfesional : new FormControl(""),
      dniProfesional: new FormControl(""),
      colegiatura: new FormControl(""),
      actividad: new FormControl(""),
      upsAux: new FormControl(""),
      codigoPersonal: new FormControl(""),
      horaAtencion: new FormControl(""),
      programaSocial: new FormControl(""),
      turno: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      grupoRiesgo: new FormControl(""),
      semanaGestacion:new FormControl(""),
      registroOpcional:new FormControl(""),
      saludMaterna: new FormControl(""),
      conIngEs: new FormControl(""),
      conIngSe: new FormControl(""),
      hb:new FormControl(""),
      fechaHb:new FormControl(""),
      perimetroCefalico:new FormControl(""),
      perimetroAbdominal:new FormControl(""),
      idConsulta:new FormControl(""),

    });
  }

  showFromBDData(){
    console.log(this.data);
    this.formDatos.get('apePaterno').setValue(this.data.apePaterno);
    this.formDatos.get('apeMaterno').setValue(this.data.apeMaterno);
    this.formDatos.get('nombres').setValue(this.data.nombre);

    this.formDatos.get('etnia').setValue(this.data.etnia);
    this.formDatos.get('nroDoc').setValue(this.data.nroDoc);
    this.formDatos.get('tipoDoc').setValue(this.data.tipoDoc);
    this.formDatos.get('nroHcl').setValue(this.data.nroHcl);
    this.formDatos.get('sexo').setValue(this.data.sexo);
    this.formDatos.get('financiamiento').setValue(this.data.financiamiento);
    this.formDatos.get('ccpp').setValue(this.data.ccpp);
    this.formDatos.get('distrito').setValue(this.data.distrito);
    this.formDatos.get('sector').setValue(this.data.sector);
    this.formDatos.get('denominacionEdad').setValue(this.data.denominacionEdad);
    this.formDatos.get('edad').setValue(this.data.edad);
    this.formDatos.get('año').setValue(this.data.anio);
    this.formDatos.get('mes').setValue(this.data.mes);
    this.formDatos.get('dia').setValue(this.data.dia);
    this.formDatos.get('lote').setValue(this.data.lote);
    this.formDatos.get('pagina').setValue(this.data.pagina);
    this.formDatos.get('ipress').setValue(this.data.nombreIpress);

    this.formDatos.get('digitador').setValue(this.data.digitador);
    this.formDatos.get('codigoDigitador').setValue(this.data.codigoDigitador);
    this.formDatos.get('establecimiento').setValue(this.data.establecimiento);
    this.formDatos.get('ups').setValue(this.data.ups);
    this.formDatos.get('nombreProfesional').setValue(this.data.nombreProfesional);
    this.formDatos.get('dniProfesional').setValue(this.data.dniProfesional);
    this.formDatos.get('colegiatura').setValue(this.data.colegiatura);
    this.formDatos.get('actividad').setValue(this.data.actividad);
    this.formDatos.get('upsAux').setValue(this.data.upsAuxiliar);
    this.formDatos.get('codigoPersonal').setValue(this.data.codigoPersonal);
    this.formDatos.get('horaAtencion').setValue(this.data.horaAtencion);
    this.formDatos.get('programaSocial').setValue(this.data.programaSocial);
    this.formDatos.get('turno').setValue(this.data.turno);
    this.formDatos.get('peso').setValue(this.data.peso);
    this.formDatos.get('talla').setValue(this.data.talla);
    this.formDatos.get('grupoRiesgo').setValue(this.data.grupoRiesgo);
    this.formDatos.get('semanaGestacion').setValue(this.data.semanaGestacion);
    this.formDatos.get('registroOpcional').setValue(this.data.registroOpcional);
    this.formDatos.get('saludMaterna').setValue(this.data.saludMaterna);
    this.formDatos.get('conIngEs').setValue(this.data.conIngEs);
    this.formDatos.get('conIngSe').setValue(this.data.conIngSe);
    this.formDatos.get('hb').setValue(this.data.hb);
    this.formDatos.get('fechaHb').setValue(this.data.fechaHb);
    this.formDatos.get('perimetroCefalico').setValue(this.data.perimetroCefalico);
    this.formDatos.get('perimetroAbdominal').setValue(this.data.perimetroAbdominal);
    this.formDatos.get('fechaProceso').setValue(this.data.fechaProceso);
    this.formDatos.get('idConsulta').setValue(this.data.idConsulta);
    let date:Date = this.data.fechaNacimiento;
    console.log("fecha date", date);
    this.formDatos.get('fechaNacimiento').setValue(date);
    this.formDatos.get('fechaUltimaRegla').setValue(this.data.fum);
  }

  getDataToSave(){
    this.data = {
      lote:this.formDatos.value.lote,
      anio:this.formDatos.value.año,
      mes:this.formDatos.value.mes,
      nombreIpress:this.formDatos.value.ipress,
      ups:this.formDatos.value.ups,
      upsAuxiliar:this.formDatos.value.upsAux,
      nombreProfesional:this.formDatos.value.nombreProfesional,
      dniProfesional:this.formDatos.value.dniProfesional,
      colegiatura:this.formDatos.value.colegiatura,
      dia:this.formDatos.value.dia,
      horaAtencion:this.formDatos.value.horaAtencion,
      saludMaterna:this.formDatos.value.saludMaterna,
      conIngEs:this.formDatos.value.conIngEs,
      conIngSe:this.formDatos.value.conIngSe,
      tipoDoc:this.formDatos.value.tipoDoc,
      nroDoc:this.formDatos.value.nroDoc,
      nombre: this.formDatos.value.nombre,
      apePaterno:this.formDatos.value.apePaterno,
      apeMaterno:this.formDatos.value.apeMaterno,
      sexo:this.formDatos.value.sexo,
      etnia:this.formDatos.value.etnia,
      edad:this.formDatos.value.edad,
      denomicacionEdad:this.formDatos.value.denomicacionEdad,
      fechaNacimiento:this.formDatos.value.fechaNacimiento,
      nroHcl:this.formDatos.value.nroHcl,
      ccpp:this.formDatos.value.ccpp,
      distrito:this.formDatos.value.distrito,
      sector:this.formDatos.value.sector,
      financiamiento:this.formDatos.value.financiamiento,
      registroOpcional:this.formDatos.value.registroOpcional,
      grupoRiesgo:this.formDatos.value.grupoRiesgo,
      fum:this.formDatos.value.fum,
      semanaGestacion:this.formDatos.value.semanaGestacion,
      peso:this.formDatos.value.peso,
      talla:this.formDatos.value.talla,
      hb:this.formDatos.value.hb,
      fechaRegistroHB:this.formDatos.value.fechaHb,
      perimetroCefalico:this.formDatos.value.perimetroCefalico,
      perimetroAbdominal:this.formDatos.value.perimetroAbdominal,
      diagnosticos:this.diagnosticos,
      idConsulta:this.formDatos.value.idConsulta
    }
  }

  saveHis() {
    this.getDataToSave();
    this.hisService.saveHis(this.data).subscribe((res: any) => {
      console.log('cod', res.cod);
      if (res.object == null) {
        this.isUpdate=true;
        Swal.fire({
          icon: 'success',
          title: 'Se agrego correctamente este HIS',
          showConfirmButton: false,
          timer: 2000
        });
      }
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  updateHis(){

  }
}
