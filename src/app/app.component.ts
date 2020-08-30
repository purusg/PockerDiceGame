import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardModel } from './interfaces/BoardModel';
import { PlayGameComponent } from './play-game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pocker Dice';
  boardModel: BoardModel;
  @ViewChild(PlayGameComponent) playGame: PlayGameComponent;

  constructor() {
  }

  ngOnInit() {
    this.refreshBoardModel();
  }

  refreshBoardModel() {
    this.boardModel = {
      NumberOfDice: 5,
      NumberOfPlayers: 2,
      HasError: false,
      PlayGame: false
    }
  }

  validatePlayers() {
    this.boardModel.HasError = this.boardModel.NumberOfPlayers < 2 || this.boardModel.NumberOfPlayers > 5;
  }
  StartGame() {
    this.boardModel.PlayGame = true;
    this.playGame.InitilizeGame();
  }

  StartAgain() {
    this.refreshBoardModel();
  }
}
