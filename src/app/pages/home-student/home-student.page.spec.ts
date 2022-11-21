import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomeStudentPage } from './home-student.page';

describe('HomeStudentPage', () => {
  let component: HomeStudentPage;
  let fixture: ComponentFixture<HomeStudentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStudentPage ],
      imports: [IonicModule.forRoot()]
      ,
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
