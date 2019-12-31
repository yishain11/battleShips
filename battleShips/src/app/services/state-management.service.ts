import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  private stateObj={
    'boardDimentionSizeY':5,
    'boardDimentionSizeX':5,
    'numberOfMissleArsenal':0,
    'numberOfMisslesFired':0,
    'numberOfShips':3,
    'sizeOfShips':2,
    'numberOfHittedCells':0,
    'boardArray':[]
  }

  // private numberOfMissleArsenal:number
  // private numberOfMisslesFired:number
  // private numberOfShips:number
  // private sizeOfShips:number
  // private boardArray:any[]


  private stateObs = new Subject<Object>()
  private $stateObs = this.stateObs.asObservable()

  constructor() { }

  generateStateObj(){

    return this.stateObj
  }

  setNewStateValue(field:string,value:number,board?:any[]){
    const currentStateFields = Object.keys(this.stateObj)
    if(!currentStateFields.includes(field)){
      throw `Error. No such field to update in state. Field: ${field}`
    }
    this.stateObj[field] = value
    if(board){
      this.stateObj['boardArray'] = board
    }
    this.publishNewState()

  }

  resetGameState(){
    const stateProps = Object.keys(this.stateObj)
    stateProps.forEach(stateProp=>{
      if(stateProp==='boardArray'){
        this.stateObj[stateProp] = []
      }
      else{
        this.stateObj[stateProp] = 0
      }
    })
  }

  publishNewState(){
    this.stateObs.next(this.stateObj)
  }

  subscribeToState(){
    return this.$stateObs
  }

  getStateValue(field:string){
    return this.stateObj[field]
  }


}
