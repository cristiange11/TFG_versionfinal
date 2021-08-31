import { CookieService } from 'ngx-cookie-service';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });
/*
  it('should perform a post to /auth with email and password', () => {
    const dni = 'dni';
    const password = 'password';
    const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
      'http',
      ['post']
    );
    const authService = new AuthService(null,httpClientStub);
    httpClientStub.post.and.returnValue(of());

    authService.login(dni, password);

    expect(httpClientStub.post).toHaveBeenCalledWith('/auth/login', { dni, password });
  });
  */
});
