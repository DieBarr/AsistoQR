import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterPage } from './login-register.page';

import { LoginComponent } from 'src/app/components/login/login.component';

import { RegisterComponent } from 'src/app/components/register/register.component';
const routes: Routes = [
  {
    path: '',
    component: LoginRegisterPage,

    children:[
      {
        path:'login',
        component: LoginComponent

      },
 {
        path:'register',
        component: RegisterComponent

      }

          ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRegisterPageRoutingModule {}
