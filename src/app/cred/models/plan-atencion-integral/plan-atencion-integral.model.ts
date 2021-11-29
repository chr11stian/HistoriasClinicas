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