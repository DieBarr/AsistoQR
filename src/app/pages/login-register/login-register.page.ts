import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AngularDelegate, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  user: string = "Desconocido";
  passwd: string = "";


  users: any[] = [
    {
      userName: 'profesor',
      passwd: '123456'
    },
    {
      userName: 'alumno',
      passwd: '123456'
    }

]

  constructor(public toastController: ToastController, private router: Router, private alertController: AlertController) { }

  sendData() {
    let navigationExtras: NavigationExtras = {
      state: {
        usr: this.user,
        pass: this.passwd
      }
    }

    if (this.user == this.users[0].userName && this.passwd == this.users[0].passwd){

      this.router.navigate(['/home-teacher']);

    }
    else if (this.user == this.users[1].userName && this.passwd == this.users[1].passwd) {


      this.router.navigate(['/home-student']);

    }
      
    else 
    {

      console.log("mal");
    }


  
  }

    
  ngOnInit() {
  }

}
