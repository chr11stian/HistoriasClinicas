import {Component, Input, OnInit} from '@angular/core'
import {EChartsOption} from 'echarts'

@Component({
    selector: 'app-graphic',
    templateUrl: './graphic.component.html',
    styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
    @Input() valueAxisX: number[] = []
    @Input() valueAxisY: number[][] = []
    @Input() colors: string[] = []
    @Input() names: string[] = []
    color: string = '#147544'

    chartOption: EChartsOption = {}


    constructor() {
    }

    ngOnInit(): void {
        this.chartOption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            xAxis: {
                type: 'value',
                boundaryGap: true,
                minorTick: {
                    show: true,
                    // lineStyle: {
                    //     color: 'rgba(9,9,9,0.9)'
                    // }
                },
                minorSplitLine: {
                    show: true,
                    // lineStyle: {
                    //     color: 'rgba(9,9,9,0.73)',
                    // }
                },
                nameGap: 2,
                axisLine: {}
            },
            yAxis: {
                type: 'value',
                name: 'Peso',
                axisLabel: {
                    formatter: '{value}'
                },
                minorTick: {
                    show: true,
                    // lineStyle: {
                    //     color: 'rgba(9,9,9,0.9)'
                    // }
                },
                minorSplitLine: {
                    show: true,
                    // lineStyle: {
                    //     color: 'rgba(9,9,9,0.73)',
                    // }
                },
                nameGap: 2,
            },
            series: this.valueAxisY.map((v, indexV) => {
                return {
                    smooth: 0.6,
                    symbol: 'none',
                    name: this.names[indexV],
                    type: 'line',
                    color: this.colors[indexV],
                    grid: {
                        show: true,
                        borderColor: '#000000',

                    },
                    data: this.valueAxisY[indexV].map((value, iValue) => {
                        return [iValue + 1, value]
                    }),
                    xAxis: {
                        show: true
                    }
                }
            })
        }
    }

}
