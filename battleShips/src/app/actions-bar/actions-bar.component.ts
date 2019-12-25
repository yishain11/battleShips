import { Component, OnInit } from '@angular/core';
import { BoardCreationService } from "../services/board-creation.service";
import { CompConnectionsService } from "../services/comp-connections.service";
import { Board } from "../classes/board.class";

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.css']
})
export class ActionsBarComponent implements OnInit {

  constructor(
    private connectService:CompConnectionsService,
    private boardService:BoardCreationService) { }

  ngOnInit() {

  }

  onClickStartGame(){
    const newBoard= this.boardService.createBoardInService()['boardArrays']
    console.log(`newBoard`,newBoard);
    this.connectService.passBoardObject(newBoard)
  }

}
