import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.scss'],
})
export class ClassTeacherComponent implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController, private router : Router) {


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Iniciaras la clase!',
      subHeader:'Continuar?',
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
            this.router.navigate(['section/qr']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  ngOnInit() {}

}
