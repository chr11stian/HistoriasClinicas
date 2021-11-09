import {Component, OnInit} from '@angular/core'
import {EChartsOption} from 'echarts'

@Component({
    selector: 'app-graphic',
    templateUrl: './graphic.component.html',
    styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

    chartOption: EChartsOption = {
        title: {
            text: 'Temperature Change in the Coming Week'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: 'Highest',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9],
                markPoint: {
                    data: [
                        {type: 'max', name: 'Max'},
                        {type: 'min', name: 'Min'}
                    ]
                },
                markLine: {
                    data: [{type: 'average', name: 'Avg'}]
                }
            },
            {
                name: 'Lowest',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [{name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}]
                },
                markLine: {
                    data: [
                        {type: 'average', name: 'Avg'},
                        [
                            {
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            },
                            {
                                symbol: 'circle',
                                label: {
                                    position: 'start',
                                    formatter: 'Max'
                                },
                                type: 'max',
                                name: '最高点'
                            }
                        ]
                    ]
                }
            }
        ]
    }


    constructor() {
    }

    ngOnInit(): void {
    }
    // xAxis: {
    //     min: -60,
    //     max: 20,
    //     type: 'value',
    //     axisLine: { onZero: false }
    // },
    // yAxis: {
    //     min: 0,
    //     max: 40,
    //     type: 'value',
    //     axisLine: { onZero: false }
    // },
}
