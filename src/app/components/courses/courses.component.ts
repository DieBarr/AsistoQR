import { Component, OnInit } from '@angular/core';
import { DataBaseService} from '../../services/data-base.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  names:string;
  email:string;
  name:string;
  subjects:any = [

   {
      id: '',
      nombre: '',
      sigla: ''
    }
]
  constructor( private dbService:  DataBaseService) {


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
    id:3,
    name:'Miercoles'
  },
{
    id:4,
    name:'Jueves'
  },
{
    id:5,
    name:'Viernes'
  }

   ]
   ngOnInit() {
       //select all subjects in database
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchSubjects().subscribe(item => {
          this.subjects = item;
        }
        )

      }
    })

   }}
