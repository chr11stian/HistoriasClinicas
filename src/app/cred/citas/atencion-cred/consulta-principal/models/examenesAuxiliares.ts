export interface Laboratorio {
    servicio: string,
    nroCama: string,
    dxPresuntivo: string,
    examenesAuxiliares?: ExamenAuxiliar[],
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
    resultado: ResultadoLaboratorio,
    labExterno: string
}
export interface ResultadoLaboratorio {
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
    vsg1hora?: string,
    vsg2hora?: string,
    csg2hira?: string,
}