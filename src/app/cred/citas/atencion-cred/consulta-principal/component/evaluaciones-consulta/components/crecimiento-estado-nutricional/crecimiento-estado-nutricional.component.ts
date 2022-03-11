import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    ControlCrecimiento
} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {DatePipe} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlCrecimientoService} from "../../services/control-crecimiento/control-crecimiento.service"
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {WeightChartComponent} from "../../../../../../../modals/weight-chart/weight-chart.component";
import {HeightChartComponent} from "../../../../../../../modals/height-chart/height-chart.component";
import {HeightWeightComponent} from "../../../../../../../modals/height-weight/height-weight.component";
import {
    CircumferenceChartComponent
} from "../../../../../../../modals/circumference-chart/circumference-chart.component";
import {
    dato,
    controlCrecimiento,
    interfaceCrecimiento,
    SignosVitales,
    inputCrecimiento
} from "../../../../../../models/data";
import {ListaConsultaService} from "../../../../../../services/lista-consulta.service";
import Swal from "sweetalert2";

export interface evaluation {
    "0": number;
    "1": number;
    "2": number;
    "-2": number;
    "-1": number;
}

export interface evaluation1 {
    "0": number;
    "1": number;
    "2": number;
    "3": number;
    "-3": number;
    "-2": number;
    "-1": number;
}

export interface evaluation2 {
    "3": number;
    "10": number;
    "25": number;
    "50": number;
    "75": number;
    "90": number;
    "97": number;
}

@Component({
    selector: 'app-crecimiento-estado-nutricional',
    templateUrl: './crecimiento-estado-nutricional.component.html',
    styleUrls: ['./crecimiento-estado-nutricional.component.css'],
    providers: [DialogService]
})
export class CrecimientoEstadoNutricionalComponent implements OnInit {
    edad: number//toma valores -1,0,1,2,3,4,5,6,7,8,9
    myDisable: boolean = true
    fechaTentativaDisabled: boolean = true
    tallaPesoFG: FormGroup
    display: boolean = false;
    mesesPeso: any[] = []
    mesesCircunferencia: any[] = []
    mesesAltura: any[] = []
    mesesAlturaPeso: any[] = []
    tipoDNI: string;
    descripcion: string
    nroDNI: string
    expandir: boolean = true
    // ref: DynamicDialogRef
    listaControles: ControlCrecimiento[] = []
    listAux: interfaceCrecimiento[] = []
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
    valor: number = 0.9;
    ref: DynamicDialogRef
    sexo: boolean;
    datePipe = new DatePipe('en-US');
    twoOption = [
        {code: 'si', name: 'Si'},
        {code: 'no', name: 'No'}
    ]
    data: dato
    attributeLocalS = 'documento'
    listaCrecimiento: controlCrecimiento
    aux: interfaceCrecimiento[]
    descripcionEdad: string
    nroControl: number
    sv: SignosVitales
    fc: string
    auxInterface: interfaceCrecimiento
    dias: number
    auxEvaluacionH: evaluation
    auxEvaluacionW: evaluation
    auxEvaluacionWH: evaluation1
    auxEvaluacionC: evaluation2
    diagnosticoH: string = ''
    diagnosticoW: string = ''
    diagnosticoWH: string = ''
    diagnosticoC: string = ''

    constructor(private fb: FormBuilder,
                public dialogService: DialogService,
                private messageService: MessageService,
                private rutaActiva: ActivatedRoute,
                private controlCrecimientoService: ControlCrecimientoService,
                private consultaService: ListaConsultaService) {
    }

    ventanas: any[] = [{name: 'recien nacido', code: -1},
        {name: 'menos de 1 año', code: 0},
        {name: '1 año', code: 1},
        {name: '2 años', code: 2},
        {name: '3 años', code: 3},
        {name: '4 años', code: 4},
        {name: '5 años', code: 5},
        {name: '6 años', code: 6},
        {name: '7 años', code: 7},
        {name: '8 años', code: 8},


    ]

