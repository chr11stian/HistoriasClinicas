export interface dato {
    nroDocumento?: string,
    tipoDoc?: string,
    idConsulta: string,
    dia?: number,
    mes?: number,
    anio?: number
    sexo: string,
    fechaNacimiento?: string
}

export interface outputTriajeInterface {
    fecha: string,
    anioEdad: number,
    mesEdad: number,
    diaEdad: number,
    signosVitales: SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    presentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
    obsSignosVitales: string;
}

export interface triajeInterface {
    signosVitales: SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    presentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
    obsSignosVitales: string;
}

export interface interconsultaInterface {
    signosVitales: SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    presentaSigno: boolean;
    obsSignosVitales: string;
}

export interface datosConsultaInterface {
    listaSignosAlarma: ListaSignosAlarma[];
    presentaSigno: boolean;
    factorRiesgo: FactorRiesgo;
    anamnesis: string;
}

export interface motivoConsultaInterface {
    motivoConsulta: string;
    signosVitales: SignosVitales;
    obsSignosVitales: string;
    examenesFisicos: ExamenesFisico[];
    examenNeurologico: ExamenesFisico[];
    obsExamenFisico: string;
    obsExamenNeurologico: string;
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

export interface controlCrecimiento {
    controlCrecimiento: interfaceCrecimiento[]
}

export interface inputCrecimiento {
    nombreEvaluacion: string,
    codigoCIE10: string,
    codigoHIS: string,
    codigoPrestacion: string,
    controlCrecimientoDesaMes: interfaceCrecimiento
}

export interface interfaceCrecimiento {
    peso: number;
    talla: number;
    imc: number;
    perimetroCefalico: number;
    edadMes: number;
    descripcionEdad: string;
    genero: string;
    nroControl: number;
    estadoAplicado: boolean;
    fechaTentativa: string | Date;
    fecha: string | Date;
    dias?: number
}

