import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';


import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  names: string;
  email: string;
  name: string;
  id:any;
  subjects: any = [
    {
      id_usuario: '',
      nombre_asig: '',
      sigla_asig: '',
      sigla_secc: ''
    }
  ]
  constructor(private dbService: DataBaseService, public nativeStorage: NativeStorage) {


  }
  days: any[] = [
    {
      id: 1,
      name: 'Lunes'
    },
    {
      id: 2,
      name: 'Martes'
    },
    {
      id: 3,
      name: 'Miercoles'
    },
    {
      id: 4,
      name: 'Jueves'
    },
    {
      id: 5,
      name: 'Viernes'
    }

  ]
  ngOnInit() {
 this.nativeStorage.getItem('id').then((data)=>{
   this.dbService.onLoginStudent(data);
 })
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchSubSectU().subscribe(item => {
          this.subjects = item;
        }
        )

      }
    })
    }
}
