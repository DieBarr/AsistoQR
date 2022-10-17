import { Component, OnInit } from '@angular/core';

import { DataBaseService } from '../../services/data-base.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-classes-teacher',
  templateUrl: './classes-teacher.component.html',
  styleUrls: ['./classes-teacher.component.scss'],
})
export class ClassesTeacherComponent implements OnInit {
 clases:any=[

  {
       id_asistencia: '',
            fecha:'' ,
            hora_inicio: '',
            hora_fin:'' ,
            estado_clase:''
  }
]
  constructor( public nativeStorage: NativeStorage, private dbService: DataBaseService) { }

  ngOnInit() {
   this.nativeStorage.getItem('subject').then((data) => {
   this.dbService.onEnterSection(data.id_asig_secc);
    })

  this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchClasesDates().subscribe(item => {
          this.clases = item;
         }
        )
      }
    })

  }

}
