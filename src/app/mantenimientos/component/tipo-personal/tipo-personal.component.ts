import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TipoPersonal} from "../../../core/models/mantenimiento.models";
import {PersonalService} from "../../../core/services/personal-services/personal.service";
import {TipoPersonalService} from "../../services/tipo-personal/tipo-personal.service";

@Component({
    selector: 'app-tipo-personal',
    templateUrl: './tipo-personal.component.html',
    styleUrls: ['./tipo-personal.component.css']
})
export class TipoPersonalComponent implements OnInit {
    tipo_personals: TipoPersonal[];
    tipo_personal: TipoPersonal;
    selected_tipo_personals: TipoPersonal[];
    personalDialog: boolean;
    subscription: Subscription;
    submitted: boolean;
    loading = true;

    constructor(
        private tipo_personalService: TipoPersonalService,
    ) {
    }

    ngOnInit(): void {
        this.tipo_personalService.getTipo_Personal().toPromise().then(tipoPersonals => {
            this.tipo_personals = [...tipoPersonals];
            this.loading = false;
        })
            .catch((err) => {
                this.loading = false;
                console.log('error', err)
            })

    }

}
