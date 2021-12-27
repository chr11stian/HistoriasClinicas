import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AntecedentesFamiliares,
  AntecedentesPersonales,
  TratamientosFrecuentes
} from "../models/plan-atencion-adulto-mayor.model";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";
import {AdultoMayorService} from "../../services/adulto-mayor.service";

@Component({
  selector: 'app-antecedentes-adulto-mayor',
  templateUrl: './antecedentes-adulto-mayor.component.html',
  styleUrls: ['./antecedentes-adulto-mayor.component.css']
})
export class AntecedentesAdultoMayorComponent implements OnInit {
  dialogTratamientoFrecuente:boolean=false;
  formTratamientoFrecuente:FormGroup;
  formAntecedentes: FormGroup;
  medicamentoFrecuentes: TratamientosFrecuentes;
  antecedentesFamiliares:AntecedentesFamiliares[]=[];
  antecedentesPersonales:AntecedentesPersonales[]=[];
  descripcionOtrosAntecedentes:string="";
  nroDoc='10101013';
  tipoDoc='DNI';
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  familiares = [
    {nombrefamiliar: 'Padre'},
    {nombrefamiliar: 'Madre'},
    {nombrefamiliar: 'Hermano'},
    {nombrefamiliar: 'Hermana'},
    {nombrefamiliar: 'Abuelo'},
    {nombrefamiliar: 'Otros'},
  ];
  constructor(private messageService: MessageService,
              private antecedentesService:AdultoMayorService,
              private form:FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
    this.recuperarDataAntecedentesBD();
  }

