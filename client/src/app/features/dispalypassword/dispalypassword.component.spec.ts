import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DispalypasswordComponent } from './dispalypassword.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { LoginService } from '../../core/services/login/login.service';
import { ActivatedRoute } from '@angular/router';

describe('DispalypasswordComponent', () => {
  let component: DispalypasswordComponent;
  let fixture: ComponentFixture<DispalypasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispalypasswordComponent, HttpClientTestingModule],
      providers: [LoginService, {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({ get: (key: string) => 'mocked-id' }),
          queryParamMap: of({ get: (key: string) => 'mocked-query' }),
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispalypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
