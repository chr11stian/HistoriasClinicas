import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HISService} from "../services/services.service";
import Swal from "sweetalert2";
import {DatePipe, Location} from "@angular/common";

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
  idHis:string="";
  datePipe = new DatePipe('en-US');
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
      {name: 'R', value: 'R'},
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
    // this.datos = JSON.parse(localStorage.getItem("hisGenerateDocument"));
    this.datos = JSON.parse(localStorage.getItem("hisDocument"));
    console.log(this.datos);

  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.datos);
    console.log(this.datos.estadoG);
    if(this.datos.idHis){
      this.isUpdate=true;
      this.idHis=this.datos.id;
      this.recuperarHisUpsAuxPorId();
    }
    else{
      this.isUpdate=false;
      this.getGenerateHisUpsAux();
    }
  }

  recuperarHisUpsAuxPorId(){
    this.hisService.getListaHisGeneradosPorId(this.datos.idHis).subscribe((res: any) => {
      if(res.object!=null){
        console.log("DATA DE HIS YA CREADO"+res.object);
        this.data = res.object;
        this.idHis=res.object.id;
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
        console.log("DATA DE GENERAR HIS" +res.object);
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
      apePaterno: new FormControl({value:"",disabled:true}),
      apeMaterno: new FormControl({value:"",disabled:true}),
      nombres: new FormControl({value:"",disabled:true}),
      fechaNacimiento: new FormControl({value:"",disabled:true}),
      fum: new FormControl({value:"",disabled:true}),
      etnia: new FormControl(""),
      nroDoc: new FormControl({value:"",disabled:true}),
      tipoDoc:new FormControl({value:"",disabled:true}),
      nroHcl:new FormControl({value:"",disabled:true}),
      sexo:new FormControl({value:"",disabled:true}),
      financiamiento: new FormControl(""),
      ccpp: new FormControl({value:"",disabled:true}),
      distrito: new FormControl({value:"",disabled:true}),
      sector: new FormControl(""),
      denominacionEdad: new FormControl({value:"",disabled:true}),
      edad: new FormControl({value:"",disabled:true}),
      año: new FormControl({value:"",disabled:true}),
      mes: new FormControl({value:"",disabled:true}),
      dia: new FormControl({value:"",disabled:true}),
      // lote: new FormControl(""),
      // pagina: new FormControl(""),
      ipress:new FormControl({value:"",disabled:true}),
      fechaProceso:new FormControl(""),
      // digitador: new FormControl(""),
      // codigoDigitador: new FormControl(""),
      // establecimiento: new FormControl(""),
      ups: new FormControl({value:"",disabled:true}),
      nombreProfesional : new FormControl({value:"",disabled:true}),
      dniProfesional: new FormControl({value:"",disabled:true}),
      colegiatura: new FormControl({value:"",disabled:true}),
      actividad: new FormControl(""),
      upsAux: new FormControl({value:"",disabled:true}),
      codigoPersonal: new FormControl({value:"",disabled:true}),
      horaAtencion: new FormControl({value:"",disabled:true}),
      // programaSocial: new FormControl(""),
      turno: new FormControl(""),
      peso: new FormControl({value:"",disabled:true}),
      talla: new FormControl({value:"",disabled:true}),
      grupoRiesgo: new FormControl(""),
      semanaGestacion:new FormControl({value:"",disabled:true}),
      registroOpcional:new FormControl(""),
      saludMaterna: new FormControl(""),
      conIngEs: new FormControl(""),
      conIngSe: new FormControl(""),
      hb:new FormControl({value:"",disabled:true}),
      fechaHb:new FormControl({value:"",disabled:true}),
      perimetroCefalico:new FormControl(""),
      perimetroAbdominal:new FormControl(""),
      idConsulta:new FormControl(""),

    });
  }

  showFromBDData(){
    console.log(this.data);
    // console.log(this.convetirMesATexto(this.data.mes));
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
    this.formDatos.get('mes').setValue(this.convetirMesATexto(this.data.mes));
    this.formDatos.get('dia').setValue(this.data.dia);
    // this.formDatos.get('lote').setValue(this.data.lote);
    // this.formDatos.get('pagina').setValue(this.data.pagina);
    this.formDatos.get('ipress').setValue(this.data.nombreIpress);
    // this.formDatos.get('digitador').setValue(this.data.digitador);
    // this.formDatos.get('codigoDigitador').setValue(this.data.codigoDigitador);
    // this.formDatos.get('establecimiento').setValue(this.data.establecimiento);
    this.formDatos.get('ups').setValue(this.data.ups);
    this.formDatos.get('nombreProfesional').setValue(this.data.nombreProfesional);
    this.formDatos.get('dniProfesional').setValue(this.data.dniProfesional);
    this.formDatos.get('colegiatura').setValue(this.data.colegiatura);
    this.formDatos.get('actividad').setValue(this.data.actividad);
    this.formDatos.get('upsAux').setValue(this.data.upsAuxiliar);
    this.formDatos.get('codigoPersonal').setValue(this.data.codigoPersonal);
    this.formDatos.get('horaAtencion').setValue(this.data.horaAtencion);
    // this.formDatos.get('programaSocial').setValue(this.data.programaSocial);
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
    this.formDatos.get('fechaHb').setValue(this.datePipe.transform(this.data.fechaHb, 'yyyy-MM-dd'));
    this.formDatos.get('perimetroCefalico').setValue(this.data.perimetroCefalico);
    this.formDatos.get('perimetroAbdominal').setValue(this.data.perimetroAbdominal);
    this.formDatos.get('idConsulta').setValue(this.data.idConsulta);
    this.formDatos.get('fechaNacimiento').setValue(this.datePipe.transform(this.data.fechaNacimiento, 'yyyy-MM-dd HH:mm:ss'));
    console.log(this.datePipe.transform(this.data.fechaProceso, 'yyyy-MM-dd'));
    this.formDatos.get('fechaProceso').setValue(this.datePipe.transform(this.data.fechaProceso, 'yyyy-MM-dd'));
    this.formDatos.get('fum').setValue(this.datePipe.transform(this.data.fum, 'yyyy-MM-dd'));
    // console.log("fecha date", dateFum);
  }

  convetirMesATexto(mes:any):string{
    console.log(mes);
    if(mes=='1' || mes =='ENERO'){
      console.log(mes);
      return "ENERO";
    }
    else if(mes=='2' || mes =='FEBRERO') return "FEBRERO"
    else if (mes=='3' || mes =='MARZO') return "MARZO"
    else if (mes=='4' || mes =='ABRIL') return  "ABRIL"
    else if(mes=='5' || mes =='MAYO') return "MAYO"
    else if(mes=='6' || mes =='JUNIO') return  "JUNIO"
    else if(mes=='7' || mes =='JULIO') return  "JULIO"
    else if(mes=='8' || mes =='AGOSTO') return  "AGOSTO"
    else if(mes=='9' || mes =='SETIEMBRE') return  "SETIEMBRE"
    else if(mes=='10' || mes =='OCTUBRE') return  "OCTUBRE"
    else if(mes=='11' || mes =='NOVIEMBRE') return  "NOVIEMBRE"
    else return "DICIEMBRE"
  }
  getDataToSave(){
    console.log(this.datePipe.transform(this.formDatos.getRawValue().fum,'yyyy-MM-dd'));
    let dateNac=new Date(this.formDatos.getRawValue().fechaNacimiento);
    console.log('fecha nac',dateNac);
    this.data = {
      fechaProceso:this.datePipe.transform(this.formDatos.getRawValue().fechaProceso,'yyyy-MM-dd'),
      programaSocial:this.formDatos.getRawValue().programaSocial,
      anio:this.formDatos.getRawValue().año,
      turno:this.formDatos.getRawValue().turno,
      actividad:this.formDatos.getRawValue().actividad,
      mes:this.formDatos.getRawValue().mes,
      nombreIpress:this.formDatos.getRawValue().ipress,
      ups:this.formDatos.getRawValue().ups,
      upsAuxiliar:this.formDatos.getRawValue().upsAux,
      nombreProfesional:this.formDatos.getRawValue().nombreProfesional,
      dniProfesional:this.formDatos.getRawValue().dniProfesional,
      colegiatura:this.formDatos.getRawValue().colegiatura,
      dia:this.formDatos.getRawValue().dia,
      horaAtencion:this.formDatos.getRawValue().horaAtencion,
      saludMaterna:this.formDatos.getRawValue().saludMaterna,
      conIngEs:this.formDatos.getRawValue().conIngEs,
      conIngSe:this.formDatos.getRawValue().conIngSe,
      tipoDoc:this.formDatos.getRawValue().tipoDoc,
      nroDoc:this.formDatos.getRawValue().nroDoc,
      nombre: this.formDatos.getRawValue().nombres,
      apePaterno:this.formDatos.getRawValue().apePaterno,
      apeMaterno:this.formDatos.getRawValue().apeMaterno,
      sexo:this.formDatos.getRawValue().sexo,
      etnia:this.formDatos.getRawValue().etnia,
      edad:this.formDatos.getRawValue().edad,
      denominacionEdad:this.formDatos.getRawValue().denominacionEdad,

      fechaNacimiento:this.datePipe.transform(this.formDatos.getRawValue().fechaNacimiento,'yyyy-MM-ddTHH:mm:ss'),
      nroHcl:this.formDatos.getRawValue().nroHcl,
      ccpp:this.formDatos.getRawValue().ccpp,
      distrito:this.formDatos.getRawValue().distrito,
      sector:this.formDatos.getRawValue().sector,
      financiamiento:this.formDatos.getRawValue().financiamiento,
      registroOpcional:this.formDatos.getRawValue().registroOpcional,
      grupoRiesgo:this.formDatos.getRawValue().grupoRiesgo,
      fum:this.datePipe.transform(this.formDatos.getRawValue().fum,'yyyy-MM-dd'),
      semanaGestacion:this.formDatos.getRawValue().semanaGestacion,
      peso:this.formDatos.getRawValue().peso,
      talla:this.formDatos.getRawValue().talla,
      hb:this.formDatos.getRawValue().hb,
      fechaRegistroHB:this.datePipe.transform(this.formDatos.getRawValue().fechaHb,'yyyy-MM-dd'),
      perimetroCefalico:this.formDatos.getRawValue().perimetroCefalico,
      perimetroAbdominal:this.formDatos.getRawValue().perimetroAbdominal,
      diagnosticos:this.diagnosticos,
      idConsulta:this.formDatos.getRawValue().idConsulta
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
    this.getDataToSave();
    this.hisService.updateHis(this.idHis,this.data).subscribe((res: any) => {
      console.log('cod', res.cod);
      if (res.object == null) {
        this.isUpdate=true;
        Swal.fire({
          icon: 'success',
          title: 'Se actualizo correctamente este HIS',
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
}
