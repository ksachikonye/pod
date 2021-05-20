import { TestBed } from '@angular/core/testing';

import { OuradataService } from './ouradata.service';

describe('OuradataService', () => {
  let service: OuradataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuradataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
