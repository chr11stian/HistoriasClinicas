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
import {MegaMenuModule} from "primeng/megamenu";
import {TabMenuModule} from "primeng/tabmenu";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from "primeng/inputnumber";
import {SelectButtonModule} from 'primeng/selectbutton';
import {TreeSelectModule} from 'primeng/treeselect';
import { LoadingSpinnerDialogComponent } from './loading-spinner-dialog/loading-spinner-dialog.component';

@NgModule({
    declarations: [
        LayoutPrincipalComponent,
        InicioComponent,
        SideBarComponent,
        TopMenuComponent,
        LoadingSpinnerDialogComponent,

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
        ConfirmPopupModule,
        TabMenuModule,
        ButtonModule,
        RippleModule,
        InputNumberModule,
        SelectButtonModule,
        TreeSelectModule
    ]
})
export class CoreModule {
}
