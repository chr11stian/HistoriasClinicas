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
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-antecedentes-adulto-mayor',
  templateUrl: './antecedentes-adulto-mayor.component.html',
  styleUrls: ['./antecedentes-adulto-mayor.component.css'],
})
export class AntecedentesAdultoMayorComponent implements OnInit {
  dialogTratamientoFrecuente:boolean=false;
  formTratamientoFrecuente:FormGroup;
  formAntecedentes: FormGroup;
  medicamentoFrecuentes: TratamientosFrecuentes[]=[];
  antecedentesFamiliares:AntecedentesFamiliares[]=[];
  antecedentesPersonales:AntecedentesPersonales[]=[];
  descripcionOtrosAntecedentes:string="";
  medicamentoReaccion:string="";
  reaccionAdversa:boolean=false;
  nroDoc='';
  tipoDoc='';
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
    {nombrefamiliar: 'Abuela'},
    {nombrefamiliar: 'Otros'},
  ];
  constructor(private messageService: MessageService,
              private antecedentesService:AdultoMayorService,
              private form:FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.builForm();
  }

  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDoc = params['tipoDoc']
            this.nroDoc = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/adulto-mayor/citas'])
          }
        })
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
      reaccionMedicamento:new FormControl("",[Validators.required])
    })
  }
  obtenerFecha():string{
    const Dates = new Date();
    //Año
    const Year : number = Dates.getFullYear();
    // El subíndice del mes es 0-11
    const Months : any = ( Dates.getMonth() + 1 ) < 10  ?  '0' + (Dates.getMonth() + 1) : ( Dates.getMonth() + 1);
    // Número específico de días
    const Day : any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();

    console.log(Year + '-' + Months + '-' + Day );
    return Year + '-' + Months + '-' + Day;
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
      let aux = {nombre:'HIPERTENSION', valor:false}
      antecedentesPersonales.push(aux);

    }
    /**2**/
    if(hepatitisPersonal)
    {
      let aux = {nombre:'HEPATITIS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'HEPATITIS', valor:false}
      antecedentesPersonales.push(aux);

    }
    /**3**/
    if(diabetesPersonal)
    {
      let aux = {nombre:'DIABETES',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'DIABETES', valor:false}
      antecedentesPersonales.push(aux);

    }
    /**4**/
    if(tuberculosisPersonal)
    {
      let aux = {nombre:'TUBERCULOSIS',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'TUBERCULOSIS', valor:false}
      antecedentesPersonales.push(aux);

    }
    /**5**/
    if(dislipidemiaPersonal)
    {
      let aux = {nombre:'DISLIPIDEMIA (COLESTEROL ALTO)',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'DISLIPIDEMIA (COLESTEROL ALTO)', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**6**/
    if(hospitalizadoPersonal)
    {
      let aux = {nombre:'HOSPITALIZADO ULTIMO AÑO',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'HOSPITALIZADO ULTIMO AÑO', valor:false}
      antecedentesPersonales.push(aux);

    }
    /**7**/
    if(osteoartritisPersonal)
    {
      let aux = {nombre:'OSTEOARTRITIS',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'OSTEOARTRITIS', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**8**/
    if(transfucionesPersonal)
    {
      let aux = {nombre:'TRANSFUCIONES',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'TRANSFUCIONES', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**9**/
    if(derramePersonal)
    {
      let aux = {nombre:'ACV DERRAME CEREBRAL',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'ACV DERRAME CEREBRAL', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**10**/
    if(intervencionPersonal)
    {
      let aux = {nombre:'INTERVENCION QUIRURGICAS',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'INTERVENCION QUIRURGICAS', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**11**/
    if(enfermedadCardiovascular)
    {
      let aux = {nombre:'ENFERMEDAD CARDIOVASCULAR (INFARTO, ARRITMIA, ICC)',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'ENFERMEDAD CARDIOVASCULAR (INFARTO, ARRITMIA, ICC)', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**12**/
    if(accidentes)
    {
      let aux = {nombre:'ACCIDENTES',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'ACCIDENTES', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**13**/
    if(cancer)
    {
      let aux = {nombre:'CANCER',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'CANCER', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**14**/
    if(cancerMama)
    {
      let aux = {nombre:'CANCER DE CERVIX/MAMA',valor:true}
      antecedentesPersonales.push(aux);

    }else{
      let aux = {nombre:'CANCER DE CERVIX/MAMA', valor:false}
      antecedentesPersonales.push(aux);
    }
    /**15**/
    if(cancerProstata)
    {
      let aux = {nombre:'CANCER PROSTATA',valor:true}
      antecedentesPersonales.push(aux);
    }else{
      let aux = {nombre:'CANCER PROSTATA', valor:false}
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

    let infartoAntFamiliar:boolean = this.formAntecedentes.value.infartoAntFamiliar;
    let familiarInfarto:string = this.formAntecedentes.value.familiarInfarto;

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
      let aux = {nombre:'TUBERCULOSIS', valor:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****2****/
    if(hipertensionAntFamiliar)
    {
      let aux = {nombre:'HIPERTENSION ARTERIAL',valor:true, familiar:hipertensionFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'HIPERTENSION ARTERIAL', valor:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****3****/
    if(diabetesAntFamiliar)
    {
      let aux = {nombre:'DIABETES',valor:true, familiar:diabetesFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'DIABETES', valor:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /****4****/
    if(demenciaAntFamiliar)
    {
      let aux = {nombre:'DEMENCIA',valor:true, familiar:demenciaFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'DEMENCIA', valor:false,familiar:''}
      antecedentesFamiliares.push(aux);
    }
    /****5****/
    if(infartoAntFamiliar)
    {
      let aux = {nombre:'INFARTO',valor:true, familiar:familiarInfarto}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'INFARTO', valor:false,familiar:''}
      antecedentesFamiliares.push(aux);
    }
    /****6****/
    if(cancerMamaAntFamiliar)
    {
      let aux = {nombre:'CANCER DE MAMA',valor:true, familiar:cancerMamaFamiliar}
      antecedentesFamiliares.push(aux);

    }else{
      let aux = {nombre:'CANCER DE MAMA', valor:false, familiar:''}
      antecedentesFamiliares.push(aux);

    }
    /********  descripcion **************/
    let descripcion = this.formAntecedentes.value.antecedentesOtros;
    console.log("descripcion modal", descripcion);
    /******** Reaccion adversa ***********/
    let reaccion: boolean = this.formAntecedentes.value.reaccionAdversa;
    this.antecedentesFamiliares = antecedentesFamiliares;
    console.log("antecedentes Familiares",antecedentesFamiliares);
    this.antecedentesPersonales = antecedentesPersonales;
    console.log("descripcion "+this.descripcionOtrosAntecedentes);
    this.descripcionOtrosAntecedentes = descripcion;
    this.medicamentoReaccion = this.formAntecedentes.value.reaccionMedicamento;
    this.reaccionAdversa = this.formAntecedentes.value.reaccionAdversa;
}
  agregarAntecedentes(){
      this.recuperarAntecedentes();
      let fecha=this.obtenerFecha();
      console.log(fecha);
      let cadena = {
        fecha: this.obtenerFecha(),
        antecedentesPersonales: this.antecedentesPersonales,
        antecedentesFamiliares: this.antecedentesFamiliares,
        descripcionAntecedentesOtros: this.descripcionOtrosAntecedentes,
        medicamentosFrecuentes:this.medicamentoFrecuentes,
        medicamentoReaccion:this.medicamentoReaccion,
        reaccionAdversa:this.reaccionAdversa
      }
      this.antecedentesService.postAntecedentesAdultoMayorByDoc(this.tipoDoc,this.nroDoc,cadena).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        console.log('se guardo correctamente cade ', cadena);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });

  }

  openNew(){
    this.formTratamientoFrecuente.reset();
    this.dialogTratamientoFrecuente = true;
  }
  saveTratamientos(){
    let tratamientoFrecuente :TratamientosFrecuentes=
        {
          nombre:this.formTratamientoFrecuente.value.nombre,
          dosis:this.formTratamientoFrecuente.value.dosis,
          observaciones:this.formTratamientoFrecuente.value.observaciones
        }
        console.log(tratamientoFrecuente);
    this.medicamentoFrecuentes.push(tratamientoFrecuente);
    this.dialogTratamientoFrecuente=false;
  }
  openDialogEditarTratamientosfrec(rowData: any, rowIndex: any) {
    let aux ={

    }
  }
  eliminarTratamientoFrecuente(rowIndex: any) {

  }
  recuperarDataAntecedentesBD(){
    this.antecedentesService.getAntecedentesAdultoMayorByDoc(this.tipoDoc,this.nroDoc).subscribe((res: any) => {
     if(res.object!=null){
       console.log('se recupero datos satisfactoriamente', res.object);
       this.antecedentesFamiliares=res.object.antecedentesFamiliares;
       this.antecedentesPersonales=res.object.antecedentesPersonales;
       this.descripcionOtrosAntecedentes=res.object.descripcionAntecedentesOtros;
       this.reaccionAdversa=res.object.reaccionAdversa;
       this.medicamentoReaccion=res.object.medicamentoReaccion;
       // this.medicamentoFrecuentes = res.object.medicamentoFrecuentes;
       console.log(this.antecedentesPersonales);
       console.log(this.antecedentesFamiliares);
       console.log(this.descripcionOtrosAntecedentes);
       console.log(this.reaccionAdversa);
       console.log(this.medicamentoReaccion);
       /*************LLENAR CAMPOS RECUPERADOS DE LA BD**************/
       /*************DESCRIPCION OTROS ANTECEDENTES******************/

       this.formAntecedentes.get('antecedentesOtros').setValue(this.descripcionOtrosAntecedentes);
       /**************RECUPERAR TRATAMIENTO FRECUENTE*****************/
       console.log(res.object.medicamentosFrecuentes);
       for(let i=0;i<res.object.medicamentosFrecuentes.length;i++){
         this.medicamentoFrecuentes.push(res.object.medicamentosFrecuentes[i]);
       }
       /*************ANTECEDENTES PERSONALES*************************/
       let aux1=this.antecedentesPersonales[0].valor;
       console.log(aux1);
       let aux2=this.antecedentesPersonales[1].valor;
       console.log(aux2);
       let aux3=this.antecedentesPersonales[2].valor;
       console.log(aux3);
       let aux4=this.antecedentesPersonales[3].valor;
       console.log(aux4);
       let aux5=this.antecedentesPersonales[4].valor;
       console.log(aux5);
       let aux6=this.antecedentesPersonales[5].valor;
       console.log(aux6);
       let aux7=this.antecedentesPersonales[6].valor;
       console.log(aux7);
       let aux8=this.antecedentesPersonales[7].valor;
       console.log(aux8);
       let aux9=this.antecedentesPersonales[8].valor;
       console.log(aux9);
       let aux10=this.antecedentesPersonales[9].valor;
       console.log(aux10);
       let aux11=this.antecedentesPersonales[10].valor;
       console.log(aux11);
       let aux12=this.antecedentesPersonales[11].valor;
       console.log(aux12);
       let aux13=this.antecedentesPersonales[12].valor;
       console.log(aux13);
       let aux14=this.antecedentesPersonales[13].valor;
       console.log(aux14);
       let aux15=this.antecedentesPersonales[14].valor;
       console.log(aux15);
       if(aux1==true)
         this.formAntecedentes.get('hipertension').setValue(true);
       else{
         this.formAntecedentes.get('hipertension').setValue(false);
       }
       if(aux2==true)
         this.formAntecedentes.get('hepatitis').setValue(true);
       else{
         this.formAntecedentes.get('hepatitis').setValue(false);
       }
       if(aux3==true)
         this.formAntecedentes.get('diabetes').setValue(true);
       else{
         this.formAntecedentes.get('diabetes').setValue(false);
       }
       if(aux4==true)
         this.formAntecedentes.get('tuberculosis').setValue(true);
       else{
         this.formAntecedentes.get('tuberculosis').setValue(false);
       }
       if(aux5==true)
         this.formAntecedentes.get('dislipidemias').setValue(true);
       else{
         this.formAntecedentes.get('dislipidemias').setValue(false);
       }
       if(aux6==true)
         this.formAntecedentes.get('hospitalizado').setValue(true);
       else{
         this.formAntecedentes.get('hospitalizado').setValue(false);
       }
       if(aux7==true)
         this.formAntecedentes.get('osteoartritis').setValue(true);
       else{
         this.formAntecedentes.get('osteoartritis').setValue(false);
       }
       if(aux8==true)
         this.formAntecedentes.get('transfuciones').setValue(true);
       else{
         this.formAntecedentes.get('transfuciones').setValue(false);
       }
       if(aux9==true)
         this.formAntecedentes.get('derrame').setValue(true);
       else{
         this.formAntecedentes.get('derrame').setValue(false);
       }
       if(aux10==true)
         this.formAntecedentes.get('intervencion').setValue(true);
       else{
         this.formAntecedentes.get('intervencion').setValue(false);
       }
       if(aux11==true)
         this.formAntecedentes.get('enfermedadCardio').setValue(true);
       else{
         this.formAntecedentes.get('enfermedadCardio').setValue(false);
       }
       if(aux12==true)
         this.formAntecedentes.get('accidentes').setValue(true);
       else{
         this.formAntecedentes.get('accidentes').setValue(false);
       }
       if(aux13==true)
         this.formAntecedentes.get('cancer').setValue(true);
       else{
         this.formAntecedentes.get('cancer').setValue(false);
       }
       if(aux14==true)
         this.formAntecedentes.get('cancerMama').setValue(true);
       else{
         this.formAntecedentes.get('cancerMama').setValue(false);
       }
       if(aux15==true)
         this.formAntecedentes.get('cancerProstata').setValue(true);
       else{
         this.formAntecedentes.get('cancerProstata').setValue(false);
       }
       /*************ANTECEDENTES FAMILIARES*************************/
       let aux01=this.antecedentesFamiliares[0].valor;
       console.log(aux01);
       let aux02=this.antecedentesFamiliares[1].valor;
       console.log(aux02);
       let aux03=this.antecedentesFamiliares[2].valor;
       console.log(aux03);
       let aux04=this.antecedentesFamiliares[3].valor;
       console.log(aux04);
       let aux05=this.antecedentesFamiliares[4].valor;
       console.log(aux05);
       let aux06=this.antecedentesFamiliares[5].valor;
       console.log(aux06);

       if(aux01==true) {
         this.formAntecedentes.get('tuberculosisAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarTuberculosis').setValue(this.antecedentesFamiliares[0].familiar);
       }else{
         this.formAntecedentes.get('tuberculosisAntFamiliar').setValue(false);
       }
       if(aux02==true) {
         this.formAntecedentes.get('hipertensionAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarHipertension').setValue(this.antecedentesFamiliares[1].familiar);
       }else{
         this.formAntecedentes.get('hipertensionAntFamiliar').setValue(false);
       }
       if(aux03==true) {
         this.formAntecedentes.get('diabetesAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarDiabetes').setValue(this.antecedentesFamiliares[2].familiar);
       }else{
         this.formAntecedentes.get('diabetesAntFamiliar').setValue(false);
       }
       if(aux04==true) {
         this.formAntecedentes.get('infartoAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarInfarto').setValue(this.antecedentesFamiliares[3].familiar);
       }else{
         this.formAntecedentes.get('infartoAntFamiliar').setValue(false);
       }
       if(aux05==true) {
         this.formAntecedentes.get('demenciaAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarDemencia').setValue(this.antecedentesFamiliares[4].familiar);
       }else{
         this.formAntecedentes.get('demenciaAntFamiliar').setValue(false);
       }
       if(aux06==true) {
         this.formAntecedentes.get('cancerMamaAntFamiliar').setValue(true);
         this.formAntecedentes.get('familiarCancerMama').setValue(this.antecedentesFamiliares[5].familiar);
       }else{
         this.formAntecedentes.get('cancerMamaAntFamiliar').setValue(false);
       }
       this.formAntecedentes.get('reaccionMedicamento').setValue(this.medicamentoReaccion);
       this.formAntecedentes.get('reaccionAdversa').setValue(this.reaccionAdversa);
       this.messageService.add({
         severity: "success",
         summary: "Exito",
         detail: res.mensaje
       });
     }
     else{
       this.messageService.add({
         severity: "warn",
         summary: "Error",
         detail: "No hay registro en Antecedentes, ingrese uno."
       });
     }



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
