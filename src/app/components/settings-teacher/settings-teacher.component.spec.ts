import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsTeacherComponent } from './settings-teacher.component';

import { ActivatedRoute} from '@angular/router';
describe('SettingsTeacherComponent', () => {
  let component: SettingsTeacherComponent;
  let fixture: ComponentFixture<SettingsTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTeacherComponent ],
      imports: [IonicModule.forRoot()]
      , providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
