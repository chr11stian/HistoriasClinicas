import { Component, OnInit, DoCheck } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ControlCrecimientoService } from "../../../../consulta-principal/component/evaluaciones-consulta/services/control-crecimiento/control-crecimiento.service";
import { ControlCrecimiento } from "../models/plan-atencion-integral.model";
import { HeightWeightComponent } from "../../../../../../modals/height-weight/height-weight.component";
import { WeightChartComponent } from "../../../../../../modals/weight-chart/weight-chart.component";
import { HeightChartComponent } from "../../../../../../modals/height-chart/height-chart.component";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import {
    dato,
    interfaceCrecimiento,
    SignosVitales,
} from "../../../../../models/data";
import { ListaConsultaService } from "../../../../../services/lista-consulta.service";
import { CircumferenceChartComponent } from "../../../../../../modals/circumference-chart/circumference-chart.component";
import {
    evaluation,
    evaluation1,
    evaluation2,
} from "../../../../consulta-principal/component/evaluaciones-consulta/components/crecimiento-estado-nutricional/crecimiento-estado-nutricional.component";
import { AntecedentesService } from "../../../services/antecedentes/antecedentes.service";

@Component({
    selector: "app-control-crecimiento",
    templateUrl: "./control-crecimiento.component.html",
    styleUrls: ["./control-crecimiento.component.css"],
})
export class ControlCrecimientoComponent implements OnInit, DoCheck {
    tipoDNI: string;
    nroDNI: string;
    expandir: boolean = true;
    ref: DynamicDialogRef;
    listaControles: ControlCrecimiento[] = [];

    RN: interfaceCrecimiento[] = [];
    MA: interfaceCrecimiento[] = [];
    A1: interfaceCrecimiento[] = [];
    A2: interfaceCrecimiento[] = [];
    A3: interfaceCrecimiento[] = [];
    A4: interfaceCrecimiento[] = [];
    A5: interfaceCrecimiento[] = [];
    A6: interfaceCrecimiento[] = [];
    A7: interfaceCrecimiento[] = [];
    A8: interfaceCrecimiento[] = [];
    A9: interfaceCrecimiento[] = [];
    valor: number = 0.9;
    sexo: boolean;
    datePipe = new DatePipe("en-US");

    data: dato;
    attributeLocalS = "documento";
    aux: interfaceCrecimiento[];
    listAux: interfaceCrecimiento[] = [];
    auxInterface: interfaceCrecimiento;
    descripcionEdad: string;
    descripcionIndex: number = 0;
    nroControl: number;
    sv: SignosVitales;
    fc: string;
    descripcion: string;
    hidden: boolean;
    auxEvaluacionH: evaluation;
    auxEvaluacionW: evaluation;
    auxEvaluacionWH: evaluation1;
    auxEvaluacionC: evaluation2;
    diagnosticoH: string;
    diagnosticoW: string;
    diagnosticoWH: string;
    diagnosticoC: string;
    dias: number;

    constructor(
        private fb: FormBuilder,
        private antecedentes: AntecedentesService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private rutaActiva: ActivatedRoute,
        private controlCrecimientoService: ControlCrecimientoService,
        private consultaService: ListaConsultaService
    ) {}

    ngDoCheck() {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.hidden = this.data.hidden;
    }

    ngOnInit(): void {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        this.hidden = this.data.hidden;
        this.sexo = !(this.data.sexo.toLowerCase() === "femenino");
        this.listar();
        setTimeout(() => {
            this.separacion();
            this.returnDescription();
            this.datas();
            this.evaluacion();
        }, 1000);
    }

    datas() {
        this.consultaService
            .getDatosGenerales(this.data.idConsulta)
            .subscribe((r: any) => {
                this.sv = r.object.signosVitales;
                this.fc = r.object.fecha;
            });
    }

    precise(int: number) {
        return int < 100 ? int.toPrecision(3) : int.toPrecision(4);
    }

    calcularDias() {
        this.dias = Math.round(
            (new Date().getTime() -
                new Date(this.data.fechaNacimiento).getTime()) /
                (1000 * 60 * 60 * 24)
        );
    }

