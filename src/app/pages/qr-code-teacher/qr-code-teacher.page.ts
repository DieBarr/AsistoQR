import { Component, OnInit } from '@angular/core';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-qr-code-teacher',
  templateUrl: './qr-code-teacher.page.html',
  styleUrls: ['./qr-code-teacher.page.scss'],
})
export class QrCodeTeacherPage implements OnInit {
QrClase:string= '';
  constructor(public nativeStorage: NativeStorage) { }




  ngOnInit() {
    this.nativeStorage.getItem('qr').then((data) => {
      this.QrClase = data + 'clase';
    })

  }

}
