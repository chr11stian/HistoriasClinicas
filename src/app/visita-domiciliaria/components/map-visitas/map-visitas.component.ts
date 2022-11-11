import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as L from "leaflet";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget;
}
@Component({
  selector: "app-map-visitas",
  templateUrl: "./map-visitas.component.html",
  styleUrls: ["./map-visitas.component.css"],
})
export class MapVisitasComponent implements OnInit, OnChanges {
  @Input("dataVisitas") dataVisitas: any[];
  latMap =this.visitaService.getLatitudIpress();
  lngMap = this.visitaService.getLongitudeIpress();
  imagesUrl:any=["https://res.cloudinary.com/dhcetqc1j/image/upload/v1663796368/visita-domiciliaria_yn5eyj.jpg",
                 "https://res.cloudinary.com/dhcetqc1j/image/upload/v1663796368/visita-domiciliaria_yn5eyj.jpg",
                "https://res.cloudinary.com/dhcetqc1j/image/upload/v1663796368/visita-domiciliaria_yn5eyj.jpg"]
  private centroid: L.LatLngExpression = [this.latMap, this.lngMap];
  maps: any;
  photoSelected:string  | ArrayBuffer="https://res.cloudinary.com/dhcetqc1j/image/upload/v1654050519/7dc4c2e40b17a259f2177131b34439fe957eae2f_00_dxyvnm.gif";
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

  onPhotoSelected(event:HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){

    }
  }
  cargarImagena(){}
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
    ).addTo(this.maps);

    this.dataVisitas.map((aux,i) => {
      if(aux.value.hasOwnProperty('mayor_cuatro_meses') || aux.value.hasOwnProperty('menor_cuatro_meses')){
        if(aux.value.mayor_cuatro_meses=="mayor_cuatro_meses"){
          // this.visitaService.couch=true;
          L.marker([aux.value.validator.latitud, aux.value.validator.longitud],{icon: ninios_mayores_Icon},{
            title: "VISITA DOMICILIARIA",
          })
            .addTo(this.maps)
            .bindPopup(
              `
            <div style="width:200px;height:100%;background: #f8f9fa">
            <h3 style="font-style: italic;font-weight:bold;font-size:14px;color:#af0017;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">VISITA DE NIÑOS,NIÑAS DE 4-24 MESES</h3>
            <h4 style="font-style: italic;font-weight:bold;font-size:12px;color:#000000;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">Visita número :${aux.value.nroVisita}</h4>
            <h4  style="font-style: italic;font-weight:bold;font-size:12px;color:#000000;text-align:center;font-family: Times, "Times New Roman", Georgia, serif">Altitud:${aux.value.validator.altitud}</h4>
            <img
            src="${this.visitaService.getImage(
              aux.value.validator.imagen
              ).then((url:string)=>{console.log("url",url);})}"
            "
            style="width: 100%; display: block"
          />
            </div>
            
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
              <div>
              <h3>VISITA NIÑOS-NIÑAS,0-4 MESES</h3>
              <h4>VISITA NRO :${aux.value.nroVisita}</h4>
              <h4>ALTITUD:${aux.value.validator.altitud}</h4> 
              <img class="image" src="imagesUrl[0]" alt=""/>
              </div>
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
            <img class="image" src="" alt=""/>
          
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
            <img class="image" src="" alt=""/>
          
          `,
              { closeButton: false }
            );
        }
      }
    
    
    });
    
    // const legend=L.Legend({
    //   position:'bottomright',
    //   collapsed:false,
    //   simbolwidth:24,
    //   opacity:1,
    //   column:1,
    //   legends:[
    //   {
    //   label:"Niños y niñas,0-4 meses",
    //   type:"image",
    //   url:'./assets/svg-marker/marker-ninio-menores.svg'
    //   },
    //   {
    //     label:"Niños y niñas,4-24 meses",
    //     type:"image",
    //     url:'./assets/svg-marker/marker-ninio-mayores.svg'
    //   },
    // ]
    // }).addTo(this.maps)
  }

  cargarImagen(){
    console.log("imageennnnnnn");
  }

}/**  <img class="image" src="{{'data:image/png;base64,'+${this.visitaService.getImageURL(aux.value.validator.firma)}}"
        alt="Imagen"/> */
