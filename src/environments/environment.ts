// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    bd: "hce",
    // baseUrl: "http://192.168.5.3:3012/api", //privada
    baseUrl: "http://190.108.93.145:3012/api", //publica

    /**ACCESO AL LOGIN**/
    // base_uri: "http://192.168.5.3:3010/login/hce",
    base_uri: "http://190.108.93.145:3010/login/hce",

    /*LOGIN*/
    // base_uri_: "http://192.168.5.3:3010",
    base_uri_: "http://190.108.93.145:3010",

    /**ACCESO A LOS DATOS DEL PIDE Y SIS**/
    // base_url_pide: "http://192.168.5.3:3011/pide/datos-sis",
    base_url_pide: "http://190.108.93.145:3011/pide/datos-sis",

    /***ACCESO A REPORTE TRATAMIENTOS****/
    // base_urlTx:"http://192.168.5.3:8200",
    base_urlTx: "http://190.108.93.145:8200",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