    evaluacion() {
        this.calcularDias();
        this.controlCrecimientoService
            .getDataEvaluationHeight(this.data.sexo)
            .subscribe((r: any) => {
                let aux: evaluation | number = r.data[this.dias];
                this.auxEvaluacionH = aux[1];
                if (this.sv.talla * 100 < this.auxEvaluacionH["-2"]) {
                    this.diagnosticoH = "Talla baja";
                }
                if (
                    this.sv.talla * 100 >= this.auxEvaluacionH["-2"] &&
                    this.sv.talla * 100 <= this.auxEvaluacionH["2"]
                ) {
                    this.diagnosticoH = "Normal";
                }
                if (this.sv.talla * 100 > this.auxEvaluacionH["2"]) {
                    this.diagnosticoH = "Alto";
                }
            });
        this.controlCrecimientoService
            .getDataEvaluationWeight(this.data.sexo)
            .subscribe((r: any) => {
                let aux: evaluation | number = r.data[this.dias];
                this.auxEvaluacionW = aux[1];
                if (this.sv.peso < this.auxEvaluacionW["-2"]) {
                    this.diagnosticoW = "Desnutrición";
                }
                if (
                    this.sv.peso >= this.auxEvaluacionW["-2"] &&
                    this.sv.peso <= this.auxEvaluacionW["2"]
                ) {
                    this.diagnosticoW = "Normal";
                }
                if (this.sv.peso > this.auxEvaluacionW["2"]) {
                    this.diagnosticoW = "Sobrepeso";
                }
            });
        this.controlCrecimientoService
            .getDataEvaluationWeightHeight(this.data.sexo)
            .subscribe((r: any) => {
                let aux: evaluation1[] = r.data;

                let a: evaluation1[] = aux.filter(
                    (item) =>
                        item[0] ===
                        Number.parseInt(this.precise(this.sv.talla * 100))
                );
                let b: evaluation1 = a[0];
                let aux_b = b[1];
                if (this.sv.peso < aux_b["-3"]) {
                    this.diagnosticoWH = "Desnutrición Severa";
                }
                if (this.sv.peso >= aux_b["-3"] && this.sv.peso < aux_b["-2"]) {
                    this.diagnosticoWH = "Desnutricion Aguda";
                }
                if (this.sv.peso >= aux_b["-2"] && this.sv.peso < aux_b["2"]) {
                    this.diagnosticoWH = "Normal";
                }
                if (this.sv.peso >= aux_b["2"] && this.sv.peso < aux_b["3"]) {
                    this.diagnosticoWH = "Sobrepeso";
                }
                if (this.sv.peso >= aux_b["3"]) {
                    this.diagnosticoWH = "Obesidad";
                }
            });
        this.controlCrecimientoService
            .getDataEvaluationCircunference(this.data.sexo)
            .subscribe((r: any) => {
                let aux: evaluation2 | number = r.data[this.dias];
                this.auxEvaluacionC = aux[1];
                if (this.sv.perimetroCefalico < this.auxEvaluacionC["3"]) {
                    this.diagnosticoC = "Riesgo microcefalia";
                }
                if (
                    this.sv.perimetroCefalico >= this.auxEvaluacionC["3"] &&
                    this.sv.perimetroCefalico <= this.auxEvaluacionC["97"]
                ) {
                    this.diagnosticoC = "Normal";
                }
                if (this.sv.perimetroCefalico > this.auxEvaluacionC["97"]) {
                    this.diagnosticoC = "Riesgo macrocefalia";
                }
            });
    }

    listar() {
        this.controlCrecimientoService
            .getControlCrecimiento(this.data.nroDocumento)
            .subscribe((r: any) => {
                //this.listaCrecimiento = r.object;
                //console.log('listaCrecimiento ', this.listaCrecimiento)
                this.aux = r.object;
                //console.log('object-->', this.aux)
                this.dataGrafico(this.aux);
                //this.data.anio = 0
                //this.data.mes = 3
                //this.data.dia = 6
                //this.dias = 96
                //this.returnDescription()
                //console.log('datas', this.nroControl, this.descripcionEdad)
                //this.listAux = this.aux.filter(item => item.descripcionEdad === this.descripcionEdad);
                //this.auxInterface = this.listAux.filter(item => item.nroControl === this.nroControl)[0]
                //console.log('lista RN', this.auxInterface);
            });
        //this.separacion()
        //console.log('RN-->', this.RN)
    }

