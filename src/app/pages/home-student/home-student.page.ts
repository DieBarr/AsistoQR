import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router,ActivatedRoute,  NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
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

      this.router.navigate(['home-student/settings'],navigationExtras);
  }


  ngOnInit() {}

}
