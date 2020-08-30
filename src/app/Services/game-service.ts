import { Injectable } from '@angular/core';
import { PlayerModel } from '../interfaces/PlayerModel';
import { CardModel } from '../interfaces/CardModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private diceSideItemList: CardModel[] = [];
  playersArray: PlayerModel[];
  HandMessage: string[];
  WinnerHandIndex: number;
  playerHandIndexList: number[] = [];
  DiceRolled: boolean = false;
  EndGame: boolean = false;

  hand = [];
  valuesArray = [];
  suitsArray = [];

  constructor() {
    this.HandMessage = [
      "Bust",
      "One Pair",
      "Two Pair",
      "Three of a kind",
      "Straight",
      "Full house",
      "Four of a kind",
      "Five of a kind"
    ];

    this.diceSideItemList = [
      { CardName: "A", CardValue: 0 },
      { CardName: "K", CardValue: 12 },
      { CardName: "Q", CardValue: 11 },
      { CardName: "J", CardValue: 10 },
      { CardName: "10", CardValue: 9 },
      { CardName: "9", CardValue: 8 }

    ];
  }

  Reset() {
    this.playersArray = [];
    this.DiceRolled = false;
  }

  GetPlayers(noOfPlayers: number): PlayerModel[] {
    let playerList: PlayerModel[] = [];
    for (let i = 0; i < noOfPlayers; i++) {
      playerList.push({ DiceValues: this.diceSideItemList, Hand: "", HandIndex: 0 });
    }
    return playerList;
  }

  Roll(noOfPlayers: number) {
    this.DiceRolled = true;
    this.playersArray = [];
    this.playerHandIndexList = [];
    this.WinnerHandIndex = 0;
    for (let i = 0; i < noOfPlayers; i++) {
      let player: PlayerModel;
      let randomNumbers = this.GetRandomNumbers(6, 5);
      let diceValues = this.GetDiceSideItemList(randomNumbers);
      let checkHand = this.checkHand(diceValues);
      this.playerHandIndexList.push(checkHand);
      player = {
        DiceValues: diceValues,
        Hand: this.HandMessage[checkHand],
        HandIndex: checkHand
      }
      this.playersArray.push(player)
    }

    this.WinnerHandIndex = this.GetWinnerHandIndex();
  }

  GetWinnerHandIndex(): number {
    return Math.max(...this.playerHandIndexList);
  }

  GetDiceSideItemList(randomNumbers: number[]): CardModel[] {
    let diceSides: CardModel[] = [];
    randomNumbers.forEach(element => {
      let diceSideValue = this.diceSideItemList[element - 1];
      diceSides.push(diceSideValue);
    });
    return diceSides;
  }

  GetRandomNumbers(numSides: number, numDice: number): number[] {
    let randomNumber: number[];
    if (numSides != null && numDice != null) {
      randomNumber = [];
      for (let i = 0; i < numDice; i++) {
        if (i < numDice - 1) {
          randomNumber.push((Math.ceil(Math.random() * numSides - 1) + 1));
        } else {
          randomNumber.push((Math.ceil(Math.random() * numSides - 1) + 1));
        }
      }
    }
    return randomNumber;
  }

  checkHand(diceValues: CardModel[]) {
    let resultString = 0;
    this.hand = [];
    this.valuesArray = [];
    this.suitsArray = [];
    for (let i = 0; i < diceValues.length; i++) {
      let card = diceValues[i];
      this.hand[i] = card.CardValue;
    }
    this.ConvertHand();
    switch (this.duplicateCards()) {
      case "2":
        resultString = 1;
        break;
      case "22":
        resultString = 2;
        break;
      case "3":
        resultString = 3;
        break;
      case "23":
      case "32":
        resultString = 5;
        break;
      case "4":
        resultString = 6;
        break;
      case "5":
        resultString = 7;
        break;
      default:
        if (this.isStraight()) {
          resultString = 4;
        }
        if (this.isAceStraight()) {
          resultString = 4;
        }
        break;
    }
    return resultString;
  }

  ConvertHand() {
    for (let i = 0; i < 5; i++) {
      this.valuesArray[i] = this.hand[i] % 13;
      this.suitsArray[i] = Math.floor(this.hand[i] / 13);
    }
  }

  isFlush() {
    for (let i = 0; i < 4; i++) {
      if (this.suitsArray[i] != this.suitsArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

  isStraight() {
    let lowest = this.getLowest();
    for (let i = 1; i < 5; i++) {
      if (this.occurrencesOf(lowest + i) != 1) {
        return false
      }
    }
    return true;
  }

  isAceStraight() {
    let lowest = 9;
    for (let i = 1; i < 4; i++) {
      if (this.occurrencesOf(lowest + i) != 1) {
        return false
      }
    }
    return this.occurrencesOf(1) == 0;
  }

  getLowest() {
    let min = 12;
    for (let i = 0; i < this.valuesArray.length; i++) {
      min = Math.min(min, this.valuesArray[i]);
    }
    return min;
  }

  duplicateCards() {
    let occurrencesFound = [];
    let result = "";
    for (let i = 0; i < this.valuesArray.length; i++) {
      let occurrences = this.occurrencesOf(this.valuesArray[i]);
      if (occurrences > 1 && occurrencesFound.indexOf(this.valuesArray[i]) == -1) {
        result += occurrences;
        occurrencesFound.push(this.valuesArray[i]);
      }
    }
    return result;
  }

  occurrencesOf(n: number) {
    let count = 0;
    let index = 0;
    do {
      index = this.valuesArray.indexOf(n, index) + 1;
      if (index == 0) {
        break;
      }
      else {
        count++;
      }
    } while (index < this.valuesArray.length);
    return count;
  }
}
