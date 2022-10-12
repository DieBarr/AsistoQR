import { Component, OnInit } from '@angular/core';

import { DataBaseService} from '../../services/data-base.service';
@Component({
  selector: 'app-settings-student',
  templateUrl: './settings-student.component.html',
  styleUrls: ['./settings-student.component.scss'],
})
export class SettingsStudentComponent implements OnInit {
  users:any = [
   {
      id: '',
      nombre: '',
      apellido: '',
      correo:''
    }
]
  constructor( private dbService:  DataBaseService) {
   }
  ngOnInit() {
    this.dbService.dbState().subscribe(res =>{
      if(res){
        this.dbService.fetchUsers().subscribe(item=>{
          this.users = item;
        }
        )
      }
    }
    )
  }

}
