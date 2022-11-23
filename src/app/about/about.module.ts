import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { AboutRoutingModule } from './about-routing.module';
import { PrimeModule } from '../shared/prime/prime.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

@NgModule({
  declarations: [
    AboutDialogComponent,
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PrimeModule,
  ],
  exports:[
  AboutRoutingModule,
  ],
  providers:[
    DialogService,
  ]
})
export class AboutModule { }
