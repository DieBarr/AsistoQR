import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTeacherPageRoutingModule } from './home-teacher-routing.module';

import { HomeTeacherPage } from './home-teacher.page';
import { SectionsTeacherComponent } from 'src/app/components/sections-teacher/sections-teacher.component';
import { SettingsTeacherComponent } from 'src/app/components/settings-teacher/settings-teacher.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTeacherPageRoutingModule
  ],
  declarations: [HomeTeacherPage,SectionsTeacherComponent,SettingsTeacherComponent]
})
export class HomeTeacherPageModule {}
