import {Component, OnInit} from '@angular/core';
import {UbicacionService} from "../../core/services/ubicacion/ubicacion.service";
import {TipoPersonal} from "../../core/models/mantenimiento.models";
import {Subscription} from "rxjs";
import {Ubicacion} from "../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {


    ubicacions: Ubicacion[];
    ubicacion: Ubicacion;
    selected_ubicacion: Ubicacion[];
    personalDialog: boolean;
    da: any;
    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
                private primengConfig: PrimeNGConfig,
    ) {
    }

    ngOnInit(): void {
        // this.ubicacion = this.da
        // this.ubicacionService.getUbicacion().toPromise().then(data => {
        //     this.ubicacions = data
        // })

        // this.getUbicacion();

        this.ubicacionService.getUbicacion().subscribe(res => {
            console.log(res)
        });
    }

    // getUbicacion():  {
    //     return this.ubicacionService.getUbicacion().toPromise()
    //         .then(ubicacions => {
    //             this.ubicacions = [...ubicacions];
    //         }).catch((err) => {
    //             console.log('Error', err);
    //         });
    // }

}
