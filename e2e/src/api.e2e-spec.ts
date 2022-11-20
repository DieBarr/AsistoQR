import { TestBed } from '@angular/core/testing';

import { ApiRestService } from '../../src/app/services/api-rest.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('userService', () => {
  let service: ApiRestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiRestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an API call', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Simons Product',
        price: 42.99,
        description: 'Epic product test',
      },
    ];

    service.getUsers().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const user = res[0];
      expect(user).toBe(mockResponse[0]);
    });

    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/'
    );

    expect(mockRequest.request.method).toEqual('GET');

    // Resolve with our mock data
    mockRequest.flush(mockResponse);
  });
});