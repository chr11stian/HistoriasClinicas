export interface Visitas_Domiciliarias {
  docs: Doc[];
  bookmark: string;
  warning: string;
}

export interface Doc {
  _id: string;
  _rev: string;
  tipo_doc: string;
  fecha_creacion: null;
  datos_generales: DatosGenerales;
  localizacion_vivienda: LocalizacionVivienda;
  visita_salud_familiar: VisitaSaludFamiliar[];
  familia: Familia;
  instrumentos_de_evaluacion: CaracteristicasFamilia[];
  riesgos: CaracteristicasFamilia[];
  caracteristicas_familia: CaracteristicasFamilia[];
  riesgos_entorno: CaracteristicasFamilia[];
  intervenciones: Intervenciones;
  georreferenciacion: Georreferenciacion[];
}

export interface CaracteristicasFamilia {
  id: number;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id: number;
  pregunta: string;
  prioridad_intervencion: PrioridadIntervencion | null;
  valores: string[];
  tipo: number;
  detalles: null;
}

export enum PrioridadIntervencion {
  Alto = "Alto",
  Moderado = "Moderado",
}

export interface DatosGenerales {
  nro_carpeta: string;
  nro_familia_sectorizada: string;
  familia: string;
  geresa: string;
  disa_descripcion: string;
  red: string;
  red_descripcion: string;
  microred: string;
  microred_descripcion: string;
  eess: string;
  eess_descripcion: string;
}

export interface Familia {
  grupo_etnico: string;
  idioma: string;
  religion: string;
  esta_en_riesgo: boolean;
  miembros_familia: MiembrosFamilia[];
}

export interface MiembrosFamilia {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: Date;
  parentesco: string;
  estado_civil: string;
  grado_de_instruccion: string;
  ocupacion: string;
  condicion_ocupacion: string;
  seguro_de_salud: string;
  es_informante: boolean;
  activo: boolean;
  esta_en_riesgo: boolean;
  es_discapacitado: boolean;
  es_gestante: boolean;
}

export interface Georreferenciacion {
  fechahora: Date;
  latitud: number;
  longitud: number;
  altitud: number;
}

export interface Intervenciones {
  salud_individual: SaludIndividual[];
  funciones_de_la_familia: FuncionesDeLaFamilia[];
  condiciones_materiales_de_vida: any[];
}

export interface FuncionesDeLaFamilia {
  sub_seccion: number;
  pregunta: number;
  problema_acuerdos: ProblemaAcuerdos;
}

export interface ProblemaAcuerdos {
  problema: string;
  acuerdos: string;
  actividad_atencion: ActividadAtencion | null;
  responsable: string;
  fecha_programacion: Date;
  fecha_ejecucion: Date | null;
  observaciones: string[] | null;
  estado_atencion: boolean;
}

export interface ActividadAtencion {
  id: string;
  cod: string;
  description: string;
}

export interface SaludIndividual {
  sub_seccion: number;
  pregunta: number;
  dni: string;
  nombre: string;
  apellidos: string;
  edad: string;
  problema_acuerdos: ProblemaAcuerdos;
}

export interface LocalizacionVivienda {
  departamento: string;
  provincia: string;
  distrito: string;
  sector: string;
  idSector: string;
  area_residencia: string;
  telefono: string[];
  direccion: string;
  tiempo_demora_eess: number;
  "transporte frecuente": string;
  tiempo_de_residencia: number;
  residencias_anteriores: any[];
  disponibilidad_visitas: boolean;
  email: string;
}

export interface VisitaSaludFamiliar {
  fecha: Date;
  dni_responsable: string;
  nombres_responsable: NombresResponsable;
  apellidos_responsable: ApellidosResponsable;
  resultado_visita: ResultadoVisita;
  proxima_visita: Date;
}

export enum ApellidosResponsable {
  ValenciaFarfan = "VALENCIA FARFAN",
  ValenciaFarfán = "Valencia Farfán",
}

export enum NombresResponsable {
  Franklin = "Franklin",
  NombresResponsableFRANKLIN = "FRANKLIN ",
}

export enum ResultadoVisita {
  Ejecutado = "Ejecutado",
}
