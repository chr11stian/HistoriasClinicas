export class LoginInterface {
    usuario: string;
    roles: string;
}
export class rootInterface {
    token: string;
    usuario: Usuario;
    tokenCouch?: string;
}

export interface userInterface {
    token: string;
    tokenCouch?: string;
    usuario: Usuario;
}

export interface Usuario {
    apellidos?: string;
    apps: string[];
    escalas?: Escala[];
    especialidad?: Especialidad[];
    estado: boolean;
    fechaNacimiento?: Date;
    ipress?: Ipress;
    nombres?: string;
    nroDocumento?: string;
    roles: string[];
    sexo?: string;
    tipoDocumento?: string;
    tipoPersonal?: string;
    nroDoc?: string;
    tipoDoc?: string;
}

export interface Escala {
    escala: string;
    unidades: string[];
}

export interface Especialidad {
    estado: boolean;
    nombre: string;
    nroEspecialidad: string;
}

export interface Ipress {
    estado: boolean;
    idIpress: string;
    nombreEESS: string;
    renipress: string;
    ruc: string;
    ubicacion: Ubicacion;
}

export interface Ubicacion {
    altura: number;
    centroPoblado: string;
    departamento: string;
    direccion: string;
    distrito: string;
    latitud: number;
    longitud: number;
    provincia: string;
    ubigeo: string;
}
