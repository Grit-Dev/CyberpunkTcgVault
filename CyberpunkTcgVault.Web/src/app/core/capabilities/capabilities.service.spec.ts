import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_ENDPOINTS } from '../http/api-endpoints';
import { CapabilitiesService } from './capabilities.service';

describe('CapabilitiesService', () => {
  let service: CapabilitiesService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CapabilitiesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should load product capabilities from the backend', () => {
    service.load().subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.capabilities);

    expect(request.request.method).toBe('GET');

    request.flush({
      publicRegistrationEnabled: false,
      demoAccessEnabled: true,
    });

    expect(service.publicRegistrationEnabled()).toBe(false);
    expect(service.demoAccessEnabled()).toBe(true);
    expect(service.isLoaded()).toBe(true);
  });

  it('should fail closed when capability discovery fails', () => {
    service.load().subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.capabilities);

    request.flush(
      {},
      {
        status: 500,
        statusText: 'Server Error',
      },
    );

    expect(service.publicRegistrationEnabled()).toBe(false);
    expect(service.demoAccessEnabled()).toBe(false);
    expect(service.isLoaded()).toBe(true);
  });
});
