import { Component, OnInit } from '@angular/core';

import { CameraService } from '../../services/camera.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  arregloFotos: any;
  scannedResult: any;
  constructor(private camera: CameraService) {
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
    console.log(result.content); // log the raw scanned content
  }
};

  ngOnInit() {
    this.camera.fetchFoto().subscribe(res => {
      this.arregloFotos = res;
    })
  }
}
