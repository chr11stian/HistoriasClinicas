import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {ControlCrecimientoService} from '../services/control-crecimiento/control-crecimiento.service'
import {ControlCrecimiento} from '../models/plan-atencion-integral.model'
import {HeightWeightComponent} from '../../../../../../modals/height-weight/height-weight.component'
import {WeightChartComponent} from '../../../../../../modals/weight-chart/weight-chart.component'
import {HeightChartComponent} from '../../../../../../modals/height-chart/height-chart.component'

@Component({
    selector: 'app-control-crecimiento',
    templateUrl: './control-crecimiento.component.html',
    styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {
    expandir: boolean = true
    ref: DynamicDialogRef
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
    sexo:boolean;

    constructor(private fb: FormBuilder,
                public dialogService: DialogService,
                private servicio: ControlCrecimientoService) {
    }

    ngOnInit(): void {
        // this.fetchControlCrecimiento()
        this.getLista()
        this.getPaciente();

    }
    getPaciente(){
        this.servicio.getPaciente('47825757')
          .toPromise().then((result) => {
            this.sexo=result.object.formatoFiliacion.datosGeneralesFiliacion.sexo
        }).catch((err) => {
            console.log(err)
        })
    }
    getLista() {
        this.servicio.getListaControles('47825757')
            .toPromise().then((result) => {
            this.listaControles = result.object
            this.paralosGraficos()
            this.transform()
        }).catch((err) => {
            console.log(err)
        })
    }
    paralosGraficos(){
        this.listaControles.forEach((item,index)=>{
            if(item.peso!==0.0){
              if (item.edadMes<=33){
                this.mesesAlturaPeso.push([item.talla,item.peso])
              }
              if(item.edadMes>=1 && item.edadMes<=57){
                this.mesesAltura.push([item.edadMes,item.talla]);
                this.mesesPeso.push([item.edadMes,item.peso])
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
    getFecha(date: Date) {
        if (date.toString() !== '') {
            let hora = date.toLocaleTimeString();
            let dd = date.getDate();
            let dd1:string=dd.toString();
            if(dd<10){
                dd1='0'+dd;
            }
            let mm = date.getMonth() + 1;
            let mm1:string=mm.toString();
            if(mm<10){
                mm1='0'+mm;
            }
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm1 + '-' + dd1+' '+hora
        } else {
            return '';
        }
    }
    save(){
        //armamos la "
        let objeto:string='';
        this.RN.forEach(item=>{
            objeto+=`{"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
            ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        })
        // this.Menor_1A.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A1.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A2.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A3.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A4.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A5.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A6.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A7.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A8.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        // this.A9.forEach(item=>{
        //     objeto+=`{"edadMes":${item.edadMes},"descripcionEdad":"${item.descripcionEdad}","genero":${item.genero},"nroControl":${item.nroControl}
        //     ,"peso":${item.peso},"talla":${item.talla},"fecha":"${item.fecha?this.getFecha(new Date(item.fecha)):''}","fechaTentativa":"${item.fechaTentativa} 00:00:00"},`
        // })
        const nueva=objeto.slice(0,objeto.length-1);
        const nueva1:string =`[${nueva}]`
        const json1=JSON.parse(nueva1)
        // console.log(json1)
        this.servicio.updateListaControlCrecimiento('47825757',json1)
          .toPromise().then((result) => {
            console.log("exito")
            // this.messageService.add({severity:'success', summary:'Service Message', detail:'registro actualizado'});
        }).catch((err) => {
            console.log('E',err)
        })

    }
    mesesPeso:any[]=[]
    mesesAltura:any[]=[]
    mesesAlturaPeso:any[]=[]
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

}
