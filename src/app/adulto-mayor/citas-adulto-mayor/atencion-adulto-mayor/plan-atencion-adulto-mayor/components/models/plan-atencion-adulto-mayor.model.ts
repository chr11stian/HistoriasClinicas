export interface ProblemasCronicos {
    fechaProblemasCronicos1?: Date,
    fechaProblemasCronicos2?: Date,
    fechaProblemasCronicos3?: Date,
    observaciones1?: string,
    observaciones2?: string,
    observaciones3?: string,
    controladoCronico?: boolean,
    problemaCronico?: string

}
export interface ProblemasAgudos {
    fecha1ProblemasAgudos?: Date,
    observacionesAgudo1?: string,
    fecha2ProblemasAgudos?: Date,
    observacionesAgudo2?: string,
    fecha3ProblemasAgudos?: Date,
    observacionesAgudo3?: string,
    problemaAgudo?: string
}
export interface problema{
    nombreProblema?:string,
    fecha?:Date,
    observacion?:string,
}
export interface PlanEvaluacionAdulto{
    descripcion?: string;
    primeraFecha?: Date;
    atendido1?:boolean;
    segundaFecha?: Date;
    atendido2?:boolean;
    terceraFecha?: Date;
    atendido3?:boolean;
    lugar?: string;
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
export interface AntecedentesPersonales{
    nombre?:string,
    valor?:boolean
}
export interface AntecedentesFamiliares{
    nombre?:string,
    valor?:boolean,
    familiar?:string
}
