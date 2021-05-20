import { TestBed } from '@angular/core/testing';

import { FitbitdataService } from './fitbitdata.service';

describe('FitbitdataService', () => {
  let service: FitbitdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitbitdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
