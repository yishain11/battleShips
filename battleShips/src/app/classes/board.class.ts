import { Cell } from "./cell.class";

export class Board {

  boardArrays:Cell[][] = []


  constructor(
    numOfColsX:number,
    numOfRowsY:number,
    shipNumber:number,
    ShipSize:number) {
      this.createBoard(numOfColsX,numOfRowsY)

  }

  createBoard(numOfColsX:number,numOfRowsY:number){

    console.log(`start createBoard`);

    for (let rowIndex = 1; rowIndex <= numOfRowsY; rowIndex++) {
      let currentBoardRow:Cell[] = []
      for (let columnIndex = 1; columnIndex <= numOfColsX; columnIndex++) {

        currentBoardRow.push(new Cell(columnIndex,rowIndex))
      }
      this.boardArrays.push(currentBoardRow)
    }


  }

  populateBoard(boardArray:Cell[][],numOfColsX:number,numOfRowsY:number,shipNumber:number,ShipSize:number){



  }



}
