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
  constructor(private visitaService: VisitaDomiciliariaService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 500);                                           
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
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
        aux.visitas_mayores_4_meses.map((a)=>{
        console.log("mayores","latitud",a.value.validator.latitud,"longitud",a.value.validator.longitud);
        L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon: ninios_mayores_Icon},{
          title: "VISITA DOMICILIARIA",
        })
          .addTo(this.maps)
          .bindPopup(
            `
          <h3>VISITA NIÑOS-NIÑAS,4-24 MESES</h3>
          <h4>VISITA NRO :${a.value.nroVisita}</h4>
          <h4>ALTITUD:${a.value.validator.altitud}</h4> 
        
        `,
            { closeButton: false }
          );
      });
        })

      this.profesionalesIpress.map((aux) => {
          aux.visitas_menores_4_meses.map((a)=>{
          console.log("menores","latitud",a.value.validator.latitud,"longitud",a.value.validator.longitud);
          L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:ninios_menores_Icon},{
            title: "VISITA DOMICILIARIA",
          })
            .addTo(this.maps)
            .bindPopup(
              `
            <h3>VISITA NIÑOS-NIÑAS,0-4 MESES</h3>
            <h4>VISITA NRO :${a.value.nroVisita}</h4>
            <h4>ALTITUD:${a.value.validator.altitud}</h4> 
          
          `,
              { closeButton: false }
            );
        });
        })

      this.profesionalesIpress.map((aux) => {
          aux.visitas_gestantes
          .map((a)=>{
          console.log("gestantes","latitud",a.value.validator.latitud,"longitud",a.value.validator.longitud);
          L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:puerperasIcon},{
            title: "Visita Domiciliaria",
          })
            .addTo(this.maps)
            .bindPopup(
            `
              <h3>VISITA GESTANTE</h3>
              <h4>ALTITUD:${a.value.validator.altitud}</h4> 
            `,
              { closeButton: false }
            );
        });
          })
      this.profesionalesIpress.map((aux) => {
            aux.visitas_puerperas
            .map((a)=>{
            console.log("puerperas","latitud",a.value.validator.latitud,"longitud",a.value.validator.longitud);
            L.marker([a.value.validator.latitud, a.value.validator.longitud],{icon:gestantesIcon},{
              title: "Visita Domiciliaria",
            })
              .addTo(this.maps)
              .bindPopup(
                `
                <h3>VISITA PUERPERA</h3>
                <h4>ALTITUD:${a.value.validator.altitud}</h4> 
            `,
                { closeButton: false }
              );
          });
            })
      
    titles.addTo(this.maps);
  }
}
