import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {AppRoutingModule} from './app-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastModule} from 'primeng/toast';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PrimeModule} from './shared/prime/prime.module'

import {ChartModule} from 'primeng/chart';
import {DividerModule} from "primeng/divider";
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InterceptorService} from "../interceptors/interceptor.service";
import {FullCalendarModule} from "primeng/fullcalendar";
import { LoginRolComponent } from './login/login-rol/login-rol.component';
import { PasswordComponent } from './login/password/password.component';
import { VisitaDomiciliariaModule } from './visita-domiciliaria/visita-domiciliaria.module';
import { PnGestanteModule } from './pn-gestante/pn-gestante.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        LoginRolComponent,
        PasswordComponent,
    ],
    imports: [
        FullCalendarModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        PrimeModule,
        ReactiveFormsModule,
        ChartModule,
        ReactiveFormsModule,
        DividerModule,
        ToggleButtonModule,
        ToastModule,
        VisitaDomiciliariaModule,
        PnGestanteModule,

        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),

    ],
    providers: [
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
