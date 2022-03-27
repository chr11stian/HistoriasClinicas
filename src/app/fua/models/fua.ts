export interface DatosGeneralesFUA {
  codPrestacion?: string;
  idFUA?: string;
  idConsulta?: string;
  deLaIpress: IPRESS;
  delAsegurado?: Asegurado;
}
export interface IPRESS {
  eessInformacion: {
    atencion: string;
    codOfertaFlexible: string;
    codRenaes: string;
    lugarDeAtencion: string;
    nombreEESS: string;
    personalQueAtiende: string;
    referenciaRealizadaPor?: string;
  };
  nroFormato: {
    anio: string;
    codEESS: string;
    correlativo: number;
  };
}
export interface Asegurado {
  tdi: string;
  nroDoc: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  primerNombre: string;
  otrosNombres: string;
  nroHistoriaClinica: string;
  saludMaterna: string;
  aseguradoDeOtrasIAFAS: {
    codSeguro: string,
    institucion: string,
  } //idk
  sexo: string;
  etnia: string;
  rn01: string;
  nr02: string;
  nr03: string;
  codAseguradoSis: {
    afiliacion: string;
    diresaOtros: string;
    nro: string;
  };
  fecha: {
    fechaParto: string;
    fechaNacimiento: string;
    fechaFallecimiento: string;
  };
}
export interface KeyData {
  idConsulta: string,
  id: string,
  codPrestacion: string
}
/**SEGUNDA PARTE FUA*/
export interface Atencion {
  fechaAtencion: string,
  hora: string,
  ups: string,
  prestacionesAdicionales: string,
  codAutorizacion: string,
  nroFuaVincular: string,
  hospitalizacion: {
    fechaIngreso: string,
    fechaAlta: string,
    fechaCorteAdministrativo: string
  }
}
export interface ConceptoPrestacional {
  atencionDirecta: string,
  cobExtraOrdinario: {
    nroAutorizacion: string,
    monto: number
  },
  traslado: string,
  sepelio: string
}
export interface DestinoAsegurado {
  alta: string,
  cita: string,
  hospitalizacion: string,
  referido: string,
  contraReferido: string,
  fallecido: string,
  corteAdministrado: string
}
export interface RefiereContrarefiere {
  codigoRenaesIpress: string,
  nombreIpress: string,
  nroHojaReferenciaContrareferencia: string
}
export interface ActividadesPreventivas {
  peso: number,
  talla: number,
  pa: string,
  deLaGestante: {
    cpn: string,
    edadGesacional: number,
    alturaUterina: number,
    partoVertical: string,
    controlPerperio: string
  },
  delRecienNacido: {
    edadGestacionalRN: number,
    apgar1ro: string,
    apgar5to: string,
    corteTardioCordon: string
  },
  etapaDeVida: {
    nroCred: number,
    rnPrematuro: string,
    bajoPesoNacer: string,
    enfermedadCongenitaAlNacer: string,
    nroFamiliaresGestante: number,
    pab: number,
    tapEedpTepsi: string,
    consejeriaNutricional: string,
    consejeriaIntegral: string,
    imc: number
  },
  jovenAdultoEvaluacionIntegral: string,
  adultoMayor: {
    vacam: string,
    tamizajeSaludMental: string
  }
}
export interface Diagnostico {
  nro: number,
  diagnosticoHIS: string,
  cie10HIS: string,
  diagnosticoSIS: string,
  cie10SIS: string,
  tipo: string,
  codPrestacion: string,
  nombreUPS: string,
  factorCondicional: string,
  lab: string
  nombreUPSaux: string,
  patologiaMaterna: string
}
export interface ResponsableAtencion {
  nroDoc: string,
  nombreResponsableAtencion: string,
  nroColegiatura: string,
  responsableAtencion: string,
  especialidad: string,
  nroRNE: string,
  egresado: string
}
export interface SegundaParteFUA {
  aseguradoApoderado?: string,
  firma?: string,
  apoderado?: string,
  nroDocCeApoderado?: string,
  firmaSelloResponsableAtencion?: string,
  huellaDigital?: string,
  estado?: string

  deLaAtencion?: Atencion,
  conceptoPrestacional?: ConceptoPrestacional,
  destinoDelAsegurado?: DestinoAsegurado,
  refiereContrarefiere?: RefiereContrarefiere,
  actividadesPreventivas?: ActividadesPreventivas,
  diagnostico?: Diagnostico,
  vacunas?: Vacunas[],
  responsableAtencion?: ResponsableAtencion,
}
export interface Vacunas {
  dosis: number,
  nombre: string
}
