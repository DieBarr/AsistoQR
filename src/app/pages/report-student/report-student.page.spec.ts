import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {ActivatedRoute } from '@angular/router';
import { ReportStudentPage } from './report-student.page';

describe('ReportStudentPage', () => {
  let component: ReportStudentPage;
  let fixture: ComponentFixture<ReportStudentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentPage ],
      imports: [IonicModule.forRoot()],
providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
