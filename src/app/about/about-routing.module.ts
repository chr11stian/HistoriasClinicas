import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
const routes:Routes=[
  {
    path:'nosotros',
    component:AboutDialogComponent,
  },
  {
    path:'profile-detail',
    component:ProfileDetailComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
})
export class AboutRoutingModule { }
