import { TestBed } from '@angular/core/testing';

import { ConfirmDeletePostService } from './confirm-delete-post.service';

describe('ConfirmDeletePostService', () => {
  let service: ConfirmDeletePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDeletePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
