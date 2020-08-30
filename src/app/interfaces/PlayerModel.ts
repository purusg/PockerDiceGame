import { CardModel } from './CardModel';

export interface PlayerModel {
    DiceValues: CardModel[];
    Hand: string;
    HandIndex: number;
}