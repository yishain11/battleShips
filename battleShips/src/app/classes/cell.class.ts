export class Cell {

  isOccupiedByShip:boolean = false
  haveBeenHit:boolean = false
  id:number[]

  constructor(xpos:number,ypos:number){
    this.isOccupiedByShip = false
    this.haveBeenHit = false
    this.id = [xpos,ypos]
  }

  makeCellHitted(){
    this.haveBeenHit = true
  }

  makeCellOccupiedByShip(){
    this.isOccupiedByShip = true
  }

  checkIfOccupied(){
    return this.isOccupiedByShip
  }

  resetCell(){
    this.haveBeenHit = false
    this.isOccupiedByShip = false
    this.id = []
  }

}

