export interface ConsultaObject {
    cod: string;
    mensaje: string;
    cod_Http: string;
    consulta: Consulta[];
}

export interface Consulta {
    id: string;
    fecha: string;
    datosPaciente: DatosPaciente;
    servicio: string;
    profesionalACargo: ProfesionalACargo;
}

export interface ProfesionalACargo {
    tipoDoc: string;
    nroDoc: string;
    profesion: string;
    colegiatura: string;
    abreviaturaColegio?: any;
    primerNombre: string;
    otrosNombres: string;
    apePaterno: string;
    apeMaterno: string;
}

export interface DatosPaciente {
    primerNombre: string;
    otrosNombres: string;
    apePaterno: string;
    apeMaterno: string;
    celular: string;
    sexo: string;
    etnia: Etnia;
    fechaNacimiento: string;
    nroHclRN?: any;
    domicilio: Domicilio;
    tipoSeguro: string;
    codSeguro: string;
}

interface Domicilio {
    departamento?: any;
    provincia?: any;
    distrito?: any;
    direccion?: any;
    ccpp?: any;
    ubigeo?: any;
}

interface Etnia {
    tipoEtnia: string;
    etnia: string;
}
