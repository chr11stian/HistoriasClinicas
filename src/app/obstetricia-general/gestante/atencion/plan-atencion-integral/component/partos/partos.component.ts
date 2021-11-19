import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import {PartoAbortoService} from "../../services/parto-aborto/parto-aborto.service";

@Component({
  selector: "app-partos",
  templateUrl: "./partos.component.html",
  styleUrls: ["./partos.component.css"],
})
export class PartosComponent implements OnInit {
  treeOptionsOptions: any[];
  twoOptions: any[];
  TFOptions:any[];
  myGroup: FormGroup;
  medicacionList=[{ medicacion:'medicacion1'},{medicacion:'medicacion2'},{medicacion:'medicacion3'}]
  medicamentoList=[{ medicamento:'medicamento1'},{medicamento:'medicamento2'}]

  constructor(public fb: FormBuilder,
              private partoAbortoService:PartoAbortoService) {
    this.twoOptions = [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
    ];
    this.treeOptionsOptions = [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: ".", value: "no aplica" },
    ];
    this.TFOptions=[
      {label :"Si",value:true},
      {label:"No",value:false}
    ]
    this.buildForm();
  }
  buildForm() {
    this.myGroup = new FormGroup({
      hcmp: new FormControl("", [Validators.required]),
      pc: new FormControl("", [Validators.required]),
      orden: new FormControl("", Validators.required),
      ingresoEstablecimientoPartoFecha: new FormControl("", Validators.required),
      referenciaIngreso: new FormControl("", Validators.required),
      pulsoMaterno: new FormControl("", Validators.required),
      presionArterial: new FormControl("", Validators.required),
      frecuenciaRespiratoria: new FormControl("", Validators.required),
      temperatura: new FormControl("", Validators.required),
      peso: new FormControl("", Validators.required),
      eg: new FormControl("", Validators.required),
      situacion: new FormControl("", Validators.required),
      posicion: new FormControl("", Validators.required),
      tamanoFetalAcorde: new FormControl("", Validators.required),
      inicio: new FormControl("", Validators.required),
      dilatacion: new FormControl("", Validators.required),
      presentacion: new FormControl("", Validators.required),
      alturaUterina: new FormControl("", Validators.required),
      fcf: new FormControl("", Validators.required),
      menbranas: new FormControl("", Validators.required),
      liquidoAmniotico: new FormControl("", Validators.required),
      fechaRuptura: new FormControl("", Validators.required),
      anasarca: new FormControl("", Validators.required),
      cianosis: new FormControl("", Validators.required),
      escotomas: new FormControl("", Validators.required),
      epigastralgia: new FormControl("", Validators.required),
      dolorDerecho: new FormControl("", Validators.required),
      hermaturia: new FormControl("", Validators.required),
      hipoOrtostatica: new FormControl("", Validators.required),
      ictericia: new FormControl("", Validators.required),
      petequies: new FormControl("", Validators.required),
      proteuniria: new FormControl("", Validators.required),
      corticoidesAntenatales: new FormControl("", Validators.required),
      semanaInicio: new FormControl("", Validators.required),
      cesaria: new FormControl("", Validators.required),
      aborto: new FormControl("", Validators.required),
      // cuarta fila
      terminacionFecha: new FormControl("", Validators.required),
      terminacion: new FormControl("", Validators.required),
      desgarros: new FormControl("", Validators.required),
      posicionGestante: new FormControl("", Validators.required),
      duracion: new FormControl("", Validators.required),
      alumbramiento: new FormControl("", Validators.required),
      partoGrama: new FormControl("", Validators.required),
      muerteIntrauterina: new FormControl("", Validators.required),
      placenta: new FormControl("", Validators.required),
      partoAconpanante: new FormControl("", Validators.required),
      episiotomia: new FormControl("", Validators.required),
      ligaduraCordon: new FormControl("", Validators.required),
      indicacionPrincipalHubo: new FormControl("", Validators.required),
      indicacionPrincipalPartoOperatorio: new FormControl(
        "",
        Validators.required
      ),
      // quinta fila
      nivel: new FormControl("", Validators.required),
      partoLegrado: new FormControl("", Validators.required),
      neonato: new FormControl("", Validators.required),
      responsableAtencionParto:new FormControl("",Validators.required),
      responsableAtencionNeonato:new FormControl("",Validators.required)
    });
  }

  ngOnInit(): void {
    // this.myGroup.valueChanges.pipe(debounceTime(350)).subscribe((value) => {
    //   console.log(value);
    // });
  }

  // ngDoCheck(): void {
  //   this.mostrarDatos();
  // }
  getFC(control: string): AbstractControl {
    return this.myGroup.get(control);
  }
  save() {

    const partoAbortoInput:any={
      estado:{
        hcmp:this.getFC("hcmp").value,
        productoConcepcion:this.getFC("pc").value,
        orden:this.getFC("orden").value
      },
      ingresoEstablecimientoParto:{
        fechaIngreso:this.getFechaHora(this.getFC("ingresoEstablecimientoPartoFecha").value),
        referenciaIngreso:this.getFC("referenciaIngreso").value,
        pulsoMaterno:this.getFC("pulsoMaterno").value,
        presionArterial:this.getFC("presionArterial").value,
        frecuenciaRespiratoria:this.getFC("frecuenciaRespiratoria").value,
        temperatura:this.getFC("temperatura").value,
        peso:this.getFC("peso").value,
        eg:this.getFC("eg").value,
        situacion:this.getFC("situacion").value,
        presentacion:this.getFC("presentacion").value,
        posicion:this.getFC("posicion").value,
        alturaUterina:this.getFC("alturaUterina").value,
        tamFetalAcorde:this.getFC("tamanoFetalAcorde").value,
        fcf:this.getFC("fcf").value,
        inicio:this.getFC("inicio").value,
        dilatacion:this.getFC("dilatacion").value,
        membranas:this.getFC("menbranas").value,
        liquidoAmoniaco:this.getFC("liquidoAmniotico").value,
        fechaRuptura:this.getFechaHora(this.getFC("fechaRuptura").value)
        //  fechaRuptura:"2020-05-18 15:15:00"
      },
      signoSintomaAlarma:[
        {
          nombre:"anasarca",
          valor:this.getFC("anasarca").value
        },
        {
          nombre:"cianosis",
          valor:this.getFC("cianosis").value
        },
        {
          nombre:"escotomas",
          valor:this.getFC("escotomas").value
        },
        {
          nombre:"epigastralgia",
          valor:this.getFC("epigastralgia").value
        },
        {
          nombre:"dolorDerecho",
          valor:this.getFC("dolorDerecho").value
        },
        {
          nombre:"hermaturia",
          valor:this.getFC("hermaturia").value
        },
        {
          nombre:"hipoOrtostatica",
          valor:this.getFC("hipoOrtostatica").value
        },
        {
          nombre:"ictericia",
          valor:this.getFC("ictericia").value
        },
        {
          nombre:"petequies",
          valor:this.getFC("petequies").value
        },
        {
          nombre:"protenuaria",
          valor:this.getFC("proteuniria").value
        }
      ],
      coticoidesAntenatales:{
        nombre:this.getFC("corticoidesAntenatales").value,
        semanaInicio:this.getFC("semanaInicio").value
      },
      tipoProcedimiento:{
        cesaria:this.getFC("cesaria").value,
        aborto:this.getFC("aborto").value
      },
      procedimientoParto:{
        medicacion:["mediacion 1"],
        medicamentos:["medicamento 1"]
      },
      indicacionPrincipalParto:this.getFC("indicacionPrincipalPartoOperatorio").value,
      hubo:this.getFC("indicacionPrincipalHubo").value,
      terminacion:{
        fecha:this.getFechaHora(this.getFC("terminacionFecha").value),
        terminacion:this.getFC("terminacion").value,
        desgarros:this.getFC("desgarros").value,
        posiGestante:this.getFC("posicionGestante").value,
        duracion:this.getFC("duracion").value,
        alumbramiento:this.getFC("alumbramiento").value,
        partoGrama:this.getFC("partoGrama").value,
        muerteIntraUterina:this.getFC("muerteIntrauterina").value,
        placenta:this.getFC("placenta").value,
        partoConAcompaniante:this.getFC("partoAconpanante").value,
        ligaduraCordon:this.getFC("ligaduraCordon").value
      },
      atencion:{
        nivel:this.getFC("nivel").value,
        partoLegrado:this.getFC("partoLegrado").value,
        neonato:this.getFC("neonato").value,
        responsableAtencionParto:this.getFC("responsableAtencionParto").value,
        responsableAtencionNeonato:this.getFC("responsableAtencionNeonato").value
      }
    }
    let tipoDoc="DNI"
    let dniPaciente="77777777"

    this.partoAbortoService.addPartoAborto(tipoDoc,dniPaciente,partoAbortoInput).subscribe((resp)=>{
      console.log(resp)
      console.log(partoAbortoInput)
    })
  }
  getFechaHora(date:Date){
    // let fecha=a.toLocaleDateString();
    if(date.toString()!==''){

     let hora=date.toLocaleTimeString();
    // return fecha+' '+hora;
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
    return yyyy+'-'+mm+'-'+dd+' '+hora
    }
    else{
      return '';
    }
  }
}
