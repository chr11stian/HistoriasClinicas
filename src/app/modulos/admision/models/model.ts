export interface interconsulta {
  ambiente: string;
  created_at: string;
  created_by: string;
  deleted: boolean;
  descripcion: string;
  detallePago: string;
  estado: string;
  fechaAtencion: string;
  funcionesVitales: string;
  horaAtencion: string;
  horaAtencionFin: string;
  id: string;
  ipress: Ipress;
  modified_at: string;
  modified_by: string;
  nivelUrgencia: string;
  nroCupo: number;
  oferta_id: string;
  paciente: Paciente;
  tipoConsulta: string;
  transeunte: boolean;
}

export interface Ipress {
  ipress_id: string;
  nombre: string;
  servicio: string;
}

export interface Paciente {
  apellidos: string;
  edadAnio: number;
  edadDia: number;
  edadMes: number;
  nombre: string;
  nroDoc: string;
  nroHcl: string;
  nroTelefono: null;
  sexo: string;
  tipoDoc: string;
}
