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
   subjects: any = [
    {
      profesor_id: '',
      nombre_asig: '',
      sigla_asig: '',
      sigla_secc: ''
    }
  ]
  constructor(private router: Router, public nativeStorage: NativeStorage, private dbService: DataBaseService) { }
  toSection(a){
    this.nativeStorage.setItem('subject',a);
  }
  ngOnInit() {
    this.nativeStorage.getItem('id').then((data) => {
   this.dbService.onLoginTeacher(data);
    })
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchSubSectUT().subscribe(item => {
          this.subjects = item;
         }
        )
      }
    })

  }

}
