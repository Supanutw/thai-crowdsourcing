/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DustService } from './dust.service';

describe('Service: Dust', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DustService]
    });
  });

  it('should ...', inject([DustService], (service: DustService) => {
    expect(service).toBeTruthy();
  }));
});
