import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ClassTeacherComponent } from './class-teacher.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { DataBaseService } from '../../services/data-base.service';
describe('ClassTeacherComponent', () => {
  let component: ClassTeacherComponent;
  let fixture: ComponentFixture<ClassTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTeacherComponent ],
      imports: [IonicModule.forRoot()],
      providers:[NativeStorage,SQLite,DataBaseService]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
