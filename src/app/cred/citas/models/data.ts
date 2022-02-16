export interface dato {
    nroDocumento: string,
    tipoDoc: string,
    idConsulta: string
}

export interface outputTriajeInterface {
    fecha: string,
    "anioEdad": number,
    "mesEdad": number,
    "diaEdad": number,
    signosVitales: SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    noPresentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
    obsSignosVitales: string;
}

export interface triajeInterface {
    signosVitales: SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    noPresentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
    obsSignosVitales: string;
}

export interface datosConsultaInterface {
    listaSignosAlarma: ListaSignosAlarma[];
    noPresentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
}

export interface motivoConsultaInterface {
    motivoConsulta: string;
    signosVitales: SignosVitales;
    obsSignosVitales: string;
    interMedicinaGeneral: InterMedicinaGeneral;
    examenesFisicos: ExamenesFisico[];
    obsExamenFisico: string;
}

export interface FactorRiesgo {
    cuidaNinio: string;
    participaPadre: boolean;
    recibeAfecto: boolean;
    especificacion: string;
}

export interface ListaSignosAlarma {
    codSigno: string;
    tipoEdad: string;
    nombreSigno: string;
    valorSigno: boolean;
}

export interface SignosVitales {
    temperatura: number;
    presionSistolica: number;
    presionDiastolica: number;
    fc: number;
    fr: number;
    peso: number;
    talla: number;
    imc: number;
    perimetroCefalico: number;
}

export interface ExamenesFisico {
    codigoExamen: string;
    nombreExamen: string;
    valor: string;
}

export interface InterMedicinaGeneral {
    tiempoEnfermedad: string;
    formaInicio: string;
    curso: string;
    observacion: string;
}

