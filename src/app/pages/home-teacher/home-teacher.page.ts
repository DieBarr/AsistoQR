import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {

  constructor(private router: Router) {


    this.router.navigate(['home-teacher/sections']);

   }

  ngOnInit() {
  }
  segmentChanged($event){
    let direccion = $event.detail.value;
    //console.log(direccion);
    this.router.navigate(['home-teacher/' + direccion]);
  }

}
