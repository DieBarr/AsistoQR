import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {
 names: string = "";
  email: string = "";


  constructor(private router: Router, private activedRouter: ActivatedRoute) {

    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.names = this.router.getCurrentNavigation().extras.state.names;
        this.email = this.router.getCurrentNavigation().extras.state.email;

      }
         })
  }


 sendDataSettings(){

 let navigationExtras: NavigationExtras = {
      state: {
        names: this.names,

        email: this.email
      }

    }

      this.router.navigate(['home-teacher/settings'],navigationExtras);
  }

  ngOnInit() {
  }

}
