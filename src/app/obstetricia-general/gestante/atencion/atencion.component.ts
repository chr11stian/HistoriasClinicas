import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GestanteComponent} from "../gestante.component";
import {ObstetriciaGeneralService} from "../../services/obstetricia-general.service";

@Component({
    selector: 'app-atencion',
    templateUrl: './atencion.component.html',
    styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {

    idDocumento: string;

    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService) {
    }

    ngOnInit(): void {
        this.obstetriciaGeneralService.observable$.subscribe(id => {
            this.idDocumento = id;
            console.log("ID", id);
        });
    }

}
