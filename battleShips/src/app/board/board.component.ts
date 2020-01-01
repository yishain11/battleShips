import { Component, OnInit,OnDestroy } from '@angular/core';
import { CompConnectionsService } from '../services/comp-connections.service';
import { Cell } from "../classes/cell.class";
import { StateManagementService } from '../services/state-management.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit,OnDestroy {

  boardObj:any = false
  boardReciver

  numberOfMisslesLeftToFire:number
  numberOfFireMissels:number = 0
  numberOfHittedCells:number = 0
  totalCellsToHit:number

  isGameOver:boolean = false

  constructor(
    private compComunication:CompConnectionsService,
    private stateService:StateManagementService
  ) { }

  ngOnInit() {

    this.boardReciver = this.compComunication.passBoardSubScribe().subscribe(newBoardObj=>{
      this.boardObj = newBoardObj
      this.resetGame()
    })
  }

  hitCell(event,cell:Cell){
    // console.log(`hitting cell: `,cell);
    // console.log('event:');
    // console.log(event)
    if(this.numberOfMisslesLeftToFire<=0){
      this.isGameOver = true
      return
    }

    this.numberOfFireMissels +=1
    this.numberOfMisslesLeftToFire -= 1
    const currentStateStoredMissleFired:number = this.stateService.getStateValue('numberOfMisslesFired')
    this.stateService.setNewStateValue('numberOfMisslesFired',currentStateStoredMissleFired+1)

    if(cell['isOccupiedByShip']){
      // console.log(`hitted enemy ship!`);
      cell['haveBeenHit'] = true
      // console.log(`event.target.classList: `,event.target.classList);
      event.target.classList.add('hittedOcupiedCell')
      this.numberOfHittedCells += 1
      const currentHitCellNumInState:number = this.stateService.getStateValue('numberOfHittedCells')
      this.stateService.setNewStateValue('numberOfHittedCells',currentHitCellNumInState+1,this.boardObj)
    }
    else{
      // console.log(`event.target.classList: `,event.target.classList);

      event.target.classList.add('hitNonOcupiedCell')

    }
  }


  calculateSuccessRate(){
    const sucRate:number = Math.floor((this.numberOfHittedCells/this.totalCellsToHit)*100)
    return sucRate
  }


  resetGame(){
    const numberOfShips:number = this.stateService.getStateValue('numberOfShips')
    const sizeOfShip:number = this.stateService.getStateValue('sizeOfShips')
    this.totalCellsToHit = numberOfShips*sizeOfShip

    this.compComunication.clalculateMisslesNumber()
    this.numberOfMisslesLeftToFire = this.stateService.getStateValue('numberOfMissleArsenal')
    this.isGameOver = false
  }

  ngOnDestroy(){
  //   this.boardReciver.unsubscribe()
  }

}
