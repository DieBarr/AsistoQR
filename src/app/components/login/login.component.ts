import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import { ApiRestService } from '../../services/api-rest.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public toastController: ToastController, private router: Router, private apirest: ApiRestService, private dbService: DataBaseService, public nativeStorage: NativeStorage) { }
  usersApi: any;
  subjectsApi: any;
  sectApi: any;

  subSectApi: any;
  user: string = '';
  password: string = '';
  users: any = [
    {
      id_usuario: '',
      nombre_usuario: '',
      nombre: '',
      apellido: '',
      clave: '',
      correo: '',
      rol_id: '',
      rut: ''
    }
  ]
  sendData() {
    let counter: number = 0;
    this.users.forEach(count);
    function count() {
      counter += 1;

    }
    for (let u in this.users) {
      if (this.users[u].nombre_usuario == this.user && this.users[u].clave == this.password) {
        if (this.users[u].rol_id == 1) {
          this.nativeStorage.setItem('id', this.users[u].id_usuario);
          this.router.navigate(['home-teacher/sections']);
        }
        else if (this.users[u].rol_id == 2) {
          this.nativeStorage.setItem('id', this.users[u].id_usuario);
          this.router.navigate(['home-student/courses']);
        }
      } else {
        counter -= 1;
      }
      if (counter == 0) {
        this.presentToast("Usuario o contraseña incorrectos.");
      }
    }

  }
  ngOnInit() {

    this.apirest.getUsers().subscribe((res) => {
      if (res) {
        this.usersApi = res;
        for (let i = 0; i < this.usersApi.length; i++) {
          this.dbService.insertApi(1, res[i].id, res[i].nombre, res[i].clave, res[i].id_rol);
        }
      }
    }, (error) => {
      console.log(error);
    });
    this.apirest.getSubjects().subscribe((res) => {
      if (res) {
        this.subjectsApi = res;
        for (let i = 0; i < this.subjectsApi.length; i++) {
          this.dbService.insertApi(2, res[i].id, res[i].sigla, res[i].nombre, null);
        }
      }
    }, (error) => {
      console.log(error);
    });
    this.apirest.getSections().subscribe((res) => {
      if (res) {
        this.sectApi = res;
        for (let i = 0; i < this.sectApi.length; i++) {
          this.dbService.insertApi(3, res[i].id, res[i].sigla, null, null);
        }
      }
    }, (error) => {
      console.log(error);
    });
    this.apirest.getSubSect().subscribe((res) => {
      if (res) {
        this.subSectApi = res;
        for (let i = 0; i < this.subSectApi.length; i++) {
          this.dbService.insertApi(4, res[i].id, res[i].id_ramo, res[i].id_seccion, res[i].id_profesor);
        }
      }
    }, (error) => {
      console.log(error);
    });
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchUsers().subscribe(item => {
          this.users = item;
        }
        )

      }
    })


  }







  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
}
