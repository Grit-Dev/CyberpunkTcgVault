import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { apiSecurityInterceptor } from '../../../core/http/api-security.interceptor';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import { AccountService } from './account.service';

const user = {
  userId: 'collector-1',
  userName: 'IAMATEST',
  email: 'collector@example.com',
  roles: ['User'],
  emailConfirmed: true,
  twoFactorEnabled: false
};

describe('AccountService', () => {
  let service: AccountService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiSecurityInterceptor])),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AccountService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('loads collector-facing account identity from the existing /api/Auth/me contract', () => {
    service.load().subscribe(response => {
      expect(response.userName).toBe('IAMATEST');
      expect(response.email).toBe('collector@example.com');
    });

    const request = httpTesting.expectOne(API_ENDPOINTS.auth.me);

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush(user);
  });

  it('deletes the account with the current password and the shared CSRF interceptor', () => {
    service.deleteAccount('password-123').subscribe();

    const csrfRequest = httpTesting.expectOne(API_ENDPOINTS.auth.csrf);
    csrfRequest.flush({ requestToken: 'csrf-token' });

    const request = httpTesting.expectOne(API_ENDPOINTS.account);

    expect(request.request.method).toBe('DELETE');
    expect(request.request.body).toEqual({
      currentPassword: 'password-123',
      authenticatorCode: null
    });
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('csrf-token');

    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });
  });
});
