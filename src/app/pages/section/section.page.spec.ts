import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { SectionPage } from './section.page';

describe('SectionPage', () => {
  let component: SectionPage;
  let fixture: ComponentFixture<SectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPage ],
      imports: [IonicModule.forRoot()],
      providers:[NativeStorage,SQLite,ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
