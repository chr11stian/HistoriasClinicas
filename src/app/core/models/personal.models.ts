import {
    ColegioProfesional, DescripcionUsuarioRoles,
    InformacionPersonalDescripcion,
    TipoPersonal
} from "./mantenimiento.models";

export interface Personal {
    id?: string;
    tipoDoc?: string;
    nro_doc?: string;
    apePaterno?: string;
    apeMaterno?: string;
    primerNombre?: string;
    otrosNombres?: string;
    fechaNacimiento?: string;
    sexo?: string;
    profesion?: string;
    tipoContrato?: string;
    tipoPersonal?: TipoPersonal[];
    colegioProfesional?: ColegioProfesional[];
    colegiatura?: string;
    tipoUsuario?: string;
    detalleIpres?: InformacionPersonalDescripcion[];
    roles?: DescripcionUsuarioRoles[];
}



