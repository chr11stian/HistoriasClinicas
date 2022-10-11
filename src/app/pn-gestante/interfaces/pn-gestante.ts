//estructura del doc padron nominal para agregar 
export interface PNGestante {
      _id?: string;
      _rev?: string;
      tipoDoc?:string,
      dni?:string;
      estado?:boolean;
      nombres?:string;
      apellidos?:string;
      hcl?:string;
      edad?:string;
      telefono?:string;
      tiene_sis?:boolean;
      direccion?:string;
      referencia?:string;
      cod_eess_anterior?:string;
      eess_anterior?:string;
      cod_eess_actual?:string;
      eess_actual?:string;
      fur?:Date;
      fpp?:Date;
      morbilidad_potencial?:string;
      edad_gestacional?:string;
      obervaciones?:string;
      dni_personal?:string;
      nombres_personal?:string;
      apellidos_personal?:string;
      fecha_reg?:Date;
}