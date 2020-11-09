import { TestBed } from '@angular/core/testing';

import { BillspaymentshandlerService } from './billspaymentshandler.service';

describe('BillspaymentshandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillspaymentshandlerService = TestBed.get(BillspaymentshandlerService);
    expect(service).toBeTruthy();
  });
});
