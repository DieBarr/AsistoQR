import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassTeacherComponent } from 'src/app/components/class-teacher/class-teacher.component';
import { ClassesTeacherComponent } from 'src/app/components/classes-teacher/classes-teacher.component';


import { SectionPage } from './section.page';

const routes: Routes = [
  {
    path: '',
    component: SectionPage,

    children:[
      {
        path:'classes',
        component: ClassesTeacherComponent

      },
 {
        path:'class',
        component: ClassTeacherComponent

      }

          ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionPageRoutingModule {}
