import { TestBed } from '@angular/core/testing';

import { PaymentslogicService } from './paymentslogic.service';

describe('PaymentslogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentslogicService = TestBed.get(PaymentslogicService);
    expect(service).toBeTruthy();
  });
});
