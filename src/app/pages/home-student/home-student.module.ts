import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeStudentPageRoutingModule } from './home-student-routing.module';

import { CoursesComponent } from 'src/app/components/courses/courses.component';

import { ScannerComponent } from 'src/app/components/scanner/scanner.component';

import { SettingsStudentComponent } from 'src/app/components/settings-student/settings-student.component';


import { HomeStudentPage } from './home-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeStudentPageRoutingModule
  ],
  declarations: [HomeStudentPage,ScannerComponent,CoursesComponent,SettingsStudentComponent]
})
export class HomeStudentPageModule {}
