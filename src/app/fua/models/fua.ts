export interface DatosGeneralesFUA {
  codPrestacion: string;
  idFUA: string;
  idConsulta: string;
  deLaIpress: IPRESS;
  delAsegurado: Asegurado;
}
export interface IPRESS {
  eessInformacion: {
    atencion: string;
    codOfertaFlexible: string;
    codRenaes: string;
    lugarAtencion: string;
    nombreEESS: string;
    personalQueAtiende: string;
    referenciaRealizadaPor: string;
  };
  nroFormato: {
    anio: string;
    codEESS: string;
    correlativo: string;
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
  saludMaterna?: string;
  aseguradoDeOtrasIAFAS: {
    codAsegurado: string,
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
