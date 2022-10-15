import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from 'src/app/components/courses/courses.component';

import { ScannerComponent } from 'src/app/components/scanner/scanner.component';

import { SettingsStudentComponent } from 'src/app/components/settings-student/settings-student.component';
import { HomeStudentPage } from './home-student.page';

const routes: Routes = [
  {
    path: '',
    component: HomeStudentPage,

    children:[
      {
        path:'courses',
        component: CoursesComponent

      },
  {
        path:'scanner',
        component: ScannerComponent

      },

 {
        path:'settings',
        component: SettingsStudentComponent

      }

          ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeStudentPageRoutingModule {}
