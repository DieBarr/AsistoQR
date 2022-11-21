import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import { DataBaseService } from '../../services/data-base.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
  subject: any =
    {
      profesor_id: '',
      nombre_asig: '',
      sigla_asig: '',
      sigla_secc: '',
      id_asig_secc:''
    }
  clasesDates: any =
    {
      profesor_id: '',
      nombre_asig: '',
      sigla_asig: '',
      sigla_secc: ''
    }



  constructor(private router: Router, public nativeStorage: NativeStorage,  private dbService: DataBaseService) {


    this.router.navigate(['section/classes']);

  }

  ngOnInit() {
    this.nativeStorage.getItem('subject').then((data) => {
      this.subject = data;
      this.dbService.onEnterSection(data.id_asig_secc);
    })
 this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchClasesDates().subscribe(item => {
          this.clasesDates = item;
         }
        )
      }
    })

  }

}
