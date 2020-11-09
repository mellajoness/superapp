import { TestBed } from '@angular/core/testing';

import { PaygateService } from './paygate.service';

describe('PaygateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaygateService = TestBed.get(PaygateService);
    expect(service).toBeTruthy();
  });
});
