import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SectionsTeacherComponent } from './sections-teacher.component';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
describe('SectionsTeacherComponent', () => {
  let component: SectionsTeacherComponent;
  let fixture: ComponentFixture<SectionsTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsTeacherComponent ],
      imports: [IonicModule.forRoot()]
      ,providers:[NativeStorage,SQLite]
    }
    ).compileComponents();

    fixture = TestBed.createComponent(SectionsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
