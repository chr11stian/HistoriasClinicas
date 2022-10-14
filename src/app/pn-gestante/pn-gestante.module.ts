import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PnGestanteRoutingModule } from './pn-gestante-routing.module';
import { PrimeModule } from '../shared/prime/prime.module';
import { PnGestanteComponent } from './components/pn-gestante/pn-gestante.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PnGestanteDialogComponent } from './components/pn-gestante-dialog/pn-gestante-dialog.component';
import { SemanaGestacional } from './pipes/semana-gestacional';
import { PnGestanteDiaCambioComponent } from './components/pn-gestante-dia-cambio/pn-gestante-dia-cambio.component';
import { PnGestanteDiaGestaComponent } from './components/pn-gestante-dia-gesta/pn-gestante-dia-gesta.component';
import { EstadoGestacional } from './pipes/estado-gestacional';
import { PnDialogGestaComponent } from './components/pn-dialog-gesta/pn-dialog-gesta.component';
@NgModule({
  declarations: [
    PnGestanteComponent,
    PnGestanteDialogComponent,
    SemanaGestacional,
    PnGestanteDiaCambioComponent,
    PnGestanteDiaGestaComponent,
    EstadoGestacional,
    PnDialogGestaComponent,
  ],

  imports: [
    CommonModule,
    PnGestanteRoutingModule,
    PrimeModule,

  ],
  exports:[
    PnGestanteRoutingModule,
  ],
  providers: [
    DialogService
  ]
})
export class PnGestanteModule { }
