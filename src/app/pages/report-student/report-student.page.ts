import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report-student',
  templateUrl: './report-student.page.html',
  styleUrls: ['./report-student.page.scss'],
})
export class ReportStudentPage implements OnInit {
course:string;
  constructor(private router: Router, private activedRouter: ActivatedRoute) {


    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.course = this.router.getCurrentNavigation().extras.state.course;
      }
         })

  }

  ngOnInit() {
  }

}
