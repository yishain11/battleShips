import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateManagementService } from './state-management.service';


@Injectable({
  providedIn: 'root'
})
export class CompConnectionsService {

  constructor(
    private stateService:StateManagementService
  ) { }

  private passBoardSubject:Subject<object> = new Subject()

  private $passBoardObservable = this.passBoardSubject.asObservable()

  passBoardSubScribe(){
    return this.$passBoardObservable
  }


  passBoardObject(Board:any[][]){
    this.passBoardSubject.next(Board)
  }


  clalculateMisslesNumber(){
    const YboardSize:number = this.stateService.getStateValue('boardDimentionSizeY')
    const XboardSize:number = this.stateService.getStateValue('boardDimentionSizeX')
    const totalBoardSize:number = YboardSize*XboardSize
    const numberOfShips:number = this.stateService.getStateValue('numberOfShips')
    const sizeOfShip:number = this.stateService.getStateValue('sizeOfShips')
    const totalCellsToHit:number = numberOfShips*sizeOfShip

    let numberOfMIsslesForPlayer:number = 0

    if(totalCellsToHit*2<totalBoardSize-5){
      numberOfMIsslesForPlayer = totalCellsToHit*2
    }
    else{
      numberOfMIsslesForPlayer = Math.floor(totalCellsToHit*1.5)
    }

    this.stateService.setNewStateValue('numberOfMissleArsenal',numberOfMIsslesForPlayer)

  }



}
