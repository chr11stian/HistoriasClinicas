export interface Product {
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
}
export interface FechaEvaluacionAlimentacion {
    titulo: string,
    valorRN?: any,
    valor1M?: any,
    valor2M?: any,
    valor3M?: any,
    valor4M?: any,
    valor5M?: any,
    valor6M?: any,
    valor7M?: any,
    valor8M?: any,
    valor9M?: any,
    valor10M?: any,
    valor11M?: any,
    valor12M?: any,
    valor14M?: any,
    valor16M?: any,
    valor18M?: any,
    valor20M?: any,
    valor22M?: any,
    valor24M?: any,
    valor30M?: any,
    valor33M?: any,
    valor36M?: any,
    valor39M?: any,
    valor42M?: any

}
export interface EvaluacionAlimenticia{
    fechaRegistro?: string;
    edad?:number;
    listaPreguntas?:Preguntas[];
}
export interface Preguntas{
    codigo?:string;
    estado?:boolean;
    descripcion?:string;
}
