import { Injectable } from '@angular/core';
import { Board } from "../classes/board.class";
import { StateManagementService } from './state-management.service';

@Injectable({
  providedIn: 'root'
})
export class BoardCreationService {


  constructor(
    private stateService:StateManagementService
  ) { }

  createBoardInService():Board{
    const boardSizeX = this.stateService.getStateValue('boardDimentionSizeX'),
    boardSIzeY = this.stateService.getStateValue('boardDimentionSizeY'),
    shipsNUmber=this.stateService.getStateValue('numberOfShips'),
    shipsSize = this.stateService.getStateValue('sizeOfShips');

    return new Board(boardSizeX,boardSIzeY,shipsNUmber,shipsSize)
  }

}
