import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorePasswdPageRoutingModule } from './restore-passwd-routing.module';

import { RestorePasswdPage } from './restore-passwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorePasswdPageRoutingModule
  ],
  declarations: [RestorePasswdPage]
})
export class RestorePasswdPageModule {}
