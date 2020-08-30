import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from './Services/game-service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent {
  @Input()
  noOfPlayers: number;

  @Output() playAgain = new EventEmitter();

  constructor(private gameService: GameService) {   }

  InitilizeGame(){
    this.gameService.EndGame = false;
    this.gameService.playersArray = this.gameService.GetPlayers(this.noOfPlayers);
  }

  Playagain() {
    this.gameService.Reset();
    this.gameService.EndGame = false;
    this.playAgain.emit();
  }

  CloseGame() {
    console.log("Game closed");
    this.gameService.Reset();
    this.gameService.EndGame = true;
  }
}
