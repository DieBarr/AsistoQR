import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  constructor(private router: Router) {


    this.router.navigate(['home-student/courses']);
  }

  ngOnInit() {
  }

}
