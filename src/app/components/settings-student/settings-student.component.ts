import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-settings-student',
  templateUrl: './settings-student.component.html',
  styleUrls: ['./settings-student.component.scss'],
})
export class SettingsStudentComponent implements OnInit {
user: string = "";
  mail: string = "";

  constructor(private router: Router, private activedRouter: ActivatedRoute) {
this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.email;
        this.mail = this.router.getCurrentNavigation().extras.state.names;

      }
})
   }

  ngOnInit() {}

}
