import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_ENDPOINTS } from '../http/api-endpoints';
import { apiSecurityInterceptor } from '../http/api-security.interceptor';
import { AuthService } from './auth.service';

const demoUser = {
  userId: '00000000-0000-0000-0000-000000000001',
  userName: 'Demo',
  email: 'demo@example.com',
  roles: ['Demo'],
  emailConfirmed: true,
  twoFactorEnabled: false
};

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([apiSecurityInterceptor])
        ),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should restore an authenticated session through /me', () => {
    service.restoreSession().subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.auth.me);

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush(demoUser);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isDemo()).toBe(true);
    expect(service.currentUser()?.userName).toBe('Demo');
  });

  it('should treat a 401 session restore as signed out', () => {
    service.restoreSession().subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.auth.me);

    request.flush(
      {},
      {
        status: 401,
        statusText: 'Unauthorized'
      }
    );

    expect(service.isAuthenticated()).toBe(false);
    expect(service.isInitialized()).toBe(true);
  });

  it('should sign into the dedicated Demo flow without browser credentials', () => {
    service.loginDemo().subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);
    csrfRequest.flush({ requestToken: 'csrf-token' });

    const demoRequest = httpTesting.expectOne(API_ENDPOINTS.auth.demo);

    expect(demoRequest.request.method).toBe('POST');
    expect(demoRequest.request.body).toEqual({});
    expect(demoRequest.request.headers.get('X-XSRF-TOKEN'))
      .toBe('csrf-token');

    demoRequest.flush(demoUser);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isDemo()).toBe(true);
  });

  it('should request password recovery without browser-side account discovery', () => {
    service.forgotPassword('collector@example.com').subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);
    csrfRequest.flush({ requestToken: 'csrf-token' });

    const request = httpTesting.expectOne(API_ENDPOINTS.auth.forgotPassword);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'collector@example.com'
    });
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('csrf-token');

    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });
  });

  it('should submit the backend-issued reset token without interpreting it', () => {
    service.resetPassword({
      userId: 'user-id',
      token: 'opaque-reset-token',
      newPassword: 'new-password-123'
    }).subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);
    csrfRequest.flush({ requestToken: 'csrf-token' });

    const request = httpTesting.expectOne(API_ENDPOINTS.auth.resetPassword);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      userId: 'user-id',
      token: 'opaque-reset-token',
      newPassword: 'new-password-123'
    });
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('csrf-token');

    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });
  });

  it('clears local authenticated state after a server-side account deletion', () => {
    service.loginDemo().subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);
    csrfRequest.flush({ requestToken: 'csrf-token' });

    const demoRequest = httpTesting.expectOne(API_ENDPOINTS.auth.demo);
    demoRequest.flush(demoUser);

    expect(service.isAuthenticated()).toBe(true);

    service.clearAuthenticatedSession();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

});
