import { IPlayer } from "./player.interface";
import { Match } from "./match.model";
import { IMatch } from "./match.interface";

export class Player {
	public playerId: string;
	public name: string;
	public matchIds: Array<string>;

	constructor(player: IPlayer) {
		this.playerId = player.playerId;
		this.name = player.name;
		this.matchIds = player.matchIds;
	}
}
