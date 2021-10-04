export interface Ubicacion {
    id?: string;
    ubigeo?: string;
    iddd?: string;
    departamento?: string;
    idpp?: string;
    provincia?: string;
    iddis?: string;
    distrito?: string;
    idccpp?: string;
    ccpp?: string;
    latitude?: string;
    longitude?: boolean;
    poblacion?: boolean;
    altura?: string;
    es_Capital?: string;
}


export interface Departamentos {
    id?: string;
    departamento?: string;
}

export interface Provincias {
    iddd: string;
    provincia?: string;
}

export interface Distrito {
    iddis?: string,
    distrito?: string
}

export interface filtroIds {
    departamento: number;
    provincia: number;
    distrito: number;
    comunidad: number;
    ccpp: number;
}

export interface Filtro {
    iddd: string;
    idpp: string;
    iddis: string;
    idccpp: string;
}
