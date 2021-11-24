import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GestanteComponent} from "../gestante.component";
import {ObstetriciaGeneralService} from "../../services/obstetricia-general.service";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-atencion',
    templateUrl: './atencion.component.html',
    styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit, OnDestroy {

    idDocumento: string;
    suscribir: Subscription;

    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService) {
    }

    ngOnInit(): void {

        // this.obstetriciaGeneralService.observable$.toPromise().then((id:string)=>{
        //     this.idDocumento = id;
        //     console.log("ID", id);
        // });

        this.suscribir = this.obstetriciaGeneralService.observable$.subscribe((id: any) => {
            this.idDocumento = id;
            console.log("ID", id);
        });
    }

    ngOnDestroy() {
    }
}
