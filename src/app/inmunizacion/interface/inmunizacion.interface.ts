export interface inmunizacionObject {
    cod: string;
    cod_Http: string;
    mensaje: string;
    object: inmunizacionesInterface[];
}

export interface inmunizacionesInterface {
    datosPaciente: DatosPaciente;
    estado: string;
    id: string;
    inmunizaciones: listInmunizaciones[];
    ipress: Ipress;
}

export interface DatosPaciente {
    apeMaterno?: string;
    apePaterno?: string;
    domicilio?: Domicilio;
    edad?: Edad;
    fechaNacimiento?: Date | null;
    nroDoc?: string;
    nroHcl?: string;
    otrosNombres?: string;
    primerNombre?: string;
    sexo?: string;
    tipoDoc?: string;
}

export interface Domicilio {
    ccpp: null | string;
    departamento: null | string;
    direccion: null | string;
    distrito: null | string;
    provincia: null | string;
    ubigeo: string;
}

export interface Edad {
    anio: number;
    dia: number | null;
    mes: number | null;
}

export interface listInmunizaciones {
    id?: string,
    idInmunizacion?: string,
    idConsulta: string,
    nombre: string,
    estado?: string,
    codPrestacion?: string,
    codProcedimientoSIS?: string,
    cie10SIS?: string,
    codProcedimientoHIS?: string,
    nombreComercial?: string,
    viaAdministracion?: string,
    dosis?: number,
    tipoDosis?: string,
    tipoDx?: string,
    nombreUPS?: string,
    nombreUPSaux?: string,
    cantidad?: string,
    lote?: string,
    fechaVencimiento?: string,
    datosPaciente?: DatosPaciente
}

export interface Ipress {
    disa: string;
    idIpress: string;
    nivel: string;
    nombreEESS: string;
    nombreMicroRed: string;
    nombreRed: string;
    renipress: string;
}

