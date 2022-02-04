import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class FillDataGraphService {

    constructor() {
    }


    // fillDataGraph(data: any, series: string[], axisX: number[], addSerie: number[][]): Array<any> {
    //     const valueSeriesEcharts = []
    //     series.forEach((field, i) => {
    //         if (axisX.length !== data[field].length) {
    //             console.log('las longitudes no coinciden')
    //         } else {
    //             const arr = (data[field] as Array<any>).map((v, index) => {
    //                 return [axisX[index], v]
    //             })
    //             valueSeriesEcharts.push(arr)
    //         }
    //     })
    //     if (addSerie.length > 0) {
    //         valueSeriesEcharts.push(addSerie)
    //     }
    //     return valueSeriesEcharts
    // }

    fillDataGraphV2(data: any,
                    nameSeries: string[],
                    addSerie: Array<number[]>,
                    attributeAddSerie: { color: string, name: string },
                    colors: string[],
                    measurementUnits: { xAxis: 'meses' | 'cm' | 'trimestre', yAxis: 'kg' | 'cm' }
    ): Array<any> {
        const valueSeriesEcharts = []
        if (nameSeries.length !== colors.length) {
            console.log('no coinciden las longitudes ')
            alert('no coinciden las longitudes ')
            return valueSeriesEcharts
        }
        nameSeries.forEach((name, iName) => {
            valueSeriesEcharts.push(this.serieChart(colors[iName], name, data[name]))
        })
        if (addSerie.length > 0) {
            valueSeriesEcharts.push(this.serieChart(attributeAddSerie.color, attributeAddSerie.name, addSerie))
        }
        if (measurementUnits.xAxis === 'meses') {
            valueSeriesEcharts[0]['markLine'] = this.getMarkLineMeses()
        } else if (measurementUnits.xAxis === 'trimestre') {
            valueSeriesEcharts[0]['markLine'] = this.getMarkLineTrimestre()
        }
        console.log('data ', valueSeriesEcharts)
        return valueSeriesEcharts
    }

    getMarkLineTrimestre() {
        return {
            silent: true,
            lineStyle: {
                color: 'rgba(0,0,0,0.69)',
                width: 2,
            },

            label: {
                formatter: (params) => {
                    const year = Math.floor((params.value as number) / 13)
                    return year + ' ° Trimestre'
                },
                fontSize: 14,
            },
            data: [
                {
                    xAxis: 13,
                },
                {
                    xAxis: 13 * 2,
                },
                {
                    xAxis: 13 * 3,
                }
            ],
        }

    }

    getMarkLineMeses() {
        return {
            silent: true,
            lineStyle: {
                color: 'rgba(0,0,0,0.69)',
                width: 2,
            },

            label: {
                formatter: (params) => {
                    const year = Math.floor((params.value as number) / 12)
                    if (year === 1) {
                        return year + ' año'
                    }
                    return year + ' años'
                },
                fontSize: 14,
            },
            data: [
                {
                    xAxis: 12,
                },
                {
                    xAxis: 12 * 2,
                },
                {
                    xAxis: 12 * 3,
                },
                {
                    xAxis: 12 * 4,
                },
                {
                    xAxis: 12 * 5,
                },
            ],
        }

    }

    serieChart(color: string, name: string, data: number[][]) {
        return {
            smooth: 0.6,
            symbol: 'none',
            name: name,
            type: 'line',
            color: color,
            grid: {
                show: true,
                borderColor: '#000000',
            },
            endLabel: {
                show: true,
                formatter: (params) => {
                    return name
                },
                // fontWeight: 'bold',
                fontWeight: 'bold',
                color: color,
                fontSize: 16
            },
            data: data,
            xAxis: {
                show: true
            },
            hoverLayerThreshold: 5
        }
    }
}
