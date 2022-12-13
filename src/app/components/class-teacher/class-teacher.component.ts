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
  idAsigSecc='';

  lista: any = [
    {
      nombre: '',
      nombre_usuario: '',
      apellido: '',
      estado_asistencia: ''

    }
  ]
  asistencia : any;
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
            this.nativeStorage.setItem('asistencia', this.asistencia);
 
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

    this.nativeStorage.getItem('asistencia').then((data) => {
      this.dbService.onEnterList(data.id_asistencia);
      this.asistencia = data;
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
