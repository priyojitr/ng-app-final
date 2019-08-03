import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptService } from './http-request-intercept.service';

describe('HttpRequestInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequestInterceptService = TestBed.get(HttpRequestInterceptService);
    expect(service).toBeTruthy();
  });
});
