/** https://docs.couchdb.org/en/latest/api/database/bulk-api.html */
export interface QueryType {
    /** Selector de la base de datos  documentación:https://docs.couchdb.org/en/latest/api/database/find.html#find-selectors */
    selector?: any,
    /** Campos requeridos para la consulta  */
    fields?: string[],
    /** Ordenamiento bajo que campos se va a ordenar example:fechaor field */
    sort?: any[]
    /** Paginacion: limit: cuantos documentos te va a traer  */
    limit?: number
    /**  Paginacion: skip: numero de pagina */
    skip?: number
    /** Estadisticas de la consulta */
    execution_stats?: boolean
    /**  */
    r?: number
}

export interface AnswerRequestType {
    ok: boolean,
    id: string,
    rev: string
}

export interface AnswerRequestFindType {
    bookmark: string,
    docs: any[],
}

export interface UpdateObjectType {
    id: string,
    field: string,
    value: number | string | boolean
}
