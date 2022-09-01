import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-settings-student',
  templateUrl: './settings-student.component.html',
  styleUrls: ['./settings-student.component.scss'],
})
export class SettingsStudentComponent implements OnInit {

    names: string = "Juanito";
  constructor(private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.names = this.router.getCurrentNavigation().extras.state.name;

      }
    })

  }

  ngOnInit() {}

}
