export interface ObjectEscalaEEDP {
    EscalaEEDP: EscalaEEDP
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
    codEvaluacion: string,
    evaluacion: string,
    eedpkey: string,
    eedpValue: boolean,
    pautaBreveN: boolean,
    pautaBreveD: boolean
}