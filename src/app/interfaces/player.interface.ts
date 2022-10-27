import { IMatch } from "./match.interface";

export interface IPlayer {
	playerId: string,
	name: string;
	matchIds: Array<string>;
}
