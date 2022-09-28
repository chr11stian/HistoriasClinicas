export interface HemoExam {
    descripcion: string,
    hg: string,
    conFactorCorreccion: string,
    fecha: string
}
export interface OtherExam {
    nombre: string,
    valor: string,
    fecha: string,
    valor1?: string,
    valor2?: string,
    valor3?: string,
    valor4?: string,
    saved?: boolean,
}
export interface Pregmant {
    estado: string,
    id: string,
    nroConsultas: number,
    nroDoc: string,
    nroEmbarazo: number,
    nroHcl: string,
    tipoDoc: string
}
export interface HemoResult {
    hg: string,
    factorCorrec: string
}
export interface DataSave {
    nombre: string,
    valor: string,
    cie10?: string
}
export interface LaboratoryExam {
    nombreExamen: string
    nombreExamenSIS: string
    cie10SIS: string
    nombreUPS: string;
    nombreUPSaux: string
    codPrestacion: string;
    codigoHIS: string;
    codigoSIS: string;
    tipoDx: string;
    lab: string;

    valor?: string;
    factorCorreccion?: number;
    idExamenLaboratorio?: string
    idLaboratorio?: string
    labExterno?: string
    lugarExamen?: string
    resultado?: string
    subTipo?: string
    tipoLaboratorio?: string
}