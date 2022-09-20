export interface VisitaValidator {
    latitud:       number;
    longitud:      number;
    altitud:       number;
    testigo:       Testigo;
    observaciones: string;
    imagen:        string;
    firma:         string;
}

export interface Testigo {
    dni:              string;
    nombres:          string;
    apellidos:        string;
    sexo:             Sexo;
    fecha_nacimiento: Date;
    telefono:         string;
}

export enum Sexo {
    Femenino = "Femenino",
    Masculino = "Masculino",
}
