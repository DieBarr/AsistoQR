import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionPageRoutingModule } from './section-routing.module';

import { SectionPage } from './section.page';
import { ClassTeacherComponent } from 'src/app/components/class-teacher/class-teacher.component';
import { ClassesTeacherComponent } from 'src/app/components/classes-teacher/classes-teacher.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionPageRoutingModule
  ],
  declarations: [SectionPage,ClassTeacherComponent,ClassesTeacherComponent]
})
export class SectionPageModule {}
