// Generated by https://quicktype.io

export interface Documento {
    idCupo:       string;
    idConsulta:   string;
    tipoDoc:      string;
    nroDocumento: string;
    anio:         number;
    mes:          number;
    dia:          number;
    sexo:         string;
    ups:          string;
    tipoConsulta: string; 
    /* lista cupos */
    fechaNacimiento?:string;
    estadoAtencion?:string;
}