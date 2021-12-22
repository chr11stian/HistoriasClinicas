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

    idRecuperado: string = "";
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: any;
    nroHcl: string;

    dataConsultorioObstetrico: any;


    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService) {
        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.idRecuperado = this.obstetriciaGeneralService.idGestacion;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.nroHcl = this.obstetriciaGeneralService.nroHcl;
    }

    ngOnInit(): void {
        console.log("IdRecuperado", this.idRecuperado);
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("NroHCL", this.nroHcl);
        console.log("Nro Embarazo", this.nroEmbarazo);

        this.getConsultorioObstetrico();

    }

    getConsultorioObstetrico() {
        const data = {
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1,
        }
        this.obstetriciaGeneralService.getConsultorioObstetrico(data).subscribe((res: any) => {
            this.dataConsultorioObstetrico = res.object
            console.log('Data Consultorio Obstetrico', this.dataConsultorioObstetrico)

            this.obstetriciaGeneralService.idConsultoriObstetrico = this.dataConsultorioObstetrico.id;
            console.log('Data consultorio id', this.obstetriciaGeneralService.idConsultoriObstetrico);
        });

    }

    ngOnDestroy() {
    }
}
