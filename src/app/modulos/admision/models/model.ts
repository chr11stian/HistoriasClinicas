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
export interface PidePatient {
  bd:string;
  apeMaterno: string;
  apePaterno: string;
  contrato: string;
  correlativo: string;
  data: string[];
  dataList: string[];
  descEESS: string;
  descEESSUbigeo: string;
  descTipoSeguro: string;
  direccion: string;
  disa: string;
  eess: string;
  eessUbigeo: string;
  estado: string;
  fecAfiliacion: string;
  fecCaducidad: string;
  fecNacimiento: string;
  genero: string;
  idGrupoPoblacional: string;
  idNumReg: string;
  idPlan: string;
  idUbigeo: string;
  msgConfidencial: string;
  nombres: string;
  nroContrato: string;
  nroDocumento: string;
  regimen: string;
  resultado: string;
  tabla: string;
  tipoDocumento: string;
  tipoFormato: string;
  tipoSeguro: string
}