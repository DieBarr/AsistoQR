import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginRegisterPageRoutingModule } from './login-register-routing.module';
import {LoginComponent} from 'src/app/components/login/login.component';

import {RegisterComponent} from 'src/app/components/register/register.component';
import { LoginRegisterPage } from './login-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRegisterPageRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoginRegisterPage,LoginComponent,RegisterComponent]
})
export class LoginRegisterPageModule {}
