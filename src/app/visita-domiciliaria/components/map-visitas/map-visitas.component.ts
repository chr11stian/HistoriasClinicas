import { Component, OnInit, Input } from "@angular/core";
import * as L from "leaflet";


@Component({
  selector: "app-map-visitas",
  templateUrl: "./map-visitas.component.html",
  styleUrls: ["./map-visitas.component.css"],
})
export class MapVisitasComponent implements OnInit {
 // @Input("dataVisitas") dataVisitas: any[] = [];
  @Input("listaVisitas1") listaVisitas1: any[] = [];
  @Input("dataVisitas") dataVisitas: any[];

  latMap = -13.52264;
  lngMap = -71.96734;
  private centroid: L.LatLngExpression = [this.latMap, this.lngMap];
  strokeWeight = 4;
  maps: any;
  listAnimatedCircleIcon: any[] = [];
  listLineas: any[] = [];
  newDta:any []=[];

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  async getdataVisitas() {
    await this.dataVisitas?this.dataVisitas:[];
  }

  initMap() {
  setTimeout(() => {
    this.getdataVisitas(); 
    console.log('la ',this.dataVisitas)
    this.newDta=this.dataVisitas;
  },100);
    console.log('from component map',this.dataVisitas)
    var iconDefault = L.icon({
      iconUrl: "assets/svg-marker/marker-visita-domiciliaria.svg",
      iconSize: [50, 50],
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
    console.log('new data',this.newDta);
    this.newDta.map((aux) => {
      /*  let imgUrl="https://res.cloudinary.com/dhcetqc1j/image/upload/v1650643076/omri-d-cohen-8X2SLD6mLjQ-unsplash_gntzwb.jpg"
        L.marker([aux.latitud, aux.longitud])
        .addTo(this.maps).bindPopup(`
        <h4>Visita domiciliario 1</h4> 
        <img src=${imgUrl} alt=""/>`);*/
        console.log(aux.value.validator.latitud)
        console.log(aux.value.validator.longitud)
      L.marker([aux.value.validator.latitud,aux.value.validator.longitud])
        .addTo(this.maps);
    });
    titles.addTo(this.maps);
  }
}
