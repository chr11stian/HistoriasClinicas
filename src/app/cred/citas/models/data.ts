export interface dato {
    hidden?: boolean;
    nroDocumento?: string;
    tipoDoc?: string;
    idConsulta?: string;
    dia?: number;
    mes?: number;
    anio?: number;
    sexo?: string;
    fechaNacimiento?: string;
    see?: boolean;
    nroConsulta?: number;
    ups?: string;
    fechaConsulta?: string;
}

export interface outputTriajeInterface {
    fecha: string;
    anioEdad: number;
    mesEdad: number;
    diaEdad: number;
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
    servicio?: string;
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
    controlCrecimiento: interfaceCrecimiento[];
}

export interface inputCrecimiento {
    nombreEvaluacion: string;
    codigoCIE10: string;
    codigoHIS: string;
    codigoPrestacion: string;
    controlCrecimientoDesaMes: interfaceCrecimiento;
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
    dias?: number;
    diagnosticoPE: string;
    diagnosticoTE: string;
    diagnosticoPT: string;
    diagnosticoPC: string;
}

export interface AntecedentesPerinatales {
    embarazo: Embarazo;
    parto: Parto;
    nacimiento: Nacimiento;
    alimentacion: Alimentacion;
}

export interface Alimentacion {
    alimentacion: number;
    inicioAlimentacionComplementaria: string;
    suplementoFe: boolean;
}

export interface Embarazo {
    tipoEmbarazo: boolean;
    listaPatologiasGestacion: PatologiasGestacion[];
    nroEmbarazo: number;
    atencionPrenatal: boolean;
    nroAPN: number;
    lugarAPN: string;
}

export interface PatologiasGestacion {
    nombre: string;
    fecha: Date | string;
    cie10: string;
}

export interface Nacimiento {
    edadGestacionalAlNacer: number;
    pesoAlNacer: number;
    tallaAlNacer: number;
    perimetroCefalico: number;
    perimetroToracico: number;
    respiracionLlantoNacerInmediato: boolean;
    apgar1: number;
    apgar5: number;
    reanimacion: boolean;
    patologiaNeonatal: boolean;
    especifique: string;
    hospitalizacion: boolean;
    tiempoHospitalizacion: number;
}

export interface Parto {
    tipoParto: boolean;
    complicacionesDelParto: string;
    lugarParto: number;
    atendidoPor: number;
    atendidoPorOtro: string;
}

export interface antecedentesPatologicos {
    nombre: string;
}

export interface antecedentesFamiliares {
    nombre: string;
    pariente: string;
    fechaDiagnosticado: string;
    edadAnio: number;
    edadMes: number;
    edadDia: number;
}

export interface ReferenciaInterface {
    id?: string;
    fecha: Date | string;
    tipoSubsidio: string;
    coordinacion: Coordinacion;
}

export interface Coordinacion {
    fechaAtendera: Date | string;
    horaAtendera: string;
    personalAtendera: Personal;
    personalCoordino: Personal;
    tipoReferencia: string;
    especialidad: string;
    condicionPacienteSalida: string;
    motivo: string;
    examenesAuxiliares: ExamenesAuxiliares[];
}

export interface Personal {
    tipoDoc?: string;
    nroDoc?: string;
    profesion?: string;
    colegiatura?: string;
    primerNombre?: string;
    otrosNombres?: string;
    apePaterno?: string;
    apeMaterno?: string;
}

export interface laboratorio {
    datosLaboratorio: datosLaboratorio;
}

export interface datosLaboratorio {
    tipoLaboratorio: string;
    subTipo: string;
    nombreExamen: string;
}

export interface ExamenesAuxiliares {
    tipoExamAux: string;
    subTipo: string;
    nombreExamen: string;
}

export interface acuerdosInterface {
    acuerdosCompromisosCRED: acuerdosCompromisosCRED;
    referencia?: referencia;
    proxCita?: proxCita;
    observacionesConsulta: string;
    interconsultas?: proxCita[];
}
export interface acuerdosCompromisosCRED {
    edadMes: number;
    listaAcuerdosConMadre: listaAcuerdosConMadre[];
}
export interface proxCita {
    idCupos?: string;
    fecha: Date | string;
    motivo?: string;
    servicio?: string;
    estado?: string;
    nivelUrgencia?: string;
}

export interface listaAcuerdosConMadre {
    nroAcuerdo: string;
    descripcion?: string;
    edadMes?: number | string;
}

export interface referencia {
    motivoReferencia?: string;
    nombreIPRESS?: string;
    idRef?: string;
    emitida?: boolean;
    disa?: string;
    lote?: string;
    nroFormato?: string;
    renipress?: string;
}

export interface redInterface {
    disa: string;
    idMicroRed: string;
    idRed: string;
    nombreDisa: string;
    nombreMicroRed: string;
    nombreRed: string;
}

export interface rolInterface {
    app: string;
    escala: string;
    idEESS: string;
    nombreEESS: string;
    permisos: string;
    rol: string;
    nombreRol: string;
}

export interface escala {
    user?: string;
    pass?: string;
    escala: string;
    rol?: string[];
    nombreRol?: string[];
    list?: nombreRol[];
}

export interface nombreRol {
    rol: string;
    nombreRol: string;
}
