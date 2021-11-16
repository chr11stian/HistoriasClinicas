/** Intefaz general de antecedentes **/
export interface Antecedentes {
  dni?: string;
  antecedentePersonal: AntecedentesPersonales;
  antecedenteFamiliar: AntecedentesFamiliares;
  antecedenteVivienda: AntecedentesVivienda;
}

/** Intefaz de Antecedente Personal **/
export interface AntecedentesPersonales {
    dni?: string;
    embarazo: AEmbarazo;
    parto: AParto;
    nacimiento: ANacimiento;
    alimentacion: AAlimentacion;
    patologicos: APatologicos;
  }
  
  export interface AEmbarazo {
    patologias1?:string;
    patologias2?:string;
    normal?:boolean;
    complicado?:boolean;
    nro1?:string;
    nro2?:string;
    atencionPrenatal?:boolean;
    lugarApn?:string;
  }
  
  export interface AParto {
    patologias?:string;
    pEptopico?:boolean;
    complicado?:boolean;
    eess?:boolean;
    domicilio?:boolean;
    consulParticular?:boolean;
    profSalud?:boolean;
    tecnico?:boolean;
    acs?:boolean;
    familiar?:boolean;
    otro?:boolean;
    detalleOtro?:string;
  }
  
  export interface ANacimiento {
    edadNacer?:string;
    pesoNacer?:string;
    tallaNacer?:string;
    perimetroCefelico?:string;
    perimetroTorax?:string;
    inmediato?:boolean;
    apgar?:string;
    reanimacion?:boolean;
    patologiaNeonatal?:boolean;
    detallePatologia?:string;
    hospitalizacion?:boolean;
    tiempoHospital?:string;
  }
  
  export interface AAlimentacion {
    lme?:boolean;
    mixta?:boolean;
    artificial?:boolean;
    iniAlimentacionCompl?:string;
    suplementoFe?:boolean;
  }
  
  export interface APatologicos {
    tbc?:boolean;
    asma?:boolean;
    epilepsia?:boolean;
    infecciones?:boolean;
    hospitalizacion?:boolean;
    transfuSang?:boolean;
    cirugia?:boolean;
    alergiaMedicamentos?:boolean;
    detalleAlergia?:string;
    otrosAnt?:boolean;
    detalleOtro?:string;
  }
/** Intefaz de Antecedente Familiar **/
  export interface AntecedentesFamiliares {
    dni?: string;
    tbc?:boolean;
    tbcQuien?:string;
    asma?:boolean;
    asmaQuien?:string;
    vih?:boolean;
    vihQuien?:string;
    diabetes?:boolean;
    diabetesQuien?:string;
    epilepsia?:boolean;
    epilepsiaQuien?:string;
    alergiaMedicinas?:boolean;
    alergiaMediQuien?:string;
    violenciaFam?:boolean;
    violenciaFamQuien?:string;
    alcoholismo?:boolean;
    alcoholismoQuien?:string;
    drogadiccion?:boolean;
    drogadiccionQuien?:string;
    hepatitisB?:boolean;
    hepatitisBQuien?:string;
  }
  /** Intefaz de Antecedente Vivienda **/
  export interface AntecedentesVivienda {
    dni?: string;
    aguaPotable?:boolean;
    aguaPotableDetalle?:string;
    desague?:boolean;
    desagueDetalle?:string;
  }