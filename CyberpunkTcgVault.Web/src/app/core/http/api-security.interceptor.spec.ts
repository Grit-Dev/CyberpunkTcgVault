import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_ENDPOINTS } from './api-endpoints';
import { apiSecurityInterceptor } from './api-security.interceptor';

describe('apiSecurityInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiSecurityInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should include browser credentials on safe API requests', () => {
    http.get(API_ENDPOINTS.capabilities).subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.capabilities);

    expect(request.request.withCredentials).toBe(true);
    expect(request.request.headers.has('X-XSRF-TOKEN')).toBe(false);

    request.flush({});
  });

  it('should attach a CSRF token to unsafe API requests', () => {
    http.post(API_ENDPOINTS.auth.login, {}).subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);

    expect(csrfRequest.request.withCredentials).toBe(true);

    csrfRequest.flush({
      requestToken: 'csrf-token',
    });

    const loginRequest = httpTesting.expectOne(API_ENDPOINTS.auth.login);

    expect(loginRequest.request.withCredentials).toBe(true);
    expect(loginRequest.request.headers.get('X-XSRF-TOKEN')).toBe('csrf-token');

    loginRequest.flush({
      requiresTwoFactor: false,
      user: null,
    });
  });

  it('should not modify third-party requests', () => {
    const externalUrl = 'https://example.com/resource';

    http.get(externalUrl).subscribe();

    const request = httpTesting.expectOne(externalUrl);

    expect(request.request.withCredentials).toBe(false);
    expect(request.request.headers.has('X-XSRF-TOKEN')).toBe(false);

    request.flush({});
  });
});
