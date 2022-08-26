import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'teacher-home',
    loadChildren: () => import('./pages/teacher-home/teacher-home.module').then( m => m.TeacherHomePageModule)
  },
  {
    path: 'student-home',
    loadChildren: () => import('./pages/student-home/student-home.module').then( m => m.StudentHomePageModule)
  },
  {
    path: 'class',
    loadChildren: () => import('./pages/class/class.module').then( m => m.ClassPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
