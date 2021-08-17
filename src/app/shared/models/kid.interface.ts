export interface KidInterfaceType {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    establecimientoOrigen: string,
    nacimiento: string,
    direccion: string,
    nombre_NumeroSector: string,
    establecimiento: string,
    location: LocationInterface


}

export interface LocationInterface {
    lat: number,
    lng: number

}
