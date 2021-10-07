export interface Ubicacion {
    id?: string;
    ubigeo?: string;
    departamento?: Departamentos[];
    provincia?: Provincias[];
    distrito?: Distrito[];
    idccpp?: string;
    ccpp?: string;
    latitude?: string;
    longitude?: boolean;
    poblacion?: boolean;
    altura?: string;
    es_Capital?: string;
}


export interface Departamentos {
    iddd?: string;
    departamento?: string;
}

export interface Provincias {
    idpp: string;
    provincia?: string;
}

export interface Distrito {
    iddis?: string,
    distrito?: string
}
