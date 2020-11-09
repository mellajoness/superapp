import { TestBed } from '@angular/core/testing';

import { BiometricsService } from './biometrics.service';

describe('BiometricsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiometricsService = TestBed.get(BiometricsService);
    expect(service).toBeTruthy();
  });
});
