import { TestBed } from '@angular/core/testing';

import { CameraService } from './camera.service';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
providers:[Camera]
    });
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
