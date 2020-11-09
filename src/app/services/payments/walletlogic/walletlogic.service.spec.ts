import { TestBed } from '@angular/core/testing';

import { WalletlogicService } from './walletlogic.service';

describe('WalletlogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletlogicService = TestBed.get(WalletlogicService);
    expect(service).toBeTruthy();
  });
});