    returnDescription() {
        if (this.data.anio === 9 && this.data.mes >= 6) {
            this.nroControl = 2;
            this.descripcionEdad = "9A";
            this.descripcionIndex = 10;
            this.descripcion = "9 años";
        }
        if (this.data.anio === 9 && this.data.mes < 6) {
            this.nroControl = 1;
            this.descripcionEdad = "9A";
            this.descripcionIndex = 10;
            this.descripcion = "9 años";
        }
        if (this.data.anio === 8 && this.data.mes >= 6) {
            this.nroControl = 2;
            this.descripcionEdad = "8A";
            this.descripcionIndex = 9;
            this.descripcion = "8 años";
        }
        if (this.data.anio === 8 && this.data.mes < 6) {
            this.nroControl = 1;
            this.descripcionEdad = "8A";
            this.descripcionIndex = 9;
            this.descripcion = "8 años";
        }
        if (this.data.anio === 7 && this.data.mes >= 6) {
            this.nroControl = 2;
            this.descripcionEdad = "7A";
            this.descripcionIndex = 8;
            this.descripcion = "7 años";
        }
        if (this.data.anio === 7 && this.data.mes < 6) {
            this.nroControl = 1;
            this.descripcionEdad = "7A";
            this.descripcionIndex = 8;
            this.descripcion = "7 años";
        }
        if (this.data.anio === 6 && this.data.mes >= 6) {
            this.nroControl = 2;
            this.descripcionEdad = "6A";
            this.descripcionIndex = 7;
            this.descripcion = "6 años";
        }
        if (this.data.anio === 6 && this.data.mes < 6) {
            this.nroControl = 1;
            this.descripcionEdad = "6A";
            this.descripcionIndex = 7;
            this.descripcion = "6 años";
        }
        if (this.data.anio === 5 && this.data.mes >= 6) {
            this.nroControl = 2;
            this.descripcionEdad = "5A";
            this.descripcionIndex = 6;
            this.descripcion = "5 años";
        }
        if (this.data.anio === 5 && this.data.mes < 6) {
            this.nroControl = 1;
            this.descripcionEdad = "5A";
            this.descripcionIndex = 6;
            this.descripcion = "5 años";
        }
        if (this.data.anio === 4 && this.data.mes >= 9) {
            this.nroControl = 4;
            this.descripcionEdad = "4A";
            this.descripcionIndex = 5;
            this.descripcion = "4 años";
        }
        if (this.data.anio === 4 && this.data.mes >= 6 && this.data.mes < 9) {
            this.nroControl = 3;
            this.descripcionEdad = "4A";
            this.descripcionIndex = 5;
            this.descripcion = "4 años";
        }
        if (this.data.anio === 4 && this.data.mes >= 3 && this.data.mes < 6) {
            this.nroControl = 2;
            this.descripcionEdad = "4A";
            this.descripcionIndex = 5;
            this.descripcion = "4 años";
        }
        if (this.data.anio === 4 && this.data.mes < 3) {
            this.nroControl = 1;
            this.descripcionEdad = "4A";
            this.descripcionIndex = 5;
            this.descripcion = "4 años";
        }
        if (this.data.anio === 3 && this.data.mes >= 9) {
            this.nroControl = 4;
            this.descripcionEdad = "3A";
            this.descripcionIndex = 4;
            this.descripcion = "3 años";
        }
        if (this.data.anio === 3 && this.data.mes >= 6 && this.data.mes < 9) {
            this.nroControl = 3;
            this.descripcionEdad = "3A";
            this.descripcionIndex = 4;
            this.descripcion = "3 años";
        }
        if (this.data.anio === 3 && this.data.mes >= 3 && this.data.mes < 6) {
            this.nroControl = 2;
            this.descripcionEdad = "3A";
            this.descripcionIndex = 4;
            this.descripcion = "3 años";
        }
        if (this.data.anio === 3 && this.data.mes < 3) {
            this.nroControl = 1;
            this.descripcionEdad = "3A";
            this.descripcionIndex = 4;
            this.descripcion = "3 años";
        }
        if (this.data.anio === 2 && this.data.mes >= 9) {
            this.nroControl = 4;
            this.descripcionEdad = "2A";
            this.descripcionIndex = 3;
            this.descripcion = "2 años";
        }
        if (this.data.anio === 2 && this.data.mes >= 6 && this.data.mes < 9) {
            this.nroControl = 3;
            this.descripcionEdad = "2A";
            this.descripcionIndex = 3;
            this.descripcion = "2 años";
        }
        if (this.data.anio === 2 && this.data.mes >= 3 && this.data.mes < 6) {
            this.nroControl = 2;
            this.descripcionEdad = "2A";
            this.descripcionIndex = 3;
            this.descripcion = "2 años";
        }
        if (this.data.anio === 2 && this.data.mes < 3) {
            this.nroControl = 1;
            this.descripcionEdad = "2A";
            this.descripcionIndex = 3;
            this.descripcion = "2 años";
        }
        if (this.data.anio === 1 && this.data.mes >= 10) {
            this.nroControl = 6;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 1 && this.data.mes >= 8 && this.data.mes < 10) {
            this.nroControl = 5;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 1 && this.data.mes >= 6 && this.data.mes < 8) {
            this.nroControl = 4;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 1 && this.data.mes >= 4 && this.data.mes < 6) {
            this.nroControl = 3;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 1 && this.data.mes >= 2 && this.data.mes < 4) {
            this.nroControl = 2;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 1 && this.data.mes < 2) {
            this.nroControl = 1;
            this.descripcionEdad = "1A";
            this.descripcionIndex = 2;
            this.descripcion = "1 año";
        }
        if (this.data.anio === 0 && this.data.mes > 0) {
            this.nroControl = this.data.mes;
            this.descripcionEdad = "Menor_1A";
            this.descripcionIndex = 1;
            this.descripcion = "Menor de 1 año";
        }
        if (this.data.anio === 0 && this.data.mes === 0 && this.data.dia < 7) {
            this.nroControl = 1;
            this.descripcionEdad = "RN";
            this.descripcionIndex = 0;
            this.descripcion = "Recien nacido";
        }
        if (
            this.data.anio === 0 &&
            this.data.mes === 0 &&
            this.data.dia >= 7 &&
            this.data.dia < 14
        ) {
            this.nroControl = 2;
            this.descripcionEdad = "RN";
            this.descripcionIndex = 0;
            this.descripcion = "Recien nacido";
        }
        if (
            this.data.anio === 0 &&
            this.data.mes === 0 &&
            this.data.dia >= 14 &&
            this.data.dia < 21
        ) {
            this.nroControl = 3;
            this.descripcionEdad = "RN";
            this.descripcionIndex = 0;
            this.descripcion = "Recien nacido";
        }
        if (
            this.data.anio === 0 &&
            this.data.mes === 0 &&
            this.data.dia >= 21
        ) {
            this.nroControl = 4;
            this.descripcionEdad = "RN";
            this.descripcionIndex = 0;
            this.descripcion = "Recien nacido";
        }
    }

