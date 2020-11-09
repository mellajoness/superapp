import { TestBed } from '@angular/core/testing';

import { PasswordPinService } from './password-pin.service';

describe('PasswordPinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordPinService = TestBed.get(PasswordPinService);
    expect(service).toBeTruthy();
  });
});
