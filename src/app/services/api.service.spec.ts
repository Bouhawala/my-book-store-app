import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';


describe('myService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [ApiService]
      }));

       it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
       });

       it('should have getUsers function', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service.getUsers).toBeTruthy();
       });

    });