import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-qr-code-teacher',
  templateUrl: './qr-code-teacher.page.html',
  styleUrls: ['./qr-code-teacher.page.scss'],
})
export class QrCodeTeacherPage implements OnInit {
qrClase='';

  constructor(public nativeStorage: NativeStorage) { }
  ngOnInit() {
    this.nativeStorage.getItem('asistencia').then((data) => {
      //this.qrClase = data + 'clase';
    this.qrClase = 'asis' + data.id+ 'clase' + data.idAsigSecc + 'asigSecc';
    })

   
  }

}
