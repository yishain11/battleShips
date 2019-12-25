export class Cell {

  isOccupiedByShip:boolean
  haveBeenHit:boolean
  id:number[]

  constructor(xpos:number,ypos:number){
    this.isOccupiedByShip = false
    this.haveBeenHit = false
    this.id = [xpos,ypos]
  }

}

