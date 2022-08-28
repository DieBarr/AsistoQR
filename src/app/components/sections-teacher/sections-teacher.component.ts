import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-sections-teacher',
  templateUrl: './sections-teacher.component.html',
  styleUrls: ['./sections-teacher.component.scss'],
})
export class SectionsTeacherComponent implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {}
 
  goToSection() {
    this.router.navigate(['section'])
  }
 
}
