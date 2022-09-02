import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-settings-student',
  templateUrl: './settings-student.component.html',
  styleUrls: ['./settings-student.component.scss'],
})
export class SettingsStudentComponent implements OnInit {
names: string = "";
  email: string = "";

  constructor(private router: Router, private activedRouter: ActivatedRoute) {
this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.names = this.router.getCurrentNavigation().extras.state.names;

      }
})
   }

  ngOnInit() {}

}
