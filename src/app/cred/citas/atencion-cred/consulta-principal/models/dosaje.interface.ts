export interface DosajeHemoglobina{
    tipoTratamiento:string
    descripcionEdad: string,
    nombre: string,
    edadMes: number,
    nroControl: number,
    valorHb: number,
    factorCorreccion:string
    estadoControlado: boolean,
    estadoAnemia:string,
    nivelAnemia:string
    fecha:Date,
    fechaTentativa: Date
}