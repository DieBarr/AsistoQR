import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeTeacherPage } from './qr-code-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodeTeacherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeTeacherPageRoutingModule {}
