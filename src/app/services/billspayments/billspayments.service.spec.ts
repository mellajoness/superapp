import { TestBed } from '@angular/core/testing';

import { BillspaymentsService } from './billspayments.service';

describe('BillspaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillspaymentsService = TestBed.get(BillspaymentsService);
    expect(service).toBeTruthy();
  });
});
