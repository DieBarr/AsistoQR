import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestorePasswdPage } from './restore-passwd.page';

const routes: Routes = [
  {
    path: '',
    component: RestorePasswdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestorePasswdPageRoutingModule {}
