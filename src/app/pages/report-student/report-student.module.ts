import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportStudentPageRoutingModule } from './report-student-routing.module';

import { ReportStudentPage } from './report-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportStudentPageRoutingModule
  ],
  declarations: [ReportStudentPage]
})
export class ReportStudentPageModule {}
