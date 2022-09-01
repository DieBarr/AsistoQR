import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AngularDelegate, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  constructor(private router: Router) {


    this.router.navigate(['login-register/login']);
  }

  ngOnInit() {
  }

}
