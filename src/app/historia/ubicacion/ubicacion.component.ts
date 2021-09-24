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


    ubicacions: Ubicacion[] = [];
    ubicacion: Ubicacion;
    selected_ubicacion: Ubicacion[];
    personalDialog: boolean;
    subscription: Subscription;
    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
                private primengConfig: PrimeNGConfig,
    ) {
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.ubicacionService.getUbicacion().toPromise().then(data => {
            this.ubicacions = data
        })

        this.ubicacionService.getUbicacion().subscribe(res => {
            console.log(res)
        });
    }

}
