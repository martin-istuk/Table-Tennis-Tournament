import { IMatch } from "./match.interface";

export class Match {
	public id: string;
	public playerHome: string;
	public playerAway: string;
	public set1: Array<number>;
	public set2: Array<number>;
	public set3: Array<number>;
	public set4: Array<number>;
	public set5: Array<number>;
	public score: Array<number>;
	public winner: string;

	constructor(match: IMatch) {
		this.id = match.id;
		this.playerHome = match.playerHome;
		this.playerAway = match.playerAway;
		this.set1 = match.set1;
		this.set2 = match.set2;
		this.set3 = match.set3;
		this.set4 = match.set4;
		this.set5 = match.set5;
		this.score = match.score;
		this.winner = match.winner;
	}
}
