import { TestBed } from '@angular/core/testing';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiRestService } from './api-rest.service';

describe('ApiRestService', () => {
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
        "id": 1,
        "nombre": "v.rosendo5",
        "clave": "J.12mm5",
        "id_rol": 1
      },
      {
        "id": 2,
        "nombre": "j.baez5",
        "clave": "B.34vf5",
        "id_rol": 2
      },
      {
        "id": 3,
        "nombre": "a.diaz5",
        "clave": "C.54yt75",
        "id_rol": 2
      }
    ];

    service.getUsers().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toHaveSize(3);
      const product = res[0];
      expect(product).toBe(mockResponse[0]);
    });

    const mockRequest = httpTestingController.expectOne(
        'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/'
    );

    expect(mockRequest.request.method).toEqual('GET');

    // Resolve with our mock data
    mockRequest.flush(mockResponse);
  });
});
