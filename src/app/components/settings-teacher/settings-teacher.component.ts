import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-settings-teacher',
  templateUrl: './settings-teacher.component.html',
  styleUrls: ['./settings-teacher.component.scss'],
})
export class SettingsTeacherComponent implements OnInit {


    e: string = "";

    n: string = "";
  constructor(private activedRouter: ActivatedRoute,private router: Router) {
   this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.n = this.router.getCurrentNavigation().extras.state.name;
        this.e = this.router.getCurrentNavigation().extras.state.email;

      }
    })

  }


  ngOnInit() {}

}
