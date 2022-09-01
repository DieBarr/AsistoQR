import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-register',
    pathMatch: 'full'
  },
  {
    path: 'login-register',
    loadChildren: () => import('./pages/login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'restore-passwd',
    loadChildren: () => import('./pages/restore-passwd/restore-passwd.module').then( m => m.RestorePasswdPageModule)
  },
  {
    path: 'home-teacher',
    loadChildren: () => import('./pages/home-teacher/home-teacher.module').then( m => m.HomeTeacherPageModule)
  },
  {
    path: 'section',
    loadChildren: () => import('./pages/section/section.module').then( m => m.SectionPageModule)
  },
  {
    path: 'home-student',
    loadChildren: () => import('./pages/home-student/home-student.module').then( m => m.HomeStudentPageModule)
  },
  {
    path: 'report-student',
    loadChildren: () => import('./pages/report-student/report-student.module').then( m => m.ReportStudentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
