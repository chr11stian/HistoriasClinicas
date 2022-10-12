export interface PadronNominalGestante {
      total_rows: number;
      offset:     number;
      rows:       Row[];
}
export interface Row {
      id:    string;
      key:   string;
      value: Value;
}

export interface Value {
      _id:                  string;
      _rev:                 string;
      tipoDoc:              string;
      nombres_apellidos:    string;
      hcl:                  string;
      edad:                 number;
      dni:                  string;
      telefono:             number;
      tiene_sis:            string;
      direccion:            string;
      referencia:           string;
      cod_eess_anterior:    string;
      eess_anterior:        string;
      cod_eess_actual:      string;
      eess_actual:          string;
      fur:                  Date;
      fpp:                  Date;
      morbilidad_potencial: string;
      observaciones:        string;
      personal_eess:        string;
      fecha_reg:            string;
}
