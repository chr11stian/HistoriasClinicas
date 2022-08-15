import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { SpinnerHandlerService } from './core/services/spinner-handler.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {
    loading$ = this.spinnerHandler.showSpinner$;
    constructor(private config: PrimeNGConfig, public spinnerHandler: SpinnerHandlerService, public cd: ChangeDetectorRef) {
        this.openLoading();
        // this.cd.detectChanges();
    }
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
    openLoading() {
        console.log('data de app');
        console.log('data de app ', this.loading$);
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }
}
