export interface HemoExam {
    descripcion: string,
    hg: number,
    lab: string,
    conFactorCorreccion: number,
    fecha: string
}
export interface OtherExam {
    nombre: string,
    valor: string[],
    fecha: string,
    lab?: string,
    valor1?: string,
    valor2?: string,
    valor3?: string,
    valor4?: string,
    saved?: boolean,
    cie10?: string
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
export interface DataExamSave {
    nombreExamen: string,
    nombreExamenSIS: string,
    cie10SIS: string,
    nombreUPS: string,
    nombreUPSaux: string,
    codPrestacion: string,
    codigoSIS: string,
    codigoHIS: string,
    tipoDx: string,
    lab: string,
    valor: string,
    factorCorreccion?: number,

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