import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService} from '../../services/data-base.service';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  constructor(private router: Router, private DBservice: DataBaseService) {


    this.router.navigate(['login-register/login']);
  }
  ngOnInit() {
    this.DBservice.dbState().subscribe();}

}
