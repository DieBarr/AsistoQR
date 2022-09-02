import { Component, OnInit } from '@angular/core';

import { AlertController, AngularDelegate, ToastController } from '@ionic/angular';

import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = "";
  names: string="Juan ";

  password: string="";


  users: any[] = [
    {
      email: 'ju.arcoiris@profesor.duoc.cl',
      password: '123456',
      names:'Juanito Arcoiris'
    },
    {
      email: 'co.fulanito@duocuc.cl',
      password: '123456',
      names:'Cosme Fulanito'
    }

]


  constructor( public toastController: ToastController, private router: Router, private alertController: AlertController) { }

  sendData() {

    if (this.email == this.users[0].email && this.password == this.users[0].password){
      this.email = this.users[0].email;

      this.names = this.users[0].names;
  let navigationExtras: NavigationExtras = {
      state: {
        names: this.names,

        email: this.email
      }

    };

 this.router.navigate(['home-teacher'], navigationExtras);

    }



    else if (this.email == this.users[1].email && this.password == this.users[1].password) {
 this.email = this.users[1].email;
 this.names = this.users[1].names;
 let navigationExtras: NavigationExtras = {
      state: {
        names: this.names,

        email: this.email
      }

    };

      this.router.navigate(['home-student/courses'],navigationExtras);
    }
    else {
      console.log("hola")
    }


  }


  ngOnInit() {}

}
