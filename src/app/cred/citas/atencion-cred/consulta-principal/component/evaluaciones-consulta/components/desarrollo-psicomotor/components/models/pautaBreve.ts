export interface AnswerPB {
    pregunta: number,
    areaEvaluacion: string,
    descripcion?: string,
    estadoN: boolean,
    estadoD: boolean,
}
export interface EvaluationPB {
    codigoCIE10: string,
    codigoHIS: string,
    codigoPrestacion: string,
    evaluacionPautaBreveMes?: {
        fechaAtencion: string,
        mesEdad: number,
        diagnostico: string,
        docExaminador: string,
        listaItemPB: AnswerPB[]
    }
}