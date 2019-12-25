import { TestBed } from '@angular/core/testing';

import { CompConnectionsService } from './comp-connections.service';

describe('CompConnectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompConnectionsService = TestBed.get(CompConnectionsService);
    expect(service).toBeTruthy();
  });
});
