export interface MotivoConsulta {
    funcionesBiologicas: FuncionesBiologicas[],
    signosVitales: {
        temperatura: number,
        presionSistolica: number,
        presionDiastolica: number,
        fc: number,
        fr: number,
        peso: number,
        talla: number,
        imc: number,
        perimetroCefalico?: number
    },
    examenesFisicos: ExamenesFisicos[],
    obsExamenFisico: string,
    resultados?: Resultados[],
    anamnesis: string,
    motivoConsulta: string,
    interMedicinaGeneral: {
        tiempoEnfermedad: string,
        formaInicio: string,
        curso: string,
        observacion: string
    },
}
export interface FuncionesBiologicas {
    funcion: string,
    valor: string,
    detalle: string
}
export interface ExamenesFisicos {
    codigoExamen?: string,   
    nombreExamen: string,
    valor?: string,
    detalle: string
}
export interface Resultados {
    examen: string,
    resultado: string
}