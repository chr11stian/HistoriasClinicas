import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ControlCrecimiento} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DatePipe} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlCrecimientoService} from "../../../../../plan/component/plan-atencion-integral/services/control-crecimiento/control-crecimiento.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {WeightChartComponent} from "../../../../../../../modals/weight-chart/weight-chart.component";
import {HeightChartComponent} from "../../../../../../../modals/height-chart/height-chart.component";
import {HeightWeightComponent} from "../../../../../../../modals/height-weight/height-weight.component";
import {CircumferenceChartComponent} from "../../../../../../../modals/circumference-chart/circumference-chart.component";


@Component({
  selector: 'app-crecimiento-estado-nutricional',
  templateUrl: './crecimiento-estado-nutricional.component.html',
  styleUrls: ['./crecimiento-estado-nutricional.component.css'],
  providers: [DialogService]
})
export class CrecimientoEstadoNutricionalComponent implements OnInit {
  edad:number//toma valores -1,0,1,2,3,4,5,6,7,8,9
  fechaTentativaDisabled:boolean=true
  tallaPesoFG:FormGroup
  display:boolean=false;
  mesesPeso:any[]=[]
  mesesCircunferencia:any[]=[]
  mesesAltura:any[]=[]
  mesesAlturaPeso:any[]=[]
  tipoDNI:string;
  nroDNI:string
  expandir: boolean = true
  // ref: DynamicDialogRef
  listaControles: ControlCrecimiento[] = []
  RN: ControlCrecimiento[] = []
  Menor_1A: ControlCrecimiento[] = []
  A1: ControlCrecimiento[] = []
  A2: ControlCrecimiento[] = []
  A3: ControlCrecimiento[] = []
  A4: ControlCrecimiento[] = []
  A5: ControlCrecimiento[] = []
  A6: ControlCrecimiento[] = []
  A7: ControlCrecimiento[] = []
  A8: ControlCrecimiento[] = []
  A9: ControlCrecimiento[] = []
  valor:number=0.9;
  ref: DynamicDialogRef
  sexo:boolean;
  datePipe = new DatePipe('en-US');
  twoOption=[
    {code:'si',name:'Si'},
    {code:'no',name:'No'}
  ]

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private servicio: ControlCrecimientoService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute) {
  }

  ventanas:any[]=[{name:'recien nacido',code:-1},
    {name:'menos de 1 año',code:0},
    {name:'1 año',code:1},
    {name:'2 años',code:2},
    {name:'3 años',code:3},
    {name:'4 años',code:4},
    {name:'5 años',code:5},
    {name:'6 años',code:6},
    {name:'7 años',code:7},
    {name:'8 años',code:8},


  ]
  cambiamos(numero){
    console.log(numero.value)
    this.edad=numero.value;
    console.log(this.edad);
  }
  ngOnInit(): void {
    this.tipoDNI=this.rutaActiva.snapshot.queryParams.tipoDoc;
    this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc;
    this.getLista()
    // this.getPaciente();
    this.builForm();
    this.calcularEdad();
  }
  calcularEdad(){
    //calculamos en k periodo de vacunacion se encuentra
    this.edad=-1;
  }
  cambioEstado(valor){
    console.log('----------------')
    const recojido=valor.value;
    this.fechaTentativaDisabled=recojido==='si'?true:false
  }
  getPaciente(){
    this.servicio.getPaciente(this.nroDNI)
      .toPromise().then((result) => {
      this.sexo=result.object.formatoFiliacion.datosGeneralesFiliacion.sexo
    }).catch((err) => {
      console.log(err)
    })
  }
  getLista() {
    // this.servicio.getListaControles('47825757')
      this.servicio.getListaControles(this.nroDNI)
      .toPromise().then((result) => {
      this.listaControles = result.object
      this.paralosGraficos()
      // console.log('la lista',this.listaControles)
      this.transform()
    }).catch((err) => {
      console.log(err)
    })
  }
  paralosGraficos(){
    this.listaControles.forEach((item,index)=>{
      if(item.peso!==0.0 && item.talla!=0) {
        if (item.edadMes<=33){
          this.mesesAlturaPeso.push([item.talla,item.peso])
        }
        if(item.edadMes>=1 && item.edadMes<=60){
          this.mesesAltura.push([item.edadMes,item.talla]);
          this.mesesPeso.push([item.edadMes,item.peso])
          this.mesesCircunferencia.push([item.edadMes,item.peso])
        }
      }
    });
  }
  transform(){
    //transformacion a un solo formato que se usará
    this.listaControles.forEach(i => {
      if(i.fecha===null){
        i.fecha='';
      }
      if(i.fechaTentativa===null){
        i.fechaTentativa='';
      }
      else {
        i.fecha=i.fecha.split(' ')[0];
        i.fechaTentativa=i.fechaTentativa.split(' ')[0];
        // i.fechaTentativa = this.datePipe.transform(i.fechaTentativa, 'dd-MM-yyyy HH:mm:ss');
      }
    })
    console.log("lista conversa",this.listaControles);
    this.separacion()
    // this.determinaEdadPesoTalla();
  }
  separacion() {
    this.RN=this.listaControles.filter(item => item.descripcionEdad==='RN');
    // console.log('lista RN',this.RN);
    this.Menor_1A=this.listaControles.filter(item=> item.descripcionEdad==='Menor_1A')
    // console.log('lista Menor_1A',this.Menor_1A);
    this.A1=this.listaControles.filter(item=> item.descripcionEdad==='1A')
    // console.log('lista A1',this.A1);
    this.A2=this.listaControles.filter(item=> item.descripcionEdad==='2A')
    // console.log('lista A2',this.A2);
    this.A3=this.listaControles.filter(item=> item.descripcionEdad==='3A')
    // console.log('lista A3',this.A3);
    this.A4=this.listaControles.filter(item=> item.descripcionEdad==='4A')
    // console.log('lista A4',this.A4);
    this.A5=this.listaControles.filter(item=> item.descripcionEdad==='5A')
    // console.log('lista A5',this.A5);
    this.A6=this.listaControles.filter(item=> item.descripcionEdad==='6A')
    // console.log('lista A6',this.A6);
    this.A7=this.listaControles.filter(item=> item.descripcionEdad==='7A')
    // console.log('lista A7',this.A7);
    this.A8=this.listaControles.filter(item=> item.descripcionEdad==='8A')
    // console.log('lista A8',this.A8);
    this.A9=this.listaControles.filter(item=> item.descripcionEdad==='9A')
    // console.log('lista A9',this.A9);
    console.log('lista general',this.listaControles);
  }
  // getFecha(date: Date) {
  //   if (date.toString() !== '') {
  //     let hora = date.toLocaleTimeString();
  //     let dd = date.getDate();
  //     let dd1:string=dd.toString();
  //     if(dd<10){
  //       dd1='0'+dd;
  //     }
  //     let mm = date.getMonth() + 1;
  //     let mm1:string=mm.toString();
  //     if(mm<10){
  //       mm1='0'+mm;
  //     }
  //     let yyyy = date.getFullYear();
  //     return yyyy + '-' + mm1 + '-' + dd1+' '+hora
  //   } else {
  //     return '';
  //   }
  // }
  agregarPesoTalla(elemento){
    const fechaString=elemento.fechaTentativa
    console.log(fechaString)
    this.display=true;
    this.getFC('fecha').setValue(new Date(`${fechaString} 00:00:00`))

  }
  builForm(){
    this.tallaPesoFG=new FormGroup({
      siNo:new FormControl('si',Validators.required),
      fecha: new FormControl('', Validators.required),
      peso:new FormControl('',Validators.required),
      talla:new FormControl('',Validators.required)
    });
  }
  getFC(control: string): AbstractControl {
    return this.tallaPesoFG.get(control);
  }
  cancelar(){
    this.display=false;
  }
  save(){
  }

  //
  onWeightChart(): void {
    // this.determinaEdadPesoTalla();
    const isBoy = this.sexo
    this.ref = this.dialogService.open(WeightChartComponent, {
      data: {
        dataChild: this.mesesPeso,
        /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
        isBoy: isBoy
      },
      header: isBoy ? 'GRÁFICA DE PESO DE UN NIÑO' : 'GRÁFICA DE PESO DE UNA NIÑA',
      // width: '90%',
      height: '90%',
      width: '70%',
      style: {
        position: 'absolute',
        top: '17px',
      },
    })
  }

  onHeightChart(): void {
    const isBoy = this.sexo
    this.ref = this.dialogService.open(HeightChartComponent, {
      data: {
        dataChild: this.mesesAltura,
        /* debe ser dataChild:[[mes,altura],..] ejem: dataChild:[[1,4.5],..]  */
        isBoy: isBoy
      },
      header: isBoy ? 'LONGITUD/ESTATURA PARA LOS NIÑOS' : 'LONGITUD/ESTATURA PARA LOS NIÑAS',
      // width: '90%',
      height: '90%',
      width: '70%',
      style: {
        position: 'absolute',
        top: '17px',
      },
    })
  }

  onHeightWeightChart(): void {
    const isBoy = this.sexo
    this.ref = this.dialogService.open(HeightWeightComponent, {
      data: {
        dataChild: this.mesesAlturaPeso,
        /* debe ser dataChild:[[altura,peso],..] ejem: dataChild:[[1,4.5],..]  */
        isBoy: isBoy
      },
      header: isBoy ? 'PESO PARA LA LONGITUD NIÑOS' : 'PESO PARA LA LONGITUD NIÑAS',
      // width: '90%',
      height: '90%',
      width: '70%',
      style: {
        position: 'absolute',
        top: '17px',
      },
    })
  }
  onCircumferenceChart(): void {
    // this.determinaEdadPesoTalla();
    const isBoy = this.sexo
    this.ref = this.dialogService.open(CircumferenceChartComponent, {
      data: {
        dataChild: this.mesesCircunferencia,
        /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
        isBoy: isBoy
      },
      header: isBoy ? 'GRÁFICO DEL PERIMETRO CEFÁLIC0 DE UN NIÑO' : 'GRÁFICO DEL PERIMETRO CEFÁLIC0 DE UNA NIÑA',
      // width: '90%',
      height: '90%',
      width: '70%',
      style: {
        position: 'absolute',
        top: '17px',
      },
    })
  }

}
