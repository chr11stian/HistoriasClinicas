export interface Profesional{
      dni?:string;
      nombres?:string;
      apellidos?:string;
      telefono?:string;
      eess?:string;
      visitas_menores_4_meses?:Ninio[];
      visitas_mayores_4_meses?:Ninio [];
      visitas_gestantes?:Gestante [];
      visitas_puerperas?:Puerpera [];
}

export interface Ninio {
      id:    string;
      key:   string[];
      value: Value;
}

export interface Value {
      auxDate:                  string;
      fecha_creacion_documento: Date;
      dni_ninio:                string;
      nombres_ninio:            string;
      apellidos_ninio:          string;
      dni_apoderado:            string;
      nombre_madre:             string;
      direccion:                string;
      responsable:              string;
      nombres_responsable:      string;
      apellidos_responsable:    string;
      eess:                     string;
      nroVisita:                number;
      preguntas:                Pregunta[];
      validator:                Validator;
}

export interface Pregunta {
      id:         number;
      respuestas: Respuesta[];
}

export interface Respuesta {
      id:       number;
      pregunta: string;
      valores:  string[];
      tipo:     number;
      detalles: string;
}

export interface Validator {
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
      sexo:             string;
      fecha_nacimiento: Date;
      telefono:         string;
}

export interface Gestante{

}

export interface Puerpera{

}

//GESTANTE

// export interface Gestante {
//       id:    string;
//       key:   string;
//       value: Value;
// }

// export interface Value {
//       gestante?:                string;
//       dni_gestante:             string;
//       nombres_gestante:         string;
//       apellidos_gestante:       string;
//       telefono:                 string;
//       direccion:                string;
//       numero_de_gestacion:      number;
//       fecha_creacion_documento: Date;
//       nro_visita:               number;
//       dni_responsable:          string;
//       nombres_responsable:      string;
//       apellidos_responsable:    string;
//       eess:                     string;
//       eess_descripcion:         string;
//       preguntas:                Pregunta[];
//       validator:                Validator;
//       puerpera?:                string;
// }