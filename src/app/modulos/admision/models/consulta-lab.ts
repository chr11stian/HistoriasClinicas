export interface ConsultaObject {
    cod: string;
    mensaje: string;
    cod_Http: string;
    consulta: Consulta[];
}

export interface Consulta {
    created_at?: any;
    created_by?: any;
    modified_at?: any;
    modified_by?: any;
    deleted: boolean;
    id: string;
    turno?: any;
    actividad?: any;
    lote?: any;
    pagina: number;
    fechaProceso?: any;
    anio: number;
    mes?: any;
    nombreIpress?: any;
    ups: string;
    upsAuxiliar: string;
    nombreDigitador?: any;
    codigoDigitador?: any;
    nombreProfesional?: any;
    dniProfesional?: any;
    colegiatura?: any;
    dia: number;
    horaAtencion?: any;
    saludMaterna?: any;
    tipoDoc: string;
    nroDoc: string;
    nombre: string;
    apePaterno: string;
    apeMaterno: string;
    sexo: string;
    etnia?: any;
    edad: number;
    denominacionEdad?: any;
    fechaNacimiento?: any;
    nroHcl?: any;
    ccpp?: any;
    distrito?: any;
    sector?: any;
    financiamiento?: any;
    registroOpcional?: any;
    grupoRiesgo?: any;
    fum?: any;
    semanaGestacion: number;
    peso: number;
    talla: number;
    hb?: any;
    fechaRegistroHB?: any;
    perimetroCefalico: number;
    perimetroAbdominal: number;
    conIngEs?: any;
    conIngSe?: any;
    idConsulta: string;
    diagnosticos: Diagnostico[];
    ipressDatos?: any;
    personalDatos: PersonalDatos;
    fechaRegistro: string;
    fechaConsulta?: any;
}

export interface PersonalDatos {
    tipoDoc: string;
    nroDoc: string;
    primerNombre: string;
    otrosNombres: string;
    apePaterno: string;
    apeMaterno: string;
    profesion: string;
    colegioProfesional: string;
    colegiatura: string;
    abreviaturaColegio: string;
}

export interface Diagnostico {
    cie_10: string;
    diagnostico: string;
    tipoDx: string;
    lab: string;
}
