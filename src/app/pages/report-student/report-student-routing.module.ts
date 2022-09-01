import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportStudentPage } from './report-student.page';

const routes: Routes = [
  {
    path: '',
    component: ReportStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportStudentPageRoutingModule {}
