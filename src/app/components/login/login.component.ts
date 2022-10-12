import { Component, OnInit } from '@angular/core';
import{DataBaseService}from '../../services/data-base.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
constructor( public toastController: ToastController, private router: Router,private dbService: DataBaseService) { }
email: string ='';
password: string ='';
  users:any = [
   {
      id: '',
      nombre: '',
      apellido: '',
      correo:'',
      rol_id:'',
     clave:''
    }
]

  sendData() {
    for(let u in this.users){
      if(this.users[u].correo = this.email && this.users[u].clave ==this.password && this.users[u].rol_id ==1 ){
        this.router.navigate(['home-teacher/sections']);

      }
      else if(this.users[u].correo = this.email && this.users[u].clave ==this.password && this.users[u].rol_id ==2 ){

        this.router.navigate(['home-student/courses']);
      }
      else {
        this.presentToast("Correo o clave incorrectos.");
  }
}
  }


  ngOnInit() {
    this.dbService.dbState().subscribe(res =>{
      if(res){
        this.dbService.fetchUsers().subscribe(item=>{
          this.users = item;
        }
        )
      }
    }
    )
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
