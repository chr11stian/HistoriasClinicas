export interface resultado {
  puntajeBruto: number,
  puntajeT: number,
  categoria: string,
}
export interface puntaje{
  puntajeBruto:string,
  puntajeT:string
}
export interface contenedorSubTest{
  subTest:puntaje[]
}

export interface itenTestResultado {
  codigo:         string;
  valor:          number;
  listaPreguntas? : listaPregunta[];
}
export interface listaPregunta {
  nroPregunta: number;
  valor:       boolean;
}
