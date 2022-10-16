import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiRestService } from '../../services/api-rest.service';
import { DataBaseService} from '../../services/data-base.service';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  usersApi: any;
  subjectsApi: any;

  constructor(private router: Router,  private dbService:  DataBaseService , private apirest: ApiRestService) {

    this.router.navigate(['login-register/login']);
  }
  ngOnInit(){
  }
}
