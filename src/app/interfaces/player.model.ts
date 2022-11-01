import { IPlayer } from "./player.interface";

export class Player {
	public id: string;
	public name: string;
	public age: number;
	public matchIds: Array<string>;
	public setWins: number;

	constructor(player: IPlayer) {
		this.id = player.id;
		this.name = player.name;
		this.age = player.age;
		this.matchIds = player.matchIds;
		this.setWins = player.setWins;
	}
}
