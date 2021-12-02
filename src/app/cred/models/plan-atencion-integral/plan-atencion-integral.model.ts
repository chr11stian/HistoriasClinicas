export interface Inmunizaciones {
    descripcionEdad: string,
    nombreVacuna: string,
    nroDosis: number,
    estado: boolean,
    fecha?: string,
    fechaTentativa?: string
}
export interface ControlCrecimiento{
    descripcionEdad: string,
    genero?: string,
    nroControl: number,
    peso: number,
    talla: number,
    fecha?: string,
    fechaTentativa: string
}
export interface SuplementacionMicronutrientes{
    descripcionEdad: string,
    nombre: string,
    nroSuplemento: number,
    estado: boolean,
    fecha?: string,
    fechaTentativa: string
}
export interface TratamientoSeguimientoAnemia{
    descripcionEdad?: string,
    nombre: string,
    nroControl: number,
    valorHb: number,
    fecha?: string,
    fechaTentativa?: string
}
export interface SesionesTempranas{
    descripcion: string,
    fecha: string
}
export interface respuestaSesionesTempranas{
    cod: string,
    mensaje: string,
    cod_Http: string,
    object: SesionesTempranas[]
}