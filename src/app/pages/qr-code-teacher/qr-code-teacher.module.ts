import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeTeacherPageRoutingModule } from './qr-code-teacher-routing.module';

import { QrCodeTeacherPage } from './qr-code-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeTeacherPageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrCodeTeacherPage]
})
export class QrCodeTeacherPageModule {}
