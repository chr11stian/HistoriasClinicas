export interface GraphInterface {
    /** titulo del axisX (vertical)*/
    nameAxisX: string
    /** titulo del axisY (vertical)*/
    nameAxisY: string
    /** titulo del grafico */
    titleGraph: string
    /** subtitulo del grafico */
    subTitleGraph: string
    /** unidades de medida  en el ejeX e ejeY*/
    measurementUnits: string[]
    /**/
    series: any[]
    /** */
    hasYears?: boolean
}
