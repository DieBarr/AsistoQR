import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import { DataBaseService } from '../../services/data-base.service';
@Component({
  selector: 'app-sections-teacher',
  templateUrl: './sections-teacher.component.html',
  styleUrls: ['./sections-teacher.component.scss'],
})
export class SectionsTeacherComponent implements OnInit {
  id: any;
  subSect: any = [
    {
      id: '',
      asignatura_id: '',
      seccion_id: '',
      profesor_id: ''
    }
  ];
subject: any = [
    {
      id: '',
      sigla: '',
      nombre: ''
    }
  ];




  constructor(private router: Router, public nativeStorage: NativeStorage, private dbService: DataBaseService) { }
  ngOnInit() {
    this.nativeStorage.getItem('id').then((data) => {
      this.id = data;
    })

    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchSubSect().subscribe(item => {
          this.subSect = item;
         }
        )
      }
    })
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchSubjects().subscribe(item => {
          this.subject = item;
                   }
        )
      }
    })


  }

  goToSection() {
    this.router.navigate(['section'])
  }

}
