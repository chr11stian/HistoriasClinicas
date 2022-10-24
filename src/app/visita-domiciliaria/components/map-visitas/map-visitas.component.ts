import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as L from "leaflet";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";

@Component({
  selector: "app-map-visitas",
  templateUrl: "./map-visitas.component.html",
  styleUrls: ["./map-visitas.component.css"],
})
export class MapVisitasComponent implements OnInit, OnChanges {
  @Input("dataVisitas") dataVisitas: any[];
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
    if (changes.dataVisitas.currentValue != changes.dataVisitas.previousValue) {
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
      shadowAnchor: [18, 26],
      shadowSize: [18, 26],
    });
    L.Marker.prototype.options.icon = iconDefault;
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
    

    this.dataVisitas.map((aux) => {
      console.log(aux.value.validator.latitud, aux.value.validator.longitud);
      this.visitaService.couch = true;
      L.marker([aux.value.validator.latitud, aux.value.validator.longitud], {
        title: "Visita Domiciliaria",
      })
        .addTo(this.maps)
        .bindPopup(
          `
        <h3>Visita domiciliaria nro :${aux.value.nroVisita}</h3>
        <h4>Altitud:${aux.value.validator.altitud}</h4> 
        <img src=${this.visitaService.getImageURL(
          aux.value.validator.imagen
        )} alt=""/>`,
          { closeButton: false }
        );
    });
    titles.addTo(this.maps);
  }
}
