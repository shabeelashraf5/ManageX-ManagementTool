import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ErrorpageComponent } from './errorpage.component';
import { ActivatedRoute } from '@angular/router';

describe('ErrorpageComponent', () => {
  let component: ErrorpageComponent;
  let fixture: ComponentFixture<ErrorpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorpageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mocked-id' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
