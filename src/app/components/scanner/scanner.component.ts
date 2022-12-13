import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import {DataBaseService} from '../../services/data-base.service';

import { CameraService } from '../../services/camera.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  arregloFotos: any;
  scannedResult= '';
  users : any = [{
    id_usuario: '',
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    clave: '',
    correo: '',
    rol_id: '',
    rut: ''
}]
id='';
constructor(private camera: CameraService, public nativeStorage: NativeStorage, private dbService : DataBaseService) {
    this.camera.tomarFoto();
 }
  async startScan (){
  // Check camera permission
  // This is just a simple example, check out the better checks below
  await BarcodeScanner.checkPermission({ force: true });
  // make background of WebView transparent
  // note: if you are using ionic this might not be enough, check below
  BarcodeScanner.hideBackground();
document.querySelector('body').classList.add('scanner-active');
  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  // if the result has content
  if (result.hasContent) {
    this.scannedResult = result.content;

    let qrRegEx = /asis([0-9+])clase([0-9]+)asigSecc/;
    let match = result.content.match(qrRegEx);
  
    this.dbService.onScanStudent(match[1],match[2],this.id);
    console.log(result.content); // log the raw scanned content
  }
};
  ngOnInit() {
    this.nativeStorage.getItem('id').then((data)=>{
      this.dbService.onLoginStudent(data);
      this.id = data;
    })

    this.dbService.dbState().subscribe(res => {
      if (res) {
          this.dbService.fetchUsers().subscribe(item => {
              this.users = item;
          })
      }
  });


  this.camera.fetchFoto().subscribe(res => {
      this.arregloFotos = res;
    })
  }
}
