import { Injectable } from '@angular/core';
import { Board } from "../classes/board.class";

@Injectable({
  providedIn: 'root'
})
export class BoardCreationService {

  boardSizeX:number = 5
  boardSIzeY:number = 5
  shipsNUmber:number = 3
  shipsSize:number = 2
  numOfMissles:number = 15

  constructor() { }

  createBoardInService():Board{
    return new Board(this.boardSizeX,this.boardSIzeY,this.shipsNUmber,this.shipsSize)
  }

}
