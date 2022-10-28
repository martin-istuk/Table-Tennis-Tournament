export interface IMatch {
	id: string,
	playerHome: string;
	playerAway: string;
	sets: Array<Array<number>>;
	score: Array<number>;
	winner: string;
}
