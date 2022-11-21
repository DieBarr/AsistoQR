import { TestBed } from '@angular/core/testing';

import { DataBaseService } from './data-base.service';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
describe('DataBaseService', () => {
  let service: DataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
providers: [SQLite,NativeStorage]
    });
    service = TestBed.inject(DataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
