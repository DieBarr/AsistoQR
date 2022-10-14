import { Component, OnInit } from '@angular/core';

import { CameraService } from '../../services/camera.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  arregloFotos: any;
  constructor(private camera: CameraService) {
    this.camera.tomarFoto();
 }
  ngOnInit() {
    this.camera.fetchFoto().subscribe(res => {
      this.arregloFotos = res;
    })
  }
}
