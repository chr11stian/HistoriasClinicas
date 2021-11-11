import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HistoriaRoutingModule} from "./historia-routing.module";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {StepsModule} from "primeng/steps";
import {PrimeModule} from "../shared/prime/prime.module";
import {FormsModule} from "@angular/forms";
import {RolGuardiaComponent} from "./rol-guardia/rol-guardia.component";
import {RolGuardiaGeneralComponent} from "./rol-guardia-general/rol-guardia-general.component";

@NgModule({
    declarations: [
        RolGuardiaComponent,
        RolGuardiaGeneralComponent,
    ],
    imports: [
        CommonModule,
        HistoriaRoutingModule,
        PanelModule,
        ToolbarModule,
        StepsModule,
        PrimeModule,
        FormsModule,
    ],
})
export class HistoriaModule {
}
