import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {EChartsOption} from 'echarts'
import {GraphInterface} from '../../models/graph.interface'

@Component({
    selector: 'app-graphic',
    templateUrl: './graphic.component.html',
    styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit, OnChanges {
    @Input() data: GraphInterface
    chartOption: EChartsOption = {}

    constructor() {
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data.currentValue !== changes.data.previousValue) {
            const titleGraph = {
                text: this.data.titleGraph,
                subtext: this.data.subTitleGraph === undefined ? '' : this.data.subTitleGraph
            }
            const tooltipGraph: any = {
                trigger: 'axis',
                align: 'center',
                show: true
            }
            const xAxisGraph: any = {
                type: 'value',
                name: this.data.nameAxisX,
                nameLocation: 'middle',
                nameTextStyle: {
                    align: 'center',
                    lineHeight: 70,
                    padding: [3, 3, 3, 3],
                    fontWeight: 'bold',
                    fontSize: 14
                },
                minorTick: {
                    show: true,
                    splitNumber: 2,
                    lineStyle: {
                        color: 'rgb(0,0,0)'
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000000',
                        type: 'solid',
                        opacity: 0.3
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000000',
                        type: 'solid',
                        opacity: 0.3
                    }
                },
                splitNumber: 30
            }
            const yAxisGraph: any = {
                type: 'value',
                splitNumber: 16,
                name: this.data.nameAxisY,
                nameLocation: 'middle',
                nameTextStyle: {
                    align: 'center',
                    lineHeight: 120,
                    fontWeight: 'bold',
                    fontSize: 14
                },
                axisLabel: {
                    fontWeight: 'bold',
                    fontSize: 14,
                    formatter: `{value} ${this.data.measurementUnits[0]}`
                },
                minorTick: {
                    show: true,
                    splitNumber: 2,
                    length: 5,
                    lineStyle: {
                        type: 'solid',
                        color: '#000000',
                        width: 1,
                        cap: 'butt'
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000000',
                        type: 'solid',
                        opacity: 0.3
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#000000',
                        opacity: 0.3
                    }
                },
                nameGap: 2,

            }
            if (this.data.typeAxisX === 'year') {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            const year = Math.floor((params.value as number) / 12)
                            const mes = Math.floor((params.value as number) % 12)
                            if (year > 0) {
                                if (year === 1) {
                                    if (mes > 0) {
                                        return year + ' año ' + mes + ' mes(es)'
                                    }
                                    return year + ' año '
                                }
                                if (mes > 0) {
                                    return year + ' años ' + mes + ' mes(es)'
                                }
                                return year + ' años'
                            } else {
                                return mes + ' mes(es)'
                            }
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14
                }
                xAxisGraph['nameGap'] = 2
            } else if (this.data.typeAxisX === 'trimestre') {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            return params.value + ' semanas'
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14,
                    formatter: (value, index) => {
                        return value
                    }
                }
                yAxisGraph['min'] = -4
            } else if (this.data.typeAxisX === 'altura') {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            return params.value + 'cm'
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14
                }
                yAxisGraph['min'] = 40
                yAxisGraph['max'] = 125
                // xAxisGraph['max'] = 60
                xAxisGraph['nameGap'] = 2
            }  else if (this.data.typeAxisX === 'circunferencia') {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            return params.value + 'cm'
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14
                }
                yAxisGraph['min'] = 31.5
                yAxisGraph['max'] = 54
                xAxisGraph['max'] = 60
                // xAxisGraph['max'] = 60
                xAxisGraph['nameGap'] = 2
            } else if (this.data.typeAxisX === 'longitud') {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            return params.value + 'cm'
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14
                }
                xAxisGraph['min'] = 45
                xAxisGraph['max'] = 110
                // xAxisGraph['min'] = 45
                // xAxisGraph['max'] = 60
                xAxisGraph['nameGap'] = 2
            } else {
                tooltipGraph['axisPointer'] = {
                    show: true,
                    label: {
                        formatter: function (params) {
                            const year = Math.floor((params.value as number) / 12)
                            const mes = Math.floor((params.value as number) % 12)
                            if (year > 0) {
                                if (year === 1) {
                                    if (mes > 0) {
                                        return year + ' año ' + mes + ' mes(es)'
                                    }
                                    return year + ' año '
                                }
                                if (mes > 0) {
                                    return year + ' años ' + mes + ' mes(es)'
                                }
                                return year + ' años'
                            } else {
                                return mes + ' mes(es)'
                            }
                        }
                    }
                }
                xAxisGraph['axisLabel'] = {
                    rotate: 90,
                    fontWeight: 'bold',
                    fontSize: 14,
                    formatter: (value, index) => {
                        if (value % 12 === 0 && Math.floor(value / 12) > 0) {
                            const year = Math.floor(value / 12)
                            return year + ''
                        }
                        return value % 12 + ''
                    }
                }
            }
            this.chartOption = {
                title: titleGraph,
                tooltip: tooltipGraph,
                xAxis: xAxisGraph,
                yAxis: yAxisGraph,
                series: this.data.series,
                // series: {
                //    hoverLayerThreshold:5
                // },
            }
        }
    }


}
