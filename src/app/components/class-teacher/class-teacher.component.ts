import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DataBaseService } from '../../services/data-base.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.scss'],
})
export class ClassTeacherComponent implements OnInit {
  public qrClase: string = null;
  handlerMessage = '';
  roleMessage = '';
  id_asis = '';
  lista: any = [
    {
      nombre: '',
      nombre_usuario: '',
      apellido: '',
      estado_asistencia: ''

    }
  ]

  constructor(private alertController: AlertController, private router: Router, public nativeStorage: NativeStorage, private dbService: DataBaseService) {


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Iniciaras la clase!',
      subHeader: 'Continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.nativeStorage.setItem('qr', this.id_asis);
            this.router.navigate(['qr-code-teacher']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  ngOnInit() {

    this.nativeStorage.getItem('id_asis').then((data) => {
      this.dbService.onEnterList(data);
      this.id_asis = data;
    })
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchAtendance().subscribe(item => {
          this.lista = item;
        }
        )
      }
    })


  }

}
