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