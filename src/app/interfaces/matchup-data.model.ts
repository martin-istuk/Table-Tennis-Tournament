import { IMatchupData } from "./matchup-data.interface";

export class MatchupData {
	public playerHome: string;
	public playerAway: string;
	public error: boolean;

	constructor(matchupData: IMatchupData) {
		this.playerHome = matchupData.playerHome;
		this.playerAway = matchupData.playerAway;
		this.error = matchupData.error;
	}
}
