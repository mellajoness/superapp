import { TestBed } from '@angular/core/testing';

import { PaydayLoanService } from './payday-loan.service';

describe('PaydayLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaydayLoanService = TestBed.get(PaydayLoanService);
    expect(service).toBeTruthy();
  });
});
