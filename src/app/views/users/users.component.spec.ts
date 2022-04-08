import {ComponentFixture, TestBed} from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/types/user.type';
import { provideMockStore } from '@ngrx/store/testing';
import {UsersComponent} from './users.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule
      ],
      providers: [provideMockStore({}), ApiService],
      declarations: [UsersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing users', done => {
      const expectedUsers = [{id: 1, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]},
                             {id: 2, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]},
                             {id: 3, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]}];
      const expectedUsers$ = of({id: 1, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]},
                                {id: 2, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]},
                                {id: 3, firstname: "mohamed", lastname: "bouhawala", books: ["abcd", "efgh"]});

      expectedUsers$.subscribe((user: User) => {
        expect(user.firstname).toEqual(expectedUsers[0].firstname);
        done();
      });
    })
});
