import { TestBed } from '@angular/core/testing';
import { DialogProfileService } from './dialog-profile.service';


describe('ProfileService', () => {
  let service: DialogProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