  builForm() {
    this.formTratamientoFrecuente = this.form.group({
      nombre:new FormControl("",[Validators.required]),
      dosis:new FormControl("",[Validators.required]),
      observaciones:new FormControl("",[Validators.required])
    }),
    this.formAntecedentes = this.form.group({
      hipertension:new FormControl("",[Validators.required]),
      hepatitis:new FormControl("",[Validators.required]),
      diabetes:new FormControl("",[Validators.required]),
      tuberculosis:new FormControl("",[Validators.required]),
      dislipidemias:new FormControl("",[Validators.required]),
      hospitalizado:new FormControl("",[Validators.required]),
      osteoartritis:new FormControl("",[Validators.required]),
      transfuciones:new FormControl("",[Validators.required]),
      derrame:new FormControl("",[Validators.required]),
      intervencion:new FormControl("",[Validators.required]),
      enfermedadCardio:new FormControl("",[Validators.required]),
      accidentes:new FormControl("",[Validators.required]),
      cancer:new FormControl("",[Validators.required]),
      cancerMama:new FormControl("",[Validators.required]),
      cancerProstata:new FormControl("",[Validators.required]),
      tuberculosisAntFamiliar:new FormControl("",[Validators.required]),
      familiarTuberculosis:new FormControl("",[Validators.required]),
      hipertensionAntFamiliar:new FormControl("",[Validators.required]),
      familiarHipertension:new FormControl("",[Validators.required]),
      diabetesAntFamiliar:new FormControl("",[Validators.required]),
      familiarDiabetes:new FormControl("",[Validators.required]),
      infartoAntFamiliar:new FormControl("",[Validators.required]),
      familiarInfarto:new FormControl("",[Validators.required]),
      demenciaAntFamiliar:new FormControl("",[Validators.required]),
      familiarDemencia:new FormControl("",[Validators.required]),
      cancerMamaAntFamiliar:new FormControl("",[Validators.required]),
      familiarCancerMama:new FormControl("",[Validators.required]),
      antecedentesOtros:new FormControl("",[Validators.required]),
      reaccionAdversa:new FormControl("",[Validators.required]),
    })
  }
  openNew(){
    this.formTratamientoFrecuente.reset();
    this.dialogTratamientoFrecuente = true;
  }
  recuperarAntecedentes(){
    /************** Antecedents personales *******************/
    let antecedentesPersonales:AntecedentesPersonales[]=[];
    let hipertensionPersonal:boolean = this.formAntecedentes.value.hipertension;
    console.log(hipertensionPersonal);
    let hepatitisPersonal:boolean = this.formAntecedentes.value.hepatitis;
    let diabetesPersonal:boolean = this.formAntecedentes.value.diabetes;
    let tuberculosisPersonal:boolean = this.formAntecedentes.value.tuberculosis;
    let dislipidemiaPersonal:boolean = this.formAntecedentes.value.dislipidemias;
    let hospitalizadoPersonal:boolean = this.formAntecedentes.value.hospitalizado;
    let osteoartritisPersonal:boolean = this.formAntecedentes.value.osteoartritis;
    let transfucionesPersonal:boolean = this.formAntecedentes.value.transfuciones;
    let derramePersonal:boolean = this.formAntecedentes.value.derrame;
    let intervencionPersonal:boolean = this.formAntecedentes.value.intervencion;
    let enfermedadCardiovascular:boolean = this.formAntecedentes.value.enfermedadCardio;
    let accidentes:boolean = this.formAntecedentes.value.accidentes;
    let cancer:boolean = this.formAntecedentes.value.cancer;
    let cancerMama:boolean = this.formAntecedentes.value.cancerMama;
    let cancerProstata:boolean = this.formAntecedentes.value.cancerProstata;
    /**1**/
    if(hipertensionPersonal)
    {
      let aux = {nombre:'HIPERTENSION',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'HIPERTENSION', value:false}
      antecedentesPersonales.push(aux);

    }
    /**2**/
    if(hepatitisPersonal)
    {
      let aux = {nombre:'HEPATITIS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'HEPATITIS', value:false}
      antecedentesPersonales.push(aux);

    }
    /**3**/
    if(diabetesPersonal)
    {
      let aux = {nombre:'DIABETES',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'DIABETES', value:false}
      antecedentesPersonales.push(aux);

    }
    /**4**/
    if(tuberculosisPersonal)
    {
      let aux = {nombre:'TUBERCULOSIS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'TUBERCULOSIS', value:false}
      antecedentesPersonales.push(aux);

    }
    /**5**/
    if(dislipidemiaPersonal)
    {
      let aux = {nombre:'DISLIPIDEMIA (COLESTEROL ALTO)',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'DISLIPIDEMIA (COLESTEROL ALTO)', value:false}
      antecedentesPersonales.push(aux);

    }
    /**6**/
    if(hospitalizadoPersonal)
    {
      let aux = {nombre:'HOSPITALIZADO ULTIMO AÑO',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'HOSPITALIZADO ULTIMO AÑO', value:false}
      antecedentesPersonales.push(aux);

    }
    /**7**/
    if(osteoartritisPersonal)
    {
      let aux = {nombre:'OSTEOARTRITIS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'OSTEOARTRITIS', value:false}
      antecedentesPersonales.push(aux);

    }
    /**8**/
    if(transfucionesPersonal)
    {
      let aux = {nombre:'TRANSFUCIONES',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'TRANSFUCIONES', value:false}
      antecedentesPersonales.push(aux);

    }
    /**9**/
    if(derramePersonal)
    {
      let aux = {nombre:'ACV DERRAME CEREBRAL',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'ACV DERRAME CEREBRAL', value:false}
      antecedentesPersonales.push(aux);

    }
    /**10**/
    if(intervencionPersonal)
    {
      let aux = {nombre:'INTERVENCION QUIRURGICAS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'INTERVENCION QUIRURGICAS', value:false}
      antecedentesPersonales.push(aux);

    }
    /**11**/
    if(enfermedadCardiovascular)
    {
      let aux = {nombre:'ENFERMEDAD CARDIOVASCULAR (INFARTO, ARRITMIA, ICC)',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'ENFERMEDAD CARDIOVASCULAR (INFARTO, ARRITMIA, ICC)', value:false}
      antecedentesPersonales.push(aux);

    }
    /**12**/
    if(accidentes)
    {
      let aux = {nombre:'ACCIDENTES',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'ACCIDENTES', value:false}
      antecedentesPersonales.push(aux);

    }
    /**13**/
    if(cancer)
    {
      let aux = {nombre:'CANCER',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'CANCER', value:false}
      antecedentesPersonales.push(aux);

    }
    /**14**/
    if(cancerMama)
    {
      let aux = {nombre:'CANCER DE CERVIX/MAMA',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'CANCER DE CERVIX/MAMA', value:false}
      antecedentesPersonales.push(aux);

    }
    /**15**/
    if(cancerProstata)
    {
      let aux = {nombre:'CANCER PROSTATA',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'CANCER PROSTATA', value:false}
      antecedentesPersonales.push(aux);

    }

    /************** Antecedents familiares *******************/
    let antecedentesFamiliares:AntecedentesFamiliares[]=[];
    let tuberculosisAntFamiliar:boolean = this.formAntecedentes.value.tuberculosisAntFamiliar;
    let tuberculosisFamiliar:string = this.formAntecedentes.value.familiarTuberculosis;
    let hipertensionAntFamiliar:boolean = this.formAntecedentes.value.hipertensionAntFamiliar;
    let hipertensionFamiliar:string = this.formAntecedentes.value.familiarHipertension;
    let diabetesAntFamiliar:boolean = this.formAntecedentes.value.diabetesAntFamiliar;
    let diabetesFamiliar:string = this.formAntecedentes.value.familiarDiabetes;
    let demenciaAntFamiliar:boolean = this.formAntecedentes.value.demenciaAntFamiliar;
    let demenciaFamiliar:string = this.formAntecedentes.value.familiarDemencia;
    let cancerMamaAntFamiliar:boolean = this.formAntecedentes.value.cancerMamaAntFamiliar;
    let cancerMamaFamiliar:string = this.formAntecedentes.value.familiarCancerMama;

    /****1****/
    if(tuberculosisAntFamiliar)
    {
      let aux = {nombre:'TUBERCULOSIS',valor:true, familiar:tuberculosisFamiliar}
      antecedentesFamiliares.push(aux);
    }else{
      let aux = {nombre:'TUBERCULOSIS', value:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****2****/
    if(hipertensionAntFamiliar)
    {
      let aux = {nombre:'HIPERTENSION ARTERIAL',valor:true, familiar:hipertensionFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'HIPERTENSION ARTERIAL', value:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****3****/
    if(diabetesAntFamiliar)
    {
      let aux = {nombre:'DIABETES',valor:true, familiar:diabetesFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'DIABETES', value:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****4****/
    if(demenciaAntFamiliar)
    {
      let aux = {nombre:'DEMENCIA',valor:true, familiar:demenciaFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'DEMENCIA', value:false,familiar:''}
      antecedentesFamiliares.push(aux);
    }
    /****5****/
    if(cancerMamaAntFamiliar)
    {
      let aux = {nombre:'CANCER DE MAMA',valor:true, familiar:cancerMamaFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'CANCER DE MAMA', value:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /********  descripcion **************/
    let descripcion = this.formAntecedentes.value.descripcion;
    /******** Reaccion adversa ***********/
    let reaccion: boolean = this.formAntecedentes.value.reaccionAdversa;
    this.antecedentesFamiliares = antecedentesFamiliares;
    this.antecedentesPersonales = antecedentesPersonales;
    this.descripcionOtrosAntecedentes = descripcion;
  }
  agregarAntecedentes(){

    if(this.antecedentesPersonales!=null && this.antecedentesFamiliares!= null && this.descripcionOtrosAntecedentes!=null){
      this.recuperarAntecedentes();
      let fecha=new Date().toLocaleDateString();
      console.log(fecha);
      let cadena = {
        fecha: "2021-12-06",
        antecedentesPersonales: this.antecedentesPersonales,
        antecedentesFamiliares: this.antecedentesFamiliares,
        descripcionAntecedentesOtros: this.descripcionOtrosAntecedentes
      }
      this.antecedentesService.postAntecedentesAdultoMayorByDoc(this.tipoDoc,this.nroDoc,cadena).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });
    }
  }
  saveTratamientos(){

  }
  openDialogEditarTratamientosfrec(rowData: any, rowIndex: any) {

  }

  eliminarTratamientoFrecuente(rowIndex: any) {

  }
  recuperarDataAntecedentesBD(){
    this.antecedentesService.getAntecedentesAdultoMayorByDoc(this.tipoDoc,this.nroDoc).subscribe((res: any) => {
      console.log('se recupero datos satisfactoriamente', res.object);
      // console.log(res.object.antecedentesFamiliares[0]);

      // if(res.object.antecedentesFamiliares[0]!= null) {
      //     this.antecedentesFamiliares = res.object.antecedentesFamiliares[0];
      //   }
      //   if(res.object.antecedentesPersonales[0]!=null){
      //     this.antecedentesPersonales = res.object.antecedentesPersonales[0];
      //   }
      //   if(res.object.descripcionOtrosAntecedentes!=null){
      //     this.descripcionOtrosAntecedentes = res.object.descripcionOtrosAntecedentes;
      //   }
      //   console.log(this.antecedentesPersonales);
      //   console.log(this.antecedentesFamiliares);
      //   console.log(this.descripcionOtrosAntecedentes);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });
}
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogTratamientoFrecuente = false;
    }
}
