export interface ProblemasCronicos {
    fechaProblemasCronicos?: Date,
    controladoCronico?: boolean,
    problemaCronico?: string,
    observaciones?: string
}
export interface ProblemasAgudos {
    fechaProblemasAgudos?: Date,
    controladoAgudo?: boolean,
    problemaAgudo?: string,
    observaciones?: string
}
export interface TratamientosFrecuentes{
    nombre?:string,
    dosis?:number,
    observaciones?:string
}
export interface item{
    nombreItem?:string,
    respuesta?:string,
    puntaje?:number

}
export interface valoracionFuncional{
    items?:item[],
    diagnostico?:string
}
export interface valoracionMental{
    itemsEstadoAfectivo?:item[],
    itemsEstadoCognitivo?:item[],
    diagnosticoAfectivo?:string,
    diagnosticoCognitivo?:string
}
export interface valoracionSocioFamiliar{
    items?:item[],
    diagnostico?:string
}