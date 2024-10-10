import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalypasswordComponent } from './dispalypassword.component';

describe('DispalypasswordComponent', () => {
  let component: DispalypasswordComponent;
  let fixture: ComponentFixture<DispalypasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispalypasswordComponent]
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
