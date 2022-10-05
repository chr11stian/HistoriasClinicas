export interface VisitasProfesionalNinios {
  total_rows: number;
  offset: number;
  rows: Row[];
}

export interface Row {
  id: string;
  key: string;
  value: Value;
}

export interface Value {
  dni_ninio: string;
  nombres_ninio: string;
  apellidos_ninio: string;
  dni_apoderado: string;
  direccion: string;
  responsable: string;
  nombres_responsable: string;
  apellidos_responsable: string;
  nroVisita: number;
  preguntas: Pregunta[];
  validator: Validator;
}

export interface Pregunta {
  id: number;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id: number;
  pregunta: string;
  valores: string[];
  tipo: number;
  detalles: string;
}

export interface Validator {
  latitud: number;
  longitud: number;
  altitud: number;
  testigo: Testigo;
  observaciones: string;
  imagen: string;
  firma: string;
}

export interface Testigo {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: Sexo;
  fecha_nacimiento: Date;
  telefono: string;
}

export enum Sexo {
  Femenino = "Femenino",
  Masculino = "Masculino",
}
