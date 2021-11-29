import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {ControlCrecimientoService} from 'src/app/cred/services/plan-atencion-integral/control-crecimiento/control-crecimiento.service'
import {ControlCrecimiento} from '../../../../../../models/plan-atencion-integral/plan-atencion-integral.model'
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

    constructor(private fb: FormBuilder,
                public dialogService: DialogService,
                private servicio: ControlCrecimientoService) {
    }

    ngOnInit(): void {
        // this.fetchControlCrecimiento()
        this.getLista()

    }
    getLista() {
        this.servicio.getListaControles('47825757')
            .toPromise().then((result) => {
            this.listaControles = result.object
            this.transform()
        }).catch((err) => {
            console.log(err)
        })
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
    }
    separacion() {
        this.RN=this.listaControles.filter(item => item.descripcionEdad==='RN');
        console.log('lista RN',this.RN);
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
        
    }

    // fetchControlCrecimiento() {
    //     this.controlCrecimientoFG = this.fb.group({
    //         RN1peso: ['', Validators.required],
    //         RN1talla: ['', Validators.required],
    //         RN1fecha: ['', Validators.required],
    //         RN2peso: ['', Validators.required],
    //         RN2talla: ['', Validators.required],
    //         RN2fecha: ['', Validators.required],
    //         Menor1peso: ['', Validators.required],
    //         Menor1talla: ['', Validators.required],
    //         Menor1fecha: ['', Validators.required],
    //         Menor2peso: ['', Validators.required],
    //         Menor2talla: ['', Validators.required],
    //         Menor2fecha: ['', Validators.required],
    //         Menor3peso: ['', Validators.required],
    //         Menor3talla: ['', Validators.required],
    //         Menor3fecha: ['', Validators.required],
    //         Menor4peso: ['', Validators.required],
    //         Menor4talla: ['', Validators.required],
    //         Menor4fecha: ['', Validators.required],
    //         Menor5peso: ['', Validators.required],
    //         Menor5talla: ['', Validators.required],
    //         Menor5fecha: ['', Validators.required],
    //         Menor6peso: ['', Validators.required],
    //         Menor6talla: ['', Validators.required],
    //         Menor6fecha: ['', Validators.required],
    //         Menor7peso: ['', Validators.required],
    //         Menor7talla: ['', Validators.required],
    //         Menor7fecha: ['', Validators.required],
    //         Menor8peso: ['', Validators.required],
    //         Menor8talla: ['', Validators.required],
    //         Menor8fecha: ['', Validators.required],
    //         Menor9peso: ['', Validators.required],
    //         Menor9talla: ['', Validators.required],
    //         Menor9fecha: ['', Validators.required],
    //         Menor10peso: ['', Validators.required],
    //         Menor10talla: ['', Validators.required],
    //         Menor10fecha: ['', Validators.required],
    //         Menor11peso: ['', Validators.required],
    //         Menor11talla: ['', Validators.required],
    //         Menor11fecha: ['', Validators.required],
    //         Anio_1peso: ['', Validators.required],
    //         Anio_1talla: ['', Validators.required],
    //         Anio_1fecha: ['', Validators.required],
    //         Anio_2peso: ['', Validators.required],
    //         Anio_2talla: ['', Validators.required],
    //         Anio_2fecha: ['', Validators.required],
    //         Anio_3peso: ['', Validators.required],
    //         Anio_3talla: ['', Validators.required],
    //         Anio_3fecha: ['', Validators.required],
    //         Anio_4peso: ['', Validators.required],
    //         Anio_4talla: ['', Validators.required],
    //         Anio_4fecha: ['', Validators.required],
    //         Anio_5peso: ['', Validators.required],
    //         Anio_5talla: ['', Validators.required],
    //         Anio_5fecha: ['', Validators.required],
    //         Anio_6peso: ['', Validators.required],
    //         Anio_6talla: ['', Validators.required],
    //         Anio_6fecha: ['', Validators.required],
    //         Anio2_1peso: ['', Validators.required],
    //         Anio2_1talla: ['', Validators.required],
    //         Anio2_1fecha: ['', Validators.required],
    //         Anio2_2peso: ['', Validators.required],
    //         Anio2_2talla: ['', Validators.required],
    //         Anio2_2fecha: ['', Validators.required],
    //         Anio2_3peso: ['', Validators.required],
    //         Anio2_3talla: ['', Validators.required],
    //         Anio2_3fecha: ['', Validators.required],
    //         Anio2_4peso: ['', Validators.required],
    //         Anio2_4talla: ['', Validators.required],
    //         Anio2_4fecha: ['', Validators.required],
    //         Anio3_1peso: ['', Validators.required],
    //         Anio3_1talla: ['', Validators.required],
    //         Anio3_1fecha: ['', Validators.required],
    //         Anio3_2peso: ['', Validators.required],
    //         Anio3_2talla: ['', Validators.required],
    //         Anio3_2fecha: ['', Validators.required],
    //         Anio3_3peso: ['', Validators.required],
    //         Anio3_3talla: ['', Validators.required],
    //         Anio3_3fecha: ['', Validators.required],
    //         Anio3_4peso: ['', Validators.required],
    //         Anio3_4talla: ['', Validators.required],
    //         Anio3_4fecha: ['', Validators.required],
    //         Anio4_1peso: ['', Validators.required],
    //         Anio4_1talla: ['', Validators.required],
    //         Anio4_1fecha: ['', Validators.required],
    //         Anio4_2peso: ['', Validators.required],
    //         Anio4_2talla: ['', Validators.required],
    //         Anio4_2fecha: ['', Validators.required],
    //         Anio4_3peso: ['', Validators.required],
    //         Anio4_3talla: ['', Validators.required],
    //         Anio4_3fecha: ['', Validators.required],
    //         Anio4_4peso: ['', Validators.required],
    //         Anio4_4talla: ['', Validators.required],
    //         Anio4_4fecha: ['', Validators.required],
    //         Anio5peso: ['', Validators.required],
    //         Anio5talla: ['', Validators.required],
    //         Anio5fecha: ['', Validators.required],
    //         Anio6peso: ['', Validators.required],
    //         Anio6talla: ['', Validators.required],
    //         Anio6fecha: ['', Validators.required],
    //         Anio7peso: ['', Validators.required],
    //         Anio7talla: ['', Validators.required],
    //         Anio7fecha: ['', Validators.required],
    //         Anio8peso: ['', Validators.required],
    //         Anio8talla: ['', Validators.required],
    //         Anio8fecha: ['', Validators.required],
    //         Anio9peso: ['', Validators.required],
    //         Anio9talla: ['', Validators.required],
    //         Anio9fecha: ['', Validators.required]
    //     })
    //     console.log('control crecimiento', this.controlCrecimientoFG)

    // }

    onWeightChart(): void {
        const isBoy = false
        this.ref = this.dialogService.open(WeightChartComponent, {
            data: {
                dataChild: [
                    [1, 4.25], [2, 5.75]
                ], /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy
            },
            header: isBoy ? 'GRÁFICA DE PESO DE UN NIÑO' : 'GRÁFICA DE PESO DE UN NIÑA',
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
        const isBoy = true
        this.ref = this.dialogService.open(HeightChartComponent, {
            data: {
                dataChild: [
                    [1, 50]
                ], /* debe ser dataChild:[[mes,altura],..] ejem: dataChild:[[1,4.5],..]  */
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
        const isBoy = true
        this.ref = this.dialogService.open(HeightWeightComponent, {
            data: {
                dataChild: [], /* debe ser dataChild:[[altura,peso],..] ejem: dataChild:[[1,4.5],..]  */
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
