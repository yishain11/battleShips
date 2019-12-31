import { Component, OnInit } from '@angular/core';
import { BoardCreationService } from "../services/board-creation.service";
import { CompConnectionsService } from "../services/comp-connections.service";

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
    console.log(`clicked onClickStartGame`);

    const newBoard = this.boardService.createBoardInService()
    console.log(`newBoard`,newBoard);
    console.log(`num of occupied cells in board: `,newBoard.getOccuipiedCellsNumber());
    const newBoardReduced = newBoard['boardArrays']
    this.connectService.passBoardObject(newBoardReduced)
    this.connectService.clalculateMisslesNumber()
  }

}
