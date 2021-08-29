import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { XyzAppComponent } from './xyz-app.component';

const routes: Routes = [
  { path: '', component: XyzAppComponent },
  {
    path: 'proctected-home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XyzAppRoutingModule {}
