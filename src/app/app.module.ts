import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {AppRoutingModule} from './app-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PrimeModule} from './shared/prime/prime.module'
import {ChartModule} from 'primeng/chart';
import {DividerModule} from "primeng/divider";
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InterceptorService} from "../interceptors/interceptor.service";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent
    ],
    imports: [
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
