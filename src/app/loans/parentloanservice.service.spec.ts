import { TestBed } from '@angular/core/testing';

import { ParentloanserviceService } from './parentloanservice.service';

describe('ParentloanserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParentloanserviceService = TestBed.get(ParentloanserviceService);
    expect(service).toBeTruthy();
  });
});
