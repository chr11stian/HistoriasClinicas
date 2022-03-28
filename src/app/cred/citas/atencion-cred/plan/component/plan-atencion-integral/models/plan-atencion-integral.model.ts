// export interface Inmunizaciones {
//     descripcionEdad: string,
//     nombreVacuna: string,
//     nroDosis: number,
//     estado: boolean,
//     fecha?: string,
//     fechaTentativa?: string
// }

export interface inmunizaciones {
  descripcionEdad:string
  edadMes:number
  nombre:string,
  descripcion:string,
  dosis:number,
  tipoDosis:number,
  estadoAdministrado:boolean,
  fechaTentativa:Date,
  fechaAdministracion:Date,
}
export interface ControlCrecimiento {
  edadMes: number;
  descripcionEdad: string;
  genero?: string;
  nroControl: number;
  peso: number;
  talla: number;
  fecha?: string;
  fechaTentativa: string;
}
export interface SuplementacionMicronutrientes {
  tipoSuplementacion?:string
  descripcionEdad: string;
  edadMes:string,
  nombre: string;
  descripcion:string,
  dosis:number,
  estadoAdministrado: boolean;
  fechaTentativa: Date;
  fecha?: Date;
}
export interface TratamientoSeguimientoAnemia {
  descripcionEdad?: string;
  nombre: string;
  nroControl: number;
  valorHb: number;
  fecha?: string;
  fechaTentativa?: string;
}
export interface SesionesTempranas {
  id: number;
  descripcion: string;
  fecha: string;
}
export interface AddSesionesTempranas {
  descripcion: string;
  fecha: string;
}
export interface respuestaSesionesTempranas {
  cod: string;
  mensaje: string;
  cod_Http: string;
  object: SesionesTempranas[];
}
export interface estructuraDescartesItem {
  nroControl: number;
  valorHg: number;
  fecha: string;
}
export interface estructuraDescartes {
  _0A: estructuraDescartesItem[];
  _1A: estructuraDescartesItem[];
  _2A: estructuraDescartesItem[];
  _3A: estructuraDescartesItem[];
  _4A: estructuraDescartesItem[];
}
export interface Descartes {
  descarteAnemia: estructuraDescartes[];
  parasitSeriado: estructuraDescartes[];
  saludBucal: estructuraDescartes[];
  testGraham: estructuraDescartes[];
  tamizajeVIF: estructuraDescartes[];
  profAntiparasitaria: estructuraDescartes[];
  visitDomiciliaria: estructuraDescartes[];
  sesionDemostrativas: estructuraDescartes[];
}
