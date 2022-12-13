import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as L from "leaflet";
import { pipe } from "rxjs";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: "app-map-visitas",
  templateUrl: "./map-visitas.component.html",
  styleUrls: ["./map-visitas.component.css"],
})
export class MapVisitasComponent implements OnInit, OnChanges {
  @Input("dataVisitas") dataVisitas: any[];
  latMap = this.visitaService.getLatitudIpress();
  lngMap = this.visitaService.getLongitudeIpress();

  private centroid: L.LatLngExpression = [this.latMap, this.lngMap];
  maps: any;
  imagePath: string = "";
  constructor(private visitaService: VisitaDomiciliariaService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataVisitas.currentValue != changes.dataVisitas.previousValue) {
      this.maps.remove();
      this.initMap();
    }
  }

  initMap() {
    var iconDefault = L.icon({
      iconUrl: "./assets/svg-marker/marker-visita-domiciliaria.svg",
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      shadowAnchor: [0, 55],
      shadowSize: [25, 40],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      popupAnchor: [0, -40],
    });

    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [30, 30],
        iconAnchor: [12, 41],
        shadowAnchor: [0, 55],
        shadowSize: [25, 40],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        popupAnchor: [0, -40],
      },
    });
    var ninios_mayores_Icon = new LeafIcon({
        iconUrl: "./assets/svg-marker/marker-ninio-mayores.svg",
      }),
      ninios_menores_Icon = new LeafIcon({
        iconUrl: "./assets/svg-marker/marker-ninio-menores.svg",
      }),
      puerperasIcon = new LeafIcon({
        iconUrl: "./assets/svg-marker/marker-puerpera-visita.svg",
      }),
      gestantesIcon = new LeafIcon({
        iconUrl: "./assets/svg-marker/marker-gestante-visita.svg",
      });

    this.maps = new L.Map("map").setView([this.latMap, this.lngMap], 13);
    const titles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.maps);

    this.dataVisitas.map((aux, i) => {
      if (
        aux.value.hasOwnProperty("mayor_cuatro_meses") ||
        aux.value.hasOwnProperty("menor_cuatro_meses")
      ) {
        if (aux.value.mayor_cuatro_meses == "mayor_cuatro_meses") {
          let auxImg;
          this.visitaService
            .urlImagen(aux.value.validator.imagen)
            .subscribe((res: any) => {
              auxImg = res["object"];
            });
            console.log("aux img",auxImg);
          setTimeout(() => {
            let aux_ = "data:image/jpg;base64," + auxImg;
            console.log("aux_",aux_);
            L.marker(
              [aux.value.validator.latitud, aux.value.validator.longitud],
              { icon: ninios_mayores_Icon },
              {
                title: "VISITA DOMICILIARIA",
              }
            )
              .addTo(this.maps)
              .bindPopup(
                `<div style="width:200px;height:350px">
              <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DE NIÑOS,NIÑAS DE 4-24 MESES</h3>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NÚMERO :${aux.value.nroVisita}</h4>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">FECHA DE VISITA  :${aux.value.fecha_creacion_documento}</h4>
              <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${aux.value.validator.altitud}</h4>
              <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS NIÑO(A):${aux.value.apellidos_ninio} ${aux.value.nombres_ninio}</h4>
              <img style=" width: 180px; 
              height:180px;
              margin:2px auto;
              display:block;"
              src="${aux_}"/>
              </div>
              `,
                { closeButton: false }
              );
          }, 4000);
        } 
        else if (aux.value.menor_cuatro_meses == "menor_cuatro_meses") {
          let auxImg;
          this.visitaService
            .urlImagen(aux.value.validator.imagen)
            .subscribe((res: any) => {
              auxImg = res["object"];
            });
          setTimeout(() => {
            let aux_ = "data:image/jpg;base64," + auxImg;
            L.marker(
              [aux.value.validator.latitud, aux.value.validator.longitud],
              { icon: ninios_menores_Icon },
              {
                title: "VISITA DOMICILIARIA",
              }
            )
              .addTo(this.maps)
              .bindPopup(
                `
                <div style="width:200px;height:350">
                <h3  style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA NIÑOS,NIÑAS DE 0-4 MESES</h3>
                <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${aux.value.nroVisita}</h4>
                <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">FECHA DE VISITA  :${aux.value.fecha_creacion_documento}</h4>
                <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${aux.value.validator.altitud}</h4> 
                <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS NIÑO(A):${aux.value.apellidos_ninio} ${aux.value.nombres_ninio}</h4>
                <img style=" width: 180px; 
                height:180px;
                margin:2px auto;
                display:block;"
                src="${aux_}"/>
                </div>
            `,
                { closeButton: false }
              );
          }, 2000);
        }
      } else if (
        aux.value.hasOwnProperty("gestante") ||
        aux.value.hasOwnProperty("puerpera")
      ) {
        if (aux.value.gestante == "gestante") {
          let auxImg;
          this.visitaService
            .urlImagen(aux.value.validator.imagen)
            .subscribe((res: any) => {
              auxImg = res["object"];
            });
          setTimeout(() => {
            let aux_ = "data:image/jpg;base64," + auxImg;
            L.marker(
              [aux.value.validator.latitud, aux.value.validator.longitud],
              { icon: gestantesIcon },
              {
                title: "VISITA DOMICILIARIA ",
              }
            )
              .addTo(this.maps)
              .bindPopup(
                `
              <div style="width:200px;height:350px">
              <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DOMICILIARIA DE LA GESTANTE</h3>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${aux.value.nroVisita}</h4>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">FECHA DE VISITA  :${aux.value.fecha_creacion_documento}</h4>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${aux.value.validator.altitud}</h4> 
              <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS DE LA GESTANTE:${aux.value.nombres_gestante} ${aux.value.apellidos_gestante}</h4>
              <img style=" width: 180px; 
              height:180px;
              margin:2px auto;
              display:block;"
                src="${aux_}"/>
              </div>
            `,
                { closeButton: false }
              );
          }, 2000);
        } else if (aux.value.puerpera == "puerpera") {
          let auxImg;
          this.visitaService
            .urlImagen(aux.value.validator.imagen)
            .subscribe((res: any) => {
              auxImg = res["object"];
            });
          setTimeout(() => {
            let aux_ = "data:image/jpg;base64," + auxImg;
            L.marker(
              [aux.value.validator.latitud, aux.value.validator.longitud],
              { icon: puerperasIcon },
              {
                title: "VISITA DOMICILIARIA ",
              }
            )
              .addTo(this.maps)
              .bindPopup(
                `
              <div style="width:200px;height:350px">
              <h3 style="font-style: italic;font-weight:bold;font-size:12px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DOMICILIARIA DE LA PUERPERA</h3>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">VISITA NRO :${aux.value.nroVisita}</h4>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">FECHA DE VISITA  :${aux.value.fecha_creacion_documento}</h4>
              <h4 style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">ALTITUD:${aux.value.validator.altitud}</h4> 
              <h4  style="font-style: italic;font-weight:bold;font-size:10px;color:#000000;text-align:left;font-family: Times, "Times New Roman", Georgia, serif">DATOS DE LA PUERPERA:${aux.value.nombres_gestante} ${aux.value.apellidos_gestante}</h4>
              <img style=" width: 180px; 
              height:180px;
              margin:2px auto;
              display:block;"
              src="${aux_}"/>
              </div>
            `,
                { closeButton: false }
              );
          }, 2000);
        }
      }
    });
  }
}
