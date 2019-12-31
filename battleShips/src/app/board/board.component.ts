import { Component, OnInit } from '@angular/core';
import { CompConnectionsService } from '../services/comp-connections.service';
import { Cell } from "../classes/cell.class";
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardObj:any = false

  arr=[1,2,3,4,5]

  constructor(
    private boardPass:CompConnectionsService
  ) { }

  ngOnInit() {
    this.boardPass.passBoardSubScribe().subscribe(newBoardObj=>{
      // console.log(`new boardObj in board comp`,newBoardObj);
      this.boardObj = newBoardObj
    })
  }

  hitCell(cell:Cell,cellID:object){
    // console.log(`hitted cell, `,cell);

    // console.log(`attacking cell: `,cellID);
    // console.log(`did we hit something? is the cell occupied by a ship? `,cell['isOccupiedByShip'])


    if(cell['isOccupiedByShip']){
      console.log(`hitted enemy ship!`);
      cell['haveBeenHit'] = true

    }
  }

}
