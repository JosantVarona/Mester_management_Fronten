import { TestBed } from '@angular/core/testing';

import { ApiSpringbootService } from './api-springboot.service';

describe('ApiSpringbootService', () => {
  let service: ApiSpringbootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSpringbootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
