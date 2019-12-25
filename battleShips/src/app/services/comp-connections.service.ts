import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Board } from '../classes/board.class';


@Injectable({
  providedIn: 'root'
})
export class CompConnectionsService {

  constructor() { }

  passBoardSubject:Subject<object> = new Subject()

  $passBoardObservable = this.passBoardSubject.asObservable()

  passBoardSubScribe(){
    return this.$passBoardObservable
  }

  passBoardObject(Board:Object){
    this.passBoardSubject.next(Board)
  }

}