    cambiamos(numero) {
        console.log(numero.value)
        this.edad = numero.value;
        console.log(this.edad);
    }

    builForm() {
        this.tallaPesoFG = new FormGroup({
            siNo: new FormControl('si', Validators.required),
            fecha: new FormControl('', Validators.required),
            peso: new FormControl('', Validators.required),
            talla: new FormControl('', Validators.required)
        })
    }

    ngOnInit(): void {
        //this.tipoDNI = this.rutaActiva.snapshot.queryParams.tipoDoc;
        //this.nroDNI = this.rutaActiva.snapshot.queryParams.nroDoc;
        //this.getLista()
        // this.getPaciente();
        this.builForm();
        //this.calcularEdad();
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.sexo = !(this.data.sexo.toLowerCase() === 'femenino')
        this.listar()
        this.datas()
        setTimeout(() => {
            this.evaluacion()
        }, 1000)
    }

    guardar() {
        this.myDisable = false
        let aux1: interfaceCrecimiento = {
            peso: this.sv?.peso,
            talla: this.sv?.talla,
            imc: this.sv?.imc,
            perimetroCefalico: this.sv?.perimetroCefalico,
            edadMes: this.auxInterface.edadMes,
            descripcionEdad: this.auxInterface.descripcionEdad,
            genero: this.data.sexo,
            nroControl: this.nroControl,
            estadoAplicado: true,
            fechaTentativa: this.datePipe.transform(this.auxInterface.fechaTentativa, 'yyyy-MM-dd'),
            fecha: this.datePipe.transform(this.fc, 'yyyy-MM-dd'),
            dias: this.dias,
            diagnosticoPE: this.diagnosticoW,
            diagnosticoTE: this.diagnosticoH,
            diagnosticoPT: this.diagnosticoWH,
            diagnosticoPC: this.diagnosticoC
        }
        let aux: inputCrecimiento = {
            nombreEvaluacion: '',
            codigoCIE10: '',
            codigoHIS: '',
            codigoPrestacion: '',
            controlCrecimientoDesaMes: aux1
        }
        //console.log('He', this.diagnosticoH)
        //console.log('We', this.diagnosticoW)
        //console.log('Ce', this.diagnosticoC)
        //console.log('WH', this.diagnosticoWH)
        this.controlCrecimientoService.updateControlCrecimiento(this.data.idConsulta, aux).subscribe(
            (r) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            })
    }

    evaluacion() {
        this.calcularDias()
        this.controlCrecimientoService.getDataEvaluationHeight(this.data.sexo).subscribe((r: any) => {
            let aux: evaluation | number = r.data[this.dias]
            this.auxEvaluacionH = aux[1]
            if (this.sv.talla * 100 < this.auxEvaluacionH['-2']) {
                this.diagnosticoH = 'Talla baja'
                console.log('talla baja')
            }
            if (this.sv.talla * 100 >= this.auxEvaluacionH['-2'] && this.sv.talla * 100 <= this.auxEvaluacionH['2']) {
                this.diagnosticoH = 'Normal'
                console.log('Normal')
            }
            if (this.sv.talla * 100 > this.auxEvaluacionH['2']) {
                this.diagnosticoH = 'Alto'
                console.log('talla alta')
            }
        })
        this.controlCrecimientoService.getDataEvaluationWeight(this.data.sexo).subscribe((r: any) => {
            let aux: evaluation | number = r.data[this.dias]
            this.auxEvaluacionW = aux[1]
            if (this.sv.peso < this.auxEvaluacionW['-2']) {
                this.diagnosticoW = 'Desnutrición'
                console.log('talla baja')
            }
            if (this.sv.peso >= this.auxEvaluacionW['-2'] && this.sv.peso <= this.auxEvaluacionW['2']) {
                this.diagnosticoW = 'Normal'
                console.log('talla normal')
            }
            if (this.sv.peso > this.auxEvaluacionW['2']) {
                this.diagnosticoW = 'Sobrepeso'
                console.log('talla alta')
            }
        })
        this.controlCrecimientoService.getDataEvaluationWeightHeight(this.data.sexo).subscribe((r: any) => {
            let aux: evaluation1[] = r.data
            let a: evaluation1[] = aux.filter(item => item[0] === Number.parseInt(this.precise(this.sv.talla * 100)))
            let b: evaluation1 = a[0]
            let aux_b = b[1]
            if (this.sv.peso < aux_b['-3']) {
                this.diagnosticoWH = 'Desnutrición Severa'
                console.log('talla baja')
            }
            if (this.sv.peso >= aux_b['-3'] && this.sv.peso <= aux_b['-2']) {
                this.diagnosticoWH = 'Desnutricion Aguda'
                console.log('talla normal')
            }
            if (this.sv.peso >= aux_b['-2'] && this.sv.peso <= aux_b['2']) {
                this.diagnosticoWH = 'Normal'
                console.log('talla normal')
            }
            if (this.sv.peso >= aux_b['2'] && this.sv.peso <= aux_b['3']) {
                this.diagnosticoWH = 'Sobrepeso'
                console.log('talla normal')
            }
            if (this.sv.peso > aux_b['3']) {
                this.diagnosticoWH = 'Obesidad'
                console.log('talla alta')
            }
        })
        this.controlCrecimientoService.getDataEvaluationCircunference(this.data.sexo).subscribe((r: any) => {
            let aux: evaluation2 | number = r.data[this.dias]
            this.auxEvaluacionC = aux[1]
            if (this.sv.perimetroCefalico < this.auxEvaluacionC['3']) {
                this.diagnosticoC = 'Riesgo microcefalia'
                console.log('talla baja')
            }
            if (this.sv.perimetroCefalico >= this.auxEvaluacionC['3'] && this.sv.perimetroCefalico <= this.auxEvaluacionC['97']) {
                this.diagnosticoC = 'Normal'
                console.log('talla normal')
            }
            if (this.sv.perimetroCefalico > this.auxEvaluacionC['97']) {
                this.diagnosticoC = 'Riesgo macrocefalia'
                console.log('talla alta')
            }
        })
    }

    precise(int: number) {
        return (int < 100) ? int.toPrecision(3) : int.toPrecision(4)
    }

    calcularDias() {
        this.dias = Math.round(((new Date()).getTime() - (new Date(this.data.fechaNacimiento)).getTime()) / (1000 * 60 * 60 * 24));
    }

    listar() {
        this.controlCrecimientoService.getControlCrecimiento(this.data.nroDocumento).subscribe((r: any) => {
            this.listaCrecimiento = r.object;
            //console.log('listaCrecimiento ', this.listaCrecimiento)
            this.aux = r.object
            this.dataGrafico(this.aux)
            //this.data.anio = 1
            //this.data.mes = 0
            //this.data.dia = 0
            //this.dias = 365
            this.returnDescription()
            //console.log('datas', this.nroControl, this.descripcionEdad)
            this.listAux = this.aux.filter(item => item.descripcionEdad === this.descripcionEdad);
            this.auxInterface = this.listAux.filter(item => item.nroControl === this.nroControl)[0]
            //console.log('lista RN', this.auxInterface);
        })
    }

    dataGrafico(list: interfaceCrecimiento[]) {
        this.mesesCircunferencia = []
        this.mesesPeso = []
        this.mesesAltura = []
        this.mesesAlturaPeso = []
        list.forEach((item, index) => {
            if (item.peso !== 0.0 && item.talla != 0.0 && item.perimetroCefalico !== 0.0) {
                this.mesesPeso.push([item.dias / 30, item.peso])
                this.mesesAltura.push([item.dias / 30, item.talla * 100])
                this.mesesCircunferencia.push([item.dias / 30, item.perimetroCefalico])
                this.mesesAlturaPeso.push([item.talla * 100, item.peso])
            }
            //console.log('list ', this.mesesPeso, this.mesesAlturaPeso, this.mesesAltura, this.mesesCircunferencia)
        })
    }

    datas() {
        this.consultaService.getDatosGenerales(this.data.idConsulta).subscribe((r: any) => {
            this.sv = r.object.signosVitales
            this.fc = r.object.fecha
            console.log('consulta-general', this.sv)
        })
    }

    returnDescription() {
        if (this.data.anio === 9 && this.data.mes >= 6) {
            this.nroControl = 2
            this.descripcionEdad = '9A'
            this.descripcion = '9 años'
        }
        if (this.data.anio === 9 && this.data.mes < 6) {
            this.nroControl = 1
            this.descripcionEdad = '9A'
            this.descripcion = '9 años'
        }
        if (this.data.anio === 8 && this.data.mes >= 6) {
            this.nroControl = 2
            this.descripcionEdad = '8A'
            this.descripcion = '8 años'
        }
        if (this.data.anio === 8 && this.data.mes < 6) {
            this.nroControl = 1
            this.descripcionEdad = '8A'
            this.descripcion = '8 años'
        }
        if (this.data.anio === 7 && this.data.mes >= 6) {
            this.nroControl = 2
            this.descripcionEdad = '7A'
            this.descripcion = '7 años'
        }
        if (this.data.anio === 7 && this.data.mes < 6) {
            this.nroControl = 1
            this.descripcionEdad = '7A'
            this.descripcion = '7 años'
        }
        if (this.data.anio === 6 && this.data.mes >= 6) {
            this.nroControl = 2
            this.descripcionEdad = '6A'
            this.descripcion = '6 años'
        }
        if (this.data.anio === 6 && this.data.mes < 6) {
            this.nroControl = 1
            this.descripcionEdad = '6A'
            this.descripcion = '6 años'
        }
        if (this.data.anio === 5 && this.data.mes >= 6) {
            this.nroControl = 2
            this.descripcionEdad = '5A'
            this.descripcion = '5 años'
        }
        if (this.data.anio === 5 && this.data.mes < 6) {
            this.nroControl = 1
            this.descripcionEdad = '5A'
            this.descripcion = '5 años'
        }
        if (this.data.anio === 4 && this.data.mes >= 9) {
            this.nroControl = 4
            this.descripcionEdad = '4A'
            this.descripcion = '4 años'
        }
        if (this.data.anio === 4 && (this.data.mes >= 6 && this.data.mes < 9)) {
            this.nroControl = 3
            this.descripcionEdad = '4A'
            this.descripcion = '4 años'
        }
        if (this.data.anio === 4 && (this.data.mes >= 3 && this.data.mes < 6)) {
            this.nroControl = 2
            this.descripcionEdad = '4A'
            this.descripcion = '4 años'
        }
        if (this.data.anio === 4 && this.data.mes < 3) {
            this.nroControl = 1
            this.descripcionEdad = '4A'
            this.descripcion = '4 años'
        }
        if (this.data.anio === 3 && this.data.mes >= 9) {
            this.nroControl = 4
            this.descripcionEdad = '3A'
            this.descripcion = '3 años'
        }
        if (this.data.anio === 3 && (this.data.mes >= 6 && this.data.mes < 9)) {
            this.nroControl = 3
            this.descripcionEdad = '3A'
            this.descripcion = '3 años'
        }
        if (this.data.anio === 3 && (this.data.mes >= 3 && this.data.mes < 6)) {
            this.nroControl = 2
            this.descripcionEdad = '3A'
            this.descripcion = '3 años'
        }
        if (this.data.anio === 3 && this.data.mes < 3) {
            this.nroControl = 1
            this.descripcionEdad = '3A'
            this.descripcion = '3 años'
        }
        if (this.data.anio === 2 && this.data.mes >= 9) {
            this.nroControl = 4
            this.descripcionEdad = '2A'
            this.descripcion = '2 años'
        }
        if (this.data.anio === 2 && (this.data.mes >= 6 && this.data.mes < 9)) {
            this.nroControl = 3
            this.descripcionEdad = '2A'
            this.descripcion = '2 años'
        }
        if (this.data.anio === 2 && (this.data.mes >= 3 && this.data.mes < 6)) {
            this.nroControl = 2
            this.descripcionEdad = '2A'
            this.descripcion = '2 años'
        }
        if (this.data.anio === 2 && this.data.mes < 3) {
            this.nroControl = 1
            this.descripcionEdad = '2A'
            this.descripcion = '2 años'
        }
        if (this.data.anio === 1 && this.data.mes >= 10) {
            this.nroControl = 6
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 1 && (this.data.mes >= 8 && this.data.mes < 10)) {
            this.nroControl = 5
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 1 && (this.data.mes >= 6 && this.data.mes < 8)) {
            this.nroControl = 4
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 1 && (this.data.mes >= 4 && this.data.mes < 6)) {
            this.nroControl = 3
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 1 && (this.data.mes >= 2 && this.data.mes < 4)) {
            this.nroControl = 2
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 1 && this.data.mes < 2) {
            this.nroControl = 1
            this.descripcionEdad = '1A'
            this.descripcion = '1 año'
        }
        if (this.data.anio === 0 && this.data.mes > 0) {
            this.nroControl = this.data.mes
            this.descripcionEdad = 'Menor_1A'
            this.descripcion = 'Menor de 1 año'
        }
        if (this.data.anio === 0 && this.data.mes === 0 && this.data.dia < 7) {
            this.nroControl = 1
            this.descripcionEdad = 'RN'
            this.descripcion = 'Recien nacido'
        }
        if (this.data.anio === 0 && this.data.mes === 0 && (this.data.dia >= 7 && this.data.dia < 14)) {
            this.nroControl = 2
            this.descripcionEdad = 'RN'
            this.descripcion = 'Recien nacido'
        }
        if (this.data.anio === 0 && this.data.mes === 0 && (this.data.dia >= 14 && this.data.dia < 21)) {
            this.nroControl = 3
            this.descripcionEdad = 'RN'
            this.descripcion = 'Recien nacido'
        }
        if (this.data.anio === 0 && this.data.mes === 0 && this.data.dia >= 21) {
            this.nroControl = 4
            this.descripcionEdad = 'RN'
            this.descripcion = 'Recien nacido'
        }
    }

    onWeightChart(): void {
        this.listar()
        const isBoy = this.sexo
        this.ref = this.dialogService.open(WeightChartComponent, {
            data: {
                dataChild: this.mesesPeso,
                /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoW
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
        this.listar()
        const isBoy = this.sexo
        this.ref = this.dialogService.open(HeightChartComponent, {
            data: {
                dataChild: this.mesesAltura,
                /* debe ser dataChild:[[mes,altura],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoH
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
        this.listar()
        const isBoy = this.sexo
        this.ref = this.dialogService.open(HeightWeightComponent, {
            data: {
                dataChild: this.mesesAlturaPeso,
                /* debe ser dataChild:[[altura,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoWH
            },
            header: isBoy ? 'PESO PARA LA LONGITUD NIÑOS' : 'PESO PARA LA LONGITUD NIÑAS',
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px'
            },
        })
    }

    ver() {
        if (this.myDisable)
            this.messageService.add({
                severity: 'error',
                summary: 'Falta Guardar',
                detail: 'Guardar la información del Peso, Talla y P. Cefálico'
            });
    }

    onCircumferenceChart(): void {
        this.listar()
        const isBoy = this.sexo
        this.ref = this.dialogService.open(CircumferenceChartComponent, {
            data: {
                dataChild: this.mesesCircunferencia,
                /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoC
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
