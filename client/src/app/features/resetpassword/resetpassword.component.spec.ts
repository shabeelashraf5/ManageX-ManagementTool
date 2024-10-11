import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetpasswordComponent } from './resetpassword.component';
import { LoginService } from '../../core/services/login/login.service';


describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpasswordComponent,   HttpClientTestingModule ],
      providers: [LoginService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
