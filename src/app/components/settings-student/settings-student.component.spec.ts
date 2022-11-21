import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SettingsStudentComponent } from './settings-student.component';
import { ActivatedRoute } from '@angular/router';

describe('SettingsStudentComponent', () => {
  let component: SettingsStudentComponent;
  let fixture: ComponentFixture<SettingsStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsStudentComponent ],
      imports: [IonicModule.forRoot()]
      ,providers:[SQLite,ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
