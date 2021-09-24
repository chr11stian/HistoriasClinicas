import {Ubicacion} from "../models/ubicacion.models";

export interface ObjectRes {
    cod?: string;
    mensaje?: string;
    cod_http?:string,
    object?:any;
    currentPages?: number;
    totalPages?: number;
}