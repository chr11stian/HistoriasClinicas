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
    //${this.visitaService.getImageURL( aux.value.validator.imagen
    this.dataVisitas.map((aux,i) => {
      //console.log(aux.value);
      //console.log(i,aux.value.validator.latitud, aux.value.validator.longitud);
      // this.visitaService.couch=true;
      // this.visitaService.getImageURL(aux.value.validator.firma).subscribe((re)=>console.log("werewrewr",re))
      /**
       *const urlFoto =this.imagenServicio.urlImagen(url);
        const token = localStorage.getItem("token"); //obtener el token
        const headers = new HttpHeaders({'Authorization': "Bearer " + token, 'Content-Type': 'image/*'}); //costruir los header con el token
        // return this.http.get(url, {headers, responseType: "blob"})
        return this.http
            .get(urlFoto, { headers, responseType: 'blob' })//recuperar la imagen y guardar en un blob
            .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
       */
      // this.visitaService.getImageURL(aux.value.validator.firma).subscribe((data)=>{
      //   console.log("daaaataaa",data);
      // });
      console.log("auxxxx",aux)
      if(aux.value.hasOwnProperty('mayor_cuatro_meses') || aux.value.hasOwnProperty('menor_cuatro_meses')){
        console.log("NIÑOS Y NIÑAS");
        if(aux.value.mayor_cuatro_meses=="mayor_cuatro_meses"){
          L.marker([aux.value.validator.latitud, aux.value.validator.longitud],{icon: ninios_mayores_Icon},{
            title: "VISITA DOMICILIARIA",
          })
            .addTo(this.maps)
            .bindPopup(
              `
            <h3>VISITA NIÑOS-NIÑAS,4-24 MESES</h3>
            <h4>VISITA NRO :${aux.value.nroVisita}</h4>
            <h4>ALTITUD:${aux.value.validator.altitud}</h4> 
          
          `,
              { closeButton: false }
            );
        }else if(aux.value.menor_cuatro_meses=="menor_cuatro_meses"){
          L.marker([aux.value.validator.latitud, aux.value.validator.longitud],{icon: ninios_menores_Icon},{
            title: "VISITA DOMICILIARIA",
          })
            .addTo(this.maps)
            .bindPopup(
              `
              <h3>VISITA NIÑOS-NIÑAS,0-4 MESES</h3>
              <h4>VISITA NRO :${aux.value.nroVisita}</h4>
              <h4>ALTITUD:${aux.value.validator.altitud}</h4> 
          
          `,
              { closeButton: false }
            );
        }
      }else if(aux.value.hasOwnProperty('gestante') || aux.value.hasOwnProperty('puerpera')){
        if(aux.value.gestante=="gestante"){
          console.log("GESTANTEEEE");
          L.marker([aux.value.validator.latitud, aux.value.validator.longitud],{icon: gestantesIcon },{
            title: "VISITA DOMICILIARIA ",
          })
            .addTo(this.maps)
            .bindPopup(
              `
            <h4>VISITA GESTANTE</h3>
            <h4>ALTITUD:${aux.value.validator.altitud}</h4> 
          
          `,
              { closeButton: false }
            );
        }else if(aux.value.puerpera=="puerpera"){
          console.log("PUERPERAAAA");
          L.marker([aux.value.validator.latitud, aux.value.validator.longitud],{icon:puerperasIcon},{
            title: "VISITA DOMICILIARIA ",
          })
            .addTo(this.maps)
            .bindPopup(
              `
            <h3>VISITA PUERPERA</h3>
            <h4>ALTITUD:${aux.value.validator.altitud}</h4> 
          
          `,
              { closeButton: false }
            );
        }
      }
    
    
    });
    titles.addTo(this.maps);
  }
}/**  <img class="image" src="{{'data:image/png;base64,'+${this.visitaService.getImageURL(aux.value.validator.firma)}}"
        alt="Imagen"/> */
