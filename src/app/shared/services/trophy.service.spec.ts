import { TestBed } from '@angular/core/testing';

import { TrophyService } from './trophy.service';

describe('TrophyService', () => {
  let service: TrophyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrophyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
