export interface CreateConsultaInterface {
    tipoDoc: string
    nroDoc: string
    tipoDocProfesional: string
    nroDocProfesional: string
}

export interface ConsultaAPI {
    cod: string;
    mensaje: string;
    cod_Http: string;
    object: ConsultaGeneralInterface;
}


export interface ConsultaGeneralInterface {
    /** fecha de creacion */
    created_at: String;
    /** Por quien ha sido creado*/
    created_by: string;
    /** cuando ha sido modificado */
    modified_at: String;
    /** por quien ha sido modificado */
    modified_by: string;
    /** si ha sido eliminado */
    deleted: boolean;
    /** id de la consulta */
    id: string;
    datosGenerales: DatosGenerales;
    /** motivos de la consulta */
    motivosConsulta: any;
    /** diagnostiocos de la consulta*/
    diagnosticos: any;
    /** tratamiento e intervenciones */
    tratamientoIntervenciones: any;
    /** Acuerdo de compromiso de los padres*/
    acuerdosCompromisosMadres: any;
    /** Examen auxiliar */
    examenesAuxiliares: any;
    /** Finalizacion de la atencion */
    finalizarAtencion: FinalizarAtencion;
}


export interface DatosGenerales {
    datosGeneralesConsulta: DatosGeneralesConsulta;
    descarteSignosPeligro: any;
    anamnesis: any;
}

export interface DatosGeneralesConsulta {
    /** tipo de documento del paciente */
    tipoDocPaciente: string;
    /** numero de documento del paciente */
    nroDocPaciente: string;
    /** numero de historia */
    nroHistoria: any;
    /** Nombres y apellidos del paciente */
    nombresApellidos: string;
    /** Fecha de la atencion de la consulta */
    fechaAtencionConsulta: string;
    /** Edad del paciente */
    edad: Edad;
    /** Hora de la consulta */
    hora: string;
}

export interface Edad {
    anio: string;
    mes: string;
    dia: string;
}

export interface FinalizarAtencion {
    acuerdosComprimisos: any;
    examenesAux: any;
    referencia: any;
    evaluacion: any;
    proximaCita: any;
    atendidoPor: string;
    dniPersonal: string;
    observacion: any;
}

/** Input  */
export interface ConsultaInputType {
    datosGeneralesConsulta: DatosGeneralesConsultaInputType;
    /* Descarte de signos de peligro*/
    descarteSignosPeligro: DescarteSignosPeligroInput;
    anamnesis: string;
}

export interface DatosGeneralesConsultaInputType {
    tipoDocPaciente: string;
    nroDocPaciente: string;
    nroHistoria: string;
    nombresApellidos: string;
    fechaAtencionConsulta: string;
    edad: Edad;
    hora: string;
}

export interface DescarteSignosPeligroInput {
    /** menor de dos anios */
    menor2M: Menor2MInput[];
    /** de 2 meses a 4 anios */
    menor2Ma4A: Menor2MInput[];
    /** Todas las edades */
    todasLasEdades: Menor2MInput[];
    /** no presentan signos*/
    noPresentaSigno: boolean;
    /** factor de riesgo a identificar */
    factorRiesgo: FactorRiesgoInput;
}

export interface FactorRiesgoInput {
    /** quien cuida al ninio */
    cuidaNinio: string;
    /** participa el apdre en el cuidado del ninio */
    participaPadre: boolean;
    /** ninio recibe muestras de afecto */
    recibeAfecto: boolean;
    /** detalle de */
    especificacion: string;
}

export interface Menor2MInput {
    codigo: string;
    valor: boolean;
    descripcion: string;
}
