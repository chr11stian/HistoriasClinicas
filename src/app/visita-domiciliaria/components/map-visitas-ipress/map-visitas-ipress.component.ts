import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as L from "leaflet";
import { Icon, Map, marker } from 'leaflet'
import { VisitaDomiciliariaService } from '../../services/visita-domiciliaria.service';

@Component({
  selector: 'app-map-visitas-ipress',
  templateUrl: './map-visitas-ipress.component.html',
  styleUrls: ['./map-visitas-ipress.component.css']
})
export class MapVisitasIpressComponent implements OnInit,OnChanges {

  @Input("profesionalesIpress") profesionalesIpress: any[];
  latMap =this.visitaService.getLatitudIpress();
  lngMap = this.visitaService.getLongitudeIpress();
  private centroid: L.LatLngExpression = [this.latMap, this.lngMap];
  maps: any;
  gestantes:any=[];
  puerperas:any=[];
  niniosMenores:any=[];
  niniosMayores:any=[];
  constructor(private visitaService: VisitaDomiciliariaService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 500);                                           
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profesionalesIpress['rows'].currentValue != changes.profesionalesIpress['rows'].previousValue) {
      this.maps.remove();
      this.initMap();
    }
  }
  //./assets/svg-marker/marker-visita-domiciliaria.svg
  initMap() {
    var iconDefault = L.icon({
      iconUrl: "./assets/svg-marker/marker-visita-domiciliaria.svg",
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      shadowAnchor: [0,55],
      shadowSize: [25,40],
      shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      popupAnchor: [0, -40],
      
    });

    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [30, 30],
        iconAnchor: [12, 41],
        shadowAnchor: [0,55],
        shadowSize: [25,40],
        shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        popupAnchor: [0, -40],
      }
  });

  var ninios_mayores_Icon = new LeafIcon({iconUrl:'./assets/svg-marker/marker-ninio-mayores.svg'}),
    ninios_menores_Icon = new LeafIcon({iconUrl: './assets/svg-marker/marker-ninio-menores.svg'}),
    puerperasIcon = new LeafIcon({iconUrl: './assets/svg-marker/marker-puerpera-visita.svg'}),
    gestantesIcon = new LeafIcon({iconUrl: './assets/svg-marker/marker-gestante-visita.svg'})
   
    L.icon = function (options) {
      return new L.Icon(options);
  };

    // L.Marker.prototype.options.icon = iconDefault;
    this.maps = new L.Map("map").setView([this.latMap, this.lngMap],13);
    const titles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    // console.log('ipresssss',this.profesionalesIpress[0]["visitas_mayores_4_meses"]);
      this.profesionalesIpress.map((aux) => {
        if( aux.visitas_mayores_4_meses.length>0){
          aux.visitas_mayores_4_meses.map((a)=>{
            let auxImg;
              this.visitaService
                .urlImagen(a.value.validator.imagen)
                .subscribe((res: any) => {
                  auxImg = res["object"];
                  // console.log("Aux Ims",auxImg)
                });
                setTimeout(() => {
                  let aux_ = "data:image/jpg;base64," + auxImg;
                  L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon: ninios_mayores_Icon},{
                    title: "VISITAS DOMICILIARIAS",
                  })
                    .addTo(this.maps)
                    .bindPopup(
                      `
                      <div style="width:200px;height:330px">
                      <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DE NIÑOS,NIÑAS DE 4-24 MESES</h3>
                      <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NÚMERO :${a.value.nroVisita}</h4>
                      <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${a.value.validator.altitud}</h4>
                      <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS NIÑO(A):${a.value.apellidos_ninio} ${a.value.nombres_ninio}</h4>
                      <img style=" width: 180px; 
                      height:180px;
                      margin:2px auto;
                      display:block;"
                      src="${aux_}"/>
                      </div>
                  
                  `,
                      { closeButton: false }
                    );
                },2000)
          });
        }
      })

      this.profesionalesIpress.map((aux) => {
        if(aux.visitas_menores_4_meses.length>0){
          aux.visitas_menores_4_meses.map((a)=>{
            let auxImg;
            this.visitaService
              .urlImagen(a.value.validator.imagen)
              .subscribe((res: any) => {
                auxImg = res["object"];
                // console.log("Aux Ims",auxImg)
              });
              setTimeout(() => {
                let aux_ = "data:image/jpg;base64," + auxImg;
                L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:ninios_menores_Icon},{
                  title: "VISITAS DOMICILIARIAS",
                })
                  .addTo(this.maps)
                  .bindPopup(
                    `
                    <div style="width:200px;height:330px">
                    <h3  style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA NIÑOS,NIÑAS DE 0-4 MESES</h3>
                    <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${a.value.nroVisita}</h4>
                    <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${a.value.validator.altitud}</h4> 
                    <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS NIÑO(A):${a.value.apellidos_ninio} ${a.value.nombres_ninio}</h4>
                    <img style=" width: 180px; 
                    height:180px;
                    margin:2px auto;
                    display:block;"
                    src="${aux_}"/>
                    </div>
                
                `,
                    { closeButton: false }
                  );
              },2000)
        });
        }
        })
      this.profesionalesIpress.map((aux) => {
        if(aux.visitas_gestantes.length>0){
          aux.visitas_gestantes
          .map((a)=>{
            let auxImg;
            this.visitaService
              .urlImagen(a.value.validator.imagen)
              .subscribe((res: any) => {
                auxImg = res["object"];
                // console.log("Aux Ims",auxImg)
              });
              setTimeout(() => {
                let aux_ = "data:image/jpg;base64," + auxImg;
                L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:puerperasIcon},{
                  title: "VISITAS DOMICILIARIAS",
                })
                  .addTo(this.maps)
                  .bindPopup(
                  `
                  <div style="width:200px;height:330px">
                  <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DOMICILIARIA DE LA GESTANTE</h3>
                  <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${a.value.nroVisita}</h4>
                  <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${a.value.validator.altitud}</h4> 
                  <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS DE LA GESTANTE:${a.value.nombres_gestante} ${a.value.apellidos_gestante}</h4>
                  <img style=" width: 180px; 
                  height:180px;
                  margin:2px auto;
                  display:block;"
                    src="${aux_}"/>
                  </div>
                  `,
                    { closeButton: false }
                  );
              },2000)
        
        });
      }
    })
      this.profesionalesIpress.map((aux) => {
        if(aux.visitas_puerperas.length.length>0){
          aux.visitas_puerperas
          .map((a)=>{
            let auxImg;
            this.visitaService
              .urlImagen(a.value.validator.imagen)
              .subscribe((res: any) => {
                auxImg = res["object"];
                // console.log("Aux Ims",auxImg)
              });
              setTimeout(() => {
                let aux_ = "data:image/jpg;base64," + auxImg;
                L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:gestantesIcon},{
                  title: "VISITAS DOMICILIARIAS",
                })
                  .addTo(this.maps)
                  .bindPopup(
                    `
                    <div style="width:200px;height:330px">
                    <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DOMICILIARIA DE LA PUERPERA</h3>
                    <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${a.value.nroVisita}</h4>
                    <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${a.value.validator.altitud}</h4> 
                    <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS DE LA PUERPERA:${a.value.nombres_gestante} ${a.value.apellidos_gestante}</h4>
                    <img style=" width: 180px; 
                    height:180px;
                    margin:2px auto;
                    display:block;"
                    src="${aux_}"/>
                    </div>
                `,
                    { closeButton: false }
                  );
              },2000)
        });
        }
      })
      
    titles.addTo(this.maps);
  }
}
