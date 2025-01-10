import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FrontComponent } from './front.component';

describe('FrontComponent', () => {
  let component: FrontComponent;
  let fixture: ComponentFixture<FrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontComponent],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mocked-id' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
