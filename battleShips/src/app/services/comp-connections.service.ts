import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from '../classes/board.class';
import { Cell } from "../classes/cell.class";


@Injectable({
  providedIn: 'root'
})
export class CompConnectionsService {

  constructor() { }

  private passBoardSubject:Subject<object> = new Subject()

  private $passBoardObservable = this.passBoardSubject.asObservable()

  passBoardSubScribe(){
    return this.$passBoardObservable
  }

  passBoardObject(Board:Object){
    this.passBoardSubject.next(Board)
  }

}
