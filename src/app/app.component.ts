import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService,MessageService]
})
export class AppComponent implements OnInit {
    constructor(private config: PrimeNGConfig) { }

    ngOnInit() {
        this.config.setTranslation({
            accept: 'Aceptar',
            reject: 'Cancelar',
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            today: 'Hoy',
            clear: 'Limpiar',
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        });
    }
}
