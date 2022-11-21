import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassesTeacherComponent } from './classes-teacher.component';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
describe('ClassesTeacherComponent', () => {
  let component: ClassesTeacherComponent;
  let fixture: ComponentFixture<ClassesTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesTeacherComponent ],
      imports: [IonicModule.forRoot()]

,providers:[NativeStorage,SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
