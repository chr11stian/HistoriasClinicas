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
export interface datosGeneralesAdultoMayor{
    fecha?:Date,
    nroHcl?:string,
    nroAtendido?:number,
    primerNombre?:string,
    otrosNombres?:string,
    apePaterno?:string,
    apeMaterno?:string,
    sexo?:string,
    edad?:number,
    fechaNacimiento?:Date,
    lugarNacimiento?:string,
    procedencia?:string,
    gradoInstruccion?:string,
    estadoCivil?:string,
    grupoSanguineo?:string,
    rh?:string,
    ocupacion?:string,
    domicilio?:string,
    telefono?:string,
    familiarCuidadorResponsable?:string,
    edadFamiliarCuidador?:number,
    dniFamiliarCuidador?:string
}