import { Component, OnInit } from '@angular/core';

import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
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
  asignaturas:any = [

   {
      id: '',
      nombre: '',
      sigla: ''
    }
]
  courseName: string = "bruh";
  constructor(private router: Router,private activedRouter: ActivatedRoute, private dbService:  DataBaseService) {

this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.names = this.router.getCurrentNavigation().extras.state.names;
        this.email = this.router.getCurrentNavigation().extras.state.email;

      }
})


  }
  courses: any[] = [
  {
    id: 1,
    name: 'Sociologia Post-Marxista',
    hora: '10:00-11:30',
    abr:"JCSPM-00D2",
    ass: 0.9
  },
  {
    id: 2,
    name: 'Escatologia estelar',
    hora: '11:31-13:00',
    abr:"JCEE-00D7"
    ,

    ass: 0.8
  },
  {
    id:3,
    name:'Fisiología molecular',
    hora:'14:00-15:30',
    abr:"JCFM-MB01",
    ass: 0.67
  }



]
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
  },


]
  goToCourse(owo){
    let  name = this.courses[owo].name;
    let navigationExtras: NavigationExtras = {
      state: {
        course: this.name,
      }
    }
    console.log(owo)

    console.log(name)
  this.router.navigate(['/report-student',navigationExtras])
  }
   ngOnInit() {

  this.dbService.dbState().subscribe(res=>{
      if(res){
        this.dbService.fetchSubjects().subscribe(item=>{
          this.asignaturas = item;
        })
      }
    })

   }

}
