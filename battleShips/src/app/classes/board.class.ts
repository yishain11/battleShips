import { Cell } from "./cell.class";

export class Board {

  boardArrays:Cell[][] = []

  getOccuipiedCellsNumber():number{
    let occupiedCellNumber:number = 0
    this.boardArrays.forEach(boardRow=>{
      boardRow.forEach(boardCell=>{
        if(boardCell.checkIfOccupied()){
          occupiedCellNumber += 1
        }
      })
    })
    return occupiedCellNumber
  }


  constructor(
    numOfColsX:number,
    numOfRowsY:number,
    shipNumber:number,
    ShipSize:number) {
      this.createBoard(numOfColsX,numOfRowsY)
      this.populateBoard(this.boardArrays,numOfColsX,numOfRowsY,shipNumber,ShipSize)
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

  populateBoard(
    boardArray:Cell[][],
    numOfColsX:number,
    numOfRowsY:number,
    shipNumber:number,
    ShipSize:number){

      // console.log(`start populate board`);


      let shipsPlacedInBoard:number = 0
      let numberOfCellsFilledFromShipSize:number = 0


      for (let shipsPlacedNumber=1;shipsPlacedNumber<=shipNumber;shipsPlacedNumber++){
        let cellForPopulationRowIndexY: number
        let cellForPopulationcellIndexX: number

        let cellIDForPopulating = this.generateNewCellIdToPopulate(numOfColsX,numOfRowsY)
        cellForPopulationcellIndexX = cellIDForPopulating[0]
        cellForPopulationRowIndexY = cellIDForPopulating[1]
        while(boardArray[cellForPopulationRowIndexY][cellForPopulationcellIndexX]['isOccupiedByShip']){
          // console.log(cellForPopulationcellIndexX,cellForPopulationRowIndexY,' is already occupied by a ship');
          ({cellForPopulationcellIndexX,cellForPopulationRowIndexY} = this.resetCellSelection(numOfColsX,numOfRowsY))
          // let cellIDForPopulating = this.generateNewCellIdToPopulate(numOfColsX,numOfRowsY)
          // cellForPopulationcellIndexX = cellIDForPopulating[0]
          // cellForPopulationRowIndexY = cellIDForPopulating[1]
        }
        // console.log(cellForPopulationcellIndexX,cellForPopulationRowIndexY,' is not occupied. can check populate');
        let posibleDirectionToPopulateFromRootCell:string[] = this.checkIfNextCellCanBePopulated(cellIDForPopulating[1],cellIDForPopulating[0],ShipSize,numOfColsX,numOfRowsY)
        while(posibleDirectionToPopulateFromRootCell.length === 0){
          ({cellForPopulationcellIndexX,cellForPopulationRowIndexY} = this.resetCellSelection(numOfColsX,numOfRowsY))

          // let cellIDForPopulating = this.generateNewCellIdToPopulate(numOfColsX,numOfRowsY)
          let posibleDirectionToPopulateFromRootCell:string[] = this.checkIfNextCellCanBePopulated(cellForPopulationRowIndexY,cellForPopulationcellIndexX,ShipSize,numOfColsX,numOfRowsY)
        }
        // console.log(`posibleDirectionToPopulateFromRootCell: `,posibleDirectionToPopulateFromRootCell);
        const directionToPopulate = posibleDirectionToPopulateFromRootCell[Math.floor(Math.random()*posibleDirectionToPopulateFromRootCell.length)]
        // console.log(`directionToPopulate: `,directionToPopulate);
        this.populateSpecificCells(cellIDForPopulating,directionToPopulate,ShipSize,this.boardArrays)

      }
  }

  checkIfNextCellCanBePopulated(YpositionToPopuateRowIndex,XpositionToPopuateCellIndex,ShipSize,numOfColsX,numOfRowsY):string[]{
    const shipsOriantation:string[] = ['up','down','left','right']

      let notAllowedDirectionForNextCell:string[] = []
      if(XpositionToPopuateCellIndex === 0){
        notAllowedDirectionForNextCell.push('left')
      }
      if(XpositionToPopuateCellIndex===numOfColsX-1 && XpositionToPopuateCellIndex+ShipSize-1>numOfColsX-1 ){
        notAllowedDirectionForNextCell.push('right')
      }

      if(YpositionToPopuateRowIndex === 0){
        notAllowedDirectionForNextCell.push('up')
      }

      if(YpositionToPopuateRowIndex === numOfRowsY-1 && YpositionToPopuateRowIndex+ShipSize-1>numOfRowsY-1){
        notAllowedDirectionForNextCell.push('down')
      }

      // console.log(`after checking next cell position. these are the not allowed directions: `,notAllowedDirectionForNextCell);

      const allowdDirectionsToPopulateNextCell:string[] = []

      shipsOriantation.forEach(direction=>{
        if(!(notAllowedDirectionForNextCell.includes(direction))){
          allowdDirectionsToPopulateNextCell.push(direction)
        }
      })

      // console.log(`allowed dir for next cell: `,allowdDirectionsToPopulateNextCell);

      if(allowdDirectionsToPopulateNextCell.length===0){
        // console.log(`error. no allowed direction for next cell`);
        return []
      }
      else{
        return allowdDirectionsToPopulateNextCell
      }
  }

  populateSpecificCells(rootCellId:number[],directionToPopulate:string,shipSize:number,boardArray){
    switch (directionToPopulate) {

      case 'up':
        for (let index = 0; index < shipSize; index++) {
          boardArray[rootCellId[1]+index][rootCellId[0]]['isOccupiedByShip'] = true
        }
      break;

      case 'down':
        for (let index = 0; index < shipSize; index++) {
          boardArray[rootCellId[1]-index][rootCellId[0]]['isOccupiedByShip'] = true
        }
      break;

      case 'right':
        for (let index = 0; index < shipSize; index++) {
          boardArray[rootCellId[1]][rootCellId[0]+index]['isOccupiedByShip'] = true
        }
      break;

      case 'left':
        for (let index = 0; index < shipSize; index++) {
          boardArray[rootCellId[1]][rootCellId[0]-index]['isOccupiedByShip'] = true
        }
      break;

    }
  }

  resetCellSelection(numOfColsX,numOfRowsY){
    const cellIDForPopulating = this.generateNewCellIdToPopulate(numOfColsX,numOfRowsY)
    const cellForPopulationcellIndexX = cellIDForPopulating[0]
    const cellForPopulationRowIndexY = cellIDForPopulating[1]
    return {cellForPopulationcellIndexX,cellForPopulationRowIndexY}
  }

  generateNewCellIdToPopulate(numOfColsX,numOfRowsY):number[]{
    const XpositionToPopuateCellIndex = Math.floor(Math.random()*numOfColsX)
    const YpositionToPopuateRowIndex = Math.floor(Math.random()*numOfRowsY)
    return [XpositionToPopuateCellIndex,YpositionToPopuateRowIndex]
  }


}
