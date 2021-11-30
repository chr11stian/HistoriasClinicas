import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatosGeneralesComponent} from "./component/datos-generales/datos-generales.component";
import {StepGeneral_consultaComponent} from "./component/step-general-consulta/step-general-consulta.component";
import {InterrogatorioComponent} from "./component/interrogatorio/interrogatorio.component";
import {GiagnosticosComponent} from "./component/giagnosticos/giagnosticos.component";
import {TratamientoComponent} from "./component/tratamiento/tratamiento.component";
import {ResultadosComponent} from "./component/resultados/resultados.component";
import {PrimeModule} from "../../../../shared/prime/prime.module";
<<<<<<< HEAD:src/app/obstetricia-general/gestante/atencion/consulta-principal/consulta-principal.module.ts

import {FormsModule} from "@angular/forms";
import {ModalInmunizacionesComponent } from './component/tratamiento/modal-inmunizaciones/modal-inmunizaciones.component';
import {ModalTratamientoComponent} from "./component/tratamiento/modal-tratamiento/modal-tratamiento.component";

import { DialogExamenesFetalesComponent } from './component/interrogatorio/dialog-examenes-fetales/dialog-examenes-fetales.component';
=======
import {DialogExamenesFetalesComponent} from "./component/interrogatorio/dialog-examenes-fetales/dialog-examenes-fetales.component";
import {ConsultaObstetricoRoutingModule} from "./consulta-obstetrico-routing.module";
>>>>>>> dd7d13b5a90fc601f31701771170f106856f9d53:src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/consulta-obstetrico.module.ts


@NgModule({
    declarations: [
        DatosGeneralesComponent,
        StepGeneral_consultaComponent,
        InterrogatorioComponent,
        GiagnosticosComponent,
        TratamientoComponent,
        ResultadosComponent,

        ModalTratamientoComponent,
        ModalInmunizacionesComponent,
        DialogExamenesFetalesComponent,
    ],
    imports: [
        ConsultaObstetricoRoutingModule,
        CommonModule,
        PrimeModule,
        FormsModule
    ]
})
export class ConsultaObstetricoModule {
}
