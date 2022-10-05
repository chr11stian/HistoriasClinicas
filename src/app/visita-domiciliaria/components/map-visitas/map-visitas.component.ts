import { Component, OnInit, Input } from "@angular/core";
import { getDateMeta } from "@fullcalendar/core";
import * as L from "leaflet";
import { VisitaDomiciliariaService } from '../../services/visita-domiciliaria.service';

@Component({
  selector: "app-map-visitas",
  templateUrl: "./map-visitas.component.html",
  styleUrls: ["./map-visitas.component.css"],
})

export class MapVisitasComponent implements OnInit {
  @Input("dataVisitas") dataVisitas: any[];
  latMap = -13.52264;
  lngMap = -71.96734;
  private centroid: L.LatLngExpression = [this.latMap, this.lngMap];
  maps: any;
  constructor(private visitaService:VisitaDomiciliariaService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
    },500);
  }

  initMap() {
    var iconDefault = L.icon({
      iconUrl: "assets/svg-marker/marker-visita-domiciliaria.svg",
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      shadowAnchor: [18, 26],
      shadowSize: [18, 26],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.maps = new L.Map("map").setView([this.latMap, this.lngMap], 20);
    const titles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
      this.dataVisitas.map((aux) => {
        console.log('latitud',aux.value.validator.latitud,'longitud',aux.value.validator.longitud,);
          L.marker([
          aux.value.validator.latitud,
          aux.value.validator.longitud,
        ],{title:'Visita Domiciliaria'}).addTo(this.maps).bindPopup(`
        <h3>Visita domiciliaria nro :${aux.value.nroVisita}</h3>
        <h4>Altitud:${aux.value.validator.altitud}</h4> 
        <img src=${this.visitaService.getImageURL(aux.value.validator.imagen)} alt=""/>`);
      });
      titles.addTo(this.maps);
    
  }
}
