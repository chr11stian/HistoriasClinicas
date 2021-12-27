import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./component/step-general-consulta/step-general-consulta.component";

const routes: Routes = [
    {
        path: "consultorio-obstetrico",
        component: StepGeneral_consultaComponent
    },

    {
        path: "obstetricia",
        loadChildren: () => import('src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/consulta-obstetrico.module').then(n => n.ConsultaObstetricoModule),
    },


];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultaObstetricoRoutingModule {
}
