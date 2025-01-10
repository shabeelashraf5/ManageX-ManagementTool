import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasswordsService } from './passwords.service';

describe('PasswordsService', () => {
  let service: PasswordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PasswordsService],
    });
    service = TestBed.inject(PasswordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
