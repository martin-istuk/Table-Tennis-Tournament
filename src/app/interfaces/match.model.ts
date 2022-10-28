import { IMatch } from "./match.interface";

export class Match {
	public id: string;
	public playerHome: string;
	public playerAway: string;
	public sets: Array<Array<number>>;
	public score: Array<number>;
	public winner: string;

	constructor(match: IMatch) {
		this.id = match.id;
		this.playerHome = match.playerHome;
		this.playerAway = match.playerAway;
		this.sets = match.sets;
		this.score = match.score;
		this.winner = match.winner;
	}
}
