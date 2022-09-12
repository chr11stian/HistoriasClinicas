export interface Prestation {
    codigo: number;
    descripcion: string;
    diagnostico: Diagnostic[];
    denominacion: string;
    edadMax: number;
    edadMin: number;
    sexo: string;
    procedimientos: Procedures[]
}
export interface Procedures {
    codigo: string;
    dx: string;
    eje: string;
    estado: string;
    ind: string;
    procedimiento: string;
    res: string;
}
export interface Diagnostic {
    grupo: string;
    diagnostico: string;
    cie10: string;
    criterio: string;
    estado: string;
}
export interface DiagnosticSave {
    nro: number;
    diagnosticoHIS: string;
    diagnosticoSIS: string;
    cie10SIS: string;
    cie10HIS: string;
    tipo: string;
    codPrestacion: string;
    nombreUPS: string;
    nombreUPSaux: string;
    lab: string;
    factorCondicional?: string;
    patologiaMaterna?: boolean;
}
export interface DiagnosticFUA {
    codPrestacion: string;
    tipoDiagnostico: string;
    diagnostico: string;
    CIE10: string;
}
export interface DiagnosticHIS {
    nombreUPS: string,
    nombreUPSaux: string;
    lab: string;
    tipoDiagnostico: string;
    diagnosticoHIS: string;
    CIE10: string;
}
export interface ProceduresSave {
    procedimientosSIS: string;
    codProcedimientoSIS: string;
    codPrestacion: string;
    cie10SIS: string;
    procedimientosHIS: string;
    codProcedimientosHIS: string;
    nombreUPS: string;
    nombreUPSaux: string;
    tipo: string;
    lab: string;
    resultadoFua?: string
}
export interface ProcedureFUA {
    procedimientoSIS: string;
    codProcedimientoSIS: string;
    codPrestacion: string;
    cie10SIS: string;
    tipoDiagnostico: string;
}
export interface ProcedureHIS {
    procedimientosHIS: string;
    codProcedimientoHIS: string;
    nombreUPS: string;
    nombreUPSaux: string;
    tipoDiagnostico: string;
    lab: string;
    resultadoFua?: string;
}
export interface ProcedurePrestation{
    id:string;
    codPrestacion:string;
    procedimientos: Procedure[];
}
export interface Procedure{
    codigo:string;
    procedimiento:string;
    ind?:string;
    eje?:string;
    dx?:string;
    res?:string;
    estado:string
}