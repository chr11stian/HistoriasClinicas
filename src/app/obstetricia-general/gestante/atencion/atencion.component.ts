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
    nroHCL: string = "";

    dni : string ="";
    nroEmbarazo: any;

    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService) {
    }

    ngOnInit(): void {
        // this.obstetriciaGeneralService.observable$.subscribe((id: any) => {
        //     this.idDocumento = id;
        //     console.log("ID", id);
        // });

        this.id = this.obstetriciaGeneralService.id;
        console.log("xxxxx", this.id);
        console.log("xxxxx", this.nroHCL);

    }

    ngOnDestroy() {
    }
}
