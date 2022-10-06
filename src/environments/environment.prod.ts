// export const environment = {
//   production: true,
//   baseUrl: 'https://fernando-herrera.com/api'
// };
// const base = "http://192.168.5.3:"; //privada
const base = "http://190.108.93.150:"; //publica

export const environment = {
    production: false,
    bd: "hce",
    bdCouch: "visitas_medicas",

    baseUrl: base + "3012/api",
    base_uri: base + "3010/login/hce" /**ACCESO AL LOGIN**/,
    base_uri_: base + "3012" /*LOGIN*/,
    base_login: base + "2020" /* NUEVO LOGIN */,
    base_url_pide:
        base + "3011/pide/datos-sis" /**ACCESO A LOS DATOS DEL PIDE Y SIS**/,
    base_urlTx: base + "8200" /***ACCESO A REPORTE TRATAMIENTOS****/,
    base_url_Couch: base + "5984" /***DATABASE COUCHDB */,
    base_url_couch_view:
        base + "5984/visitas_medicas/_design/visita_domiciliaria/_view",/***DATABASE COUCHDB */
   base_url_couch_images:
        base + "5984/visitas_medicas/f64691bc4d1c40e239602e3b1a0196f3",
   base_url_couch_pngestante_view:
        base + "5984/db_padron_nominal_gestante/_design/padron_nominal_gestante/_view"

};

√√¶
