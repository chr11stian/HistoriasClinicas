import {Component, OnInit} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Ubicacion} from "../../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";
import Swal from "sweetalert2";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {


    ubicacions: Ubicacion[];
    ubicacion: Ubicacion;
    selected_ubicacion: Ubicacion[];
    ubicacionDialog: boolean;
    data: any;
    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
                private primengConfig: PrimeNGConfig,
    ) {
        this.getUbicacion();
    }

    ngOnInit(): void {

    }

    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.data = resp.object;
        });
    }

    editUbicacion(ubicacion: Ubicacion) {
        this.ubicacion = {...ubicacion};
        this.ubicacionDialog = true;
    }


    openNew() {
        this.ubicacion = {};
        this.submitted = false;
        this.ubicacionDialog = true;
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.ubicacionDialog = false;
        this.submitted = false;
    }

}
