// export const environment = {
//   production: true,
//   baseUrl: 'https://fernando-herrera.com/api'
// };
export const environment = {
    production: false,
    bd: "hce",
    baseUrl: "http://192.168.5.3:3012/api", //privada
    // baseUrl: "http://190.108.93.145:3012/api", //publica

    /**ACCESO AL LOGIN**/
    base_uri: "http://192.168.5.3:3010/login/hce",
    //base_uri: "http://190.108.93.145:3010/login/hce",

    /**ACCESO A LOS DATOS DEL PIDE Y SIS**/
     base_url_pide: "http://192.168.5.3:3011/pide/datos-sis",
    //base_url_pide: "http://190.108.93.145:3011/pide/datos-sis",
        /***ACCESO A REPORTE TRATAMIENTOS****/
   base_urlTx:"http://192.168.5.3:8200"
    //base_urlTx: "http://190.108.93.145:8200",

};
