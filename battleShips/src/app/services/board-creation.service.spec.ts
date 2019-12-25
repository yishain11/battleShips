import { TestBed } from '@angular/core/testing';

import { BoardCreationService } from './board-creation.service';

describe('BoardCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardCreationService = TestBed.get(BoardCreationService);
    expect(service).toBeTruthy();
  });
});
