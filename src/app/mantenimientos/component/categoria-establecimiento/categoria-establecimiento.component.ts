import {Component, OnInit} from '@angular/core';
import {CategoriaEstablecimientoService} from "../../services/categoria-establecimiento/categoria-establecimiento.service";
import {Ubicacion} from "../../../core/models/ubicacion.models";
import Swal from "sweetalert2";

@Component({
    selector: 'app-categoria-establecimiento',
    templateUrl: './categoria-establecimiento.component.html',
    styleUrls: ['./categoria-establecimiento.component.css']
})
export class CategoriaEstablecimientoComponent implements OnInit {
    dataCategoriaEstablecimiento: any;

    CategoriaDialog: boolean;
    submitted: boolean;

    constructor(private categoriaEstablecimientoService: CategoriaEstablecimientoService) {
        this.getUbicacion();
    }

    ngOnInit(): void {
    }

    getUbicacion() {
        this.categoriaEstablecimientoService.getCategoriaEstablecimiento().subscribe((resp: any) => {
            this.dataCategoriaEstablecimiento = resp.object;
        });
    }

    edit(ubicacion: Ubicacion) {
        this.dataCategoriaEstablecimiento = {...ubicacion};
        this.CategoriaDialog = true;
    }


    openNew() {
        this.dataCategoriaEstablecimiento = {};
        this.submitted = false;
        this.CategoriaDialog = true;
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.CategoriaDialog = false;
        this.submitted = false;
    }


}