    separacion() {
        this.RN = this.aux.filter((item) => item.descripcionEdad === "RN");
        this.MA = this.aux.filter(
            (item) => item.descripcionEdad === "Menor_1A"
        );
        this.A1 = this.aux.filter((item) => item.descripcionEdad === "1A");
        this.A2 = this.aux.filter((item) => item.descripcionEdad === "2A");
        this.A3 = this.aux.filter((item) => item.descripcionEdad === "3A");
        this.A4 = this.aux.filter((item) => item.descripcionEdad === "4A");
        this.A5 = this.aux.filter((item) => item.descripcionEdad === "5A");
        this.A6 = this.aux.filter((item) => item.descripcionEdad === "6A");
        this.A7 = this.aux.filter((item) => item.descripcionEdad === "7A");
        this.A8 = this.aux.filter((item) => item.descripcionEdad === "8A");
        this.A9 = this.aux.filter((item) => item.descripcionEdad === "9A");
    }

    dataGrafico(list: interfaceCrecimiento[]) {
        //-- agregar antecedentes unshift
        let antecedente;
        this.antecedentes
            .getAntecedentesPersonales(this.data.nroDocumento)
            .subscribe((r: any) => {
                antecedente = r.object.nacimientoperimetroCefalico;
                list.unshift({
                    peso: r.object.nacimiento.pesoAlNacer,
                    talla: r.object.nacimiento.tallaAlNacer,
                    perimetroCefalico: r.object.nacimiento.perimetroCefalico,
                    dias: 0,
                });
            });
        setTimeout(() => {
            this.mesesCircunferencia = [];
            this.mesesPeso = [];
            this.mesesAltura = [];
            this.mesesAlturaPeso = [];
            list.forEach((item, index) => {
                if (
                    item.peso !== 0.0 &&
                    item.talla != 0.0 &&
                    item.perimetroCefalico !== 0.0
                ) {
                    this.mesesPeso.push([item.dias / 30, item.peso / 1000]);
                    this.mesesAltura.push([item.dias / 30, item.talla]);
                    this.mesesCircunferencia.push([
                        item.dias / 30,
                        item.perimetroCefalico,
                    ]);
                    this.mesesAlturaPeso.push([item.talla, item.peso / 1000]);
                }
            });
        }, 1000);
    }

