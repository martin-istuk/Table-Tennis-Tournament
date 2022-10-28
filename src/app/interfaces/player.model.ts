import { IPlayer } from "./player.interface";

export class Player {
	public id: string;
	public name: string;
	public matchIds: Array<string>;
	public winRate: number;

	constructor(player: IPlayer) {
		this.id = player.id;
		this.name = player.name;
		this.matchIds = player.matchIds;
		this.winRate = player.winRate;
	}
}
