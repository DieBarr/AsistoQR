import { Component, OnInit } from '@angular/core';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-classes-teacher',
  templateUrl: './classes-teacher.component.html',
  styleUrls: ['./classes-teacher.component.scss'],
})
export class ClassesTeacherComponent implements OnInit {
   subject: any = [
    {
      profesor_id: '',
      nombre_asig: '',
      sigla_asig: '',
      sigla_secc: ''
    }
  ]

  constructor( public nativeStorage: NativeStorage) { }

  ngOnInit() {


  }

}
