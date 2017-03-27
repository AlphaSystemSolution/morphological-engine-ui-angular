import { TestBed, inject } from '@angular/core/testing';

import { ApplicationControllerService } from './application-controller.service';

describe('ApplicationControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationControllerService]
    });
  });

  it('should ...', inject([ApplicationControllerService], (service: ApplicationControllerService) => {
    expect(service).toBeTruthy();
  }));
});
