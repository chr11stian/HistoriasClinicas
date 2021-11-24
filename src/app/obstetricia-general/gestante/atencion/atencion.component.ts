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


export class AtencionComponent implements OnInit {
    titleBienvenida: string = "¡Iniciemos!";
    contentBienvenida: string = "Puedes empezar seleccionando Plan de Atención Integral Cada una de las secciones contiene todo lo que necesitas para completar su primera consulta.";
    titlePrimeraFase: string = "¡Continuamos!";
    contentPrimeraFase: string = "";
    titleSegundaFase: string = "Por último";
    contentSegundaFase: string = "";

    idDocumento: string;
    id: string = "";

    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService) {
    }

    ngOnInit(): void {
        this.id = this.obstetriciaGeneralService.idGestacion;
        console.log("ID recuperado", this.id);
    }

    ngOnDestroy() {
    }
}
