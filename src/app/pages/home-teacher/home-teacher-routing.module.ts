import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionsTeacherComponent } from 'src/app/components/sections-teacher/sections-teacher.component';
import { SettingsTeacherComponent } from 'src/app/components/settings-teacher/settings-teacher.component';

import { HomeTeacherPage } from './home-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTeacherPage,


    children:[
      {
        path:'sections',
        component: SectionsTeacherComponent

      },
 {
        path:'settings',
        component: SettingsTeacherComponent

      }

          ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTeacherPageRoutingModule {}
