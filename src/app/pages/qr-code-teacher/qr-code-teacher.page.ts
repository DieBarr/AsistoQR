import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-qr-code-teacher',
  templateUrl: './qr-code-teacher.page.html',
  styleUrls: ['./qr-code-teacher.page.scss'],
})
export class QrCodeTeacherPage implements OnInit {
qrClase='';
idAsis='';
idAsigSecc='';
  constructor(public nativeStorage: NativeStorage) { }
  ngOnInit() {
    this.nativeStorage.getItem('qrIdAsis').then((data) => {
      //this.qrClase = data + 'clase';
      this.idAsis = data;
    
    })
    this.nativeStorage.getItem('qrAsigSecc').then((data) => {
      //this.qrClase = data + 'clase';
      this.idAsigSecc = data;
    
    })
    if(this.idAsigSecc != '' && this.idAsis != ''){
      this.qrClase = this.idAsis + 'clase' + this.idAsigSecc;
    }
  }

}
