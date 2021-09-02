import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {PrimeModule} from '../shared/prime/prime.module'


import {CoreRoutingModule} from './core-routing.module';
import {LayoutPrincipalComponent} from './layout-principal/layout-principal.component';
import {InicioComponent} from './inicio/inicio.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";



@NgModule({
    declarations: [
        LayoutPrincipalComponent,
        InicioComponent,
        SideBarComponent,
        TopMenuComponent,

    ],
    exports: [
        TopMenuComponent,
        SideBarComponent,
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        PrimeModule,
        ReactiveFormsModule,
        SharedModule,
        ToastModule,
        ConfirmPopupModule
    ]
})
export class CoreModule {
}
