import { TestBed } from '@angular/core/testing';

import { TransactionPinService } from './transaction-pin.service';

describe('TransactionPinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionPinService = TestBed.get(TransactionPinService);
    expect(service).toBeTruthy();
  });
});
