export interface dato {
    nroDocumento: string,
    tipoDoc: string,
    idConsulta: string
}

export interface triajeInterface {
    signosVitales:     SignosVitales;
    listaSignosAlarma: ListaSignosAlarma[];
    noPresentaSigno:   boolean;
    factorRiesgo:      FactorRiesgo;
    anamnesis:         string;
}

export interface FactorRiesgo {
    cuidaNinio:     string;
    participaPadre: boolean;
    recibeAfecto:   boolean;
    especificacion: string;
}

export interface ListaSignosAlarma {
    codSigno:    string;
    tipoEdad:    string;
    nombreSigno: string;
    valorSigno:  boolean;
}

export interface SignosVitales {
    temperatura:       number;
    presionSistolica:  number;
    presionDiastolica: number;
    fc:                number;
    fr:                number;
    peso:              number;
    talla:             number;
    imc:               number;
    perimetroCefalico: number;
}


