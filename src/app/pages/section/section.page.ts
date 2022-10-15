import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {

  constructor(private router: Router) {


    this.router.navigate(['section/classes']);

  }

  ngOnInit() {
  }
segmentChanged($event){
    let direccion = $event.detail.value;
    console.log(direccion);
    //this.router.navigate(['section' + direccion]);

  }

}
