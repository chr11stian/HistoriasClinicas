export interface Laboratorio {
    servicio: string,
    nroCama: string,
    dxPresuntivo: string,
    examenesAuxiliares?: ExamenAuxiliar[],
    observaciones: string
}
export interface AddLaboratorio {
    servicio: string,
    nroCama: string,
    dxPresuntivo: string,
    examenAuxiliar?: ExamenAuxiliar,
    observaciones: string
}
export interface ExamenAuxiliar {
    tipoLaboratorio: string,
    subTipo: string,
    nombreExamen: string,
    codigo: string,
    codPrestacion: string,
    cie10: string,
    codigoHIS: string,
    lugarExamen: string,
    resultado: ResultadoLaboratorio,
    labExterno: string
}
export interface ResultadoLaboratorio {
    hematologia?: Hematologia,
    parasitologia?: Parasitologia,
}
export interface Hematologia {
    hemoglobina?: string,
    hematocrito?: string,
    grupoSanguineo?: string,
    factorRH?: string,
    tiempoSangria?: string,
    tiempoCoagulacion?: string,
    tiempoProtrombina?: string,
    tiempoTromboplastina?: string,
    reticulocitos?: string,
    compatibilidadSanguinea?: string,
    rctoGlobulosRojos?: string,
    rctoPlaquetas?: string,
    rctoGlobulosBlancos?: string,
    blastos?: string,
    juveniles?: string,
    neutrofilos?: string,
    nAbastonados?: string,
    nSegmentados?: string,
    linfocitos?: string,
    monocitos?: string,
    eosinofilos?: string,
    basofilos?: string,
    vsg1hora?: string,
    vsg2hora?: string,
    vcm?: string,
    vrVcm?: string,
    chcm?: string,
    vrChcm?: string,
    hcm?: string,
    vrHcm?: string,
}
export interface Parasitologia {
    examenMacroscopico: ExamenMacroscopico,
    examenMicroscopico: ExamenMicroscopico,
    sangreOcultaHeces: string,
    gotaGruesa: string,
    frotisLesion: string,
}
export interface ExamenMacroscopico {
    color?: string,
    consistencia?: string,
    ph?: string,
    reaccion?: string,
    mucus?: string,
    sangre?: string,
    restosAlimenticios?: string
}
export interface ExamenMicroscopico {
    reaccionInflamatorio?: string,
    filamentosMucoides?: string,
    leucocitos?: string,
    hematies?: string,
    cuerposGrasos?: string,
    levaduras?: string,
    bacterias?: string,
    cocosBacilos?: string,
    formasParasitarias?: string,
    huevosDe?: ValueLab,
    quistesDe?: ValueLab,
    trofozoitosDe?: ValueLab,
    larvasDe?: ValueLab
}
export interface ValueLab {
    valor1?: string,
    valor2?: string
}