import { Ubicacion } from "./ubicacion.models";

export interface TipoPersonal {
  id: string;
  nombre?: string;
  esProfesional?: boolean;
  abreviatura?: string;
  especialidad?: string;
  estado?: boolean;
}

export interface ColegioProfesional {
  codigo?: string;
  nombre?: string;
  abreviatura?: string;
}

export interface TipoTurno {
  codigo?: string;
  horaInicio?: string;
  horaFin?: string;
  nroHoras?: string;
  abreviatura?: string;
}

export interface Especialidad {
  idSis?: string;
  nombre?: string;
  estado?: string;
}

export interface GrupoEtario {
  id?: string;
  descripcion?: string;
  edadMinima?: string;
  edadMaxima?: string;
  esGestante?: string;
  idSexo?: string;
}

export interface DocumentoIdentidad {
  id?: string;
  nombre?: string;
  longitud?: string;
  estado?: string;
  abreviatura?: string;
}

export interface CategoriaEstablecimiento {
  abreviatura?: string;
  descripcion?: string;
  nivel?: string;
}

export interface Etnia {
  id?: string;
  descripcion?: string;
  tipoEtnia?: string;
  codigoSis?: string;
  codigoHis?: string;
}

export interface RedServicioSalud {
  id?: string;
  disa?: string;
  idRed?: string;
  nombreRed?: string;
  idMicroRed?: string;
  nombreMicroRed?: string;
  ubigeo?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  idEESS?: string;
  nombreEESS?: string;
  categoria?: string;
}

export interface MicroRed {
  id?: string;
  idRed: string;
  redNombre: string;
  nombre: string;
}

export interface CondicionPaciente {
  id?: string;
  nombre?: string;
  edadMinima?: string;
  edadMaxima?: string;
  idSexo?: string;
}

export interface TipoSeguro {
  nombre?: string;
}

export interface CondicionPacienteRiesgo {
  id?: string;
  nombre?: string;
}

export interface CondicionPacienteDiscapacidad {
  id?: string;
  nombre?: string;
}

export interface NombreComercialUPS {
  nombre?: string;
  abreviastura?: string;
  tipoServicio?: string;
  icon?: string;
}

export interface TipoUPS {
  nombre?: string;
  descripcion?: string;
}

export interface NivelEstablecimiento {
  id?: string;
  nombre?: string;
}

export interface Nacionalidad {
  id?: string;
  nombre?: string;
}

export interface Transeunte {
  id?: string;
  nombre?: string;
}

export interface Sexo {
  nombre?: string;
}

export interface EstadoCivil {
  id?: string;
  nombre?: string;
}

export interface TipoEtnia {
  id?: string;
  nombre?: string;
}

export interface TipoServicio {
  nombre?: string;
  esProfesional?: boolean;
  abreviatura?: string;
}

export interface InformacionPersonalDescripcion {
  idIpress?: string;
  eess?: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: string;
}

export interface DescripcionFuncionIpress {
  nombrefuncion?: string;
  nombre?: string;
  delete?: boolean;
  update?: boolean;
  create?: boolean;
  insert?: boolean;
  read?: boolean;
}

export interface DescripcionUsuarioRoles {
  funcion?: DescripcionFuncionIpress[];
}

export interface Ipress {
  id?: string;
  codRENAES?: string;
  nombreEESS?: string;
  categoria?: any;
  ubicacion?: any;
  red?: any;
  encargado?: any;
  jurisdiccion?: any[];
  roles?: any[];
  ambientes?: any[];
  turnos?: any[];
} 
export class Mantenimientos {}
