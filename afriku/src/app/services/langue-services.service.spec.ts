import { TestBed } from '@angular/core/testing';

import { LangueServicesService } from './langue-services.service';

describe('LangueServicesService', () => {
  let service: LangueServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangueServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
