export interface ObjectEscalaEEDP {
    EscalaEEDP: EscalaEEDP
}

export interface escalaEval_EEDP_0_4_anios {
    edad: number,
    condicion: string,
    fecha: string,
    examinador: string,
    puntajeTotalEedp: string
    item: datosEEDPTabla[],
    deleted: boolean,
    // created_at: string,
    // created_by: string,
    // modified_at: string,
    // modified_by: string
}

export interface datosEEDPTabla {
    codigo: string,
    areEvaluacion: string,
    descripcion: string,
    puntajeMaximo: string,
    puntajeEEDP: string,
    puntajeBreveN: boolean,
    puntajeBreveR: boolean
}

// export interface tablaComparativa {
//     id: string,
//     edad: string,
//     tabla: datostabla[]
// }

export interface tablaComparativa {
    em_ec: string,
    pe: string
}

export interface EscalaEEDP {
    Un_mes: DatosEEDP[];
    Dos_meses: DatosEEDP[];
    Tres_meses: DatosEEDP[];
    Cuatro_meses: DatosEEDP[];
    Cinco_meses: DatosEEDP[];
    Seis_meses: DatosEEDP[];
    Siete_meses: DatosEEDP[];
    Ocho_meses: DatosEEDP[];
    Nueve_meses: DatosEEDP[];
    Diez_meses: DatosEEDP[];
    Doce_meses: DatosEEDP[];
    Catorce_meses: DatosEEDP[];
    Dieciocho_meses: DatosEEDP[];
    Veintiuno_meses: DatosEEDP[];
    Veinticuatro_meses: DatosEEDP[];
    Tres_anios: DatosEEDP[];
    Cuatro_anios: DatosEEDP[];
}

export interface DatosEEDP {
    codigo: string,
    areEvaluacion: string,
    descripcion: string,
    puntajeMaximo: string,
    puntajeEEDP: boolean,
    puntajeBreveN: boolean,
    puntajeBreveR: boolean
}
export interface AnswerEEDP {
    codigo: number,
    puntajeEEDP: string,
    areaEvaluacion: string
}
export interface ItemEEDP {
    edad: number,
    puntajeTotalEedp: number,
    puntajeMaximoEedp: number,
    itemEedp?: AnswerEEDP[]
}
export interface TestEEDP {
    fecha: string,
    edadCronologica: number,
    edadMental: number,
    diagnostico: string,
    coeficienteDesarrolllo: number,
    examinador: string,
    listaUltimasPreguntas?: [{
        clave?: string,
        numeroPregunta?: number
    }],
    listaItemEedp: ItemEEDP[]
}