    mesesPeso: any[] = [];
    mesesAltura: any[] = [];
    mesesAlturaPeso: any[] = [];
    mesesCircunferencia: any[] = [];

    //
    onWeightChart(): void {
        // this.determinaEdadPesoTalla();
        const isBoy = this.sexo;
        this.ref = this.dialogService.open(WeightChartComponent, {
            data: {
                dataChild: this.mesesPeso,
                /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoW,
            },
            header: isBoy
                ? "GRÁFICA DE PESO DE UN NIÑO"
                : "GRÁFICA DE PESO DE UNA NIÑA",
            // width: '90%',
            height: "90%",
            width: "70%",
            style: {
                position: "absolute",
                top: "17px",
            },
        });
    }

    onHeightChart(): void {
        const isBoy = this.sexo;
        this.ref = this.dialogService.open(HeightChartComponent, {
            data: {
                dataChild: this.mesesAltura,
                /* debe ser dataChild:[[mes,altura],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoH,
            },
            header: isBoy
                ? "LONGITUD/ESTATURA PARA LOS NIÑOS"
                : "LONGITUD/ESTATURA PARA LOS NIÑAS",
            // width: '90%',
            height: "90%",
            width: "70%",
            style: {
                position: "absolute",
                top: "17px",
            },
        });
    }

    onHeightWeightChart(): void {
        const isBoy = this.sexo;
        this.ref = this.dialogService.open(HeightWeightComponent, {
            data: {
                dataChild: this.mesesAlturaPeso,
                /* debe ser dataChild:[[altura,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoWH,
            },
            header: isBoy
                ? "PESO PARA LA LONGITUD NIÑOS"
                : "PESO PARA LA LONGITUD NIÑAS",
            // width: '90%',
            height: "90%",
            width: "70%",
            style: {
                position: "absolute",
                top: "17px",
            },
        });
    }

    onCircumferenceChart(): void {
        this.listar();
        const isBoy = this.sexo;
        this.ref = this.dialogService.open(CircumferenceChartComponent, {
            data: {
                dataChild: this.mesesCircunferencia,
                /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy,
                diagnostic: this.diagnosticoC,
            },
            header: isBoy
                ? "GRÁFICO DEL PERIMETRO CEFÁLIC0 DE UN NIÑO"
                : "GRÁFICO DEL PERIMETRO CEFÁLIC0 DE UNA NIÑA",
            // width: '90%',
            height: "90%",
            width: "70%",
            style: {
                position: "absolute",
                top: "17px",
            },
        });
    }
}
