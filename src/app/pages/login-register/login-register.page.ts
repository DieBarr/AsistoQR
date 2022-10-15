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

 this.apirest.getUsers().subscribe((res) => {
   if(res){
      this.usersApi = res;
      for(let i=0; i<this.usersApi.length; i++ ){
        this.dbService.insertApi(1,this.usersApi[i].id, this.usersApi[i].nombre, this.usersApi[i].clave, this.usersApi[i].id_rol);
      }
   }
    }, (error) => {
      console.log(error);
    });
 this.apirest.getSubjects().subscribe((res) => {
   if(res){
      this.subjectsApi = res;
      for(let i=0; i<this.subjectsApi.length; i++ ){
        this.dbService.insertApi(2, this.subjectsApi[i].id,this.subjectsApi[i].sigla,this.subjectsApi[i].nombre,null);
      }
   }
    }, (error) => {
      console.log(error);
    });

  }
}
