import {Component, OnInit} from '@angular/core';
import {UbicacionService} from "../../core/services/ubicacion/ubicacion.service";
import {TipoPersonal} from "../../core/models/mantenimiento.models";
import {Subscription} from "rxjs";
import {Ubicacion} from "../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";
import { ObjectRes } from 'src/app/core/models/objectRes';

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

    try: ObjectRes;
    // try: any;

    constructor(private ubicacionService: UbicacionService,
                private primengConfig: PrimeNGConfig,
    ) {
    }

    ngOnInit(): void {
        console.log('tipo 1 ', typeof(this.ubicacion))
        this.primengConfig.ripple = true;
        this.ubicacionService.getUbicacion().toPromise().then(data => {
            // this.ubicacions = data
            this.try = data;
            console.log('try ', this.try.cod);
            this.ubicacions = this.try.object;
            console.log(this.ubicacion);
            // this.ubicacions = this.try.object

            // console.log('ubi ', this.ubicacions[2])
        })

        // this.ubicacionService.getUbicacion().subscribe(res => {
        //     console.log(res)
        // });
    }

    prueba(){
        this.ubicacionService.getUbicacion();
        // this.ubicacionService.getUbicacion().subscribe(res=>{
        //     console.log('res de prueba ', res)
        //     // this.ubicacion = res.object;
        // })
    }
}
